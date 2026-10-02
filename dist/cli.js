import{c,s,r,w,o,ee,n,h,xe,z,kt,Tt,u,be,ve,_t,D,te,ce,C,At,H,x,Te,V,d,q,ct,lt,O,le,Pe,l}from"./chunks/index-zfqjpg71.js";import{k,De,Ye,T,ft,Ze,i,Xe,M,Ce,gt,b,E,R,_,pe,fe,Fe,ht,p,e,Me,Ee,Qe,et,oe,Re,ie,Ne,Y,U,$e,me,G,tt,se,Z,X,ae,nt,rt,P,W,je,Ge,We,A,Be,Le,ze,f,t,Q,ge,m,v,I,yt,He,Ve,S,B}from"./chunks/index-qfqd42pr.js";import{re,K,j,we}from"./chunks/index-sygqnce0.js";var Ks=["-h","--help"];function dt(a,g){let y=Object.entries(a.booleans??{}),L=Object.entries(a.values??{}),F=Object.entries(a.lists??{}),N=Object.fromEntries(y.map(([ke])=>[ke,!1])),J={},ne=Object.fromEntries(F.map(([ke])=>[ke,[]])),de=[],ue=[],ye=!1,Se=-1;for(let[ke,Ie]of g.entries()){if(ke<=Se)continue;if(Ie==="--"){de.push(...g.slice(ke+1));break}if(Ks.includes(Ie)){ye=!0;continue}let he=y.find(([,Ae])=>Ae.includes(Ie));if(he){N[he[0]]=!0;continue}let _e=L.find(([,Ae])=>Ae.includes(Ie));if(_e){let Ae=g[ke+1];if(Ae===void 0||Ae.startsWith("-")){ue.push(`${Ie} requires a value`);continue}J[_e[0]]=Ae,Se=ke+1;continue}let Oe=F.find(([,Ae])=>Ae.includes(Ie));if(Oe){let Ae=g.slice(ke+1),Je=Ae.findIndex((st)=>st.startsWith("-")),Ke=Ae.slice(0,Je===-1?Ae.length:Je);if(Ke.length===0){ue.push(`${Ie} requires at least one value`);continue}ne[Oe[0]]=[...ne[Oe[0]]??[],...Ke],Se=ke+Ke.length;continue}if(Ie.startsWith("-")){ue.push(`Unknown option for ${a.label}: ${Ie}`);continue}if(a.positionals==="tail"){de.push(...g.slice(ke));break}de.push(Ie)}if(a.positionals!=="list"&&a.positionals!=="tail")ue.push(...de.map((ke)=>`Unexpected argument for ${a.label}: ${ke}`));return{flags:N,values:J,lists:ne,positionals:de,help:ye,errors:ue}}function Rt(a){for(let g of a)console.error(g);return a.length>0}import{readdirSync as ri,statSync as yr,unlinkSync as oi}from"node:fs";import{basename as vr,dirname as si,isAbsolute as ii,join as ai,relative as li,resolve as ci,sep as di}from"node:path";var mr=(a)=>{let g=Date.now()-new Date(a).getTime();if(!Number.isFinite(g))return"";let y=Math.floor(g/60000),L=Math.floor(y/60),F=Math.floor(L/24);if(F>0)return`${F}d ago`;if(L>0)return`${L}h ago`;if(y>0)return`${y}m ago`;return"just now"},Pn=(a)=>{let g=(a??"").trim().split(/\s+/).filter((F)=>F&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(F)),y=g[0]?.split("/").pop();if(!y)return null;let L=g[1];return L&&/^[a-z][a-z0-9-]*$/.test(L)?`${y} ${L}`:y};function gr(a){let g=(F)=>`${F.sessionId}
${Pn(F.segment||F.command)}`,y=a.filter((F)=>F.decision!=="allow"),L=y.filter((F)=>F.sessionId).reduce((F,N)=>F.set(g(N),(F.get(g(N))??0)+1),new Map);return new Set(y.filter((F)=>F.failureStage||(L.get(g(F))??0)>=2))}import{existsSync as Zs,readdirSync as Xs,readFileSync as Qs}from"node:fs";import{join as ei}from"node:path";function Pt(a,g){try{return Xs(a,{withFileTypes:!0,encoding:"utf8"}).flatMap((y)=>{let L=ei(a,y.name);if(y.isDirectory())return Pt(L,g);if(y.name.endsWith(".jsonl"))return[L];return[]})}catch{if(g&&Zs(a))g.count++;return[]}}var ti=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function ni(a){if(!a||typeof a!=="object"||Array.isArray(a))return!1;let g=a;if(typeof g.ts!=="string"||typeof g.command!=="string")return!1;return ti.every((y)=>g[y]===void 0||typeof g[y]==="string")}function It(a,g){try{return Qs(a,"utf-8").split(`
`).filter(Boolean).flatMap((y)=>{try{let L=JSON.parse(y);if(!ni(L)){if(g)g.count++;return[]}return[L]}catch{if(g)g.count++;return[]}})}catch{if(g)g.count++;return[]}}function it(a){return Array.from(a,(g)=>{let y=g.charCodeAt(0);if(y<=31||y>=127&&y<=159)return`\\x${y.toString(16).padStart(2,"0")}`;return g}).join("")}function ui(a,g){let y=re(a),L=dt({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},g);if(Rt(L.errors))return null;if(L.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(L.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let F=L.values.limit===void 0?20:hr(L.values.limit);if(F===null)return console.error("--limit must be a positive number"),null;let N=L.values.since===void 0?Math.min(30,y):hr(L.values.since);if(N===null||N>y)return console.error(`--since must be a positive number of days no greater than ${y}`),null;let J={limit:F,limitExplicit:L.values.limit!==void 0,since:N,sinceExplicit:L.values.since!==void 0,all:L.flags.all,json:L.flags.json,suspect:L.flags.suspect,pruneLegacy:L.flags.pruneLegacy,dryRun:L.flags.dryRun,id:L.values.id,agent:L.values.agent,rule:L.values.rule,session:L.values.session,project:L.values.project===void 0?void 0:ci(L.values.project)};if(J.id&&(J.agent!==void 0||J.rule!==void 0||J.session!==void 0||J.project!==void 0||J.suspect||J.sinceExplicit||J.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(J.pruneLegacy&&(J.id!==void 0||J.agent!==void 0||J.rule!==void 0||J.session!==void 0||J.project!==void 0||J.suspect||J.all||J.sinceExplicit||J.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(J.dryRun&&!J.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return J}async function br(a,g,y={}){let L=ui(a,g);if(!L)return 1;let F=y.logsDir??j(a);if(L.pruneLegacy)return pi(F,L.json,L.dryRun);if(!F)return console.log(L.json?"[]":L.id?`No retained audit log entry found for id ${it(L.id)}.`:"No audit log entries found."),0;K(a,F);let N={count:0},J=Pt(F,N).flatMap((Se)=>It(Se,N).map((ke)=>({entry:ke,file:Se})));if(N.count>0)console.error(`warning: ${N.count} audit log ${N.count===1?"source":"sources"} could not be read; these results are incomplete`);if(L.id)return hi(J,L,y.timeZone);let ne=Date.now()-L.since*24*60*60*1000,de=J.filter((Se)=>yi(Se,L,F,ne)),ue=L.suspect?gr(de.map((Se)=>Se.entry)):null,ye=(ue?de.filter((Se)=>ue.has(Se.entry)):de).sort((Se,ke)=>Date.parse(ke.entry.ts)-Date.parse(Se.entry.ts)).slice(0,L.limit);if(L.json)return console.log(JSON.stringify(ye.map((Se)=>Se.entry),null,2)),0;if(ye.length===0)return console.log("No audit log entries found."),0;for(let Se of ye)console.log(Li(Se.entry,y.timeZone));return 0}function pi(a,g,y){let L=a?mi(a).map((ne)=>ai(a,ne)):[];if(y)return fi(L,g);let F=[],N=0,J=0;for(let ne of L){let de=yr(ne,{throwIfNoEntry:!1})?.size??0,ue=gi(ne);if(ue){F.push(`${vr(ne)}: ${ue}`);continue}N++,J+=de}if(g)return console.log(JSON.stringify({removedFiles:N,removedBytes:J,failedFiles:F.length})),F.length===0?0:1;console.log(N===0&&F.length===0?"No legacy audit log files found.":`Removed ${N} legacy audit log ${N===1?"file":"files"} (${Lr(J)}).`);for(let ne of F)console.error(`Could not remove ${it(ne)}`);if(console.log("Nested v2 audit logs were not changed."),N>0)console.log("This deletion cannot be undone.");return F.length===0?0:1}function fi(a,g){let y=a.reduce((L,F)=>L+(yr(F,{throwIfNoEntry:!1})?.size??0),0);if(g)return console.log(JSON.stringify({dryRun:!0,files:a.length,bytes:y})),0;if(console.log(a.length===0?"No legacy audit log files found.":`Would remove ${a.length} legacy audit log ${a.length===1?"file":"files"} (${Lr(y)}).`),console.log("Nested v2 audit logs are not included."),a.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function mi(a){try{return ri(a,{withFileTypes:!0}).filter((g)=>g.isFile()&&g.name.endsWith(".jsonl")).map((g)=>g.name)}catch{return[]}}function gi(a){try{return oi(a),null}catch(g){return g instanceof Error?g.message:String(g)}}function Lr(a){let g=["B","KiB","MiB","GiB"],y=Math.min(Math.floor(Math.log2(Math.max(a,1))/10),g.length-1);return`${Math.round(a/1024**y*10)/10} ${g[y]}`}function hi(a,g,y){let L=a.filter((N)=>N.entry.id===g.id);if(L.length>1)return console.error(`Multiple audit log entries found for id ${it(g.id??"")}.`),1;if(g.json)return console.log(JSON.stringify(L.map((N)=>N.entry),null,2)),0;let F=L[0];if(!F)return console.log(`No retained audit log entry found for id ${it(g.id??"")}.`),0;return console.log(wi(F.entry,y)),0}function yi(a,g,y,L){if(!g.all&&a.entry.decision==="allow")return!1;if(Date.parse(a.entry.ts)<L)return!1;if(g.agent!==void 0&&a.entry.agent!==g.agent)return!1;if(g.rule!==void 0&&a.entry.ruleId!==g.rule)return!1;if(g.session!==void 0&&!vi(a,y,g.session))return!1;if(g.project!==void 0&&!bi(a.entry.cwd,g.project))return!1;return!0}function vi(a,g,y){if(a.entry.sessionId===y)return!0;return si(a.file)===g&&vr(a.file,".jsonl")===y}function bi(a,g){if(!a)return!1;let y=li(g,a);return y!==".."&&!y.startsWith(`..${di}`)&&!ii(y)}function Li(a,g){let y=it(a.id??"-"),L=it(a.decision??"deny"),F=a.cwd?`  [${it(a.cwd)}]`:"",N=a.segment||a.command,J=N===a.command?"":"↳ ",ne=N.length>50?`${N.slice(0,50)}…`:N;return`${y.padEnd(16)}  ${it(wr(a.ts,g))}  ${L.padEnd(5)}  ${it(a.agent??"-").padEnd(15)}  ${it(a.ruleId??"-").padEnd(20)}  ${J}${it(ne)}${F}`}function wi(a,g){let y=(F)=>it(F===void 0||F===null||F===""?"-":F),L=a.shape?`${a.agent??"-"} (shape: ${a.shape})`:a.agent??"-";return[`id:        ${y(a.id)}`,`ts:        ${y(wr(a.ts,g))}`,`decision:  ${y(a.decision)}`,`agent:     ${y(L)}`,`level:     ${y(a.level)}`,`tool:      ${y(a.toolName)}`,`rule:      ${y(a.ruleId)}`,`intent:    ${y(a.intent)}`,`stage:     ${y(a.failureStage)}`,`error:     ${y(a.errorCode)}`,`session:   ${y(a.sessionId)}`,`cwd:       ${y(a.cwd)}`,`version:   ${y(a.v)}`,`truncated: ${y(a.truncated===!0?"yes":void 0)}`,`reason:    ${y(a.reason)}`,`command:   ${y(a.command)}`,`segment:   ${y(a.segment)}`].join(`
`)}function wr(a,g){let y=new Date(a);if(Number.isNaN(y.getTime()))return a;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:g}).format(y)}function hr(a){let g=Number(a);return Number.isFinite(g)&&g>0?g:null}var xr={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var kr={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var Sr={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var Rr={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var Yt={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var En=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],$n=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],Nt={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...En.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...$n,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var Dr={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var Kt=[Dr,xr,Rr,kr,Nt,Yt,Sr];function xi(a){return a.aliases??[]}function Zt(a){let g=a.toLowerCase();return Kt.find((y)=>y.name.toLowerCase()===g||xi(y).some((L)=>L.toLowerCase()===g))}import{basename as ki}from"node:path";function Xt(a,g=7,y=j(a)){let L=Date.now()-g*24*60*60*1000,F=[],N=new Set,J=0,ne,de,ue,ye;if(y)K(a,y);let Se={count:0},ke=y?Pt(y,Se):[];for(let he of ke)for(let _e of It(he,Se)){if(_e.decision==="allow")continue;let Oe=new Date(_e.ts).getTime();if(Oe>=L){if(J++,N.add(_e.sessionId??ki(he,".jsonl")),de===void 0||Oe<=de)ne=_e.ts,de=Oe;if(ye===void 0||Oe>ye)ue=_e.ts,ye=Oe;Si(F,_e,Oe)}}let Ie=F.map((he)=>({timestamp:he.ts,command:he.command,reason:he.reason,relativeTime:mr(new Date(he.ts))}));return{totalBlocked:J,sessionCount:N.size,recentEntries:Ie,oldestEntry:ne,newestEntry:ue,unreadable:Se.count}}function Si(a,g,y){let L=a.findIndex((F)=>y>new Date(F.ts).getTime());if(L===-1){if(a.length<3)a.push(g);return}if(a.splice(L,0,g),a.length>3)a.pop()}import{dirname as Oi}from"node:path";import{dirname as Ri,join as Di,resolve as Ci}from"node:path";var Pi="config.json";function ut(a,g,y,L){h(Ei(a),`${JSON.stringify(g,null,2)}
`,y,L)}function Ei(a){return typeof a==="string"?ee(a):a}function _n(a){return{errors:oe(Ai(a),": "," "),ruleNames:new Set(Ne(a).map((g)=>g.toLowerCase()))}}var $i="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",Cr="must match pattern (letters, numbers, hyphens, underscores)";function Ai(a){if(!Pr(a))return[e([],"Config must be an object")];return[...a.version===1?[]:[e(["version"],"must be 1")],..._i(a.rules)]}function _i(a){if(a===void 0)return[];if(!Array.isArray(a))return[e(["rules"],"must be an array")];return[...a.flatMap((g,y)=>Pr(g)?ji(g,["rules",y]):[e(["rules",y],"must be an object")]),...Me(a)]}function ji(a,g){return[...An(a.name,[...g,"name"],"required string",u,$i),...An(a.command,[...g,"command"],"required string",R,Cr),...a.subcommand===void 0?[]:An(a.subcommand,[...g,"subcommand"],"must be a string if provided",R,Cr),...Ti(a.block_args,[...g,"block_args"]),...Fi(a.reason,[...g,"reason"]),...a.intent===void 0||Re(a.intent)?[]:[e([...g,"intent"],Ee)]]}function An(a,g,y,L,F){if(typeof a!=="string")return[e(g,y)];return L.test(a)?[]:[e(g,F)]}function Ti(a,g){if(!Array.isArray(a))return[e(g,"required array")];if(a.length===0)return[e(g,"must have at least one element")];return a.flatMap((y,L)=>{if(typeof y!=="string")return[e([...g,L],"must be a string")];return y===""?[e([...g,L],"must not be empty")]:[]})}function Fi(a,g){if(typeof a!=="string")return[e(g,"required string")];if(a==="")return[e(g,"must not be empty")];return a.length>_?[e(g,`must be at most ${_} characters`)]:[]}function Pr(a){return!!a&&typeof a==="object"&&!Array.isArray(a)}function jn(a){let g=Er(a);if(!g.ok)return g.result;return _n(g.parsed)}function Er(a){let g=[],y=new Set;try{let L=typeof a==="string"?ee(a):a,F=n(L);if(F===null)return g.push(`File not found: ${L.path}`),{ok:!1,result:{errors:g,ruleNames:y}};if(!F.trim())return g.push("Config file is empty"),{ok:!1,result:{errors:g,ruleNames:y}};return{ok:!0,parsed:JSON.parse(F)}}catch(L){if(L instanceof r)return g.push(L.message),{ok:!1,result:{errors:g,ruleNames:y}};let F=L instanceof Error?L.message:String(L);return g.push(L instanceof SyntaxError?"Invalid JSON":F),{ok:!1,result:{errors:g,ruleNames:y}}}}function $r(a){return Ci(a,".safety-net.json")}function Dt(a){let g=Er(a);if(!g.ok)return g.result;let y=Qe(g.parsed);return{errors:y.errors,ruleNames:y.sources}}function Qt(a,g={}){return Di(Ri(Te(a,g)),Pi)}function Ar(a,g,y){let L;try{if(n(g)===null)return{path:a,exists:!1,valid:!1,ruleCount:0};L=Dt(g),L.errors.push(...U(a,y))}catch(F){if(!(F instanceof r))throw F;L={errors:[F.message],ruleNames:new Set}}return{path:a,exists:!0,valid:L.errors.length===0,ruleCount:L.ruleNames.size,...L.errors.length>0?{errors:L.errors}:{}}}function Ii(a,g){return{source:g,name:a.name,command:a.command,subcommand:a.subcommand,blockArgs:[...a.block_args],reason:a.reason}}function _r(a,g){let y=V(a),L=H(g),F=Oi(y),N=Y(a,{cwd:g,userConfigPath:y,projectConfigPath:L,userConfigDir:F}),J=q(a,{cwd:g,userConfigPath:y,projectConfigPath:L,userConfigDir:F}),ne=new Map(N.rulebooks.flatMap((de)=>de.rules.map((ue)=>[ue,de.source])));return{userConfig:Ar(y,J.userConfigTarget,J.userScope),projectConfig:Ar(L,J.projectConfigTarget,J.projectScope),effectiveRules:N.rules.map((de)=>Ii(de,ne.get(de.name)??"project"))}}var Ni=[{flag:i.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:i.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:i.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:i.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:i.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:i.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:i.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:i.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"}];function jr(a){return[...Ni.map((g)=>({name:g.flag.name,value:Ce(g.flag,a.env),isSet:gt(g.flag,a.env),legacyName:g.flag.legacyName,legacyValue:g.flag.legacyName?a.env.get(g.flag.legacyName):void 0,legacyIsSet:g.flag.legacyName?a.env.get(g.flag.legacyName)!==void 0:void 0,description:g.description,defaultBehavior:g.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:a.env.get("CC_SAFETY_NET_HOME"),isSet:a.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var Tn=[{id:"opencode",displayName:"OpenCode",doctorOrder:1,install:{order:1,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}}],en=Tn.slice().sort((a,g)=>a.doctorOrder-g.doctorOrder).map((a)=>a.id),tn=Tn.slice().sort((a,g)=>a.install.order-g.install.order).map((a)=>({id:a.id,...a.install})).map(({order:a,...g})=>g),Mi=Object.fromEntries(Tn.map((a)=>[a.id,a.displayName]));function Ct(a){return Mi[a]}var Tr={error:0,warning:1,info:2},Hi=["policy","config","audit"];function qi(a){return a.map((g)=>{if(g==="ownership")return"is not owned by the current user";if(g==="permissions")return"has unsafe permissions";if(g==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var Ui=[{derive:(a)=>a.hooks.length>0&&a.hooks.every((g)=>!g.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(a)=>a.hooks.filter((g)=>g.inspectionStatus==="failed").map((g)=>{let y=Ct(g.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${y} inspection failed`,detail:`Doctor could not verify the ${y} integration configuration.`,fixHint:`Correct the reported ${y} configuration error, then run \`cc-safety-net doctor\` again.`,integration:g.platform}})},{derive:(a)=>a.userConfig.exists&&!a.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:a.userConfig.path}]:[]},{derive:(a)=>a.projectConfig.exists&&!a.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:a.projectConfig.path}]:[]},{derive:(a)=>a.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${a.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(a)=>a.v2Leftovers&&a.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${a.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(a)=>{let g=a.environment.find((y)=>y.name==="CC_SAFETY_NET_AUDIT_SCOPE");return Xe(g?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Hi.map((a)=>({derive:(g)=>g.posture.directories.filter((y)=>y.kind===a&&y.status==="unsafe").map((y)=>({checkId:`posture.${a}-directory-unsafe`,severity:"error",title:`${a[0]?.toUpperCase()}${a.slice(1)} directory is unsafe`,detail:`The ${a} directory ${qi(y.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...y.path?{path:y.path}:{}}))})),{derive:(a)=>{let g=[...a.effectiveSafety.weakenedRuleOverrides].sort();return g.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${g.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${g.join(", ")}.`}]:[]}}];function Fr(a){return Ui.flatMap((g,y)=>g.derive(a).map((L,F)=>({finding:L,catalogOrder:y,occurrence:F}))).sort((g,y)=>Tr[g.finding.severity]-Tr[y.finding.severity]||g.catalogOrder-y.catalogOrder||g.occurrence-y.occurrence).map((g)=>g.finding)}function Lt(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var Bi=(a)=>Lt()?`\x1B[32m${a}\x1B[0m`:a,Gi=(a)=>Lt()?`\x1B[33m${a}\x1B[0m`:a,zi=(a)=>Lt()?`\x1B[34m${a}\x1B[0m`:a,Vi=(a)=>Lt()?`\x1B[36m${a}\x1B[0m`:a,Ji=(a)=>Lt()?`\x1B[31m${a}\x1B[0m`:a,Wi=(a)=>Lt()?`\x1B[2m${a}\x1B[0m`:a,Yi=(a)=>Lt()?`\x1B[1m${a}\x1B[0m`:a,qe={green:Bi,yellow:Gi,blue:zi,cyan:Vi,red:Ji,dim:Wi,bold:Yi},Ki="\x1B[0m",Zi=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function Xi(a){let g=a;return()=>(g=(g*1664525+1013904223)%4294967296,g/4294967296)}function Qi(a){let g=[...Zi],y=Xi(a);for(let L=g.length-1;L>0;L--){let F=Math.floor(y()*(L+1)),N=g[L];g[L]=g[F],g[F]=N}return g}function ea(a,g=0){if(!Lt())return"";let y=Qi(g);return`\x1B[38;5;${y[a%y.length]}m`}function Or(a,g,y=0){if(!Lt())return`"${a}"`;return`${ea(g,y)}"${a}"${Ki}`}function nn(a){return a==="default"?"built-in default":`${a} policy`}var ta=new RegExp("\x1B\\[[0-9;]*m","g"),Fn=(a)=>a.replace(ta,"").length;function Et(a){let g=(a.headers??a.rows[0]??[]).map((J,ne)=>{let de=Math.max(...a.rows.map((ue)=>Fn(ue[ne]??"")));return Math.max(Fn(J),de)}),y=(J,ne)=>J+" ".repeat(Math.max(0,ne-Fn(J))),L=(J,ne)=>ne[0]+g.map((de)=>J.repeat(de+2)).join(ne[1])+ne[2],F=(J)=>`│ ${J.map((ne,de)=>y(ne,g[de]??0)).join(" │ ")} │`,N=a.headers?[`   ${F(a.headers)}`,`   ${L("─",["├","┼","┤"])}`]:[];return[`   ${L("─",["┌","┬","┐"])}`,...N,...a.rows.map((J)=>`   ${F(J)}`),`   ${L("─",["└","┴","┘"])}`].join(`
`)}function Ir(a){let g=[];g.push("Hook Integration"),g.push(na(a));let y=[],L=[];for(let F of a){let N=Ct(F.platform);if(F.errors&&F.errors.length>0)for(let J of F.errors)if(F.configured)y.push({platform:N,message:J});else L.push({platform:N,message:J})}for(let F of y)g.push(`   Warning (${F.platform}): ${F.message}`);for(let F of L)g.push(qe.red(`   Error (${F.platform}): ${F.message}`));return g.join(`
`)}function na(a){let g=["Platform","Discovery","Configuration","Inspection"],y=a.map((L)=>{let F=Ct(L.platform);if(L.inspectionStatus==="not-inspected"){let de=qe.dim("Not inspected");return[F,de,de,de]}let N=L.detected?qe.green("Detected"):L.inspectionStatus==="failed"?qe.red("Unknown"):qe.dim("Not detected"),J=L.configured?qe.green("Configured"):L.detected?qe.yellow("Not configured"):L.inspectionStatus==="failed"?qe.red("Unknown"):qe.dim("Not applicable"),ne=L.inspectionStatus==="verified"?qe.green("Verified"):L.inspectionStatus==="failed"?qe.red("Failed"):qe.dim("Not applicable");return[F,N,J,ne]});return Et({headers:g,rows:y})}function Nr(a){let y=["Guard Engine Verification",`   Synthetic self-test: ${a.failed>0?qe.red(`${a.passed}/${a.total} FAIL`):qe.green(`${a.passed}/${a.total} passed`)}`],L=a.results.filter((F)=>!F.passed);if(L.length>0){y.push(""),y.push(qe.red("   Failures:"));for(let F of L)y.push(qe.red(`   • ${F.description}`)),y.push(qe.red(`     expected ${F.expected}, got ${F.actual}`))}return y.join(`
`)}function ra(a){if(a.length===0)return"   (no custom rules)";let g=["Source","Name","Command","Block Args"],y=a.map((L)=>[L.source,L.name,L.subcommand?`${L.command} ${L.subcommand}`:L.command,L.blockArgs.join(", ")]);return Et({headers:g,rows:y})}function Mr(a){let g=[];if(g.push("Configuration"),g.push(oa(a.userConfig,a.projectConfig)),g.push(""),a.effectiveRules.length>0)g.push(`   Effective rules (${a.effectiveRules.length} total):`),g.push(ra(a.effectiveRules));else g.push("   Effective rules: (none - using built-in rules only)");return g.join(`
`)}function oa(a,g){let y=["Scope","Status"],L=(N)=>{if(!N.exists)return qe.dim("N/A");if(!N.valid)return qe.red(`Invalid (${N.errors?.[0]??"unknown error"})`);return qe.green("Configured")},F=[["User",L(a)],["Project",L(g)]];return Et({headers:y,rows:F})}function Hr(a){let g=[];return g.push("Environment"),g.push(sa(a)),g.join(`
`)}function qr(a){let g=a.effectiveSafety.policyScopes,y=["Effective Safety",`   Selected preset: ${a.effectiveSafety.selectedPreset}${g?` (${nn(g.levelScope)})`:""}`,`   Effective: ${a.effectiveSafety.level}`],L=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[F,N]of L){let J=a.effectiveSafety.capabilities[F],ne=J.enabled?qe.green("ON"):qe.dim("OFF"),de=J.sources.length>0?` (${J.sources.join(", ")})`:"";y.push(`   ${N}: ${ne} via ${J.source}${de}`)}if(g&&g.weakenings.length>0){y.push("   Project policy deltas:");for(let F of g.weakenings)y.push(`      ${F}`)}y.push(`   Stored rule customizations: ${a.effectiveSafety.ruleCounts.stored}`),y.push(`   Effective rule customizations: ${a.effectiveSafety.ruleCounts.effective}`);for(let[F,N]of Object.entries(a.effectiveSafety.ruleOverrides))y.push(`   ${F}: ${N}`);return y.join(`
`)}function Ur(a){let g=["Findings"];if(a.length===0)return g.push("   No findings from inspected doctor facts."),g.join(`
`);for(let y of a){let L=`[${y.severity.toUpperCase()}] ${y.checkId}: ${it(y.title)}`,F=y.severity==="error"?qe.red:y.severity==="warning"?qe.yellow:qe.blue;if(g.push(`   ${F(L)}`),g.push(`      ${it(y.detail)}`),y.path)g.push(`      Path: ${it(y.path)}`);if(y.fixHint)g.push(`      Fix: ${it(y.fixHint)}`)}return g.join(`
`)}function sa(a){let g=["Variable","Status","Legacy"],y=a.map((L)=>{let F=L.isSet?qe.green("✓"):qe.dim("✗"),N=L.legacyName&&L.legacyIsSet?`${L.legacyName} ${qe.green("✓")}`:L.legacyName??"";return[L.name,F,N]});return Et({headers:g,rows:y})}function Br(a){let g=[];if(a.totalBlocked===0)g.push("Recent Activity"),g.push("   No blocked commands in the last 7 days"),g.push("   Tip: This is normal for new installations");else g.push(`Recent Activity · last 7 days (${a.totalBlocked} blocked / ${a.sessionCount} sessions)`),g.push(ia(a.recentEntries));if(a.unreadable>0)g.push(`   Warning: ${a.unreadable} audit log ${a.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return g.join(`
`)}function ia(a){let g=["Time","Command"],y=a.map((L)=>{let F=it(L.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),N=F.length>40?`${F.slice(0,37)}...`:F;return[L.relativeTime,N]});return Et({headers:g,rows:y})}function Gr(a){let g=[];if(g.push("Update Check"),a.latestVersion===null&&!a.error)return g.push(rn([["Status",qe.dim("Skipped")],["Installed",a.currentVersion]])),g.join(`
`);if(a.error)return g.push(rn([["Status",`${qe.yellow("⚠")} Error`],["Installed",a.currentVersion],["Error",qe.dim(a.error)]])),g.join(`
`);if(a.updateAvailable)return g.push(rn([["Status",`${qe.yellow("⚠")} Update Available`],["Current",a.currentVersion],["Latest",qe.green(a.latestVersion??"")]])),g.push(""),g.push("   Run: bunx cc-safety-net@latest doctor"),g.push("   Or:  npx cc-safety-net@latest doctor"),g.join(`
`);return g.push(rn([["Status",`${qe.green("✓")} Up to date`],["Version",a.currentVersion]])),g.join(`
`)}function rn(a){return Et({rows:a})}function zr(a){let g=[];return g.push("System Info"),g.push(aa(a)),g.join(`
`)}function aa(a){let g=["Component","Version"],y=(N)=>{if(N===null)return qe.dim("not found");return N},F=[{label:"cc-safety-net",value:a.version},...en.map((N)=>({label:Ct(N),value:a.versions[N]??null})),{label:"Node.js",value:a.nodeVersion},{label:"npm",value:a.npmVersion},{label:"Bun",value:a.bunVersion},{label:"Platform",value:a.platform}].map((N)=>[N.label,y(N.value)]);return Et({headers:g,rows:F})}function Vr(a){if(a.findings.length===0)return qe.green(`
No findings from inspected doctor facts.`);let g={error:a.findings.filter((N)=>N.severity==="error").length,warning:a.findings.filter((N)=>N.severity==="warning").length,info:a.findings.filter((N)=>N.severity==="info").length},y=["error","warning","info"].filter((N)=>g[N]>0).map((N)=>`${g[N]} ${N}`),L=a.findings.length===1?"finding":"findings",F=`
${a.findings.length} ${L}: ${y.join(", ")}.`;if(g.error>0)return qe.red(F);if(g.warning>0)return qe.yellow(F);return qe.blue(F)}import{lstatSync as la}from"node:fs";import{dirname as On}from"node:path";function In(a,g){try{let y=la(g);if(y.isSymbolicLink())return{kind:a,path:g,status:"unsafe",issues:["symlink"]};if(!y.isDirectory())return{kind:a,path:g,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:a,path:g,status:"unknown",issues:[]};let L=[...y.uid!==process.getuid()?["ownership"]:[],...(y.mode&18)!==0?["permissions"]:[]];return{kind:a,path:g,status:L.length>0?"unsafe":"safe",issues:L}}catch(y){if(typeof y==="object"&&y!==null&&"code"in y&&y.code==="ENOENT")return{kind:a,path:g,status:"not-applicable",issues:[]};return{kind:a,path:g,status:"unknown",issues:[]}}}function Jr(a,g){let y=j(a);return{directories:[In("policy",On(On(g))),In("config",On(g)),...y?[In("audit",y)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as ca}from"node:child_process";import{existsSync as Wr}from"node:fs";import{delimiter as da,extname as ua,join as pa}from"node:path";import{stripVTControlCharacters as Yr}from"node:util";var Zr="2.4.14",fa=5000,ma="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function Mt(){return Zr}function Nn(a,g){let y=a[g];if(y)return y;let L=Object.keys(a).find((F)=>F.toLowerCase()===g.toLowerCase()&&!!a[F]);return L?a[L]:y}function ga(a){return(Nn(a,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((g)=>g.length>0)}function ha(a,g){let y=ua(a)?[a]:[...ga(g).map((L)=>`${a}${L}`),a];if(a.includes("/")||a.includes("\\"))return y.find((L)=>Wr(L))??a;return(Nn(g,"PATH")??"").split(da).flatMap((L)=>y.map((F)=>pa(L,F))).find((L)=>Wr(L))??a}function Kr(a){if(!/[\s"&|<>^]/.test(a))return a;return`"${a.replace(/"/g,'""')}"`}function ya(a,g){let[y,...L]=a,F=g[ma]==="win32"?"win32":process.platform;if(!y||F!=="win32")return{cmd:y??"",args:L};let N=ha(y,g);if(!/\.(?:bat|cmd)$/i.test(N))return{cmd:N,args:L};return{cmd:Nn(g,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",Kr(N),...L.map(Kr)].join(" ")]}}var va=async(a,g=fa)=>{let y=await ba(a,{timeoutMs:g});if(y.code!==0)return null;return Yr(y.stdout).trim()||Yr(y.stderr).trim()||null};function ba(a,g){let[y,...L]=a;if(!y)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((F)=>{try{let N=ya([y,...L],process.env),J=ca(N.cmd,N.args,{stdio:["ignore","pipe","pipe"]}),ne=!1,de="",ue="";J.stdout.on("data",(ke)=>{de+=ke.toString()}),J.stderr.on("data",(ke)=>{ue+=ke.toString()});let ye=(ke)=>{if(ne)return;ne=!0,clearTimeout(Se),F(ke)},Se=setTimeout(()=>{J.kill(),ye({code:null,stdout:de,stderr:ue})},g.timeoutMs);J.on("close",(ke)=>{ye({code:ke,stdout:de,stderr:ue})}),J.on("error",()=>{ye({code:null,stdout:de,stderr:ue})})}catch{F({code:null,stdout:"",stderr:""})}})}function on(a){if(!a)return null;let g=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(a);if(g)return g[1]??null;let y=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(a);if(y)return y[1]??null;return a.split(`
`)[0]?.trim()||null}async function sn(a,g=va,y=process.cwd()){let L=Promise.all(tn.map(async(ue)=>[ue.id,on(await g([...ue.probeCommand]))])),[F,N,J,ne,de]=await Promise.all([L,L.then(async(ue)=>{let ye=ue.find(([Ie])=>Ie==="opencode")?.[1];if(!ye?.startsWith("2.")||!a(ye))return null;let Se=["--param",`location[directory]=${y}`],ke=["opencode","api","integration.list",...Se];return await g(ke,30000),g(["opencode","api","plugin.list",...Se],30000)}),g(["node","--version"]),g(["npm","--version"]),g(["bun","--version"])]);return{version:Zr,versions:Object.fromEntries(F),openCodePluginListOutput:N,nodeVersion:on(J),npmVersion:on(ne),bunVersion:on(de),platform:`${process.platform} ${process.arch}`}}function an(){return Promise.resolve({currentVersion:Mt(),latestVersion:null,updateAvailable:!1})}import{createHash as Sa}from"node:crypto";import{existsSync as eo}from"node:fs";import{dirname as ln,join as to}from"node:path";import{dirname as Xr,join as La,resolve as wa}from"node:path";var xa="rule.lock";function ka(a){return La(Xr(a),xa)}function Qr(a={}){return wa(a.cwd??process.cwd(),".safety-net.json")}function pt(a,g){let y=g.global?g.userConfigPath??V(a,g):g.projectConfigPath??H(g.cwd??process.cwd()),L=g.global?ct(a,g):lt(y,g.cwd??process.cwd()),F=ka(y);return{configDir:Xr(y),configPath:y,lockPath:F,filesystemScope:L,configTarget:o(L,y),lockTarget:o(L,F)}}var Ra="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Da="cache",Ca="rulebooks";function no(a,g={}){let y=pt(a,g),L=o(y.filesystemScope,oo(y.configDir)),F=n(y.lockTarget);if(console.log(Ra),F===null&&!eo(L.path))return console.log(`No v2 lock or cache leftovers found in ${ln(y.configDir)}; nothing to migrate.`),0;let N=_a(F),J=p(y.configTarget);if(!J.config&&(n(y.configTarget)!==null||N.size>0))return console.error(`Cannot migrate: the rules config in ${ln(y.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let ne=J.config?.rules??[];for(let de of ne.flatMap((ue)=>Pa(ue,N,y,L,g.global===!0)))console.log(de);return z(y.lockTarget),kt(L),console.log(`Removed the v2 lock and cache under ${ln(y.configDir)}.`),0}function ro(a,g){return[...new Set([{cwd:g},{cwd:g,global:!0}].flatMap((y)=>{let L=pt(a,y);return[L.lockPath,oo(L.configDir)]}))].filter((y)=>eo(y))}function Pa(a,g,y,L,F){if(!C(a))return[];let N=D(a).name,J=o(y.filesystemScope,O(y.configDir,N)),ne=n(J);if(ne!==null&&Ea(ne,N))return[];let de=g.get(a),ue=de?$a(de,N,L.path,y.filesystemScope):null;if(ue===null)return[`Could not migrate ${a} from the v2 cache. Run \`cc-safety-net rule update ${a}${F?" --global":""}\` to vendor it.`];if(h(J,ue),ne!==null)return[`Restored ${a} from the v2 cache over an invalid file.`];return[`Vendored ${a} from the v2 cache.`]}function Ea(a,g){let y=me(a);return!("problem"in y)&&y.rulebook.name===g}function $a(a,g,y,L){let F=to(y,Ca,`${Aa(a)}--${a.digest.replace("sha256:","").slice(0,12)}`,be),N=n(o(L,F));if(N===null||Fa(N)!==a.digest)return null;let J=me(N);if("problem"in J||J.rulebook.name!==g)return null;return N}function oo(a){return to(ln(a),Da)}function Aa(a){return([a.owner,a.repo,a.display_ref,a.name].every((L)=>typeof L==="string"&&L!=="")?`${a.owner}/${a.repo}#${a.display_ref}/${a.name}`:a.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function _a(a){let g=a===null?null:Ta(a),y=so(g)&&Array.isArray(g.rulebooks)?g.rulebooks:[];return new Map(y.filter(ja).map((L)=>[L.spec,L]))}function ja(a){return so(a)&&typeof a.spec==="string"&&typeof a.digest==="string"}function so(a){return!!a&&typeof a==="object"}function Ta(a){try{return JSON.parse(a)}catch{return null}}function Fa(a){return`sha256:${Sa("sha256").update(a).digest("hex")}`}function Mn(a){return Math.max(0,Math.min(1,a))}function Hn(a){return Math.max(0,Math.min(255,Math.round(a)))}function qn(a){return a<=0.0031308?12.92*a:1.055*a**0.4166666666666667-0.055}function Oa(a,g,y){let L=y*Math.PI/180,F=g*Math.cos(L),N=g*Math.sin(L),J=(a+0.3963377774*F+0.2158037573*N)**3,ne=(a-0.1055613458*F-0.0638541728*N)**3,de=(a-0.0894841775*F-1.291485548*N)**3;return{blue:Hn(qn(Mn(-0.0041960863*J-0.7034186147*ne+1.707614701*de))*255),green:Hn(qn(Mn(-1.2684380046*J+2.6097574011*ne-0.3413193965*de))*255),red:Hn(qn(Mn(4.0767416621*J-3.3077115913*ne+0.2309699292*de))*255)}}function Ia(a,g){let y=(g*a*180/Math.PI%360+360)%360;return Oa(0.72,0.15,y)}function io(a,g=0.1){let y=Ia(g,a);return`\x1B[38;2;${y.red};${y.green};${y.blue}m`}var ao="\r\x1B[2K",Na="\x1B[?25l",Ma="\x1B[39m",Ha="\x1B[?25h",qa=100,Ua=0.55,Ba=80,lo=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Ga(a){return new Promise((g)=>setTimeout(g,a))}async function za(a,g={}){let y=g.output??process.stdout;if(!y.isTTY)return a;let L=g.sleep??Ga,F=!1,N=a.then((ne)=>(F=!0,ne),(ne)=>{throw F=!0,ne});if(await Promise.race([N.then(()=>!0),L(qa).then(()=>!1)]))return N;y.write(Na);try{for(let ne=0;!F;ne+=1)y.write(`${ao}${io(ne*Ua)}${lo[ne%lo.length]}${Ma} ${g.loadingMessage??"Loading…"}`),await Promise.race([N,L(Ba)]);return await N}finally{y.write(`${ao}${Ha}`)}}async function co(a,g,y,L={}){let F=g();if(a)await y();if(a&&F.ready)await za(F.ready,L);return F.finish()}import{existsSync as xo,readFileSync as ko}from"node:fs";import{basename as Ka,join as wo,resolve as Za}from"node:path";function uo(a){let g="",y=0,L=!1,F=!1,N=-1;while(y<a.length){let J=a[y],ne=a[y+1];if(F){g+=J,F=!1,y++;continue}if(J==='"'&&!L){L=!0,N=-1,g+=J,y++;continue}if(J==='"'&&L){L=!1,g+=J,y++;continue}if(J==="\\"&&L){F=!0,g+=J,y++;continue}if(L){g+=J,y++;continue}if(J==="/"&&ne==="/"){while(y<a.length&&a[y]!==`
`)y++;continue}if(J==="/"&&ne==="*"){y+=2;while(y<a.length-1){if(a[y]==="*"&&a[y+1]==="/"){y+=2;break}y++}continue}if(J===","){N=g.length,g+=J,y++;continue}if(J==="}"||J==="]"){if(N!==-1){let de=g.slice(N+1);if(/^\s*$/.test(de))g=g.slice(0,N)+de}N=-1,g+=J,y++;continue}if(!/\s/.test(J))N=-1;g+=J,y++}return g}function mt(a,g){return typeof a==="object"&&a!==null?a[g]:void 0}import{join as cn}from"node:path";var Un="cc-safety-net",po=["opencode.json","opencode.jsonc"];function fo(a){return cn(a.env.get("XDG_CONFIG_HOME")||cn(a.home,".config"),"opencode")}function mo(a){return a.env.get("OPENCODE_CONFIG_DIR")||fo(a)}function go(a){return po.map((g)=>cn(mo(a),g))}function ho(a){return[...new Set([mo(a),fo(a)])].flatMap((g)=>po.map((y)=>cn(g,y)))}function yo(a){let g=Va(a);if(g.some(Ja))return;let y=g.find((L)=>mt(L,"status")==="failed");if(!y)return;return`OpenCode reports cc-safety-net failed: ${String(mt(y,"error")).split(`
`)[0]}`}function Va(a){return Wa(a).filter((g)=>mt(g,"id")===Un||Lo(mt(mt(g,"source"),"target"))).map((g)=>mt(g,"state"))}function Ja(a){return mt(a,"status")==="active"}function Wa(a){if(!a)return[];try{let g=mt(JSON.parse(a),"data");return Array.isArray(g)?g:[]}catch{return[]}}function vo(a,g){return["plugin","plugins"].some((y)=>{let L=mt(a,y);if(!Array.isArray(L))return!1;return L.some((F)=>{if(Lo(F))return!0;let N=bo(F);return g!==void 0&&typeof N==="string"&&Ya(N)&&g(N)})})}var Bn=new Set([Un,"@local/cc-safety-net"]);function bo(a){return typeof a==="string"?a:mt(a,"package")}function Ya(a){return a.startsWith(".")||a.startsWith("~")||/[\\/]/.test(a)}function Lo(a){let g=bo(a);return typeof g==="string"&&(Bn.has(g)||g.startsWith(`${Un}@`))}function Xa(a,g,y){let L=a.startsWith("~")?wo(y,a.slice(1)):a,F=wo(Za(g,L),"package.json");if(!xo(F))return!1;try{let N=mt(JSON.parse(ko(F,"utf-8")),"name");return typeof N==="string"&&Bn.has(N)}catch{return!1}}function Ht(a){let g=[];for(let y of a.openCodeVersion?.startsWith("2.")?go(a.environment):ho(a.environment))if(xo(y))try{let L=ko(y,"utf-8"),F=uo(L),N=JSON.parse(F);if(vo(N,(J)=>Xa(J,a.cwd,a.environment.home))){let J=yo(a.openCodePluginListOutput);if(J)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:y,errors:[...g,J]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:y,errors:g.length>0?g:void 0}}}catch(L){g.push(`Failed to parse ${Ka(y)}: ${L instanceof Error?L.message:String(L)}`)}return{platform:"opencode",status:"n/a",errors:g.length>0?g:void 0}}var Qa={opencode:Ht};function dn(a,g,y){let L={...y,cwd:g,environment:a};return en.map((F)=>el(Qa[F](L)))}function el(a){if(a.status==="not-inspected")return{platform:a.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:a.platform,detected:a.status!=="n/a",configured:a.status==="configured",inspectionStatus:a.status!=="n/a"?"verified":a.errors&&a.errors.length>0?"failed":"not-applicable",method:a.method,configPath:a.configPath,configPaths:a.configPaths,errors:a.errors}}import{join as tl}from"node:path";var nl=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),rl=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),ol={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function So(a){let g=tl(Pe(a),"cc-safety-net-self-test"),y=nl.map((L)=>{let F=we(a,E("self-test",{command:L.command},{kind:"command",shell:"auto"},{configCwd:g,executionCwd:g},L.command),{guard:{dependencies:{loadPolicySnapshot:()=>rl,getModes:()=>ol,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),N=L.expectBlocked?"blocked":"allowed",J=F.decision.kind==="deny"?"blocked":"allowed";return{command:L.command,description:L.description,expected:N,actual:J,passed:N===J,reason:F.decision.kind==="deny"?F.decision.reason:void 0,ruleId:F.decision.kind==="deny"?F.decision.ruleId:void 0}});return{passed:y.filter((L)=>L.passed).length,failed:y.filter((L)=>!L.passed).length,total:y.length,results:y}}function Gn(a){let g=dt({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},a);if(Rt(g.errors))return null;return{json:g.flags.json,skipUpdateCheck:g.flags.skipUpdateCheck}}async function Ro(a,g={}){let y=await co(!g.json,()=>{let L=sl(a,g);return{ready:L,finish:()=>L}},async()=>{},{loadingMessage:"Checking system status…"});if(g.json)console.log(JSON.stringify(y,null,2));else il(y);return y.engineSelfTest.failed>0||y.findings.some((L)=>L.severity==="error")?1:0}async function sl(a,g){let y=g.cwd??process.cwd(),L=await sn((_e)=>Ht({environment:a,cwd:y,openCodeVersion:_e}).status!=="n/a",void 0,y),F=dn(a,y,{openCodeVersion:L.versions.opencode,openCodePluginListOutput:L.openCodePluginListOutput}),N=_r(a,y),J=jr(a),ne=A(a,{cwd:y}),de=ne.policy,ue=M(de,a.env),ye=se(de,ue.capabilities),Se=Xt(a,7),ke=ro(a,y),Ie=g.skipUpdateCheck?{currentVersion:Mt(),latestVersion:null,updateAvailable:!1}:await an(),he={hooks:F,engineSelfTest:So(a),userConfig:N.userConfig,projectConfig:N.projectConfig,configState:Be(ne),effectiveRules:N.effectiveRules,environment:J,effectiveSafety:{selectedPreset:de.safety.level??"standard",level:ue.effectiveLevel,capabilities:ue.capabilities,ruleOverrides:de.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(ye).filter(([,_e])=>_e.source==="rule_override"&&_e.override==="off"&&_e.inheritedEnabled&&_e.changesInherited).map(([_e])=>_e),ruleCounts:{stored:Object.keys(de.destructiveCommandRuleOverrides).length,effective:Object.values(ye).filter((_e)=>_e.changesInherited).length},...ne.policyScopes?{policyScopes:ne.policyScopes}:{}},...ke.length>0?{v2Leftovers:ke}:{},posture:Jr(a,N.userConfig.path),activity:Se,update:Ie,system:L};return{...he,findings:Fr(he)}}function il(a){console.log(),console.log(Ir(a.hooks)),console.log(),console.log(Nr(a.engineSelfTest)),console.log(),console.log(Mr(a)),console.log(),console.log(Hr(a.environment)),console.log(),console.log(qr(a)),console.log(),console.log(Ur(a.findings)),console.log(),console.log(Br(a.activity)),console.log(),console.log(zr(a.system)),console.log(),console.log(Gr(a.update)),console.log(Vr(a))}import{existsSync as al}from"node:fs";var ll=/^[A-Za-z0-9_@%+=:,./-]+$/,Do="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function zn(a){let g=dt({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},a);if(Rt(g.errors))return console.error(Do),console.error("Pass -- before a command that starts with dashes."),null;if(g.values.cwd!==void 0&&!al(g.values.cwd))return console.error(`Error: --cwd path does not exist: ${g.values.cwd}`),null;let y=g.positionals.length===1?g.positionals[0]:g.positionals.map((L)=>ll.test(L)?L:`'${L.replaceAll("'","'\\''")}'`).join(" ");if(!y)return console.error("Error: No command provided"),console.error(Do),null;return{json:g.flags.json,cwd:g.values.cwd,command:y}}function Co(a){if(a)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function Po(a,g){let L=g-18;return[`${a.dtl}${a.dh.repeat(g)}${a.dtr}`,`${a.dv}  Command Analysis${" ".repeat(L)}${a.dv}`,`${a.dbl}${a.dh.repeat(g)}${a.dbr}`]}function Vn(a){return JSON.stringify(a)}function Eo(a,g=0){return`[${a.map((L,F)=>Or(L,F,g)).join(",")}]`}function Ut(a,g,y=70){let L=a.split(" "),F=[],N="";for(let J of L)if(N&&N.length+J.length+1>y)F.push(N),N=J;else N=N?`${N} ${J}`:J;if(N)F.push(N);return F.map((J,ne)=>ne===0?J:`${g}${J}`)}function $o(a,g,y){let L=[];switch(a.type){case"parse":return null;case"env-strip":return L.push(""),L.push(`STEP ${g} ${y.h} Strip environment variables`),L.push(`  Removed: ${a.envVars.map((F)=>`${F}=<redacted>`).join(", ")}`),L.push(`  Tokens:  ${Vn(a.output)}`),{lines:L,incrementStep:!0};case"leading-tokens-stripped":return L.push(""),L.push(`STEP ${g} ${y.h} Strip wrappers`),L.push(`  Removed: ${a.removed.join(", ")}`),L.push(`  Tokens:  ${Vn(a.output)}`),{lines:L,incrementStep:!0};case"shell-wrapper":return L.push(""),L.push(`STEP ${g} ${y.h} Detect shell wrapper`),L.push(`  Wrapper: ${a.wrapper} -c`),L.push(`  Inner:   ${a.innerCommand}`),{lines:L,incrementStep:!0};case"interpreter":{if(L.push(""),L.push(`STEP ${g} ${y.h} Detect interpreter`),L.push(`  Interpreter: ${a.interpreter}`),L.push(`  Code:        ${a.codeArg}`),a.paranoidBlocked)L.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:L,incrementStep:!0}}case"busybox":return L.push(""),L.push(`STEP ${g} ${y.h} Busybox wrapper`),L.push(`  Subcommand: ${a.subcommand}`),{lines:L,incrementStep:!0};case"transparent-wrapper":return L.push(""),L.push(`STEP ${g} ${y.h} Transparent wrapper`),L.push(`  Wrapper: ${a.wrapper}`),L.push(`  Tokens:  ${Vn(a.output)}`),{lines:L,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(L.push(""),L.push(`STEP ${g} ${y.h} Match rules`),L.push(`  Rule:   ${a.rule}()`),a.matched)L.push("  Result: MATCHED");else L.push("  Result: No match");return{lines:L,incrementStep:!0}}case"worktree-relaxation":return L.push(""),L.push(`STEP ${g} ${y.h} Worktree relaxation`),L.push(`  Mode:   ${i.worktree.name}`),L.push(`  Git cwd: ${a.gitCwd}`),L.push("  Result: Allowed local discard in linked worktree"),{lines:L,incrementStep:!0};case"temp-root-relaxation":return L.push(""),L.push(`STEP ${g} ${y.h} Temp-root relaxation`),L.push(`  Git cwd: ${a.gitCwd}`),L.push("  Result: Allowed git discard in a temp-root repository"),{lines:L,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(a.embeddedCommandFound)return L.push(""),L.push(`STEP ${g} ${y.h} Fallback scan`),L.push(`  Found: ${a.embeddedCommandFound}`),{lines:L,incrementStep:!0};return null}case"custom-rules-check":{if(a.rulesChecked){if(L.push(""),L.push(`STEP ${g} ${y.h} Custom rules`),a.matched)L.push("  Result: MATCHED");else L.push("  Result: No match");return{lines:L,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(a.matched)return L.push(""),L.push(`STEP ${g} ${y.h} Dangerous text check`),L.push(`  Token:  ${a.token}`),L.push("  Result: MATCHED"),{lines:L,incrementStep:!0};return null}case"strict-unparseable":return L.push(""),L.push(`STEP ${g} ${y.h} Strict mode check`),L.push(`  Command: ${a.rawCommand}`),L.push("  Result:  ✗ UNPARSEABLE"),{lines:L,incrementStep:!0};case"segment-skipped":return null;case"error":return L.push(""),L.push(`ERROR: ${a.message}`),{lines:L,incrementStep:!1};default:return a}}function Jn(a,g){let y=Co(g?.asciiOnly??!1),L=58,F=[],N=1;F.push(...Po(y,58)),F.push("");let J=a.trace.steps.find((he)=>he.type==="error");if(J&&J.type==="error"){F.push("ERROR"),F.push(`  ${J.message}`),F.push(""),F.push("RESULT"),F.push(`  Status: ${a.result==="blocked"?qe.red("BLOCKED"):qe.green("ALLOWED")}`),F.push(""),F.push("CONFIG");let he=a.configSource??"none";return F.push(`  Path: ${he}`),F.join(`
`)}let ne=a.trace.steps.find((he)=>he.type==="parse");if(ne&&ne.type==="parse"){F.push("INPUT"),F.push(`  ${ne.input}`),F.push(""),F.push(`STEP ${N} ${y.h} Split shell commands`),N++;for(let he=0;he<ne.segments.length;he++){let _e=ne.segments[he];if(_e){let Oe=Math.random();F.push(`  Segment ${he+1}: ${Eo(_e,Oe)}`)}}}let de=a.trace.segments,ue=de.length>1;for(let he of de){if(ue){F.push("");let Je="";if(ne&&ne.type==="parse"){let Cn=ne.segments[he.index];if(Cn)Je=Cn.join(" ")}let Ke=54,st=Je,Ue=` Segment ${he.index+1}: `,at=" ";if(Je){if(Ue.length+Je.length+at.length>Ke){let Ys=Ke-Ue.length-at.length;st=`${Je.substring(0,Ys-1)}…`}}let vt=Je?`${Ue}${st}${at}`:` Segment ${he.index+1} `,Js=Je?`${Ue}${qe.cyan(st)}${at}`:vt,pr=58-vt.length,fr=Math.floor(pr/2),Ws=pr-fr;F.push(`${y.sh.repeat(fr)}${Js}${y.sh.repeat(Ws)}`)}if(he.steps.find((Je)=>Je.type==="segment-skipped")){F.push(""),F.push("  (skipped — prior segment blocked)");continue}let Oe=!1,Ae=!1;for(let Je of he.steps){let Ke=$o(Je,N,y);if(Ke){if(Ae=!0,Je.type==="recurse"){F.push("");let st=" RECURSING ",Ue=58-st.length-4;F.push(`  ${y.tl}${y.h}${st}${y.h.repeat(Ue)}`),F.push(`  ${y.v}`),Oe=!0;continue}for(let st of Ke.lines)if(Oe)F.push(`  ${y.v} ${st}`);else F.push(st);if(Ke.incrementStep)N++}}if(Oe)F.push(`  ${y.v}`),F.push(`  ${y.bl}${y.h.repeat(56)}`);if(!Ae)F.push(""),F.push(`  ${qe.green("✓")} Allowed (no matching rules)`)}if(F.push(""),F.push("RESULT"),a.result==="blocked"){if(F.push(`  Status: ${qe.red("BLOCKED")}`),a.customRule){if(F.push(`  Rule: ${a.customRule.id}`),a.customRule.rulebook)F.push(`  Rulebook: ${a.customRule.rulebook.name} ${a.customRule.rulebook.version}`);if(a.customRule.source)F.push(`  Source: ${a.customRule.source}`);if(a.customRule.override)F.push(`  Override: reason ${a.customRule.override.reason}`)}if(a.reason){let he=Ut(a.reason,"          ");F.push(`  Reason: ${he[0]}`);for(let _e=1;_e<he.length;_e++)F.push(he[_e]??"")}}else F.push(`  Status: ${qe.green("ALLOWED")}`);F.push(""),F.push("CONFIG");let ye=a.configSource??"none",Se=a.configValid?"":" (invalid)";F.push(`  Path: ${ye}${Se}`);let ke=a.safetyPresetScope;F.push(`  Safety preset: ${a.selectedPreset??"standard"}${ke?` (${nn(ke)})`:""}`),F.push(`  Effective capabilities: ${a.effectiveLevel}`);let Ie=Object.entries(a.destructiveCommandRuleOverrides??{});if(F.push(`  Rule customizations: ${Ie.length}`),a.ruleActivation)F.push(`  Rule activation: ${a.ruleActivation.id} — ${a.ruleActivation.enabled?"on":"off"} via ${a.ruleActivation.source}`);return F.join(`
`)}function Wn(a){return JSON.stringify(a,null,2)}import{resolve as fl}from"node:path";var cl=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function Ao(a){let g=0,y={allocateSegment(){return g++},getNextSegmentIndex(){return g},recordGlobal(L){a.record({kind:"step",scope:"global",step:L})},recordSegment(L,F=y.currentSegmentIndex){if(F===void 0)return;a.record({kind:"step",scope:"segment",segmentIndex:F,step:L})}};return y}function _o(a={}){let g=[],y=a.maxEvents??512,L={maxTextLength:a.maxTextLength??2048,maxListLength:a.maxListLength??128,maxObjectProperties:a.maxObjectProperties??a.maxListLength??128,maxDepth:a.maxDepth??16},F,N=new Set;return{record(J){if(F)return;if(!J||g.length>=y)return;try{g.push(Zn(dl(J,L,N)))}catch{}},finish(){if(F)return F;return F=Zn({events:Object.freeze(g)}),F}}}function dl(a,g,y){if(a.kind!=="step")throw TypeError("invalid trace event");let{scope:L,step:F}=a;un(F,y,g);let N=Yn(F,g,y);if(L==="global")return{kind:"step",scope:"global",step:N};if(L!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:a.segmentIndex,step:N}}function un(a,g,y,L=0,F=new WeakSet){if(typeof a==="string"){let ne=a.slice(0,y.maxTextLength);if(!Ze(ne))return;for(let de of ft(ne))for(let ue of de.match(/[^\s"'()$]+/g)??[])g.add(jo(ue));return}if(!a||typeof a!=="object"||L>=y.maxDepth||F.has(a))return;if(F.add(a),Array.isArray(a)){let ne=Math.min(a.length,y.maxListLength);for(let de=0;de<ne;de++)un(a[de],g,y,L+1,F);return}let N=0,J=new Set;for(let ne in a){if(!Object.hasOwn(a,ne))continue;if(N>=y.maxObjectProperties)break;N++,un(ne,g,y);let de=Kn(ne,y,g);if(J.has(de))continue;J.add(de),un(a[ne],g,y,L+1,F)}}function Yn(a,g,y,L=0,F=new WeakSet){if(typeof a==="string")return Kn(a,g,y);if(!a||typeof a!=="object")return a;if(L>=g.maxDepth)return;if(F.has(a))return;if(F.add(a),Array.isArray(a)){let ne=[],de=Math.min(a.length,g.maxListLength);for(let ue=0;ue<de;ue++)ne.push(Yn(a[ue],g,y,L+1,F));return ne}let N={},J=0;for(let ne in a){if(!Object.hasOwn(a,ne))continue;if(J>=g.maxObjectProperties)break;J++;let de=Kn(ne,g,y);if(Object.hasOwn(N,de))continue;Object.defineProperty(N,de,{value:Yn(a[ne],g,y,L+1,F),enumerable:!0,configurable:!0,writable:!0})}return N}function Kn(a,g,y){let L=a.slice(0,g.maxTextLength),F=Ze(L)?Ye(L):L,N=y.size>0?pl(F,y):F;return(ul(N)?De(N):N).slice(0,g.maxTextLength)}function ul(a){return a.includes("PRIVATE KEY")||a.includes("://")||a.includes("eyJ")||a.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(a)||a.length>=14&&cl.some((g)=>a.includes(g))||a.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(a)}function pl(a,g){return a.replace(/[^\s"'()$]+/g,(y)=>g.has(jo(y))?"<redacted>":y)}function jo(a){let g=2166136261,y=2166136261;for(let L=0;L<a.length;L++)g=Math.imul(g^a.charCodeAt(L),16777619),y=Math.imul(y^a.charCodeAt(a.length-L-1),16777619);return`${g>>>0}:${y>>>0}:${a.length}`}function Zn(a){if(a&&typeof a==="object"&&!Object.isFrozen(a)){for(let g of Object.values(a))Zn(g);Object.freeze(a)}return a}function Bt(a,g={},y){let L=fl(g.cwd??process.cwd()),F=g.policySnapshot??A(y,{cwd:L,userConfigDir:g.userConfigDir}),N=M(F.policy,y.env),J=ze({policySnapshot:F,effectiveCapabilities:N.capabilities,strict:N.strict,paranoidRm:N.paranoidRm,paranoidInterpreters:N.paranoidInterpreters,worktreeMode:N.worktreeMode}),ne={effectiveLevel:J.effectiveLevel,selectedPreset:F.policy.safety.level??"standard",...F.policyScopes?{safetyPresetScope:F.policyScopes.levelScope}:{},effectiveCapabilities:J.effectiveCapabilities,destructiveCommandRuleOverrides:F.policy.destructiveCommandRuleOverrides},{configSource:de,configValid:ue}=gl(y,{cwd:L,userConfigDir:g.userConfigDir});if(!a||!a.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:de,configValid:ue,...ne};let ye=f(a,"auto");if(ye.status==="limited")throw new m;let Se=ye.dialect==="powershell"?f(a,"posix"):ye,ke=yt(Se),Ie=_o(),he=Ao(Ie);he.recordGlobal({type:"parse",input:a,segments:ke.map((vt)=>[...vt])});let _e=E("Bash",{command:a},{kind:"command",shell:"auto"},{configCwd:L,executionCwd:L},a),Oe=B(_e,{environment:y,trace:he,dependencies:{loadPolicySnapshot:()=>F}}),Ae=Oe.decision.kind==="deny"?Oe.decision:null;if(Ae&&(Oe.stage==="policy-protection"||Oe.stage==="secret-protection")){let vt=ml(Ae);return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:vt.rule,matched:!0,reason:Ae.reason}]}]},result:"blocked",reason:T(Ae.reason),segment:T(To(Ae,a)),...vt.ruleId?{ruleId:T(vt.ruleId)}:{},configSource:de,configValid:ue,...ne}}let Je=he.getNextSegmentIndex();if(Ae&&Je>0&&Je<ke.length)he.recordSegment({type:"segment-skipped",index:Je,reason:"prior-segment-blocked"},Je);let Ke=Ie.finish(),st=Ae?.ruleId??hl(_e,F,N,y),Ue=G.find((vt)=>vt.id===st&&vt.activationCapability),at=Ue?J.policy.effectiveDestructiveCommandRules[Ue.id]:void 0;return{trace:vl(Ke),result:Ae?"blocked":"allowed",reason:Ae?T(Ae.reason):void 0,segment:Ae?T(To(Ae,a)):void 0,ruleId:Ae?.ruleId?T(Ae.ruleId):void 0,customRule:yl(bl(Ae?.ruleId,F)),configSource:de,configValid:ue,...ne,...Ue&&at?{ruleActivation:{id:Ue.id,...at}}:{}}}function To(a,g){return a.evidence?.segment??g}function ml(a){if(a.reason===Ve)return{ruleId:"policy-protection",rule:"policy-protection:findPolicyConfigMutationTargetInSemanticFacts"};if(a.reason===He)return{ruleId:"policy-apply-protection",rule:"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts"};if(a.reason===v)return{ruleId:"git-metadata-protection",rule:"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts"};return{ruleId:a.ruleId,rule:"secret-protection:findSensitiveTargetInSemanticFacts"}}function gl(a,g){let y=H(g.cwd),L=V(a,g),F=q(a,{cwd:g.cwd,userConfigDir:g.userConfigDir});try{if(n(F.projectConfigTarget)!==null){if(Dt(F.projectConfigTarget).errors.length===0)return{configSource:y,configValid:!0};return{configSource:y,configValid:!1}}}catch(N){if(N instanceof r)return{configSource:y,configValid:!1};throw N}try{if(n(F.userConfigTarget)!==null){let N=Dt(F.userConfigTarget);return{configSource:L,configValid:N.errors.length===0}}return{configSource:null,configValid:!0}}catch(N){if(N instanceof r)return{configSource:L,configValid:!1};throw N}}function hl(a,g,y,L){let F=g.policy,N=Le({...F,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...F.destructiveCommandRuleOverrides,...Object.fromEntries(G.flatMap((ne)=>ne.activationCapability?[[ne.id,"on"]]:[]))}},g.state==="degraded"?{diagnostics:g.diagnostics,reason:g.reason}:void 0),J=B(a,{environment:L,dependencies:{loadPolicySnapshot:()=>N,getModes:()=>({...y,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return J.decision.kind==="deny"?J.decision.ruleId:void 0}function yl(a){if(!a)return;return{id:T(a.id),...a.rulebook?{rulebook:{name:T(a.rulebook.name),version:T(a.rulebook.version)}}:{},...a.source?{source:T(a.source)}:{},...a.override?{override:{type:"reason",reason:T(a.override.reason)}}:{}}}function vl(a){let g=a.events.flatMap((L)=>L.kind==="step"&&L.scope==="global"?[L.step]:[]),y=new Map;for(let L of a.events){if(L.kind!=="step"||L.scope!=="segment")continue;let F=y.get(L.segmentIndex)??{index:L.segmentIndex,steps:[]};F.steps.push(L.step),y.set(L.segmentIndex,F)}return{steps:g,segments:[...y.values()]}}function bl(a,g){let y=a?.replace(/^custom\./,"");if(!y||!g.policy.rules.some((L)=>L.name===y))return;return g.ruleMetadata[y]??Object.freeze({id:y})}function Fo(a){return new Promise((g)=>{process.stdout.write(`${a}
`,()=>g())})}async function Oo(a,g){let y=zn(g);if(!y)return 1;try{let L=Bt(y.command,{cwd:y.cwd},a),F=!!process.env.NO_COLOR||!process.stdout.isTTY;return await Fo(y.json?Wn(L):Jn(L,{asciiOnly:F})),0}catch(L){let F=Ll(L instanceof S?L.cause:L);if(F===void 0)throw L;if(y.json)return await Fo(JSON.stringify({error:F})),1;return console.error(F),1}}function Ll(a){if(a instanceof m)return a.message;if(a instanceof b)return a.message;if(a instanceof s&&c[a.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Io="2.4.14",bt="  ",$t="cc-safety-net";function No(a){return a.argument?`${a.flags} ${a.argument}`:a.flags}function wl(a){return Math.max(...a.map((g)=>No(g).length))}function xl(a){return Math.max(...a.map((g)=>g.usage.length))}function kl(a){return Math.max(...a.map((g)=>`${$t} ${g.usage}`.length))}function Sl(a,g){let y=`${$t} ${a.usage}`;return`${bt}${y.padEnd(g+2)}${a.description}`}function wt(a,g){return`${bt}${a.padEnd(Math.max(40,a.length+2))}${g}`}function qt(a,g=console.log){let y=[];if(y.push(`${$t} ${a.name}`),y.push(""),y.push(`${bt}${a.description}`),y.push(""),y.push("USAGE:"),y.push(`${bt}${$t} ${a.usage}`),y.push(""),a.subcommands&&a.subcommands.length>0){y.push("SUBCOMMANDS:");let L=xl(a.subcommands);for(let F of a.subcommands)y.push(`${bt}${F.usage.padEnd(L+2)}${F.description}`);y.push("")}if(a.options.length>0){y.push("OPTIONS:");let L=wl(a.options);for(let F of a.options){let N=No(F),J=F.default?`${F.description} (default: ${F.default})`:F.description;y.push(`${bt}${N.padEnd(L+2)}${J}`)}y.push("")}if(a.examples&&a.examples.length>0){y.push("EXAMPLES:");for(let L of a.examples)y.push(`${bt}${L}`)}g(y.join(`
`))}function Xn(){let a=kl(Kt),g=[];g.push(`${$t} v${Io}`),g.push(""),g.push("Blocks destructive commands and secret access."),g.push(""),g.push("COMMANDS:");for(let y of Kt)g.push(Sl(y,a));g.push(""),g.push("GLOBAL OPTIONS:"),g.push(`${bt}-h, --help       Show help (use with command for command-specific help)`),g.push(`${bt}-V, --version    Show version`),g.push(""),g.push("HELP:"),g.push(`${bt}${$t} help <command>     Show help for a specific command`),g.push(`${bt}${$t} <command> --help   Show help for a specific command`),g.push(""),g.push("ENVIRONMENT VARIABLES:"),g.push(wt(`${i.level.name}=standard|strict|paranoid`,"Set session safety level")),g.push(wt(`${i.worktree.name}=1`,"Allow local git discards in linked worktrees")),g.push(wt(`${i.debug.name}=1`,"Print diagnostic messages to stderr")),g.push(wt(`${i.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),g.push(wt("CC_SAFETY_NET_HOME","Override rule config home directory")),g.push(""),g.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),g.push(wt(`${i.strict.name}=1`,"Force safety.overrides.fail_closed on")),g.push(wt(`${i.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),g.push(wt(`${i.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),g.push(wt(`${i.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),g.push(""),g.push("Documentation:        https://local/cc-safety-net/docs"),console.log(g.join(`
`))}function Mo(){console.log(Io)}function Qn(a,g=console.log){let y=Zt(a);if(!y)return!1;if(y.name.toLowerCase()!==a.toLowerCase())return!1;return qt(y,g),!0}import{mkdirSync as $l}from"node:fs";import{dirname as Al}from"node:path";import{createInterface as _l}from"node:readline";import{existsSync as qo,readFileSync as Rl}from"node:fs";function jt(a,g){let y=rt(a,g);return{policy:y.policy,errors:oe(et(y.issues,nt,(L)=>L.kind==="custom")," "," ")}}function Gt(a,g){return jt(a,g).errors}function Ho(a,g){return{"safety.level":a.safety.level,...er("safety.overrides",a.safety.overrides),"workflow.worktree_mode":String(a.workflow.worktree_mode),"destructive_command_protection.enabled":String(a.destructive_command_protection.enabled),...er("destructive_command_protection.overrides",a.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":tr(a.destructive_command_protection.allow_paths),"secret_protection.enabled":String(a.secret_protection.enabled),...er("secret_protection.overrides",a.secret_protection.overrides),"secret_protection.deny_paths":tr(a.secret_protection.deny_paths),"secret_protection.allow_paths":tr(a.secret_protection.allow_paths),...g?{"audit.retention_days":String(a.audit.retention_days)}:{}}}function pn(a,g,y){let L=Ho(a,y),F=Ho(g,y);return[...new Set([...Object.keys(L),...Object.keys(F)])].flatMap((N)=>L[N]===F[N]?[]:[{field:N,before:L[N],after:F[N]}])}function zt(a,g){let y=d(a,g);if(!qo(y))return{baseline:P(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,a.home),diagnostics:[]};let L=Ft(y),F=jt(L.value,a.home);return{baseline:F.policy,diagnostics:L.errors.length>0?L.errors:F.errors}}function Ft(a){if(!qo(a))return{errors:[`${a}: file not found`]};try{return{value:JSON.parse(Rl(a,"utf-8")),errors:[]}}catch(g){let y=g instanceof Error?g.message:String(g);return{errors:[`${a}: ${g instanceof SyntaxError?`Invalid JSON: ${y}`:y}`]}}}function fn(a,g){let y=Dl(a)?a:{};return{version:g.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((L)=>y[L]!==void 0).map((L)=>[L,y[L]]))}}function er(a,g){return Object.fromEntries(Object.entries(g).flatMap(([y,L])=>L===void 0?[]:[[`${a}.${y}`,String(L)]]))}function tr(a){return a.length===0?"(none)":a.join(", ")}function Dl(a){return!!a&&typeof a==="object"&&!Array.isArray(a)}import{chmodSync as Cl,existsSync as Uo,mkdirSync as Pl,readFileSync as Bo}from"node:fs";import{dirname as El}from"node:path";function Go(a,g={}){let y=d(a,g);if(!Uo(y))return{path:y,exists:!1,raw:"",policy:W(),errors:[]};let L=Bo(y,"utf-8");if(!L.trim())return{path:y,exists:!0,raw:L,policy:W(),errors:["Config file is empty"]};try{let F=jt(JSON.parse(L),a.home);return{path:y,exists:!0,raw:L,policy:F.policy,errors:F.errors}}catch(F){return{path:y,exists:!0,raw:L,policy:W(),errors:[`Invalid JSON: ${F instanceof Error?F.message:String(F)}`]}}}function xt(a,g,y={}){let L=d(a,y),F=jt(g,a.home);if(F.errors.length>0)return{path:L,policy:W(),errors:F.errors};let N=F.policy;return Pl(El(L),{recursive:!0,mode:448}),h(ee(L),`${JSON.stringify(N,null,2)}
`,384),Cl(L,384),{path:L,policy:N,errors:[]}}function zo(a,g){let y=jt(g,a.home);if(y.errors.length>0)return{errors:y.errors};return{preview:je(y.policy,a.env),errors:[]}}function Vo(a,g={}){let y=d(a,g);if(!Uo(y))return xt(a,X,g);let L=Bo(y,"utf-8");if(!L.trim())return xt(a,X,g);try{return xt(a,P(JSON.parse(L),a.home),g)}catch{return xt(a,X,g)}}var Jo=new Set(["check","apply"]),Wo="(unset)";async function Ko(a,g,y={}){let L=dt({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},g),F=L.positionals[0],N=[...L.errors,...F&&!Jo.has(F)?[`Unknown policy subcommand: ${F}`]:[],...F&&Jo.has(F)&&!L.positionals[1]?[`policy ${F} requires a file`]:[],...L.positionals.slice(2).map((he)=>`Unexpected policy argument: ${he}`)];if(N.length>0){for(let he of N)console.error(he);return 1}let J=L.positionals[1];if(!F||!J)return qt(Yt,console.error),1;let ne=L.flags.global?d(a):x(y.cwd??process.cwd()),de=Ft(J),ue=[...de.errors,...Gt(de.value,a.home).map((he)=>`${J}: ${he}`),...!L.flags.global&&Fl(de.value)&&de.value.audit!==void 0?[`${J}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(ue.length>0){for(let he of ue)console.error(he);return 1}let ye=P(de.value,a.home);if(console.log(`Scope: ${L.flags.global?"user":"project"} (${ne})`),console.log(`Proposal: ${J}`),L.flags.global)Yo(P(Ft(ne).value,a.home),ye,!0);if(!L.flags.global){let he=zt(a).baseline;console.log("Effective policy (user + project merged):"),Yo(Z(he,ae(Ft(ne).value,a.home).policy).policy,Z(he,ae(de.value,a.home).policy).policy,!1)}if(F==="check")return 0;let Se=y.input??process.stdin,ke=y.output??process.stdout;if(!Se.isTTY||!ke.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${J}${L.flags.global?" --global":""}`),1;if(!await jl(`Apply this policy to ${ne}? [y/N] `,Se,ke))return console.log("Cancelled; nothing was written."),0;return Tl(a,ne,de.value,ye,L.flags.global),console.log(`Policy applied: ${ne}`),0}function jl(a,g,y){let L=_l({input:g,output:y,terminal:!1});return new Promise((F)=>{L.once("close",()=>F(!1)),L.question(a,(N)=>{F(/^y(es)?$/i.test(N.trim())),L.close()})})}function Tl(a,g,y,L,F){if(F){xt(a,L);return}$l(Al(g),{recursive:!0}),ut(g,fn(y,L))}function Yo(a,g,y){let L=pn(a,g,y);if(L.length===0){console.log("No changes.");return}console.log(`Changes (${L.length}):`);for(let F of L)console.log(`  ${F.field}: ${F.before??Wo} -> ${F.after??Wo}`)}function Fl(a){return!!a&&typeof a==="object"&&!Array.isArray(a)}import{join as qc}from"node:path";var Ol="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- Transparent wrappers have no built-in defaults. Configure only wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function Zo(a){return k(a,"rule-doc",Ol)}function mn(a,g){if(!a.ok){ns(a);return}es(a,g)}function Qo(a,g,y){if(a.ok)console.log(y);if(!a.add){mn(a,`Added rulebook source: ${g}`);return}if(!a.ok){ns(a);return}if(a.add.added.length>0)console.log(`Added ${a.add.added.length} ${a.add.added.length===1?"rulebook":"rulebooks"} from ${a.add.source} at ${a.add.ref}:`),a.add.added.forEach((L)=>{console.log(`  - ${L}`)});if(a.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${a.add.source} at ${a.add.ref}: ${a.add.alreadyConfigured.join(", ")}`);if(a.add.commits.length>0)console.log(`Vendored at ${a.add.commits.map((L)=>L.slice(0,7)).join(", ")}.`);es(a,"Rule config updated.")}function es(a,g){for(let y of a.changes??[])console.log(y);console.log(g),console.log(""),Il(a.entries)}function Il(a){if(a.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${a.length}):`);for(let g of a)console.log(`  - ${g.name} ${g.version} (${Nl(g.ruleCount)})`),console.log(`    Source: ${g.spec}`)}function Nl(a){return`${a} ${a===1?"rule":"rules"}`}function ts(a){Ot("Active sources",a.rulebooks,(g)=>[`[${g.source}] ${g.name} ${g.version}`,`  Source: ${g.spec}`]),Ot("Active rules",a.rules,(g)=>[`[${Hl(a,g.name)}] ${g.name}`,...Ml(g),`  Reason: ${g.reason}`]),Ot("Disabled rules",Xo(a,"off"),(g)=>[g.key]),Ot("Reason overrides",Xo(a,"reason"),(g)=>[g.key,`  Reason: ${g.value.reason}`]),Ot("Transparent wrappers",a.transparent_wrappers,(g)=>[g]),Ot("Issues",a.errors,(g)=>[g]),Ot("Warnings",a.warnings,(g)=>[g])}function Ot(a,g,y){if(g.length===0){console.log(`${a}: (none)`);return}console.log(`${a} (${g.length}):`);for(let L of g){let[F,...N]=y(L);console.log(`  - ${F}`);for(let J of N)console.log(`    ${J}`)}}function Ml(a){if(!a.match)return[`  Command: ${a.subcommand?`${a.command} ${a.subcommand}`:a.command}`,`  Block args: ${a.block_args.join(", ")}`];return[`  Command: ${[a.command,...a.match.command_path].join(" ")}`,...a.match.any_args?[`  Any args: ${a.match.any_args.join(", ")}`]:[],...a.match.exclude_args?[`  Exclude args: ${a.match.exclude_args.join(", ")}`]:[]]}function Hl(a,g){return a.rulebooks.find((y)=>y.rules.includes(g))?.source??"project"}function Xo(a,g){return Object.entries({...a.userConfig?.overrides,...a.projectConfig?.overrides}).filter((y)=>{if(g==="off")return y[1]==="off";return!!y[1]&&typeof y[1]==="object"}).map(([y,L])=>({key:y,value:L}))}function ns(a){for(let g of a.errors)console.error(g)}import{dirname as Rs,join as xn}from"node:path";import{join as ir,resolve as Xl}from"node:path";function nr(a){let g=p(a);if(g.errors.length>0)return{ok:!1,result:{ok:!1,errors:g.errors,entries:[]}};return{ok:!0,config:g.config??ht}}function rs(a){ut(a,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function os(a){ut(a,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as vn}from"node:path";var ql="custom.";function gn(a){if(a.rulebook_version!==2)return[];let g=a.rules.map((y)=>({name:y.name,command:y.command,block_args:[],match:y.match,reason:y.reason,intent:y.intent}));return(a.tests??[]).flatMap((y,L)=>{let F=rr(f(y.command));if(F.length===0)return[`tests[${L}]: could not parse fixture command: ${y.command}`];let N=F.reduce((J,ne)=>J??I(ne,g)?.id.slice(ql.length),void 0);if(y.expect==="blocked"){if(N===y.rule)return[];let J=N?`"${N}" matched first`:"no rule matched";return[`tests[${L}]: expected "${y.rule}" to block "${y.command}" but ${J}`]}return N?[`tests[${L}]: expected "${y.command}" to be allowed but "${N}" matched`]:[]})}function rr(a){return a.nodes.flatMap((g)=>{if(g.kind==="group"||g.kind==="function")return rr(g.body);if(g.kind!=="command")return[];let y=ge(Q(g.dialect,g.words)).words.map(t);return[...y.length>0?[y]:[],...g.nested.flatMap((L)=>rr(L))]})}var hn=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function yn(a={}){return{requests:0,responseBytes:0,maxRequests:a.maxRequests??hn.maxRequests,maxResponseBytes:a.maxResponseBytes??hn.maxResponseBytes}}function St(a){return{controller:new AbortController,budget:yn(),resolveUrl:a}}function ss(a){return a instanceof Error&&a.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function is(a){if(a.requests>=a.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");a.requests++}function as(a,g){if(g>a.maxResponseBytes-a.responseBytes)throw a.responseBytes+=g,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");a.responseBytes+=g}var ds=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function ls(a,g,y=w(vn(vn(g)),"rules policy"),L=St()){if(C(a))return zl(a,L);return Gl(a,g,y)}async function us(a,g,y,L,F,N){if(!C(a))return ls(a,g,y,L);let J=F?null:Ul(a,g,y);if(J)return J;if(!F&&!N)throw Error(`${a} is not vendored; run rule update ${a} to vendor it`);return ls(a,g,y,L)}function Ul(a,g,y=w(vn(vn(g)),"rules policy")){let L=D(a),F=O(g,L.name),N=n(o(y,F));if(N===null)return null;let J=ie(or(N,`Invalid rulebook ${F}.`));if(J.name!==L.name)throw Error(`rulebook name "${J.name}" in ${F} must match "${L.name}"`);return{spec:a,rulebook:J,content:N}}async function ps(a,g={}){if(!te(a))throw Error(`Invalid GitHub repository source: ${a}`);let[y,L]=a.split("/");if(!y||!L)throw Error(`Invalid GitHub repository source: ${a}`);if(g.ref!==void 0&&!ce(g.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${g.ref}`);let F=g.operation??St(),N=g.ref??await Bl(y,L,a,F),J=await ms(y,L,N,a,F),ne=await bn(`https://api.github.com/repos/${y}/${L}/git/trees/${J}?recursive=1`,"tree",F),de=ne.response;if(!de.ok)throw Error(`Failed to inspect ${a}: GitHub tree returned ${de.status}`);let ue=JSON.parse(ne.content);if(!Array.isArray(ue?.tree))throw Error(`Failed to inspect ${a}: unexpected GitHub tree response`);let ye=ue.tree,Se=[...new Set(ye.flatMap((ke)=>{if(!ke||typeof ke!=="object")return[];let Ie=ke;if(Ie.type!=="blob"||typeof Ie.path!=="string")return[];let he=Ie.path.match(_t);return he?.[1]?[he[1]]:[]}))].sort();if(Se.length===0)throw Error(`No rulebooks found in ${a} under ${ve}/`);return{source:a,owner:y,repo:L,ref:N,commit:J,names:Se}}async function Bl(a,g,y,L){let F=await bn(`https://api.github.com/repos/${a}/${g}`,"metadata",L),N=F.response;if(!N.ok)throw Error(`Failed to inspect ${y}: GitHub returned ${N.status}`);let ne=JSON.parse(F.content)?.default_branch;if(typeof ne!=="string"||ne==="")throw Error(`Failed to inspect ${y}: missing default branch`);if(!ce(ne))throw Error(`GitHub returned an invalid default branch: ${ne}`);return ne}function Gl(a,g,y){At(a);let L=O(g,a),F=n(o(y,L));if(F===null)throw Error(`Rulebook source not found: ${a}`);let N=fs(or(F,"Invalid local rulebook source."));if(N.name!==a)throw Error(`rulebook name "${N.name}" must match local source "${a}"`);return{spec:a,rulebook:N,content:F}}async function zl(a,g){let y=D(a),L=await ms(y.owner,y.repo,y.ref,a,g),F=await bn(`https://raw.githubusercontent.com/${y.owner}/${y.repo}/${L}/${y.path}`,"raw",g),N=F.response;if(!N.ok)throw Error(`Failed to fetch ${a}: GitHub raw returned ${N.status}`);let J=F.content,ne=fs(or(J,"Invalid GitHub rulebook response."));if(ne.name!==y.name)throw Error(`rulebook name "${ne.name}" must match GitHub source "${y.name}"`);return{spec:a,rulebook:ne,content:J}}function fs(a){let g=ie(a),y=gn(g);if(y.length>0)throw Error(y.join("; "));return g}function or(a,g){try{return JSON.parse(a)}catch{throw Error(g)}}async function ms(a,g,y,L,F){let N=await bn(`https://api.github.com/repos/${a}/${g}/commits/${encodeURIComponent(y)}`,"commit",F),J=N.response;if(!J.ok)throw Error(`Failed to resolve ${L}: GitHub returned ${J.status}`);let ne=JSON.parse(N.content);if(typeof ne?.sha!=="string"||ne.sha==="")throw Error(`Failed to resolve commit for ${L}`);return ne.sha}async function Vl(a,g,y={}){if(y.signal?.aborted)throw y.signal.reason;let L=y.budget??yn(),F=new AbortController,N=()=>F.abort(y.signal?.reason);y.signal?.addEventListener("abort",N,{once:!0});let J=!1,ne=setTimeout(()=>{if(F.signal.aborted)return;J=!0,F.abort()},y.timeoutMs??ds.timeoutMs);try{if(y.signal?.aborted)throw y.signal.reason;is(L);let de=await fetch(a,{signal:F.signal,redirect:"error"});if(!de.ok)return gs(de),{response:de,content:""};return{response:de,content:await Jl(de,g,L,()=>F.abort())}}catch(de){if(J)throw Error("GitHub request timed out",{cause:de});if(y.signal?.aborted)throw y.signal.reason;throw de}finally{clearTimeout(ne),y.signal?.removeEventListener("abort",N)}}function bn(a,g,y){return Vl(y.resolveUrl?.(a)??a,g,{budget:y.budget,signal:y.controller.signal})}async function Jl(a,g,y=yn(),L){let F=ds[`${g}Bytes`],N=Number(a.headers.get("content-length"));if(Number.isFinite(N)&&N>F)throw gs(a),Error(`GitHub ${g} response exceeds ${F} bytes`);if(!a.body)return"";let J=a.body.getReader(),ne=[],de=0;while(!0){let ue=await J.read();if(ue.done)break;try{as(y,ue.value.byteLength)}catch(ye){throw L?.(),cs(J),ye}if(de+=ue.value.byteLength,de>F)throw L?.(),cs(J),Error(`GitHub ${g} response exceeds ${F} bytes`);ne.push(Buffer.from(ue.value))}return Buffer.concat(ne,de).toString("utf-8")}function gs(a){if(!a.body)return;hs(()=>a.body?.cancel())}function cs(a){hs(()=>a.cancel())}function hs(a){try{Promise.resolve(a()).catch(()=>{})}catch{}}var Wl=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function ys(a,g){let y=Ls(a.rules,g);if(y.length>0)return{ok:!0,specs:y};return bs(a.rules,g)}function vs(a,g){let y=Ls(a,g);if(y.length>0)return{ok:!0,specs:y};let L=Kl(a,g);if(L.length>0)return{ok:!0,specs:L};let F=Zl(a,g);if(!F.ok)return F;if(F.specs.length>0)return{ok:!0,specs:F.specs};return bs(a,g)}function bs(a,g){let y=a.filter((L)=>sr(L)?.name===g);if(y.length===1)return{ok:!0,specs:y};return Yl(g,y)}function Yl(a,g){return{ok:!1,result:{ok:!1,errors:g.length===0?[`No configured rulebook matches ${a}`]:[`Ambiguous rulebook match ${a}: ${g.join(", ")}`],entries:[]}}}function Ls(a,g){return a.filter((y)=>y===g)}function Kl(a,g){let y=g.match(Wl),L=y?.[1],F=y?.[2],N=y?.[3];if(!L||!F||!N||!ce(N))return[];return ws(a,(J)=>J.owner===L&&J.repo===F&&J.ref===N)}function Zl(a,g){if(!te(g))return{ok:!0,specs:[]};let[y,L]=g.split("/"),F=ws(a,(J)=>J.owner===y&&J.repo===L);if(new Set(F.map((J)=>sr(J)?.ref).filter((J)=>!!J)).size<2)return{ok:!0,specs:F};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${g}. Use an explicit ref:`,`  cc-safety-net rule remove ${g}#<ref>`],entries:[]}}}function sr(a){try{return D(a)}catch{return null}}function ws(a,g){return a.filter((y)=>{let L=sr(y);return L?g(L):!1})}async function wn(a,g={}){let y=ar(g);return Ql(a,y,await Ln(a,y,St()))}function Ql(a,g,y){if(!y.ok)return y;let L=pt(a,g),F=[...new Set(U(L.configPath,L.filesystemScope))];if(F.length===0)return y;return{ok:!1,errors:F,entries:y.entries}}async function Ln(a,g,y,L={},F=new Set,N=new Set){try{let J=pt(a,g),ne=nr(J.configTarget);if(!ne.ok)return ne.result;let de=ne.config,ue=g.only?ys(de,g.only):{ok:!0,specs:de.rules};if(!ue.ok)return ue.result;let ye=new Set([...g.refresh?ue.specs:[],...F]),Se=(Ue)=>us(Ue,J.configDir,J.filesystemScope,y,ye.has(Ue),!g.refresh||ye.has(Ue)),ke=await dc(de.rules,g.refresh?(Ue)=>Se(Ue).then((at)=>({ok:!0,item:at})).catch((at)=>{if(ss(at))throw at;return{ok:!1,spec:Ue,message:at instanceof Error?at.message:String(at)}}):async(Ue)=>({ok:!0,item:await Se(Ue)}),y),Ie=ke.filter((Ue)=>!Ue.ok),he=ke.filter((Ue)=>Ue.ok).map((Ue)=>Ue.item),_e=he.flatMap((Ue)=>ec(Ue,de.rules)),Oe=he.flatMap((Ue)=>tc(Ue,N,J)),Ae=new Set([..._e,...Oe].map((Ue)=>Ue.spec)),Je=[...Ie,..._e,...Oe],Ke=[],st=rc(Ke,()=>he.flatMap((Ue)=>Ae.has(Ue.spec)||Je.length>0&&N.has(Ue.spec)?[]:nc(Ue,J,L,Ke)));return{ok:Je.length===0,errors:Je.map((Ue)=>`Failed to update ${Ue.spec}: ${Ue.message}`),entries:he.map(sc),changes:st}}catch(J){return Jt(J)}}function ec(a,g){if(!C(a.spec))return[];let y=$e(a.spec),L=g.filter((F)=>F!==a.spec&&$e(F).toLowerCase()===y.toLowerCase());if(L.length===0)return[];return[{ok:!1,spec:a.spec,message:`rulebook name "${y}" is also claimed by ${L.join(", ")}; rename one of them`}]}function tc(a,g,y){if(!g.has(a.spec)||!C(a.spec))return[];let L=O(y.configDir,a.rulebook.name),F=n(o(y.filesystemScope,L));if(F===null||F===a.content)return[];return[{ok:!1,spec:a.spec,message:`${L} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function nc(a,g,y,L){if(!C(a.spec))return[];let F=O(g.configDir,a.rulebook.name),N=o(g.filesystemScope,F),J=n(N);if(J===a.content)return[];return L?.push({target:N,previous:J}),h(N,a.content,void 0,y._testAfterPolicyRename),oc(a,J)}function rc(a,g){try{return g()}catch(y){for(let L of[...a].reverse()){if(L.previous===null){z(L.target);continue}h(L.target,L.previous)}throw y}}function oc(a,g){if(g===null)return[`Vendored ${a.spec} (${a.rulebook.version})`];let y=me(g),L="problem"in y?null:y.rulebook,F=new Map(L?.rules.map((J)=>[J.name,JSON.stringify(J)])??[]),N=new Set(a.rulebook.rules.map((J)=>J.name));return[`Updated ${a.spec} (${L?.version??"unreadable"} -> ${a.rulebook.version})`,...[...N].filter((J)=>!F.has(J)).map((J)=>`  + ${J}`),...[...F.keys()].filter((J)=>!N.has(J)).map((J)=>`  - ${J}`),...a.rulebook.rules.filter((J)=>{let ne=F.get(J.name);return ne!==void 0&&ne!==JSON.stringify(J)}).map((J)=>`  ~ ${J.name}`)]}function sc(a){return{spec:a.spec,name:a.rulebook.name,version:a.rulebook.version,ruleCount:a.rulebook.rules.length}}async function xs(a,g,y={}){return ic(a,g,pc(y),St())}async function ic(a,g,y,L,F={}){let N=null,J=!1;try{let ne=pt(a,y),de=n(ne.configTarget);N={target:ne.configTarget,content:de};let ue=nr(ne.configTarget);if(!ue.ok)return ue.result;let ye=ue.config,Se=te(g);ac(g,y,Se);let ke=Se?await ps(g,{ref:y.ref,operation:L}):null,Ie=ke?lc(ke,y.rulebooks):[],he=ke?Ie.map((Ke)=>cc(ye.rules,ke,Ke)??`${g}#${ke.ref}/${Ke}`):[g],_e=he.filter((Ke)=>!ye.rules.includes(Ke)),Oe=[...ye.rules,..._e];if(Oe.length>pe)return uc();if(Oe.length!==ye.rules.length)J=!0,ut(ne.configTarget,{version:1,rules:Oe,overrides:ye.overrides??{},transparent_wrappers:ye.transparent_wrappers??[]},void 0,F._testAfterPolicyRename);let Ae=await Ln(a,y,L,F,new Set(_e),new Set(_e));if(!Ae.ok)Vt(ne.configTarget,de);if(!Ae.ok||!ke)return Ae;let Je=Ie.filter((Ke,st)=>_e.includes(he[st]??""));return{...Ae,add:{source:g,ref:ke.ref,selected:Ie,added:Je,alreadyConfigured:Ie.filter((Ke)=>!Je.includes(Ke)),commits:_e.length>0?[ke.commit]:[]}}}catch(ne){if(J&&N)try{Vt(N.target,N.content)}catch(de){return Jt(de)}return Jt(ne)}}function ac(a,g,y){if(!y&&g.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!y&&g.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${a}`);if(g.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let L=g.rulebooks?.filter((F)=>!u.test(F))??[];if(L.length>0)throw Error(`Invalid rulebook names: ${L.join(", ")}`)}function lc(a,g){let y=g?[...new Set(g)]:a.names,L=y.filter((F)=>!a.names.includes(F));if(L.length>0)throw Error(`Rulebooks not found in ${a.source} at ${a.ref}: ${L.join(", ")}
Available rulebooks: ${a.names.join(", ")}`);return y}function cc(a,g,y){let L=`${g.source}#${g.ref}/${y}`;if(a.includes(L))return L;let F=`${g.source}#${g.commit}/${y}`;return a.find((N)=>N===F)}async function dc(a,g,y=St()){if(a.length>pe)throw Error(fe);let L=[],F=0,N,J=Array.from({length:Math.min(a.length,hn.concurrency)},async()=>{while(!N){let ne=F;if(ne>=a.length)return;F++;try{L[ne]=await g(a[ne],ne,y.controller.signal)}catch(de){if(!N)N={value:de},F=a.length,y.controller.abort(de);return}}});if(await Promise.all(J),N)throw N.value;return L}function uc(){return{ok:!1,errors:[fe],entries:[]}}function ar(a){return{cwd:a.cwd,userConfigDir:a.userConfigDir,userConfigPath:a.userConfigPath,projectConfigPath:a.projectConfigPath,global:a.global,only:a.only,refresh:a.refresh}}function pc(a){return{...ar(a),ref:a.ref,rulebooks:a.rulebooks}}function fc(a){return{...ar(a),deleteSource:a.deleteSource}}async function ks(a,g,y={}){try{return await mc(a,g,fc(y),{})}catch(L){return Jt(L)}}async function mc(a,g,y,L){let F=pt(a,y),N=p(F.configTarget);if(N.errors.length>0)return{ok:!1,errors:N.errors,entries:[]};if(!N.config)return{ok:!1,errors:[`No config found at ${F.configPath}`],entries:[]};let J=vs(N.config.rules,g);if(!J.ok)return J.result;let ne=y.deleteSource?gc(F.configDir,J.specs,F.filesystemScope):{ok:!0,dirs:[]};if(!ne.ok)return ne.result;let de=n(F.configTarget);if(de===null)return Jt(Error("Rules config is unavailable."));try{ut(F.configTarget,{version:1,rules:N.config.rules.filter((Se)=>!J.specs.includes(Se)),overrides:N.config.overrides??{},transparent_wrappers:N.config.transparent_wrappers??[]},void 0,L._testAfterPolicyRename)}catch(Se){throw Vt(F.configTarget,de),Se}let ue=await Ln(a,y,St(),L);if(!ue.ok)return Vt(F.configTarget,de),ue;let ye=hc(ne.dirs,L,F.filesystemScope);if(!ye.ok){Vt(F.configTarget,de);let Se=await Ln(a,y,St(),L);if(!Se.ok)return{ok:!1,errors:[...ye.result.errors,...Se.errors],entries:Se.entries};return ye.result}return ue}function gc(a,g,y){let L=g.flatMap((ne)=>u.test(ne)?[]:["--delete-source can only delete local rulebook sources"]),F=g.map((ne)=>ir(a,ne)),N=L.length>0?[]:F.flatMap((ne)=>Ss(ne,y)),J=[...L,...N];return J.length>0?{ok:!1,result:{ok:!1,errors:J,entries:[]}}:{ok:!0,dirs:F}}function Ss(a,g){let y=Xl(a),L=o(g,y),F=xe(L);if(!F)return[`Local rulebook source directory not found: ${a}`];let N=F.find((J)=>J.name==="rulebook.json");if(!N)return[`Local rulebook source directory is missing rulebook.json: ${a}`];if(N.kind!=="file")throw new r(g.label);if(n(o(g,ir(y,"rulebook.json"))),F.length>1)return[`Local rulebook source directory contains extra files: ${a}. delete manually if you really want to remove the directory.`];return[]}function hc(a,g,y){let L=a.flatMap((F)=>{try{if(!xe(o(y,F)))return[];let N=Ss(F,y);if(N.length>0)return N;return yc(F,g,y),[]}catch(N){return[`Failed to delete local rulebook source ${F}: ${N instanceof Error?N.message:String(N)}`]}});return L.length>0?{ok:!1,result:{ok:!1,errors:L,entries:[]}}:{ok:!0}}function yc(a,g,y){if(g._testDeleteLocalSourceDir){g._testDeleteLocalSourceDir(a);return}z(o(y,ir(a,be))),Tt(o(y,a))}function Vt(a,g){if(g===null){z(a);return}h(a,g)}function Jt(a){return{ok:!1,errors:[a instanceof Error?a.message:String(a)],entries:[]}}var vc=".safety-net.json",bc="~/.cc-safety-net/config.json";async function Ps(a,g){return[await Ds(a,{legacyPath:Qr({cwd:g.cwd}),configPath:H(g.cwd),defaultRulebookName:"project-rules",migratedFrom:vc,cleanup:g.cleanup,syncOptions:{cwd:g.cwd}}),await Ds(a,{legacyPath:Qt(a),configPath:V(a),defaultRulebookName:"user-rules",migratedFrom:bc,cleanup:g.cleanup,syncOptions:{cwd:g.cwd,global:!0}})].every((L)=>L)?0:1}async function Ds(a,g){let y=pt(a,g.syncOptions),L=o(y.filesystemScope,g.legacyPath),F=n(L);if(F===null)return console.log(`No legacy config found at ${g.legacyPath}`),!0;let N=wc(F);if(!N.ok){for(let Ie of N.errors)console.error(Ie);return!1}let J=p(y.configTarget);if(J.errors.length>0){for(let Ie of J.errors)console.error(Ie);return!1}let ne=J.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},de=xc(Rs(g.configPath),ne.rules,g.defaultRulebookName,g.migratedFrom,y.filesystemScope),ue=xn(Rs(g.configPath),de,"rulebook.json"),ye=o(y.filesystemScope,ue),Se=[Cs(y.configTarget),Cs(ye)],ke=await Lc(a,g,y.configTarget,ye,de,N.config.rules,ne.rules.includes(de)?ne.rules:[...ne.rules,de],ne.overrides??{},ne.transparent_wrappers??[]);if(!ke.ok){Rc(Se);for(let Ie of ke.errors)console.error(Ie);return!1}if(!g.cleanup)return console.log(`Migrated legacy config at ${g.legacyPath}. Legacy file is no longer used.`),!0;if(!Sc(y.configTarget,ye,de,g.migratedFrom,N.config.rules))return console.error(`Migration cleanup verification failed for ${g.legacyPath}`),!1;return z(L),console.log(`Deleted legacy config at ${g.legacyPath}`),!0}async function Lc(a,g,y,L,F,N,J,ne,de){try{return ut(y,{version:1,rules:J,overrides:ne,transparent_wrappers:de}),ut(L,kc(F,g.migratedFrom,N)),await wn(a,g.syncOptions)}catch(ue){return{ok:!1,errors:[ue instanceof Error?ue.message:String(ue)]}}}function wc(a){try{let g=JSON.parse(a),y=_n(g);if(y.errors.length>0)return{ok:!1,errors:y.errors};return{ok:!0,config:{version:1,rules:g.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function xc(a,g,y,L,F){let N=g.find((J)=>Dc(o(F,xn(a,J,"rulebook.json")))===L);if(N)return N;if(n(o(F,xn(a,y,"rulebook.json")))===null)return y;for(let J=2;;J++){let ne=`${y}-${J}`;if(n(o(F,xn(a,ne,"rulebook.json")))===null)return ne}}function kc(a,g,y){return{rulebook_version:1,name:a,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:g,allowed_commands:[...new Set(y.map((L)=>L.command))],rules:y,tests:y.map((L)=>({command:[L.command,L.subcommand,L.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:L.name}))}}function Sc(a,g,y,L,F){if(!p(a).config?.rules.includes(y))return!1;try{let J=n(g);if(J===null)return!1;let ne=JSON.parse(J);return ne.migrated_from===L&&JSON.stringify(ne.rules)===JSON.stringify(F)}catch{return!1}}function Cs(a){return{target:a,content:n(a)}}function Rc(a){for(let g of a){if(g.content===null){z(g.target);continue}h(g.target,g.content)}}function Dc(a){let g=n(a);if(g===null)return null;try{let y=JSON.parse(g);return typeof y.migrated_from==="string"?y.migrated_from:null}catch{return null}}import{join as Cc,resolve as lr}from"node:path";var Es="CC Safety Net Config",Pc="═".repeat(Es.length),Ec="https://local/cc-safety-net/assets/cc-safety-net.schema.json",$c=new Set(["rule.json","rule.lock","cache"]);function $s(a,g={}){try{return Ac(a,g)}catch(y){if(y instanceof r)return console.error(y.message),1;throw y}}function Ac(a,g){let y=g.cwd??process.cwd(),L=q(a,{cwd:y}),F=Qt(a),N=$r(y),J=lr(y,ve),ne=o(L.userScope,F),de=o(L.projectScope,N),ue=!1,ye=!1,Se=[],ke=[],Ie=_c(o(L.projectScope,J));if(Tc(),n(L.userConfigTarget)!==null){let he=Dt(L.userConfigTarget);if(he.errors.push(...U(L.userConfigPath,L.userScope)),Se.push({scope:"User",path:L.userConfigPath,result:he,schema:"rules",target:L.userConfigTarget}),he.errors.length>0)ue=!0}if(n(ne)!==null)if(ye=!0,n(L.userConfigTarget)!==null)ke.push(kn("user","cleanup"));else{let he=jn(ne);if(Se.push({scope:"User",path:F,result:he,schema:"legacy",inactive:!0,target:ne}),ke.push(kn("user",he.errors.length>0?"fix-or-delete":"migrate")),he.errors.length>0)ue=!0}if(n(L.projectConfigTarget)!==null){let he=Dt(L.projectConfigTarget);if(he.errors.push(...U(L.projectConfigPath,L.projectScope)),Se.push({scope:"Project",path:lr(L.projectConfigPath),result:he,schema:"rules",target:L.projectConfigTarget}),he.errors.length>0)ue=!0;if(n(de)!==null)ye=!0,ke.push(kn("project","cleanup"))}else if(n(de)!==null){ye=!0,ue=!0;let he=jn(de);Se.push({scope:"Project",path:lr(N),result:he,schema:"legacy",inactive:!0,target:de}),ke.push(kn("project",he.errors.length>0?"fix-or-delete":"migrate"))}if(Ie?.result.errors.length)ue=!0;if(Se.length===0&&!Ie)return console.log(`
No config files found. Using built-in rules only.`),0;for(let he of Se)if(he.inactive)Oc(he.scope,he.path,he.result);else if(he.result.errors.length>0)Ic(he.scope,he.path,he.result.errors);else{if(he.schema==="rules"&&Hc(he.target))console.log(`
Added $schema to ${he.scope.toLowerCase()} config.`);Fc(he.scope,he.path,he.result,he.schema)}for(let he of ke)console.error(`
${qe.red(he)}`);if(Ie)if(Ie.result.errors.length>0)Mc(Ie.path,Ie.result.errors);else Nc(Ie.path,Ie.result);if(ue)return console.error(`
Config validation failed.`),1;return console.log(ye?`
Configs valid with warnings.`:`
All configs valid.`),0}function kn(a,g){let y=`legacy ${a} config`;if(g==="cleanup")return`Warning: Legacy ${a} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(g==="migrate")return`Warning: Legacy ${a} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${a} config is no longer supported. Fix or delete the ${y}, then run \`npx -y cc-safety-net rule migrate\`.`}function _c(a){if(xe(a)===null)return null;let g=jc(a);if(g.ruleNames.size===0&&g.errors.length===0)return null;return{path:a.path,result:g}}function jc(a){let g=[],y=new Set,L=(xe(a)??[]).filter((F)=>!$c.has(F.name)).sort((F,N)=>F.name.localeCompare(N.name));if(L.length===0)return{errors:g,ruleNames:y};for(let F of L){if(!u.test(F.name)){g.push(`rulebook directory names must match ${u}: ${F.name}`);continue}if(F.kind!=="directory"){g.push(`${F.name} must be a rulebook directory`);continue}let N=o(a.scope,Cc(a.path,F.name,"rulebook.json")),J=n(N);if(J===null){g.push(`${F.name}/rulebook.json is required`);continue}try{let ne;try{ne=JSON.parse(J)}catch{g.push(`${F.name}/rulebook.json: invalid JSON`);continue}let de=ie(ne);if(de.name!==F.name){g.push(`rulebook name "${de.name}" must match folder "${F.name}"`);continue}let ue=gn(de);if(ue.length>0){g.push(...ue.map((ye)=>`${F.name}/rulebook.json: ${ye}`));continue}y.add(F.name)}catch(ne){g.push(ne instanceof Error?`${F.name}/rulebook.json: ${ne.message}`:`${F.name}/rulebook.json: ${String(ne)}`)}}return{errors:g,ruleNames:y}}function Tc(){console.log(Es),console.log(Pc)}function Fc(a,g,y,L){if(console.log(`
✓ ${a} config: ${g}`),console.log(`  Schema: ${L==="rules"?"rulebook sources":"legacy inline rules"}`),y.ruleNames.size>0){console.log(`  ${L==="rules"?"Sources":"Rules"}:`);let F=1;for(let N of y.ruleNames)console.log(`    ${F}. ${N}`),F++}else console.log(`  ${L==="rules"?"Sources":"Rules"}: (none)`)}function Oc(a,g,y){if(console.error(`
✗ Legacy ${a.toLowerCase()} config: ${g}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),y.errors.length>0){console.error("  Errors:");let L=1;for(let F of y.errors)for(let N of F.split("; "))console.error(`    ${L}. ${N}`),L++;return}if(y.ruleNames.size>0){console.error("  Rules:");let L=1;for(let F of y.ruleNames)console.error(`    ${L}. ${F}`),L++;return}console.error("  Rules: (none)")}function Ic(a,g,y){As(`${a} config`,g,y)}function Nc(a,g){console.log(`
✓ GitHub source rules: ${a}`),console.log("  Rulebooks:");let y=1;for(let L of g.ruleNames)console.log(`    ${y}. ${L}`),y++}function Mc(a,g){As("GitHub source rules",a,g)}function As(a,g,y){console.error(`
✗ ${a}: ${g}`),console.error("  Errors:");let L=1;for(let F of y)for(let N of F.split("; "))console.error(`    ${L}. ${N}`),L++}function Hc(a){try{let g=n(a);if(g===null)return!1;let y=JSON.parse(g);if(y.$schema)return!1;return h(a,JSON.stringify({$schema:Ec,...y},null,2)),!0}catch(g){if(g instanceof r)throw g;return!1}}var _s=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),Uc=new Set(["add","remove","list"]),Bc="cc-safety-net/rulebooks";async function js(a,g){try{return await Gc(a,g)}catch(y){if(y instanceof r)return console.error(y.message),1;throw y}}async function Gc(a,g){let y=Vc(g),L=y.help?zc(y.positionals):null;if(L)return qt(L),0;if(y.errors.length>0){for(let ne of y.errors)console.error(ne);return 1}let F=y.positionals[0];if(!F)return qt(Nt,console.error),1;let N=y.positionals[1],J={global:y.global};if(F==="init"){let ne=pt(a,J);Kc(ne.configTarget);let de=qc(ne.configDir,"example-rules","rulebook.json"),ue=o(ne.filesystemScope,de);if(y.example&&n(ue)===null)os(ue);let ye=U(ne.configPath,ne.filesystemScope);for(let Se of ye)console.error(Se);if(ye.length>0)return 1;return console.log("Rule config initialized."),0}if(F==="add"){let ne=Ts(y);if(!ne)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let de=pt(a,J),ue=await xs(a,ne,{...J,ref:y.ref,rulebooks:y.only.length>0?y.only:void 0});return Qo(ue,ne,`Scope: ${y.global?"user":"project"} (${de.configDir})`),ue.ok?0:1}if(F==="remove"){if(!N)return console.error("rule remove requires a source"),1;let ne=await ks(a,N,{...J,deleteSource:y.deleteSource});return mn(ne,`Removed rulebook source: ${N}`),ne.ok?0:1}if(F==="update"){let ne=await wn(a,{...J,only:N,refresh:!0});return mn(ne,"Rule config updated."),ne.ok?0:1}if(F==="sync")return no(a,{global:y.global});if(F==="list"){let ne=Y(a,{cwd:process.cwd()});return ts(ne),ne.errors.length>0?1:0}if(F==="wrapper")return Zc(a,y);if(F==="migrate")return Ps(a,{cleanup:y.cleanup,cwd:process.cwd()});if(F==="doc")return console.log(Zo(a)),0;if(F==="verify")return $s(a);return 1}function zc(a){if(a.length===0)return Nt;let g=Nt.subcommands.filter((L)=>L.usage.split(" ")[0]===a[0]);if(g.length===0)return null;if(a.length===1&&g.length>1)return{name:`rule ${a[0]}`,description:`Subcommands of rule ${a[0]}`,usage:`rule ${a[0]} <subcommand>`,subcommands:g,options:[]};let y=a.length===1?g[0]:g.find((L)=>L.usage.split(" ")[1]===a[1]);if(!y)return null;return{name:`rule ${a[0]}`,description:y.description,usage:`rule ${y.usage}`,options:a[0]==="add"?En:[],examples:a[0]==="add"?$n:void 0}}function Vc(a){let g=dt({label:"rule",booleans:{global:["-g","--global"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},a),y={...g.flags,ref:g.values.ref,only:g.lists.only??[],help:g.help,positionals:g.positionals,errors:g.errors};return Jc(y),y}function Jc(a){let[g]=a.positionals;if(g&&!_s.has(g))a.errors.push(`Unknown rule subcommand: ${g}`);if(a.deleteSource&&g!=="remove")if(g&&_s.has(g))a.errors.push(`Unknown option for rule ${g}: --delete-source`);else a.errors.push("--delete-source is only valid with 'rule remove'");if(a.cleanup&&g!=="migrate")a.errors.push(Wt(g,"--cleanup"));if(a.example&&g!=="init")a.errors.push(Wt(g,"--example"));if(a.ref&&g!=="add")a.errors.push(Wt(g,"--ref"));if(a.only.length>0&&g!=="add")a.errors.push(Wt(g,"--only"));if(g==="add")Wc(a);if(g==="migrate"){if(a.global)a.errors.push(Wt(g,"--global"));if(a.positionals.length>1)a.errors.push(`Unexpected rule migrate argument: ${a.positionals[1]}`)}else if(g==="wrapper")Yc(a);else if(a.positionals.length>2)a.errors.push(`Unexpected rule argument: ${a.positionals[2]}`);if(g==="list"&&a.global)a.errors.push("Unknown option for rule list: --global")}function Ts(a){if(a.positionals[1])return a.positionals[1];if(a.ref||a.only.length>0)return Bc;return}function Wc(a){let g=Ts(a);if(!g)return;if((a.ref||a.only.length>0)&&!te(g)){if(a.ref)a.errors.push(`--ref can only select a ref for an owner/repo source: ${g}`);if(a.only.length>0)a.errors.push("--only can only select rulebooks from an owner/repo source");return}if(a.ref&&!ce(a.ref))a.errors.push(`--ref must use valid path segments: ${a.ref}`);let y=a.only.filter((L)=>!u.test(L));if(y.length>0)a.errors.push(`Invalid rulebook names: ${y.join(", ")}`)}function Wt(a,g){return a?`Unknown option for rule ${a}: ${g}`:`Unknown option for rule: ${g}`}function Yc(a){let g=a.positionals[1],y=a.positionals[2];if(!g){a.errors.push("rule wrapper requires add, remove, or list");return}if(!Uc.has(g)){a.errors.push(`Unknown rule wrapper action: ${g}`);return}if(g==="list"){if(y)a.errors.push(`Unexpected rule wrapper argument: ${y}`);return}if(!y){a.errors.push(`rule wrapper ${g} requires a command`);return}if(a.positionals.length>3)a.errors.push(`Unexpected rule wrapper argument: ${a.positionals[3]}`)}function Kc(a){if(n(a)===null){rs(a);return}let g=p(a);if(!g.config)return;ut(a,{version:1,rules:g.config.rules,overrides:g.config.overrides??{},transparent_wrappers:g.config.transparent_wrappers??[]})}async function Zc(a,g){let y=g.positionals[1],L=g.positionals[2],F=pt(a,{global:g.global}).configTarget;if(y==="list"){let de=p(F);if(de.errors.length>0){for(let ue of de.errors)console.error(ue);return 1}return Xc(de.config?.transparent_wrappers??[]),0}if(!L||!R.test(L))return console.error("transparent wrapper must match command pattern"),1;if(Fe(L))return console.error(`reserved command "${L}" cannot be a wrapper`),1;let N=p(F);if(N.errors.length>0){for(let de of N.errors)console.error(de);return 1}let J=N.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},ne=y==="add"?[...new Set([...J.transparent_wrappers??[],L])]:(J.transparent_wrappers??[]).filter((de)=>de!==L);return ut(F,{version:1,rules:J.rules,overrides:J.overrides??{},transparent_wrappers:ne}),console.log(y==="add"?`Added transparent wrapper: ${L}`:`Removed transparent wrapper: ${L}`),0}function Xc(a){if(a.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${a.length}):`);for(let g of a)console.log(`  - ${g}`)}import{sep as Qc}from"node:path";function Fs(a){let g=A(a,{cwd:process.cwd()}),y=g.policy,L=M(y,a.env),F=!!process.env.NO_COLOR||!process.stdout.isTTY,N=Math.min(process.stdout.columns||80,100),J=F?"ok":"✔",ne=F?"OFF":"✘",de=(_e,Oe)=>{let Ae=`  ${_e.padEnd(13)}${Oe}`;return(Ae.length>N?`${Ae.slice(0,N-1)}…`:Ae).replaceAll(ne,qe.red(ne))},ue=Object.values(se(y,L.capabilities)).some((_e)=>_e.changesInherited),ye=(_e)=>_e===a.home||_e.startsWith(`${a.home}${Qc}`)?`~${_e.slice(a.home.length)}`:_e,Se={ready:qe.green,degraded:qe.yellow}[g.state],ke=g.policyScopes?.weakenings??[],Ie=[...g.diagnostics],he=F?"-":"·";console.log([`${F?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Se(g.state)}`,"",de("Protection",`destructive ${y.destructiveCommandProtectionEnabled?J:ne}   secrets ${y.secretProtection.enabled?J:ne}`),de("Level",ue?`${L.effectiveLevel} (customised)`:L.effectiveLevel),de("Rules",y.rules.length===0?"none active":`${y.rules.length} active`),de("Policy",ye(d(a))),...g.policyScopes?[de("Project",ye(x(process.cwd())))]:[],...L.worktreeMode?[de("Worktree","relaxations active")]:[],"",...ke.length===0?[]:["  Project policy",...ke.flatMap((_e)=>Ut(_e,"      ",N-6).map((Oe,Ae)=>Ae===0?`    ${Oe}`:Oe)),""],...Ie.length===0?["  Everything configured is active."]:["  Not active",...Ie.flatMap((_e)=>Ut(_e,"      ",N-6).map((Oe,Ae)=>Ae===0?`    ${he} ${Oe}`:Oe)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as cd}from"node:child_process";import{randomBytes as dd}from"node:crypto";import{existsSync as ud}from"node:fs";import{createServer as pd}from"node:http";var Sn=500;function ed(a){let g=a.filter((F)=>F.decision!=="allow"),y=a.filter((F)=>F.decision==="allow"),L=Math.min(g.length,Math.max(Sn-y.length,Math.ceil(Sn/2)));return[...g.slice(0,L),...y.slice(0,Sn-L)]}function Os(a,g,y=j(a)){if(y)K(a,y);let L=(Oe)=>new Date(Oe.getFullYear(),Oe.getMonth(),Oe.getDate()).getTime(),F=L(new Date),N=new Date(F);N.setDate(N.getDate()-(g-1));let J=N.getTime(),ne=[],de={count:0};for(let Oe of y?Pt(y,de):[])for(let Ae of It(Oe,de)){let Je=new Date(Ae.ts).getTime();if(!Number.isFinite(Je))continue;if(Je>=J)ne.push(Ae)}ne.sort((Oe,Ae)=>new Date(Ae.ts).getTime()-new Date(Oe.ts).getTime());let ue=Array.from({length:g},()=>0),ye=Array.from({length:g},()=>0),Se={},ke={},Ie={},he=0,_e=0;for(let Oe of ne){let Ae=Oe.agent||"unknown";Se[Ae]=(Se[Ae]??0)+1;let Je=Math.round((F-L(new Date(Oe.ts)))/86400000),Ke=g-1-Je,st=Je>=0&&Je<g;if(st)ye[Ke]=(ye[Ke]??0)+1;if(Oe.decision!=="allow"){if(he++,Oe.ruleId)ke[Oe.ruleId]=(ke[Oe.ruleId]??0)+1;let Ue=Pn(Oe.segment||Oe.command);if(Ue)Ie[Ue]=(Ie[Ue]??0)+1;if(Oe.failureStage)_e++;if(st)ue[Ke]=(ue[Ke]??0)+1}}return{days:g,logsDir:y,homeDir:a.home,totalInWindow:ne.length,truncated:ne.length>Sn,unreadable:de.count,counts:{blocked:he,allowed:ne.length-he,agents:Se,blockedByDay:ue,analyzedByDay:ye,rules:ke,commands:Ie,errors:_e},entries:ed(ne).sort((Oe,Ae)=>new Date(Ae.ts).getTime()-new Date(Oe.ts).getTime())}}import{spawn as td}from"node:child_process";import{existsSync as nd,statSync as Is}from"node:fs";import{delimiter as rd,join as od}from"node:path";var sd=120000,Rn="Choose the project folder",id=`try
  return POSIX path of (choose folder with prompt "${Rn}")
on error number -128
  return ""
end try`,ad=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Rn}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Ns=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Rn}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Rn]}],Ms=(a,g)=>(g.PATH??"").split(rd).some((y)=>{if(y.length===0)return!1;try{let L=Is(od(y,a));return L.isFile()&&(L.mode&73)!==0}catch{return!1}});function cr(a,g){if(a==="darwin"||a==="win32")return!0;if(a!=="linux")return!1;if(!g.DISPLAY&&!g.WAYLAND_DISPLAY)return!1;return Ns.some((y)=>Ms(y.binary,g))}function ld(a,g){if(a==="darwin")return{cmd:"osascript",args:["-e",id]};if(a==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",ad]};let y=Ns.find((L)=>Ms(L.binary,g));return y?{cmd:y.binary,args:y.args}:null}function dr(a=process.platform,g=process.env){let y=ld(a,g);if(!y)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((L)=>{let F=td(y.cmd,y.args,{env:g,stdio:["ignore","pipe","pipe"]}),N="",J=!1,ne=(ue)=>{if(J)return;J=!0,clearTimeout(de),L(ue)},de=setTimeout(()=>{F.kill(),ne({error:"The folder dialog timed out"})},sd);F.stdout.on("data",(ue)=>{N+=ue.toString()}),F.on("error",()=>ne({error:`Could not open the folder dialog (${y.cmd})`})),F.on("close",()=>{let ue=N.trim().replace(/\/+$/,"");if(!ue)return ne({cancelled:!0});if(!nd(ue)||!Is(ue).isDirectory())return ne({error:"That selection is not a folder on disk"});ne({path:ue})})})}var Hs=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CC Safety Net</title>
  <link rel="icon" href="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221254%22%20height%3D%221254%22%20viewBox%3D%2254%2023%201140%201140%22%20role%3D%22img%22%20aria-label%3D%22Safety%20net%20logo%20mesh%20variant%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-0%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.68%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-1%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.58%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-2%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-3%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.38%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22edge%22%20x1%3D%2214%25%22%20y1%3D%228%25%22%20x2%3D%2288%25%22%20y2%3D%2294%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23bae6fd%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%231e293b%22%20stop-opacity%3D%220.86%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cmask%20id%3D%22net-mask%22%20maskUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fmask%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Cg%20mask%3D%22url(%23net-mask)%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22%2307090d%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22360%22%20cy%3D%22240%22%20r%3D%22430%22%20fill%3D%22url(%23spot-0)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22820%22%20cy%3D%22300%22%20r%3D%22430%22%20fill%3D%22url(%23spot-1)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22760%22%20cy%3D%22830%22%20r%3D%22500%22%20fill%3D%22url(%23spot-2)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22780%22%20r%3D%22390%22%20fill%3D%22url(%23spot-3)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22url(%23edge)%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22url(%23edge)%22%20stroke-width%3D%2214%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.2%22%20stroke-width%3D%225%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate(-10%20-14)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
  <script>
    (() => {
      const stored = localStorage.getItem('cc-safety-net-theme');
      if (stored === 'light' || stored === 'dark') document.documentElement.style.colorScheme = stored;
    })();
  </script>
  <style>
:root {
  color-scheme: light dark;

  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --bg: light-dark(#f3f4f6, #0c0e11);
  --surface: light-dark(#ffffff, #16191d);
  --surface-2: light-dark(#f6f7f9, #1c2025);
  --btn-hover-fill: light-dark(#e9ebef, #282c33);
  --field-bg: light-dark(#ffffff, #101317);

  --ink: light-dark(#171a1f, #e7eaed);
  --muted: light-dark(#5b626c, #99a1ac);
  --meta: light-dark(#6b7280, #838b95);

  --border: light-dark(#e3e6ea, #292d33);
  --border-strong: light-dark(#cfd4da, #363b42);

  --switch-track: light-dark(#8b929c, #626973);
  --switch-track-hover: #767d87;
  --switch-knob: #ffffff;

  --focus-ring: var(--ink);

  --accent: light-dark(#166534, #3fb950);
  --safe: #14532d;
  --safe-hover: #0f3d20;
  --danger: #7f1d1d;
  --danger-hover: #641414;

  --star: light-dark(#b7791f, #f2c94c);

  --ok-fg: light-dark(#15803d, #4ade80);
  --ok-bg: light-dark(#edfaf1, #10251a);
  --ok-border: light-dark(#b7e4c7, #1f5133);

  --err-fg: light-dark(#b42318, #ff8078);
  --err-bg: light-dark(#fef2f1, #2b1512);
  --err-border: light-dark(#f2c9c4, #5c2620);

  --warn-fg: light-dark(#b45309, #fbbf24);
  --warn-bg: light-dark(#fefaf0, #2a2008);
  --warn-border: light-dark(#f2ddb0, #5c4a1d);

  --master: light-dark(#1d4ed8, #4c8dff);
  --master-fg: light-dark(#1e40af, #9ec3ff);
  --master-bg: light-dark(#eef4fe, #101a2b);
  --master-border: light-dark(#c5d6f6, #23446e);

  --strict-fg: light-dark(#1e40af, #9ec3ff);
  --strict-bg: light-dark(#eef4fe, #101a2b);
  --strict-border: light-dark(#c5d6f6, #23446e);
  --paranoid-fg: light-dark(#6b21a8, #d8b4fe);
  --paranoid-bg: light-dark(#faf5ff, #21152c);
  --paranoid-border: light-dark(#e4ccf4, #513064);

  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;

  --topbar-h: 58px;

  font-family: var(--font-sans);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 14px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.brand {
  padding: 0 10px;
}

h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-logo {
  display: flex;
  color: var(--ink);
}

.brand-home {
  display: flex;
  color: inherit;
}

.brand-logo svg {
  width: auto;
  height: 30px;
}

.sidenav {
  display: grid;
  gap: 2px;
}

.sidenav a {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.sidenav a:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.sidenav a[aria-current='page'] {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.sidenav svg {
  width: 15px;
  height: 15px;
  flex: none;
}

.sidebar-foot {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding: 0 10px;
}

.sidebar-links {
  display: grid;
  gap: 5px;
  font-size: 12px;
}

.sidebar-links a {
  color: var(--meta);
  text-decoration: none;
}

.sidebar-links a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sidebar-links a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

.content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.app-foot {
  display: none;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  min-height: var(--topbar-h);
  padding: 12px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.topbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  max-width: 1040px;
  margin: 0 auto;
}

.topbar-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.app-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.25;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.app-status:empty {
  display: none;
}

.app-status.ok {
  color: var(--ok-fg);
  border-color: var(--ok-border);
  background: var(--ok-bg);
}

.app-status.error {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.dirty-chip {
  padding: 6px 12px;
  border: 1px solid var(--warn-border);
  border-radius: 999px;
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.view-search {
  display: flex;
  align-items: center;
  flex: 1 1 240px;
  min-width: 180px;
  max-width: 380px;
}

.topbar-search {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 440px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

button:not(:disabled),
select,
label.row:not(.row-disabled),
label.rule-control,
input[type='checkbox']:not(:disabled),
input[type='radio']:not(:disabled) {
  cursor: pointer;
}

button {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 14px;
  background: var(--surface);
  color: var(--ink);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

button:hover:not(:disabled) {
  background: var(--surface-2);
  border-color: var(--muted);
}

#theme-toggle,
#raw-copy,
#activity-refresh,
#integrations-refresh,
#rules-refresh,
#tester-run,
#reset-rule-customizations,
#reset-secret-customizations,
.rule-example-button {
  border-color: transparent;
}

#theme-toggle:hover:not(:disabled),
#raw-copy:hover:not(:disabled),
#activity-refresh:hover:not(:disabled),
#integrations-refresh:hover:not(:disabled),
#rules-refresh:hover:not(:disabled),
#tester-run:hover:not(:disabled),
#reset-rule-customizations:hover:not(:disabled),
#reset-secret-customizations:hover:not(:disabled),
.rule-example-button:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

button:disabled {
  opacity: 0.6;
  cursor: progress;
}

button.primary {
  background: var(--safe);
  border-color: var(--safe);
  color: #fff;
}

button.primary:hover:not(:disabled) {
  background: var(--safe-hover);
  border-color: var(--safe-hover);
}

button.danger {
  background: var(--danger);
  border-color: var(--danger);
  color: #fff;
}

button.danger:hover:not(:disabled) {
  background: var(--danger-hover);
  border-color: var(--danger-hover);
}

#theme-toggle {
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 7px;
  color: var(--muted);
}

#theme-toggle:hover {
  color: var(--ink);
}

#theme-toggle svg {
  width: 15px;
  height: 15px;
}

button.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--muted);
}

button.icon-button:hover:not(:disabled) {
  color: var(--ink);
}

button.icon-button.copied {
  color: var(--ok-fg);
}

button.icon-button.copied:hover:not(:disabled) {
  color: var(--ok-fg);
}

button.icon-button svg {
  width: 16px;
  height: 16px;
}

:where(button, input, textarea):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

main {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 28px 48px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.view {
  display: grid;
  gap: 18px;
}

.view[hidden] {
  display: none;
}

.view-head .panel-sub {
  margin-top: 0;
}

.policy-savebar {
  position: sticky;
  top: var(--topbar-h);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.savebar-actions {
  display: flex;
  gap: 8px;
}

.retention-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12.5px;
  font-weight: 600;
}

.retention-row input {
  width: 84px;
  text-align: right;
}

.retention-note {
  margin: 8px 0 0;
  font-size: 12px;
}

.tiles-window {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
}

.tiles-window:empty {
  display: none;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.tiles:empty {
  display: none;
}

.tile {
  display: grid;
  grid-template-columns: 1fr minmax(0, 168px);
  grid-template-areas:
    'value spark'
    'label spark';
  align-items: center;
  gap: 3px 16px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.tile strong {
  grid-area: value;
  align-self: end;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.tile span {
  grid-area: label;
  align-self: start;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
}

.view-all-link {
  align-self: center;
  padding: 8px 14px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.view-all-link:hover {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.protection-warning {
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

.dual-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

@media (max-width: 720px) {
  .dual-panels {
    grid-template-columns: 1fr;
  }
}

#top-rules,
#top-commands {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
}

.top-rule,
.top-command {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 7px 10px;
  border-color: transparent;
  background: transparent;
  border-radius: var(--radius-sm);
  text-align: left;
}

.top-rule:hover:not(:disabled),
.top-command:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

.top-rule .rule-id,
.top-command .rule-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.guard-errors {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--warn-border);
  border-radius: var(--radius);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12.5px;
  font-weight: 600;
  text-align: left;
}

.activity-controls {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.activity-controls-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.activity-days {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 650;
  color: var(--muted);
}

.activity-refresh {
  margin-left: auto;
}

@keyframes activity-refresh-spin {
  to {
    transform: rotate(360deg);
  }
}

.activity-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

.integrations-refresh,
.rules-refresh {
  margin-left: auto;
}

.integrations-refresh.spinning svg,
.rules-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

#integrations-list {
  display: grid;
  gap: 8px;
}

.integration-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.integration-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.integration-row .status {
  grid-column: 1 / -1;
}

.integration-row button.primary,
.integration-row button.danger {
  min-width: 88px;
  background: transparent;
  border-color: transparent;
  color: var(--ink);
}

.integration-row button.primary:hover:not(:disabled),
.integration-row button.danger:hover:not(:disabled) {
  color: #fff;
}

#rules-composer-panel .field + .field,
.rules-composer-actions {
  margin-top: 14px;
}

.rules-path-row {
  display: flex;
  gap: 8px;
}

.rules-path-row input {
  flex: 1 1 auto;
  min-width: 0;
}

.rules-path-row button {
  flex: none;
}

#rules-project-path[readonly] {
  border-color: var(--border);
  color: var(--muted);
}

.rules-composer-actions {
  display: flex;
  justify-content: flex-end;
}

#rules-list,
#rules-diagnostics {
  display: grid;
  gap: 8px;
}

.rulebook-card {
  display: grid;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.rulebook-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.rulebook-head code,
.rulebook-rule code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.rulebook-rule .rule-id {
  color: var(--muted);
}

.rulebook-rule p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule.rules-focus {
  margin: 0 -8px;
  padding: 10px 8px;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
}

select {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 10px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
}

.chip-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.chip-row:empty {
  display: none;
}

button.chip {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

button.chip[aria-pressed='true'] {
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

.chip-count {
  font-variant-numeric: tabular-nums;
}

button.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

button.filter-pill code {
  font-family: var(--font-mono);
}

.filter-pill-x {
  opacity: 0.7;
}

.feed-list {
  display: grid;
  gap: 8px;
}

.feed-item {
  display: grid;
  gap: 7px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.feed-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--meta);
}

.feed-meta time {
  margin-left: auto;
  white-space: nowrap;
}

.feed-copy,
.feed-report {
  width: 26px;
  height: 26px;
  margin: -4px 0;
  border: 0;
  background: transparent;
}

.feed-copy:hover:not(:disabled),
.feed-report:hover:not(:disabled) {
  background: transparent;
}

.feed-copy svg,
.feed-report svg {
  width: 14px;
  height: 14px;
}

.feed-copy.copied svg {
  width: 12px;
  height: 12px;
}

.feed-meta .rule-id {
  font-family: var(--font-mono);
  color: var(--muted);
  overflow-wrap: anywhere;
}

#tester-result .rule-id {
  font-family: var(--font-mono);
}

button.rule-id {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
}

button.rule-id:hover {
  color: var(--ink);
  text-decoration: underline;
}

.decision-badge {
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.decision-badge.deny {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.decision-badge.allow {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.decision-badge.error {
  color: var(--warn-fg);
  background: var(--warn-bg);
  border-color: var(--warn-border);
}

.agent-badge {
  padding: 1px 8px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  color: var(--muted);
  font-weight: 600;
}

.feed-command,
.rule-example-popover code {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 12px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.feed-command {
  padding: 8px 10px;
  max-width: 85ch;
  max-height: 7.2em;
  overflow: hidden;
}

.feed-command.clamped {
  mask-image: linear-gradient(180deg, #000 calc(100% - 1.6em), transparent);
}

.feed-command.expanded {
  max-height: none;
  mask-image: none;
}

.feed-toggle {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.feed-block {
  align-self: center;
  font-size: 11px;
}

.feed-day-sep {
  padding-top: 6px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.tile-spark {
  grid-area: spark;
  display: flex;
  align-items: stretch;
  gap: 2px;
  width: 100%;
  height: 40px;
}

.spark-col {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex: 1 1 0;
  min-width: 1px;
}

.spark-bar {
  width: 100%;
  background: var(--accent);
  border-radius: 1px;
}

.spark-bar.spark-zero {
  background: var(--border-strong);
}

.spark-col::after {
  content: attr(data-count);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease;
}

.spark-col:hover::after,
.spark-col:focus-visible::after {
  opacity: 1;
}

.spark-col:focus-visible {
  border-radius: var(--radius-sm);
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.feed-reason {
  margin: 0;
  max-width: 85ch;
  font-size: 12px;
}

.activity-count {
  margin: 12px 0 0;
  font-size: 12px;
}

.activity-count:empty {
  display: none;
}

.info-rows {
  display: grid;
  gap: 10px;
}

.info-row {
  display: grid;
  gap: 3px;
}

.info-row > span {
  font-size: 12px;
  font-weight: 650;
  color: var(--muted);
}

.info-row code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.danger-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.danger-row strong {
  font-size: 13px;
}

.danger-row p {
  margin: 4px 0 0;
  font-size: 12px;
}

.status {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-size: 13px;
  line-height: 1.45;
  white-space: pre-wrap;
}

.status:empty {
  display: none;
}

.protection-banner {
  padding: 10px 14px;
  border: 1px solid var(--err-fg);
  border-radius: var(--radius);
  background: var(--err-bg);
  color: var(--err-fg);
  font-weight: 600;
}

.status.ok {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.status.error {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.health-strip strong {
  color: var(--ink);
  font-weight: 650;
}

.recovery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border: 1px solid var(--err-border);
  border-radius: var(--radius);
  background: var(--surface);
}

.recovery[hidden] {
  display: none;
}

.recovery strong {
  display: block;
  font-size: 13px;
}

.recovery p {
  margin: 4px 0 0;
}

.muted {
  color: var(--muted);
  line-height: 1.45;
}

.confirm-dialog {
  width: min(420px, calc(100vw - 32px));
  padding: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--ink);
}

.rule-example-popover {
  position: fixed;
  inset: auto;
  width: min(360px, calc(100vw - 24px));
  margin: 0;
  padding: 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 4px 8px rgb(0 0 0 / 18%);
}

.rule-example-popover::backdrop {
  background: transparent;
}

.rule-example-popover > * {
  display: block;
}

.rule-example-label {
  margin-bottom: 3px;
  color: var(--muted);
  font-size: 11px;
}

.rule-example-popover strong {
  margin-bottom: 10px;
  font-size: 13px;
}

.rule-example-popover code {
  padding: 9px 10px;
}

.confirm-dialog::backdrop {
  background: rgb(0 0 0 / 48%);
}

.confirm-dialog form {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.confirm-dialog h2 {
  margin: 0;
}

.confirm-dialog p {
  margin: 0;
}

.dialog-detail {
  padding: 9px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  overflow-wrap: anywhere;
}

.dialog-detail code {
  font-family: var(--font-mono);
  font-size: 12px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}

.report-dialog {
  width: min(680px, calc(100vw - 32px));
}

.confirm-dialog:has(.dialog-rows:not([hidden])) {
  width: min(620px, calc(100vw - 32px));
}

.dialog-rows {
  max-height: 46vh;
  overflow: auto;
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
}

.diff-table th {
  padding: 4px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-weight: 600;
}

.diff-table td {
  padding: 5px 8px;
  border-bottom: 1px solid var(--border);
  overflow-wrap: anywhere;
  vertical-align: top;
}

.diff-table code {
  font-family: var(--font-mono);
  font-size: 11.5px;
}

.diff-before {
  color: var(--muted);
  text-decoration: line-through;
}

.diff-after {
  color: var(--ink);
  font-weight: 650;
}

.diff-warning {
  margin: 8px 0 0;
  padding: 7px 10px;
  border-left: 3px solid var(--warn-border);
  border-radius: var(--radius-sm);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
}

.view-head-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.project-draft-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid var(--master-border);
  border-radius: var(--radius);
  background: var(--master-bg);
}

.project-draft-bar[hidden] {
  display: none;
}

.project-draft-target strong {
  display: block;
  font-size: 13px;
}

.project-draft-target code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.project-draft-target p {
  margin: 4px 0 0;
  font-size: 12px;
}

.project-chip {
  flex: none;
  align-self: center;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--master-border);
  border-radius: 999px;
  background: var(--master-bg);
  color: var(--master-fg);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.project-chip.inherited {
  border-color: var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 600;
}

.rule-row > .project-chip {
  grid-column: 1 / -1;
  justify-self: end;
  margin-left: 0;
}

.project-field-line {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.project-chip-slot:empty {
  display: none;
}

.row:has(.project-chip.inherited) strong {
  color: var(--muted);
}

.report-field {
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.panel-title {
  min-width: 0;
}

.raw-json-head {
  flex-wrap: nowrap;
}

.raw-json-head .panel-title {
  flex: 1 1 auto;
}

.raw-json-head #raw-copy {
  flex: none;
}

.panel-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: -4px 0;
  padding: 4px 6px 4px 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.panel-toggle:hover {
  background: transparent;
  color: var(--ink);
}

.panel-chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  transition: transform 0.15s ease;
}

.panel-toggle[aria-expanded='false'] .panel-chevron,
:is(.rule-tier-head, .tier-collapse)[aria-expanded='false'] .panel-chevron {
  transform: rotate(-45deg);
}

h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.panel-sub {
  margin: 4px 0 0;
  font-size: 12.5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 8px;
}

label.row {
  display: flex;
  gap: 12px;
}

label.row,
.rule-row {
  align-items: flex-start;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

label.row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

label.row.row-disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

label.row.row-disabled:hover {
  border-color: var(--border);
  background: var(--surface);
}

:is(label.row, .rule-control) input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  margin: 1px 0 0;
  width: 34px;
  height: 20px;
  flex: none;
  border: 1px solid var(--switch-track);
  border-radius: 999px;
  background: var(--switch-track);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

:is(label.row, .rule-control) input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

:is(label.row, .rule-control) input[type='checkbox']:checked {
  background: var(--accent);
  border-color: var(--accent);
}

:is(label.row, .rule-control) input[type='checkbox']:checked::before {
  transform: translateX(14px);
}

:is(label.row, .rule-control):hover input[type='checkbox']:not(:checked) {
  border-color: var(--switch-track-hover);
  background: var(--switch-track-hover);
}

label.row.safety-override-row {
  display: grid;
  gap: 8px;
}

label.row.safety-override-row select {
  width: 100%;
}

:is(label.row, .rule-control) span {
  display: block;
  min-width: 0;
}

:is(label.row, .rule-control) strong {
  font-weight: 650;
  font-size: 13px;
}

:is(label.row, .rule-control) .rule-id {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
  word-break: break-all;
}

:is(label.row, .rule-control) small {
  display: block;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
}

#destructive-command > label.row {
  margin-bottom: 16px;
}

.preset-status {
  margin-bottom: 10px;
  font-weight: 700;
}

#safety-preset-status:empty {
  display: none;
}

.preset-status.customized {
  color: var(--master-fg);
}

.preset-standard {
  --preset-fg: var(--ok-fg);
  --preset-bg: var(--ok-bg);
  --preset-border: var(--ok-border);
}

.preset-strict {
  --preset-fg: var(--strict-fg);
  --preset-bg: var(--strict-bg);
  --preset-border: var(--strict-border);
}

.preset-paranoid {
  --preset-fg: var(--paranoid-fg);
  --preset-bg: var(--paranoid-bg);
  --preset-border: var(--paranoid-border);
}

#safety-level label.row:has(input:checked),
#safety-level label.row:has(input:checked):hover {
  border-color: var(--preset-border);
  background: var(--preset-bg);
  accent-color: var(--preset-fg);
}

#safety-level label.row:has(input:checked) strong {
  color: var(--preset-fg);
}

.panel-head-action {
  flex: none;
}

.rule-tier {
  overflow: clip;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
}

.rule-tier + .rule-tier,
#destructive-command-rules + .rule-tier {
  margin-top: 10px;
}

.rule-tier-enforced {
  border-color: var(--ok-border);
}

.rule-tier-strict {
  border-color: var(--strict-border);
}

.rule-tier-paranoid {
  border-color: var(--paranoid-border);
}

.rule-tier-head {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: var(--surface-2);
  color: var(--ink);
  text-align: left;
}

.rule-tier-head:hover:not(:disabled) {
  background: var(--surface-2);
}

.tier-collapse {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 12px;
  margin: -9px -10px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  text-align: left;
}

.tier-switch {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 30px;
  height: 16px;
  flex: none;
  padding: 0;
  border: 0;
  background: none;
}

.tier-switch::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: var(--switch-track);
  transition: background-color 0.18s ease;
}

.tier-switch::before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

.tier-switch:checked::after {
  background: color-mix(in srgb, var(--accent) 45%, transparent);
}

.tier-switch:checked::before {
  transform: translateX(14px);
  background: var(--accent);
}

.rule-tier-enforced .rule-tier-head,
.rule-tier-enforced .rule-tier-head:hover:not(:disabled) {
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.rule-tier-strict .rule-tier-head,
.rule-tier-strict .rule-tier-head:hover:not(:disabled) {
  background: var(--strict-bg);
  color: var(--strict-fg);
}

.rule-tier-paranoid .rule-tier-head,
.rule-tier-paranoid .rule-tier-head:hover:not(:disabled) {
  background: var(--paranoid-bg);
  color: var(--paranoid-fg);
}

.tier-label {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 1px;
}

.tier-label small,
.tier-counts {
  color: inherit;
  font-size: 11px;
}

.tier-counts {
  flex: none;
  font-weight: 500;
  text-align: right;
}

.tier-counts .count-off {
  color: var(--warn-fg);
}

.tier-content {
  padding: 12px;
  border-top: 1px solid var(--border);
}

.rule-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.rule-row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

.rule-row.row-disabled {
  background: var(--surface);
}

.rule-control {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: flex-start;
  gap: 12px;
}

.rule-row.row-disabled .rule-control {
  cursor: not-allowed;
  opacity: 0.62;
}

.rule-example-button {
  position: relative;
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  line-height: 1;
}

.rule-example-button::before {
  content: '';
  position: absolute;
  inset: -9px;
}

.rule-example-button:hover:not(:disabled) {
  color: var(--ink);
}

.inherit-button {
  grid-column: 1 / -1;
  justify-self: end;
  padding: 5px 8px;
  font-size: 11px;
}

label.row.master {
  align-items: center;
  padding: 12px 14px;
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

label.row.master:hover {
  border-color: color-mix(in srgb, var(--err-fg) 34%, var(--err-border));
  background: var(--err-bg);
}

label.row.master:not(:has(input:checked)) {
  border-left: 3px solid var(--err-fg);
}

label.row.master:has(input:checked) {
  border-color: var(--master-border);
  background: color-mix(in srgb, var(--master-bg) 72%, var(--surface));
}

label.row.master:has(input:checked):hover {
  border-color: color-mix(in srgb, var(--master) 42%, var(--master-border));
  background: var(--master-bg);
}

label.row.master strong {
  font-size: 15px;
}

label.row.master input[type='checkbox'] {
  margin: 0;
  width: 44px;
  height: 24px;
}

label.row.master input[type='checkbox']:checked {
  background: var(--master);
  border-color: var(--master);
}

label.row.master input[type='checkbox']::before {
  width: 18px;
  height: 18px;
}

label.row.master input[type='checkbox']:checked::before {
  transform: translateX(20px);
}

.master-badge {
  flex: none;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--err-border);
  border-radius: 999px;
  background: var(--err-bg);
  color: var(--err-fg);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

label.row.master:has(input:checked) .master-badge {
  border-color: var(--master-border);
  background: var(--master-bg);
  color: var(--master-fg);
}

.state-active {
  color: var(--ok-fg);
  font-weight: 700;
}

.state-disabled {
  color: var(--err-fg);
  font-weight: 700;
}

.destructive-command-group + .destructive-command-group {
  margin-top: 24px;
}

.destructive-command-group h3 {
  margin: 0 0 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

.empty {
  margin: 0;
  padding: 16px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  color: var(--muted);
  text-align: center;
}

#secret {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 4px;
}

.field-toggle .panel-toggle {
  justify-self: start;
  margin: -2px 0;
  padding: 2px 6px 2px 0;
  font-weight: 650;
}

#safety-level + .field,
.foldable-field-content + .field {
  margin-top: 14px;
}

#safety-overrides,
#workflow {
  margin-top: 4px;
}

.foldable-field-content {
  display: grid;
  gap: 4px;
}

.foldable-field-content > p {
  margin: 0;
  font-size: 12px;
}

.paths-content:not([hidden]) {
  display: grid;
  gap: 10px;
}

.paths-content > p.muted {
  margin: 0;
  font-size: 12px;
}

.field > span {
  font-size: 13px;
  font-weight: 650;
}

.field small {
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 400;
  line-height: 1.45;
}

input[type='search'],
input[type='text'],
textarea {
  width: 100%;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 9px 11px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
  transition: border-color 0.15s ease;
}

input[type='search']:hover,
input[type='text']:hover,
textarea:hover {
  border-color: var(--muted);
}

input[type='search']:focus,
input[type='text']:focus,
textarea:focus {
  border-color: var(--muted);
  outline: none;
}

input[type='text']:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.tester-row {
  display: flex;
  gap: 8px;
}

.tester-row input[type='text'] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.tester-row button {
  flex: none;
  align-self: center;
}

#tester-result {
  margin-top: 12px;
}

.tester-segment {
  margin-top: 6px;
}

.paths-add {
  display: flex;
  gap: 8px;
}

.paths-add input[type='text'] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.paths-add button {
  flex: none;
  align-self: center;
}

.paths-hint {
  margin: -6px 0 0;
  color: var(--err-fg);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.paths-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.path-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.path-item code {
  flex: 1 1 auto;
  min-width: 0;
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 12.5px;
  overflow-wrap: anywhere;
}

.path-item button:hover:not(:disabled) {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.path-item.row-disabled {
  opacity: 0.62;
}

.path-item.row-disabled button {
  cursor: not-allowed;
}

.path-item button {
  flex: none;
}

textarea {
  min-height: 96px;
  resize: vertical;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.55;
}

#raw {
  min-height: 280px;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.star-pitch {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  color: var(--ink);
  font-size: 12.5px;
  line-height: 1.45;
}

.star-pitch strong {
  font-variant-numeric: tabular-nums;
}

.star-mechanism {
  display: block;
  margin-top: 2px;
  color: var(--meta);
  font-size: 11.5px;
}

#star-slot {
  display: inline-flex;
  flex: none;
}

.star-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: none;
  white-space: nowrap;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--muted);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.star-cta:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--star) 45%, var(--border-strong));
  background: var(--surface-2);
  color: var(--ink);
}

.star-cta:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.star-icon {
  display: inline-flex;
  width: 15px;
  height: 15px;
  color: var(--star);
}

.star-icon svg {
  width: 15px;
  height: 15px;
}

.star-count {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  border-left: 1px solid var(--border-strong);
  padding-left: 8px;
  color: var(--muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.star-cta.starred:disabled {
  opacity: 1;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* !important: reduced-motion must win over every class-level transition */
    transition: none !important;
  }

  .activity-refresh.spinning svg,
  .integrations-refresh.spinning svg,
  .rules-refresh.spinning svg {
    animation: none;
  }
}

@media (max-width: 900px) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    z-index: 100;
    height: var(--topbar-h);
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 0 16px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .brand-logo svg {
    height: 20px;
  }

  .topbar {
    position: static;
    z-index: auto;
  }

  .topbar.has-search {
    position: sticky;
    top: var(--topbar-h);
    z-index: 95;
  }

  .policy-savebar {
    top: calc(var(--topbar-h) * 2);
  }

  .brand {
    flex: none;
    padding: 0;
  }

  main {
    flex: 1;
  }

  .app-foot {
    display: flex;
    justify-content: center;
    gap: 28px;
    padding: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
  }

  .app-foot a {
    color: var(--meta);
    text-decoration: none;
  }

  .app-foot a:hover {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .sidenav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 2px;
  }

  .sidenav a {
    padding: 15px 7px;
  }

  .sr-only-collapse {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .sidebar-foot {
    display: none;
  }
}

@media (max-width: 640px) {
  .topbar {
    padding: 10px 16px;
  }

  .topbar-row {
    flex-wrap: wrap;
  }

  .topbar.has-search .topbar-row {
    flex-wrap: nowrap;
  }

  main {
    padding: 18px 16px 40px;
  }

  .topbar-search {
    max-width: none;
  }

  .panel {
    padding: 16px;
  }

  .star-row {
    flex-wrap: wrap;
  }

  .star-row .star-cta,
  .star-row #star-slot {
    flex: 1 1 100%;
    justify-content: center;
  }

  .panel-head {
    flex-direction: column;
  }

  .raw-json-head,
  .panel-head:has(.view-all-link) {
    flex-direction: row;
    align-items: center;
  }

  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .rule-tier-head,
  .tier-collapse {
    flex-wrap: wrap;
  }

  .rule-row {
    align-items: start;
  }

  .tier-counts {
    flex: 1 1 100%;
    padding-left: 20px;
    text-align: left;
  }

  .inherit-button {
    align-self: flex-start;
  }
}

@media (min-width: 1440px) {
  body[data-view='overview'] main,
  body[data-view='overview'] .topbar-row {
    max-width: 1200px;
  }
}

[hidden] {
  display: none;
}

  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <h1 class="brand-logo"><a class="brand-home" href="#overview" title="Overview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 512" role="img" aria-label="CC Safety Net">
  <path d="M 1439 165 L 1411 165 L 1409 166 L 1408 168 L 1403 173 L 1403 174 L 1398 179 L 1398 180 L 1395 183 L 1394 183 L 1394 184 L 1385 194 L 1385 195 L 1381 199 L 1381 200 L 1378 202 L 1378 203 L 1374 207 L 1374 208 L 1367 215 L 1367 216 L 1358 226 L 1358 227 L 1352 233 L 1352 234 L 1347 239 L 1347 240 L 1341 246 L 1341 247 L 1336 252 L 1336 253 L 1332 257 L 1332 258 L 1325 265 L 1325 266 L 1319 272 L 1319 273 L 1314 278 L 1314 279 L 1309 284 L 1309 285 L 1303 291 L 1303 292 L 1299 296 L 1299 297 L 1294 302 L 1291 299 L 1290 300 L 1290 301 L 1293 301 L 1294 302 L 1288 309 L 1287 308 L 1288 309 L 1286 312 L 1285 311 L 1285 306 L 1286 305 L 1286 303 L 1288 299 L 1288 296 L 1289 295 L 1289 292 L 1290 291 L 1290 287 L 1291 286 L 1291 284 L 1293 280 L 1293 277 L 1294 276 L 1294 272 L 1295 271 L 1295 269 L 1297 265 L 1297 262 L 1298 261 L 1298 258 L 1299 257 L 1299 253 L 1300 252 L 1300 250 L 1301 249 L 1301 247 L 1303 243 L 1303 238 L 1304 237 L 1304 235 L 1305 234 L 1305 232 L 1307 228 L 1307 224 L 1308 223 L 1308 221 L 1309 220 L 1309 217 L 1310 216 L 1310 214 L 1312 210 L 1312 205 L 1314 202 L 1314 199 L 1316 195 L 1317 188 L 1318 187 L 1318 185 L 1319 184 L 1319 182 L 1321 178 L 1321 173 L 1323 169 L 1323 166 L 1296 166 L 1296 168 L 1294 171 L 1294 174 L 1293 175 L 1293 178 L 1292 179 L 1291 186 L 1290 187 L 1290 189 L 1289 190 L 1289 192 L 1287 196 L 1287 200 L 1285 204 L 1285 207 L 1283 211 L 1283 215 L 1282 216 L 1282 218 L 1281 219 L 1281 222 L 1279 226 L 1279 229 L 1278 230 L 1278 234 L 1277 235 L 1277 237 L 1276 238 L 1276 240 L 1274 244 L 1274 249 L 1273 250 L 1273 252 L 1271 256 L 1271 259 L 1270 260 L 1270 263 L 1269 264 L 1269 268 L 1268 269 L 1268 271 L 1266 275 L 1266 278 L 1265 279 L 1265 284 L 1264 285 L 1264 287 L 1262 291 L 1262 294 L 1261 295 L 1261 298 L 1260 299 L 1259 306 L 1258 307 L 1258 309 L 1257 310 L 1257 313 L 1256 314 L 1256 318 L 1254 322 L 1254 325 L 1273 325 L 1274 327 L 1273 328 L 1272 327 L 1273 328 L 1269 332 L 1269 333 L 1265 337 L 1265 338 L 1261 341 L 1261 342 L 1252 352 L 1252 353 L 1247 358 L 1247 359 L 1242 364 L 1242 365 L 1239 367 L 1239 368 L 1224 385 L 1224 386 L 1220 390 L 1220 391 L 1216 395 L 1216 396 L 1214 397 L 1214 399 L 1247 399 L 1249 397 L 1249 396 L 1259 385 L 1259 384 L 1263 380 L 1263 379 L 1265 377 L 1266 377 L 1266 376 L 1271 371 L 1271 370 L 1278 363 L 1278 362 L 1283 357 L 1283 356 L 1294 344 L 1294 343 L 1298 339 L 1298 338 L 1305 331 L 1305 330 L 1309 326 L 1309 325 L 1312 323 L 1313 320 L 1315 319 L 1316 317 L 1321 312 L 1322 312 L 1321 311 L 1330 301 L 1330 300 L 1335 295 L 1335 294 L 1337 292 L 1338 292 L 1339 289 L 1342 287 L 1342 286 L 1346 282 L 1346 281 L 1352 275 L 1352 274 L 1361 264 L 1361 263 L 1370 253 L 1370 252 L 1375 247 L 1375 246 L 1380 241 L 1380 240 L 1387 233 L 1387 232 L 1402 215 L 1402 214 L 1406 210 L 1406 209 L 1408 207 L 1409 207 L 1409 206 L 1413 202 L 1413 201 L 1418 196 L 1418 195 L 1422 191 L 1422 190 L 1427 185 L 1427 184 L 1431 180 L 1431 179 L 1440 169 L 1441 167 Z
M 1129 179 L 1126 178 L 1125 176 L 1124 176 L 1116 170 L 1114 170 L 1107 166 L 1105 166 L 1104 165 L 1101 165 L 1100 164 L 1096 164 L 1095 163 L 1091 163 L 1090 162 L 1081 162 L 1080 161 L 1076 161 L 1075 162 L 1066 162 L 1065 163 L 1061 163 L 1060 164 L 1057 164 L 1056 165 L 1051 165 L 1050 166 L 1045 167 L 1040 170 L 1038 170 L 1028 175 L 1023 179 L 1021 179 L 1017 183 L 1016 183 L 1012 187 L 1011 187 L 999 199 L 999 200 L 996 203 L 996 204 L 994 205 L 993 208 L 990 211 L 981 229 L 981 231 L 980 232 L 980 234 L 979 235 L 979 237 L 977 241 L 977 244 L 976 245 L 976 254 L 975 255 L 975 265 L 976 266 L 976 273 L 977 274 L 977 277 L 980 283 L 981 288 L 984 292 L 985 295 L 988 298 L 989 301 L 998 310 L 1001 311 L 1004 314 L 1007 315 L 1009 317 L 1013 319 L 1015 319 L 1018 321 L 1020 321 L 1024 323 L 1027 323 L 1028 324 L 1035 324 L 1036 325 L 1054 325 L 1055 324 L 1062 324 L 1063 323 L 1067 323 L 1068 322 L 1071 322 L 1077 319 L 1080 319 L 1087 315 L 1089 315 L 1093 313 L 1095 311 L 1098 310 L 1103 306 L 1106 305 L 1116 296 L 1117 296 L 1115 292 L 1113 290 L 1112 290 L 1111 288 L 1109 286 L 1108 286 L 1107 284 L 1100 278 L 1098 279 L 1090 286 L 1089 286 L 1086 289 L 1074 295 L 1072 295 L 1068 297 L 1065 297 L 1064 298 L 1061 298 L 1060 299 L 1041 299 L 1040 298 L 1037 298 L 1036 297 L 1031 296 L 1028 294 L 1026 294 L 1024 292 L 1020 290 L 1010 280 L 1008 275 L 1006 273 L 1005 271 L 1005 268 L 1004 267 L 1004 264 L 1003 263 L 1003 248 L 1004 247 L 1005 238 L 1008 233 L 1008 231 L 1010 227 L 1012 225 L 1013 222 L 1018 216 L 1018 215 L 1030 203 L 1031 203 L 1044 194 L 1046 194 L 1053 190 L 1056 190 L 1057 189 L 1060 189 L 1061 188 L 1064 188 L 1065 187 L 1071 187 L 1072 186 L 1076 186 L 1077 187 L 1083 187 L 1084 188 L 1087 188 L 1088 189 L 1090 189 L 1091 190 L 1096 191 L 1100 194 L 1103 195 L 1106 198 L 1107 198 L 1109 200 L 1109 201 L 1114 206 L 1114 207 L 1116 209 L 1118 213 L 1118 216 L 1120 220 L 1120 225 L 1116 227 L 1111 227 L 1110 228 L 1103 228 L 1102 229 L 1097 229 L 1096 230 L 1091 230 L 1090 231 L 1086 231 L 1085 232 L 1077 232 L 1076 233 L 1072 233 L 1071 234 L 1066 234 L 1065 235 L 1061 235 L 1060 236 L 1053 236 L 1052 237 L 1047 237 L 1047 240 L 1046 241 L 1046 243 L 1045 244 L 1045 247 L 1044 248 L 1044 250 L 1043 251 L 1043 254 L 1042 255 L 1042 260 L 1041 261 L 1041 263 L 1044 263 L 1045 262 L 1050 262 L 1051 261 L 1058 261 L 1059 260 L 1063 260 L 1064 259 L 1068 259 L 1069 258 L 1073 258 L 1074 257 L 1080 257 L 1081 256 L 1086 256 L 1087 255 L 1092 255 L 1093 254 L 1097 254 L 1098 253 L 1103 253 L 1104 252 L 1111 252 L 1112 251 L 1116 251 L 1117 250 L 1121 250 L 1122 249 L 1126 249 L 1127 248 L 1133 248 L 1134 247 L 1139 247 L 1140 246 L 1144 246 L 1146 243 L 1146 240 L 1147 239 L 1147 231 L 1148 230 L 1148 220 L 1147 219 L 1147 211 L 1146 210 L 1146 207 L 1144 204 L 1144 202 L 1143 201 L 1143 199 L 1141 195 L 1139 193 L 1138 190 L 1134 186 L 1133 183 L 1132 183 L 1129 180 Z
M 1779 171 L 1767 165 L 1765 165 L 1764 164 L 1762 164 L 1758 162 L 1755 162 L 1754 161 L 1747 161 L 1746 160 L 1729 160 L 1728 161 L 1722 161 L 1721 162 L 1718 162 L 1717 163 L 1715 163 L 1711 165 L 1707 165 L 1687 175 L 1685 177 L 1681 179 L 1672 187 L 1671 187 L 1661 197 L 1661 198 L 1657 202 L 1657 203 L 1652 209 L 1651 212 L 1649 214 L 1644 224 L 1643 229 L 1640 235 L 1640 238 L 1639 239 L 1639 244 L 1638 245 L 1638 250 L 1637 251 L 1637 267 L 1638 268 L 1638 273 L 1639 274 L 1639 278 L 1640 279 L 1640 282 L 1648 298 L 1652 302 L 1652 303 L 1655 306 L 1657 307 L 1657 308 L 1659 310 L 1660 310 L 1663 313 L 1669 316 L 1671 318 L 1673 319 L 1675 319 L 1676 320 L 1678 320 L 1684 323 L 1688 323 L 1689 324 L 1696 324 L 1697 325 L 1715 325 L 1716 324 L 1723 324 L 1724 323 L 1728 323 L 1729 322 L 1732 322 L 1738 319 L 1741 319 L 1748 315 L 1750 315 L 1754 313 L 1758 310 L 1759 311 L 1760 309 L 1761 309 L 1764 306 L 1765 306 L 1771 301 L 1772 301 L 1778 295 L 1761 278 L 1760 278 L 1756 282 L 1755 282 L 1751 286 L 1750 286 L 1745 290 L 1737 294 L 1732 295 L 1729 297 L 1726 297 L 1725 298 L 1721 298 L 1720 299 L 1703 299 L 1702 298 L 1698 298 L 1697 297 L 1692 296 L 1684 292 L 1682 290 L 1681 290 L 1673 282 L 1671 278 L 1668 275 L 1668 273 L 1667 272 L 1667 270 L 1666 269 L 1666 267 L 1664 263 L 1664 246 L 1665 245 L 1665 242 L 1666 241 L 1666 239 L 1668 235 L 1668 232 L 1670 228 L 1672 226 L 1673 224 L 1673 222 L 1680 214 L 1680 213 L 1690 203 L 1691 203 L 1694 200 L 1695 200 L 1700 196 L 1712 190 L 1715 190 L 1716 189 L 1718 189 L 1722 187 L 1725 187 L 1726 186 L 1744 186 L 1745 187 L 1747 187 L 1748 188 L 1750 188 L 1751 189 L 1756 190 L 1758 191 L 1761 194 L 1764 195 L 1773 204 L 1773 205 L 1777 210 L 1777 212 L 1778 213 L 1778 215 L 1780 219 L 1780 223 L 1781 225 L 1780 226 L 1775 226 L 1774 227 L 1768 227 L 1767 228 L 1759 228 L 1758 229 L 1753 229 L 1752 230 L 1747 230 L 1746 231 L 1742 231 L 1741 232 L 1733 232 L 1732 233 L 1727 233 L 1726 234 L 1722 234 L 1721 235 L 1717 235 L 1716 236 L 1709 236 L 1707 238 L 1707 241 L 1706 242 L 1706 246 L 1705 247 L 1705 250 L 1703 254 L 1703 258 L 1702 259 L 1702 262 L 1706 262 L 1707 261 L 1714 261 L 1715 260 L 1724 259 L 1725 258 L 1728 258 L 1729 257 L 1735 257 L 1736 256 L 1742 256 L 1743 255 L 1747 255 L 1748 254 L 1752 254 L 1753 253 L 1757 253 L 1758 252 L 1765 252 L 1766 251 L 1771 251 L 1772 250 L 1776 250 L 1777 249 L 1781 249 L 1782 248 L 1789 248 L 1790 247 L 1794 247 L 1795 246 L 1804 245 L 1805 243 L 1805 240 L 1806 239 L 1807 240 L 1807 243 L 1809 244 L 1809 241 L 1808 241 L 1806 238 L 1806 232 L 1807 231 L 1807 217 L 1806 216 L 1806 210 L 1805 209 L 1805 206 L 1802 200 L 1802 198 L 1800 194 L 1798 192 L 1797 189 L 1790 181 L 1790 180 L 1788 179 Z
M 714 187 L 712 189 L 712 190 L 708 193 L 708 194 L 704 198 L 704 199 L 700 203 L 700 204 L 695 210 L 695 212 L 693 214 L 690 220 L 690 222 L 686 229 L 686 233 L 684 237 L 684 240 L 683 241 L 683 245 L 682 246 L 682 268 L 683 269 L 683 273 L 684 274 L 684 276 L 686 280 L 686 283 L 692 295 L 699 303 L 699 304 L 701 306 L 702 306 L 704 308 L 704 309 L 707 310 L 711 314 L 716 316 L 718 318 L 720 319 L 722 319 L 725 321 L 730 322 L 731 323 L 734 323 L 735 324 L 740 324 L 741 325 L 749 325 L 750 326 L 759 326 L 760 325 L 767 325 L 768 324 L 775 324 L 776 323 L 780 323 L 788 319 L 791 319 L 792 318 L 794 318 L 798 315 L 800 315 L 810 309 L 812 310 L 812 313 L 811 314 L 811 319 L 810 320 L 809 325 L 836 325 L 839 319 L 839 316 L 840 315 L 840 310 L 841 309 L 841 307 L 842 306 L 842 303 L 844 299 L 844 295 L 845 294 L 846 287 L 847 286 L 847 284 L 849 280 L 849 275 L 850 274 L 850 271 L 851 270 L 851 268 L 853 264 L 854 255 L 855 254 L 855 252 L 856 251 L 856 248 L 857 247 L 857 244 L 858 243 L 858 217 L 857 216 L 857 212 L 854 206 L 853 201 L 851 197 L 849 195 L 849 193 L 846 190 L 844 186 L 835 177 L 834 177 L 831 174 L 830 174 L 825 170 L 823 170 L 814 165 L 811 165 L 808 163 L 805 163 L 804 162 L 800 162 L 799 161 L 793 161 L 792 160 L 773 160 L 772 161 L 765 161 L 764 162 L 757 163 L 753 165 L 750 165 L 743 169 L 741 169 L 735 172 L 733 174 L 730 175 L 728 177 L 724 179 L 715 187 Z
M 806 192 L 808 194 L 811 195 L 815 199 L 816 199 L 822 206 L 822 207 L 824 209 L 827 215 L 827 217 L 829 221 L 829 226 L 830 227 L 830 240 L 829 241 L 829 246 L 828 247 L 828 250 L 827 251 L 827 253 L 825 256 L 825 258 L 823 262 L 821 264 L 820 267 L 817 270 L 817 271 L 808 281 L 807 281 L 803 285 L 799 287 L 796 290 L 794 290 L 788 294 L 786 294 L 785 295 L 783 295 L 782 296 L 780 296 L 776 298 L 773 298 L 772 299 L 748 299 L 747 298 L 744 298 L 743 297 L 738 296 L 735 294 L 733 294 L 731 292 L 727 290 L 717 280 L 717 279 L 715 277 L 712 271 L 712 269 L 710 265 L 710 262 L 709 261 L 709 245 L 710 244 L 710 240 L 711 239 L 711 237 L 712 236 L 713 231 L 717 223 L 719 221 L 720 218 L 724 214 L 724 213 L 734 203 L 735 203 L 739 199 L 742 198 L 744 196 L 756 190 L 758 190 L 762 188 L 765 188 L 766 187 L 769 187 L 770 186 L 788 186 L 789 187 L 792 187 L 796 189 L 799 189 L 800 190 L 802 190 Z
M 1192 121 L 1190 122 L 1190 124 L 1189 125 L 1189 129 L 1188 130 L 1188 132 L 1186 136 L 1186 139 L 1185 140 L 1184 147 L 1183 148 L 1183 150 L 1181 154 L 1181 157 L 1180 158 L 1180 162 L 1179 163 L 1179 165 L 1178 166 L 1178 168 L 1176 172 L 1176 176 L 1175 177 L 1175 179 L 1173 183 L 1173 186 L 1172 187 L 1171 194 L 1170 195 L 1170 197 L 1168 201 L 1168 204 L 1167 205 L 1167 209 L 1166 210 L 1166 212 L 1164 216 L 1164 219 L 1163 220 L 1162 227 L 1160 231 L 1160 234 L 1159 235 L 1158 242 L 1157 243 L 1157 245 L 1155 249 L 1155 252 L 1154 253 L 1154 259 L 1153 260 L 1153 276 L 1154 277 L 1154 282 L 1155 283 L 1155 286 L 1158 292 L 1158 294 L 1161 298 L 1162 301 L 1173 313 L 1174 313 L 1182 319 L 1184 319 L 1189 322 L 1191 322 L 1195 324 L 1199 324 L 1200 325 L 1236 325 L 1236 323 L 1237 322 L 1237 319 L 1238 318 L 1238 315 L 1239 314 L 1239 311 L 1240 310 L 1240 307 L 1241 306 L 1241 303 L 1242 302 L 1242 300 L 1241 299 L 1209 299 L 1208 298 L 1205 298 L 1195 293 L 1187 285 L 1186 282 L 1183 278 L 1183 275 L 1182 274 L 1182 271 L 1181 270 L 1181 257 L 1182 256 L 1182 253 L 1183 252 L 1183 248 L 1184 247 L 1184 245 L 1186 241 L 1186 238 L 1187 237 L 1187 233 L 1188 232 L 1188 230 L 1189 229 L 1189 227 L 1191 223 L 1191 220 L 1192 219 L 1192 215 L 1193 214 L 1193 211 L 1195 207 L 1195 204 L 1196 203 L 1196 199 L 1197 198 L 1197 195 L 1198 194 L 1198 192 L 1200 190 L 1278 190 L 1279 189 L 1279 187 L 1281 183 L 1281 180 L 1282 179 L 1282 177 L 1283 176 L 1283 174 L 1285 170 L 1285 166 L 1286 165 L 1285 164 L 1269 164 L 1268 165 L 1239 165 L 1238 164 L 1221 164 L 1220 165 L 1210 165 L 1209 164 L 1207 164 L 1206 163 L 1207 162 L 1207 159 L 1209 155 L 1209 152 L 1210 151 L 1210 147 L 1211 146 L 1211 144 L 1213 140 L 1214 133 L 1216 129 L 1217 122 L 1216 121 Z
M 997 121 L 978 121 L 977 122 L 960 122 L 959 123 L 952 124 L 948 126 L 945 126 L 938 130 L 936 130 L 931 134 L 928 135 L 925 138 L 922 139 L 917 144 L 916 144 L 907 153 L 907 154 L 903 158 L 903 159 L 897 166 L 888 184 L 888 186 L 886 190 L 886 193 L 884 197 L 884 200 L 882 204 L 882 209 L 881 210 L 881 213 L 880 214 L 880 216 L 878 220 L 878 224 L 877 225 L 876 232 L 875 233 L 875 235 L 873 239 L 873 244 L 871 248 L 871 251 L 869 255 L 869 259 L 868 260 L 868 263 L 867 264 L 867 266 L 866 267 L 866 270 L 864 274 L 864 279 L 863 280 L 863 282 L 862 283 L 862 285 L 860 289 L 860 294 L 859 295 L 859 298 L 857 301 L 857 304 L 856 305 L 856 308 L 855 309 L 855 313 L 854 314 L 854 316 L 853 317 L 853 320 L 851 324 L 852 325 L 878 325 L 879 324 L 879 322 L 880 321 L 880 317 L 881 316 L 881 314 L 883 310 L 883 307 L 884 306 L 885 299 L 887 295 L 887 292 L 888 291 L 889 284 L 891 280 L 891 277 L 892 276 L 892 273 L 893 272 L 894 265 L 896 261 L 896 258 L 897 257 L 897 254 L 898 253 L 898 249 L 899 248 L 899 246 L 901 242 L 901 239 L 902 238 L 903 231 L 905 227 L 905 224 L 906 223 L 906 219 L 907 218 L 908 211 L 910 207 L 910 204 L 911 203 L 911 199 L 912 198 L 912 196 L 914 194 L 980 194 L 982 192 L 982 188 L 983 187 L 984 180 L 986 176 L 986 173 L 988 172 L 987 170 L 987 168 L 930 168 L 929 167 L 937 159 L 938 159 L 941 156 L 942 156 L 944 154 L 946 154 L 948 152 L 952 150 L 955 150 L 956 149 L 959 149 L 960 148 L 964 148 L 965 147 L 992 147 L 993 146 L 993 144 L 995 140 L 995 136 L 996 135 L 996 130 L 998 126 L 998 122 Z
M 1844 120 L 1842 124 L 1842 127 L 1841 128 L 1841 131 L 1840 132 L 1840 136 L 1839 137 L 1839 140 L 1838 141 L 1838 144 L 1837 145 L 1837 149 L 1835 153 L 1835 157 L 1834 158 L 1834 161 L 1832 165 L 1832 168 L 1831 169 L 1831 173 L 1830 174 L 1830 177 L 1828 181 L 1828 184 L 1827 185 L 1827 188 L 1826 189 L 1826 193 L 1824 197 L 1824 200 L 1823 201 L 1823 204 L 1822 205 L 1822 209 L 1821 210 L 1821 213 L 1820 214 L 1820 216 L 1819 217 L 1819 220 L 1818 221 L 1818 224 L 1817 225 L 1817 230 L 1815 234 L 1815 237 L 1813 241 L 1813 245 L 1812 246 L 1812 249 L 1811 250 L 1811 253 L 1810 254 L 1810 259 L 1809 260 L 1809 275 L 1810 276 L 1810 280 L 1811 281 L 1811 284 L 1812 285 L 1812 287 L 1813 288 L 1814 293 L 1817 297 L 1818 300 L 1821 303 L 1821 304 L 1831 314 L 1834 315 L 1839 319 L 1841 319 L 1849 323 L 1852 323 L 1853 324 L 1858 324 L 1859 325 L 1890 325 L 1891 324 L 1891 321 L 1892 320 L 1892 317 L 1893 316 L 1893 313 L 1894 312 L 1894 309 L 1895 308 L 1896 299 L 1865 299 L 1864 298 L 1861 298 L 1854 294 L 1852 294 L 1848 290 L 1847 290 L 1846 288 L 1842 284 L 1841 281 L 1839 279 L 1837 275 L 1837 270 L 1836 269 L 1836 258 L 1837 257 L 1837 250 L 1838 249 L 1838 246 L 1840 242 L 1840 239 L 1841 238 L 1841 235 L 1842 234 L 1842 230 L 1844 226 L 1844 223 L 1845 222 L 1845 219 L 1846 218 L 1846 214 L 1847 213 L 1847 210 L 1848 209 L 1848 207 L 1849 206 L 1849 203 L 1850 202 L 1850 199 L 1851 198 L 1851 193 L 1853 189 L 1924 189 L 1925 188 L 1925 185 L 1926 184 L 1926 180 L 1927 179 L 1927 176 L 1928 175 L 1928 172 L 1929 171 L 1930 164 L 1929 163 L 1860 163 L 1859 162 L 1860 161 L 1861 154 L 1862 153 L 1862 151 L 1863 150 L 1863 147 L 1864 146 L 1864 141 L 1865 140 L 1865 138 L 1866 137 L 1866 134 L 1868 130 L 1868 126 L 1869 125 L 1869 120 Z
M 675 120 L 575 120 L 574 121 L 567 121 L 566 122 L 563 122 L 562 123 L 559 123 L 558 124 L 556 124 L 555 125 L 550 126 L 538 132 L 536 134 L 532 136 L 528 140 L 527 140 L 526 142 L 522 145 L 522 146 L 518 150 L 516 154 L 513 157 L 513 159 L 508 168 L 508 173 L 507 174 L 507 177 L 506 178 L 506 194 L 507 195 L 508 202 L 510 205 L 510 207 L 512 209 L 514 214 L 517 217 L 517 218 L 520 221 L 521 221 L 522 223 L 523 223 L 529 228 L 533 230 L 535 230 L 538 232 L 543 233 L 544 234 L 551 234 L 552 235 L 615 235 L 616 234 L 618 234 L 619 235 L 624 235 L 625 236 L 627 236 L 635 240 L 641 247 L 643 251 L 643 253 L 644 254 L 644 267 L 643 268 L 643 271 L 642 272 L 642 274 L 641 276 L 639 278 L 637 282 L 630 289 L 629 289 L 627 291 L 626 291 L 622 294 L 620 294 L 616 296 L 613 296 L 612 297 L 487 297 L 485 299 L 485 302 L 483 306 L 483 310 L 482 311 L 482 314 L 481 315 L 481 319 L 480 320 L 480 325 L 607 325 L 608 324 L 614 324 L 615 323 L 619 323 L 627 319 L 630 319 L 634 317 L 636 315 L 638 315 L 640 313 L 641 313 L 649 306 L 650 306 L 653 303 L 654 301 L 655 301 L 655 300 L 662 292 L 662 290 L 664 288 L 667 282 L 667 280 L 668 279 L 668 277 L 670 273 L 670 270 L 671 269 L 671 248 L 670 247 L 670 244 L 669 243 L 668 238 L 665 232 L 662 229 L 661 226 L 655 220 L 654 220 L 648 215 L 640 211 L 638 211 L 637 210 L 633 210 L 632 209 L 627 209 L 626 208 L 553 208 L 552 207 L 550 207 L 544 204 L 537 197 L 535 193 L 534 188 L 533 187 L 533 180 L 534 179 L 534 176 L 537 170 L 537 168 L 539 166 L 539 165 L 549 155 L 554 153 L 558 150 L 561 150 L 562 149 L 565 149 L 566 148 L 570 148 L 571 147 L 670 147 L 671 146 L 671 141 L 672 140 L 672 137 L 674 133 L 674 129 L 675 128 L 675 124 L 676 123 L 676 121 Z
M 333 132 L 331 134 L 328 135 L 326 137 L 321 139 L 311 148 L 310 148 L 296 163 L 296 164 L 290 172 L 288 177 L 286 179 L 286 181 L 282 188 L 281 193 L 279 196 L 279 198 L 277 202 L 277 206 L 276 207 L 276 212 L 275 213 L 275 220 L 274 221 L 274 237 L 275 238 L 275 244 L 276 245 L 277 254 L 278 255 L 279 260 L 281 263 L 282 268 L 286 276 L 288 278 L 289 281 L 294 287 L 294 288 L 305 300 L 306 300 L 311 305 L 315 307 L 318 310 L 320 310 L 323 313 L 327 315 L 329 315 L 336 319 L 339 319 L 340 320 L 342 320 L 343 321 L 345 321 L 349 323 L 353 323 L 354 324 L 363 324 L 364 325 L 434 325 L 435 324 L 435 319 L 436 318 L 436 309 L 437 308 L 437 301 L 438 300 L 438 298 L 437 297 L 364 297 L 363 296 L 354 295 L 348 292 L 346 292 L 340 289 L 338 287 L 335 286 L 332 283 L 331 283 L 322 275 L 322 274 L 315 266 L 312 260 L 310 258 L 310 256 L 306 249 L 306 245 L 305 244 L 305 241 L 304 240 L 304 237 L 303 236 L 303 216 L 304 215 L 304 211 L 305 210 L 306 203 L 315 185 L 317 183 L 319 179 L 324 174 L 324 173 L 326 172 L 329 168 L 330 168 L 334 164 L 337 163 L 340 160 L 345 158 L 347 156 L 351 154 L 356 153 L 359 151 L 361 151 L 362 150 L 367 150 L 368 149 L 373 149 L 374 148 L 445 148 L 447 144 L 447 136 L 448 135 L 448 124 L 449 122 L 447 120 L 378 120 L 377 121 L 367 121 L 366 122 L 362 122 L 361 123 L 358 123 L 357 124 L 350 125 L 342 129 L 340 129 L 337 131 L 335 131 Z
M 181 132 L 179 134 L 174 136 L 172 138 L 168 140 L 165 143 L 164 143 L 159 148 L 158 148 L 156 150 L 156 151 L 154 152 L 152 154 L 152 155 L 147 160 L 147 161 L 143 165 L 143 166 L 139 171 L 138 174 L 136 176 L 130 188 L 130 190 L 129 191 L 129 193 L 128 194 L 128 196 L 126 200 L 126 203 L 125 204 L 125 208 L 124 209 L 124 213 L 123 214 L 123 222 L 122 223 L 122 232 L 123 233 L 123 241 L 124 242 L 124 246 L 125 247 L 125 252 L 126 253 L 126 256 L 129 262 L 130 267 L 135 277 L 137 279 L 138 282 L 144 289 L 144 290 L 156 302 L 157 302 L 160 305 L 164 307 L 167 310 L 167 311 L 169 310 L 174 314 L 176 315 L 178 315 L 185 319 L 188 319 L 189 320 L 191 320 L 195 322 L 198 322 L 199 323 L 204 323 L 205 324 L 214 324 L 215 325 L 286 325 L 287 324 L 287 319 L 288 318 L 288 302 L 289 301 L 289 298 L 288 297 L 214 297 L 213 296 L 208 296 L 207 295 L 200 294 L 195 291 L 193 291 L 189 289 L 187 287 L 184 286 L 178 281 L 177 281 L 168 272 L 168 271 L 164 267 L 163 264 L 159 259 L 159 257 L 155 250 L 155 248 L 154 247 L 154 243 L 152 239 L 152 233 L 151 232 L 151 221 L 152 220 L 152 214 L 153 213 L 153 210 L 154 209 L 154 205 L 157 199 L 157 197 L 159 194 L 159 192 L 163 187 L 163 185 L 167 181 L 168 178 L 170 177 L 171 175 L 184 163 L 185 163 L 190 159 L 200 154 L 202 154 L 205 152 L 207 152 L 210 150 L 215 150 L 216 149 L 222 149 L 223 148 L 295 148 L 296 147 L 296 140 L 297 139 L 297 128 L 298 127 L 298 121 L 297 120 L 227 120 L 226 121 L 215 121 L 214 122 L 209 122 L 208 123 L 205 123 L 201 125 L 198 125 L 197 126 L 192 127 L 185 131 L 183 131 Z
M 1506 121 L 1499 127 L 1497 131 L 1497 138 L 1496 139 L 1496 143 L 1495 144 L 1495 147 L 1494 148 L 1494 151 L 1493 152 L 1493 155 L 1492 156 L 1491 163 L 1489 167 L 1489 170 L 1488 171 L 1488 175 L 1487 176 L 1487 179 L 1485 183 L 1485 186 L 1484 187 L 1484 190 L 1483 191 L 1483 195 L 1482 196 L 1482 199 L 1481 200 L 1481 202 L 1480 203 L 1480 206 L 1479 207 L 1479 212 L 1478 213 L 1478 216 L 1476 220 L 1476 223 L 1475 224 L 1475 227 L 1474 228 L 1474 232 L 1473 233 L 1472 240 L 1470 244 L 1470 249 L 1469 250 L 1468 257 L 1466 261 L 1466 265 L 1465 266 L 1465 270 L 1464 271 L 1464 274 L 1463 275 L 1463 277 L 1462 278 L 1462 281 L 1461 282 L 1461 287 L 1460 288 L 1460 290 L 1459 291 L 1459 294 L 1457 298 L 1456 307 L 1455 308 L 1455 311 L 1454 312 L 1454 314 L 1453 315 L 1453 318 L 1452 319 L 1452 325 L 1478 325 L 1479 324 L 1479 321 L 1481 317 L 1481 312 L 1482 311 L 1482 308 L 1483 307 L 1483 304 L 1484 303 L 1484 300 L 1485 299 L 1485 296 L 1486 295 L 1486 290 L 1488 286 L 1488 283 L 1489 282 L 1489 279 L 1490 278 L 1490 274 L 1491 273 L 1491 270 L 1492 269 L 1492 267 L 1493 266 L 1493 263 L 1494 262 L 1495 253 L 1496 252 L 1496 249 L 1497 248 L 1497 245 L 1498 244 L 1498 241 L 1499 240 L 1499 235 L 1500 234 L 1500 232 L 1502 228 L 1502 225 L 1503 224 L 1503 220 L 1504 219 L 1504 216 L 1506 212 L 1506 209 L 1507 208 L 1507 205 L 1508 204 L 1508 199 L 1509 198 L 1509 195 L 1511 191 L 1511 188 L 1512 187 L 1512 183 L 1513 182 L 1513 179 L 1515 175 L 1516 168 L 1517 167 L 1519 169 L 1519 171 L 1520 172 L 1521 170 L 1521 167 L 1519 165 L 1518 167 L 1517 166 L 1518 159 L 1520 156 L 1522 159 L 1522 162 L 1523 163 L 1524 170 L 1525 171 L 1525 173 L 1527 177 L 1527 180 L 1528 181 L 1528 183 L 1530 187 L 1530 190 L 1532 194 L 1532 197 L 1533 198 L 1533 200 L 1534 201 L 1534 203 L 1536 207 L 1536 211 L 1537 212 L 1537 215 L 1538 216 L 1538 218 L 1539 219 L 1539 221 L 1541 225 L 1541 229 L 1542 230 L 1542 232 L 1543 233 L 1543 235 L 1545 239 L 1546 246 L 1547 247 L 1547 249 L 1548 250 L 1548 252 L 1550 256 L 1550 261 L 1551 262 L 1551 264 L 1552 265 L 1552 267 L 1554 271 L 1555 278 L 1556 279 L 1556 281 L 1558 285 L 1558 288 L 1559 289 L 1560 296 L 1561 297 L 1561 299 L 1563 303 L 1563 307 L 1564 308 L 1564 310 L 1566 314 L 1568 316 L 1568 317 L 1570 319 L 1571 319 L 1573 321 L 1577 323 L 1579 323 L 1580 324 L 1595 324 L 1596 323 L 1598 323 L 1606 318 L 1610 310 L 1610 306 L 1612 302 L 1612 299 L 1613 298 L 1613 296 L 1614 295 L 1614 292 L 1615 291 L 1615 287 L 1616 286 L 1616 284 L 1617 283 L 1617 280 L 1619 276 L 1619 272 L 1620 271 L 1620 269 L 1621 268 L 1621 265 L 1623 261 L 1623 258 L 1624 257 L 1624 253 L 1625 252 L 1625 250 L 1627 246 L 1627 243 L 1628 242 L 1628 238 L 1629 237 L 1629 235 L 1631 231 L 1631 228 L 1632 227 L 1632 223 L 1633 222 L 1633 220 L 1634 219 L 1634 216 L 1635 215 L 1635 213 L 1637 209 L 1637 205 L 1638 204 L 1638 202 L 1639 201 L 1639 198 L 1641 194 L 1641 190 L 1642 189 L 1642 186 L 1643 185 L 1643 183 L 1645 179 L 1646 172 L 1647 171 L 1647 169 L 1648 168 L 1648 165 L 1650 161 L 1650 157 L 1651 156 L 1651 154 L 1652 153 L 1652 151 L 1654 147 L 1654 144 L 1655 143 L 1655 139 L 1656 138 L 1656 136 L 1657 135 L 1657 133 L 1659 129 L 1659 125 L 1661 122 L 1661 120 L 1660 119 L 1635 119 L 1632 123 L 1632 125 L 1631 126 L 1631 129 L 1630 130 L 1630 134 L 1629 135 L 1629 137 L 1627 141 L 1627 144 L 1626 145 L 1626 149 L 1625 150 L 1625 152 L 1624 153 L 1624 155 L 1622 159 L 1622 162 L 1621 163 L 1621 167 L 1620 168 L 1620 170 L 1618 174 L 1618 177 L 1617 178 L 1617 182 L 1616 183 L 1616 185 L 1614 189 L 1614 192 L 1612 196 L 1612 200 L 1611 201 L 1611 203 L 1610 204 L 1610 207 L 1608 211 L 1608 215 L 1606 219 L 1606 222 L 1604 226 L 1604 229 L 1603 230 L 1602 237 L 1600 241 L 1600 244 L 1599 245 L 1599 249 L 1598 250 L 1598 253 L 1597 254 L 1597 256 L 1595 260 L 1595 264 L 1594 265 L 1594 268 L 1592 272 L 1592 275 L 1590 278 L 1588 274 L 1587 274 L 1587 277 L 1590 281 L 1590 284 L 1588 288 L 1586 287 L 1586 285 L 1585 284 L 1585 281 L 1583 277 L 1583 273 L 1582 272 L 1582 270 L 1581 269 L 1581 267 L 1579 263 L 1579 260 L 1578 259 L 1578 256 L 1577 255 L 1577 253 L 1575 249 L 1575 246 L 1574 245 L 1573 238 L 1572 237 L 1572 235 L 1570 231 L 1569 224 L 1568 223 L 1568 221 L 1566 217 L 1565 210 L 1564 209 L 1564 207 L 1562 203 L 1562 200 L 1561 199 L 1560 192 L 1559 191 L 1559 189 L 1557 185 L 1557 182 L 1556 181 L 1556 179 L 1555 178 L 1555 176 L 1553 172 L 1552 165 L 1550 161 L 1550 158 L 1548 154 L 1548 151 L 1547 150 L 1547 147 L 1545 143 L 1545 140 L 1544 139 L 1543 134 L 1541 130 L 1534 123 L 1530 121 L 1528 121 L 1524 119 L 1513 119 L 1512 120 L 1509 120 L 1508 121 Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>
</a></h1>
      </div>
      <nav class="sidenav" aria-label="Sections">
        <a href="#overview" data-nav="overview" title="Overview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="16" width="7" height="5" rx="1.5"></rect></svg><span class="sr-only-collapse">Overview</span></a>
        <a href="#activity" data-nav="activity" title="Activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"></path></svg><span class="sr-only-collapse">Activity</span></a>
        <a href="#policy" data-nav="policy" title="Policy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"></path></svg><span class="sr-only-collapse">Policy</span></a>
        <a href="#rules" data-nav="rules" title="Rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4"></path><path d="M9 12h6M9 16h4"></path></svg><span class="sr-only-collapse">Rules</span></a>
        <a href="#integrations" data-nav="integrations" title="Integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"></path></svg><span class="sr-only-collapse">Integrations</span></a>
        <a href="#settings" data-nav="settings" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"></path><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle></svg><span class="sr-only-collapse">Settings</span></a>
      </nav>
      <div class="sidebar-foot">
        <div class="sidebar-links">
          <a href="https://local/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
          <a href="https://local/cc-safety-net/docs" target="_blank" rel="noopener">Documentation</a>
        </div>
      </div>
    </aside>
    <div class="content">
      <header class="topbar" id="topbar">
        <div class="topbar-row">
          <h2 class="topbar-title" id="topbar-title">Overview</h2>
          <label class="view-search topbar-search" data-search-view="activity" hidden>
            <span class="sr-only">Filter activity</span>
            <input type="search" id="activity-search" autocomplete="off" placeholder="Filter by rule or command">
          </label>
          <label class="view-search topbar-search" data-search-view="policy" hidden>
            <span class="sr-only">Search all protections</span>
            <input type="search" id="policy-search" autocomplete="off" placeholder="Filter by name, category, or rule ID">
          </label>
          <div class="topbar-actions">
            <div class="app-status" id="app-status" role="status" aria-live="polite">Loading...</div>
            <button type="button" class="dirty-chip" id="dirty-chip" hidden>Unsaved policy changes · Review</button>
          </div>
        </div>
      </header>
      <main>
        <div class="protection-banner" id="protection-banner" role="alert" hidden></div>
        <div class="status" id="status" role="status" aria-live="polite"></div>

        <section class="view" data-view="overview">
          <div class="view-head">
            <p class="panel-sub muted">What CC Safety Net has been doing on this machine.</p>
          </div>
          <div class="status health-strip" id="health-strip" hidden></div>
          <p class="tiles-window" id="overview-window"></p>
          <div class="tiles" id="overview-tiles"></div>
          <div class="star-row" id="star-row" hidden>
            <p class="star-pitch"><span id="star-pitch-text"></span> <span class="star-mechanism" id="star-mechanism" hidden>One click via your GitHub CLI. No redirect.</span></p>
            <span id="star-slot"></span>
          </div>
          <section class="panel" id="protection-card" hidden></section>
          <div class="dual-panels">
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked commands</h2>
                </div>
              </div>
              <div id="top-commands"></div>
            </section>
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked rules</h2>
                </div>
              </div>
              <div id="top-rules"></div>
            </section>
          </div>
          <button type="button" class="guard-errors" id="guard-errors" hidden></button>
        </section>

        <section class="view" data-view="activity" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Audited commands from the local log, newest first. Commands are secret-redacted at write time.</p>
          </div>
          <section class="panel">
            <div class="activity-controls">
              <div class="activity-controls-row">
                <label class="activity-days"><span>Window</span>
                  <select id="activity-days"></select>
                </label>
                <button type="button" class="icon-button activity-refresh" id="activity-refresh" aria-label="Refresh activity" title="Refresh activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
              </div>
              <div class="chip-row" id="activity-decision" role="group" aria-label="Filter by decision"></div>
              <div class="chip-row" id="activity-agents" role="group" aria-label="Filter by agent"></div>
              <div class="chip-row" id="activity-command-filter"></div>
            </div>
            <div id="activity-feed"></div>
            <p class="muted activity-count" id="activity-count"></p>
          </section>
        </section>

        <section class="view" data-view="policy" hidden>
          <div class="view-head view-head-actions">
            <p class="panel-sub muted">Choose what CC Safety Net blocks. Changes apply after you save.</p>
            <button type="button" id="project-draft-enter">Draft project policy</button>
          </div>
          <div class="project-draft-bar" id="project-draft-bar" hidden>
            <div class="project-draft-target">
              <strong>Project policy draft</strong>
              <code id="project-draft-path"></code>
              <p class="muted">Only the fields you mark are written here; everything else keeps inheriting from each member's own policy.</p>
            </div>
            <div class="savebar-actions">
              <button type="button" id="project-draft-change" hidden>Change…</button>
              <button type="button" id="project-draft-exit">Exit draft</button>
            </div>
          </div>
          <p class="status error" id="project-draft-diagnostics" hidden></p>
          <div class="policy-savebar" id="policy-savebar" hidden><span>Unsaved changes</span><div class="savebar-actions"><button type="button" id="discard-changes">Discard</button><button class="primary" id="save">Save</button></div></div>
          <div class="recovery" id="recovery" hidden>
            <div>
              <strong>Policy repair available</strong>
              <p class="muted">Repair writes canonical JSON by preserving valid settings. If the JSON cannot be parsed, defaults are restored.</p>
            </div>
            <button class="primary" id="repair" type="button">Repair</button>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2 id="tester-label">Test a command</h2>
                <p class="panel-sub muted">Paste a shell command to see whether it is blocked under your current unsaved edits. Custom rulebook rules are enforced here too.</p>
              </div>
            </div>
            <div class="tester-row">
              <input type="text" id="tester-input" autocomplete="off" spellcheck="false" placeholder="Paste a shell command and press Enter" aria-labelledby="tester-label">
              <button type="button" id="tester-run">Test</button>
            </div>
            <div id="tester-result" class="status" hidden></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Safety preset</h2>
                <p class="panel-sub muted">Choose inherited protection defaults, then customize only what this workspace needs.</p>
              </div>
            </div>
            <div id="safety-preset-status" class="preset-status"></div>
            <div id="environment-overrides" class="status" hidden></div>
            <div class="grid" id="safety-level"></div>
            <div class="field field-toggle">
              <button class="panel-toggle" type="button" aria-expanded="false" aria-controls="safety-overrides-content"><span class="panel-chevron" aria-hidden="true"></span><span>Advanced overrides</span></button>
            </div>
            <div class="foldable-field-content" id="safety-overrides-content" hidden>
              <p class="muted">Inherit from the selected level unless a capability needs an explicit exception.</p>
              <div class="grid" id="safety-overrides"></div>
            </div>
            <div class="field">
              <span>Workflow</span>
              <small>Workflow exceptions are separate from safety level.</small>
            </div>
            <div class="grid" id="workflow"></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Destructive Command Protection</h2>
                <p class="panel-sub muted" id="destructive-command-summary"></p>
              </div>
              <button type="button" id="reset-rule-customizations" class="panel-head-action">Restore defaults</button>
            </div>
            <div id="destructive-command"></div>
          </section>
          <section class="panel">
            <header class="panel-head">
              <div class="panel-title">
                <h2>Secret Protection</h2>
                <p class="panel-sub muted" id="secret-summary">Default sensitive paths and coding CLI credential locations can be disabled individually. Deny paths are blocked while Secret protection is on.</p>
              </div>
              <button type="button" id="reset-secret-customizations" class="panel-head-action">Restore defaults</button>
            </header>
            <div id="secret"></div>
          </section>
          <section class="panel">
            <div class="panel-head raw-json-head">
              <div class="panel-title">
                <h2>Policy JSON</h2>
                <p class="panel-sub muted" id="raw-source">Read-only mirror of the policy controls.</p>
              </div>
              <button class="icon-button" id="raw-copy" type="button" aria-label="Copy raw JSON to clipboard"></button>
            </div>
            <textarea id="raw" aria-label="Raw policy JSON" aria-describedby="raw-source" readonly></textarea>
          </section>
        </section>

        <section class="view" data-view="rules" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Custom rulebook rules enforced on this machine, and a prompt to hand rule authoring to your coding agent.</p>
          </div>
          <section class="panel" id="rules-composer-panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Create a rule</h2>
                <p class="panel-sub muted">CC Safety Net never writes rulebooks from here. Copy the prompt and paste it into your coding agent.</p>
              </div>
            </div>
            <div class="field">
              <span>Scope</span>
              <div class="chip-row" role="group" aria-label="Rule scope">
                <button type="button" class="chip" data-rules-scope="project" aria-pressed="true">Project</button>
                <button type="button" class="chip" data-rules-scope="user" aria-pressed="false">All projects</button>
              </div>
            </div>
            <div class="field" id="rules-project-path-field">
              <span id="rules-project-path-label">Project path</span>
              <div class="rules-path-row">
                <input type="text" id="rules-project-path" spellcheck="false" autocomplete="off" aria-labelledby="rules-project-path-label" aria-describedby="rules-project-path-hint">
                <button type="button" id="rules-choose-directory" hidden>Choose…</button>
              </div>
              <small id="rules-project-path-hint">Where the rulebook is written. Defaults to the directory this GUI was launched from.</small>
            </div>
            <div class="field">
              <span id="rules-composer-label">Request</span>
              <textarea id="rules-composer-input" spellcheck="false" placeholder="Describe the custom rules you want..." aria-labelledby="rules-composer-label" aria-describedby="rules-composer-hint"></textarea>
              <small id="rules-composer-hint">Rules match a command, its subcommand path, and exact arguments - not file paths or patterns.</small>
            </div>
            <div class="field">
              <span>Examples</span>
              <div class="chip-row">
                <button type="button" class="chip" data-rules-example="read my package.json and suggest blocking rules">Suggest rules</button>
                <button type="button" class="chip" data-rules-example="set up rules to block all terraform destroy commands">Block a command</button>
                <button type="button" class="chip" data-rules-example="verify my rules and fix any errors">Verify rules</button>
              </div>
            </div>
            <div class="rules-composer-actions">
              <button type="button" class="primary" id="rules-copy-prompt">Copy prompt</button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Rulebooks</h2>
                <p class="panel-sub muted">Read-only. Rules are shown as enforced, after overrides.</p>
              </div>
              <button type="button" class="icon-button rules-refresh" id="rules-refresh" aria-label="Refresh rules" title="Refresh rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="rules-list"><p class="empty">Loading rules…</p></div>
          </section>
          <section class="panel" id="rules-diagnostics-panel" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>Diagnostics</h2>
                <p class="panel-sub muted">Errors mean a rulebook was dropped and its rules are not enforced.</p>
              </div>
            </div>
            <div id="rules-diagnostics"></div>
          </section>
        </section>

        <section class="view" data-view="settings" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Appearance, file locations, and maintenance.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Appearance</h2>
                <p class="panel-sub muted">Theme preference is stored in this browser.</p>
              </div>
              <button type="button" id="theme-toggle"></button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Files</h2>
                <p class="panel-sub muted">Where CC Safety Net reads and writes on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>Policy file</span><code id="policy-path"></code></div>
              <div class="info-row" id="project-policy-row" hidden><span>Project policy</span><code id="project-policy-path"></code></div>
              <div class="info-row"><span>Audit logs</span><code id="logs-path"></code></div>
            </div>
            <p class="status" id="project-policy-notice" hidden></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Audit log retention</h2>
                <p class="panel-sub muted">How long decisions are kept before the sweep deletes them. Every analyzed command is recorded, so a long window grows the log.</p>
              </div>
            </div>
            <label class="retention-row">
              <span>Keep for</span>
              <input type="number" id="retention-days" min="1" max="365" step="1" inputmode="numeric" aria-describedby="retention-note">
              <span id="retention-unit">days</span>
            </label>
            <p class="muted retention-note" id="retention-note"></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Version</h2>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><code id="app-version"></code></div>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Danger zone</h2>
                <p class="panel-sub muted">Actions that discard saved configuration.</p>
              </div>
            </div>
            <div class="danger-row">
              <div>
                <strong>Reset policy</strong>
                <p class="muted">Restore the default policy JSON at the configured path.</p>
              </div>
              <button class="danger" id="reset">Reset</button>
            </div>
          </section>
        </section>

        <section class="view" data-view="integrations" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Install or remove the cc-safety-net hook for each coding agent on this machine.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Agents</h2>
                <p class="panel-sub muted">Detected CLIs and hook status.</p>
              </div>
              <button type="button" class="icon-button integrations-refresh" id="integrations-refresh" aria-label="Refresh integrations" title="Refresh integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="integrations-list"><p class="empty">Checking integrations…</p></div>
          </section>
          <section class="panel" id="integrations-system" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>System</h2>
                <p class="panel-sub muted">Runtime detected on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>cc-safety-net</span><code id="integrations-pkg-version"></code></div>
              <div class="info-row"><span>Node.js</span><code id="integrations-node-version"></code></div>
              <div class="info-row"><span>Platform</span><code id="integrations-platform"></code></div>
            </div>
          </section>
        </section>
      </main>
      <footer class="app-foot">
        <a href="https://local/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://local/cc-safety-net/docs" target="_blank" rel="noopener">Documentation</a>
      </footer>
    </div>
  </div>
  <div class="rule-example-popover" id="rule-example-popover" popover="auto" role="dialog" aria-labelledby="rule-example-title" aria-describedby="rule-example-command">
    <span class="rule-example-label" id="rule-example-label">Blocked command example</span>
    <strong id="rule-example-title"></strong>
    <code id="rule-example-command"></code>
  </div>
  <dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-body confirm-dialog-detail">
    <form method="dialog">
      <h2 id="confirm-dialog-title"></h2>
      <p class="muted" id="confirm-dialog-body"></p>
      <div class="dialog-rows" id="confirm-dialog-rows" hidden></div>
      <p class="dialog-detail"><code id="confirm-dialog-detail"></code></p>
      <div class="dialog-actions">
        <button type="submit" id="confirm-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="danger" id="confirm-dialog-confirm" value="confirm"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog report-dialog" id="report-dialog" aria-labelledby="report-dialog-title" aria-describedby="report-dialog-body">
    <form method="dialog">
      <h2 id="report-dialog-title">Report false positive</h2>
      <p class="muted" id="report-dialog-body">This opens a prefilled GitHub issue form — it is public, and nothing is submitted until you submit it there. Paths were replaced with <code>&lt;project&gt;</code> and <code>~</code>; edit anything else you would rather not publish.</p>
      <label class="report-field"><span>Blocked command</span><textarea id="report-command" spellcheck="false"></textarea></label>
      <label class="report-field"><span>Audit log entry</span><textarea id="report-entry" spellcheck="false"></textarea></label>
      <div class="dialog-actions">
        <button type="submit" id="report-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="primary" id="report-dialog-open" value="report">Open GitHub form</button>
      </div>
    </form>
  </dialog>
  <script id="ccsn-data" type="application/json"></script>
  <script>
// src/audit/display.ts
var formatRelativeTime = (value) => {
  const diff = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(diff))
    return "";
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0)
    return \`\${days}d ago\`;
  if (hours > 0)
    return \`\${hours}h ago\`;
  if (minutes > 0)
    return \`\${minutes}m ago\`;
  return "just now";
};
var commandSignature = (source) => {
  const tokens = (source ?? "").trim().split(/\\s+/).filter((token) => token && !/^[A-Za-z_][A-Za-z0-9_]*=/.test(token));
  const binary = tokens[0]?.split("/").pop();
  if (!binary)
    return null;
  const next = tokens[1];
  return next && /^[a-z][a-z0-9-]*$/.test(next) ? \`\${binary} \${next}\` : binary;
};
function findSuspectEntries(entries) {
  const signatureKey = (entry) => \`\${entry.sessionId}
\${commandSignature(entry.segment || entry.command)}\`;
  const denials = entries.filter((entry) => entry.decision !== "allow");
  const repeats = denials.filter((entry) => entry.sessionId).reduce((counts, entry) => counts.set(signatureKey(entry), (counts.get(signatureKey(entry)) ?? 0) + 1), new Map);
  return new Set(denials.filter((entry) => entry.failureStage || (repeats.get(signatureKey(entry)) ?? 0) >= 2));
}

// src/core/policy/audit-retention-days.ts
var DEFAULT_AUDIT_RETENTION_DAYS = 30;
var MIN_AUDIT_RETENTION_DAYS = 1;
var MAX_AUDIT_RETENTION_DAYS = 365;

// src/core/policy/safety-level.ts
var SAFETY_LEVEL_CAPABILITIES = {
  standard: { fail_closed: false, paranoid_rm: false, paranoid_interpreters: false },
  strict: { fail_closed: true, paranoid_rm: false, paranoid_interpreters: false },
  paranoid: { fail_closed: true, paranoid_rm: true, paranoid_interpreters: true }
};

// src/hosts/catalog.ts
var catalog = [
  {
    id: "opencode",
    displayName: "OpenCode",
    doctorOrder: 1,
    install: {
      order: 1,
      flag: "--opencode",
      artifactKind: "plugin",
      probeCommand: ["opencode", "--version"]
    }
  }
];
var doctorIntegrationOrder = catalog.slice().sort((a, b) => a.doctorOrder - b.doctorOrder).map((integration) => integration.id);
var installIntegrationMetadata = catalog.slice().sort((a, b) => a.install.order - b.install.order).map((integration) => ({ id: integration.id, ...integration.install })).map(({ order: _, ...integration }) => integration);
var integrationDisplayNames = Object.fromEntries(catalog.map((integration) => [integration.id, integration.displayName]));

// src/gui/frontend/project-draft.ts
var clonePolicy = (policy) => JSON.parse(JSON.stringify(policy));
var markedOverrides = (marked, section, overrides) => Object.fromEntries(Object.entries(overrides).filter(([key, value]) => value !== undefined && marked.has(\`\${section}.overrides.\${key}\`)));
var withOverrides = (overrides) => Object.keys(overrides).length > 0 ? { overrides } : {};
var collectProjectProposal = (marked, policy) => {
  const sections = {
    safety: {
      ...marked.has("safety.level") ? { level: policy.safety.level } : {},
      ...withOverrides(markedOverrides(marked, "safety", policy.safety.overrides))
    },
    workflow: marked.has("workflow.worktree_mode") ? { worktree_mode: policy.workflow.worktree_mode } : {},
    destructive_command_protection: {
      ...marked.has("destructive_command_protection.enabled") ? { enabled: policy.destructive_command_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "destructive_command_protection", policy.destructive_command_protection.overrides)),
      ...marked.has("destructive_command_protection.allow_paths") ? { allow_paths: policy.destructive_command_protection.allow_paths } : {}
    },
    secret_protection: {
      ...marked.has("secret_protection.enabled") ? { enabled: policy.secret_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "secret_protection", policy.secret_protection.overrides)),
      ...marked.has("secret_protection.deny_paths") ? { deny_paths: policy.secret_protection.deny_paths } : {},
      ...marked.has("secret_protection.allow_paths") ? { allow_paths: policy.secret_protection.allow_paths } : {}
    }
  };
  return {
    version: 1,
    ...Object.fromEntries(Object.entries(sections).filter(([, fields]) => Object.keys(fields).length > 0))
  };
};
var projectMarkedFields = (projection) => {
  const destructive = projection.destructive_command_protection ?? {};
  const secret = projection.secret_protection ?? {};
  return [
    ...projection.safety?.level === undefined ? [] : ["safety.level"],
    ...Object.keys(projection.safety?.overrides ?? {}).map((key) => \`safety.overrides.\${key}\`),
    ...projection.workflow?.worktree_mode === undefined ? [] : ["workflow.worktree_mode"],
    ...destructive.enabled === undefined ? [] : ["destructive_command_protection.enabled"],
    ...Object.keys(destructive.overrides ?? {}).map((id) => \`destructive_command_protection.overrides.\${id}\`),
    ...destructive.allow_paths === undefined ? [] : ["destructive_command_protection.allow_paths"],
    ...secret.enabled === undefined ? [] : ["secret_protection.enabled"],
    ...Object.keys(secret.overrides ?? {}).map((id) => \`secret_protection.overrides.\${id}\`),
    ...secret.deny_paths === undefined ? [] : ["secret_protection.deny_paths"],
    ...secret.allow_paths === undefined ? [] : ["secret_protection.allow_paths"]
  ];
};
var overlayProjectProposal = (baseline, proposal) => {
  const displayed = clonePolicy(baseline);
  const destructive = proposal.destructive_command_protection ?? {};
  const secret = proposal.secret_protection ?? {};
  if (proposal.safety?.level)
    displayed.safety.level = proposal.safety.level;
  Object.assign(displayed.safety.overrides, proposal.safety?.overrides ?? {});
  if (proposal.workflow?.worktree_mode !== undefined)
    displayed.workflow.worktree_mode = proposal.workflow.worktree_mode;
  if (destructive.enabled !== undefined)
    displayed.destructive_command_protection.enabled = destructive.enabled;
  Object.assign(displayed.destructive_command_protection.overrides, destructive.overrides ?? {});
  if (destructive.allow_paths)
    displayed.destructive_command_protection.allow_paths = destructive.allow_paths;
  if (secret.enabled !== undefined)
    displayed.secret_protection.enabled = secret.enabled;
  Object.assign(displayed.secret_protection.overrides, secret.overrides ?? {});
  if (secret.deny_paths)
    displayed.secret_protection.deny_paths = secret.deny_paths;
  if (secret.allow_paths)
    displayed.secret_protection.allow_paths = secret.allow_paths;
  return displayed;
};
var seedProjectDraft = (data) => {
  if (!data.baseline)
    return null;
  if (!Array.isArray(data.userPolicyDiagnostics) || data.userPolicyDiagnostics.length > 0)
    return null;
  const marked = new Set(projectMarkedFields(data.projection ?? {}));
  const policy = overlayProjectProposal(data.baseline, data.projection ?? {});
  return {
    baseline: data.baseline,
    marked,
    policy,
    snapshot: JSON.stringify(collectProjectProposal(marked, policy))
  };
};

// src/gui/frontend/report.ts
var reportIssueUrl = "https://local/cc-safety-net/issues/new?template=false_positive.yml";
var reportUrlLimit = 8000;
var endsAtPathBoundary = (following) => following === "" || /^[/\\\\\\s'"]/.test(following);
var scrubReportPaths = (text, cwd, home) => [
  [cwd, "<project>"],
  [home, "~"]
].reduce((scrubbed, [from, to]) => from ? scrubbed.split(from).reduce((joined, part) => joined + (endsAtPathBoundary(part) ? to : from) + part) : scrubbed, text);
var buildReportUrl = (fields) => {
  const url = new URL(reportIssueUrl);
  Object.entries(fields).filter(([, value]) => value).forEach(([field, value]) => {
    url.searchParams.set(field, value);
  });
  return url.toString();
};
var buildReportRequest = (fields, dropped = []) => {
  const url = buildReportUrl(fields);
  if (url.length <= reportUrlLimit)
    return { url, dropped };
  const largest = Object.entries(fields).filter(([, value]) => value).sort((left, right) => right[1].length - left[1].length)[0];
  if (!largest)
    return { url, dropped };
  return buildReportRequest({ ...fields, [largest[0]]: "" }, [...dropped, largest[0]]);
};

// src/gui/frontend/rule-prompt.ts
var rulePromptText = (prompt) => {
  const names = prompt.rulesData?.rulebooks.map((rulebook) => rulebook.name) ?? [];
  return [
    "Use the cc-safety-net skill for this request.",
    "If that skill is not available, run \`npx -y cc-safety-net rule doc\` first and treat its output as the source of truth for schema, paths, and validation.",
    "",
    prompt.rulesScope === "project" ? \`Scope: this project - \${prompt.projectPath.trim()}\` : "Scope: all projects (user scope)",
    \`Existing rulebooks (names must stay unique across both scopes): \${names.length > 0 ? names.join(", ") : "none"}\`,
    "",
    prompt.request.trim()
  ].join(\`
\`);
};

// src/gui/frontend/main.ts
var token = JSON.parse(document.getElementById("ccsn-data").textContent).token;
var fallbackRepoUrl = "https://local/cc-safety-net";
var safetyLevels = {
  standard: [
    "Standard",
    "Blocks recognizable destructive commands and sensitive content access while allowing metadata-only sensitive-path checks. Recommended for normal coding."
  ],
  strict: [
    "Strict",
    "Standard, plus blocks dynamic or unparseable commands and metadata-only sensitive-path discovery. Occasional false positives on advanced shell."
  ],
  paranoid: [
    "Paranoid",
    "Strict, plus blocks rm -rf inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos."
  ]
};
var safetyOverrides = {
  fail_closed: ["Fail closed", "Block commands the parser cannot fully understand."],
  paranoid_rm: ["Paranoid rm -rf checks", "Block non-temp rm -rf inside the project."],
  paranoid_interpreters: ["Paranoid interpreters", "Block interpreter one-liners."]
};
var rawCopyIcons = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>'
};
var starIcons = {
  outline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
  filled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>'
};
var reportIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><path d="M4 22v-7"></path></svg>';
var pathListIcons = {
  add: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M10 11v6M14 11v6"></path></svg>'
};
var state;
var draftPolicy;
var projectDraft = null;
var markedFields = new Set;
var preview;
var previewRequestId = 0;
var dirty = false;
var searchActive = false;
var OVERVIEW_DAYS = 7;
var overview = null;
var activity = null;
var knownRuleIds = new Set;
var activityFilters = { days: 7, decision: "all", agent: "all", query: "", command: "" };
var tierExpanded = new Map([
  ["enforced", false],
  ["normal", false],
  ["strict", false],
  ["paranoid", false]
]);
var searchCollapsedTiers = new Set;
var secretGroupExpanded = new Map;
var searchCollapsedSecretGroups = new Set;
var rawCopyResetTimer = null;
var feedCopyResetTimer = null;
var activityQueryTimer;
var renderedFeedEntries = [];
var suspects = new Set;
var activeStarContext = { starred: null, starCount: null, blockedTotal: 0 };
var integrations = null;
var integrationBusy = new Set;
var rulesData = null;
var rulesRequested = false;
var rulesScope = "project";
var pendingRuleFocus = null;
var directoryPickerFailed = false;
var api = (path, init = {}) => fetch(\`\${path}\${path.includes("?") ? "&" : "?"}token=\${encodeURIComponent(token)}\`, {
  ...init,
  headers: {
    "content-type": "application/json",
    "x-cc-safety-net-token": token,
    ...init.headers
  }
});
var requestJson = async (path, init) => {
  try {
    const response = await api(path, init);
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      data: text ? JSON.parse(text) : {},
      error: undefined
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: undefined,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var errorText = (result) => result.error ?? (Array.isArray(result.data?.errors) && result.data.errors.length ? result.data.errors.join(\`
\`) : null) ?? result.data?.error ?? \`Request failed (status \${result.status}).\`;
var isWriteSuccess = (result) => result.ok && !(Array.isArray(result.data?.errors) && result.data.errors.length > 0);
var qs = (id) => document.getElementById(id);
var setDetailStatus = (text, kind = "") => {
  qs("status").textContent = text;
  qs("status").className = \`status \${kind}\`;
};
var appStatusTimer;
var setAppStatus = (text, kind = "") => {
  qs("app-status").textContent = text;
  qs("app-status").className = \`app-status \${kind}\`;
  clearTimeout(appStatusTimer);
  if (kind === "ok")
    appStatusTimer = setTimeout(() => setAppStatus(""), 4000);
};
var busy = false;
var updateActions = () => {
  const hasErrors = (state?.errors.length ?? 0) > 0;
  qs("save").disabled = busy || !state || hasErrors;
  qs("reset").disabled = busy || !state;
  qs("repair").disabled = busy || !hasErrors;
};
var runExclusive = async (pendingText, fn) => {
  if (busy)
    return;
  busy = true;
  updateActions();
  setAppStatus(pendingText);
  setDetailStatus("");
  try {
    await fn();
  } finally {
    busy = false;
    updateActions();
  }
};
var checkbox = (checked) => checked ? "checked" : "";
var dayCount = (days) => \`\${days} day\${days === 1 ? "" : "s"}\`;
var syncMasterBadges = () => {
  document.querySelectorAll("label.row.master input").forEach((input) => {
    const badge = input.closest("label")?.querySelector(".master-badge");
    if (badge)
      badge.textContent = input.checked ? "On" : "Off";
  });
};
var escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char] ?? char);
var pathLines = (value) => value.split(\`
\`).map((line) => line.trim()).filter(Boolean);
var formatPolicy = (policy) => \`\${JSON.stringify(policy, null, 2)}
\`;
var collectFormPolicy = () => ({
  version: 1,
  safety: {
    level: draftPolicy.safety.level,
    overrides: Object.fromEntries(Object.entries(draftPolicy.safety.overrides).filter(([, value]) => typeof value === "boolean"))
  },
  workflow: draftPolicy.workflow,
  destructive_command_protection: draftPolicy.destructive_command_protection,
  secret_protection: {
    enabled: draftPolicy.secret_protection.enabled,
    overrides: draftPolicy.secret_protection.overrides,
    deny_paths: draftPolicy.secret_protection.deny_paths,
    allow_paths: draftPolicy.secret_protection.allow_paths
  },
  audit: draftPolicy.audit
});
var effectivePreviewPolicy = (policy, baseline) => {
  if (!baseline)
    return policy;
  const union = (user, project) => [...new Set([...user, ...project])];
  return {
    ...policy,
    destructive_command_protection: {
      ...policy.destructive_command_protection,
      allow_paths: union(baseline.destructive_command_protection.allow_paths, policy.destructive_command_protection.allow_paths)
    },
    secret_protection: {
      ...policy.secret_protection,
      deny_paths: union(baseline.secret_protection.deny_paths, policy.secret_protection.deny_paths),
      allow_paths: union(baseline.secret_protection.allow_paths, policy.secret_protection.allow_paths)
    }
  };
};
var requestPolicyPreview = (policy = collectFormPolicy()) => requestJson("/api/policy/preview", {
  method: "POST",
  body: JSON.stringify(policy)
});
var policyScopeMode = () => projectDraft ? "project" : "user";
var projectFieldChip = (field, compact = false) => {
  if (policyScopeMode() !== "project")
    return "";
  if (!markedFields.has(field))
    return '<span class="project-chip inherited">Inherited</span>';
  return \`<button type="button" class="project-chip" data-unmark-field="\${escapeHtml(field)}" title="Set by project - click to inherit again" aria-label="Set by project: \${escapeHtml(field)}. Activate to inherit again.">\${compact ? "Project" : "Set by project"}</button>\`;
};
var projectFieldLine = (field) => {
  const chip = projectFieldChip(field);
  return chip ? \`<div class="project-field-line">\${chip}</div>\` : "";
};
var projectChipSlots = [
  ["destructive-enabled-chip", "destructive_command_protection.enabled"],
  ["secret-enabled-chip", "secret_protection.enabled"],
  ["allow-paths-chip", "destructive_command_protection.allow_paths"],
  ["deny-paths-chip", "secret_protection.deny_paths"],
  ["secret-allow-paths-chip", "secret_protection.allow_paths"]
];
var syncProjectChips = () => {
  projectChipSlots.forEach(([id, field]) => {
    qs(id).innerHTML = projectFieldChip(field);
  });
};
var markProjectField = (field) => {
  if (!projectDraft || markedFields.has(field))
    return;
  markedFields.add(field);
  renderSafety();
  syncProjectChips();
};
var rebuildProjectDisplay = () => {
  if (!projectDraft)
    return;
  draftPolicy = overlayProjectProposal(projectDraft.baseline, collectProjectProposal(markedFields, draftPolicy));
  renderPolicySections();
  refreshPolicyPreview();
};
var unmarkProjectField = (field) => {
  if (!projectDraft || !markedFields.has(field))
    return;
  markedFields.delete(field);
  rebuildProjectDisplay();
};
var viewNames = ["overview", "activity", "policy", "rules", "integrations", "settings"];
var viewTitles = {
  overview: "Overview",
  activity: "Activity",
  policy: "Policy",
  rules: "Rules",
  integrations: "Integrations",
  settings: "Settings"
};
var currentView = () => {
  const hash = location.hash.replace("#", "");
  return viewNames.includes(hash) ? hash : "overview";
};
var applyView = () => {
  const view = currentView();
  document.body.dataset.view = view;
  const hasSearch = view === "activity" || view === "policy";
  qs("topbar-title").textContent = viewTitles[view];
  qs("topbar-title").classList.toggle("sr-only", hasSearch);
  document.querySelectorAll(".topbar-search").forEach((el) => {
    el.hidden = el.dataset.searchView !== view;
  });
  qs("topbar").classList.toggle("has-search", hasSearch);
  document.title = \`\${viewTitles[view]} · CC Safety Net\`;
  document.querySelectorAll("[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === view)
      link.setAttribute("aria-current", "page");
    else
      link.removeAttribute("aria-current");
  });
  qs("dirty-chip").hidden = !dirty || view === "policy";
  if (view === "activity")
    applyFeedClamps(qs("activity-feed"));
  if (view === "rules" && !rulesRequested) {
    rulesRequested = true;
    loadRules();
  }
  if (view === "rules" && rulesData && pendingRuleFocus)
    renderRules();
};
var agentLabels = integrationDisplayNames;
var tierCountHtml = (segments) => {
  const parts = segments.filter(([count]) => count > 0).map(([count, label, tone]) => tone ? \`<span class="count-\${tone}">\${count} \${label}</span>\` : \`\${count} \${label}\`);
  return parts.length > 0 ? parts.join(" · ") : "0 on";
};
var feedItemHtml = (entry, index) => {
  const deny = entry.decision !== "allow";
  const badgeClass = entry.failureStage ? "error" : deny ? "deny" : "allow";
  const badgeLabel = entry.failureStage ? "Error" : deny ? "Blocked" : "Allowed";
  return \`<article class="feed-item">
    <div class="feed-meta">
      <span class="decision-badge \${badgeClass}">\${badgeLabel}</span>
      \${entry.agent && entry.agent !== "unknown" ? \`<span class="agent-badge">\${escapeHtml(agentLabels[entry.agent] ?? entry.agent)}</span>\` : ""}
      \${entry.ruleId ? knownRuleIds.has(entry.ruleId) ? \`<button type="button" class="rule-id" data-jump-rule="\${escapeHtml(entry.ruleId)}" title="Show this rule in Policy">\${escapeHtml(entry.ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(entry.ruleId)}</code>\` : ""}
      <time datetime="\${escapeHtml(entry.ts)}" title="\${escapeHtml(entry.ts)}">\${formatRelativeTime(entry.ts)}</time>
      <button type="button" class="icon-button feed-copy" data-log-copy="\${index}" aria-label="Copy log entry as JSON">\${rawCopyIcons.copy}</button>
      \${deny ? \`<button type="button" class="icon-button feed-report" data-report-fp="\${index}" aria-label="Report false positive" title="Report false positive">\${reportIcon}</button>\` : \`<button type="button" class="feed-toggle feed-block" data-block-future="\${index}">Block this in future</button>\`}
    </div>
    <code class="feed-command">\${escapeHtml(entry.segment || entry.command || "(no command recorded)")}</code>
    \${entry.reason && entry.reason !== "allowed" ? \`<p class="feed-reason muted">\${escapeHtml(entry.reason)}</p>\` : ""}
  </article>\`;
};
var applyFeedClamps = (root) => {
  const overflowing = [...root.querySelectorAll(".feed-command")].filter((command) => !command.classList.contains("clamped") && command.scrollHeight > command.clientHeight + 1);
  overflowing.forEach((command) => {
    command.classList.add("clamped");
    command.insertAdjacentHTML("afterend", '<button type="button" class="feed-toggle" data-feed-toggle aria-expanded="false">Show more</button>');
  });
};
var dayLabel = (ts) => {
  const date = new Date(ts);
  if (date.toDateString() === new Date().toDateString())
    return "Today";
  if (date.toDateString() === new Date(Date.now() - 86400000).toDateString())
    return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
var renderOverviewActivity = () => {
  if (!overview)
    return;
  const tile = (value, label, extra) => \`<div class="tile"><strong>\${escapeHtml(value.toLocaleString("en-US"))}</strong><span>\${escapeHtml(label)}</span>\${extra}</div>\`;
  const dayAgoLabel = (daysAgo) => daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : \`\${daysAgo} days ago\`;
  const sparkline = (byDay, noun) => {
    const max = Math.max(...byDay, 1);
    return \`<div class="tile-spark" role="group" aria-label="Commands \${noun} per day, most recent \${dayCount(byDay.length)}">\${byDay.map((count, index) => {
      const label = \`\${dayAgoLabel(byDay.length - 1 - index)}: \${count.toLocaleString("en-US")} \${noun}\`;
      return \`<div class="spark-col" role="img" tabindex="0" data-count="\${count.toLocaleString("en-US")}" aria-label="\${escapeHtml(label)}"><div class="spark-bar\${count === 0 ? " spark-zero" : ""}" aria-hidden="true" style="height:\${count === 0 ? 2 : Math.max(2, Math.round(count / max * 40))}px"></div></div>\`;
    }).join("")}</div>\`;
  };
  qs("overview-window").textContent = \`Last \${dayCount(overview.days)}\`;
  qs("overview-tiles").innerHTML = [
    tile(overview.counts.blocked, "Blocked", sparkline(overview.counts.blockedByDay, "blocked")),
    tile(overview.totalInWindow, "Analyzed", sparkline(overview.counts.analyzedByDay, "analyzed"))
  ].join("");
};
var retentionDays = () => state?.policy?.audit?.retention_days ?? DEFAULT_AUDIT_RETENTION_DAYS;
var overviewDays = () => Math.min(OVERVIEW_DAYS, retentionDays());
var renderRetention = (loaded) => {
  qs("retention-days").value = String(loaded.policy.audit.retention_days);
  qs("retention-unit").textContent = loaded.policy.audit.retention_days === 1 ? "day" : "days";
  qs("retention-note").textContent = "Saved on change. Lowering this deletes anything already older than the new window; the Activity tab can only look back as far as it.";
};
var activityWindowOptions = () => {
  const retained = retentionDays();
  const windows = [7, 30, 90, 180, 365].filter((days) => days < retained);
  return [...windows, retained];
};
var configStateNotice = () => {
  const configState = state?.configState;
  if (!configState || configState.state === "ready")
    return null;
  return \`A fallback configuration is being enforced: \${configState.reason}\`;
};
var setProtectionBanner = (notices) => {
  const text = notices.filter(Boolean).join(" ");
  qs("protection-banner").textContent = text;
  qs("protection-banner").hidden = text === "";
};
var renderProtectionCard = () => {
  const configNotice = configStateNotice();
  if (!state?.preview) {
    qs("protection-card").hidden = true;
    setProtectionBanner([configNotice]);
    return;
  }
  const policy = state.policy;
  const customized = state.preview.counts.effectiveCustomizations > 0 || Object.entries(policy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[policy.safety.level][key]);
  const commandsOn = policy.destructive_command_protection.enabled;
  const secretsOn = policy.secret_protection.enabled;
  const off = [
    commandsOn ? null : "Destructive command protection is off — configurable destructive command rules are not being enforced (catastrophic and custom rules remain active)",
    secretsOn ? null : "Secret protection is off — sensitive paths and deny paths are not being blocked"
  ].filter(Boolean);
  setProtectionBanner([
    off.length > 0 ? \`\${off.join(". ")}. Re-enable \${off.length > 1 ? "them" : "it"} in Policy.\` : null,
    configNotice
  ]);
  qs("protection-card").hidden = false;
  qs("protection-card").classList.toggle("protection-warning", !commandsOn || !secretsOn);
  qs("protection-card").innerHTML = \`<div class="panel-head"><div class="panel-title"><h2>Protection status</h2></div><a class="panel-head-action view-all-link" href="#policy">Configure</a></div>\` + \`<p>\${escapeHtml(safetyLevels[policy.safety.level][0])}\${customized ? " · Customized" : ""}</p>\` + \`<p\${commandsOn ? "" : ' class="state-disabled"'}>\${commandsOn ? \`\${state.preview.counts.enabled} rules active\` : "Destructive command protection is OFF"}</p>\` + \`<p\${secretsOn ? "" : ' class="state-disabled"'}>\${secretsOn ? "Secret protection on" : "Secret protection is OFF"}</p>\`;
};
var renderTopList = (containerId, counts, className, dataAttr) => {
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  qs(containerId).innerHTML = top.length === 0 ? '<p class="empty">No blocked commands in this window.</p>' : top.map(([key, count]) => \`<button type="button" class="\${className}" \${dataAttr}="\${escapeHtml(key)}"><code class="rule-id">\${escapeHtml(key)}</code><span class="chip-count">\${count.toLocaleString("en-US")}</span></button>\`).join("");
};
var renderTopLists = () => {
  if (!overview)
    return;
  renderTopList("top-commands", overview.counts.commands, "top-command", "data-command");
  renderTopList("top-rules", overview.counts.rules, "top-rule", "data-rule-id");
};
var clearCommandFilter = () => {
  if (!activityFilters.command)
    return false;
  activityFilters.command = "";
  return true;
};
var jumpToActivityRule = (ruleId) => {
  activityFilters.command = "";
  activityFilters.query = ruleId.toLowerCase();
  qs("activity-search").value = ruleId;
  if (activity) {
    renderActivityControls();
    renderActivityFeed();
  }
  location.hash = "activity";
};
var renderGuardErrors = () => {
  if (!overview)
    return;
  qs("guard-errors").hidden = overview.counts.errors === 0;
  if (overview.counts.errors === 0)
    return;
  qs("guard-errors").textContent = \`\${overview.counts.errors.toLocaleString("en-US")} guard error\${overview.counts.errors === 1 ? "" : "s"} in the last \${dayCount(overview.days)} — commands blocked because evaluation failed, not by policy. Click to view.\`;
};
var renderActivityControls = () => {
  if (!activity)
    return;
  const agentCounts = activity.counts.agents;
  const chipHtml = (kind, value, label, count) => \`<button type="button" class="chip" data-activity-chip="\${kind}" data-chip-value="\${escapeHtml(value)}" aria-pressed="\${activityFilters[kind] === value}">\${escapeHtml(label)}\${count === undefined ? "" : \` <span class="chip-count">\${count.toLocaleString("en-US")}</span>\`}</button>\`;
  qs("activity-decision").innerHTML = [
    chipHtml("decision", "all", "All", activity.totalInWindow),
    chipHtml("decision", "deny", "Blocked", activity.counts.blocked),
    chipHtml("decision", "allow", "Allowed", activity.counts.allowed),
    ...activity.counts.errors > 0 ? [chipHtml("decision", "error", "Errors", activity.counts.errors)] : [],
    ...suspects.size > 0 ? [chipHtml("decision", "suspect", "Likely false positive", suspects.size)] : []
  ].join("");
  const agentNames = Object.keys(agentCounts).filter((name) => name !== "unknown").sort();
  qs("activity-agents").innerHTML = agentNames.length < 2 ? "" : [
    chipHtml("agent", "all", "All agents"),
    ...agentNames.map((name) => chipHtml("agent", name, agentLabels[name] ?? name, agentCounts[name]))
  ].join("");
  qs("activity-command-filter").innerHTML = activityFilters.command ? \`<button type="button" class="filter-pill" data-clear-command aria-label="Clear command filter">Command: <code>\${escapeHtml(activityFilters.command)}</code><span class="filter-pill-x" aria-hidden="true">✕</span></button>\` : "";
  qs("activity-days").innerHTML = activityWindowOptions().map((days) => \`<option value="\${days}">Last \${dayCount(days)}</option>\`).join("");
  qs("activity-days").value = String(activity.days);
};
var renderActivityFeed = () => {
  if (!activity)
    return;
  const matchesFilters = (entry) => {
    if (activityFilters.decision === "deny" && entry.decision === "allow")
      return false;
    if (activityFilters.decision === "allow" && entry.decision !== "allow")
      return false;
    if (activityFilters.decision === "error" && !entry.failureStage)
      return false;
    if (activityFilters.decision === "suspect" && !suspects.has(entry))
      return false;
    if (activityFilters.agent !== "all" && (entry.agent || "unknown") !== activityFilters.agent)
      return false;
    if (activityFilters.command) {
      if (entry.decision === "allow")
        return false;
      return commandSignature(entry.segment || entry.command) === activityFilters.command;
    }
    if (!activityFilters.query)
      return true;
    return [entry.ruleId, entry.segment || entry.command].filter(Boolean).join(" ").toLowerCase().includes(activityFilters.query);
  };
  const entries = activity.entries.filter(matchesFilters);
  renderedFeedEntries = entries;
  qs("activity-feed").innerHTML = entries.length === 0 ? '<p class="empty">No audit log entries match.</p>' : \`<div class="feed-list">\${entries.map((entry, index) => {
    const label = dayLabel(entry.ts);
    const previous = entries[index - 1];
    const separator = previous && label === dayLabel(previous.ts) ? "" : \`<div class="feed-day-sep">\${escapeHtml(label)}</div>\`;
    return separator + feedItemHtml(entry, index);
  }).join("")}</div>\`;
  applyFeedClamps(qs("activity-feed"));
  qs("activity-count").textContent = \`Showing \${entries.length.toLocaleString("en-US")} of \${activity.totalInWindow.toLocaleString("en-US")} entries from the last \${dayCount(activity.days)}\${activity.truncated ? " (capped at 500, newest of each decision)" : ""}.\${activity.unreadable > 0 ? \` \${activity.unreadable.toLocaleString("en-US")} audit log source\${activity.unreadable === 1 ? "" : "s"} could not be read, so this list is incomplete.\` : ""}\`;
};
var loadOverview = async () => {
  const result = await requestJson(\`/api/activity?days=\${overviewDays()}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("overview-window").textContent = "";
    qs("overview-tiles").innerHTML = "";
    qs("top-rules").innerHTML = message;
    qs("guard-errors").hidden = true;
    return;
  }
  const feed = result.data;
  overview = feed;
  qs("logs-path").textContent = overview.logsDir ?? "Not available";
  renderOverviewActivity();
  renderTopLists();
  renderGuardErrors();
};
var loadActivity = async () => {
  const result = await requestJson(\`/api/activity?days=\${activityFilters.days}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("activity-feed").innerHTML = message;
    qs("activity-count").textContent = "";
    return;
  }
  const feed = result.data;
  activity = feed;
  suspects = findSuspectEntries(activity.entries);
  if (activityFilters.agent !== "all" && !(activityFilters.agent in activity.counts.agents)) {
    activityFilters.agent = "all";
  }
  if (activityFilters.decision === "error" && activity.counts.errors === 0) {
    activityFilters.decision = "all";
  }
  if (activityFilters.decision === "suspect" && suspects.size === 0) {
    activityFilters.decision = "all";
  }
  renderActivityControls();
  renderActivityFeed();
};
var runRefresh = async (buttonId, reload) => {
  const button = qs(buttonId);
  if (button.disabled)
    return;
  button.disabled = true;
  button.classList.add("spinning");
  try {
    await Promise.all([reload(), new Promise((resolve) => setTimeout(resolve, 600))]);
  } finally {
    button.classList.remove("spinning");
    button.disabled = false;
  }
};
var refreshActivity = () => runRefresh("activity-refresh", () => Promise.all([loadOverview(), loadActivity()]));
var renderIntegrations = () => {
  const loaded = integrations;
  if (!loaded)
    return;
  qs("integrations-list").innerHTML = loaded.targets.map((row) => {
    const busy = integrationBusy.has(row.target);
    const version = row.version === null ? '<span class="muted">not detected</span>' : \`<span class="agent-badge">v\${escapeHtml(row.version)}</span>\`;
    const status = row.status === "active" ? '<span class="state-active">Installed</span>' : row.status === "disabled" ? '<span class="state-disabled">Disabled</span>' : row.status === "not-inspected" ? \`<span class="muted" title="This runtime's state file could not be read, so its status is unknown.">Not inspected</span>\` : '<span class="muted">Not installed</span>';
    const uninstall = row.status === "active";
    const busyLabel = uninstall ? "Uninstalling…" : "Installing…";
    const action = row.version === null ? "" : \`<button type="button" class="\${uninstall ? "danger" : "primary"}" data-integration-action="\${uninstall ? "uninstall" : "install"}" data-integration-target="\${escapeHtml(row.target)}"\${busy ? " disabled" : ""}>\${busy ? busyLabel : uninstall ? "Uninstall" : row.status === "disabled" ? "Enable" : "Install"}</button>\`;
    const note = row.note ? \`<div class="status \${row.note.kind}">\${escapeHtml(row.note.text)}</div>\` : "";
    return \`<div class="integration-row">
        <span class="integration-info"><strong>\${escapeHtml(row.label)}</strong> \${version} \${status}</span>
        \${action}
        \${note}
      </div>\`;
  }).join("");
};
var renderHealthStrip = (health) => {
  const loaded = integrations;
  if (!loaded || !health.ok)
    return;
  const detected = loaded.targets.filter((row) => row.status === "active" || row.status === "disabled");
  const active = detected.filter((row) => row.status === "active");
  const inactive = detected.filter((row) => row.status === "disabled");
  const attention = inactive.length > 0 || active.length === 0;
  const parts = [];
  const labelHtml = (row) => \`<strong>\${escapeHtml(row.label)}</strong>\`;
  if (active.length)
    parts.push(\`Hook active in \${active.map(labelHtml).join(", ")}\`);
  if (inactive.length)
    parts.push(\`\${inactive.map(labelHtml).join(", ")} detected without an active hook\`);
  if (!parts.length)
    parts.push("No agent hooks detected");
  if (health.data?.update?.updateAvailable)
    parts.push(\`v\${escapeHtml(health.data.update.latestVersion)} available\`);
  const link = attention ? ' <a class="view-all-link" href="#integrations">Fix in Integrations</a>' : "";
  const el = qs("health-strip");
  el.className = attention ? "status health-strip error" : "status health-strip ok";
  el.innerHTML = parts.join(" · ") + link;
  el.hidden = false;
};
var loadIntegrations = async () => {
  const result = await requestJson("/api/integrations");
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs("integrations-list").innerHTML = \`<p class="empty">Could not load integrations: \${escapeHtml(errorText(result))}</p>\`;
    return;
  }
  integrations = result.data;
  renderIntegrations();
  qs("integrations-pkg-version").textContent = result.data.system.version;
  qs("integrations-node-version").textContent = result.data.system.nodeVersion ?? "unknown";
  qs("integrations-platform").textContent = result.data.system.platform;
  qs("integrations-system").hidden = false;
};
var refreshIntegrations = () => runRefresh("integrations-refresh", loadIntegrations);
var renderRules = () => {
  const loaded = rulesData;
  if (!loaded)
    return;
  if (!qs("rules-project-path").value)
    qs("rules-project-path").value = loaded.projectPath;
  const canPick = loaded.canPickDirectory && !directoryPickerFailed;
  qs("rules-project-path").readOnly = canPick;
  qs("rules-choose-directory").hidden = !canPick;
  qs("rules-list").innerHTML = loaded.rulebooks.length === 0 ? loaded.errors.length > 0 ? '<p class="empty">Every configured rulebook was dropped, so no custom rule is enforced. See Diagnostics below.</p>' : '<p class="empty">No custom rulebooks. Run <code>npx -y cc-safety-net rule init</code> to create one, or see the <a href="https://local/cc-safety-net/docs" target="_blank" rel="noopener">documentation</a>.</p>' : loaded.rulebooks.map((rulebook) => \`<div class="rulebook-card">
    <div class="rulebook-head">
      <strong>\${escapeHtml(rulebook.name)}</strong>
      <span class="agent-badge">v\${escapeHtml(rulebook.version)}</span>
      \${rulebook.spec === rulebook.name ? "" : \`<code>\${escapeHtml(rulebook.spec)}</code>\`}
      <span>\${rulebook.source === "user" ? "All projects" : "This project"}</span>
      <span>\${rulebook.rules.length} rule\${rulebook.rules.length === 1 ? "" : "s"}</span>
    </div>
    \${rulebook.rules.map((rule) => \`<div class="rulebook-rule\${pendingRuleFocus === rule.name ? " rules-focus" : ""}">
      <code class="rule-id">custom.\${escapeHtml(rule.name)}</code>
      <code>\${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(" "))}</code>
      <p>Blocked arguments (any one matches): \${rule.block_args.map((arg) => \`<code>\${escapeHtml(arg)}</code>\`).join(" ")}</p>
      <p>\${escapeHtml(rule.reason)}</p>
    </div>\`).join("")}
  </div>\`).join("");
  const diagnostics = [
    ...loaded.errors.map((text) => \`<div class="status error">\${escapeHtml(text)}</div>\`),
    ...loaded.warnings.map((text) => \`<div class="status">\${escapeHtml(text)}</div>\`)
  ];
  qs("rules-diagnostics").innerHTML = diagnostics.join("");
  qs("rules-diagnostics-panel").hidden = diagnostics.length === 0;
  if (!pendingRuleFocus)
    return;
  const focused = qs("rules-list").querySelector(".rules-focus");
  if (focused)
    focused.scrollIntoView({ block: "center" });
  if (!focused)
    setAppStatus(\`custom.\${pendingRuleFocus} is not in any rulebook\`, "error");
  pendingRuleFocus = null;
};
var loadRules = async () => {
  const result = await requestJson("/api/rules");
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs("rules-list").innerHTML = \`<p class="empty">Could not load rules: \${escapeHtml(errorText(result))}</p>\`;
    rulesData = null;
    qs("rules-diagnostics-panel").hidden = true;
    rulesRequested = false;
    return;
  }
  rulesData = result.data;
  renderRules();
};
var refreshRules = () => runRefresh("rules-refresh", () => {
  rulesRequested = true;
  return loadRules();
});
var jumpToRulesRule = (ruleId) => {
  pendingRuleFocus = ruleId.replace(/^custom\\./, "");
  location.hash = "rules";
};
var openRuleComposer = (command) => {
  qs("rules-composer-input").value = command;
  location.hash = "rules";
};
var setRulesScope = (scope) => {
  rulesScope = scope;
  document.querySelectorAll("[data-rules-scope]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.rulesScope === scope));
  });
  qs("rules-project-path-field").hidden = scope !== "project";
};
var chooseProjectDirectory = async () => {
  const button = qs("rules-choose-directory");
  if (button.disabled)
    return;
  button.disabled = true;
  const result = await requestJson("/api/rules/choose-directory", { method: "POST" });
  button.disabled = false;
  if (result.ok && result.data.path) {
    qs("rules-project-path").value = result.data.path;
    return;
  }
  if (result.ok && result.data.cancelled)
    return;
  directoryPickerFailed = true;
  qs("rules-project-path").readOnly = false;
  button.hidden = true;
  setAppStatus(\`\${result.ok ? result.data.error : errorText(result)} - type the project path instead\`, "error");
};
var copyRulePrompt = async () => {
  if (!rulesData) {
    setAppStatus("Rules have not loaded yet - refresh the Rulebooks panel", "error");
    return;
  }
  if (!qs("rules-composer-input").value.trim()) {
    setAppStatus("Describe what you want first", "error");
    return;
  }
  if (rulesScope === "project" && !qs("rules-project-path").value.trim()) {
    setAppStatus("Enter the project path the rule belongs to", "error");
    return;
  }
  qs("rules-copy-prompt").disabled = true;
  try {
    await navigator.clipboard.writeText(rulePromptText({
      rulesData,
      rulesScope,
      projectPath: qs("rules-project-path").value,
      request: qs("rules-composer-input").value
    }));
    qs("rules-composer-input").value = "";
    setAppStatus("Prompt copied - paste it into your coding CLI", "ok");
  } catch {
    setAppStatus("Copy failed", "error");
  } finally {
    qs("rules-copy-prompt").disabled = false;
  }
};
var runIntegrationAction = async (button) => {
  const target = button.dataset.integrationTarget;
  if (!target || integrationBusy.has(target))
    return;
  integrationBusy.add(target);
  const action = button.dataset.integrationAction;
  renderIntegrations();
  const result = await requestJson(\`/api/\${action}\`, {
    method: "POST",
    body: JSON.stringify({ target })
  });
  integrationBusy.delete(target);
  const row = integrations?.targets.find((entry) => entry.target === target);
  if (!row)
    return;
  const ok = result.ok && result.data.ok === true;
  if (ok)
    row.status = action === "install" ? "active" : "not-installed";
  row.note = {
    kind: ok ? "ok" : "error",
    text: ok ? result.data.output : result.data?.output || errorText(result)
  };
  if (!ok)
    setAppStatus(action === "install" ? "Install failed" : "Uninstall failed", "error");
  renderIntegrations();
};
var confirmDialog = (() => {
  const dialog = qs("confirm-dialog");
  const confirm = qs("confirm-dialog-confirm");
  const cancel = qs("confirm-dialog-cancel");
  let resolvePending = null;
  dialog.addEventListener("close", () => {
    if (!resolvePending)
      return;
    resolvePending(dialog.returnValue === "confirm");
    resolvePending = null;
  });
  dialog.addEventListener("cancel", () => {
    dialog.returnValue = "cancel";
  });
  return (options) => new Promise((resolve) => {
    if (resolvePending) {
      resolve(false);
      return;
    }
    qs("confirm-dialog-title").textContent = options.title;
    qs("confirm-dialog-body").textContent = options.body;
    qs("confirm-dialog-detail").textContent = options.detail ?? "";
    const detailRow = qs("confirm-dialog-detail").parentElement;
    if (detailRow)
      detailRow.hidden = !options.detail;
    qs("confirm-dialog-rows").innerHTML = options.rowsHtml ?? "";
    qs("confirm-dialog-rows").hidden = !options.rowsHtml;
    confirm.textContent = options.confirmLabel;
    confirm.className = options.confirmClass ?? "danger";
    dialog.returnValue = "cancel";
    resolvePending = resolve;
    dialog.showModal();
    cancel.focus();
  });
})();
var confirmProtectionDisable = (options) => confirmDialog({
  title: options.title,
  body: options.body,
  detail: options.detail,
  confirmLabel: "Disable protection"
});
var togglePanel = (button) => {
  const controls = button.getAttribute("aria-controls");
  if (!controls)
    return;
  const expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(expanded));
  qs(controls).hidden = !expanded;
};
var syncSearchState = () => {
  const active = qs("policy-search").value.trim().length > 0;
  if (active === searchActive)
    return;
  searchActive = active;
  if (active)
    return;
  searchCollapsedTiers.clear();
  searchCollapsedSecretGroups.clear();
};
var updateRawSource = () => {
  if (projectDraft) {
    qs("raw-source").textContent = \`Only the fields marked for this project. Writes to \${projectDraft.path}.\`;
    return;
  }
  qs("raw-source").textContent = state?.errors.length ? "Read-only original policy JSON. Repair preserves valid settings and writes canonical JSON." : "Read-only mirror of the controls.";
};
var setRawCopyCopied = (copied) => {
  qs("raw-copy").innerHTML = copied ? rawCopyIcons.check : rawCopyIcons.copy;
  qs("raw-copy").classList.toggle("copied", copied);
  qs("raw-copy").setAttribute("aria-label", copied ? "Copied raw JSON" : "Copy raw JSON to clipboard");
};
var resetFeedCopy = () => {
  document.querySelectorAll(".feed-copy.copied").forEach((button) => {
    button.classList.remove("copied");
    button.innerHTML = rawCopyIcons.copy;
    button.setAttribute("aria-label", "Copy log entry as JSON");
  });
};
var openReportDialog = (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.reportFp)];
  if (!entry)
    return;
  const scrub = (text) => scrubReportPaths(text, entry.cwd, activity?.homeDir);
  qs("report-command").value = scrub(entry.command || entry.segment || "");
  qs("report-entry").value = JSON.stringify(entry, (_key, value) => typeof value === "string" ? scrub(value) : value, 2);
  qs("report-dialog").returnValue = "cancel";
  qs("report-dialog").showModal();
};
var openFalsePositiveForm = async () => {
  const fields = {
    command: qs("report-command").value,
    entry: qs("report-entry").value
  };
  const request = buildReportRequest(fields);
  const copying = request.dropped.length ? navigator.clipboard.writeText(request.dropped.map((field) => \`### \${field}
\${fields[field]}\`).join(\`

\`)) : null;
  window.open(request.url, "_blank", "noopener");
  if (!copying)
    return;
  const names = request.dropped.join(" and ");
  setAppStatus(await copying.then(() => true).catch(() => false) ? \`Report too long to prefill — \${names} copied to your clipboard. Paste into the form on GitHub.\` : \`Report too long to prefill — \${names} left out. Copy the entry from the feed and paste it into the form on GitHub.\`, "error");
};
qs("report-dialog").addEventListener("close", () => {
  if (qs("report-dialog").returnValue === "report")
    openFalsePositiveForm();
});
var copyFeedEntry = async (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.logCopy)];
  if (!entry)
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
    if (feedCopyResetTimer)
      clearTimeout(feedCopyResetTimer);
    resetFeedCopy();
    button.classList.add("copied");
    button.innerHTML = rawCopyIcons.check;
    button.setAttribute("aria-label", "Copied log entry");
    feedCopyResetTimer = setTimeout(resetFeedCopy, 2000);
  } catch {
    setAppStatus("Copy failed", "error");
  }
};
var copyRawToClipboard = async () => {
  qs("raw-copy").disabled = true;
  try {
    await navigator.clipboard.writeText(qs("raw").value);
    setRawCopyCopied(true);
    if (rawCopyResetTimer)
      clearTimeout(rawCopyResetTimer);
    rawCopyResetTimer = setTimeout(() => setRawCopyCopied(false), 2000);
  } catch (error) {
    setAppStatus("Copy failed", "error");
    setDetailStatus(\`Error: Could not copy Raw JSON: \${error instanceof Error ? error.message : String(error)}\`, "error");
  } finally {
    qs("raw-copy").disabled = false;
  }
};
var formatStarCount = (count) => {
  if (typeof count !== "number")
    return "";
  if (count >= 1000)
    return \`\${(count / 1000).toFixed(1).replace(/\\.0$/, "")}k\`;
  return String(count);
};
var starCountHtml = (count) => {
  const formatted = formatStarCount(count);
  return formatted ? \`<span class="star-count">\${escapeHtml(formatted)}</span>\` : "";
};
var hideStarCta = () => {
  qs("star-row").hidden = true;
  qs("star-slot").innerHTML = "";
};
var renderStarPitch = (context, starred = false) => {
  const evidence = context.blockedTotal > 0 ? \`CC Safety Net has blocked <strong>\${escapeHtml(context.blockedTotal.toLocaleString("en-US"))}</strong> risky command\${context.blockedTotal === 1 ? "" : "s"} on this machine in its retained \${escapeHtml(dayCount(retentionDays()))} history.\` : "";
  if (starred) {
    qs("star-pitch-text").innerHTML = evidence;
    return;
  }
  qs("star-pitch-text").innerHTML = evidence ? \`\${evidence} If it saved your work, star it on GitHub.\` : "If CC Safety Net is useful to you, star it on GitHub.";
};
var renderStarLink = (context, href = fallbackRepoUrl) => {
  qs("star-slot").innerHTML = \`<a class="star-cta" href="\${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="Star CC Safety Net on GitHub (opens github.com)">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </a>\`;
  qs("star-row").hidden = false;
};
var renderStarCta = (context) => {
  activeStarContext = context;
  if (context.starred === true) {
    hideStarCta();
    return;
  }
  renderStarPitch(context);
  qs("star-mechanism").hidden = context.starred !== false;
  if (context.starred === null) {
    renderStarLink(context);
    return;
  }
  qs("star-slot").innerHTML = \`<button type="button" class="star-cta" aria-label="Star CC Safety Net on GitHub. One click via your GitHub CLI.">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </button>\`;
  qs("star-row").hidden = false;
};
var starRepo = async (button) => {
  button.disabled = true;
  const result = await requestJson("/api/star", { method: "POST" });
  if (result.ok && result.data?.ok === true) {
    const icon = button.querySelector(".star-icon");
    const label = button.querySelector(".star-label");
    if (icon)
      icon.innerHTML = starIcons.filled;
    if (label)
      label.textContent = "Starred. Thank you.";
    button.setAttribute("aria-label", "CC Safety Net starred on GitHub");
    button.classList.add("starred");
    qs("star-mechanism").hidden = true;
    renderStarPitch(activeStarContext, true);
    setAppStatus("Starred on GitHub", "ok");
    setDetailStatus("");
    return;
  }
  qs("star-mechanism").hidden = true;
  renderStarLink(activeStarContext, result.data?.fallbackUrl ?? fallbackRepoUrl);
};
var loadStarContext = async () => {
  const result = await requestJson("/api/star/context");
  renderStarCta(result.ok && result.data ? result.data : { starred: null, starCount: null, blockedTotal: 0 });
};
var syncRawFromForm = () => {
  if (state?.errors.length)
    return;
  qs("raw").value = formatPolicy(projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy());
  updateRawSource();
};
var updateDirtyStatus = () => {
  if (!state || state.errors.length)
    return;
  if (projectDraft) {
    dirty = JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== projectDraft.snapshot;
    qs("policy-savebar").hidden = !dirty;
    qs("dirty-chip").hidden = !dirty || currentView() === "policy";
    setDetailStatus("");
    updateActions();
    return;
  }
  const draftJson = JSON.stringify(collectFormPolicy());
  dirty = draftJson !== JSON.stringify(state.policy);
  qs("policy-savebar").hidden = !dirty;
  qs("dirty-chip").hidden = !dirty || currentView() === "policy";
  if (dirty)
    sessionStorage.setItem("cc-safety-net-draft", draftJson);
  if (!dirty)
    sessionStorage.removeItem("cc-safety-net-draft");
  setDetailStatus("");
  updateActions();
};
var createPathList = (prefix, config) => {
  const setHint = (text) => {
    qs(\`\${prefix}-hint\`).textContent = text;
    qs(\`\${prefix}-hint\`).hidden = !text;
  };
  const render = () => {
    const paths = config.getPaths();
    const disabled = config.isDisabled();
    qs(\`\${prefix}-count\`).textContent = \`\${paths.length} path\${paths.length === 1 ? "" : "s"}\`;
    qs(\`\${prefix}-input\`).disabled = disabled;
    qs(\`\${prefix}-add-button\`).disabled = disabled;
    qs(\`\${prefix}-list\`).innerHTML = paths.length === 0 ? \`<li class="empty">No \${config.itemLabel}s configured.</li>\` : paths.map((path, index) => \`<li class="path-item \${disabled ? "row-disabled" : ""}">
          <code>\${escapeHtml(path)}</code>
          <button type="button" class="icon-button" data-path-list="\${prefix}" data-path-remove="\${index}" \${disabled ? "disabled" : ""} aria-label="Remove \${config.itemLabel} \${escapeHtml(path)}">\${pathListIcons.remove}</button>
        </li>\`).join("");
  };
  const claimForProject = () => {
    if (!projectDraft || markedFields.has(config.field))
      return;
    markedFields.add(config.field);
    config.setPaths([]);
    syncProjectChips();
  };
  let adding = false;
  const add = async (value) => {
    if (adding)
      return;
    const entries = [...new Set(pathLines(value))];
    if (entries.length === 0)
      return;
    const scope = projectDraft;
    const claimed = projectDraft !== null && !markedFields.has(config.field);
    const previousPaths = config.getPaths();
    claimForProject();
    const submitted = qs(\`\${prefix}-input\`).value;
    const additions = entries.filter((entry) => !config.getPaths().includes(entry));
    if (additions.length) {
      adding = true;
      try {
        const error = await config.validateAdditions([...config.getPaths(), ...additions]);
        if (projectDraft !== scope)
          return;
        if (error) {
          setHint(\`Not added: \${additions.join(", ")} — \${error}\`);
          if (claimed) {
            markedFields.delete(config.field);
            config.setPaths(previousPaths);
            syncProjectChips();
          }
          return;
        }
      } finally {
        adding = false;
      }
    }
    const current = config.getPaths();
    const duplicates = entries.filter((entry) => current.includes(entry));
    config.setPaths([...current, ...additions.filter((entry) => !current.includes(entry))]);
    if (qs(\`\${prefix}-input\`).value === submitted)
      qs(\`\${prefix}-input\`).value = "";
    setHint(duplicates.length ? \`Already listed: \${duplicates.join(", ")}\` : "");
    render();
    syncRawFromForm();
    updateDirtyStatus();
    qs(\`\${prefix}-input\`).focus();
  };
  const remove = (index) => {
    claimForProject();
    config.setPaths(config.getPaths().filter((_, position) => position !== index));
    setHint("");
    render();
    syncRawFromForm();
    updateDirtyStatus();
  };
  return { render, add, remove };
};
var validatePathAdditions = async (patch) => {
  const candidate = collectFormPolicy();
  patch(candidate);
  const result = await requestPolicyPreview(candidate);
  if (result.ok && result.data?.preview)
    return null;
  return errorText(result);
};
var pathLists = {
  "deny-paths": createPathList("deny-paths", {
    field: "secret_protection.deny_paths",
    getPaths: () => draftPolicy.secret_protection.deny_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.deny_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "deny path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, deny_paths: paths };
    })
  }),
  "secret-allow-paths": createPathList("secret-allow-paths", {
    field: "secret_protection.allow_paths",
    getPaths: () => draftPolicy.secret_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, allow_paths: paths };
    })
  }),
  "allow-paths": createPathList("allow-paths", {
    field: "destructive_command_protection.allow_paths",
    getPaths: () => draftPolicy.destructive_command_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.destructive_command_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.destructive_command_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.destructive_command_protection = {
        ...candidate.destructive_command_protection,
        allow_paths: paths
      };
    })
  })
};
var pathListFor = (name) => name === "deny-paths" || name === "allow-paths" || name === "secret-allow-paths" ? pathLists[name] : null;
var secretRuleIsActive = (rule, overrides) => overrides[rule.id] ? overrides[rule.id] === "on" : !rule.defaultOff;
var markProjectOverride = (section, ruleId) => {
  if (!projectDraft)
    return;
  markedFields.add(\`\${section}.overrides.\${ruleId}\`);
};
var clearProjectOverrideMarks = (section) => {
  markedFields = new Set([...markedFields].filter((field) => !field.startsWith(\`\${section}.overrides.\`)));
};
var setSecretOverride = (rule, active) => {
  if (!projectDraft && active === !rule.defaultOff) {
    delete draftPolicy.secret_protection.overrides[rule.id];
    return;
  }
  draftPolicy.secret_protection.overrides[rule.id] = active ? "on" : "off";
  markProjectOverride("secret_protection", rule.id);
};
var setDestructiveOverride = (ruleId, active, inheritedEnabled) => {
  if (!projectDraft && active === inheritedEnabled) {
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    return;
  }
  draftPolicy.destructive_command_protection.overrides[ruleId] = active ? "on" : "off";
  markProjectOverride("destructive_command_protection", ruleId);
};
var groupRules = (rules) => rules.reduce((groups, rule) => {
  const group = groups.find((item) => item.category === rule.category);
  if (group) {
    group.rules.push(rule);
    return groups;
  }
  groups.push({ category: rule.category, rules: [rule] });
  return groups;
}, []);
var renderSecretPatterns = () => {
  if (!state)
    return;
  const loaded = state;
  const query = qs("policy-search").value.trim().toLowerCase();
  const rules = state.secretPatterns.filter((rule) => [rule.category, rule.label, rule.id, rule.description, ...rule.paths ?? []].join(" ").toLowerCase().includes(query));
  const overrides = draftPolicy.secret_protection.overrides;
  const disabled = !draftPolicy.secret_protection.enabled;
  const disabledCount = state.secretPatterns.filter((rule) => !secretRuleIsActive(rule, overrides)).length;
  qs("secret-summary").textContent = disabled ? "Protection disabled. Saved rule settings and deny paths are preserved." : \`\${state.secretPatterns.length - disabledCount} active, \${disabledCount} disabled\`;
  qs("secret-patterns").innerHTML = rules.length === 0 ? '<p class="empty">No secret protections match the search.</p>' : groupRules(rules).map((group) => {
    const expanded = secretGroupExpanded.get(group.category) || searchActive && !searchCollapsedSecretGroups.has(group.category);
    const contentId = \`secret-group-\${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`;
    const allGroupRules = loaded.secretPatterns.filter((rule) => rule.category === group.category);
    const onCount = disabled ? 0 : allGroupRules.filter((rule) => secretRuleIsActive(rule, overrides)).length;
    return \`
      <section class="rule-tier">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-secret-group-toggle="\${escapeHtml(group.category)}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${escapeHtml(group.category)}</strong></span>
            <span class="tier-counts">\${tierCountHtml([
      [onCount, "on"],
      [allGroupRules.length - onCount, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-secret-group-active="\${escapeHtml(group.category)}" \${checkbox(allGroupRules.some((rule) => secretRuleIsActive(rule, overrides)))} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${group.category} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
        <div class="grid">\${group.rules.map((rule) => {
      const active = secretRuleIsActive(rule, overrides);
      const ruleState = active && !disabled ? { label: "Active", className: "state-active" } : { label: "Disabled", className: "state-disabled" };
      const control = \`<input type="checkbox" data-secret-active="\${escapeHtml(rule.id)}" \${checkbox(active)} \${disabled ? "disabled" : ""}>
            <span>
              <strong>\${escapeHtml(rule.label)}</strong>
              <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
              <small><span class="\${ruleState.className}">\${ruleState.label}</span> \${escapeHtml(rule.description ?? "")}</small>
            </span>\`;
      const chip = projectFieldChip(\`secret_protection.overrides.\${rule.id}\`, true);
      if (!rule.paths) {
        return \`<label class="row \${disabled ? "row-disabled" : ""}">\${control}\${chip}</label>\`;
      }
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
            <label class="rule-control">\${control}</label>
            <button type="button" class="rule-example-button" data-secret-paths="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show protected paths for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
            \${chip}
          </div>\`;
    }).join("")}</div>
        </div>
      </section>
    \`;
  }).join("");
};
var presetName = () => safetyLevels[draftPolicy.safety.level][0];
var renderPresetStatus = () => {
  if (!preview)
    return;
  const customized = preview.counts.effectiveCustomizations > 0 || Object.entries(draftPolicy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key]);
  qs("safety-preset-status").textContent = customized ? \`\${presetName()} · Customized\` : "";
  qs("safety-preset-status").classList.toggle("customized", customized);
};
var renderSafety = () => {
  const environmentSources = preview ? [
    ...new Set(Object.values(preview.capabilities).filter((capability) => capability.source === "environment").flatMap((capability) => capability.sources.filter((source) => source.startsWith("env "))))
  ] : [];
  qs("environment-overrides").hidden = environmentSources.length === 0;
  qs("environment-overrides").textContent = environmentSources.length ? \`Environment-raised protection: \${environmentSources.join(", ")}\` : "";
  qs("safety-level").innerHTML = projectFieldLine("safety.level") + Object.entries(safetyLevels).map(([level, meta]) => \`<label class="row preset-\${level}"><input type="radio" name="safety-level" value="\${level}" \${checkbox(draftPolicy.safety.level === level)}><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span></label>\`).join("");
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs("safety-overrides").innerHTML = Object.entries(safetyOverrides).map(([key, meta]) => {
    const value = draftPolicy.safety.overrides[key];
    const inheritedText = inherited[key] ? "on" : "off";
    return \`<label class="row safety-override-row"><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span><select data-safety-override="\${key}">
      <option value="inherit" \${value === undefined ? "selected" : ""}>Inherit from preset (\${inheritedText})</option>
      <option value="true" \${value === true ? "selected" : ""}>Force on</option>
      <option value="false" \${value === false ? "selected" : ""}>Force off</option>
    </select>\${projectFieldChip(\`safety.overrides.\${key}\`, true)}</label>\`;
  }).join("");
  qs("workflow").innerHTML = \`<label class="row"><input type="checkbox" data-workflow-worktree \${checkbox(draftPolicy.workflow.worktree_mode)}><span><strong>Allow discarding local changes in linked git worktrees</strong><small>Only relaxes linked worktree discard checks.</small></span>\${projectFieldChip("workflow.worktree_mode")}</label>\`;
  renderPresetStatus();
};
var tierForRule = (rule) => {
  if (!rule.activationCapability)
    return "normal";
  return rule.activationCapability === "fail_closed" ? "strict" : "paranoid";
};
var tierMeta = {
  normal: ["Available in every preset", "No additional capability required"],
  strict: ["Strict tier", "Inherits from Fail closed"],
  paranoid: ["Paranoid tier", "Inherits from Paranoid rm or Paranoid interpreters"]
};
var ruleStateText = (rule, effective, capabilities) => {
  const capability = rule.activationCapability;
  if (effective.source === "master_disabled")
    return "Off — destructive-command protection disabled";
  if (effective.source === "rule_override")
    return \`\${effective.enabled ? "On" : "Off"} — user rule override\`;
  if (effective.source === "built_in_default")
    return "On — available in every preset";
  if (effective.source === "environment") {
    const sources = capability ? capabilities[capability]?.sources ?? [] : [];
    const source = [...sources].reverse().find((item) => item.startsWith("env "));
    return \`\${effective.enabled ? "On" : "Off"} — environment\${source ? \`; \${source.slice(4)}\` : ""}\`;
  }
  if (effective.source === "capability_override" && capability) {
    return \`\${effective.enabled ? "On" : "Off"} — capability override; \${safetyOverrides[capability][0]} forced \${effective.enabled ? "on" : "off"}\`;
  }
  if (effective.enabled)
    return \`On — \${presetName()} preset\`;
  return \`Off — \${presetName()} preset; requires \${tierForRule(rule) === "strict" ? "Strict" : "Paranoid"}\`;
};
var showRulePopover = (button, label, title, body) => {
  const popover = qs("rule-example-popover");
  qs("rule-example-label").textContent = label;
  qs("rule-example-title").textContent = title;
  qs("rule-example-command").textContent = body;
  if (!popover.matches(":popover-open"))
    popover.showPopover();
  const buttonRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const gap = 8;
  const edge = 12;
  const below = buttonRect.bottom + gap;
  const top = below + popoverRect.height <= window.innerHeight - edge ? below : Math.max(edge, buttonRect.top - gap - popoverRect.height);
  const left = Math.min(window.innerWidth - popoverRect.width - edge, Math.max(edge, buttonRect.right - popoverRect.width));
  popover.style.top = \`\${top}px\`;
  popover.style.left = \`\${left}px\`;
};
var openRuleExample = (button) => {
  const rule = state?.destructiveCommandRules.find((item) => item.id === button.dataset.ruleExample);
  if (!rule)
    return;
  showRulePopover(button, "Blocked command example", rule.label, rule.example);
};
var openSecretPaths = (button) => {
  const rule = state?.secretPatterns.find((item) => item.id === button.dataset.secretPaths);
  if (!rule?.paths)
    return;
  showRulePopover(button, "Protected paths", rule.label, rule.paths.join(\`
\`));
};
var renderDestructiveCommands = () => {
  if (!state || !preview)
    return;
  const loaded = state;
  const effectiveState = preview;
  const query = qs("policy-search").value.trim().toLowerCase();
  const matchingRules = state.destructiveCommandRules.filter((rule) => [rule.category, rule.label, rule.id, rule.description, tierMeta[tierForRule(rule)][0]].join(" ").toLowerCase().includes(query));
  qs("destructive-command-summary").textContent = draftPolicy.destructive_command_protection.enabled ? \`\${preview.counts.enabled} active, \${preview.counts.disabled} disabled\` : "Configurable protection disabled. Catastrophic protections remain active; saved rule settings and allow paths are preserved.";
  const enforcedRules = matchingRules.filter((rule) => rule.catastrophic);
  const configurableRules = matchingRules.filter((rule) => !rule.catastrophic);
  const enforcedExpanded = tierExpanded.get("enforced") || searchActive && !searchCollapsedTiers.has("enforced");
  const enforcedSection = enforcedRules.length === 0 ? "" : \`<section class="rule-tier rule-tier-enforced">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="enforced" aria-expanded="\${enforcedExpanded}" aria-controls="destructive-tier-enforced">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>Always enforced</strong><small>Cannot be disabled by any preset, rule override, or allow path</small></span>
            <span class="tier-counts">\${enforcedRules.length} protection\${enforcedRules.length === 1 ? "" : "s"}</span>
          </button>
        </div>
        <div id="destructive-tier-enforced" class="tier-content" \${enforcedExpanded ? "" : "hidden"}>
          \${groupRules(enforcedRules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => \`<div class="row rule-row">
                <span class="rule-control">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="state-active">Always enforced</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </span>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
              </div>\`).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  qs("destructive-command-rules").innerHTML = matchingRules.length === 0 ? '<p class="empty">No built-in protections match the search.</p>' : enforcedSection + Object.keys(tierMeta).map((tier) => {
    const rules = configurableRules.filter((rule) => tierForRule(rule) === tier);
    if (rules.length === 0)
      return "";
    const allTierRules = loaded.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === tier);
    const tierStates = allTierRules.flatMap((rule) => effectiveState.rules[rule.id] ?? []);
    const expanded = tierExpanded.get(tier) || searchActive && !searchCollapsedTiers.has(tier);
    const contentId = \`destructive-tier-\${tier}\`;
    return \`<section class="rule-tier rule-tier-\${tier}">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="\${tier}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${tierMeta[tier][0]}</strong><small>\${tierMeta[tier][1]}</small></span>
            <span class="tier-counts">\${tierCountHtml([
      [tierStates.filter((item) => item.enabled).length, "on"],
      [tierStates.filter((item) => !item.enabled).length, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-destructive-tier-active="\${tier}" \${checkbox(tierStates.some((item) => item.enabled))} \${!draftPolicy.destructive_command_protection.enabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${tierMeta[tier][0]} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
          \${groupRules(rules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => {
      const effective = effectiveState.rules[rule.id];
      if (!effective)
        return "";
      const override = draftPolicy.destructive_command_protection.overrides[rule.id];
      const status = ruleStateText(rule, effective, effectiveState.capabilities);
      const disabled = !draftPolicy.destructive_command_protection.enabled;
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
                <label class="rule-control">
                  <input type="checkbox" data-destructive-command-active="\${escapeHtml(rule.id)}" \${checkbox(effective.enabled)} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`\${rule.label}: \${status}\`)}">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="\${effective.enabled ? "state-active" : "state-disabled"}">\${escapeHtml(status)}</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </label>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
                \${override && !effective.changesInherited ? \`<button type="button" class="inherit-button" data-use-inherited="\${escapeHtml(rule.id)}">Use inherited setting</button>\` : ""}
                \${projectFieldChip(\`destructive_command_protection.overrides.\${rule.id}\`, true)}
              </div>\`;
    }).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  }).join("");
};
var refreshPolicyPreview = async () => {
  const requestId = ++previewRequestId;
  const result = await requestPolicyPreview(effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null));
  if (requestId !== previewRequestId)
    return false;
  if (!result.ok || !result.data?.preview) {
    setAppStatus("Preview failed", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  preview = result.data.preview;
  renderProtectionCard();
  renderSafety();
  renderDestructiveCommands();
  runCommandTest();
  return true;
};
var testerRequestId = 0;
var runCommandTest = async () => {
  const command = qs("tester-input").value.trim();
  if (!command) {
    qs("tester-result").hidden = true;
    return;
  }
  const requestId = ++testerRequestId;
  const result = await requestJson("/api/policy/explain", {
    method: "POST",
    body: JSON.stringify({
      command,
      policy: effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null)
    })
  });
  if (requestId !== testerRequestId)
    return;
  const el = qs("tester-result");
  el.hidden = false;
  if (!result.ok) {
    el.className = "status error";
    el.textContent = \`Could not evaluate: \${errorText(result)}\`;
    return;
  }
  if (result.data.result === "allowed") {
    el.className = "status ok";
    el.innerHTML = \`Allowed — no rule blocks this command under the current draft policy. <button type="button" class="feed-toggle" data-create-rule="\${escapeHtml(command)}">Create a rule for this</button>\`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleIdHtml = result.data.customRule ? \`<button type="button" class="rule-id" data-jump-custom-rule="\${escapeHtml(ruleId)}" title="Show this rule in Rules">\${escapeHtml(ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(ruleId)}</code>\`;
  const segment = result.data.segment && result.data.segment !== command ? \`<div class="tester-segment">Segment: <code>\${escapeHtml(result.data.segment)}</code></div>\` : "";
  el.className = "status error";
  el.innerHTML = \`Blocked\${ruleId ? \` by \${ruleIdHtml}\` : ""} — \${escapeHtml(result.data.reason || "")}\${segment}\`;
};
function render() {
  if (!state)
    return;
  draftPolicy = clonePolicy(state.policy);
  preview = state.preview;
  knownRuleIds = new Set([...state.destructiveCommandRules, ...state.secretPatterns].map((rule) => rule.id));
  dirty = false;
  qs("policy-savebar").hidden = true;
  qs("dirty-chip").hidden = true;
  qs("policy-path").textContent = state.path + (state.exists ? "" : " (not created yet)");
  const projectPolicy = state.projectPolicy;
  qs("project-policy-row").hidden = !projectPolicy;
  qs("project-policy-path").textContent = projectPolicy?.path ?? "";
  qs("project-policy-notice").hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs("project-policy-notice").textContent = projectPolicy ? ["Merged on top of this file:", ...projectPolicy.weakenings].join(\`
\`) : "";
  qs("app-version").textContent = state.version;
  renderSafety();
  qs("destructive-command").innerHTML = '<label class="row master"><input type="checkbox" data-destructive-command-enabled ' + checkbox(state.policy.destructive_command_protection.enabled) + '><span><strong>Destructive command protection</strong><small>Block configurable destructive git, filesystem, and execution patterns. Catastrophic and custom rules remain active when disabled.</small></span><span class="master-badge">' + (state.policy.destructive_command_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="destructive-enabled-chip"></span></label>' + '<div id="destructive-command-rules"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="allow-paths-label">Allow paths</strong><small>Recursive deletes targeting these paths are not blocked, like /tmp. The home directory, or any path containing it, is rejected.</small></span><span class="tier-counts" id="allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="allow-paths-content" hidden>' + '<p class="muted">Use an absolute path or a ~/ path. Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="allow-paths-input" data-path-input="allow-paths" autocomplete="off" spellcheck="false" placeholder="/absolute/path or ~/path" aria-labelledby="allow-paths-label"><button type="button" class="icon-button" id="allow-paths-add-button" data-path-add="allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="allow-paths-chip"></span>' + '<ul class="paths-list" id="allow-paths-list"></ul>' + "</div></section>";
  qs("secret").innerHTML = '<label class="row master"><input type="checkbox" id="secret-enabled" ' + checkbox(state.policy.secret_protection.enabled) + '><span><strong>Secret protection</strong><small>Block default sensitive paths, coding CLI credential locations, and configured deny paths.</small></span><span class="master-badge">' + (state.policy.secret_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="secret-enabled-chip"></span></label>' + '<div id="secret-patterns"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="deny-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="deny-paths-label">Deny paths</strong><small>Configured paths and everything inside them are blocked while Secret protection is on.</small></span><span class="tier-counts" id="deny-paths-count"></span></button>' + '<div class="tier-content paths-content" id="deny-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="deny-paths-input" data-path-input="deny-paths" autocomplete="off" spellcheck="false" placeholder="path/to/protect" aria-labelledby="deny-paths-label"><button type="button" class="icon-button" id="deny-paths-add-button" data-path-add="deny-paths" aria-label="Add deny path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="deny-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="deny-paths-chip"></span>' + '<ul class="paths-list" id="deny-paths-list"></ul>' + "</div></section>" + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="secret-allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="secret-allow-paths-label">Allow paths</strong><small>Exact files, subtrees, or one file name under a folder like ~/code/**/.env.local are exempt from pattern rules. Entries covering the home directory are rejected. Deny paths and coding CLI protections still apply.</small></span><span class="tier-counts" id="secret-allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="secret-allow-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="secret-allow-paths-input" data-path-input="secret-allow-paths" autocomplete="off" spellcheck="false" placeholder="~/code/**/.env.local or ~/project/fixtures" aria-labelledby="secret-allow-paths-label"><button type="button" class="icon-button" id="secret-allow-paths-add-button" data-path-add="secret-allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="secret-allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="secret-allow-paths-chip"></span>' + '<ul class="paths-list" id="secret-allow-paths-list"></ul>' + "</div></section>";
  qs("raw").value = state.errors.length ? state.raw : formatPolicy(draftPolicy);
  qs("policy-search").value = "";
  syncSearchState();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  updateRawSource();
  renderRetention(state);
  qs("recovery").hidden = state.errors.length === 0;
  updateActions();
  renderProtectionCard();
  if (state.errors.length) {
    if (currentView() !== "policy")
      location.hash = "policy";
    setAppStatus("Repair required", "error");
    setDetailStatus(\`Error: \${state.errors.join(\`
\`)}\`, "error");
    return;
  }
  setAppStatus("");
  setDetailStatus("");
}
var restoreDraft = () => {
  if (!state || state.errors.length)
    return;
  const stored = sessionStorage.getItem("cc-safety-net-draft");
  if (!stored)
    return;
  const parsed = (() => {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  })();
  const isRecordField = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
  const isOptionalPathList = (value) => value === undefined || Array.isArray(value) && value.every((item) => typeof item === "string");
  const isPolicyShape = isRecordField(parsed) && isRecordField(parsed.safety) && typeof parsed.safety.level === "string" && Object.hasOwn(safetyLevels, parsed.safety.level) && isRecordField(parsed.safety.overrides) && isRecordField(parsed.workflow) && isRecordField(parsed.destructive_command_protection) && isRecordField(parsed.destructive_command_protection.overrides) && isOptionalPathList(parsed.destructive_command_protection.allow_paths) && isRecordField(parsed.secret_protection) && isRecordField(parsed.secret_protection.overrides) && isOptionalPathList(parsed.secret_protection.deny_paths) && isOptionalPathList(parsed.secret_protection.allow_paths) && isRecordField(parsed.audit);
  if (!isPolicyShape || stored === JSON.stringify(state.policy)) {
    sessionStorage.removeItem("cc-safety-net-draft");
    return;
  }
  const draft = parsed;
  draft.destructive_command_protection.allow_paths ??= [];
  draft.secret_protection.deny_paths ??= [];
  draft.secret_protection.allow_paths ??= [];
  draftPolicy = draft;
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Restored unsaved draft", "ok");
};
function renderPolicySections() {
  const masterToggle = document.querySelector("[data-destructive-command-enabled]");
  if (masterToggle)
    masterToggle.checked = draftPolicy.destructive_command_protection.enabled;
  qs("secret-enabled").checked = draftPolicy.secret_protection.enabled;
  syncMasterBadges();
  renderSafety();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  syncRawFromForm();
  updateDirtyStatus();
}
async function load() {
  const result = await requestJson("/api/policy");
  if (!result.ok || !result.data) {
    setAppStatus("Load failed", "error");
    setDetailStatus(\`Error: Could not load policy: \${errorText(result)}\`, "error");
    return false;
  }
  state = result.data;
  render();
  restoreDraft();
  return true;
}
var targetInput = (event) => event.target instanceof HTMLInputElement ? event.target : null;
var targetElement = (event) => event.target instanceof Element ? event.target : null;
document.addEventListener("input", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "policy-search") {
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    return;
  }
  if (input.id === "activity-search" && activity) {
    if (clearCommandFilter())
      renderActivityControls();
    activityFilters.query = input.value.trim().toLowerCase();
    clearTimeout(activityQueryTimer);
    activityQueryTimer = setTimeout(renderActivityFeed, 120);
  }
});
document.addEventListener("keydown", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "tester-input" && event.key === "Enter") {
    event.preventDefault();
    runCommandTest();
    return;
  }
  const list = pathListFor(input.dataset.pathInput);
  if (!list || event.key !== "Enter")
    return;
  event.preventDefault();
  list.add(input.value);
});
document.addEventListener("paste", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  const list = pathListFor(input.dataset.pathInput);
  if (!list)
    return;
  const text = event.clipboardData?.getData("text") ?? "";
  if (!text.includes(\`
\`))
    return;
  event.preventDefault();
  list.add(\`\${input.value}
\${text}\`);
});
var writePolicy = async (path, body, failureStatus) => {
  const result = await requestJson(path, { method: "POST", body });
  if (isWriteSuccess(result))
    return result;
  setAppStatus(failureStatus, "error");
  setDetailStatus(\`Error: \${errorText(result)}\`, "error");
  return null;
};
var reloadAfterWrite = async () => {
  sessionStorage.removeItem("cc-safety-net-draft");
  if (!await load())
    return false;
  dirty = false;
  setDetailStatus("");
  return true;
};
var setProjectDraftDiagnostics = (messages) => {
  qs("project-draft-diagnostics").textContent = messages.join(\`
\`);
  qs("project-draft-diagnostics").hidden = messages.length === 0;
};
var renderProjectDraftBar = () => {
  qs("project-draft-enter").hidden = projectDraft !== null;
  qs("project-draft-bar").hidden = projectDraft === null;
  qs("save").textContent = projectDraft ? "Review & apply" : "Save";
  if (!projectDraft)
    return;
  qs("project-draft-path").textContent = projectDraft.path;
  qs("project-draft-change").hidden = !projectDraft.canPickDirectory;
};
var exitProjectDraft = () => {
  projectDraft = null;
  markedFields = new Set;
  setProjectDraftDiagnostics([]);
  if (state)
    draftPolicy = clonePolicy(state.policy);
  renderProjectDraftBar();
  renderPolicySections();
};
var ingestProjectState = async (okStatus) => {
  const result = await requestJson("/api/policy/project");
  if (!result.ok || !result.data) {
    setAppStatus("Project draft unavailable", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await load();
    setAppStatus("Repair required", "error");
    setDetailStatus([
      "Error: repair your user policy before drafting a project policy.",
      ...Array.isArray(result.data.userPolicyDiagnostics) ? result.data.userPolicyDiagnostics : []
    ].join(\`
\`), "error");
    return false;
  }
  projectDraft = {
    path: result.data.path,
    revision: result.data.revision,
    canPickDirectory: result.data.canPickDirectory === true,
    baseline: seeded.baseline,
    snapshot: seeded.snapshot
  };
  markedFields = seeded.marked;
  draftPolicy = seeded.policy;
  setProjectDraftDiagnostics(Array.isArray(result.data.projectionDiagnostics) ? result.data.projectionDiagnostics : []);
  renderProjectDraftBar();
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus(okStatus, "ok");
  return true;
};
var enterProjectDraft = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: repair your user policy before drafting a project policy.", "error");
    return;
  }
  if (dirty) {
    if (!await confirmDialog({
      title: "Discard unsaved policy changes?",
      body: "A project draft starts from your saved user policy. Save your changes first, or discard them here.",
      confirmLabel: "Discard changes",
      confirmClass: ""
    }))
      return;
    sessionStorage.removeItem("cc-safety-net-draft");
    if (!await load())
      return;
  }
  await ingestProjectState("Drafting a project policy.");
};
var confirmDiscardProjectDraft = async (body) => !dirty || await confirmDialog({
  title: "Discard this project draft?",
  body,
  confirmLabel: "Discard draft",
  confirmClass: ""
});
var changeProjectDirectory = async () => {
  if (!await confirmDiscardProjectDraft("Switching projects discards this draft."))
    return;
  const result = await requestJson("/api/policy/project/choose-directory", { method: "POST" });
  if (!result.ok) {
    setAppStatus("Could not open the folder picker", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return;
  }
  if (result.data.error) {
    setAppStatus(result.data.error, "error");
    return;
  }
  if (result.data.cancelled)
    return;
  await ingestProjectState("Drafting a project policy.");
};
var leaveProjectDraft = async () => {
  if (!await confirmDiscardProjectDraft("The fields you marked are not written anywhere yet."))
    return;
  exitProjectDraft();
  if (await load())
    setAppStatus("Left the project draft.", "ok");
};
var discardProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  if (!await confirmDialog({
    title: "Discard changes to this draft?",
    body: "The draft returns to the fields this project already sets.",
    confirmLabel: "Discard changes",
    confirmClass: ""
  }))
    return;
  const snapshot = JSON.parse(draft.snapshot);
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Changes discarded.", "ok");
};
var handleStaleProjectDraft = async () => {
  if (!await ingestProjectState("Project draft reloaded."))
    return;
  setAppStatus("Project target changed", "error");
  setDetailStatus("Error: the project directory changed, so this draft was reloaded for the new target. Review it again before applying.", "error");
};
var projectDiffHtml = (data) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...data.existingFileDiagnostics?.length ? ["The existing project policy file is invalid and will be replaced."] : [],
    ...data.weakenings ?? []
  ];
  const table = rows.length === 0 ? '<p class="empty">No change to the effective policy.</p>' : \`<table class="diff-table"><thead><tr><th>Setting</th><th>Now</th><th>After</th></tr></thead><tbody>\${rows.map((row) => \`<tr><td><code>\${escapeHtml(row.field)}</code></td><td class="diff-before">\${escapeHtml(row.before ?? "(unset)")}</td><td class="diff-after">\${escapeHtml(row.after ?? "(unset)")}</td></tr>\`).join("")}</tbody></table>\`;
  return table + warnings.map((text) => \`<p class="diff-warning">\${escapeHtml(text)}</p>\`).join("");
};
var reviewProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  const proposal = collectProjectProposal(markedFields, draftPolicy);
  const serialized = JSON.stringify(proposal);
  const body = JSON.stringify({ revision: draft.revision, proposal });
  const diff = await requestJson("/api/policy/project/diff", { method: "POST", body });
  if (projectDraft !== draft)
    return;
  if (diff.status === 409) {
    await handleStaleProjectDraft();
    return;
  }
  if (!diff.ok) {
    setAppStatus("Review failed", "error");
    setDetailStatus(\`Error: \${errorText(diff)}\`, "error");
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    setAppStatus("Review again", "error");
    setDetailStatus("Error: the draft changed while the review was loading. Review it again.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Apply this project policy?",
    body: "Everyone who works in this project gets these changes on top of their own user policy.",
    detail: draft.path,
    rowsHtml: projectDiffHtml(diff.data),
    confirmLabel: "Apply project policy",
    confirmClass: "primary"
  }))
    return;
  await runExclusive("Applying...", async () => {
    const applied = await requestJson("/api/policy/project/apply", { method: "POST", body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      setAppStatus("Apply failed", "error");
      setDetailStatus(\`Error: \${errorText(applied)}\`, "error");
      return;
    }
    const path = applied.data.path;
    exitProjectDraft();
    if (await load())
      setAppStatus(\`Applied \${path}.\`, "ok");
  });
};
var saveRetentionDays = async (days) => {
  const saved = state;
  if (!saved)
    return;
  const current = saved.policy.audit.retention_days;
  if (!Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus(\`Error: retention must be a whole number of days from \${MIN_AUDIT_RETENTION_DAYS} to \${MAX_AUDIT_RETENTION_DAYS}.\`, "error");
    return;
  }
  if (days === current)
    return;
  if (projectDraft) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (dirty) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: save or discard your unsaved Policy changes first.", "error");
    return;
  }
  if (days < current && !await confirmDialog({
    title: \`Shorten retention to \${dayCount(days)}?\`,
    body: \`Audit entries older than \${dayCount(days)} are deleted on the next sweep and cannot be recovered. The Activity tab will only look back \${dayCount(days)}.\`,
    detail: overview?.logsDir ?? "",
    confirmLabel: "Shorten",
    confirmClass: "danger"
  })) {
    qs("retention-days").value = String(current);
    return;
  }
  await runExclusive("Saving...", async () => {
    const policy = clonePolicy(saved.policy);
    policy.audit.retention_days = days;
    if (!await writePolicy("/api/policy", JSON.stringify(policy), "Save failed")) {
      qs("retention-days").value = String(current);
      return;
    }
    if (!await load())
      return;
    activityFilters.days = Math.min(activityFilters.days, days);
    await Promise.all([loadOverview(), loadActivity()]);
    setAppStatus(\`Retention set to \${dayCount(days)}.\`, "ok");
    setDetailStatus("");
  });
};
document.addEventListener("change", (event) => {
  const control = event.target;
  if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement))
    return;
  if (control.id === "activity-days") {
    activityFilters.days = Number(control.value);
    loadActivity();
    return;
  }
  if (control.id === "retention-days") {
    saveRetentionDays(Number(control.value));
    return;
  }
  if (control.name === "safety-level") {
    draftPolicy.safety.level = control.value;
    markProjectField("safety.level");
    renderSafety();
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (control.dataset?.safetyOverride) {
    if (control.value === "inherit" && !projectDraft)
      delete draftPolicy.safety.overrides[control.dataset.safetyOverride];
    if (control.value === "true")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = true;
    if (control.value === "false")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = false;
    if (control.value === "inherit")
      unmarkProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    if (control.value !== "inherit")
      markProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  const input = control instanceof HTMLInputElement ? control : null;
  if (!input)
    return;
  if ("workflowWorktree" in input.dataset) {
    draftPolicy.workflow.worktree_mode = input.checked;
    markProjectField("workflow.worktree_mode");
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if ("destructiveCommandEnabled" in input.dataset) {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable destructive command protection?",
        body: "Built-in destructive git, filesystem, and execution protections will stop blocking commands until you turn this back on.",
        detail: "Custom rules remain active."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.destructive_command_protection.enabled = input.checked;
      markProjectField("destructive_command_protection.enabled");
      syncMasterBadges();
      pathLists["allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (input.dataset?.destructiveTierActive) {
    const effectiveState = preview;
    if (!effectiveState)
      return;
    state?.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === input.dataset.destructiveTierActive).forEach((rule) => {
      setDestructiveOverride(rule.id, input.checked, effectiveState.rules[rule.id]?.inheritedEnabled);
    });
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.destructiveCommandActive) {
    const ruleId = input.dataset.destructiveCommandActive;
    setDestructiveOverride(ruleId, input.checked, preview?.rules[ruleId]?.inheritedEnabled);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.secretGroupActive) {
    state?.secretPatterns.filter((rule) => rule.category === input.dataset.secretGroupActive).forEach((rule) => {
      setSecretOverride(rule, input.checked);
    });
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.dataset?.secretActive) {
    const rule = state?.secretPatterns.find((item) => item.id === input.dataset.secretActive);
    if (!rule)
      return;
    setSecretOverride(rule, input.checked);
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.id === "secret-enabled") {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable secret protection?",
        body: "Default sensitive paths, coding CLI credential locations, and deny paths will stop blocking access until you turn this back on."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.secret_protection.enabled = input.checked;
      markProjectField("secret_protection.enabled");
      syncMasterBadges();
      renderSecretPatterns();
      pathLists["deny-paths"].render();
      pathLists["secret-allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
    })();
  }
});
document.addEventListener("click", (event) => {
  const target = targetElement(event);
  if (!target)
    return;
  if (target.closest("#tester-run")) {
    runCommandTest();
    return;
  }
  if (target.closest("#project-draft-enter")) {
    enterProjectDraft();
    return;
  }
  if (target.closest("#project-draft-change")) {
    changeProjectDirectory();
    return;
  }
  if (target.closest("#project-draft-exit")) {
    leaveProjectDraft();
    return;
  }
  const unmarkButton = target.closest("[data-unmark-field]");
  if (unmarkButton) {
    unmarkProjectField(unmarkButton.dataset.unmarkField ?? "");
    return;
  }
  const createRule = target.closest("[data-create-rule]");
  if (createRule) {
    openRuleComposer(createRule.dataset.createRule ?? "");
    return;
  }
  const feedToggle = target.closest("[data-feed-toggle]");
  if (feedToggle) {
    const command = feedToggle.previousElementSibling;
    if (!command)
      return;
    const expanded = command.classList.toggle("expanded");
    feedToggle.setAttribute("aria-expanded", String(expanded));
    feedToggle.textContent = expanded ? "Show less" : "Show more";
    return;
  }
  const feedCopy = target.closest("[data-log-copy]");
  if (feedCopy) {
    copyFeedEntry(feedCopy);
    return;
  }
  const feedReport = target.closest("[data-report-fp]");
  if (feedReport) {
    openReportDialog(feedReport);
    return;
  }
  const blockFuture = target.closest("[data-block-future]");
  if (blockFuture) {
    const entry = renderedFeedEntries[Number(blockFuture.dataset.blockFuture)];
    if (entry?.segment || entry?.command)
      openRuleComposer(entry.segment || entry.command || "");
    return;
  }
  const topRule = target.closest(".top-rule");
  if (topRule) {
    const ruleId = topRule.dataset.ruleId ?? "";
    (ruleId.startsWith("custom.") ? jumpToRulesRule : jumpToActivityRule)(ruleId);
    return;
  }
  const ruleActivity = target.closest("[data-rule-activity]");
  if (ruleActivity) {
    jumpToActivityRule(ruleActivity.dataset.ruleActivity ?? "");
    return;
  }
  const jumpRule = target.closest("[data-jump-rule]");
  if (jumpRule) {
    qs("policy-search").value = jumpRule.dataset.jumpRule ?? "";
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    location.hash = "policy";
    return;
  }
  const jumpCustom = target.closest("[data-jump-custom-rule]");
  if (jumpCustom) {
    jumpToRulesRule(jumpCustom.dataset.jumpCustomRule ?? "");
    return;
  }
  const topCommand = target.closest(".top-command");
  if (topCommand) {
    activityFilters.command = topCommand.dataset.command ?? "";
    activityFilters.decision = "deny";
    activityFilters.query = "";
    qs("activity-search").value = "";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  if (target.closest("[data-clear-command]")) {
    clearCommandFilter();
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#guard-errors")) {
    clearCommandFilter();
    activityFilters.decision = "error";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  const chip = target.closest("[data-activity-chip]");
  if (chip && activity) {
    clearCommandFilter();
    activityFilters[chip.dataset.activityChip] = chip.dataset.chipValue ?? "";
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#activity-refresh")) {
    refreshActivity();
    return;
  }
  if (target.closest("#integrations-refresh")) {
    refreshIntegrations();
    return;
  }
  if (target.closest("#rules-refresh")) {
    refreshRules();
    return;
  }
  const scopeChip = target.closest("[data-rules-scope]");
  if (scopeChip) {
    setRulesScope(scopeChip.dataset.rulesScope ?? "");
    return;
  }
  const exampleChip = target.closest("[data-rules-example]");
  if (exampleChip) {
    qs("rules-composer-input").value = exampleChip.dataset.rulesExample ?? "";
    return;
  }
  if (target.closest("#rules-choose-directory")) {
    chooseProjectDirectory();
    return;
  }
  if (target.closest("#rules-copy-prompt")) {
    copyRulePrompt();
    return;
  }
  const integrationButton = target.closest("[data-integration-action]");
  if (integrationButton) {
    runIntegrationAction(integrationButton);
    return;
  }
  const ruleExampleButton = target.closest("[data-rule-example]");
  if (ruleExampleButton) {
    openRuleExample(ruleExampleButton);
    return;
  }
  const secretPathsButton = target.closest("[data-secret-paths]");
  if (secretPathsButton) {
    openSecretPaths(secretPathsButton);
    return;
  }
  const tierButton = target.closest("[data-tier-toggle]");
  if (tierButton) {
    const tier = tierButton.dataset.tierToggle ?? "";
    const expanded = tierButton.getAttribute("aria-expanded") === "true";
    tierExpanded.set(tier, !expanded);
    if (searchActive && expanded)
      searchCollapsedTiers.add(tier);
    if (!expanded)
      searchCollapsedTiers.delete(tier);
    renderDestructiveCommands();
    return;
  }
  const secretGroupButton = target.closest("[data-secret-group-toggle]");
  if (secretGroupButton) {
    const category = secretGroupButton.dataset.secretGroupToggle ?? "";
    const expanded = secretGroupButton.getAttribute("aria-expanded") === "true";
    secretGroupExpanded.set(category, !expanded);
    if (searchActive && expanded)
      searchCollapsedSecretGroups.add(category);
    if (!expanded)
      searchCollapsedSecretGroups.delete(category);
    renderSecretPatterns();
    return;
  }
  if (target.closest("[data-secret-group-active], [data-destructive-tier-active]"))
    return;
  const button = target.closest(".panel-toggle, .rule-tier-head");
  if (button) {
    togglePanel(button);
    return;
  }
  const inheritedButton = target.closest("[data-use-inherited]");
  if (inheritedButton) {
    const ruleId = inheritedButton.dataset.useInherited ?? "";
    if (projectDraft) {
      unmarkProjectField(\`destructive_command_protection.overrides.\${ruleId}\`);
      return;
    }
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (target.closest("#reset-rule-customizations")) {
    if (Object.keys(draftPolicy.destructive_command_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in destructive-command rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("destructive_command_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.destructive_command_protection.overrides = {};
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#reset-secret-customizations")) {
    if (Object.keys(draftPolicy.secret_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in secret rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("secret_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.secret_protection.overrides = {};
      renderSecretPatterns();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#discard-changes")) {
    if (projectDraft) {
      discardProjectDraft();
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Discard unsaved changes?",
        body: "All changes since your last save will be reverted.",
        confirmLabel: "Discard changes",
        confirmClass: ""
      }))
        return;
      runExclusive("Discarding...", async () => {
        sessionStorage.removeItem("cc-safety-net-draft");
        if (await load())
          setAppStatus("Changes discarded.", "ok");
      });
    })();
    return;
  }
  const addButton = target.closest("[data-path-add]");
  if (addButton) {
    const list = pathListFor(addButton.dataset.pathAdd);
    if (list)
      list.add(qs(\`\${addButton.dataset.pathAdd}-input\`).value);
    return;
  }
  const removeButton = target.closest("[data-path-remove]");
  if (removeButton)
    pathListFor(removeButton.dataset.pathList)?.remove(Number(removeButton.dataset.pathRemove));
  const starButton = target.closest(".star-cta");
  if (starButton instanceof HTMLButtonElement) {
    starRepo(starButton);
    return;
  }
});
qs("dirty-chip").onclick = () => {
  location.hash = "policy";
};
qs("save").onclick = () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: Repair policy before saving changes.", "error");
    return;
  }
  if (projectDraft) {
    reviewProjectDraft();
    return;
  }
  if (!dirty) {
    setAppStatus("No changes to save", "ok");
    setDetailStatus("");
    return;
  }
  const policy = collectFormPolicy();
  runExclusive("Saving...", async () => {
    const result = await writePolicy("/api/policy", JSON.stringify(policy), "Save failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Saved \${result.data.path}.\`, "ok");
  });
};
qs("repair").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length === 0) {
    setAppStatus("");
    setDetailStatus("");
    return;
  }
  if (!await confirmDialog({
    title: "Repair policy?",
    body: "This will write canonical policy JSON. Valid settings are preserved; invalid fields are discarded. If the JSON cannot be parsed, defaults are restored.",
    detail: state.path,
    confirmLabel: "Repair",
    confirmClass: "primary"
  })) {
    return;
  }
  runExclusive("Repairing...", async () => {
    const result = await writePolicy("/api/repair", "{}", "Repair failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Repaired \${result.data.path}.\`, "ok");
  });
};
qs("reset").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (projectDraft) {
    setAppStatus("Reset unavailable", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Reset policy?",
    body: "This will restore the default policy JSON at this path.",
    detail: state.path,
    confirmLabel: "Reset policy"
  })) {
    return;
  }
  runExclusive("Resetting...", async () => {
    const result = await writePolicy("/api/reset", "{}", "Reset failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Reset \${result.data.path} to defaults.\`, "ok");
  });
};
setRawCopyCopied(false);
qs("raw-copy").onclick = () => {
  copyRawToClipboard();
};
var themeOrder = ["auto", "light", "dark"];
var themeIcons = {
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"></rect><path d="M8 20h8M12 16v4"></path></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"></path></svg>',
  dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>'
};
var themeLabels = { auto: "Auto", light: "Light", dark: "Dark" };
var applyTheme = (pref) => {
  document.documentElement.style.colorScheme = pref === "auto" ? "light dark" : pref;
  qs("theme-toggle").innerHTML = \`\${themeIcons[pref]}<span>\${themeLabels[pref]}</span>\`;
  qs("theme-toggle").setAttribute("aria-label", \`Color theme: \${themeLabels[pref]}. Click to change.\`);
};
var themePref = themeOrder.includes(localStorage.getItem("cc-safety-net-theme")) ? localStorage.getItem("cc-safety-net-theme") : "auto";
applyTheme(themePref);
qs("theme-toggle").onclick = () => {
  themePref = themeOrder[(themeOrder.indexOf(themePref) + 1) % themeOrder.length] ?? "auto";
  if (themePref === "auto")
    localStorage.removeItem("cc-safety-net-theme");
  else
    localStorage.setItem("cc-safety-net-theme", themePref);
  applyTheme(themePref);
};
window.addEventListener("beforeunload", (event) => {
  if (!dirty)
    return;
  event.preventDefault();
  event.returnValue = "";
});
window.addEventListener("hashchange", applyView);
applyView();
Promise.all([loadIntegrations(), requestJson("/api/health")]).then(([, health]) => renderHealthStrip(health));
load().then((loaded) => {
  if (loaded)
    loadStarContext();
  activityFilters.days = Math.min(activityFilters.days, retentionDays());
  loadOverview();
  loadActivity();
}).catch((error) => {
  setAppStatus("Load failed", "error");
  setDetailStatus(String(error), "error");
});

  </script>
</body>
</html>
`;var qs='<script id="ccsn-data" type="application/json">';function Us(a){return Hs.replace(qs,()=>qs+JSON.stringify({token:a}).replaceAll("<","\\u003c"))}var fd=7,md="The project draft directory changed; reload the draft before applying.",gd="audit settings are user scope only; remove the audit section from a project proposal";async function zs(a,g={}){let y=dt({label:"gui",booleans:{noOpen:["--no-open"]}},a),L=g.log??console.log,F=g.error??console.error;if(y.errors.length>0){for(let J of y.errors)F(J);return F("Usage: cc-safety-net gui [--no-open]"),1}let N=await hd(l,g);if(L(`CC Safety Net policy GUI: ${N.url}`),!y.flags.noOpen)try{await(g.openBrowser??Cd)(N.url)}catch(J){F(`Failed to open browser: ${J instanceof Error?J.message:String(J)}`),F(`Open this URL manually: ${N.url}`)}if(g.keepAlive===!1)return await N.close(),0;return await Dd(N),0}async function hd(a,g={}){let y=dd(24).toString("base64url"),L={dir:null,revision:0},F=pd((ne,de)=>{yd(a,ne,de,y,g,L)});await new Promise((ne,de)=>{F.once("error",de),F.listen(0,"127.0.0.1",()=>{F.off("error",de),ne()})});let J=`http://127.0.0.1:${F.address().port}`;return{origin:J,token:y,url:`${J}/?token=${encodeURIComponent(y)}`,close:()=>Rd(F)}}async function yd(a,g,y,L,F,N){let J=a(),ne=new URL(g.url??"/","http://127.0.0.1");if(g.method==="GET"&&ne.pathname==="/favicon.ico"){y.writeHead(204,{"cache-control":"no-store"}),y.end();return}if(!xd(g,ne,L)){ot(y,403,{error:"Forbidden"});return}if(g.method==="GET"&&ne.pathname==="/"){Sd(y,Us(L));return}if(g.method==="GET"&&ne.pathname==="/api/policy"){let de=Go(J,F),ue=A(J,ur(F));ot(y,200,{...de,configState:Be(ue),...ue.policyScopes?{projectPolicy:{path:x(F.cwd??process.cwd()),weakenings:ue.policyScopes.weakenings}}:{},destructiveCommandRules:G,secretPatterns:tt,version:Mt(),preview:de.errors.length>0?null:je(de.policy,J.env)});return}if(g.method==="POST"&&ne.pathname==="/api/policy/preview"){let de=await Dn(g);if(!de.ok){ot(y,de.status,{errors:[de.error]});return}let ue=zo(J,de.value);ot(y,ue.errors.length>0?400:200,ue);return}if(g.method==="POST"&&ne.pathname==="/api/policy/explain"){let de=await Dn(g);if(!de.ok){ot(y,de.status,{errors:[de.error]});return}let ue=de.value;if(ue===null||typeof ue.command!=="string"){ot(y,400,{errors:["command must be a string"]});return}let ye=Gt(ue.policy,J.home);if(ye.length>0){ot(y,400,{errors:ye});return}ot(y,200,Ld(J,ue.command,ue.policy,F));return}if(g.method==="POST"&&ne.pathname==="/api/policy"){let de=await Dn(g);if(!de.ok){ot(y,de.status,{errors:[de.error]});return}let ue=xt(J,de.value,F);ot(y,ue.errors.length>0?400:200,ue);return}if(g.method==="POST"&&ne.pathname==="/api/reset"){ot(y,200,xt(J,X,F));return}if(g.method==="POST"&&ne.pathname==="/api/repair"){ot(y,200,Vo(J,F));return}if(g.method==="POST"&&ne.pathname==="/api/policy/project/choose-directory"){let de=await(F.chooseDirectory??dr)();if("path"in de)N.dir=de.path,N.revision+=1;ot(y,200,{cancelled:"cancelled"in de,..."error"in de?{error:de.error}:{}});return}if(g.method==="GET"&&ne.pathname==="/api/policy/project"){let de=Vs(N,F),ue=Bs(de,J.home),ye=zt(J,F);ot(y,200,{path:x(de),revision:N.revision,baseline:ye.baseline,userPolicyDiagnostics:ye.diagnostics,projection:ue.projection,projectionDiagnostics:ue.diagnostics,canPickDirectory:cr(process.platform,process.env)});return}if(g.method==="POST"&&ne.pathname==="/api/policy/project/diff"){let de=await Gs(J,g,y,N,F);if(!de)return;let ue=Bs(de.dir,J.home),ye=zt(J,F).baseline,Se=Z(ye,ae(de.proposal,J.home).policy);ot(y,200,{rows:pn(Z(ye,ue.projection).policy,Se.policy,!1),weakenings:Se.weakenings,existingFileDiagnostics:ue.diagnostics});return}if(g.method==="POST"&&ne.pathname==="/api/policy/project/apply"){let de=await Gs(J,g,y,N,F);if(!de)return;let ue=bd(de.dir,de.proposal,J.home);ot(y,ue.errors.length>0?500:200,ue);return}if(g.method==="GET"&&ne.pathname==="/api/activity"){let de=re(J,F),ue=wd(ne.searchParams.get("days"),de);if(ue===null){ot(y,400,{error:`days must be an integer between 1 and ${de}`});return}ot(y,200,Os(J,ue,F.activityLogsDir));return}if(g.method==="POST"&&ne.pathname==="/api/rules/choose-directory"){ot(y,200,await dr());return}if(g.method==="GET"&&ne.pathname==="/api/rules"){let de=Y(J,ur(F)),ue=new Map(de.rules.map((ye)=>[ye.name,ye]));ot(y,200,{projectPath:F.cwd??process.cwd(),canPickDirectory:cr(process.platform,process.env),rulebooks:de.rulebooks.map((ye)=>({source:ye.source,spec:ye.spec,name:ye.name,version:ye.version,rules:ye.rules.flatMap((Se)=>{let ke=ue.get(Se);if(!ke)return[];return[{name:ke.name,command:ke.command,subcommand:ke.subcommand,block_args:ke.block_args,reason:ke.reason}]})})),errors:de.errors,warnings:de.warnings});return}if(g.method==="GET"&&ne.pathname==="/api/star/context"){ot(y,200,await(F.fetchStarContext??(()=>Ad(J,{logsDir:F.activityLogsDir})))());return}if(g.method==="GET"&&ne.pathname==="/api/integrations"){ot(y,200,await(F.fetchIntegrations??(()=>Pd(J)))());return}if(g.method==="GET"&&ne.pathname==="/api/health"){ot(y,200,await(F.fetchHealth??$d)());return}ot(y,404,{error:"Not found"})}function ur(a){return{...a,cwd:a.cwd??process.cwd()}}function Vs(a,g){return a.dir??g.cwd??process.cwd()}function Bs(a,g){let y=x(a),L=ud(y)?Ft(y):{value:void 0,errors:[]},F=ae(L.value,g);return{projection:F.policy,diagnostics:[...L.errors,...F.diagnostics]}}async function Gs(a,g,y,L,F){let N=Vs(L,F),J=L.revision,ne=await Dn(g);if(!ne.ok)return ot(y,ne.status,{errors:[ne.error]}),null;let de=ne.value;if(typeof de?.revision!=="number")return ot(y,400,{errors:["revision must be a number"]}),null;if(de.revision!==J)return ot(y,409,{errors:[md]}),null;let ue=vd(de.proposal,a.home);if(ue.length>0)return ot(y,400,{errors:ue}),null;return{dir:N,proposal:de.proposal}}function vd(a,g){let y=Gt(a,g);if(y.length>0)return y;return a?.audit===void 0?[]:[gd]}function bd(a,g,y){let L=x(a),F=fn(g,P(g,y));try{return h(o(w(a,"project policy"),L),`${JSON.stringify(F,null,2)}
`),{path:L,errors:[]}}catch(N){return{path:L,errors:[N instanceof Error?N.message:String(N)]}}}function Ld(a,g,y,L){let F=P(y,a.home),N=A(a,ur(L)),J=Le({rules:N.policy.rules,transparentWrappers:N.policy.transparentWrappers,safety:We(F.safety),worktreeMode:F.workflow.worktree_mode,destructiveCommandProtectionEnabled:F.destructive_command_protection.enabled,destructiveCommandRuleOverrides:F.destructive_command_protection.overrides,destructiveCommandAllowPaths:F.destructive_command_protection.allow_paths,secretProtection:{enabled:F.secret_protection.enabled,disabledRules:Ge(F.secret_protection.overrides),denyPaths:F.secret_protection.deny_paths,allowPaths:F.secret_protection.allow_paths}});return Bt(g,{policySnapshot:J,cwd:L.cwd,userConfigDir:L.userConfigDir},a)}function wd(a,g){if(a===null)return Math.min(fd,g);let y=Number(a);if(!Number.isInteger(y)||y<1||y>g)return null;return y}function xd(a,g,y){if(g.searchParams.get("token")!==y)return!1;if(a.method!=="POST")return!0;return a.headers["x-cc-safety-net-token"]===y}var kd=1048576;async function Dn(a){let g=[],y=0;for await(let L of a){let F=L;if(y+=F.byteLength,y>kd)return{ok:!1,status:413,error:"Request body is too large"};g.push(F)}try{return{ok:!0,value:JSON.parse(Buffer.concat(g).toString("utf-8")||"{}")}}catch(L){return{ok:!1,status:400,error:`Invalid JSON: ${L instanceof Error?L.message:String(L)}`}}}function Sd(a,g){a.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),a.end(g)}function ot(a,g,y){a.writeHead(g,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),a.end(JSON.stringify(y))}function Rd(a){return new Promise((g,y)=>{a.close((L)=>L?y(L):g())})}function Dd(a){return new Promise((g)=>{let y=()=>{process.off("SIGINT",L),process.off("SIGTERM",L)},L=()=>{y(),a.close().then(g)};process.once("SIGINT",L),process.once("SIGTERM",L)})}function Cd(a){let g=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",y=process.platform==="win32"?["/c","start","",a]:[a];return new Promise((L,F)=>{let N=cd(g,y,{detached:!0,stdio:"ignore"}),J=(de)=>{N.off("spawn",ne),F(de)},ne=()=>{N.off("error",J),N.unref(),L()};N.once("error",J),N.once("spawn",ne)})}async function Pd(a,g={}){let y=await sn((F)=>Ht({environment:a,cwd:process.cwd(),openCodeVersion:F}).status!=="n/a",g.fetcher),L=Ed(a,y);return{targets:tn.map((F)=>{let N=L.find((J)=>J.platform===F.id);return{target:F.id,label:Ct(F.id),version:y.versions[F.id]??null,status:N?.configured?"active":N?.detected?"disabled":N?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:y.version,nodeVersion:y.nodeVersion,platform:y.platform}}}function Ed(a,g){return dn(a,process.cwd(),{openCodeVersion:g.versions.opencode,openCodePluginListOutput:g.openCodePluginListOutput})}async function $d(a={}){let g=await(a.checkUpdates??an)();return{update:{latestVersion:g.latestVersion??null,updateAvailable:g.updateAvailable}}}function Ad(a,g={}){return Promise.resolve({starred:!0,starCount:null,blockedTotal:Xt(a,re(a),g.logsDir).totalBlocked})}function _d(a){if(a[0]!=="help")return!1;let g=a[1];if(!g)Xn(),process.exit(0);if(Qn(g))process.exit(0);console.error(`Unknown command: ${g}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var jd={rule:async(a)=>{process.exit(await js(l(),a))},policy:async(a)=>{process.exit(await Ko(l(),a))},status:async(a)=>{if(Rt(dt({label:"status"},a).errors))process.exit(1);Fs(l())},doctor:async(a)=>{let g=Gn(a);if(!g)process.exit(1);let y=await Ro(l(),{json:g.json,skipUpdateCheck:g.skipUpdateCheck});process.exit(y)},logs:async(a)=>{process.exit(await br(l(),a))},gui:async(a)=>{process.exit(await zs(a))},explain:async(a)=>{process.exit(await Oo(l(),a))}};async function Td(a){le(l());let g=dt({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},a);if(_d(a))return;let y=a[0],L=y?Zt(y):void 0;if(g.help&&L&&L.name!=="rule")Qn(L.name),process.exit(0);if(!y||g.help&&!L)Xn(),process.exit(0);if(g.flags.version)Mo(),process.exit(0);if(L){await jd[L.name](a.slice(1));return}console.error(y.startsWith("-")?`Unknown option: ${y}`:`Unknown command: ${y}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{Td as runCli};
