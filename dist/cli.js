import{a,s,be,Oe,C,qe,Fe,d,i,Me,T,me,Je,g,b,r,v,o,Y,n,p,oe,I,Ye,Ze,c,ie,se,Xe,_,W,Z,S,Qe,D,h,ge,O,l,B,Ne,$e,P,w,E,ae,ce,we,et,u,e,Ce,he,je,Ue,X,ye,Q,Ee,z,F,Le,le,M,Ge,ee,H,V,te,We,Be,L,N,Re,Te,_e,R,Pe,xe,Ae,f,t,q,ue,m,y,k,tt,Ie,De,x,j}from"./chunks/index-c6v5bnt6.js";import{J,U,A,pe}from"./chunks/index-3kfckckx.js";var Us=["-h","--help"];function gt(G,K){let ne=Object.entries(G.booleans??{}),re=Object.entries(G.values??{}),de=Object.entries(G.lists??{}),fe=Object.fromEntries(ne.map(([Ke])=>[Ke,!1])),ve={},ke=Object.fromEntries(de.map(([Ke])=>[Ke,[]])),Se=[],He=[],Ve=!1,nt=-1;for(let[Ke,it]of K.entries()){if(Ke<=nt)continue;if(it==="--"){Se.push(...K.slice(Ke+1));break}if(Us.includes(it)){Ve=!0;continue}let ze=ne.find(([,rt])=>rt.includes(it));if(ze){fe[ze[0]]=!0;continue}let ot=re.find(([,rt])=>rt.includes(it));if(ot){let rt=K[Ke+1];if(rt===void 0||rt.startsWith("-")){He.push(`${it} requires a value`);continue}ve[ot[0]]=rt,nt=Ke+1;continue}let st=de.find(([,rt])=>rt.includes(it));if(st){let rt=K.slice(Ke+1),ct=rt.findIndex((pt)=>pt.startsWith("-")),dt=rt.slice(0,ct===-1?rt.length:ct);if(dt.length===0){He.push(`${it} requires at least one value`);continue}ke[st[0]]=[...ke[st[0]]??[],...dt],nt=Ke+dt.length;continue}if(it.startsWith("-")){He.push(`Unknown option for ${G.label}: ${it}`);continue}if(G.positionals==="tail"){Se.push(...K.slice(Ke));break}Se.push(it)}if(G.positionals!=="list"&&G.positionals!=="tail")He.push(...Se.map((Ke)=>`Unexpected argument for ${G.label}: ${Ke}`));return{flags:fe,values:ve,lists:ke,positionals:Se,help:Ve,errors:He}}function Rt(G){for(let K of G)console.error(K);return G.length>0}import{readdirSync as Ys,statSync as fr,unlinkSync as Ks}from"node:fs";import{basename as mr,dirname as Zs,isAbsolute as Xs,join as Qs,relative as ei,resolve as ti,sep as ni}from"node:path";var dr=(G)=>{let K=Date.now()-new Date(G).getTime();if(!Number.isFinite(K))return"";let ne=Math.floor(K/60000),re=Math.floor(ne/60),de=Math.floor(re/24);if(de>0)return`${de}d ago`;if(re>0)return`${re}h ago`;if(ne>0)return`${ne}m ago`;return"just now"},Rn=(G)=>{let K=(G??"").trim().split(/\s+/).filter((de)=>de&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(de)),ne=K[0]?.split("/").pop();if(!ne)return null;let re=K[1];return re&&/^[a-z][a-z0-9-]*$/.test(re)?`${ne} ${re}`:ne};function ur(G){let K=(de)=>`${de.sessionId}
${Rn(de.segment||de.command)}`,ne=G.filter((de)=>de.decision!=="allow"),re=ne.filter((de)=>de.sessionId).reduce((de,fe)=>de.set(K(fe),(de.get(K(fe))??0)+1),new Map);return new Set(ne.filter((de)=>de.failureStage||(re.get(K(de))??0)>=2))}import{existsSync as Bs,readdirSync as Gs,readFileSync as zs}from"node:fs";import{join as Vs}from"node:path";function Pt(G,K){try{return Gs(G,{withFileTypes:!0,encoding:"utf8"}).flatMap((ne)=>{let re=Vs(G,ne.name);if(ne.isDirectory())return Pt(re,K);if(ne.name.endsWith(".jsonl"))return[re];return[]})}catch{if(K&&Bs(G))K.count++;return[]}}var Js=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function Ws(G){if(!G||typeof G!=="object"||Array.isArray(G))return!1;let K=G;if(typeof K.ts!=="string"||typeof K.command!=="string")return!1;return Js.every((ne)=>K[ne]===void 0||typeof K[ne]==="string")}function Tt(G,K){try{return zs(G,"utf-8").split(`
`).filter(Boolean).flatMap((ne)=>{try{let re=JSON.parse(ne);if(!Ws(re)){if(K)K.count++;return[]}return[re]}catch{if(K)K.count++;return[]}})}catch{if(K)K.count++;return[]}}function ft(G){return Array.from(G,(K)=>{let ne=K.charCodeAt(0);if(ne<=31||ne>=127&&ne<=159)return`\\x${ne.toString(16).padStart(2,"0")}`;return K}).join("")}function ri(G,K){let ne=J(G),re=gt({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},K);if(Rt(re.errors))return null;if(re.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(re.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let de=re.values.limit===void 0?20:pr(re.values.limit);if(de===null)return console.error("--limit must be a positive number"),null;let fe=re.values.since===void 0?Math.min(30,ne):pr(re.values.since);if(fe===null||fe>ne)return console.error(`--since must be a positive number of days no greater than ${ne}`),null;let ve={limit:de,limitExplicit:re.values.limit!==void 0,since:fe,sinceExplicit:re.values.since!==void 0,all:re.flags.all,json:re.flags.json,suspect:re.flags.suspect,pruneLegacy:re.flags.pruneLegacy,dryRun:re.flags.dryRun,id:re.values.id,agent:re.values.agent,rule:re.values.rule,session:re.values.session,project:re.values.project===void 0?void 0:ti(re.values.project)};if(ve.id&&(ve.agent!==void 0||ve.rule!==void 0||ve.session!==void 0||ve.project!==void 0||ve.suspect||ve.sinceExplicit||ve.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ve.pruneLegacy&&(ve.id!==void 0||ve.agent!==void 0||ve.rule!==void 0||ve.session!==void 0||ve.project!==void 0||ve.suspect||ve.all||ve.sinceExplicit||ve.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ve.dryRun&&!ve.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ve}async function gr(G,K,ne={}){let re=ri(G,K);if(!re)return 1;let de=ne.logsDir??A(G);if(re.pruneLegacy)return oi(de,re.json,re.dryRun);if(!de)return console.log(re.json?"[]":re.id?`No retained audit log entry found for id ${ft(re.id)}.`:"No audit log entries found."),0;U(G,de);let fe={count:0},ve=Pt(de,fe).flatMap((nt)=>Tt(nt,fe).map((Ke)=>({entry:Ke,file:nt})));if(fe.count>0)console.error(`warning: ${fe.count} audit log ${fe.count===1?"source":"sources"} could not be read; these results are incomplete`);if(re.id)return li(ve,re,ne.timeZone);let ke=Date.now()-re.since*24*60*60*1000,Se=ve.filter((nt)=>ci(nt,re,de,ke)),He=re.suspect?ur(Se.map((nt)=>nt.entry)):null,Ve=(He?Se.filter((nt)=>He.has(nt.entry)):Se).sort((nt,Ke)=>Date.parse(Ke.entry.ts)-Date.parse(nt.entry.ts)).slice(0,re.limit);if(re.json)return console.log(JSON.stringify(Ve.map((nt)=>nt.entry),null,2)),0;if(Ve.length===0)return console.log("No audit log entries found."),0;for(let nt of Ve)console.log(pi(nt.entry,ne.timeZone));return 0}function oi(G,K,ne){let re=G?ii(G).map((ke)=>Qs(G,ke)):[];if(ne)return si(re,K);let de=[],fe=0,ve=0;for(let ke of re){let Se=fr(ke,{throwIfNoEntry:!1})?.size??0,He=ai(ke);if(He){de.push(`${mr(ke)}: ${He}`);continue}fe++,ve+=Se}if(K)return console.log(JSON.stringify({removedFiles:fe,removedBytes:ve,failedFiles:de.length})),de.length===0?0:1;console.log(fe===0&&de.length===0?"No legacy audit log files found.":`Removed ${fe} legacy audit log ${fe===1?"file":"files"} (${hr(ve)}).`);for(let ke of de)console.error(`Could not remove ${ft(ke)}`);if(console.log("Nested v2 audit logs were not changed."),fe>0)console.log("This deletion cannot be undone.");return de.length===0?0:1}function si(G,K){let ne=G.reduce((re,de)=>re+(fr(de,{throwIfNoEntry:!1})?.size??0),0);if(K)return console.log(JSON.stringify({dryRun:!0,files:G.length,bytes:ne})),0;if(console.log(G.length===0?"No legacy audit log files found.":`Would remove ${G.length} legacy audit log ${G.length===1?"file":"files"} (${hr(ne)}).`),console.log("Nested v2 audit logs are not included."),G.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function ii(G){try{return Ys(G,{withFileTypes:!0}).filter((K)=>K.isFile()&&K.name.endsWith(".jsonl")).map((K)=>K.name)}catch{return[]}}function ai(G){try{return Ks(G),null}catch(K){return K instanceof Error?K.message:String(K)}}function hr(G){let K=["B","KiB","MiB","GiB"],ne=Math.min(Math.floor(Math.log2(Math.max(G,1))/10),K.length-1);return`${Math.round(G/1024**ne*10)/10} ${K[ne]}`}function li(G,K,ne){let re=G.filter((fe)=>fe.entry.id===K.id);if(re.length>1)return console.error(`Multiple audit log entries found for id ${ft(K.id??"")}.`),1;if(K.json)return console.log(JSON.stringify(re.map((fe)=>fe.entry),null,2)),0;let de=re[0];if(!de)return console.log(`No retained audit log entry found for id ${ft(K.id??"")}.`),0;return console.log(fi(de.entry,ne)),0}function ci(G,K,ne,re){if(!K.all&&G.entry.decision==="allow")return!1;if(Date.parse(G.entry.ts)<re)return!1;if(K.agent!==void 0&&G.entry.agent!==K.agent)return!1;if(K.rule!==void 0&&G.entry.ruleId!==K.rule)return!1;if(K.session!==void 0&&!di(G,ne,K.session))return!1;if(K.project!==void 0&&!ui(G.entry.cwd,K.project))return!1;return!0}function di(G,K,ne){if(G.entry.sessionId===ne)return!0;return Zs(G.file)===K&&mr(G.file,".jsonl")===ne}function ui(G,K){if(!G)return!1;let ne=ei(K,G);return ne!==".."&&!ne.startsWith(`..${ni}`)&&!Xs(ne)}function pi(G,K){let ne=ft(G.id??"-"),re=ft(G.decision??"deny"),de=G.cwd?`  [${ft(G.cwd)}]`:"",fe=G.segment||G.command,ve=fe===G.command?"":"↳ ",ke=fe.length>50?`${fe.slice(0,50)}…`:fe;return`${ne.padEnd(16)}  ${ft(yr(G.ts,K))}  ${re.padEnd(5)}  ${ft(G.agent??"-").padEnd(15)}  ${ft(G.ruleId??"-").padEnd(20)}  ${ve}${ft(ke)}${de}`}function fi(G,K){let ne=(de)=>ft(de===void 0||de===null||de===""?"-":de),re=G.shape?`${G.agent??"-"} (shape: ${G.shape})`:G.agent??"-";return[`id:        ${ne(G.id)}`,`ts:        ${ne(yr(G.ts,K))}`,`decision:  ${ne(G.decision)}`,`agent:     ${ne(re)}`,`level:     ${ne(G.level)}`,`tool:      ${ne(G.toolName)}`,`rule:      ${ne(G.ruleId)}`,`intent:    ${ne(G.intent)}`,`stage:     ${ne(G.failureStage)}`,`error:     ${ne(G.errorCode)}`,`session:   ${ne(G.sessionId)}`,`cwd:       ${ne(G.cwd)}`,`version:   ${ne(G.v)}`,`truncated: ${ne(G.truncated===!0?"yes":void 0)}`,`reason:    ${ne(G.reason)}`,`command:   ${ne(G.command)}`,`segment:   ${ne(G.segment)}`].join(`
`)}function yr(G,K){let ne=new Date(G);if(Number.isNaN(ne.getTime()))return G;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:K}).format(ne)}function pr(G){let K=Number(G);return Number.isFinite(K)&&K>0?K:null}var vr={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var br={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var Lr={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var wr={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var Vt={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Dn=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],Cn=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],Ft={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...Dn.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...Cn,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var xr={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var Jt=[xr,vr,wr,br,Ft,Vt,Lr];function mi(G){return G.aliases??[]}function Wt(G){let K=G.toLowerCase();return Jt.find((ne)=>ne.name.toLowerCase()===K||mi(ne).some((re)=>re.toLowerCase()===K))}import{basename as gi}from"node:path";function Yt(G,K=7,ne=A(G)){let re=Date.now()-K*24*60*60*1000,de=[],fe=new Set,ve=0,ke,Se,He,Ve;if(ne)U(G,ne);let nt={count:0},Ke=ne?Pt(ne,nt):[];for(let ze of Ke)for(let ot of Tt(ze,nt)){if(ot.decision==="allow")continue;let st=new Date(ot.ts).getTime();if(st>=re){if(ve++,fe.add(ot.sessionId??gi(ze,".jsonl")),Se===void 0||st<=Se)ke=ot.ts,Se=st;if(Ve===void 0||st>Ve)He=ot.ts,Ve=st;hi(de,ot,st)}}let it=de.map((ze)=>({timestamp:ze.ts,command:ze.command,reason:ze.reason,relativeTime:dr(new Date(ze.ts))}));return{totalBlocked:ve,sessionCount:fe.size,recentEntries:it,oldestEntry:ke,newestEntry:He,unreadable:nt.count}}function hi(G,K,ne){let re=G.findIndex((de)=>ne>new Date(de.ts).getTime());if(re===-1){if(G.length<3)G.push(K);return}if(G.splice(re,0,K),G.length>3)G.pop()}import{dirname as Pi}from"node:path";import{dirname as yi,join as vi,resolve as bi}from"node:path";var Li="config.json";function ht(G,K,ne,re){p(wi(G),`${JSON.stringify(K,null,2)}
`,ne,re)}function wi(G){return typeof G==="string"?Y(G):G}function En(G){return{errors:X(ki(G),": "," "),ruleNames:new Set(Ee(G).map((K)=>K.toLowerCase()))}}var xi="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",kr="must match pattern (letters, numbers, hyphens, underscores)";function ki(G){if(!Sr(G))return[e([],"Config must be an object")];return[...G.version===1?[]:[e(["version"],"must be 1")],...Si(G.rules)]}function Si(G){if(G===void 0)return[];if(!Array.isArray(G))return[e(["rules"],"must be an array")];return[...G.flatMap((K,ne)=>Sr(K)?Ri(K,["rules",ne]):[e(["rules",ne],"must be an object")]),...Ce(G)]}function Ri(G,K){return[...Pn(G.name,[...K,"name"],"required string",c,xi),...Pn(G.command,[...K,"command"],"required string",w,kr),...G.subcommand===void 0?[]:Pn(G.subcommand,[...K,"subcommand"],"must be a string if provided",w,kr),...Di(G.block_args,[...K,"block_args"]),...Ci(G.reason,[...K,"reason"]),...G.intent===void 0||ye(G.intent)?[]:[e([...K,"intent"],he)]]}function Pn(G,K,ne,re,de){if(typeof G!=="string")return[e(K,ne)];return re.test(G)?[]:[e(K,de)]}function Di(G,K){if(!Array.isArray(G))return[e(K,"required array")];if(G.length===0)return[e(K,"must have at least one element")];return G.flatMap((ne,re)=>{if(typeof ne!=="string")return[e([...K,re],"must be a string")];return ne===""?[e([...K,re],"must not be empty")]:[]})}function Ci(G,K){if(typeof G!=="string")return[e(K,"required string")];if(G==="")return[e(K,"must not be empty")];return G.length>E?[e(K,`must be at most ${E} characters`)]:[]}function Sr(G){return!!G&&typeof G==="object"&&!Array.isArray(G)}function $n(G){let K=Rr(G);if(!K.ok)return K.result;return En(K.parsed)}function Rr(G){let K=[],ne=new Set;try{let re=typeof G==="string"?Y(G):G,de=n(re);if(de===null)return K.push(`File not found: ${re.path}`),{ok:!1,result:{errors:K,ruleNames:ne}};if(!de.trim())return K.push("Config file is empty"),{ok:!1,result:{errors:K,ruleNames:ne}};return{ok:!0,parsed:JSON.parse(de)}}catch(re){if(re instanceof r)return K.push(re.message),{ok:!1,result:{errors:K,ruleNames:ne}};let de=re instanceof Error?re.message:String(re);return K.push(re instanceof SyntaxError?"Invalid JSON":de),{ok:!1,result:{errors:K,ruleNames:ne}}}}function Dr(G){return bi(G,".safety-net.json")}function Dt(G){let K=Rr(G);if(!K.ok)return K.result;let ne=je(K.parsed);return{errors:ne.errors,ruleNames:ne.sources}}function Kt(G,K={}){return vi(yi(ge(G,K)),Li)}function Cr(G,K,ne){let re;try{if(n(K)===null)return{path:G,exists:!1,valid:!1,ruleCount:0};re=Dt(K),re.errors.push(...F(G,ne))}catch(de){if(!(de instanceof r))throw de;re={errors:[de.message],ruleNames:new Set}}return{path:G,exists:!0,valid:re.errors.length===0,ruleCount:re.ruleNames.size,...re.errors.length>0?{errors:re.errors}:{}}}function Ei(G,K){return{source:K,name:G.name,command:G.command,subcommand:G.subcommand,blockArgs:[...G.block_args],reason:G.reason}}function Pr(G,K){let ne=O(G),re=D(K),de=Pi(ne),fe=z(G,{cwd:K,userConfigPath:ne,projectConfigPath:re,userConfigDir:de}),ve=B(G,{cwd:K,userConfigPath:ne,projectConfigPath:re,userConfigDir:de}),ke=new Map(fe.rulebooks.flatMap((Se)=>Se.rules.map((He)=>[He,Se.source])));return{userConfig:Cr(ne,ve.userConfigTarget,ve.userScope),projectConfig:Cr(re,ve.projectConfigTarget,ve.projectScope),effectiveRules:fe.rules.map((Se)=>Ei(Se,ke.get(Se.name)??"project"))}}var $i=[{flag:i.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:i.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:i.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:i.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:i.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:i.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:i.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:i.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"}];function Er(G){return[...$i.map((K)=>({name:K.flag.name,value:me(K.flag,G.env),isSet:Je(K.flag,G.env),legacyName:K.flag.legacyName,legacyValue:K.flag.legacyName?G.env.get(K.flag.legacyName):void 0,legacyIsSet:K.flag.legacyName?G.env.get(K.flag.legacyName)!==void 0:void 0,description:K.description,defaultBehavior:K.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:G.env.get("CC_SAFETY_NET_HOME"),isSet:G.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var An=[{id:"opencode",displayName:"OpenCode",doctorOrder:1,install:{order:1,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}}],Zt=An.slice().sort((G,K)=>G.doctorOrder-K.doctorOrder).map((G)=>G.id),Xt=An.slice().sort((G,K)=>G.install.order-K.install.order).map((G)=>({id:G.id,...G.install})).map(({order:G,...K})=>K),Ai=Object.fromEntries(An.map((G)=>[G.id,G.displayName]));function Ct(G){return Ai[G]}var $r={error:0,warning:1,info:2},_i=["policy","config","audit"];function ji(G){return G.map((K)=>{if(K==="ownership")return"is not owned by the current user";if(K==="permissions")return"has unsafe permissions";if(K==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var Ti=[{derive:(G)=>G.hooks.length>0&&G.hooks.every((K)=>!K.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(G)=>G.hooks.filter((K)=>K.inspectionStatus==="failed").map((K)=>{let ne=Ct(K.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${ne} inspection failed`,detail:`Doctor could not verify the ${ne} integration configuration.`,fixHint:`Correct the reported ${ne} configuration error, then run \`cc-safety-net doctor\` again.`,integration:K.platform}})},{derive:(G)=>G.userConfig.exists&&!G.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:G.userConfig.path}]:[]},{derive:(G)=>G.projectConfig.exists&&!G.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:G.projectConfig.path}]:[]},{derive:(G)=>G.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${G.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(G)=>G.v2Leftovers&&G.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${G.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(G)=>{let K=G.environment.find((ne)=>ne.name==="CC_SAFETY_NET_AUDIT_SCOPE");return Me(K?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},..._i.map((G)=>({derive:(K)=>K.posture.directories.filter((ne)=>ne.kind===G&&ne.status==="unsafe").map((ne)=>({checkId:`posture.${G}-directory-unsafe`,severity:"error",title:`${G[0]?.toUpperCase()}${G.slice(1)} directory is unsafe`,detail:`The ${G} directory ${ji(ne.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...ne.path?{path:ne.path}:{}}))})),{derive:(G)=>{let K=[...G.effectiveSafety.weakenedRuleOverrides].sort();return K.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${K.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${K.join(", ")}.`}]:[]}}];function Ar(G){return Ti.flatMap((K,ne)=>K.derive(G).map((re,de)=>({finding:re,catalogOrder:ne,occurrence:de}))).sort((K,ne)=>$r[K.finding.severity]-$r[ne.finding.severity]||K.catalogOrder-ne.catalogOrder||K.occurrence-ne.occurrence).map((K)=>K.finding)}function wt(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var Fi=(G)=>wt()?`\x1B[32m${G}\x1B[0m`:G,Oi=(G)=>wt()?`\x1B[33m${G}\x1B[0m`:G,Ii=(G)=>wt()?`\x1B[34m${G}\x1B[0m`:G,Ni=(G)=>wt()?`\x1B[36m${G}\x1B[0m`:G,Mi=(G)=>wt()?`\x1B[31m${G}\x1B[0m`:G,Hi=(G)=>wt()?`\x1B[2m${G}\x1B[0m`:G,qi=(G)=>wt()?`\x1B[1m${G}\x1B[0m`:G,at={green:Fi,yellow:Oi,blue:Ii,cyan:Ni,red:Mi,dim:Hi,bold:qi},Ui="\x1B[0m",Bi=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function Gi(G){let K=G;return()=>(K=(K*1664525+1013904223)%4294967296,K/4294967296)}function zi(G){let K=[...Bi],ne=Gi(G);for(let re=K.length-1;re>0;re--){let de=Math.floor(ne()*(re+1)),fe=K[re];K[re]=K[de],K[de]=fe}return K}function Vi(G,K=0){if(!wt())return"";let ne=zi(K);return`\x1B[38;5;${ne[G%ne.length]}m`}function _r(G,K,ne=0){if(!wt())return`"${G}"`;return`${Vi(K,ne)}"${G}"${Ui}`}function Qt(G){return G==="default"?"built-in default":`${G} policy`}var Ji=new RegExp("\x1B\\[[0-9;]*m","g"),_n=(G)=>G.replace(Ji,"").length;function Et(G){let K=(G.headers??G.rows[0]??[]).map((ve,ke)=>{let Se=Math.max(...G.rows.map((He)=>_n(He[ke]??"")));return Math.max(_n(ve),Se)}),ne=(ve,ke)=>ve+" ".repeat(Math.max(0,ke-_n(ve))),re=(ve,ke)=>ke[0]+K.map((Se)=>ve.repeat(Se+2)).join(ke[1])+ke[2],de=(ve)=>`│ ${ve.map((ke,Se)=>ne(ke,K[Se]??0)).join(" │ ")} │`,fe=G.headers?[`   ${de(G.headers)}`,`   ${re("─",["├","┼","┤"])}`]:[];return[`   ${re("─",["┌","┬","┐"])}`,...fe,...G.rows.map((ve)=>`   ${de(ve)}`),`   ${re("─",["└","┴","┘"])}`].join(`
`)}function jr(G){let K=[];K.push("Hook Integration"),K.push(Wi(G));let ne=[],re=[];for(let de of G){let fe=Ct(de.platform);if(de.errors&&de.errors.length>0)for(let ve of de.errors)if(de.configured)ne.push({platform:fe,message:ve});else re.push({platform:fe,message:ve})}for(let de of ne)K.push(`   Warning (${de.platform}): ${de.message}`);for(let de of re)K.push(at.red(`   Error (${de.platform}): ${de.message}`));return K.join(`
`)}function Wi(G){let K=["Platform","Discovery","Configuration","Inspection"],ne=G.map((re)=>{let de=Ct(re.platform);if(re.inspectionStatus==="not-inspected"){let Se=at.dim("Not inspected");return[de,Se,Se,Se]}let fe=re.detected?at.green("Detected"):re.inspectionStatus==="failed"?at.red("Unknown"):at.dim("Not detected"),ve=re.configured?at.green("Configured"):re.detected?at.yellow("Not configured"):re.inspectionStatus==="failed"?at.red("Unknown"):at.dim("Not applicable"),ke=re.inspectionStatus==="verified"?at.green("Verified"):re.inspectionStatus==="failed"?at.red("Failed"):at.dim("Not applicable");return[de,fe,ve,ke]});return Et({headers:K,rows:ne})}function Tr(G){let ne=["Guard Engine Verification",`   Synthetic self-test: ${G.failed>0?at.red(`${G.passed}/${G.total} FAIL`):at.green(`${G.passed}/${G.total} passed`)}`],re=G.results.filter((de)=>!de.passed);if(re.length>0){ne.push(""),ne.push(at.red("   Failures:"));for(let de of re)ne.push(at.red(`   • ${de.description}`)),ne.push(at.red(`     expected ${de.expected}, got ${de.actual}`))}return ne.join(`
`)}function Yi(G){if(G.length===0)return"   (no custom rules)";let K=["Source","Name","Command","Block Args"],ne=G.map((re)=>[re.source,re.name,re.subcommand?`${re.command} ${re.subcommand}`:re.command,re.blockArgs.join(", ")]);return Et({headers:K,rows:ne})}function Fr(G){let K=[];if(K.push("Configuration"),K.push(Ki(G.userConfig,G.projectConfig)),K.push(""),G.effectiveRules.length>0)K.push(`   Effective rules (${G.effectiveRules.length} total):`),K.push(Yi(G.effectiveRules));else K.push("   Effective rules: (none - using built-in rules only)");return K.join(`
`)}function Ki(G,K){let ne=["Scope","Status"],re=(fe)=>{if(!fe.exists)return at.dim("N/A");if(!fe.valid)return at.red(`Invalid (${fe.errors?.[0]??"unknown error"})`);return at.green("Configured")},de=[["User",re(G)],["Project",re(K)]];return Et({headers:ne,rows:de})}function Or(G){let K=[];return K.push("Environment"),K.push(Zi(G)),K.join(`
`)}function Ir(G){let K=G.effectiveSafety.policyScopes,ne=["Effective Safety",`   Selected preset: ${G.effectiveSafety.selectedPreset}${K?` (${Qt(K.levelScope)})`:""}`,`   Effective: ${G.effectiveSafety.level}`],re=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[de,fe]of re){let ve=G.effectiveSafety.capabilities[de],ke=ve.enabled?at.green("ON"):at.dim("OFF"),Se=ve.sources.length>0?` (${ve.sources.join(", ")})`:"";ne.push(`   ${fe}: ${ke} via ${ve.source}${Se}`)}if(K&&K.weakenings.length>0){ne.push("   Project policy deltas:");for(let de of K.weakenings)ne.push(`      ${de}`)}ne.push(`   Stored rule customizations: ${G.effectiveSafety.ruleCounts.stored}`),ne.push(`   Effective rule customizations: ${G.effectiveSafety.ruleCounts.effective}`);for(let[de,fe]of Object.entries(G.effectiveSafety.ruleOverrides))ne.push(`   ${de}: ${fe}`);return ne.join(`
`)}function Nr(G){let K=["Findings"];if(G.length===0)return K.push("   No findings from inspected doctor facts."),K.join(`
`);for(let ne of G){let re=`[${ne.severity.toUpperCase()}] ${ne.checkId}: ${ft(ne.title)}`,de=ne.severity==="error"?at.red:ne.severity==="warning"?at.yellow:at.blue;if(K.push(`   ${de(re)}`),K.push(`      ${ft(ne.detail)}`),ne.path)K.push(`      Path: ${ft(ne.path)}`);if(ne.fixHint)K.push(`      Fix: ${ft(ne.fixHint)}`)}return K.join(`
`)}function Zi(G){let K=["Variable","Status","Legacy"],ne=G.map((re)=>{let de=re.isSet?at.green("✓"):at.dim("✗"),fe=re.legacyName&&re.legacyIsSet?`${re.legacyName} ${at.green("✓")}`:re.legacyName??"";return[re.name,de,fe]});return Et({headers:K,rows:ne})}function Mr(G){let K=[];if(G.totalBlocked===0)K.push("Recent Activity"),K.push("   No blocked commands in the last 7 days"),K.push("   Tip: This is normal for new installations");else K.push(`Recent Activity · last 7 days (${G.totalBlocked} blocked / ${G.sessionCount} sessions)`),K.push(Xi(G.recentEntries));if(G.unreadable>0)K.push(`   Warning: ${G.unreadable} audit log ${G.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return K.join(`
`)}function Xi(G){let K=["Time","Command"],ne=G.map((re)=>{let de=ft(re.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),fe=de.length>40?`${de.slice(0,37)}...`:de;return[re.relativeTime,fe]});return Et({headers:K,rows:ne})}function Hr(G){let K=[];if(K.push("Update Check"),G.latestVersion===null&&!G.error)return K.push(en([["Status",at.dim("Skipped")],["Installed",G.currentVersion]])),K.join(`
`);if(G.error)return K.push(en([["Status",`${at.yellow("⚠")} Error`],["Installed",G.currentVersion],["Error",at.dim(G.error)]])),K.join(`
`);if(G.updateAvailable)return K.push(en([["Status",`${at.yellow("⚠")} Update Available`],["Current",G.currentVersion],["Latest",at.green(G.latestVersion??"")]])),K.push(""),K.push("   Run: bunx cc-safety-net@latest doctor"),K.push("   Or:  npx cc-safety-net@latest doctor"),K.join(`
`);return K.push(en([["Status",`${at.green("✓")} Up to date`],["Version",G.currentVersion]])),K.join(`
`)}function en(G){return Et({rows:G})}function qr(G){let K=[];return K.push("System Info"),K.push(Qi(G)),K.join(`
`)}function Qi(G){let K=["Component","Version"],ne=(fe)=>{if(fe===null)return at.dim("not found");return fe},de=[{label:"cc-safety-net",value:G.version},...Zt.map((fe)=>({label:Ct(fe),value:G.versions[fe]??null})),{label:"Node.js",value:G.nodeVersion},{label:"npm",value:G.npmVersion},{label:"Bun",value:G.bunVersion},{label:"Platform",value:G.platform}].map((fe)=>[fe.label,ne(fe.value)]);return Et({headers:K,rows:de})}function Ur(G){if(G.findings.length===0)return at.green(`
No findings from inspected doctor facts.`);let K={error:G.findings.filter((fe)=>fe.severity==="error").length,warning:G.findings.filter((fe)=>fe.severity==="warning").length,info:G.findings.filter((fe)=>fe.severity==="info").length},ne=["error","warning","info"].filter((fe)=>K[fe]>0).map((fe)=>`${K[fe]} ${fe}`),re=G.findings.length===1?"finding":"findings",de=`
${G.findings.length} ${re}: ${ne.join(", ")}.`;if(K.error>0)return at.red(de);if(K.warning>0)return at.yellow(de);return at.blue(de)}import{lstatSync as ea}from"node:fs";import{dirname as jn}from"node:path";function Tn(G,K){try{let ne=ea(K);if(ne.isSymbolicLink())return{kind:G,path:K,status:"unsafe",issues:["symlink"]};if(!ne.isDirectory())return{kind:G,path:K,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:G,path:K,status:"unknown",issues:[]};let re=[...ne.uid!==process.getuid()?["ownership"]:[],...(ne.mode&18)!==0?["permissions"]:[]];return{kind:G,path:K,status:re.length>0?"unsafe":"safe",issues:re}}catch(ne){if(typeof ne==="object"&&ne!==null&&"code"in ne&&ne.code==="ENOENT")return{kind:G,path:K,status:"not-applicable",issues:[]};return{kind:G,path:K,status:"unknown",issues:[]}}}function Br(G,K){let ne=A(G);return{directories:[Tn("policy",jn(jn(K))),Tn("config",jn(K)),...ne?[Tn("audit",ne)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as ta}from"node:child_process";import{existsSync as Gr}from"node:fs";import{delimiter as na,extname as ra,join as oa}from"node:path";import{stripVTControlCharacters as zr}from"node:util";var Jr="2.4.14",sa=5000,ia="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function Ot(){return Jr}function Fn(G,K){let ne=G[K];if(ne)return ne;let re=Object.keys(G).find((de)=>de.toLowerCase()===K.toLowerCase()&&!!G[de]);return re?G[re]:ne}function aa(G){return(Fn(G,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((K)=>K.length>0)}function la(G,K){let ne=ra(G)?[G]:[...aa(K).map((re)=>`${G}${re}`),G];if(G.includes("/")||G.includes("\\"))return ne.find((re)=>Gr(re))??G;return(Fn(K,"PATH")??"").split(na).flatMap((re)=>ne.map((de)=>oa(re,de))).find((re)=>Gr(re))??G}function Vr(G){if(!/[\s"&|<>^]/.test(G))return G;return`"${G.replace(/"/g,'""')}"`}function ca(G,K){let[ne,...re]=G,de=K[ia]==="win32"?"win32":process.platform;if(!ne||de!=="win32")return{cmd:ne??"",args:re};let fe=la(ne,K);if(!/\.(?:bat|cmd)$/i.test(fe))return{cmd:fe,args:re};return{cmd:Fn(K,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",Vr(fe),...re.map(Vr)].join(" ")]}}var da=async(G,K=sa)=>{let ne=await ua(G,{timeoutMs:K});if(ne.code!==0)return null;return zr(ne.stdout).trim()||zr(ne.stderr).trim()||null};function ua(G,K){let[ne,...re]=G;if(!ne)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((de)=>{try{let fe=ca([ne,...re],process.env),ve=ta(fe.cmd,fe.args,{stdio:["ignore","pipe","pipe"]}),ke=!1,Se="",He="";ve.stdout.on("data",(Ke)=>{Se+=Ke.toString()}),ve.stderr.on("data",(Ke)=>{He+=Ke.toString()});let Ve=(Ke)=>{if(ke)return;ke=!0,clearTimeout(nt),de(Ke)},nt=setTimeout(()=>{ve.kill(),Ve({code:null,stdout:Se,stderr:He})},K.timeoutMs);ve.on("close",(Ke)=>{Ve({code:Ke,stdout:Se,stderr:He})}),ve.on("error",()=>{Ve({code:null,stdout:Se,stderr:He})})}catch{de({code:null,stdout:"",stderr:""})}})}function tn(G){if(!G)return null;let K=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(G);if(K)return K[1]??null;let ne=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(G);if(ne)return ne[1]??null;return G.split(`
`)[0]?.trim()||null}async function nn(G,K=da,ne=process.cwd()){let re=Promise.all(Xt.map(async(He)=>[He.id,tn(await K([...He.probeCommand]))])),[de,fe,ve,ke,Se]=await Promise.all([re,re.then(async(He)=>{let Ve=He.find(([it])=>it==="opencode")?.[1];if(!Ve?.startsWith("2.")||!G(Ve))return null;let nt=["--param",`location[directory]=${ne}`],Ke=["opencode","api","integration.list",...nt];return await K(Ke,30000),K(["opencode","api","plugin.list",...nt],30000)}),K(["node","--version"]),K(["npm","--version"]),K(["bun","--version"])]);return{version:Jr,versions:Object.fromEntries(de),openCodePluginListOutput:fe,nodeVersion:tn(ve),npmVersion:tn(ke),bunVersion:tn(Se),platform:`${process.platform} ${process.arch}`}}function rn(){return Promise.resolve({currentVersion:Ot(),latestVersion:null,updateAvailable:!1})}import{createHash as ha}from"node:crypto";import{existsSync as Kr}from"node:fs";import{dirname as on,join as Zr}from"node:path";import{dirname as Wr,join as pa,resolve as fa}from"node:path";var ma="rule.lock";function ga(G){return pa(Wr(G),ma)}function Yr(G={}){return fa(G.cwd??process.cwd(),".safety-net.json")}function yt(G,K){let ne=K.global?K.userConfigPath??O(G,K):K.projectConfigPath??D(K.cwd??process.cwd()),re=K.global?Ne(G,K):$e(ne,K.cwd??process.cwd()),de=ga(ne);return{configDir:Wr(ne),configPath:ne,lockPath:de,filesystemScope:re,configTarget:o(re,ne),lockTarget:o(re,de)}}var ya="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",va="cache",ba="rulebooks";function Xr(G,K={}){let ne=yt(G,K),re=o(ne.filesystemScope,eo(ne.configDir)),de=n(ne.lockTarget);if(console.log(ya),de===null&&!Kr(re.path))return console.log(`No v2 lock or cache leftovers found in ${on(ne.configDir)}; nothing to migrate.`),0;let fe=Sa(de),ve=u(ne.configTarget);if(!ve.config&&(n(ne.configTarget)!==null||fe.size>0))return console.error(`Cannot migrate: the rules config in ${on(ne.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let ke=ve.config?.rules??[];for(let Se of ke.flatMap((He)=>La(He,fe,ne,re,K.global===!0)))console.log(Se);return I(ne.lockTarget),Ye(re),console.log(`Removed the v2 lock and cache under ${on(ne.configDir)}.`),0}function Qr(G,K){return[...new Set([{cwd:K},{cwd:K,global:!0}].flatMap((ne)=>{let re=yt(G,ne);return[re.lockPath,eo(re.configDir)]}))].filter((ne)=>Kr(ne))}function La(G,K,ne,re,de){if(!S(G))return[];let fe=_(G).name,ve=o(ne.filesystemScope,P(ne.configDir,fe)),ke=n(ve);if(ke!==null&&wa(ke,fe))return[];let Se=K.get(G),He=Se?xa(Se,fe,re.path,ne.filesystemScope):null;if(He===null)return[`Could not migrate ${G} from the v2 cache. Run \`cc-safety-net rule update ${G}${de?" --global":""}\` to vendor it.`];if(p(ve,He),ke!==null)return[`Restored ${G} from the v2 cache over an invalid file.`];return[`Vendored ${G} from the v2 cache.`]}function wa(G,K){let ne=le(G);return!("problem"in ne)&&ne.rulebook.name===K}function xa(G,K,ne,re){let de=Zr(ne,ba,`${ka(G)}--${G.digest.replace("sha256:","").slice(0,12)}`,ie),fe=n(o(re,de));if(fe===null||Ca(fe)!==G.digest)return null;let ve=le(fe);if("problem"in ve||ve.rulebook.name!==K)return null;return fe}function eo(G){return Zr(on(G),va)}function ka(G){return([G.owner,G.repo,G.display_ref,G.name].every((re)=>typeof re==="string"&&re!=="")?`${G.owner}/${G.repo}#${G.display_ref}/${G.name}`:G.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Sa(G){let K=G===null?null:Da(G),ne=to(K)&&Array.isArray(K.rulebooks)?K.rulebooks:[];return new Map(ne.filter(Ra).map((re)=>[re.spec,re]))}function Ra(G){return to(G)&&typeof G.spec==="string"&&typeof G.digest==="string"}function to(G){return!!G&&typeof G==="object"}function Da(G){try{return JSON.parse(G)}catch{return null}}function Ca(G){return`sha256:${ha("sha256").update(G).digest("hex")}`}function On(G){return Math.max(0,Math.min(1,G))}function In(G){return Math.max(0,Math.min(255,Math.round(G)))}function Nn(G){return G<=0.0031308?12.92*G:1.055*G**0.4166666666666667-0.055}function Pa(G,K,ne){let re=ne*Math.PI/180,de=K*Math.cos(re),fe=K*Math.sin(re),ve=(G+0.3963377774*de+0.2158037573*fe)**3,ke=(G-0.1055613458*de-0.0638541728*fe)**3,Se=(G-0.0894841775*de-1.291485548*fe)**3;return{blue:In(Nn(On(-0.0041960863*ve-0.7034186147*ke+1.707614701*Se))*255),green:In(Nn(On(-1.2684380046*ve+2.6097574011*ke-0.3413193965*Se))*255),red:In(Nn(On(4.0767416621*ve-3.3077115913*ke+0.2309699292*Se))*255)}}function Ea(G,K){let ne=(K*G*180/Math.PI%360+360)%360;return Pa(0.72,0.15,ne)}function no(G,K=0.1){let ne=Ea(K,G);return`\x1B[38;2;${ne.red};${ne.green};${ne.blue}m`}var ro="\r\x1B[2K",$a="\x1B[?25l",Aa="\x1B[39m",_a="\x1B[?25h",ja=100,Ta=0.55,Fa=80,oo=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Oa(G){return new Promise((K)=>setTimeout(K,G))}async function Ia(G,K={}){let ne=K.output??process.stdout;if(!ne.isTTY)return G;let re=K.sleep??Oa,de=!1,fe=G.then((ke)=>(de=!0,ke),(ke)=>{throw de=!0,ke});if(await Promise.race([fe.then(()=>!0),re(ja).then(()=>!1)]))return fe;ne.write($a);try{for(let ke=0;!de;ke+=1)ne.write(`${ro}${no(ke*Ta)}${oo[ke%oo.length]}${Aa} ${K.loadingMessage??"Loading…"}`),await Promise.race([fe,re(Fa)]);return await fe}finally{ne.write(`${ro}${_a}`)}}async function so(G,K,ne,re={}){let de=K();if(G)await ne();if(G&&de.ready)await Ia(de.ready,re);return de.finish()}import{existsSync as qa,readFileSync as Ua}from"node:fs";import{basename as Ba}from"node:path";function io(G){let K="",ne=0,re=!1,de=!1,fe=-1;while(ne<G.length){let ve=G[ne],ke=G[ne+1];if(de){K+=ve,de=!1,ne++;continue}if(ve==='"'&&!re){re=!0,fe=-1,K+=ve,ne++;continue}if(ve==='"'&&re){re=!1,K+=ve,ne++;continue}if(ve==="\\"&&re){de=!0,K+=ve,ne++;continue}if(re){K+=ve,ne++;continue}if(ve==="/"&&ke==="/"){while(ne<G.length&&G[ne]!==`
`)ne++;continue}if(ve==="/"&&ke==="*"){ne+=2;while(ne<G.length-1){if(G[ne]==="*"&&G[ne+1]==="/"){ne+=2;break}ne++}continue}if(ve===","){fe=K.length,K+=ve,ne++;continue}if(ve==="}"||ve==="]"){if(fe!==-1){let Se=K.slice(fe+1);if(/^\s*$/.test(Se))K=K.slice(0,fe)+Se}fe=-1,K+=ve,ne++;continue}if(!/\s/.test(ve))fe=-1;K+=ve,ne++}return K}import{join as sn}from"node:path";function bt(G,K){return typeof G==="object"&&G!==null?G[K]:void 0}var Mn="cc-safety-net",ao=["opencode.json","opencode.jsonc"];function lo(G){return sn(G.env.get("XDG_CONFIG_HOME")||sn(G.home,".config"),"opencode")}function co(G){return G.env.get("OPENCODE_CONFIG_DIR")||lo(G)}function uo(G){return ao.map((K)=>sn(co(G),K))}function po(G){return[...new Set([co(G),lo(G)])].flatMap((K)=>ao.map((ne)=>sn(K,ne)))}function fo(G){let K=Na(G);if(K.some(Ma))return;let ne=K.find((re)=>bt(re,"status")==="failed");if(!ne)return;return`OpenCode reports cc-safety-net failed: ${String(bt(ne,"error")).split(`
`)[0]}`}function Na(G){return Ha(G).filter((K)=>bt(K,"id")===Mn||go(bt(bt(K,"source"),"target"))).map((K)=>bt(K,"state"))}function Ma(G){return bt(G,"status")==="active"}function Ha(G){if(!G)return[];try{let K=bt(JSON.parse(G),"data");return Array.isArray(K)?K:[]}catch{return[]}}function mo(G){return["plugin","plugins"].some((K)=>{let ne=bt(G,K);return Array.isArray(ne)&&ne.some(go)})}function go(G){let K=typeof G==="string"?G:bt(G,"package");return typeof K==="string"&&(K===Mn||K.startsWith(`${Mn}@`))}function It(G){let K=[];for(let ne of G.openCodeVersion?.startsWith("2.")?uo(G.environment):po(G.environment))if(qa(ne))try{let re=Ua(ne,"utf-8"),de=io(re),fe=JSON.parse(de);if(mo(fe)){let ve=fo(G.openCodePluginListOutput);if(ve)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:ne,errors:[...K,ve]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:ne,errors:K.length>0?K:void 0}}}catch(re){K.push(`Failed to parse ${Ba(ne)}: ${re instanceof Error?re.message:String(re)}`)}return{platform:"opencode",status:"n/a",errors:K.length>0?K:void 0}}var Ga={opencode:It};function an(G,K,ne){let re={...ne,cwd:K,environment:G};return Zt.map((de)=>za(Ga[de](re)))}function za(G){if(G.status==="not-inspected")return{platform:G.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:G.platform,detected:G.status!=="n/a",configured:G.status==="configured",inspectionStatus:G.status!=="n/a"?"verified":G.errors&&G.errors.length>0?"failed":"not-applicable",method:G.method,configPath:G.configPath,configPaths:G.configPaths,errors:G.errors}}import{join as Va}from"node:path";var Ja=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),Wa=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),Ya={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function ho(G){let K=Va(G.tmpdir,"cc-safety-net-self-test"),ne=Ja.map((re)=>{let de=pe(G,b("self-test",{command:re.command},{kind:"command",shell:"auto"},{configCwd:K,executionCwd:K},re.command),{guard:{dependencies:{loadPolicySnapshot:()=>Wa,getModes:()=>Ya,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),fe=re.expectBlocked?"blocked":"allowed",ve=de.decision.kind==="deny"?"blocked":"allowed";return{command:re.command,description:re.description,expected:fe,actual:ve,passed:fe===ve,reason:de.decision.kind==="deny"?de.decision.reason:void 0,ruleId:de.decision.kind==="deny"?de.decision.ruleId:void 0}});return{passed:ne.filter((re)=>re.passed).length,failed:ne.filter((re)=>!re.passed).length,total:ne.length,results:ne}}function Hn(G){let K=gt({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},G);if(Rt(K.errors))return null;return{json:K.flags.json,skipUpdateCheck:K.flags.skipUpdateCheck}}async function yo(G,K={}){let ne=await so(!K.json,()=>{let re=Ka(G,K);return{ready:re,finish:()=>re}},async()=>{},{loadingMessage:"Checking system status…"});if(K.json)console.log(JSON.stringify(ne,null,2));else Za(ne);return ne.engineSelfTest.failed>0||ne.findings.some((re)=>re.severity==="error")?1:0}async function Ka(G,K){let ne=K.cwd??process.cwd(),re=await nn((ot)=>It({environment:G,cwd:ne,openCodeVersion:ot}).status!=="n/a",void 0,ne),de=an(G,ne,{openCodeVersion:re.versions.opencode,openCodePluginListOutput:re.openCodePluginListOutput}),fe=Pr(G,ne),ve=Er(G),ke=R(G,{cwd:ne}),Se=ke.policy,He=T(Se,G.env),Ve=ee(Se,He.capabilities),nt=Yt(G,7),Ke=Qr(G,ne),it=K.skipUpdateCheck?{currentVersion:Ot(),latestVersion:null,updateAvailable:!1}:await rn(),ze={hooks:de,engineSelfTest:ho(G),userConfig:fe.userConfig,projectConfig:fe.projectConfig,configState:Pe(ke),effectiveRules:fe.effectiveRules,environment:ve,effectiveSafety:{selectedPreset:Se.safety.level??"standard",level:He.effectiveLevel,capabilities:He.capabilities,ruleOverrides:Se.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(Ve).filter(([,ot])=>ot.source==="rule_override"&&ot.override==="off"&&ot.inheritedEnabled&&ot.changesInherited).map(([ot])=>ot),ruleCounts:{stored:Object.keys(Se.destructiveCommandRuleOverrides).length,effective:Object.values(Ve).filter((ot)=>ot.changesInherited).length},...ke.policyScopes?{policyScopes:ke.policyScopes}:{}},...Ke.length>0?{v2Leftovers:Ke}:{},posture:Br(G,fe.userConfig.path),activity:nt,update:it,system:re};return{...ze,findings:Ar(ze)}}function Za(G){console.log(),console.log(jr(G.hooks)),console.log(),console.log(Tr(G.engineSelfTest)),console.log(),console.log(Fr(G)),console.log(),console.log(Or(G.environment)),console.log(),console.log(Ir(G)),console.log(),console.log(Nr(G.findings)),console.log(),console.log(Mr(G.activity)),console.log(),console.log(qr(G.system)),console.log(),console.log(Hr(G.update)),console.log(Ur(G))}import{existsSync as Xa}from"node:fs";var Qa=/^[A-Za-z0-9_@%+=:,./-]+$/,vo="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function qn(G){let K=gt({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},G);if(Rt(K.errors))return console.error(vo),console.error("Pass -- before a command that starts with dashes."),null;if(K.values.cwd!==void 0&&!Xa(K.values.cwd))return console.error(`Error: --cwd path does not exist: ${K.values.cwd}`),null;let ne=K.positionals.length===1?K.positionals[0]:K.positionals.map((re)=>Qa.test(re)?re:`'${re.replaceAll("'","'\\''")}'`).join(" ");if(!ne)return console.error("Error: No command provided"),console.error(vo),null;return{json:K.flags.json,cwd:K.values.cwd,command:ne}}function bo(G){if(G)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function Lo(G,K){let re=K-18;return[`${G.dtl}${G.dh.repeat(K)}${G.dtr}`,`${G.dv}  Command Analysis${" ".repeat(re)}${G.dv}`,`${G.dbl}${G.dh.repeat(K)}${G.dbr}`]}function Un(G){return JSON.stringify(G)}function wo(G,K=0){return`[${G.map((re,de)=>_r(re,de,K)).join(",")}]`}function Mt(G,K,ne=70){let re=G.split(" "),de=[],fe="";for(let ve of re)if(fe&&fe.length+ve.length+1>ne)de.push(fe),fe=ve;else fe=fe?`${fe} ${ve}`:ve;if(fe)de.push(fe);return de.map((ve,ke)=>ke===0?ve:`${K}${ve}`)}function xo(G,K,ne){let re=[];switch(G.type){case"parse":return null;case"env-strip":return re.push(""),re.push(`STEP ${K} ${ne.h} Strip environment variables`),re.push(`  Removed: ${G.envVars.map((de)=>`${de}=<redacted>`).join(", ")}`),re.push(`  Tokens:  ${Un(G.output)}`),{lines:re,incrementStep:!0};case"leading-tokens-stripped":return re.push(""),re.push(`STEP ${K} ${ne.h} Strip wrappers`),re.push(`  Removed: ${G.removed.join(", ")}`),re.push(`  Tokens:  ${Un(G.output)}`),{lines:re,incrementStep:!0};case"shell-wrapper":return re.push(""),re.push(`STEP ${K} ${ne.h} Detect shell wrapper`),re.push(`  Wrapper: ${G.wrapper} -c`),re.push(`  Inner:   ${G.innerCommand}`),{lines:re,incrementStep:!0};case"interpreter":{if(re.push(""),re.push(`STEP ${K} ${ne.h} Detect interpreter`),re.push(`  Interpreter: ${G.interpreter}`),re.push(`  Code:        ${G.codeArg}`),G.paranoidBlocked)re.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:re,incrementStep:!0}}case"busybox":return re.push(""),re.push(`STEP ${K} ${ne.h} Busybox wrapper`),re.push(`  Subcommand: ${G.subcommand}`),{lines:re,incrementStep:!0};case"transparent-wrapper":return re.push(""),re.push(`STEP ${K} ${ne.h} Transparent wrapper`),re.push(`  Wrapper: ${G.wrapper}`),re.push(`  Tokens:  ${Un(G.output)}`),{lines:re,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(re.push(""),re.push(`STEP ${K} ${ne.h} Match rules`),re.push(`  Rule:   ${G.rule}()`),G.matched)re.push("  Result: MATCHED");else re.push("  Result: No match");return{lines:re,incrementStep:!0}}case"worktree-relaxation":return re.push(""),re.push(`STEP ${K} ${ne.h} Worktree relaxation`),re.push(`  Mode:   ${i.worktree.name}`),re.push(`  Git cwd: ${G.gitCwd}`),re.push("  Result: Allowed local discard in linked worktree"),{lines:re,incrementStep:!0};case"temp-root-relaxation":return re.push(""),re.push(`STEP ${K} ${ne.h} Temp-root relaxation`),re.push(`  Git cwd: ${G.gitCwd}`),re.push("  Result: Allowed git discard in a temp-root repository"),{lines:re,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(G.embeddedCommandFound)return re.push(""),re.push(`STEP ${K} ${ne.h} Fallback scan`),re.push(`  Found: ${G.embeddedCommandFound}`),{lines:re,incrementStep:!0};return null}case"custom-rules-check":{if(G.rulesChecked){if(re.push(""),re.push(`STEP ${K} ${ne.h} Custom rules`),G.matched)re.push("  Result: MATCHED");else re.push("  Result: No match");return{lines:re,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(G.matched)return re.push(""),re.push(`STEP ${K} ${ne.h} Dangerous text check`),re.push(`  Token:  ${G.token}`),re.push("  Result: MATCHED"),{lines:re,incrementStep:!0};return null}case"strict-unparseable":return re.push(""),re.push(`STEP ${K} ${ne.h} Strict mode check`),re.push(`  Command: ${G.rawCommand}`),re.push("  Result:  ✗ UNPARSEABLE"),{lines:re,incrementStep:!0};case"segment-skipped":return null;case"error":return re.push(""),re.push(`ERROR: ${G.message}`),{lines:re,incrementStep:!1};default:return G}}function Bn(G,K){let ne=bo(K?.asciiOnly??!1),re=58,de=[],fe=1;de.push(...Lo(ne,58)),de.push("");let ve=G.trace.steps.find((ze)=>ze.type==="error");if(ve&&ve.type==="error"){de.push("ERROR"),de.push(`  ${ve.message}`),de.push(""),de.push("RESULT"),de.push(`  Status: ${G.result==="blocked"?at.red("BLOCKED"):at.green("ALLOWED")}`),de.push(""),de.push("CONFIG");let ze=G.configSource??"none";return de.push(`  Path: ${ze}`),de.join(`
`)}let ke=G.trace.steps.find((ze)=>ze.type==="parse");if(ke&&ke.type==="parse"){de.push("INPUT"),de.push(`  ${ke.input}`),de.push(""),de.push(`STEP ${fe} ${ne.h} Split shell commands`),fe++;for(let ze=0;ze<ke.segments.length;ze++){let ot=ke.segments[ze];if(ot){let st=Math.random();de.push(`  Segment ${ze+1}: ${wo(ot,st)}`)}}}let Se=G.trace.segments,He=Se.length>1;for(let ze of Se){if(He){de.push("");let ct="";if(ke&&ke.type==="parse"){let Sn=ke.segments[ze.index];if(Sn)ct=Sn.join(" ")}let dt=54,pt=ct,lt=` Segment ${ze.index+1}: `,mt=" ";if(ct){if(lt.length+ct.length+mt.length>dt){let qs=dt-lt.length-mt.length;pt=`${ct.substring(0,qs-1)}…`}}let vt=ct?`${lt}${pt}${mt}`:` Segment ${ze.index+1} `,Ms=ct?`${lt}${at.cyan(pt)}${mt}`:vt,lr=58-vt.length,cr=Math.floor(lr/2),Hs=lr-cr;de.push(`${ne.sh.repeat(cr)}${Ms}${ne.sh.repeat(Hs)}`)}if(ze.steps.find((ct)=>ct.type==="segment-skipped")){de.push(""),de.push("  (skipped — prior segment blocked)");continue}let st=!1,rt=!1;for(let ct of ze.steps){let dt=xo(ct,fe,ne);if(dt){if(rt=!0,ct.type==="recurse"){de.push("");let pt=" RECURSING ",lt=58-pt.length-4;de.push(`  ${ne.tl}${ne.h}${pt}${ne.h.repeat(lt)}`),de.push(`  ${ne.v}`),st=!0;continue}for(let pt of dt.lines)if(st)de.push(`  ${ne.v} ${pt}`);else de.push(pt);if(dt.incrementStep)fe++}}if(st)de.push(`  ${ne.v}`),de.push(`  ${ne.bl}${ne.h.repeat(56)}`);if(!rt)de.push(""),de.push(`  ${at.green("✓")} Allowed (no matching rules)`)}if(de.push(""),de.push("RESULT"),G.result==="blocked"){if(de.push(`  Status: ${at.red("BLOCKED")}`),G.customRule){if(de.push(`  Rule: ${G.customRule.id}`),G.customRule.rulebook)de.push(`  Rulebook: ${G.customRule.rulebook.name} ${G.customRule.rulebook.version}`);if(G.customRule.source)de.push(`  Source: ${G.customRule.source}`);if(G.customRule.override)de.push(`  Override: reason ${G.customRule.override.reason}`)}if(G.reason){let ze=Mt(G.reason,"          ");de.push(`  Reason: ${ze[0]}`);for(let ot=1;ot<ze.length;ot++)de.push(ze[ot]??"")}}else de.push(`  Status: ${at.green("ALLOWED")}`);de.push(""),de.push("CONFIG");let Ve=G.configSource??"none",nt=G.configValid?"":" (invalid)";de.push(`  Path: ${Ve}${nt}`);let Ke=G.safetyPresetScope;de.push(`  Safety preset: ${G.selectedPreset??"standard"}${Ke?` (${Qt(Ke)})`:""}`),de.push(`  Effective capabilities: ${G.effectiveLevel}`);let it=Object.entries(G.destructiveCommandRuleOverrides??{});if(de.push(`  Rule customizations: ${it.length}`),G.ruleActivation)de.push(`  Rule activation: ${G.ruleActivation.id} — ${G.ruleActivation.enabled?"on":"off"} via ${G.ruleActivation.source}`);return de.join(`
`)}function Gn(G){return JSON.stringify(G,null,2)}import{resolve as ol}from"node:path";var el=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function ko(G){let K=0,ne={allocateSegment(){return K++},getNextSegmentIndex(){return K},recordGlobal(re){G.record({kind:"step",scope:"global",step:re})},recordSegment(re,de=ne.currentSegmentIndex){if(de===void 0)return;G.record({kind:"step",scope:"segment",segmentIndex:de,step:re})}};return ne}function So(G={}){let K=[],ne=G.maxEvents??512,re={maxTextLength:G.maxTextLength??2048,maxListLength:G.maxListLength??128,maxObjectProperties:G.maxObjectProperties??G.maxListLength??128,maxDepth:G.maxDepth??16},de,fe=new Set;return{record(ve){if(de)return;if(!ve||K.length>=ne)return;try{K.push(Jn(tl(ve,re,fe)))}catch{}},finish(){if(de)return de;return de=Jn({events:Object.freeze(K)}),de}}}function tl(G,K,ne){if(G.kind!=="step")throw TypeError("invalid trace event");let{scope:re,step:de}=G;ln(de,ne,K);let fe=zn(de,K,ne);if(re==="global")return{kind:"step",scope:"global",step:fe};if(re!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:G.segmentIndex,step:fe}}function ln(G,K,ne,re=0,de=new WeakSet){if(typeof G==="string"){let ke=G.slice(0,ne.maxTextLength);if(!Fe(ke))return;for(let Se of qe(ke))for(let He of Se.match(/[^\s"'()$]+/g)??[])K.add(Ro(He));return}if(!G||typeof G!=="object"||re>=ne.maxDepth||de.has(G))return;if(de.add(G),Array.isArray(G)){let ke=Math.min(G.length,ne.maxListLength);for(let Se=0;Se<ke;Se++)ln(G[Se],K,ne,re+1,de);return}let fe=0,ve=new Set;for(let ke in G){if(!Object.hasOwn(G,ke))continue;if(fe>=ne.maxObjectProperties)break;fe++,ln(ke,K,ne);let Se=Vn(ke,ne,K);if(ve.has(Se))continue;ve.add(Se),ln(G[ke],K,ne,re+1,de)}}function zn(G,K,ne,re=0,de=new WeakSet){if(typeof G==="string")return Vn(G,K,ne);if(!G||typeof G!=="object")return G;if(re>=K.maxDepth)return;if(de.has(G))return;if(de.add(G),Array.isArray(G)){let ke=[],Se=Math.min(G.length,K.maxListLength);for(let He=0;He<Se;He++)ke.push(zn(G[He],K,ne,re+1,de));return ke}let fe={},ve=0;for(let ke in G){if(!Object.hasOwn(G,ke))continue;if(ve>=K.maxObjectProperties)break;ve++;let Se=Vn(ke,K,ne);if(Object.hasOwn(fe,Se))continue;Object.defineProperty(fe,Se,{value:zn(G[ke],K,ne,re+1,de),enumerable:!0,configurable:!0,writable:!0})}return fe}function Vn(G,K,ne){let re=G.slice(0,K.maxTextLength),de=Fe(re)?Oe(re):re,fe=ne.size>0?rl(de,ne):de;return(nl(fe)?be(fe):fe).slice(0,K.maxTextLength)}function nl(G){return G.includes("PRIVATE KEY")||G.includes("://")||G.includes("eyJ")||G.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(G)||G.length>=14&&el.some((K)=>G.includes(K))||G.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(G)}function rl(G,K){return G.replace(/[^\s"'()$]+/g,(ne)=>K.has(Ro(ne))?"<redacted>":ne)}function Ro(G){let K=2166136261,ne=2166136261;for(let re=0;re<G.length;re++)K=Math.imul(K^G.charCodeAt(re),16777619),ne=Math.imul(ne^G.charCodeAt(G.length-re-1),16777619);return`${K>>>0}:${ne>>>0}:${G.length}`}function Jn(G){if(G&&typeof G==="object"&&!Object.isFrozen(G)){for(let K of Object.values(G))Jn(K);Object.freeze(G)}return G}function Ht(G,K={},ne){let re=ol(K.cwd??process.cwd()),de=K.policySnapshot??R(ne,{cwd:re,userConfigDir:K.userConfigDir}),fe=T(de.policy,ne.env),ve=Ae({policySnapshot:de,effectiveCapabilities:fe.capabilities,strict:fe.strict,paranoidRm:fe.paranoidRm,paranoidInterpreters:fe.paranoidInterpreters,worktreeMode:fe.worktreeMode}),ke={effectiveLevel:ve.effectiveLevel,selectedPreset:de.policy.safety.level??"standard",...de.policyScopes?{safetyPresetScope:de.policyScopes.levelScope}:{},effectiveCapabilities:ve.effectiveCapabilities,destructiveCommandRuleOverrides:de.policy.destructiveCommandRuleOverrides},{configSource:Se,configValid:He}=il(ne,{cwd:re,userConfigDir:K.userConfigDir});if(!G||!G.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:Se,configValid:He,...ke};let Ve=f(G,"auto");if(Ve.status==="limited")throw new m;let nt=Ve.dialect==="powershell"?f(G,"posix"):Ve,Ke=tt(nt),it=So(),ze=ko(it);ze.recordGlobal({type:"parse",input:G,segments:Ke.map((vt)=>[...vt])});let ot=b("Bash",{command:G},{kind:"command",shell:"auto"},{configCwd:re,executionCwd:re},G),st=j(ot,{environment:ne,trace:ze,dependencies:{loadPolicySnapshot:()=>de}}),rt=st.decision.kind==="deny"?st.decision:null;if(rt&&(st.stage==="policy-protection"||st.stage==="secret-protection")){let vt=sl(rt);return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:vt.rule,matched:!0,reason:rt.reason}]}]},result:"blocked",reason:C(rt.reason),segment:C(Do(rt,G)),...vt.ruleId?{ruleId:C(vt.ruleId)}:{},configSource:Se,configValid:He,...ke}}let ct=ze.getNextSegmentIndex();if(rt&&ct>0&&ct<Ke.length)ze.recordSegment({type:"segment-skipped",index:ct,reason:"prior-segment-blocked"},ct);let dt=it.finish(),pt=rt?.ruleId??al(ot,de,fe,ne),lt=M.find((vt)=>vt.id===pt&&vt.activationCapability),mt=lt?ve.policy.effectiveDestructiveCommandRules[lt.id]:void 0;return{trace:cl(dt),result:rt?"blocked":"allowed",reason:rt?C(rt.reason):void 0,segment:rt?C(Do(rt,G)):void 0,ruleId:rt?.ruleId?C(rt.ruleId):void 0,customRule:ll(dl(rt?.ruleId,de)),configSource:Se,configValid:He,...ke,...lt&&mt?{ruleActivation:{id:lt.id,...mt}}:{}}}function Do(G,K){return G.evidence?.segment??K}function sl(G){if(G.reason===De)return{ruleId:"policy-protection",rule:"policy-protection:findPolicyConfigMutationTargetInSemanticFacts"};if(G.reason===Ie)return{ruleId:"policy-apply-protection",rule:"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts"};if(G.reason===y)return{ruleId:"git-metadata-protection",rule:"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts"};return{ruleId:G.ruleId,rule:"secret-protection:findSensitiveTargetInSemanticFacts"}}function il(G,K){let ne=D(K.cwd),re=O(G,K),de=B(G,{cwd:K.cwd,userConfigDir:K.userConfigDir});try{if(n(de.projectConfigTarget)!==null){if(Dt(de.projectConfigTarget).errors.length===0)return{configSource:ne,configValid:!0};return{configSource:ne,configValid:!1}}}catch(fe){if(fe instanceof r)return{configSource:ne,configValid:!1};throw fe}try{if(n(de.userConfigTarget)!==null){let fe=Dt(de.userConfigTarget);return{configSource:re,configValid:fe.errors.length===0}}return{configSource:null,configValid:!0}}catch(fe){if(fe instanceof r)return{configSource:re,configValid:!1};throw fe}}function al(G,K,ne,re){let de=K.policy,fe=xe({...de,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...de.destructiveCommandRuleOverrides,...Object.fromEntries(M.flatMap((ke)=>ke.activationCapability?[[ke.id,"on"]]:[]))}},K.state==="degraded"?{diagnostics:K.diagnostics,reason:K.reason}:void 0),ve=j(G,{environment:re,dependencies:{loadPolicySnapshot:()=>fe,getModes:()=>({...ne,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return ve.decision.kind==="deny"?ve.decision.ruleId:void 0}function ll(G){if(!G)return;return{id:C(G.id),...G.rulebook?{rulebook:{name:C(G.rulebook.name),version:C(G.rulebook.version)}}:{},...G.source?{source:C(G.source)}:{},...G.override?{override:{type:"reason",reason:C(G.override.reason)}}:{}}}function cl(G){let K=G.events.flatMap((re)=>re.kind==="step"&&re.scope==="global"?[re.step]:[]),ne=new Map;for(let re of G.events){if(re.kind!=="step"||re.scope!=="segment")continue;let de=ne.get(re.segmentIndex)??{index:re.segmentIndex,steps:[]};de.steps.push(re.step),ne.set(re.segmentIndex,de)}return{steps:K,segments:[...ne.values()]}}function dl(G,K){let ne=G?.replace(/^custom\./,"");if(!ne||!K.policy.rules.some((re)=>re.name===ne))return;return K.ruleMetadata[ne]??Object.freeze({id:ne})}function Co(G){return new Promise((K)=>{process.stdout.write(`${G}
`,()=>K())})}async function Po(G,K){let ne=qn(K);if(!ne)return 1;try{let re=Ht(ne.command,{cwd:ne.cwd},G),de=!!process.env.NO_COLOR||!process.stdout.isTTY;return await Co(ne.json?Gn(re):Bn(re,{asciiOnly:de})),0}catch(re){let de=ul(re instanceof x?re.cause:re);if(de===void 0)throw re;if(ne.json)return await Co(JSON.stringify({error:de})),1;return console.error(de),1}}function ul(G){if(G instanceof m)return G.message;if(G instanceof g)return G.message;if(G instanceof s&&a[G.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Eo="2.4.14",Lt="  ",$t="cc-safety-net";function $o(G){return G.argument?`${G.flags} ${G.argument}`:G.flags}function pl(G){return Math.max(...G.map((K)=>$o(K).length))}function fl(G){return Math.max(...G.map((K)=>K.usage.length))}function ml(G){return Math.max(...G.map((K)=>`${$t} ${K.usage}`.length))}function gl(G,K){let ne=`${$t} ${G.usage}`;return`${Lt}${ne.padEnd(K+2)}${G.description}`}function xt(G,K){return`${Lt}${G.padEnd(Math.max(40,G.length+2))}${K}`}function Nt(G,K=console.log){let ne=[];if(ne.push(`${$t} ${G.name}`),ne.push(""),ne.push(`${Lt}${G.description}`),ne.push(""),ne.push("USAGE:"),ne.push(`${Lt}${$t} ${G.usage}`),ne.push(""),G.subcommands&&G.subcommands.length>0){ne.push("SUBCOMMANDS:");let re=fl(G.subcommands);for(let de of G.subcommands)ne.push(`${Lt}${de.usage.padEnd(re+2)}${de.description}`);ne.push("")}if(G.options.length>0){ne.push("OPTIONS:");let re=pl(G.options);for(let de of G.options){let fe=$o(de),ve=de.default?`${de.description} (default: ${de.default})`:de.description;ne.push(`${Lt}${fe.padEnd(re+2)}${ve}`)}ne.push("")}if(G.examples&&G.examples.length>0){ne.push("EXAMPLES:");for(let re of G.examples)ne.push(`${Lt}${re}`)}K(ne.join(`
`))}function Wn(){let G=ml(Jt),K=[];K.push(`${$t} v${Eo}`),K.push(""),K.push("Blocks destructive commands and secret access."),K.push(""),K.push("COMMANDS:");for(let ne of Jt)K.push(gl(ne,G));K.push(""),K.push("GLOBAL OPTIONS:"),K.push(`${Lt}-h, --help       Show help (use with command for command-specific help)`),K.push(`${Lt}-V, --version    Show version`),K.push(""),K.push("HELP:"),K.push(`${Lt}${$t} help <command>     Show help for a specific command`),K.push(`${Lt}${$t} <command> --help   Show help for a specific command`),K.push(""),K.push("ENVIRONMENT VARIABLES:"),K.push(xt(`${i.level.name}=standard|strict|paranoid`,"Set session safety level")),K.push(xt(`${i.worktree.name}=1`,"Allow local git discards in linked worktrees")),K.push(xt(`${i.debug.name}=1`,"Print diagnostic messages to stderr")),K.push(xt(`${i.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),K.push(xt("CC_SAFETY_NET_HOME","Override rule config home directory")),K.push(""),K.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),K.push(xt(`${i.strict.name}=1`,"Force safety.overrides.fail_closed on")),K.push(xt(`${i.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),K.push(xt(`${i.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),K.push(xt(`${i.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),K.push(""),K.push("Documentation:        https://local/cc-safety-net/docs"),console.log(K.join(`
`))}function Ao(){console.log(Eo)}function Yn(G,K=console.log){let ne=Wt(G);if(!ne)return!1;if(ne.name.toLowerCase()!==G.toLowerCase())return!1;return Nt(ne,K),!0}import{mkdirSync as wl}from"node:fs";import{dirname as xl}from"node:path";import{createInterface as kl}from"node:readline";import{existsSync as jo,readFileSync as hl}from"node:fs";function At(G,K){let ne=Be(G,K);return{policy:ne.policy,errors:X(Ue(ne.issues,We,(re)=>re.kind==="custom")," "," ")}}function qt(G,K){return At(G,K).errors}function _o(G,K){return{"safety.level":G.safety.level,...Kn("safety.overrides",G.safety.overrides),"workflow.worktree_mode":String(G.workflow.worktree_mode),"destructive_command_protection.enabled":String(G.destructive_command_protection.enabled),...Kn("destructive_command_protection.overrides",G.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":Zn(G.destructive_command_protection.allow_paths),"secret_protection.enabled":String(G.secret_protection.enabled),...Kn("secret_protection.overrides",G.secret_protection.overrides),"secret_protection.deny_paths":Zn(G.secret_protection.deny_paths),"secret_protection.allow_paths":Zn(G.secret_protection.allow_paths),...K?{"audit.retention_days":String(G.audit.retention_days)}:{}}}function cn(G,K,ne){let re=_o(G,ne),de=_o(K,ne);return[...new Set([...Object.keys(re),...Object.keys(de)])].flatMap((fe)=>re[fe]===de[fe]?[]:[{field:fe,before:re[fe],after:de[fe]}])}function Ut(G,K){let ne=l(G,K);if(!jo(ne))return{baseline:L(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,G.home),diagnostics:[]};let re=_t(ne),de=At(re.value,G.home);return{baseline:de.policy,diagnostics:re.errors.length>0?re.errors:de.errors}}function _t(G){if(!jo(G))return{errors:[`${G}: file not found`]};try{return{value:JSON.parse(hl(G,"utf-8")),errors:[]}}catch(K){let ne=K instanceof Error?K.message:String(K);return{errors:[`${G}: ${K instanceof SyntaxError?`Invalid JSON: ${ne}`:ne}`]}}}function dn(G,K){let ne=yl(G)?G:{};return{version:K.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((re)=>ne[re]!==void 0).map((re)=>[re,ne[re]]))}}function Kn(G,K){return Object.fromEntries(Object.entries(K).flatMap(([ne,re])=>re===void 0?[]:[[`${G}.${ne}`,String(re)]]))}function Zn(G){return G.length===0?"(none)":G.join(", ")}function yl(G){return!!G&&typeof G==="object"&&!Array.isArray(G)}import{chmodSync as vl,existsSync as To,mkdirSync as bl,readFileSync as Fo}from"node:fs";import{dirname as Ll}from"node:path";function Oo(G,K={}){let ne=l(G,K);if(!To(ne))return{path:ne,exists:!1,raw:"",policy:N(),errors:[]};let re=Fo(ne,"utf-8");if(!re.trim())return{path:ne,exists:!0,raw:re,policy:N(),errors:["Config file is empty"]};try{let de=At(JSON.parse(re),G.home);return{path:ne,exists:!0,raw:re,policy:de.policy,errors:de.errors}}catch(de){return{path:ne,exists:!0,raw:re,policy:N(),errors:[`Invalid JSON: ${de instanceof Error?de.message:String(de)}`]}}}function kt(G,K,ne={}){let re=l(G,ne),de=At(K,G.home);if(de.errors.length>0)return{path:re,policy:N(),errors:de.errors};let fe=de.policy;return bl(Ll(re),{recursive:!0,mode:448}),p(Y(re),`${JSON.stringify(fe,null,2)}
`,384),vl(re,384),{path:re,policy:fe,errors:[]}}function Io(G,K){let ne=At(K,G.home);if(ne.errors.length>0)return{errors:ne.errors};return{preview:Re(ne.policy,G.env),errors:[]}}function No(G,K={}){let ne=l(G,K);if(!To(ne))return kt(G,V,K);let re=Fo(ne,"utf-8");if(!re.trim())return kt(G,V,K);try{return kt(G,L(JSON.parse(re),G.home),K)}catch{return kt(G,V,K)}}var Mo=new Set(["check","apply"]),Ho="(unset)";async function Uo(G,K,ne={}){let re=gt({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},K),de=re.positionals[0],fe=[...re.errors,...de&&!Mo.has(de)?[`Unknown policy subcommand: ${de}`]:[],...de&&Mo.has(de)&&!re.positionals[1]?[`policy ${de} requires a file`]:[],...re.positionals.slice(2).map((ze)=>`Unexpected policy argument: ${ze}`)];if(fe.length>0){for(let ze of fe)console.error(ze);return 1}let ve=re.positionals[1];if(!de||!ve)return Nt(Vt,console.error),1;let ke=re.flags.global?l(G):h(ne.cwd??process.cwd()),Se=_t(ve),He=[...Se.errors,...qt(Se.value,G.home).map((ze)=>`${ve}: ${ze}`),...!re.flags.global&&Dl(Se.value)&&Se.value.audit!==void 0?[`${ve}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(He.length>0){for(let ze of He)console.error(ze);return 1}let Ve=L(Se.value,G.home);if(console.log(`Scope: ${re.flags.global?"user":"project"} (${ke})`),console.log(`Proposal: ${ve}`),re.flags.global)qo(L(_t(ke).value,G.home),Ve,!0);if(!re.flags.global){let ze=Ut(G).baseline;console.log("Effective policy (user + project merged):"),qo(H(ze,te(_t(ke).value,G.home).policy).policy,H(ze,te(Se.value,G.home).policy).policy,!1)}if(de==="check")return 0;let nt=ne.input??process.stdin,Ke=ne.output??process.stdout;if(!nt.isTTY||!Ke.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ve}${re.flags.global?" --global":""}`),1;if(!await Sl(`Apply this policy to ${ke}? [y/N] `,nt,Ke))return console.log("Cancelled; nothing was written."),0;return Rl(G,ke,Se.value,Ve,re.flags.global),console.log(`Policy applied: ${ke}`),0}function Sl(G,K,ne){let re=kl({input:K,output:ne,terminal:!1});return new Promise((de)=>{re.once("close",()=>de(!1)),re.question(G,(fe)=>{de(/^y(es)?$/i.test(fe.trim())),re.close()})})}function Rl(G,K,ne,re,de){if(de){kt(G,re);return}wl(xl(K),{recursive:!0}),ht(K,dn(ne,re))}function qo(G,K,ne){let re=cn(G,K,ne);if(re.length===0){console.log("No changes.");return}console.log(`Changes (${re.length}):`);for(let de of re)console.log(`  ${de.field}: ${de.before??Ho} -> ${de.after??Ho}`)}function Dl(G){return!!G&&typeof G==="object"&&!Array.isArray(G)}import{join as Ac}from"node:path";var Bo="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- Transparent wrappers have no built-in defaults. Configure only wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function un(G,K){if(!G.ok){Wo(G);return}Vo(G,K)}function zo(G,K,ne){if(G.ok)console.log(ne);if(!G.add){un(G,`Added rulebook source: ${K}`);return}if(!G.ok){Wo(G);return}if(G.add.added.length>0)console.log(`Added ${G.add.added.length} ${G.add.added.length===1?"rulebook":"rulebooks"} from ${G.add.source} at ${G.add.ref}:`),G.add.added.forEach((re)=>{console.log(`  - ${re}`)});if(G.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${G.add.source} at ${G.add.ref}: ${G.add.alreadyConfigured.join(", ")}`);if(G.add.commits.length>0)console.log(`Vendored at ${G.add.commits.map((re)=>re.slice(0,7)).join(", ")}.`);Vo(G,"Rule config updated.")}function Vo(G,K){for(let ne of G.changes??[])console.log(ne);console.log(K),console.log(""),Cl(G.entries)}function Cl(G){if(G.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${G.length}):`);for(let K of G)console.log(`  - ${K.name} ${K.version} (${Pl(K.ruleCount)})`),console.log(`    Source: ${K.spec}`)}function Pl(G){return`${G} ${G===1?"rule":"rules"}`}function Jo(G){jt("Active sources",G.rulebooks,(K)=>[`[${K.source}] ${K.name} ${K.version}`,`  Source: ${K.spec}`]),jt("Active rules",G.rules,(K)=>[`[${$l(G,K.name)}] ${K.name}`,...El(K),`  Reason: ${K.reason}`]),jt("Disabled rules",Go(G,"off"),(K)=>[K.key]),jt("Reason overrides",Go(G,"reason"),(K)=>[K.key,`  Reason: ${K.value.reason}`]),jt("Transparent wrappers",G.transparent_wrappers,(K)=>[K]),jt("Issues",G.errors,(K)=>[K]),jt("Warnings",G.warnings,(K)=>[K])}function jt(G,K,ne){if(K.length===0){console.log(`${G}: (none)`);return}console.log(`${G} (${K.length}):`);for(let re of K){let[de,...fe]=ne(re);console.log(`  - ${de}`);for(let ve of fe)console.log(`    ${ve}`)}}function El(G){if(!G.match)return[`  Command: ${G.subcommand?`${G.command} ${G.subcommand}`:G.command}`,`  Block args: ${G.block_args.join(", ")}`];return[`  Command: ${[G.command,...G.match.command_path].join(" ")}`,...G.match.any_args?[`  Any args: ${G.match.any_args.join(", ")}`]:[],...G.match.exclude_args?[`  Exclude args: ${G.match.exclude_args.join(", ")}`]:[]]}function $l(G,K){return G.rulebooks.find((ne)=>ne.rules.includes(K))?.source??"project"}function Go(G,K){return Object.entries({...G.userConfig?.overrides,...G.projectConfig?.overrides}).filter((ne)=>{if(K==="off")return ne[1]==="off";return!!ne[1]&&typeof ne[1]==="object"}).map(([ne,re])=>({key:ne,value:re}))}function Wo(G){for(let K of G.errors)console.error(K)}import{dirname as ys,join as bn}from"node:path";import{join as nr,resolve as Ul}from"node:path";function Xn(G){let K=u(G);if(K.errors.length>0)return{ok:!1,result:{ok:!1,errors:K.errors,entries:[]}};return{ok:!0,config:K.config??et}}function Yo(G){ht(G,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function Ko(G){ht(G,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as gn}from"node:path";var Al="custom.";function pn(G){if(G.rulebook_version!==2)return[];let K=G.rules.map((ne)=>({name:ne.name,command:ne.command,block_args:[],match:ne.match,reason:ne.reason,intent:ne.intent}));return(G.tests??[]).flatMap((ne,re)=>{let de=Qn(f(ne.command));if(de.length===0)return[`tests[${re}]: could not parse fixture command: ${ne.command}`];let fe=de.reduce((ve,ke)=>ve??k(ke,K)?.id.slice(Al.length),void 0);if(ne.expect==="blocked"){if(fe===ne.rule)return[];let ve=fe?`"${fe}" matched first`:"no rule matched";return[`tests[${re}]: expected "${ne.rule}" to block "${ne.command}" but ${ve}`]}return fe?[`tests[${re}]: expected "${ne.command}" to be allowed but "${fe}" matched`]:[]})}function Qn(G){return G.nodes.flatMap((K)=>{if(K.kind==="group"||K.kind==="function")return Qn(K.body);if(K.kind!=="command")return[];let ne=ue(q(K.dialect,K.words)).words.map(t);return[...ne.length>0?[ne]:[],...K.nested.flatMap((re)=>Qn(re))]})}var fn=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function mn(G={}){return{requests:0,responseBytes:0,maxRequests:G.maxRequests??fn.maxRequests,maxResponseBytes:G.maxResponseBytes??fn.maxResponseBytes}}function St(G){return{controller:new AbortController,budget:mn(),resolveUrl:G}}function Zo(G){return G instanceof Error&&G.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function Xo(G){if(G.requests>=G.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");G.requests++}function Qo(G,K){if(K>G.maxResponseBytes-G.responseBytes)throw G.responseBytes+=K,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");G.responseBytes+=K}var ns=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function es(G,K,ne=v(gn(gn(K)),"rules policy"),re=St()){if(S(G))return Fl(G,re);return Tl(G,K,ne)}async function rs(G,K,ne,re,de,fe){if(!S(G))return es(G,K,ne,re);let ve=de?null:_l(G,K,ne);if(ve)return ve;if(!de&&!fe)throw Error(`${G} is not vendored; run rule update ${G} to vendor it`);return es(G,K,ne,re)}function _l(G,K,ne=v(gn(gn(K)),"rules policy")){let re=_(G),de=P(K,re.name),fe=n(o(ne,de));if(fe===null)return null;let ve=Q(er(fe,`Invalid rulebook ${de}.`));if(ve.name!==re.name)throw Error(`rulebook name "${ve.name}" in ${de} must match "${re.name}"`);return{spec:G,rulebook:ve,content:fe}}async function os(G,K={}){if(!W(G))throw Error(`Invalid GitHub repository source: ${G}`);let[ne,re]=G.split("/");if(!ne||!re)throw Error(`Invalid GitHub repository source: ${G}`);if(K.ref!==void 0&&!Z(K.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${K.ref}`);let de=K.operation??St(),fe=K.ref??await jl(ne,re,G,de),ve=await is(ne,re,fe,G,de),ke=await hn(`https://api.github.com/repos/${ne}/${re}/git/trees/${ve}?recursive=1`,"tree",de),Se=ke.response;if(!Se.ok)throw Error(`Failed to inspect ${G}: GitHub tree returned ${Se.status}`);let He=JSON.parse(ke.content);if(!Array.isArray(He?.tree))throw Error(`Failed to inspect ${G}: unexpected GitHub tree response`);let Ve=He.tree,nt=[...new Set(Ve.flatMap((Ke)=>{if(!Ke||typeof Ke!=="object")return[];let it=Ke;if(it.type!=="blob"||typeof it.path!=="string")return[];let ze=it.path.match(Xe);return ze?.[1]?[ze[1]]:[]}))].sort();if(nt.length===0)throw Error(`No rulebooks found in ${G} under ${se}/`);return{source:G,owner:ne,repo:re,ref:fe,commit:ve,names:nt}}async function jl(G,K,ne,re){let de=await hn(`https://api.github.com/repos/${G}/${K}`,"metadata",re),fe=de.response;if(!fe.ok)throw Error(`Failed to inspect ${ne}: GitHub returned ${fe.status}`);let ke=JSON.parse(de.content)?.default_branch;if(typeof ke!=="string"||ke==="")throw Error(`Failed to inspect ${ne}: missing default branch`);if(!Z(ke))throw Error(`GitHub returned an invalid default branch: ${ke}`);return ke}function Tl(G,K,ne){Qe(G);let re=P(K,G),de=n(o(ne,re));if(de===null)throw Error(`Rulebook source not found: ${G}`);let fe=ss(er(de,"Invalid local rulebook source."));if(fe.name!==G)throw Error(`rulebook name "${fe.name}" must match local source "${G}"`);return{spec:G,rulebook:fe,content:de}}async function Fl(G,K){let ne=_(G),re=await is(ne.owner,ne.repo,ne.ref,G,K),de=await hn(`https://raw.githubusercontent.com/${ne.owner}/${ne.repo}/${re}/${ne.path}`,"raw",K),fe=de.response;if(!fe.ok)throw Error(`Failed to fetch ${G}: GitHub raw returned ${fe.status}`);let ve=de.content,ke=ss(er(ve,"Invalid GitHub rulebook response."));if(ke.name!==ne.name)throw Error(`rulebook name "${ke.name}" must match GitHub source "${ne.name}"`);return{spec:G,rulebook:ke,content:ve}}function ss(G){let K=Q(G),ne=pn(K);if(ne.length>0)throw Error(ne.join("; "));return K}function er(G,K){try{return JSON.parse(G)}catch{throw Error(K)}}async function is(G,K,ne,re,de){let fe=await hn(`https://api.github.com/repos/${G}/${K}/commits/${encodeURIComponent(ne)}`,"commit",de),ve=fe.response;if(!ve.ok)throw Error(`Failed to resolve ${re}: GitHub returned ${ve.status}`);let ke=JSON.parse(fe.content);if(typeof ke?.sha!=="string"||ke.sha==="")throw Error(`Failed to resolve commit for ${re}`);return ke.sha}async function Ol(G,K,ne={}){if(ne.signal?.aborted)throw ne.signal.reason;let re=ne.budget??mn(),de=new AbortController,fe=()=>de.abort(ne.signal?.reason);ne.signal?.addEventListener("abort",fe,{once:!0});let ve=!1,ke=setTimeout(()=>{if(de.signal.aborted)return;ve=!0,de.abort()},ne.timeoutMs??ns.timeoutMs);try{if(ne.signal?.aborted)throw ne.signal.reason;Xo(re);let Se=await fetch(G,{signal:de.signal,redirect:"error"});if(!Se.ok)return as(Se),{response:Se,content:""};return{response:Se,content:await Il(Se,K,re,()=>de.abort())}}catch(Se){if(ve)throw Error("GitHub request timed out",{cause:Se});if(ne.signal?.aborted)throw ne.signal.reason;throw Se}finally{clearTimeout(ke),ne.signal?.removeEventListener("abort",fe)}}function hn(G,K,ne){return Ol(ne.resolveUrl?.(G)??G,K,{budget:ne.budget,signal:ne.controller.signal})}async function Il(G,K,ne=mn(),re){let de=ns[`${K}Bytes`],fe=Number(G.headers.get("content-length"));if(Number.isFinite(fe)&&fe>de)throw as(G),Error(`GitHub ${K} response exceeds ${de} bytes`);if(!G.body)return"";let ve=G.body.getReader(),ke=[],Se=0;while(!0){let He=await ve.read();if(He.done)break;try{Qo(ne,He.value.byteLength)}catch(Ve){throw re?.(),ts(ve),Ve}if(Se+=He.value.byteLength,Se>de)throw re?.(),ts(ve),Error(`GitHub ${K} response exceeds ${de} bytes`);ke.push(Buffer.from(He.value))}return Buffer.concat(ke,Se).toString("utf-8")}function as(G){if(!G.body)return;ls(()=>G.body?.cancel())}function ts(G){ls(()=>G.cancel())}function ls(G){try{Promise.resolve(G()).catch(()=>{})}catch{}}var Nl=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function cs(G,K){let ne=ps(G.rules,K);if(ne.length>0)return{ok:!0,specs:ne};return us(G.rules,K)}function ds(G,K){let ne=ps(G,K);if(ne.length>0)return{ok:!0,specs:ne};let re=Hl(G,K);if(re.length>0)return{ok:!0,specs:re};let de=ql(G,K);if(!de.ok)return de;if(de.specs.length>0)return{ok:!0,specs:de.specs};return us(G,K)}function us(G,K){let ne=G.filter((re)=>tr(re)?.name===K);if(ne.length===1)return{ok:!0,specs:ne};return Ml(K,ne)}function Ml(G,K){return{ok:!1,result:{ok:!1,errors:K.length===0?[`No configured rulebook matches ${G}`]:[`Ambiguous rulebook match ${G}: ${K.join(", ")}`],entries:[]}}}function ps(G,K){return G.filter((ne)=>ne===K)}function Hl(G,K){let ne=K.match(Nl),re=ne?.[1],de=ne?.[2],fe=ne?.[3];if(!re||!de||!fe||!Z(fe))return[];return fs(G,(ve)=>ve.owner===re&&ve.repo===de&&ve.ref===fe)}function ql(G,K){if(!W(K))return{ok:!0,specs:[]};let[ne,re]=K.split("/"),de=fs(G,(ve)=>ve.owner===ne&&ve.repo===re);if(new Set(de.map((ve)=>tr(ve)?.ref).filter((ve)=>!!ve)).size<2)return{ok:!0,specs:de};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${K}. Use an explicit ref:`,`  cc-safety-net rule remove ${K}#<ref>`],entries:[]}}}function tr(G){try{return _(G)}catch{return null}}function fs(G,K){return G.filter((ne)=>{let re=tr(ne);return re?K(re):!1})}async function vn(G,K={}){let ne=rr(K);return Bl(G,ne,await yn(G,ne,St()))}function Bl(G,K,ne){if(!ne.ok)return ne;let re=yt(G,K),de=[...new Set(F(re.configPath,re.filesystemScope))];if(de.length===0)return ne;return{ok:!1,errors:de,entries:ne.entries}}async function yn(G,K,ne,re={},de=new Set,fe=new Set){try{let ve=yt(G,K),ke=Xn(ve.configTarget);if(!ke.ok)return ke.result;let Se=ke.config,He=K.only?cs(Se,K.only):{ok:!0,specs:Se.rules};if(!He.ok)return He.result;let Ve=new Set([...K.refresh?He.specs:[],...de]),nt=(lt)=>rs(lt,ve.configDir,ve.filesystemScope,ne,Ve.has(lt),!K.refresh||Ve.has(lt)),Ke=await ec(Se.rules,K.refresh?(lt)=>nt(lt).then((mt)=>({ok:!0,item:mt})).catch((mt)=>{if(Zo(mt))throw mt;return{ok:!1,spec:lt,message:mt instanceof Error?mt.message:String(mt)}}):async(lt)=>({ok:!0,item:await nt(lt)}),ne),it=Ke.filter((lt)=>!lt.ok),ze=Ke.filter((lt)=>lt.ok).map((lt)=>lt.item),ot=ze.flatMap((lt)=>Gl(lt,Se.rules)),st=ze.flatMap((lt)=>zl(lt,fe,ve)),rt=new Set([...ot,...st].map((lt)=>lt.spec)),ct=[...it,...ot,...st],dt=[],pt=Jl(dt,()=>ze.flatMap((lt)=>rt.has(lt.spec)||ct.length>0&&fe.has(lt.spec)?[]:Vl(lt,ve,re,dt)));return{ok:ct.length===0,errors:ct.map((lt)=>`Failed to update ${lt.spec}: ${lt.message}`),entries:ze.map(Yl),changes:pt}}catch(ve){return Gt(ve)}}function Gl(G,K){if(!S(G.spec))return[];let ne=Le(G.spec),re=K.filter((de)=>de!==G.spec&&Le(de).toLowerCase()===ne.toLowerCase());if(re.length===0)return[];return[{ok:!1,spec:G.spec,message:`rulebook name "${ne}" is also claimed by ${re.join(", ")}; rename one of them`}]}function zl(G,K,ne){if(!K.has(G.spec)||!S(G.spec))return[];let re=P(ne.configDir,G.rulebook.name),de=n(o(ne.filesystemScope,re));if(de===null||de===G.content)return[];return[{ok:!1,spec:G.spec,message:`${re} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function Vl(G,K,ne,re){if(!S(G.spec))return[];let de=P(K.configDir,G.rulebook.name),fe=o(K.filesystemScope,de),ve=n(fe);if(ve===G.content)return[];return re?.push({target:fe,previous:ve}),p(fe,G.content,void 0,ne._testAfterPolicyRename),Wl(G,ve)}function Jl(G,K){try{return K()}catch(ne){for(let re of[...G].reverse()){if(re.previous===null){I(re.target);continue}p(re.target,re.previous)}throw ne}}function Wl(G,K){if(K===null)return[`Vendored ${G.spec} (${G.rulebook.version})`];let ne=le(K),re="problem"in ne?null:ne.rulebook,de=new Map(re?.rules.map((ve)=>[ve.name,JSON.stringify(ve)])??[]),fe=new Set(G.rulebook.rules.map((ve)=>ve.name));return[`Updated ${G.spec} (${re?.version??"unreadable"} -> ${G.rulebook.version})`,...[...fe].filter((ve)=>!de.has(ve)).map((ve)=>`  + ${ve}`),...[...de.keys()].filter((ve)=>!fe.has(ve)).map((ve)=>`  - ${ve}`),...G.rulebook.rules.filter((ve)=>{let ke=de.get(ve.name);return ke!==void 0&&ke!==JSON.stringify(ve)}).map((ve)=>`  ~ ${ve.name}`)]}function Yl(G){return{spec:G.spec,name:G.rulebook.name,version:G.rulebook.version,ruleCount:G.rulebook.rules.length}}async function ms(G,K,ne={}){return Kl(G,K,nc(ne),St())}async function Kl(G,K,ne,re,de={}){let fe=null,ve=!1;try{let ke=yt(G,ne),Se=n(ke.configTarget);fe={target:ke.configTarget,content:Se};let He=Xn(ke.configTarget);if(!He.ok)return He.result;let Ve=He.config,nt=W(K);Zl(K,ne,nt);let Ke=nt?await os(K,{ref:ne.ref,operation:re}):null,it=Ke?Xl(Ke,ne.rulebooks):[],ze=Ke?it.map((dt)=>Ql(Ve.rules,Ke,dt)??`${K}#${Ke.ref}/${dt}`):[K],ot=ze.filter((dt)=>!Ve.rules.includes(dt)),st=[...Ve.rules,...ot];if(st.length>ae)return tc();if(st.length!==Ve.rules.length)ve=!0,ht(ke.configTarget,{version:1,rules:st,overrides:Ve.overrides??{},transparent_wrappers:Ve.transparent_wrappers??[]},void 0,de._testAfterPolicyRename);let rt=await yn(G,ne,re,de,new Set(ot),new Set(ot));if(!rt.ok)Bt(ke.configTarget,Se);if(!rt.ok||!Ke)return rt;let ct=it.filter((dt,pt)=>ot.includes(ze[pt]??""));return{...rt,add:{source:K,ref:Ke.ref,selected:it,added:ct,alreadyConfigured:it.filter((dt)=>!ct.includes(dt)),commits:ot.length>0?[Ke.commit]:[]}}}catch(ke){if(ve&&fe)try{Bt(fe.target,fe.content)}catch(Se){return Gt(Se)}return Gt(ke)}}function Zl(G,K,ne){if(!ne&&K.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!ne&&K.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${G}`);if(K.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let re=K.rulebooks?.filter((de)=>!c.test(de))??[];if(re.length>0)throw Error(`Invalid rulebook names: ${re.join(", ")}`)}function Xl(G,K){let ne=K?[...new Set(K)]:G.names,re=ne.filter((de)=>!G.names.includes(de));if(re.length>0)throw Error(`Rulebooks not found in ${G.source} at ${G.ref}: ${re.join(", ")}
Available rulebooks: ${G.names.join(", ")}`);return ne}function Ql(G,K,ne){let re=`${K.source}#${K.ref}/${ne}`;if(G.includes(re))return re;let de=`${K.source}#${K.commit}/${ne}`;return G.find((fe)=>fe===de)}async function ec(G,K,ne=St()){if(G.length>ae)throw Error(ce);let re=[],de=0,fe,ve=Array.from({length:Math.min(G.length,fn.concurrency)},async()=>{while(!fe){let ke=de;if(ke>=G.length)return;de++;try{re[ke]=await K(G[ke],ke,ne.controller.signal)}catch(Se){if(!fe)fe={value:Se},de=G.length,ne.controller.abort(Se);return}}});if(await Promise.all(ve),fe)throw fe.value;return re}function tc(){return{ok:!1,errors:[ce],entries:[]}}function rr(G){return{cwd:G.cwd,userConfigDir:G.userConfigDir,userConfigPath:G.userConfigPath,projectConfigPath:G.projectConfigPath,global:G.global,only:G.only,refresh:G.refresh}}function nc(G){return{...rr(G),ref:G.ref,rulebooks:G.rulebooks}}function rc(G){return{...rr(G),deleteSource:G.deleteSource}}async function gs(G,K,ne={}){try{return await oc(G,K,rc(ne),{})}catch(re){return Gt(re)}}async function oc(G,K,ne,re){let de=yt(G,ne),fe=u(de.configTarget);if(fe.errors.length>0)return{ok:!1,errors:fe.errors,entries:[]};if(!fe.config)return{ok:!1,errors:[`No config found at ${de.configPath}`],entries:[]};let ve=ds(fe.config.rules,K);if(!ve.ok)return ve.result;let ke=ne.deleteSource?sc(de.configDir,ve.specs,de.filesystemScope):{ok:!0,dirs:[]};if(!ke.ok)return ke.result;let Se=n(de.configTarget);if(Se===null)return Gt(Error("Rules config is unavailable."));try{ht(de.configTarget,{version:1,rules:fe.config.rules.filter((nt)=>!ve.specs.includes(nt)),overrides:fe.config.overrides??{},transparent_wrappers:fe.config.transparent_wrappers??[]},void 0,re._testAfterPolicyRename)}catch(nt){throw Bt(de.configTarget,Se),nt}let He=await yn(G,ne,St(),re);if(!He.ok)return Bt(de.configTarget,Se),He;let Ve=ic(ke.dirs,re,de.filesystemScope);if(!Ve.ok){Bt(de.configTarget,Se);let nt=await yn(G,ne,St(),re);if(!nt.ok)return{ok:!1,errors:[...Ve.result.errors,...nt.errors],entries:nt.entries};return Ve.result}return He}function sc(G,K,ne){let re=K.flatMap((ke)=>c.test(ke)?[]:["--delete-source can only delete local rulebook sources"]),de=K.map((ke)=>nr(G,ke)),fe=re.length>0?[]:de.flatMap((ke)=>hs(ke,ne)),ve=[...re,...fe];return ve.length>0?{ok:!1,result:{ok:!1,errors:ve,entries:[]}}:{ok:!0,dirs:de}}function hs(G,K){let ne=Ul(G),re=o(K,ne),de=oe(re);if(!de)return[`Local rulebook source directory not found: ${G}`];let fe=de.find((ve)=>ve.name==="rulebook.json");if(!fe)return[`Local rulebook source directory is missing rulebook.json: ${G}`];if(fe.kind!=="file")throw new r(K.label);if(n(o(K,nr(ne,"rulebook.json"))),de.length>1)return[`Local rulebook source directory contains extra files: ${G}. delete manually if you really want to remove the directory.`];return[]}function ic(G,K,ne){let re=G.flatMap((de)=>{try{if(!oe(o(ne,de)))return[];let fe=hs(de,ne);if(fe.length>0)return fe;return ac(de,K,ne),[]}catch(fe){return[`Failed to delete local rulebook source ${de}: ${fe instanceof Error?fe.message:String(fe)}`]}});return re.length>0?{ok:!1,result:{ok:!1,errors:re,entries:[]}}:{ok:!0}}function ac(G,K,ne){if(K._testDeleteLocalSourceDir){K._testDeleteLocalSourceDir(G);return}I(o(ne,nr(G,ie))),Ze(o(ne,G))}function Bt(G,K){if(K===null){I(G);return}p(G,K)}function Gt(G){return{ok:!1,errors:[G instanceof Error?G.message:String(G)],entries:[]}}var lc=".safety-net.json",cc="~/.cc-safety-net/config.json";async function Ls(G,K){return[await vs(G,{legacyPath:Yr({cwd:K.cwd}),configPath:D(K.cwd),defaultRulebookName:"project-rules",migratedFrom:lc,cleanup:K.cleanup,syncOptions:{cwd:K.cwd}}),await vs(G,{legacyPath:Kt(G),configPath:O(G),defaultRulebookName:"user-rules",migratedFrom:cc,cleanup:K.cleanup,syncOptions:{cwd:K.cwd,global:!0}})].every((re)=>re)?0:1}async function vs(G,K){let ne=yt(G,K.syncOptions),re=o(ne.filesystemScope,K.legacyPath),de=n(re);if(de===null)return console.log(`No legacy config found at ${K.legacyPath}`),!0;let fe=uc(de);if(!fe.ok){for(let it of fe.errors)console.error(it);return!1}let ve=u(ne.configTarget);if(ve.errors.length>0){for(let it of ve.errors)console.error(it);return!1}let ke=ve.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},Se=pc(ys(K.configPath),ke.rules,K.defaultRulebookName,K.migratedFrom,ne.filesystemScope),He=bn(ys(K.configPath),Se,"rulebook.json"),Ve=o(ne.filesystemScope,He),nt=[bs(ne.configTarget),bs(Ve)],Ke=await dc(G,K,ne.configTarget,Ve,Se,fe.config.rules,ke.rules.includes(Se)?ke.rules:[...ke.rules,Se],ke.overrides??{},ke.transparent_wrappers??[]);if(!Ke.ok){gc(nt);for(let it of Ke.errors)console.error(it);return!1}if(!K.cleanup)return console.log(`Migrated legacy config at ${K.legacyPath}. Legacy file is no longer used.`),!0;if(!mc(ne.configTarget,Ve,Se,K.migratedFrom,fe.config.rules))return console.error(`Migration cleanup verification failed for ${K.legacyPath}`),!1;return I(re),console.log(`Deleted legacy config at ${K.legacyPath}`),!0}async function dc(G,K,ne,re,de,fe,ve,ke,Se){try{return ht(ne,{version:1,rules:ve,overrides:ke,transparent_wrappers:Se}),ht(re,fc(de,K.migratedFrom,fe)),await vn(G,K.syncOptions)}catch(He){return{ok:!1,errors:[He instanceof Error?He.message:String(He)]}}}function uc(G){try{let K=JSON.parse(G),ne=En(K);if(ne.errors.length>0)return{ok:!1,errors:ne.errors};return{ok:!0,config:{version:1,rules:K.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function pc(G,K,ne,re,de){let fe=K.find((ve)=>hc(o(de,bn(G,ve,"rulebook.json")))===re);if(fe)return fe;if(n(o(de,bn(G,ne,"rulebook.json")))===null)return ne;for(let ve=2;;ve++){let ke=`${ne}-${ve}`;if(n(o(de,bn(G,ke,"rulebook.json")))===null)return ke}}function fc(G,K,ne){return{rulebook_version:1,name:G,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:K,allowed_commands:[...new Set(ne.map((re)=>re.command))],rules:ne,tests:ne.map((re)=>({command:[re.command,re.subcommand,re.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:re.name}))}}function mc(G,K,ne,re,de){if(!u(G).config?.rules.includes(ne))return!1;try{let ve=n(K);if(ve===null)return!1;let ke=JSON.parse(ve);return ke.migrated_from===re&&JSON.stringify(ke.rules)===JSON.stringify(de)}catch{return!1}}function bs(G){return{target:G,content:n(G)}}function gc(G){for(let K of G){if(K.content===null){I(K.target);continue}p(K.target,K.content)}}function hc(G){let K=n(G);if(K===null)return null;try{let ne=JSON.parse(K);return typeof ne.migrated_from==="string"?ne.migrated_from:null}catch{return null}}import{join as yc,resolve as or}from"node:path";var ws="CC Safety Net Config",vc="═".repeat(ws.length),bc="https://local/cc-safety-net/assets/cc-safety-net.schema.json",Lc=new Set(["rule.json","rule.lock","cache"]);function xs(G,K={}){try{return wc(G,K)}catch(ne){if(ne instanceof r)return console.error(ne.message),1;throw ne}}function wc(G,K){let ne=K.cwd??process.cwd(),re=B(G,{cwd:ne}),de=Kt(G),fe=Dr(ne),ve=or(ne,se),ke=o(re.userScope,de),Se=o(re.projectScope,fe),He=!1,Ve=!1,nt=[],Ke=[],it=xc(o(re.projectScope,ve));if(Sc(),n(re.userConfigTarget)!==null){let ze=Dt(re.userConfigTarget);if(ze.errors.push(...F(re.userConfigPath,re.userScope)),nt.push({scope:"User",path:re.userConfigPath,result:ze,schema:"rules",target:re.userConfigTarget}),ze.errors.length>0)He=!0}if(n(ke)!==null)if(Ve=!0,n(re.userConfigTarget)!==null)Ke.push(Ln("user","cleanup"));else{let ze=$n(ke);if(nt.push({scope:"User",path:de,result:ze,schema:"legacy",inactive:!0,target:ke}),Ke.push(Ln("user",ze.errors.length>0?"fix-or-delete":"migrate")),ze.errors.length>0)He=!0}if(n(re.projectConfigTarget)!==null){let ze=Dt(re.projectConfigTarget);if(ze.errors.push(...F(re.projectConfigPath,re.projectScope)),nt.push({scope:"Project",path:or(re.projectConfigPath),result:ze,schema:"rules",target:re.projectConfigTarget}),ze.errors.length>0)He=!0;if(n(Se)!==null)Ve=!0,Ke.push(Ln("project","cleanup"))}else if(n(Se)!==null){Ve=!0,He=!0;let ze=$n(Se);nt.push({scope:"Project",path:or(fe),result:ze,schema:"legacy",inactive:!0,target:Se}),Ke.push(Ln("project",ze.errors.length>0?"fix-or-delete":"migrate"))}if(it?.result.errors.length)He=!0;if(nt.length===0&&!it)return console.log(`
No config files found. Using built-in rules only.`),0;for(let ze of nt)if(ze.inactive)Dc(ze.scope,ze.path,ze.result);else if(ze.result.errors.length>0)Cc(ze.scope,ze.path,ze.result.errors);else{if(ze.schema==="rules"&&$c(ze.target))console.log(`
Added $schema to ${ze.scope.toLowerCase()} config.`);Rc(ze.scope,ze.path,ze.result,ze.schema)}for(let ze of Ke)console.error(`
${at.red(ze)}`);if(it)if(it.result.errors.length>0)Ec(it.path,it.result.errors);else Pc(it.path,it.result);if(He)return console.error(`
Config validation failed.`),1;return console.log(Ve?`
Configs valid with warnings.`:`
All configs valid.`),0}function Ln(G,K){let ne=`legacy ${G} config`;if(K==="cleanup")return`Warning: Legacy ${G} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(K==="migrate")return`Warning: Legacy ${G} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${G} config is no longer supported. Fix or delete the ${ne}, then run \`npx -y cc-safety-net rule migrate\`.`}function xc(G){if(oe(G)===null)return null;let K=kc(G);if(K.ruleNames.size===0&&K.errors.length===0)return null;return{path:G.path,result:K}}function kc(G){let K=[],ne=new Set,re=(oe(G)??[]).filter((de)=>!Lc.has(de.name)).sort((de,fe)=>de.name.localeCompare(fe.name));if(re.length===0)return{errors:K,ruleNames:ne};for(let de of re){if(!c.test(de.name)){K.push(`rulebook directory names must match ${c}: ${de.name}`);continue}if(de.kind!=="directory"){K.push(`${de.name} must be a rulebook directory`);continue}let fe=o(G.scope,yc(G.path,de.name,"rulebook.json")),ve=n(fe);if(ve===null){K.push(`${de.name}/rulebook.json is required`);continue}try{let ke;try{ke=JSON.parse(ve)}catch{K.push(`${de.name}/rulebook.json: invalid JSON`);continue}let Se=Q(ke);if(Se.name!==de.name){K.push(`rulebook name "${Se.name}" must match folder "${de.name}"`);continue}let He=pn(Se);if(He.length>0){K.push(...He.map((Ve)=>`${de.name}/rulebook.json: ${Ve}`));continue}ne.add(de.name)}catch(ke){K.push(ke instanceof Error?`${de.name}/rulebook.json: ${ke.message}`:`${de.name}/rulebook.json: ${String(ke)}`)}}return{errors:K,ruleNames:ne}}function Sc(){console.log(ws),console.log(vc)}function Rc(G,K,ne,re){if(console.log(`
✓ ${G} config: ${K}`),console.log(`  Schema: ${re==="rules"?"rulebook sources":"legacy inline rules"}`),ne.ruleNames.size>0){console.log(`  ${re==="rules"?"Sources":"Rules"}:`);let de=1;for(let fe of ne.ruleNames)console.log(`    ${de}. ${fe}`),de++}else console.log(`  ${re==="rules"?"Sources":"Rules"}: (none)`)}function Dc(G,K,ne){if(console.error(`
✗ Legacy ${G.toLowerCase()} config: ${K}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),ne.errors.length>0){console.error("  Errors:");let re=1;for(let de of ne.errors)for(let fe of de.split("; "))console.error(`    ${re}. ${fe}`),re++;return}if(ne.ruleNames.size>0){console.error("  Rules:");let re=1;for(let de of ne.ruleNames)console.error(`    ${re}. ${de}`),re++;return}console.error("  Rules: (none)")}function Cc(G,K,ne){ks(`${G} config`,K,ne)}function Pc(G,K){console.log(`
✓ GitHub source rules: ${G}`),console.log("  Rulebooks:");let ne=1;for(let re of K.ruleNames)console.log(`    ${ne}. ${re}`),ne++}function Ec(G,K){ks("GitHub source rules",G,K)}function ks(G,K,ne){console.error(`
✗ ${G}: ${K}`),console.error("  Errors:");let re=1;for(let de of ne)for(let fe of de.split("; "))console.error(`    ${re}. ${fe}`),re++}function $c(G){try{let K=n(G);if(K===null)return!1;let ne=JSON.parse(K);if(ne.$schema)return!1;return p(G,JSON.stringify({$schema:bc,...ne},null,2)),!0}catch(K){if(K instanceof r)throw K;return!1}}var Ss=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),_c=new Set(["add","remove","list"]),jc="cc-safety-net/rulebooks";async function Rs(G,K){try{return await Tc(G,K)}catch(ne){if(ne instanceof r)return console.error(ne.message),1;throw ne}}async function Tc(G,K){let ne=Oc(K),re=ne.help?Fc(ne.positionals):null;if(re)return Nt(re),0;if(ne.errors.length>0){for(let ke of ne.errors)console.error(ke);return 1}let de=ne.positionals[0];if(!de)return Nt(Ft,console.error),1;let fe=ne.positionals[1],ve={global:ne.global};if(de==="init"){let ke=yt(G,ve);Hc(ke.configTarget);let Se=Ac(ke.configDir,"example-rules","rulebook.json"),He=o(ke.filesystemScope,Se);if(ne.example&&n(He)===null)Ko(He);let Ve=F(ke.configPath,ke.filesystemScope);for(let nt of Ve)console.error(nt);if(Ve.length>0)return 1;return console.log("Rule config initialized."),0}if(de==="add"){let ke=Ds(ne);if(!ke)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let Se=yt(G,ve),He=await ms(G,ke,{...ve,ref:ne.ref,rulebooks:ne.only.length>0?ne.only:void 0});return zo(He,ke,`Scope: ${ne.global?"user":"project"} (${Se.configDir})`),He.ok?0:1}if(de==="remove"){if(!fe)return console.error("rule remove requires a source"),1;let ke=await gs(G,fe,{...ve,deleteSource:ne.deleteSource});return un(ke,`Removed rulebook source: ${fe}`),ke.ok?0:1}if(de==="update"){let ke=await vn(G,{...ve,only:fe,refresh:!0});return un(ke,"Rule config updated."),ke.ok?0:1}if(de==="sync")return Xr(G,{global:ne.global});if(de==="list"){let ke=z(G,{cwd:process.cwd()});return Jo(ke),ke.errors.length>0?1:0}if(de==="wrapper")return qc(G,ne);if(de==="migrate")return Ls(G,{cleanup:ne.cleanup,cwd:process.cwd()});if(de==="doc")return console.log(Bo),0;if(de==="verify")return xs(G);return 1}function Fc(G){if(G.length===0)return Ft;let K=Ft.subcommands.filter((re)=>re.usage.split(" ")[0]===G[0]);if(K.length===0)return null;if(G.length===1&&K.length>1)return{name:`rule ${G[0]}`,description:`Subcommands of rule ${G[0]}`,usage:`rule ${G[0]} <subcommand>`,subcommands:K,options:[]};let ne=G.length===1?K[0]:K.find((re)=>re.usage.split(" ")[1]===G[1]);if(!ne)return null;return{name:`rule ${G[0]}`,description:ne.description,usage:`rule ${ne.usage}`,options:G[0]==="add"?Dn:[],examples:G[0]==="add"?Cn:void 0}}function Oc(G){let K=gt({label:"rule",booleans:{global:["-g","--global"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},G),ne={...K.flags,ref:K.values.ref,only:K.lists.only??[],help:K.help,positionals:K.positionals,errors:K.errors};return Ic(ne),ne}function Ic(G){let[K]=G.positionals;if(K&&!Ss.has(K))G.errors.push(`Unknown rule subcommand: ${K}`);if(G.deleteSource&&K!=="remove")if(K&&Ss.has(K))G.errors.push(`Unknown option for rule ${K}: --delete-source`);else G.errors.push("--delete-source is only valid with 'rule remove'");if(G.cleanup&&K!=="migrate")G.errors.push(zt(K,"--cleanup"));if(G.example&&K!=="init")G.errors.push(zt(K,"--example"));if(G.ref&&K!=="add")G.errors.push(zt(K,"--ref"));if(G.only.length>0&&K!=="add")G.errors.push(zt(K,"--only"));if(K==="add")Nc(G);if(K==="migrate"){if(G.global)G.errors.push(zt(K,"--global"));if(G.positionals.length>1)G.errors.push(`Unexpected rule migrate argument: ${G.positionals[1]}`)}else if(K==="wrapper")Mc(G);else if(G.positionals.length>2)G.errors.push(`Unexpected rule argument: ${G.positionals[2]}`);if(K==="list"&&G.global)G.errors.push("Unknown option for rule list: --global")}function Ds(G){if(G.positionals[1])return G.positionals[1];if(G.ref||G.only.length>0)return jc;return}function Nc(G){let K=Ds(G);if(!K)return;if((G.ref||G.only.length>0)&&!W(K)){if(G.ref)G.errors.push(`--ref can only select a ref for an owner/repo source: ${K}`);if(G.only.length>0)G.errors.push("--only can only select rulebooks from an owner/repo source");return}if(G.ref&&!Z(G.ref))G.errors.push(`--ref must use valid path segments: ${G.ref}`);let ne=G.only.filter((re)=>!c.test(re));if(ne.length>0)G.errors.push(`Invalid rulebook names: ${ne.join(", ")}`)}function zt(G,K){return G?`Unknown option for rule ${G}: ${K}`:`Unknown option for rule: ${K}`}function Mc(G){let K=G.positionals[1],ne=G.positionals[2];if(!K){G.errors.push("rule wrapper requires add, remove, or list");return}if(!_c.has(K)){G.errors.push(`Unknown rule wrapper action: ${K}`);return}if(K==="list"){if(ne)G.errors.push(`Unexpected rule wrapper argument: ${ne}`);return}if(!ne){G.errors.push(`rule wrapper ${K} requires a command`);return}if(G.positionals.length>3)G.errors.push(`Unexpected rule wrapper argument: ${G.positionals[3]}`)}function Hc(G){if(n(G)===null){Yo(G);return}let K=u(G);if(!K.config)return;ht(G,{version:1,rules:K.config.rules,overrides:K.config.overrides??{},transparent_wrappers:K.config.transparent_wrappers??[]})}async function qc(G,K){let ne=K.positionals[1],re=K.positionals[2],de=yt(G,{global:K.global}).configTarget;if(ne==="list"){let Se=u(de);if(Se.errors.length>0){for(let He of Se.errors)console.error(He);return 1}return Uc(Se.config?.transparent_wrappers??[]),0}if(!re||!w.test(re))return console.error("transparent wrapper must match command pattern"),1;if(we(re))return console.error(`reserved command "${re}" cannot be a wrapper`),1;let fe=u(de);if(fe.errors.length>0){for(let Se of fe.errors)console.error(Se);return 1}let ve=fe.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},ke=ne==="add"?[...new Set([...ve.transparent_wrappers??[],re])]:(ve.transparent_wrappers??[]).filter((Se)=>Se!==re);return ht(de,{version:1,rules:ve.rules,overrides:ve.overrides??{},transparent_wrappers:ke}),console.log(ne==="add"?`Added transparent wrapper: ${re}`:`Removed transparent wrapper: ${re}`),0}function Uc(G){if(G.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${G.length}):`);for(let K of G)console.log(`  - ${K}`)}import{sep as Bc}from"node:path";function Cs(G){let K=R(G,{cwd:process.cwd()}),ne=K.policy,re=T(ne,G.env),de=!!process.env.NO_COLOR||!process.stdout.isTTY,fe=Math.min(process.stdout.columns||80,100),ve=de?"ok":"✔",ke=de?"OFF":"✘",Se=(ot,st)=>{let rt=`  ${ot.padEnd(13)}${st}`;return(rt.length>fe?`${rt.slice(0,fe-1)}…`:rt).replaceAll(ke,at.red(ke))},He=Object.values(ee(ne,re.capabilities)).some((ot)=>ot.changesInherited),Ve=(ot)=>ot===G.home||ot.startsWith(`${G.home}${Bc}`)?`~${ot.slice(G.home.length)}`:ot,nt={ready:at.green,degraded:at.yellow}[K.state],Ke=K.policyScopes?.weakenings??[],it=[...K.diagnostics],ze=de?"-":"·";console.log([`${de?"":"\uD83D\uDEE1️  "}CC Safety Net — ${nt(K.state)}`,"",Se("Protection",`destructive ${ne.destructiveCommandProtectionEnabled?ve:ke}   secrets ${ne.secretProtection.enabled?ve:ke}`),Se("Level",He?`${re.effectiveLevel} (customised)`:re.effectiveLevel),Se("Rules",ne.rules.length===0?"none active":`${ne.rules.length} active`),Se("Policy",Ve(l(G))),...K.policyScopes?[Se("Project",Ve(h(process.cwd())))]:[],...re.worktreeMode?[Se("Worktree","relaxations active")]:[],"",...Ke.length===0?[]:["  Project policy",...Ke.flatMap((ot)=>Mt(ot,"      ",fe-6).map((st,rt)=>rt===0?`    ${st}`:st)),""],...it.length===0?["  Everything configured is active."]:["  Not active",...it.flatMap((ot)=>Mt(ot,"      ",fe-6).map((st,rt)=>rt===0?`    ${ze} ${st}`:st)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as Qc}from"node:child_process";import{randomBytes as ed}from"node:crypto";import{existsSync as td}from"node:fs";import{createServer as nd}from"node:http";var wn=500;function Gc(G){let K=G.filter((de)=>de.decision!=="allow"),ne=G.filter((de)=>de.decision==="allow"),re=Math.min(K.length,Math.max(wn-ne.length,Math.ceil(wn/2)));return[...K.slice(0,re),...ne.slice(0,wn-re)]}function Ps(G,K,ne=A(G)){if(ne)U(G,ne);let re=(st)=>new Date(st.getFullYear(),st.getMonth(),st.getDate()).getTime(),de=re(new Date),fe=new Date(de);fe.setDate(fe.getDate()-(K-1));let ve=fe.getTime(),ke=[],Se={count:0};for(let st of ne?Pt(ne,Se):[])for(let rt of Tt(st,Se)){let ct=new Date(rt.ts).getTime();if(!Number.isFinite(ct))continue;if(ct>=ve)ke.push(rt)}ke.sort((st,rt)=>new Date(rt.ts).getTime()-new Date(st.ts).getTime());let He=Array.from({length:K},()=>0),Ve=Array.from({length:K},()=>0),nt={},Ke={},it={},ze=0,ot=0;for(let st of ke){let rt=st.agent||"unknown";nt[rt]=(nt[rt]??0)+1;let ct=Math.round((de-re(new Date(st.ts)))/86400000),dt=K-1-ct,pt=ct>=0&&ct<K;if(pt)Ve[dt]=(Ve[dt]??0)+1;if(st.decision!=="allow"){if(ze++,st.ruleId)Ke[st.ruleId]=(Ke[st.ruleId]??0)+1;let lt=Rn(st.segment||st.command);if(lt)it[lt]=(it[lt]??0)+1;if(st.failureStage)ot++;if(pt)He[dt]=(He[dt]??0)+1}}return{days:K,logsDir:ne,homeDir:G.home,totalInWindow:ke.length,truncated:ke.length>wn,unreadable:Se.count,counts:{blocked:ze,allowed:ke.length-ze,agents:nt,blockedByDay:He,analyzedByDay:Ve,rules:Ke,commands:it,errors:ot},entries:Gc(ke).sort((st,rt)=>new Date(rt.ts).getTime()-new Date(st.ts).getTime())}}import{spawn as zc}from"node:child_process";import{existsSync as Vc,statSync as Es}from"node:fs";import{delimiter as Jc,join as Wc}from"node:path";var Yc=120000,xn="Choose the project folder",Kc=`try
  return POSIX path of (choose folder with prompt "${xn}")
on error number -128
  return ""
end try`,Zc=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${xn}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,$s=[{binary:"zenity",args:["--file-selection","--directory",`--title=${xn}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",xn]}],As=(G,K)=>(K.PATH??"").split(Jc).some((ne)=>{if(ne.length===0)return!1;try{let re=Es(Wc(ne,G));return re.isFile()&&(re.mode&73)!==0}catch{return!1}});function sr(G,K){if(G==="darwin"||G==="win32")return!0;if(G!=="linux")return!1;if(!K.DISPLAY&&!K.WAYLAND_DISPLAY)return!1;return $s.some((ne)=>As(ne.binary,K))}function Xc(G,K){if(G==="darwin")return{cmd:"osascript",args:["-e",Kc]};if(G==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",Zc]};let ne=$s.find((re)=>As(re.binary,K));return ne?{cmd:ne.binary,args:ne.args}:null}function ir(G=process.platform,K=process.env){let ne=Xc(G,K);if(!ne)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((re)=>{let de=zc(ne.cmd,ne.args,{env:K,stdio:["ignore","pipe","pipe"]}),fe="",ve=!1,ke=(He)=>{if(ve)return;ve=!0,clearTimeout(Se),re(He)},Se=setTimeout(()=>{de.kill(),ke({error:"The folder dialog timed out"})},Yc);de.stdout.on("data",(He)=>{fe+=He.toString()}),de.on("error",()=>ke({error:`Could not open the folder dialog (${ne.cmd})`})),de.on("close",()=>{let He=fe.trim().replace(/\/+$/,"");if(!He)return ke({cancelled:!0});if(!Vc(He)||!Es(He).isDirectory())return ke({error:"That selection is not a folder on disk"});ke({path:He})})})}var _s=`<!doctype html>
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
`;var js='<script id="ccsn-data" type="application/json">';function Ts(G){return _s.replace(js,()=>js+JSON.stringify({token:G}).replaceAll("<","\\u003c"))}var rd=7,od="The project draft directory changed; reload the draft before applying.",sd="audit settings are user scope only; remove the audit section from a project proposal";async function Is(G,K={}){let ne=gt({label:"gui",booleans:{noOpen:["--no-open"]}},G),re=K.log??console.log,de=K.error??console.error;if(ne.errors.length>0){for(let ve of ne.errors)de(ve);return de("Usage: cc-safety-net gui [--no-open]"),1}let fe=await id(d,K);if(re(`CC Safety Net policy GUI: ${fe.url}`),!ne.flags.noOpen)try{await(K.openBrowser??yd)(fe.url)}catch(ve){de(`Failed to open browser: ${ve instanceof Error?ve.message:String(ve)}`),de(`Open this URL manually: ${fe.url}`)}if(K.keepAlive===!1)return await fe.close(),0;return await hd(fe),0}async function id(G,K={}){let ne=ed(24).toString("base64url"),re={dir:null,revision:0},de=nd((ke,Se)=>{ad(G,ke,Se,ne,K,re)});await new Promise((ke,Se)=>{de.once("error",Se),de.listen(0,"127.0.0.1",()=>{de.off("error",Se),ke()})});let ve=`http://127.0.0.1:${de.address().port}`;return{origin:ve,token:ne,url:`${ve}/?token=${encodeURIComponent(ne)}`,close:()=>gd(de)}}async function ad(G,K,ne,re,de,fe){let ve=G(),ke=new URL(K.url??"/","http://127.0.0.1");if(K.method==="GET"&&ke.pathname==="/favicon.ico"){ne.writeHead(204,{"cache-control":"no-store"}),ne.end();return}if(!pd(K,ke,re)){ut(ne,403,{error:"Forbidden"});return}if(K.method==="GET"&&ke.pathname==="/"){md(ne,Ts(re));return}if(K.method==="GET"&&ke.pathname==="/api/policy"){let Se=Oo(ve,de),He=R(ve,ar(de));ut(ne,200,{...Se,configState:Pe(He),...He.policyScopes?{projectPolicy:{path:h(de.cwd??process.cwd()),weakenings:He.policyScopes.weakenings}}:{},destructiveCommandRules:M,secretPatterns:Ge,version:Ot(),preview:Se.errors.length>0?null:Re(Se.policy,ve.env)});return}if(K.method==="POST"&&ke.pathname==="/api/policy/preview"){let Se=await kn(K);if(!Se.ok){ut(ne,Se.status,{errors:[Se.error]});return}let He=Io(ve,Se.value);ut(ne,He.errors.length>0?400:200,He);return}if(K.method==="POST"&&ke.pathname==="/api/policy/explain"){let Se=await kn(K);if(!Se.ok){ut(ne,Se.status,{errors:[Se.error]});return}let He=Se.value;if(He===null||typeof He.command!=="string"){ut(ne,400,{errors:["command must be a string"]});return}let Ve=qt(He.policy,ve.home);if(Ve.length>0){ut(ne,400,{errors:Ve});return}ut(ne,200,dd(ve,He.command,He.policy,de));return}if(K.method==="POST"&&ke.pathname==="/api/policy"){let Se=await kn(K);if(!Se.ok){ut(ne,Se.status,{errors:[Se.error]});return}let He=kt(ve,Se.value,de);ut(ne,He.errors.length>0?400:200,He);return}if(K.method==="POST"&&ke.pathname==="/api/reset"){ut(ne,200,kt(ve,V,de));return}if(K.method==="POST"&&ke.pathname==="/api/repair"){ut(ne,200,No(ve,de));return}if(K.method==="POST"&&ke.pathname==="/api/policy/project/choose-directory"){let Se=await(de.chooseDirectory??ir)();if("path"in Se)fe.dir=Se.path,fe.revision+=1;ut(ne,200,{cancelled:"cancelled"in Se,..."error"in Se?{error:Se.error}:{}});return}if(K.method==="GET"&&ke.pathname==="/api/policy/project"){let Se=Ns(fe,de),He=Fs(Se,ve.home),Ve=Ut(ve,de);ut(ne,200,{path:h(Se),revision:fe.revision,baseline:Ve.baseline,userPolicyDiagnostics:Ve.diagnostics,projection:He.projection,projectionDiagnostics:He.diagnostics,canPickDirectory:sr(process.platform,process.env)});return}if(K.method==="POST"&&ke.pathname==="/api/policy/project/diff"){let Se=await Os(ve,K,ne,fe,de);if(!Se)return;let He=Fs(Se.dir,ve.home),Ve=Ut(ve,de).baseline,nt=H(Ve,te(Se.proposal,ve.home).policy);ut(ne,200,{rows:cn(H(Ve,He.projection).policy,nt.policy,!1),weakenings:nt.weakenings,existingFileDiagnostics:He.diagnostics});return}if(K.method==="POST"&&ke.pathname==="/api/policy/project/apply"){let Se=await Os(ve,K,ne,fe,de);if(!Se)return;let He=cd(Se.dir,Se.proposal,ve.home);ut(ne,He.errors.length>0?500:200,He);return}if(K.method==="GET"&&ke.pathname==="/api/activity"){let Se=J(ve,de),He=ud(ke.searchParams.get("days"),Se);if(He===null){ut(ne,400,{error:`days must be an integer between 1 and ${Se}`});return}ut(ne,200,Ps(ve,He,de.activityLogsDir));return}if(K.method==="POST"&&ke.pathname==="/api/rules/choose-directory"){ut(ne,200,await ir());return}if(K.method==="GET"&&ke.pathname==="/api/rules"){let Se=z(ve,ar(de)),He=new Map(Se.rules.map((Ve)=>[Ve.name,Ve]));ut(ne,200,{projectPath:de.cwd??process.cwd(),canPickDirectory:sr(process.platform,process.env),rulebooks:Se.rulebooks.map((Ve)=>({source:Ve.source,spec:Ve.spec,name:Ve.name,version:Ve.version,rules:Ve.rules.flatMap((nt)=>{let Ke=He.get(nt);if(!Ke)return[];return[{name:Ke.name,command:Ke.command,subcommand:Ke.subcommand,block_args:Ke.block_args,reason:Ke.reason}]})})),errors:Se.errors,warnings:Se.warnings});return}if(K.method==="GET"&&ke.pathname==="/api/star/context"){ut(ne,200,await(de.fetchStarContext??(()=>wd(ve,{logsDir:de.activityLogsDir})))());return}if(K.method==="GET"&&ke.pathname==="/api/integrations"){ut(ne,200,await(de.fetchIntegrations??(()=>vd(ve)))());return}if(K.method==="GET"&&ke.pathname==="/api/health"){ut(ne,200,await(de.fetchHealth??Ld)());return}ut(ne,404,{error:"Not found"})}function ar(G){return{...G,cwd:G.cwd??process.cwd()}}function Ns(G,K){return G.dir??K.cwd??process.cwd()}function Fs(G,K){let ne=h(G),re=td(ne)?_t(ne):{value:void 0,errors:[]},de=te(re.value,K);return{projection:de.policy,diagnostics:[...re.errors,...de.diagnostics]}}async function Os(G,K,ne,re,de){let fe=Ns(re,de),ve=re.revision,ke=await kn(K);if(!ke.ok)return ut(ne,ke.status,{errors:[ke.error]}),null;let Se=ke.value;if(typeof Se?.revision!=="number")return ut(ne,400,{errors:["revision must be a number"]}),null;if(Se.revision!==ve)return ut(ne,409,{errors:[od]}),null;let He=ld(Se.proposal,G.home);if(He.length>0)return ut(ne,400,{errors:He}),null;return{dir:fe,proposal:Se.proposal}}function ld(G,K){let ne=qt(G,K);if(ne.length>0)return ne;return G?.audit===void 0?[]:[sd]}function cd(G,K,ne){let re=h(G),de=dn(K,L(K,ne));try{return p(o(v(G,"project policy"),re),`${JSON.stringify(de,null,2)}
`),{path:re,errors:[]}}catch(fe){return{path:re,errors:[fe instanceof Error?fe.message:String(fe)]}}}function dd(G,K,ne,re){let de=L(ne,G.home),fe=R(G,ar(re)),ve=xe({rules:fe.policy.rules,transparentWrappers:fe.policy.transparentWrappers,safety:_e(de.safety),worktreeMode:de.workflow.worktree_mode,destructiveCommandProtectionEnabled:de.destructive_command_protection.enabled,destructiveCommandRuleOverrides:de.destructive_command_protection.overrides,destructiveCommandAllowPaths:de.destructive_command_protection.allow_paths,secretProtection:{enabled:de.secret_protection.enabled,disabledRules:Te(de.secret_protection.overrides),denyPaths:de.secret_protection.deny_paths,allowPaths:de.secret_protection.allow_paths}});return Ht(K,{policySnapshot:ve,cwd:re.cwd,userConfigDir:re.userConfigDir},G)}function ud(G,K){if(G===null)return Math.min(rd,K);let ne=Number(G);if(!Number.isInteger(ne)||ne<1||ne>K)return null;return ne}function pd(G,K,ne){if(K.searchParams.get("token")!==ne)return!1;if(G.method!=="POST")return!0;return G.headers["x-cc-safety-net-token"]===ne}var fd=1048576;async function kn(G){let K=[],ne=0;for await(let re of G){let de=re;if(ne+=de.byteLength,ne>fd)return{ok:!1,status:413,error:"Request body is too large"};K.push(de)}try{return{ok:!0,value:JSON.parse(Buffer.concat(K).toString("utf-8")||"{}")}}catch(re){return{ok:!1,status:400,error:`Invalid JSON: ${re instanceof Error?re.message:String(re)}`}}}function md(G,K){G.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),G.end(K)}function ut(G,K,ne){G.writeHead(K,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),G.end(JSON.stringify(ne))}function gd(G){return new Promise((K,ne)=>{G.close((re)=>re?ne(re):K())})}function hd(G){return new Promise((K)=>{let ne=()=>{process.off("SIGINT",re),process.off("SIGTERM",re)},re=()=>{ne(),G.close().then(K)};process.once("SIGINT",re),process.once("SIGTERM",re)})}function yd(G){let K=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",ne=process.platform==="win32"?["/c","start","",G]:[G];return new Promise((re,de)=>{let fe=Qc(K,ne,{detached:!0,stdio:"ignore"}),ve=(Se)=>{fe.off("spawn",ke),de(Se)},ke=()=>{fe.off("error",ve),fe.unref(),re()};fe.once("error",ve),fe.once("spawn",ke)})}async function vd(G,K={}){let ne=await nn((de)=>It({environment:G,cwd:process.cwd(),openCodeVersion:de}).status!=="n/a",K.fetcher),re=bd(G,ne);return{targets:Xt.map((de)=>{let fe=re.find((ve)=>ve.platform===de.id);return{target:de.id,label:Ct(de.id),version:ne.versions[de.id]??null,status:fe?.configured?"active":fe?.detected?"disabled":fe?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:ne.version,nodeVersion:ne.nodeVersion,platform:ne.platform}}}function bd(G,K){return an(G,process.cwd(),{openCodeVersion:K.versions.opencode,openCodePluginListOutput:K.openCodePluginListOutput})}async function Ld(G={}){let K=await(G.checkUpdates??rn)();return{update:{latestVersion:K.latestVersion??null,updateAvailable:K.updateAvailable}}}function wd(G,K={}){return Promise.resolve({starred:!0,starCount:null,blockedTotal:Yt(G,J(G),K.logsDir).totalBlocked})}function xd(G){if(G[0]!=="help")return!1;let K=G[1];if(!K)Wn(),process.exit(0);if(Yn(K))process.exit(0);console.error(`Unknown command: ${K}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var kd={rule:async(G)=>{process.exit(await Rs(d(),G))},policy:async(G)=>{process.exit(await Uo(d(),G))},status:async(G)=>{if(Rt(gt({label:"status"},G).errors))process.exit(1);Cs(d())},doctor:async(G)=>{let K=Hn(G);if(!K)process.exit(1);let ne=await yo(d(),{json:K.json,skipUpdateCheck:K.skipUpdateCheck});process.exit(ne)},logs:async(G)=>{process.exit(await gr(d(),G))},gui:async(G)=>{process.exit(await Is(G))},explain:async(G)=>{process.exit(await Po(d(),G))}};async function Sd(G){let K=gt({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},G);if(xd(G))return;let ne=G[0],re=ne?Wt(ne):void 0;if(K.help&&re&&re.name!=="rule")Yn(re.name),process.exit(0);if(!ne||K.help&&!re)Wn(),process.exit(0);if(K.flags.version)Ao(),process.exit(0);if(re){await kd[re.name](G.slice(1));return}console.error(ne.startsWith("-")?`Unknown option: ${ne}`:`Unknown command: ${ne}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{Sd as runCli};
