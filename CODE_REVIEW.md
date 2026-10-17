# Code Review — cc-safety-next

> 一个从 CC Safety Net 分叉出来的、仅供 OpenCode v2 使用的本地插件（`@local/cc-safety-net`，v2.4.14）。
> 它在工具调用真正执行之前，对 shell 命令、文件补丁和路径写入做静态分析，拦截破坏性命令与敏感文件访问，
> 并保护自己的策略文件、缓存/规则目录和 Git 元数据。

- 审查日期：2026-10-17
- 审查基线：`1026c0f`（`feat: port the plugin to OpenCode v2 only`）；工作区额外只有 `CODE_REVIEW.md` 的删除状态
- 审查范围：`src/`、`tests/`、`scripts/`、根配置、已提交的 `dist/`
- 运行环境：Windows 11、Node v24.11.0、Bun 1.4.2
- 方法：逐模块阅读 + 运行既有检查 + 用项目自身 harness 对安全关键路径做动态复现
  （真实临时 HOME、真实 `.cc-safety-net/policy.json`、真实 `.git` 目录，而不是 mock）
- 结论：架构分层清晰，抽象和测试基础明显高于一般安全工具；但 **guard 层对 shell 通配符的处理存在多个已复现的
  真实绕过**，且最关键的 `bun run check` 当前不通过。建议先修 P0，再处理 P1/P2。

本报告中的“已验证”条目都用当前源码的实际函数复现过，输出见 [附录 A](#附录-a已验证复现)。

---

## 0. 执行摘要

| 编号 | 严重性 | 结论 |
|---|---|---|
| P0-1 | Critical | `guard-walk` 把 glob 词转成 `glob` 操作符并丢弃原词，导致 `cat ~/.ssh/*`、`rm -rf ~/.ssh/*`、`rm -rf ~/.cc-safety-net/*` 等全部放行 |
| P0-2 | Critical | secret matcher 只做 basename/prefix 精确匹配，不把 `.env*`、`~/.env*` 当作可能命中 `.env` 的 glob |
| P0-3 | Critical | `rm -rf ~/.*`（以及 `~/.??*`）不被识别为 home/root 删除，可删除 `.ssh`、`.aws`、`.cc-safety-net` 等隐藏目录 |
| P1-1 | High | Git metadata 只保护 `.git` 根和 hooks；`rm -rf .git/objects`、`.git/config`、`.git/index` 被放行，且与 `rm -rf .git/*` 结果矛盾 |
| P1-2 | High | `./dist/bin/cc-safety-net.js policy apply ...` 绕开 policy-apply 保护；相对入口名没有被识别 |
| P1-3 | High | 未引用 heredoc 的内容被 policy guard 当成已执行命令，标准模式下 `cat <<EOF` 包含 `rm -rf ~` 被硬拦截；契约测试已红 |
| P1-4 | High | `bun run check` 当前 2440 pass / 7 fail；这是发布阻断项 |
| P2-1 | Medium | v2 自定义规则的 `command_path` 在未知的“带值全局选项”之后失配，例如 `docker --context prod system prune` |
| P2-2 | Medium | `coversGuardConfig` 读取 `process.env.CC_SAFETY_NET_HOME`，与运行时使用的 `environment.env` 不一致 |
| P2-3 | Medium | GUI 读取用户策略时仍使用未加固的 `existsSync`/`readFileSync`，与 gate 使用的 `safe-read` 不一致 |
| P2-4 | Medium | `check-duplicates` 当前失败（4 个 clone）；`knip`、重复检测、覆盖率校验没有接入 `check` |
| P3 | Low | 状态输出截断导致测试脆弱、`updates.ts` 永远返回无更新、审计读取无大小上限、TUI 部分异常路径等 |

---

## 1. 项目结构、数据流与安全模型

### 1.1 分层

| 层 | 位置 | 责任 |
|---|---|---|
| shell 模型/解析 | `src/core/shell/*` | POSIX/PowerShell AST、heredoc、重定向、词法分析；冻结不可变对象 |
| analyzer | `src/gate/analyzer/**` | 遍历 AST，解析 cwd/env/wrapper，匹配 rm/git/find/interpreter/xargs 等破坏性规则 |
| guards | `src/gate/guards/*`、`src/gate/secret/*` | 独立路径扫描器，保护 policy/rules、Git 元数据、敏感文件 |
| pipeline | `src/gate/pipeline.ts` | 按 policy → policy-apply → git → secret → analyzer 顺序求值，依赖调用失败时 fail-closed |
| policy | `src/core/policy/**` | 用户/项目策略加载、合并、校验、预设、规则书、allow/deny 路径 |
| hosts/CLI/GUI/audit | `src/hosts`、`src/cli`、`src/gui`、`src/audit`、`src/rules-manager` | OpenCode 集成、命令行、本地 Web 编辑器、审计、远程规则同步 |

### 1.2 一次 shell 调用的实际路径

```
ToolInvocation
  -> createSemanticFacts            (input-candidate / declared-command 的 AST + GuardSyntax)
  -> findPolicyMutation             (policy.json、rules/rule.json、rulebook)
  -> findPolicyApplyInvocation      (禁止 agent 自己 policy apply)
  -> findGitMetadataMutation        (.git / hooks)
  -> loadPolicySnapshot + getModes  (用户/项目策略、环境变量、capabilities)
  -> findSensitiveTarget            (secret basename/home path/coding CLI 规则)
  -> analyzeCommand                 (rm/git/find/interpreters/xargs/... 的语义分析)
  -> Decision allow/deny
  -> audit + 可选 TUI interaction
```

这个顺序很重要：**guard 在 analyzer 之前运行**。因此 guard 的 false positive 会覆盖 analyzer 原本更精确的规则；
guard 的 false negative 则可能直接让命令通过，因为 analyzer 未必有对应的通用规则。

### 1.3 设计上值得肯定的一点：fail-closed 主要依赖 pipeline

`evaluateGuard` 用 `callDependency` 包裹绝大部分依赖；解析上限、工具输入上限、结构上限都转成
`stop_and_explain` 拒绝。`analyzeOrCapBreach` 也把 analyzer 的预算异常转成拒绝，而不是崩溃。
这是正确的方向，问题主要集中在 guard **覆盖范围**，而不是异常处理机制本身。

---

## 2. Critical（P0）

### P0-1 通配符操作数被 guard walker 丢弃，secret/policy/git 均可绕过 — 已验证

**位置**

- `src/gate/guards/guard-walk.ts:493`：普通词调用 `readWord(word, view, context, false)`。
- `src/gate/guards/guard-walk.ts:630-639`：`flush()` 中只要 `glob === true` 且 `keepGlobText === false`，就只产生
  `operatorEvent('glob')`，不保留 `pending` 文本。
- 同一文件的 `readGuardTokens` 也只返回 `word`/`operator`/`redirection`，glob 词没有可读文本。

**复现结果**

```text
cat ~/.ssh/*                 => allow   (command-analysis)
rm -rf ~/.ssh/*              => allow   (command-analysis)
rm -rf ~/.cc-safety-net/*    => allow   (command-analysis)
truncate -s 0 ~/.cc-safety-net/*  => allow
sed -i s/x/y/ ~/.cc-safety-net/*  => allow
```

对照：

```text
cat ~/.ssh/config            => deny    (secret-protection / secret.home.ssh)
rm -rf ~/.ssh                => deny    (secret-protection / secret.home.ssh)
rm -rf ~/.cc-safety-net/policy.json => deny (policy-protection)
```

**根因**

`readWord` 内部 `scanWordText` 在遇到未引用的 `*`、`?`、`[` 时会设置 `glob`（`guard-walk.ts:779,790`）。
随后 `flush()` 把整个词替换为 `glob` 操作符。这本身可能是为了让 analyzer 识别“这是动态目标”，
但 guard walker 的消费者——secret/policy/git 路径扫描器——只看 `segment` 中的词，因此路径彻底消失。

**影响**

- 读取：`cat ~/.ssh/*`、`tar -cf /tmp/keys.tar ~/.ssh/*`、`cp -r ~/.ssh/* /tmp/` 都能读取或外带全部私钥。
- 删除：`rm -rf ~/.ssh/*`、`rm -rf ~/.cc-safety-net/*` 能删除敏感目录或策略文件。
- 改写：`truncate`、`sed -i`、`chmod`、`mv` 等对策略目录的 glob 目标也能通过。
- 所有依赖 `GuardSyntax` 的 guard 都受影响，不只 secret。

**现有测试反而固定了这个行为**

`tests/gate/guards/guard-walk.test.ts:127`：

```ts
expect(words('rm *.env')).toStrictEqual(['rm']);
```

这不是“实现细节”，而是把安全盲点写成了契约。建议改为至少保留 glob 文本并附带 `isGlob` 元数据，
或让路径扫描器接收单独的 `glob` 词事件。

**建议修复**

1. 在 `GuardEvent` 中保留 glob 词的原始文本，例如 `{ kind: 'word', text, glob: true }`，
   或新增 `{ kind: 'glob', text }`，同时保留 `operatorEvent('glob')` 用于控制流。
2. `walkGuardSyntax` 的 `segment` visitor 把 glob 词作为 operand 传入；路径扫描器自行决定如何保守处理。
3. 对 policy/git/secret，**任何**能覆盖受保护目录的 glob 都应 fail-closed，或至少按字面前缀判断。
4. 增加 contract rows：
   - `cat ~/.ssh/*`、`rm -rf ~/.ssh/*`
   - `rm -rf ~/.cc-safety-net/*`
   - `cat .env*`、`rm -rf .env*`
   - `truncate -s 0 ~/.cc-safety-net/*`

---

### P0-2 secret matcher 不把 glob 当作敏感 basename — 已验证

**位置**

- `src/gate/secret/secret-protection.ts:1788-1868`（`isSensitivePath`）
- `src/core/rules/secret.ts:21-85`（精确 basename）
- `src/gate/secret/secret-protection.ts:1826-1832`（`.env` 前缀变体）

**复现结果**

```text
findSensitivePathTarget(['.env*'], cwd, env)   => null
findSensitivePathTarget(['*.env'], cwd, env)   => null
findSensitivePathTarget(['~/.env*'], cwd, env) => null

rm -rf .env*        => allow
rm -rf ~/.env*      => allow
rm -rf .env         => deny  (secret.basename.env)
```

**根因**

`isSensitivePath` 对 basename 做精确比较；`.env*` 的 basename 是 `.env*`，不满足
`comparableName === '.env'`，也不满足“`.env` 后必须紧跟 `-` 或 `_`”的变体规则。
`~/.ssh*` 也不满足 `isSameOrChildHomePath('~/.ssh*', '~/.ssh')`，因此 glob 能覆盖 `.ssh` 却不会命中 home 规则。

即使修复 P0-1，`.env*` 仍会通过。因此这是独立的匹配器缺口。

**建议修复**

- 对含 glob 的 token，提取“字面前缀”（例如 `.env`、`~/.ssh`、`~/.aws`），如果该前缀是敏感
  basename/home path 的前缀，则 fail-closed，至少在所有 `rm`/写操作中这样处理。
- 对 `rm -rf`、`truncate`、`sed -i` 等写语义，glob 目标应比读取更严格。
- 增加 `.env*`、`~/.env*`、`~/.ssh*`、`~/.npmrc*` 的测试。

---

### P0-3 `rm -rf ~/.*` 不被识别为 home 删除 — 已验证

**位置**

- `src/gate/analyzer/recursive-delete-targets.ts:342-385`（`isDangerousRootOrHomeTarget`）
- `src/gate/analyzer/recursive-delete-targets.ts:387-422`（`isCanonicalHomeTarget`）
- `src/gate/analyzer/recursive-delete-targets.ts:538-545`（glob 被当作 dynamic）
- `src/gate/analyzer/recursive-delete-targets.ts:93-99`（`dynamic_target` 只在 strict/paranoid 下拦截）

**复现结果**

```text
rm -rf ~/.*       => allow
rm -rf ~/.??*     => allow
rm -rf ~/.[.]*    => allow
rm -rf ~/.*/      => allow
rm -rf ~/*        => deny   (rm.recursive-force-root-or-home)
```

`~/.*` 会匹配 `.ssh`、`.aws`、`.config/gcloud`、`.cc-safety-net`、`.gitconfig`、`.npmrc` 等。
在当前实现下，这会直接删除 home 下所有隐藏目录/文件。

**根因**

`isDangerousRootOrHomeTarget` 只处理 `~/*`、`$HOME/*`、`${HOME}/*` 这类显式模式；
`isCanonicalHomeTarget` 只去掉末尾的 `/*`，不会把 `~/.*` 解析为“home 本身”。
随后 `isDynamicTarget` 因为 `*` 返回 true，分类为 `dynamic_target`；
而 `matchRecursiveDeleteClassification` 只在 `ctx.strict` 为 true 时拦截 `dynamic_target`（标准模式放行）。

**建议修复**

- 在 `isDangerousRootOrHomeTarget` 中增加：
  - `~/.*`、`~/.??*`、`~/.` 等隐藏 glob；
  - `$HOME/.*`、`${HOME}/.*`；
  - 绝对 home 路径下的隐藏 glob（通过 `ctx.environment.home` 判断）。
- 更通用的做法：计算 glob 的“可匹配基目录”；如果基目录是 home 或 root，直接按 `root_or_home_target` 处理。
- 增加 `rm -rf ~/.*`、`rm -rf ~/.??*` 的 contract rows。

---

## 3. High（P1）

### P1-1 Git metadata 子路径可删除，结果与 glob 分支矛盾 — 已验证

**位置**

`src/gate/guards/git-metadata-protection.ts:91-117`

关键行：

```ts
return recursive && protectedRoots(metadata).some((path) => isEqualOrWithin(path, candidate));
```

`isEqualOrWithin(target, root)` 的第二参数是“根”。这里把受保护 root 作为 `target`、把待删路径作为
`root`，实际上是在问“受保护 root 是否位于待删路径之下”，而不是“待删路径是否位于受保护 root 之下”。

**复现结果**

```text
rm -rf .git            => deny  (rm.git-metadata)
rm -rf .git/*          => deny  (rm.git-metadata)
rm -rf .git/objects    => allow
rm -rf .git/config     => allow
rm -rf .git/index      => allow
rm -rf .git/HEAD       => allow
```

注意 `.git/*` 走 glob 分支（`globBase = .git`，匹配 `protectedRoots`）会被拦截；
而 `.git/objects` 走非 glob 分支时被反向 contains 判断漏掉。这是明显的不一致。

**影响**

`rm -rf .git/objects` 会删除全部对象库；`rm -rf .git/config` 会删除仓库配置；`rm -rf .git/index` 会破坏索引。
虽然不一定泄露 secret，但会破坏仓库完整性，属于 README 承诺的“保护 Git metadata”范围。

**现有测试的边界**

`tests/gate/guards/git-metadata-protection.test.ts:82` 明确把 `.git/config` 标为 `expected: false`，
说明维护者可能有意只保护 `.git` 根与 hooks。但：
- 同一文件的 `.git/*`、`rm -rf .git` 行为与 `.git/objects` 不一致；
- 递归删除 `.git/objects` 明显比“普通文件”更危险；
- README 的表述是“Git metadata and hooks are protected”，没有说明只保护根目录。

**建议修复**

- 对递归删除，同时检查两个方向：
  - `isEqualOrWithin(candidate, protectedRoot)`（目标在 root 内，阻止 `.git/objects`）
  - `isEqualOrWithin(protectedRoot, candidate)`（目标是 root 的祖先，阻止 `rm -rf project`）
- 对 glob 继续保留 `.git/*` 的覆盖逻辑。
- 在文档中明确 `.git/config` 等普通文件的策略；若确实不打算保护，需说明理由并让测试与 glob 行为一致。

---

### P1-2 `./dist/bin/cc-safety-net.js policy apply` 绕过 policy-apply 保护 — 已验证

**位置**

- `src/gate/guards/policy-apply-protection.ts:59-71`：先 `getBasename(stripped[0])`，再交给
  `safetyNetSubcommandIndex`。
- `src/gate/guards/safety-net-invocation.ts:10-22`：只认 `cc-safety-net`、`ccsn`。
- `src/gate/guards/safety-net-invocation.ts:75-80`：`isSafetyNetEntrypoint` 只在 `node`/`bun` 这类
  script runtime 分支里使用。

**复现结果**

```text
node ./dist/bin/cc-safety-net.js policy apply proposal.json  => blocked
./dist/bin/cc-safety-net.js policy apply proposal.json       => null (bypass)
```

`getBasename('./dist/bin/cc-safety-net.js')` 返回 `cc-safety-net.js`，不在 `CC_SAFETY_NET_BIN_NAMES` 中；
而它不是 `node`/`bun` 的 script runtime 形式，因此没有任何分支识别它。
在 POSIX 上 `./dist/bin/cc-safety-net.js` 是可直接执行的（文件有 shebang 和 755 权限），所以这是可实际利用的路径。

**影响**

policy-apply 保护的目的是“只有用户能在终端里应用策略提案”。agent 只要在仓库里执行相对路径即可绕过，
策略提案可能把保护关掉。

**建议修复**

- 在 `safetyNetSubcommandIndex` 中识别 `cc-safety-net.js` / `cc-safety-net.mjs` / `ccsn.js`，或对
  `getBasename` 结果先去掉 `.js`/`.mjs`。
- 更稳妥：对 `./`、`../`、绝对路径的 `cc-safety-net*` 入口统一解析 realpath 并匹配 entrypoint。
- 增加 `./dist/bin/cc-safety-net.js policy apply ...`、`../repo/dist/bin/...` 的测试。

---

### P1-3 未引用 heredoc 被 policy guard 当成已执行命令，产生硬拦截并导致契约测试红 — 已验证

**位置**

- `src/gate/guards/guard-walk.ts:532-565`：`readHeredocs` 对未压制的 body 调用 `readText`。
- `src/gate/guards/guard-walk.ts:939-953`：`collectDataSinkHeredocSpans` 对 `cat`/`tee` 只收集
  **quoted** body；未引用 body 不被压制。
- `src/gate/guards/policy-protection.ts:198-269`：`findPolicyConfigMutationTargetInSegment` 对
  `rm -rf ~` 的 `~` 命中 `directoriesAndAncestors`。
- `src/gate/analyzer/analyze-command.ts:1100-1112`：analyzer 在标准模式下允许“只有字面文本、没有命令替换”的
  未引用 heredoc。

**复现结果**

```text
cat <<EOF
rm -rf ~ $target
EOF
```

标准模式下 analyzer 的契约期望是 `allow`（`tests/gate/behavioral-contract-cases.ts:630`），
实际 pipeline 返回：

```text
deny / policy-protection / hard_stop
reason: This path contains the protected policy config and you must not modify or delete it.
segment: ~
```

严格模式下的期望是 `stop_and_explain` 且没有 `ruleId`（同文件 `:796`），实际得到 `hard_stop` 且没有 `ruleId`。

这是当前 7 个测试失败中的 5 个的直接原因（另外 2 个见 P1-4）。

**根因**

`cat` 的未引用 heredoc 内容不会被执行；其中只有 `$()`/反引号会由 shell 展开。
但 guard walker 把整个 body 重新 `parseCommand` 成 POSIX 命令，policy guard 于是把 `rm -rf ~` 当成真实段，
并把 `~` 识别为策略目录的祖先。

**影响**

- 标准模式会误拦截完全无害的 `cat <<EOF`/`cat` 文档输出，导致 agent 体验明显变差。
- 严格模式的规则/原因与契约不一致，掩盖 analyzer 原本的 `stop_and_explain` 语义。
- 由于契约测试红，`bun run check` 无法通过，影响发布。

**建议修复**

- 对 data-sink heredoc（`cat`、`tee`、`git commit`、`gh ... create` 等）在 guard walker 中只遍历
  body 内的命令替换/反引号，不把字面行解析为独立命令。
- 或者让 policy/git/secret 的 visitor 明确区分“heredoc 数据”与“可执行段”，只对前者做路径字面扫描，
  不把 `rm -rf` 当作执行。
- 保留 analyzer 的严格模式策略（未引用且含命令替换时拦截），但标准模式应与 analyzer 契约一致。
- 修复后更新/新增 contract rows，确保标准与严格两种模式都有明确预期。

---

### P1-4 `bun run check` 当前失败（2440 pass / 7 fail）— 已验证

**运行结果**

```text
bun run check
2440 pass
46 skip
7 fail
42 snapshots, 258701 expect() calls
Ran 2493 tests across 139 files.
error: script "check" exited with code 1
```

失败的 7 个测试：

1. `status > a project policy that weakens the user policy is named as such`
2. `behavioral contract ... allows an unquoted heredoc whose only expansion is a variable at standard safety`
3. `behavioral contract ... blocks an unquoted heredoc script that a later command executes`
4. `behavioral contract ... blocks a brace-group heredoc piped into a shell`
5. `behavioral contract ... blocks a script written from a redirected group heredoc and then executed`
6. `behavioral contract ... blocks an unquoted heredoc carrying a destructive command and a live expansion at strict safety`
7. `tests/core/git/metadata.test.ts > (unnamed)`（fixture 初始化失败）

**分类**

- 2–6：P1-3 的 policy heredoc false positive（实际行为与契约/规则表不一致）。
- 1：`src/cli/status.ts:16-25` 在 80 列宽时把长 project 路径截断为 `…`，而测试
  `tests/cli/status.test.ts:71` 期待完整路径。这是测试脆弱性，也说明状态输出在不同终端宽度下不稳定。
- 7：`git submodule add -q ../sub vendor/sub` 在 Windows 测试夹具中失败（`tests/core/git/metadata.test.ts:39`，
  `tests/helpers.ts:74`）。这不是产品代码路径，但会使 Windows 上的最终检查失败；需要可移植的 fixture 或跳过条件。

**影响**

`AGENTS.md` 要求最终执行 `bun run check`，但当前基线无法通过。任何“修改后跑 check”的流程都会遇到既有红灯，
难以区分新回归与旧问题。

**建议**

- 先修 P1-3，使 5 个契约测试恢复。
- 状态测试注入明确的 `columns`（或使用 `--json`/不截断模式），避免依赖终端宽度。
- Git fixture 在 Windows 上使用本地路径/`file://` 或把 submodule 场景改成可移植的树结构，并在 CI 上验证。

---

## 4. Medium（P2）

### P2-1 自定义 v2 规则的 `command_path` 可被未知带值全局选项绕过 — 已验证

**位置**

- `src/core/rules/custom.ts:64-89`（`matchesCommandPath`）
- `src/core/rules/custom-match-options.ts:33-38`（只覆盖 aws/gcloud/az 的全局带值选项）

**复现**

规则：

```ts
{
  name: 'block-docker-prune',
  command: 'docker',
  match: { command_path: ['system', 'prune'] },
  reason: 'no prune',
  intent: 'manual_only',
}
```

结果：

```text
docker system prune                         => matched
docker --context prod system prune          => null
docker --host unix:///x system prune        => null
docker -H unix:///x system prune            => null
```

`matchesCommandPath` 对 `--context` 只跳过选项本身，不跳过它的值 `prod`；于是 `prod` 被当作
`command_path[0]` 去和 `system` 比较，直接失配。v1 的 `matchesCustomRuleSubcommand` 有
`shouldSkipPossibleOptionValue` 启发式，所以同样输入在 v1 能命中；v2 没有对应逻辑。

**影响**

rulebook v2 是本项目推荐的规则格式；规则作者写 `command_path` 时，agent 只要加一个带值全局选项就能绕过。
这是“规则书只能加 block”的承诺中的一个实际 false negative。

**建议**

- 为常见 CLI 的全局带值选项建立表（docker `--context`/`--host`/`-H`/`--config`，kubectl `--context`/
  `--namespace`/`-n`，npm `--prefix` 等），或在 `command_path` 匹配时采用“跳过未知选项值”的保守策略。
- 增加 v2 测试行：`docker --context prod system prune` 应命中。

---

### P2-2 `coversGuardConfig` 使用 `process.env` 而非传入的 environment — 配置/运行时不一致

**位置**

`src/core/policy/allow-paths.ts:69-77`

```ts
function coversGuardConfig(absolutePath: string, home: string): boolean {
  const normalized = comparableAllowPath(absolutePath);
  const guardRoots = [join(home, '.cc-safety-net')];
  const configuredHome = process.env.CC_SAFETY_NET_HOME; // 这里
  ...
}
```

`getSecretAllowPathError` 在验证时可能使用 `home` 与 `process.env`，而运行时
`matchesAllowedPath` 使用 `environment.env`。当 `CC_SAFETY_NET_HOME` 仅存在于
`environment.env`（测试、插件注入或自定义环境）时，验证器可能会允许一个覆盖 guard 配置的 secret allow path。
即使 policy guard 仍会阻止写入，读取路径和策略语义已经不一致。

**建议**

- 把 `Environment`（或至少 `env`）传进验证函数，统一使用 `environment.env.get('CC_SAFETY_NET_HOME')`。
- 增加“自定义 `CC_SAFETY_NET_HOME` + secret allow path 覆盖 guard 目录”的测试。

---

### P2-3 GUI 读取策略仍使用未加固的 `readFileSync`

**位置**

- `src/core/policy/diff.ts:69-72`：`existsSync` + `readFileSync`
- `src/core/policy/store-gui.ts:45`、`:121`：`readUserPolicyForGui` / `repairUserPolicyForGui`
- 对照：`src/core/policy/store.ts:534-540` 已通过 `readGuardedPolicyFile` 做 `O_NOFOLLOW`、dev/ino 校验。

GUI 的读取路径与 gate 的写入/读取路径不一致。它不是远端攻击面，但本地 symlink/TOCTOU 语义不同，
且 GUI 会在“修复策略”时把读到的内容写回，风险比只读更高。

**建议**

- 统一使用 `bindDelegatedPolicyFilesystemTarget` + `readPolicyFile`，并保留现有的错误展示。
- 至少在 GUI 层明确说明这些读取不是安全边界，避免未来把 GUI 当成可信输入源。

---

### P2-4 质量检查未全部接入 `check`，且重复检测当前失败

**位置**

- `package.json:44`：`check = lint && lint:comments && format:check && typecheck && test`
- `package.json:48`：`knip`；`:49`：`check-duplicates`；`:42`：`verify:coverage`

**现状**

- `bun run check-duplicates`：

  ```text
  4 clones · 0.0% duplication
  ERROR: jscpd found too many duplicates (0.0%) over threshold (0.0%)
  error: script "check-duplicates" exited with code 1
  ```

  克隆出现在 `src/core/shell/posix.ts`、`tests/core/policy/snapshot.test.ts`、`tests/hosts/opencode/server.test.ts`、
  `tests/hosts/opencode/tui.test.ts`。
- `bun run knip` 在当前环境无法启动（`bun is not installed in %PATH%`，因为 `knip-bun` 子进程找不到
  PowerShell 的 `bun.ps1` shim）；这不是源码失败，但说明该检查没有被实际执行过。
- `bun run test:coverage` 与 `bun run verify:coverage` 分开；`verify:coverage` 输出：
  `lines 95.91% (28907/30139), functions 96.70% (2463/2547), minimum 90.00%`。

**建议**

- 明确把 `knip`、`check-duplicates`、`test:coverage`+`verify:coverage` 纳入一个可运行的 CI/quality gate，
  或删除未执行的脚本，避免“看起来有门禁、实际没有”。
- 修复 4 个 clone，或把重复阈值调成有意义的非零值并说明原因。

---

## 5. Low / 其他观察

- `src/cli/status.ts:16-25`：状态行在 `width`（默认 80）处截断。生产行为可以接受，但测试依赖
  `process.stdout.columns`，在长临时路径下必然失败；建议测试注入列宽，或输出完整路径到 `--json`。
- `src/cli/doctor/updates.ts:4-9`：`checkForUpdates` 永远返回 `latestVersion: null, updateAvailable: false`；
  doctor 的更新检查是 inert 功能。要么删除，要么在文档中明确“此 fork 不检查更新”。
- `src/audit/reader.ts:38-55`、`src/cli/audit-log.ts:161-177`：审计日志按整文件读入内存，没有大小上限；
  `logs` 是用户主动执行，风险低，但长期运行的大日志可能造成内存峰值。
- `src/hosts/system-info.ts:55-79`：Windows 下通过 `cmd.exe /c call ...` 执行 `opencode` 等命令，
  `quoteWindowsCommandArg` 只处理 `"`/`&`/`|`/`<`/`>`/`^`，没有处理 `%`/`!`；包含 `%VAR%` 的参数会被
  cmd 展开。不是直接注入，但会改变参数含义。
- `src/hosts/opencode/tui.ts:70-78`：`api.ui.dialog.select` 抛错时没有 catch，可能留下未处理的 rejection；
  `tick` 内的 `touchTuiHeartbeat` 也没有异常保护。
- `src/gate/guards/git-metadata-protection.ts:181-198`：`mayHaveGitMetadataEntryNamed` 在目录读取失败时返回
  `true`（fail-closed），这是正确方向，但会在大仓库/慢文件系统上造成额外扫描成本；目前有 50k 条上限。
- `src/gate/guards/guard-walk.ts:659-670`：双引号内且没有 `nested` 的 command substitution 仍然被拼成文本；
  P0-1 的 glob 问题之外，这里是第二个“guard walker 与 analyzer 语义不一致”的点，建议加 differential tests。
- `src/cli/rule/sync-migrate.ts` 等规则管理路径的写入依赖 `safe-read`，整体良好；但 `rule.lock` 类型字段
  目前没有实际消费者，属于可清理的死字段。

---

## 6. 测试评估

### 6.1 做得好的部分

- 2493 个测试，覆盖 139 个文件，258701 次断言；42 个快照，但快照被限制在 `explain` 和 `doctor --json`
  这两个“字节即契约”的输出面。
- `tests/gate/behavioral-contract-cases.ts` + `pipeline-contract-cases.ts` 用手写契约覆盖命令、规则 ID、
  intent、reason 片段；`tests/architecture.test.ts` 用合成违规证明 lint 规则可失败。
- 大量使用真实临时文件/真实 shell 命令，不 mock 模块；`failure-injection.test.ts` 注入抛错 FS/读取竞态。
- 覆盖率实测 95.91% lines / 96.70% functions，超过 90% 门槛。
- 构建产物验证、`dist` 新鲜度（本次 `bun run build` 后 `git status --short dist` 为空）都正常。

### 6.2 与本次发现对应的缺口

- 没有 glob 操作数的 guard contract：`rm *.env` 只断言 guard token 是 `['rm']`，没有断言 guard 拒绝。
- 没有 `~/.ssh/*`、`rm -rf .cc-safety-net/*`、`truncate ... policy/*` 的路径保护测试。
- 没有 `rm -rf ~/.*` / `~/.??*`。
- 没有 `.git/objects`、`.git/config`、`.git/index` 的递归删除测试（现有测试显式把 `.git/config` 标为 false）。
- 没有 `./dist/bin/cc-safety-net.js policy apply`。
- 没有 v2 `command_path` + 带值全局选项。
- heredoc 行为变更后没有同步契约；当前 5 个契约红。

---

## 7. 构建、发布与文档

### 7.1 已通过

```text
bun run typecheck          PASS
bun run lint               PASS
bun run lint:comments      PASS
bun run format:check       PASS（380 个文件）
bun run build              PASS
  dist/index.js              20.75 KB
  dist/cli.js               349.84 KB
  dist/bin/cc-safety-net.js   0.35 KB
  dist/bin/hook.js            0.18 KB
  Build verification passed
git status --short dist    （无变化）
bun run verify:coverage    PASS（95.91% lines / 96.70% functions）
```

### 7.2 未通过/未执行

- `bun run check`：失败，7 个测试（P1-3/P1-4）。
- `bun run check-duplicates`：失败，4 个 clone（P2-4）。
- `bun run knip`：当前环境无法启动（子进程找不到 bun shim），未得到源码层面的结论。
- `bun run test:coverage`：测试失败导致退出 1；覆盖率本身可在部分运行后生成。

### 7.3 文档一致性

- README 对 secret 保护、policy 保护、Git metadata 保护的描述比实际 guard 覆盖更宽；
  尤其“Git metadata and hooks are protected”与实际允许 `.git/config`/`.git/objects` 不一致。
- README 说“A broken config file never blocks anything”，当前 fallback 逻辑基本符合，但
  `policyScopes`/`weakenings` 的展示和实际合并需要继续验证（项目策略 weakening 已被 clamp，方向正确）。
- `AGENTS.md` 不再声称 CI/knip/duplication 在 `check` 内，和 `package.json` 一致；但 `check-duplicates`
  仍未接入，属于“脚本存在但无人执行”。

---

## 8. 优先修复顺序

### P0（先修，必须有 contract rows）

1. **保留 glob 操作数**：改 `GuardEvent`/`readWord`/`walkGuardSyntax`，让 secret/policy/git 看到 glob 文本；
   对所有可覆盖受保护目录的 glob fail-closed。
2. **secret glob 匹配**：`.env*`、`~/.env*`、`~/.ssh*`、`~/.npmrc*` 等字面前缀命中敏感 basename/home path。
3. **home 隐藏 glob**：`~/.*`、`~/.??*`、`$HOME/.*`、绝对 home 隐藏 glob 统一归类为 `root_or_home_target`。
4. **回归测试**：把附录 A 的所有 case 变成 contract rows；特别要覆盖“标准模式 allow / 严格模式 block”的差异。

### P1（安全完整性与发布）

5. 修复 Git metadata 子路径（`.git/objects`、`.git/config`、`.git/index`）。
6. 识别 `./dist/bin/cc-safety-net.js policy apply`。
7. 修复未引用 heredoc 的 policy guard false positive，恢复 5 个契约测试。
8. 让 `bun run check` 绿；修复或平台条件跳过 Git submodule fixture。

### P2（正确性与工程化）

9. v2 自定义规则的带值全局选项。
10. `coversGuardConfig` 使用 `environment.env`。
11. GUI 策略读取统一走 `safe-read`。
12. 接入/删除 knip、jscpd、coverage gate；修复 4 个 clone。
13. 处理 Low 项中的状态截断、死更新检查、审计大小上限、Windows `%` 引号问题。

---

## 9. 模块级观察

| 模块 | 结论 | 主要风险/缺口 |
|---|---|---|
| `core/shell` | 两套 dialect 的 AST、词法、重定向、heredoc 抽象完整；解析预算和冻结对象做得好 | glob 在 guard walker 的二次消费中丢失；复杂 `${...}`/嵌套替换仍有语义边界 |
| `core/io` | `safe-read.ts` 是全项目最扎实的部分：`O_NOFOLLOW`、dev/ino 复核、canonical root containment、原子写、重命名后复核 | Windows 上 `O_NOFOLLOW` 可能退化为 0；GUI/diff 仍绕过这些 helper |
| `core/policy` | 用户/项目策略分层、项目 weakening clamp、fallback、rulebook 限额、规则覆盖都有明确边界 | `coversGuardConfig` 的 `process.env` 与 runtime env 不一致；项目策略的诊断/合并仍有可解释性成本 |
| `gate/analyzer` | 规则覆盖面广，rm/git/find/interpreter/xargs 都有独立逻辑；dynamic/derived 处理有预算 | Git 子路径保护方向写反；v2 自定义规则对未知带值选项失配；线性扫描器与 AST 规则存在双实现漂移风险 |
| `gate/guards` | 分层和 fail-closed 设计清楚，policy-apply/git/secret 分开便于扩展 | glob 丢失（P0-1）、heredoc 数据被当作命令（P1-3）、policy-apply 相对入口（P1-2） |
| `gate/pipeline` | 依赖调用统一包装；`getModes` 已纳入 `callDependency`；错误转 denial 的路径可读 | guard 在 analyzer 之前，guard 的 false positive 会压过更精确的 analyzer 规则 |
| `hosts/opencode` | v2 server/TUI 分离、会话 allow、交互请求/响应协议、TUI heartbeat、block reason 都清楚 | TUI dialog 异常未捕获；相对入口 `policy apply` 绕过；Windows `%`/`!` 引号细节 |
| `cli` | `status`/`doctor`/`explain`/`logs`/`rule`/`policy`/`gui` 覆盖面完整，JSON 输出可测试 | `updates.ts` 永远无更新；状态行截断导致测试脆弱；`check` 质量门不完整 |
| `gui` | Host 校验、CSP/nosniff/referrer、constant-time token、500 fallback 都已补上；前端字符串主要走 `escapeHtml` | 部分策略读取仍用 raw `readFileSync`；GUI 的本地边界需要文档化 |
| `rules-manager` | 固定 GitHub host、`redirect: 'error'`、owner/repo/ref/path 校验、字节/请求预算、原子 vendoring、fixture 校验都到位 | 同步失败的恢复/诊断路径复杂；`rule.lock` 字段目前无实际消费者 |
| `audit` | 写入有 redaction、字段上限、按日/月目录、retention prune；审计 ID 使用 `crypto` | 读取整文件无大小上限；session/cwd 编码存在碰撞可能（低风险） |

整体判断：**核心安全模型不是“没有设计”，而是“guard 层的覆盖与主 analyzer 不一致”**。P0-1/P0-3 是
最典型的例子：同一个 shell 词，在 analyzer 里可能被当作 dynamic target，在 guard 里被直接丢弃，
于是两层都认为“没有需要处理的目标”。

---

## 附录 A：已验证复现

环境：Windows 11、Bun 1.4.2、Node v24.11.0。每个 case 都通过当前源码的 `evaluateGuard`、`findSensitiveTargetInCommand`
或 `findPolicyConfigMutationTargetInToolInput` 执行，使用真实临时 HOME、真实 `.ssh`/`.cc-safety-net`/`.git` 目录。
“allow/deny”是 `Decision.kind`，括号内是 stage/rule。

| 命令 | 结果 |
|---|---|
| `cat ~/.ssh/config` | deny / secret-protection / secret.home.ssh |
| `cat ~/.ssh/*` | **allow** / command-analysis |
| `cat ~/.ssh/id_*` | **allow** / command-analysis |
| `tar -cf /tmp/keys.tar ~/.ssh/*` | **allow** / command-analysis |
| `cp -r ~/.ssh/* /tmp/` | **allow** / command-analysis |
| `rm -rf ~/.ssh` | deny / secret-protection / secret.home.ssh |
| `rm -rf ~/.ssh/*` | **allow** / command-analysis |
| `rm -rf .env` | deny / secret-protection / secret.basename.env |
| `rm -rf .env*` | **allow** / command-analysis |
| `rm -rf ~/.env*` | **allow** / command-analysis |
| `findSensitivePathTarget(['.env*'])` | null |
| `rm -rf ~/.*` | **allow** / command-analysis |
| `rm -rf ~/.??*` | **allow** / command-analysis |
| `rm -rf ~/*` | deny / command-analysis / rm.recursive-force-root-or-home |
| `rm -rf .cc-safety-net` | deny / policy-protection |
| `rm -rf .cc-safety-net/*` | **allow** / command-analysis |
| `rm -rf ~/.cc-safety-net/*` | **allow** / command-analysis |
| `truncate -s 0 ~/.cc-safety-net/*` | **allow** / command-analysis |
| `sed -i s/x/y/ ~/.cc-safety-net/*` | **allow** / command-analysis |
| `chmod 000 ~/.cc-safety-net/*` | **allow** / command-analysis |
| `rm -rf .git` | deny / command-analysis / rm.git-metadata |
| `rm -rf .git/*` | deny / command-analysis / rm.git-metadata |
| `rm -rf .git/objects` | **allow** / command-analysis |
| `rm -rf .git/config` | **allow** / command-analysis |
| `rm -rf .git/index` | **allow** / command-analysis |
| `node ./dist/bin/cc-safety-net.js policy apply proposal.json` | deny / policy-protection |
| `./dist/bin/cc-safety-net.js policy apply proposal.json` | **null**（未识别） |
| `docker --context prod system prune`（v2 自定义规则） | **null**（应命中） |

`findPolicyConfigMutationTargetInToolInput` 的原始输出示例：

```text
rm -rf ~/.cc-safety-net       => { target: "~/.cc-safety-net" }
rm -rf ~/.cc-safety-net/*     => null
rm -rf ~/.cc-safety-net/**    => null
rm -rf ~/.cc-safety-net/policy.json => { target: "~/.cc-safety-net/policy.json" }
rm -rf ~                => { target: "~" }
rm -rf ~/*              => null
```

## 附录 B：当前测试失败清单

来自 `bun run check`（HEAD `1026c0f`，Windows）：

```text
(fail) status > a project policy that weakens the user policy is named as such
        expected stdout to contain "  Project      <root>/project/.cc-safety-net/policy.json\n"
        received "  Project      <root>/project/.cc-safety-…\n"

(fail) behavioral contract ... allows an unquoted heredoc whose only expansion is a variable at standard safety
        expected allow, received deny/hard_stop policy-protection

(fail) behavioral contract ... blocks an unquoted heredoc script that a later command executes
        expected ruleId rm.recursive-force-root-or-home, received policy hard_stop

(fail) behavioral contract ... blocks a brace-group heredoc piped into a shell
        expected stop_and_explain, received hard_stop

(fail) behavioral contract ... blocks a script written from a redirected group heredoc and then executed
        expected stop_and_explain, received hard_stop

(fail) behavioral contract ... blocks an unquoted heredoc carrying a destructive command and a live expansion at strict safety
        expected stop_and_explain, received hard_stop

(fail) (unnamed) tests/core/git/metadata.test.ts
        git -c protocol.file.allow=always submodule add -q ../sub vendor/sub
```

## 附录 C：本次实际运行的命令

```text
git status --short
bun run typecheck
bun run lint
bun run lint:comments
bun run format:check
bun run knip                 (环境无法启动，见 P2-4)
bun run check-duplicates     (失败，4 clones)
bun run build                (通过；dist 与 HEAD 一致)
bun run test                 (2440 pass / 46 skip / 7 fail)
bun run test:coverage        (测试失败；覆盖率已生成)
bun run verify:coverage      (通过：95.91% lines / 96.70% functions)
bun run check                (失败，7 fail)
```

动态复现使用项目自身的 `createProcessEnvironment`、`evaluateGuard`、`findSensitiveTargetInCommand`、
`findPolicyConfigMutationTargetInToolInput` 和 `createTestEnvironment`；临时文件位于系统临时目录，未写入仓库。
