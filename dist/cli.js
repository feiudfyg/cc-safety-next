import{a,s,r,b,o,X,n,p,ie,O,Ye,Ze,c,se,ae,Xe,P,B,Q,v,Qe,F,g,he,M,u,z,Ne,$e,A,et,C,Ce,je,E,tt,Ue,l,i,Ge,I,ye,rt,h,S,w,L,le,ue,Le,ot,d,e,Re,xe,We,Be,ee,be,te,ke,V,N,Te,de,j,ze,ne,q,K,re,He,Ve,R,U,_e,Ae,Ie,k,De,ve,Oe,f,t,J,pe,m,y,T,it,Fe,Me,x,G}from"./chunks/index-d1znz4kz.js";import{Z,W,D,me}from"./chunks/index-zyzr7g2t.js";var Ys=["-h","--help"];function yt(_,H){let Y=Object.entries(_.booleans??{}),oe=Object.entries(_.values??{}),ce=Object.entries(_.lists??{}),fe=Object.fromEntries(Y.map(([Je])=>[Je,!1])),ge={},we=Object.fromEntries(ce.map(([Je])=>[Je,[]])),Se=[],Pe=[],qe=!1,Ke=-1;for(let[Je,lt]of H.entries()){if(Je<=Ke)continue;if(lt==="--"){Se.push(...H.slice(Je+1));break}if(Ys.includes(lt)){qe=!0;continue}let Ee=Y.find(([,nt])=>nt.includes(lt));if(Ee){fe[Ee[0]]=!0;continue}let st=oe.find(([,nt])=>nt.includes(lt));if(st){let nt=H[Je+1];if(nt===void 0||nt.startsWith("-")){Pe.push(`${lt} requires a value`);continue}ge[st[0]]=nt,Ke=Je+1;continue}let at=ce.find(([,nt])=>nt.includes(lt));if(at){let nt=H.slice(Je+1),ut=nt.findIndex((mt)=>mt.startsWith("-")),pt=nt.slice(0,ut===-1?nt.length:ut);if(pt.length===0){Pe.push(`${lt} requires at least one value`);continue}we[at[0]]=[...we[at[0]]??[],...pt],Ke=Je+pt.length;continue}if(lt.startsWith("-")){Pe.push(`Unknown option for ${_.label}: ${lt}`);continue}if(_.positionals==="tail"){Se.push(...H.slice(Je));break}Se.push(lt)}if(_.positionals!=="list"&&_.positionals!=="tail")Pe.push(...Se.map((Je)=>`Unexpected argument for ${_.label}: ${Je}`));return{flags:fe,values:ge,lists:we,positionals:Se,help:qe,errors:Pe}}function Ct(_){for(let H of _)console.error(H);return _.length>0}import{readdirSync as ni,statSync as hr,unlinkSync as ri}from"node:fs";import{basename as yr,dirname as oi,isAbsolute as si,join as ii,relative as ai,resolve as li,sep as ci}from"node:path";var fr=(_)=>{let H=Date.now()-new Date(_).getTime();if(!Number.isFinite(H))return"";let Y=Math.floor(H/60000),oe=Math.floor(Y/60),ce=Math.floor(oe/24);if(ce>0)return`${ce}d ago`;if(oe>0)return`${oe}h ago`;if(Y>0)return`${Y}m ago`;return"just now"},Cn=(_)=>{let H=(_??"").trim().split(/\s+/).filter((ce)=>ce&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(ce)),Y=H[0]?.split("/").pop();if(!Y)return null;let oe=H[1];return oe&&/^[a-z][a-z0-9-]*$/.test(oe)?`${Y} ${oe}`:Y};function mr(_){let H=(ce)=>`${ce.sessionId}
${Cn(ce.segment||ce.command)}`,Y=_.filter((ce)=>ce.decision!=="allow"),oe=Y.filter((ce)=>ce.sessionId).reduce((ce,fe)=>ce.set(H(fe),(ce.get(H(fe))??0)+1),new Map);return new Set(Y.filter((ce)=>ce.failureStage||(oe.get(H(ce))??0)>=2))}import{existsSync as Ks,readdirSync as Zs,readFileSync as Xs}from"node:fs";import{join as Qs}from"node:path";function $t(_,H){try{return Zs(_,{withFileTypes:!0,encoding:"utf8"}).flatMap((Y)=>{let oe=Qs(_,Y.name);if(Y.isDirectory())return $t(oe,H);if(Y.name.endsWith(".jsonl"))return[oe];return[]})}catch{if(H&&Ks(_))H.count++;return[]}}var ei=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function ti(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let H=_;if(typeof H.ts!=="string"||typeof H.command!=="string")return!1;return ei.every((Y)=>H[Y]===void 0||typeof H[Y]==="string")}function Ot(_,H){try{return Xs(_,"utf-8").split(`
`).filter(Boolean).flatMap((Y)=>{try{let oe=JSON.parse(Y);if(!ti(oe)){if(H)H.count++;return[]}return[oe]}catch{if(H)H.count++;return[]}})}catch{if(H)H.count++;return[]}}function gt(_){return Array.from(_,(H)=>{let Y=H.charCodeAt(0);if(Y<=31||Y>=127&&Y<=159)return`\\x${Y.toString(16).padStart(2,"0")}`;return H}).join("")}function di(_,H){let Y=Z(_),oe=yt({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},H);if(Ct(oe.errors))return null;if(oe.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(oe.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let ce=oe.values.limit===void 0?20:gr(oe.values.limit);if(ce===null)return console.error("--limit must be a positive number"),null;let fe=oe.values.since===void 0?Math.min(30,Y):gr(oe.values.since);if(fe===null||fe>Y)return console.error(`--since must be a positive number of days no greater than ${Y}`),null;let ge={limit:ce,limitExplicit:oe.values.limit!==void 0,since:fe,sinceExplicit:oe.values.since!==void 0,all:oe.flags.all,json:oe.flags.json,suspect:oe.flags.suspect,pruneLegacy:oe.flags.pruneLegacy,dryRun:oe.flags.dryRun,id:oe.values.id,agent:oe.values.agent,rule:oe.values.rule,session:oe.values.session,project:oe.values.project===void 0?void 0:li(oe.values.project)};if(ge.id&&(ge.agent!==void 0||ge.rule!==void 0||ge.session!==void 0||ge.project!==void 0||ge.suspect||ge.sinceExplicit||ge.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ge.pruneLegacy&&(ge.id!==void 0||ge.agent!==void 0||ge.rule!==void 0||ge.session!==void 0||ge.project!==void 0||ge.suspect||ge.all||ge.sinceExplicit||ge.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ge.dryRun&&!ge.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ge}async function vr(_,H,Y={}){let oe=di(_,H);if(!oe)return 1;let ce=Y.logsDir??D(_);if(oe.pruneLegacy)return ui(ce,oe.json,oe.dryRun);if(!ce)return console.log(oe.json?"[]":oe.id?`No retained audit log entry found for id ${gt(oe.id)}.`:"No audit log entries found."),0;W(_,ce);let fe={count:0},ge=$t(ce,fe).flatMap((Ke)=>Ot(Ke,fe).map((Je)=>({entry:Je,file:Ke})));if(fe.count>0)console.error(`warning: ${fe.count} audit log ${fe.count===1?"source":"sources"} could not be read; these results are incomplete`);if(oe.id)return gi(ge,oe,Y.timeZone);let we=Date.now()-oe.since*24*60*60*1000,Se=ge.filter((Ke)=>hi(Ke,oe,ce,we)),Pe=oe.suspect?mr(Se.map((Ke)=>Ke.entry)):null,qe=(Pe?Se.filter((Ke)=>Pe.has(Ke.entry)):Se).sort((Ke,Je)=>Date.parse(Je.entry.ts)-Date.parse(Ke.entry.ts)).slice(0,oe.limit);if(oe.json)return console.log(JSON.stringify(qe.map((Ke)=>Ke.entry),null,2)),0;if(qe.length===0)return console.log("No audit log entries found."),0;for(let Ke of qe)console.log(bi(Ke.entry,Y.timeZone));return 0}function ui(_,H,Y){let oe=_?fi(_).map((we)=>ii(_,we)):[];if(Y)return pi(oe,H);let ce=[],fe=0,ge=0;for(let we of oe){let Se=hr(we,{throwIfNoEntry:!1})?.size??0,Pe=mi(we);if(Pe){ce.push(`${yr(we)}: ${Pe}`);continue}fe++,ge+=Se}if(H)return console.log(JSON.stringify({removedFiles:fe,removedBytes:ge,failedFiles:ce.length})),ce.length===0?0:1;console.log(fe===0&&ce.length===0?"No legacy audit log files found.":`Removed ${fe} legacy audit log ${fe===1?"file":"files"} (${br(ge)}).`);for(let we of ce)console.error(`Could not remove ${gt(we)}`);if(console.log("Nested v2 audit logs were not changed."),fe>0)console.log("This deletion cannot be undone.");return ce.length===0?0:1}function pi(_,H){let Y=_.reduce((oe,ce)=>oe+(hr(ce,{throwIfNoEntry:!1})?.size??0),0);if(H)return console.log(JSON.stringify({dryRun:!0,files:_.length,bytes:Y})),0;if(console.log(_.length===0?"No legacy audit log files found.":`Would remove ${_.length} legacy audit log ${_.length===1?"file":"files"} (${br(Y)}).`),console.log("Nested v2 audit logs are not included."),_.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function fi(_){try{return ni(_,{withFileTypes:!0}).filter((H)=>H.isFile()&&H.name.endsWith(".jsonl")).map((H)=>H.name)}catch{return[]}}function mi(_){try{return ri(_),null}catch(H){return H instanceof Error?H.message:String(H)}}function br(_){let H=["B","KiB","MiB","GiB"],Y=Math.min(Math.floor(Math.log2(Math.max(_,1))/10),H.length-1);return`${Math.round(_/1024**Y*10)/10} ${H[Y]}`}function gi(_,H,Y){let oe=_.filter((fe)=>fe.entry.id===H.id);if(oe.length>1)return console.error(`Multiple audit log entries found for id ${gt(H.id??"")}.`),1;if(H.json)return console.log(JSON.stringify(oe.map((fe)=>fe.entry),null,2)),0;let ce=oe[0];if(!ce)return console.log(`No retained audit log entry found for id ${gt(H.id??"")}.`),0;return console.log(Li(ce.entry,Y)),0}function hi(_,H,Y,oe){if(!H.all&&_.entry.decision==="allow")return!1;if(Date.parse(_.entry.ts)<oe)return!1;if(H.agent!==void 0&&_.entry.agent!==H.agent)return!1;if(H.rule!==void 0&&_.entry.ruleId!==H.rule)return!1;if(H.session!==void 0&&!yi(_,Y,H.session))return!1;if(H.project!==void 0&&!vi(_.entry.cwd,H.project))return!1;return!0}function yi(_,H,Y){if(_.entry.sessionId===Y)return!0;return oi(_.file)===H&&yr(_.file,".jsonl")===Y}function vi(_,H){if(!_)return!1;let Y=ai(H,_);return Y!==".."&&!Y.startsWith(`..${ci}`)&&!si(Y)}function bi(_,H){let Y=gt(_.id??"-"),oe=gt(_.decision??"deny"),ce=_.cwd?`  [${gt(_.cwd)}]`:"",fe=_.segment||_.command,ge=fe===_.command?"":"↳ ",we=fe.length>50?`${fe.slice(0,50)}…`:fe;return`${Y.padEnd(16)}  ${gt(Lr(_.ts,H))}  ${oe.padEnd(5)}  ${gt(_.agent??"-").padEnd(15)}  ${gt(_.ruleId??"-").padEnd(20)}  ${ge}${gt(we)}${ce}`}function Li(_,H){let Y=(ce)=>gt(ce===void 0||ce===null||ce===""?"-":ce),oe=_.shape?`${_.agent??"-"} (shape: ${_.shape})`:_.agent??"-";return[`id:        ${Y(_.id)}`,`ts:        ${Y(Lr(_.ts,H))}`,`decision:  ${Y(_.decision)}`,`agent:     ${Y(oe)}`,`level:     ${Y(_.level)}`,`tool:      ${Y(_.toolName)}`,`rule:      ${Y(_.ruleId)}`,`intent:    ${Y(_.intent)}`,`stage:     ${Y(_.failureStage)}`,`error:     ${Y(_.errorCode)}`,`session:   ${Y(_.sessionId)}`,`cwd:       ${Y(_.cwd)}`,`version:   ${Y(_.v)}`,`truncated: ${Y(_.truncated===!0?"yes":void 0)}`,`reason:    ${Y(_.reason)}`,`command:   ${Y(_.command)}`,`segment:   ${Y(_.segment)}`].join(`
`)}function Lr(_,H){let Y=new Date(_);if(Number.isNaN(Y.getTime()))return _;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:H}).format(Y)}function gr(_){let H=Number(_);return Number.isFinite(H)&&H>0?H:null}var wr={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var xr={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var kr={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var Sr={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var Wt={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Pn=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],En=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],It={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...Pn.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...En,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var Rr={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var Yt=[Rr,wr,Sr,xr,It,Wt,kr];function wi(_){return _.aliases??[]}function Kt(_){let H=_.toLowerCase();return Yt.find((Y)=>Y.name.toLowerCase()===H||wi(Y).some((oe)=>oe.toLowerCase()===H))}import{basename as xi}from"node:path";function Zt(_,H=7,Y=D(_)){let oe=Date.now()-H*24*60*60*1000,ce=[],fe=new Set,ge=0,we,Se,Pe,qe;if(Y)W(_,Y);let Ke={count:0},Je=Y?$t(Y,Ke):[];for(let Ee of Je)for(let st of Ot(Ee,Ke)){if(st.decision==="allow")continue;let at=new Date(st.ts).getTime();if(at>=oe){if(ge++,fe.add(st.sessionId??xi(Ee,".jsonl")),Se===void 0||at<=Se)we=st.ts,Se=at;if(qe===void 0||at>qe)Pe=st.ts,qe=at;ki(ce,st,at)}}let lt=ce.map((Ee)=>({timestamp:Ee.ts,command:Ee.command,reason:Ee.reason,relativeTime:fr(new Date(Ee.ts))}));return{totalBlocked:ge,sessionCount:fe.size,recentEntries:lt,oldestEntry:we,newestEntry:Pe,unreadable:Ke.count}}function ki(_,H,Y){let oe=_.findIndex((ce)=>Y>new Date(ce.ts).getTime());if(oe===-1){if(_.length<3)_.push(H);return}if(_.splice(oe,0,H),_.length>3)_.pop()}import{dirname as Fi}from"node:path";import{dirname as Si,join as Ri,resolve as Di}from"node:path";var Ci="config.json";function vt(_,H,Y,oe){p(Pi(_),`${JSON.stringify(H,null,2)}
`,Y,oe)}function Pi(_){return typeof _==="string"?X(_):_}function An(_){return{errors:ee($i(_),": "," "),ruleNames:new Set(ke(_).map((H)=>H.toLowerCase()))}}var Ei="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",Dr="must match pattern (letters, numbers, hyphens, underscores)";function $i(_){if(!Cr(_))return[e([],"Config must be an object")];return[..._.version===1?[]:[e(["version"],"must be 1")],...Ai(_.rules)]}function Ai(_){if(_===void 0)return[];if(!Array.isArray(_))return[e(["rules"],"must be an array")];return[..._.flatMap((H,Y)=>Cr(H)?_i(H,["rules",Y]):[e(["rules",Y],"must be an object")]),...Re(_)]}function _i(_,H){return[...$n(_.name,[...H,"name"],"required string",c,Ei),...$n(_.command,[...H,"command"],"required string",w,Dr),..._.subcommand===void 0?[]:$n(_.subcommand,[...H,"subcommand"],"must be a string if provided",w,Dr),...ji(_.block_args,[...H,"block_args"]),...Ti(_.reason,[...H,"reason"]),..._.intent===void 0||be(_.intent)?[]:[e([...H,"intent"],xe)]]}function $n(_,H,Y,oe,ce){if(typeof _!=="string")return[e(H,Y)];return oe.test(_)?[]:[e(H,ce)]}function ji(_,H){if(!Array.isArray(_))return[e(H,"required array")];if(_.length===0)return[e(H,"must have at least one element")];return _.flatMap((Y,oe)=>{if(typeof Y!=="string")return[e([...H,oe],"must be a string")];return Y===""?[e([...H,oe],"must not be empty")]:[]})}function Ti(_,H){if(typeof _!=="string")return[e(H,"required string")];if(_==="")return[e(H,"must not be empty")];return _.length>L?[e(H,`must be at most ${L} characters`)]:[]}function Cr(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function _n(_){let H=Pr(_);if(!H.ok)return H.result;return An(H.parsed)}function Pr(_){let H=[],Y=new Set;try{let oe=typeof _==="string"?X(_):_,ce=n(oe);if(ce===null)return H.push(`File not found: ${oe.path}`),{ok:!1,result:{errors:H,ruleNames:Y}};if(!ce.trim())return H.push("Config file is empty"),{ok:!1,result:{errors:H,ruleNames:Y}};return{ok:!0,parsed:JSON.parse(ce)}}catch(oe){if(oe instanceof r)return H.push(oe.message),{ok:!1,result:{errors:H,ruleNames:Y}};let ce=oe instanceof Error?oe.message:String(oe);return H.push(oe instanceof SyntaxError?"Invalid JSON":ce),{ok:!1,result:{errors:H,ruleNames:Y}}}}function Er(_){return Di(_,".safety-net.json")}function Pt(_){let H=Pr(_);if(!H.ok)return H.result;let Y=We(H.parsed);return{errors:Y.errors,ruleNames:Y.sources}}function Xt(_,H={}){return Ri(Si(he(_,H)),Ci)}function $r(_,H,Y){let oe;try{if(n(H)===null)return{path:_,exists:!1,valid:!1,ruleCount:0};oe=Pt(H),oe.errors.push(...N(_,Y))}catch(ce){if(!(ce instanceof r))throw ce;oe={errors:[ce.message],ruleNames:new Set}}return{path:_,exists:!0,valid:oe.errors.length===0,ruleCount:oe.ruleNames.size,...oe.errors.length>0?{errors:oe.errors}:{}}}function Oi(_,H){return{source:H,name:_.name,command:_.command,subcommand:_.subcommand,blockArgs:[..._.block_args],reason:_.reason}}function Ar(_,H){let Y=M(_),oe=F(H),ce=Fi(Y),fe=V(_,{cwd:H,userConfigPath:Y,projectConfigPath:oe,userConfigDir:ce}),ge=z(_,{cwd:H,userConfigPath:Y,projectConfigPath:oe,userConfigDir:ce}),we=new Map(fe.rulebooks.flatMap((Se)=>Se.rules.map((Pe)=>[Pe,Se.source])));return{userConfig:$r(Y,ge.userConfigTarget,ge.userScope),projectConfig:$r(oe,ge.projectConfigTarget,ge.projectScope),effectiveRules:fe.rules.map((Se)=>Oi(Se,we.get(Se.name)??"project"))}}var Ii=[{flag:i.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:i.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:i.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:i.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:i.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:i.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:i.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:i.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"}];function _r(_){return[...Ii.map((H)=>({name:H.flag.name,value:ye(H.flag,_.env),isSet:rt(H.flag,_.env),legacyName:H.flag.legacyName,legacyValue:H.flag.legacyName?_.env.get(H.flag.legacyName):void 0,legacyIsSet:H.flag.legacyName?_.env.get(H.flag.legacyName)!==void 0:void 0,description:H.description,defaultBehavior:H.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:_.env.get("CC_SAFETY_NET_HOME"),isSet:_.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var jn=[{id:"opencode",displayName:"OpenCode",doctorOrder:1,install:{order:1,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}}],Qt=jn.slice().sort((_,H)=>_.doctorOrder-H.doctorOrder).map((_)=>_.id),en=jn.slice().sort((_,H)=>_.install.order-H.install.order).map((_)=>({id:_.id,..._.install})).map(({order:_,...H})=>H),Ni=Object.fromEntries(jn.map((_)=>[_.id,_.displayName]));function Et(_){return Ni[_]}var jr={error:0,warning:1,info:2},Mi=["policy","config","audit"];function Hi(_){return _.map((H)=>{if(H==="ownership")return"is not owned by the current user";if(H==="permissions")return"has unsafe permissions";if(H==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var qi=[{derive:(_)=>_.hooks.length>0&&_.hooks.every((H)=>!H.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(_)=>_.hooks.filter((H)=>H.inspectionStatus==="failed").map((H)=>{let Y=Et(H.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${Y} inspection failed`,detail:`Doctor could not verify the ${Y} integration configuration.`,fixHint:`Correct the reported ${Y} configuration error, then run \`cc-safety-net doctor\` again.`,integration:H.platform}})},{derive:(_)=>_.userConfig.exists&&!_.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.userConfig.path}]:[]},{derive:(_)=>_.projectConfig.exists&&!_.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.projectConfig.path}]:[]},{derive:(_)=>_.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${_.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(_)=>_.v2Leftovers&&_.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${_.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(_)=>{let H=_.environment.find((Y)=>Y.name==="CC_SAFETY_NET_AUDIT_SCOPE");return Ge(H?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Mi.map((_)=>({derive:(H)=>H.posture.directories.filter((Y)=>Y.kind===_&&Y.status==="unsafe").map((Y)=>({checkId:`posture.${_}-directory-unsafe`,severity:"error",title:`${_[0]?.toUpperCase()}${_.slice(1)} directory is unsafe`,detail:`The ${_} directory ${Hi(Y.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...Y.path?{path:Y.path}:{}}))})),{derive:(_)=>{let H=[..._.effectiveSafety.weakenedRuleOverrides].sort();return H.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${H.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${H.join(", ")}.`}]:[]}}];function Tr(_){return qi.flatMap((H,Y)=>H.derive(_).map((oe,ce)=>({finding:oe,catalogOrder:Y,occurrence:ce}))).sort((H,Y)=>jr[H.finding.severity]-jr[Y.finding.severity]||H.catalogOrder-Y.catalogOrder||H.occurrence-Y.occurrence).map((H)=>H.finding)}function kt(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var Ui=(_)=>kt()?`\x1B[32m${_}\x1B[0m`:_,Bi=(_)=>kt()?`\x1B[33m${_}\x1B[0m`:_,Gi=(_)=>kt()?`\x1B[34m${_}\x1B[0m`:_,zi=(_)=>kt()?`\x1B[36m${_}\x1B[0m`:_,Vi=(_)=>kt()?`\x1B[31m${_}\x1B[0m`:_,Ji=(_)=>kt()?`\x1B[2m${_}\x1B[0m`:_,Wi=(_)=>kt()?`\x1B[1m${_}\x1B[0m`:_,ct={green:Ui,yellow:Bi,blue:Gi,cyan:zi,red:Vi,dim:Ji,bold:Wi},Yi="\x1B[0m",Ki=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function Zi(_){let H=_;return()=>(H=(H*1664525+1013904223)%4294967296,H/4294967296)}function Xi(_){let H=[...Ki],Y=Zi(_);for(let oe=H.length-1;oe>0;oe--){let ce=Math.floor(Y()*(oe+1)),fe=H[oe];H[oe]=H[ce],H[ce]=fe}return H}function Qi(_,H=0){if(!kt())return"";let Y=Xi(H);return`\x1B[38;5;${Y[_%Y.length]}m`}function Fr(_,H,Y=0){if(!kt())return`"${_}"`;return`${Qi(H,Y)}"${_}"${Yi}`}function tn(_){return _==="default"?"built-in default":`${_} policy`}var ea=new RegExp("\x1B\\[[0-9;]*m","g"),Tn=(_)=>_.replace(ea,"").length;function At(_){let H=(_.headers??_.rows[0]??[]).map((ge,we)=>{let Se=Math.max(..._.rows.map((Pe)=>Tn(Pe[we]??"")));return Math.max(Tn(ge),Se)}),Y=(ge,we)=>ge+" ".repeat(Math.max(0,we-Tn(ge))),oe=(ge,we)=>we[0]+H.map((Se)=>ge.repeat(Se+2)).join(we[1])+we[2],ce=(ge)=>`│ ${ge.map((we,Se)=>Y(we,H[Se]??0)).join(" │ ")} │`,fe=_.headers?[`   ${ce(_.headers)}`,`   ${oe("─",["├","┼","┤"])}`]:[];return[`   ${oe("─",["┌","┬","┐"])}`,...fe,..._.rows.map((ge)=>`   ${ce(ge)}`),`   ${oe("─",["└","┴","┘"])}`].join(`
`)}function Or(_){let H=[];H.push("Hook Integration"),H.push(ta(_));let Y=[],oe=[];for(let ce of _){let fe=Et(ce.platform);if(ce.errors&&ce.errors.length>0)for(let ge of ce.errors)if(ce.configured)Y.push({platform:fe,message:ge});else oe.push({platform:fe,message:ge})}for(let ce of Y)H.push(`   Warning (${ce.platform}): ${ce.message}`);for(let ce of oe)H.push(ct.red(`   Error (${ce.platform}): ${ce.message}`));return H.join(`
`)}function ta(_){let H=["Platform","Discovery","Configuration","Inspection"],Y=_.map((oe)=>{let ce=Et(oe.platform);if(oe.inspectionStatus==="not-inspected"){let Se=ct.dim("Not inspected");return[ce,Se,Se,Se]}let fe=oe.detected?ct.green("Detected"):oe.inspectionStatus==="failed"?ct.red("Unknown"):ct.dim("Not detected"),ge=oe.configured?ct.green("Configured"):oe.detected?ct.yellow("Not configured"):oe.inspectionStatus==="failed"?ct.red("Unknown"):ct.dim("Not applicable"),we=oe.inspectionStatus==="verified"?ct.green("Verified"):oe.inspectionStatus==="failed"?ct.red("Failed"):ct.dim("Not applicable");return[ce,fe,ge,we]});return At({headers:H,rows:Y})}function Ir(_){let Y=["Guard Engine Verification",`   Synthetic self-test: ${_.failed>0?ct.red(`${_.passed}/${_.total} FAIL`):ct.green(`${_.passed}/${_.total} passed`)}`],oe=_.results.filter((ce)=>!ce.passed);if(oe.length>0){Y.push(""),Y.push(ct.red("   Failures:"));for(let ce of oe)Y.push(ct.red(`   • ${ce.description}`)),Y.push(ct.red(`     expected ${ce.expected}, got ${ce.actual}`))}return Y.join(`
`)}function na(_){if(_.length===0)return"   (no custom rules)";let H=["Source","Name","Command","Block Args"],Y=_.map((oe)=>[oe.source,oe.name,oe.subcommand?`${oe.command} ${oe.subcommand}`:oe.command,oe.blockArgs.join(", ")]);return At({headers:H,rows:Y})}function Nr(_){let H=[];if(H.push("Configuration"),H.push(ra(_.userConfig,_.projectConfig)),H.push(""),_.effectiveRules.length>0)H.push(`   Effective rules (${_.effectiveRules.length} total):`),H.push(na(_.effectiveRules));else H.push("   Effective rules: (none - using built-in rules only)");return H.join(`
`)}function ra(_,H){let Y=["Scope","Status"],oe=(fe)=>{if(!fe.exists)return ct.dim("N/A");if(!fe.valid)return ct.red(`Invalid (${fe.errors?.[0]??"unknown error"})`);return ct.green("Configured")},ce=[["User",oe(_)],["Project",oe(H)]];return At({headers:Y,rows:ce})}function Mr(_){let H=[];return H.push("Environment"),H.push(oa(_)),H.join(`
`)}function Hr(_){let H=_.effectiveSafety.policyScopes,Y=["Effective Safety",`   Selected preset: ${_.effectiveSafety.selectedPreset}${H?` (${tn(H.levelScope)})`:""}`,`   Effective: ${_.effectiveSafety.level}`],oe=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[ce,fe]of oe){let ge=_.effectiveSafety.capabilities[ce],we=ge.enabled?ct.green("ON"):ct.dim("OFF"),Se=ge.sources.length>0?` (${ge.sources.join(", ")})`:"";Y.push(`   ${fe}: ${we} via ${ge.source}${Se}`)}if(H&&H.weakenings.length>0){Y.push("   Project policy deltas:");for(let ce of H.weakenings)Y.push(`      ${ce}`)}Y.push(`   Stored rule customizations: ${_.effectiveSafety.ruleCounts.stored}`),Y.push(`   Effective rule customizations: ${_.effectiveSafety.ruleCounts.effective}`);for(let[ce,fe]of Object.entries(_.effectiveSafety.ruleOverrides))Y.push(`   ${ce}: ${fe}`);return Y.join(`
`)}function qr(_){let H=["Findings"];if(_.length===0)return H.push("   No findings from inspected doctor facts."),H.join(`
`);for(let Y of _){let oe=`[${Y.severity.toUpperCase()}] ${Y.checkId}: ${gt(Y.title)}`,ce=Y.severity==="error"?ct.red:Y.severity==="warning"?ct.yellow:ct.blue;if(H.push(`   ${ce(oe)}`),H.push(`      ${gt(Y.detail)}`),Y.path)H.push(`      Path: ${gt(Y.path)}`);if(Y.fixHint)H.push(`      Fix: ${gt(Y.fixHint)}`)}return H.join(`
`)}function oa(_){let H=["Variable","Status","Legacy"],Y=_.map((oe)=>{let ce=oe.isSet?ct.green("✓"):ct.dim("✗"),fe=oe.legacyName&&oe.legacyIsSet?`${oe.legacyName} ${ct.green("✓")}`:oe.legacyName??"";return[oe.name,ce,fe]});return At({headers:H,rows:Y})}function Ur(_){let H=[];if(_.totalBlocked===0)H.push("Recent Activity"),H.push("   No blocked commands in the last 7 days"),H.push("   Tip: This is normal for new installations");else H.push(`Recent Activity · last 7 days (${_.totalBlocked} blocked / ${_.sessionCount} sessions)`),H.push(sa(_.recentEntries));if(_.unreadable>0)H.push(`   Warning: ${_.unreadable} audit log ${_.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return H.join(`
`)}function sa(_){let H=["Time","Command"],Y=_.map((oe)=>{let ce=gt(oe.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),fe=ce.length>40?`${ce.slice(0,37)}...`:ce;return[oe.relativeTime,fe]});return At({headers:H,rows:Y})}function Br(_){let H=[];if(H.push("Update Check"),_.latestVersion===null&&!_.error)return H.push(nn([["Status",ct.dim("Skipped")],["Installed",_.currentVersion]])),H.join(`
`);if(_.error)return H.push(nn([["Status",`${ct.yellow("⚠")} Error`],["Installed",_.currentVersion],["Error",ct.dim(_.error)]])),H.join(`
`);if(_.updateAvailable)return H.push(nn([["Status",`${ct.yellow("⚠")} Update Available`],["Current",_.currentVersion],["Latest",ct.green(_.latestVersion??"")]])),H.push(""),H.push("   Run: bunx cc-safety-net@latest doctor"),H.push("   Or:  npx cc-safety-net@latest doctor"),H.join(`
`);return H.push(nn([["Status",`${ct.green("✓")} Up to date`],["Version",_.currentVersion]])),H.join(`
`)}function nn(_){return At({rows:_})}function Gr(_){let H=[];return H.push("System Info"),H.push(ia(_)),H.join(`
`)}function ia(_){let H=["Component","Version"],Y=(fe)=>{if(fe===null)return ct.dim("not found");return fe},ce=[{label:"cc-safety-net",value:_.version},...Qt.map((fe)=>({label:Et(fe),value:_.versions[fe]??null})),{label:"Node.js",value:_.nodeVersion},{label:"npm",value:_.npmVersion},{label:"Bun",value:_.bunVersion},{label:"Platform",value:_.platform}].map((fe)=>[fe.label,Y(fe.value)]);return At({headers:H,rows:ce})}function zr(_){if(_.findings.length===0)return ct.green(`
No findings from inspected doctor facts.`);let H={error:_.findings.filter((fe)=>fe.severity==="error").length,warning:_.findings.filter((fe)=>fe.severity==="warning").length,info:_.findings.filter((fe)=>fe.severity==="info").length},Y=["error","warning","info"].filter((fe)=>H[fe]>0).map((fe)=>`${H[fe]} ${fe}`),oe=_.findings.length===1?"finding":"findings",ce=`
${_.findings.length} ${oe}: ${Y.join(", ")}.`;if(H.error>0)return ct.red(ce);if(H.warning>0)return ct.yellow(ce);return ct.blue(ce)}import{lstatSync as aa}from"node:fs";import{dirname as Fn}from"node:path";function On(_,H){try{let Y=aa(H);if(Y.isSymbolicLink())return{kind:_,path:H,status:"unsafe",issues:["symlink"]};if(!Y.isDirectory())return{kind:_,path:H,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:_,path:H,status:"unknown",issues:[]};let oe=[...Y.uid!==process.getuid()?["ownership"]:[],...(Y.mode&18)!==0?["permissions"]:[]];return{kind:_,path:H,status:oe.length>0?"unsafe":"safe",issues:oe}}catch(Y){if(typeof Y==="object"&&Y!==null&&"code"in Y&&Y.code==="ENOENT")return{kind:_,path:H,status:"not-applicable",issues:[]};return{kind:_,path:H,status:"unknown",issues:[]}}}function Vr(_,H){let Y=D(_);return{directories:[On("policy",Fn(Fn(H))),On("config",Fn(H)),...Y?[On("audit",Y)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as la}from"node:child_process";import{existsSync as Jr}from"node:fs";import{delimiter as ca,extname as da,join as ua}from"node:path";import{stripVTControlCharacters as Wr}from"node:util";var Kr="2.4.14",pa=5000,fa="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function Nt(){return Kr}function In(_,H){let Y=_[H];if(Y)return Y;let oe=Object.keys(_).find((ce)=>ce.toLowerCase()===H.toLowerCase()&&!!_[ce]);return oe?_[oe]:Y}function ma(_){return(In(_,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((H)=>H.length>0)}function ga(_,H){let Y=da(_)?[_]:[...ma(H).map((oe)=>`${_}${oe}`),_];if(_.includes("/")||_.includes("\\"))return Y.find((oe)=>Jr(oe))??_;return(In(H,"PATH")??"").split(ca).flatMap((oe)=>Y.map((ce)=>ua(oe,ce))).find((oe)=>Jr(oe))??_}function Yr(_){if(!/[\s"&|<>^]/.test(_))return _;return`"${_.replace(/"/g,'""')}"`}function ha(_,H){let[Y,...oe]=_,ce=H[fa]==="win32"?"win32":process.platform;if(!Y||ce!=="win32")return{cmd:Y??"",args:oe};let fe=ga(Y,H);if(!/\.(?:bat|cmd)$/i.test(fe))return{cmd:fe,args:oe};return{cmd:In(H,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",Yr(fe),...oe.map(Yr)].join(" ")]}}var ya=async(_,H=pa)=>{let Y=await va(_,{timeoutMs:H});if(Y.code!==0)return null;return Wr(Y.stdout).trim()||Wr(Y.stderr).trim()||null};function va(_,H){let[Y,...oe]=_;if(!Y)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((ce)=>{try{let fe=ha([Y,...oe],process.env),ge=la(fe.cmd,fe.args,{stdio:["ignore","pipe","pipe"]}),we=!1,Se="",Pe="";ge.stdout.on("data",(Je)=>{Se+=Je.toString()}),ge.stderr.on("data",(Je)=>{Pe+=Je.toString()});let qe=(Je)=>{if(we)return;we=!0,clearTimeout(Ke),ce(Je)},Ke=setTimeout(()=>{ge.kill(),qe({code:null,stdout:Se,stderr:Pe})},H.timeoutMs);ge.on("close",(Je)=>{qe({code:Je,stdout:Se,stderr:Pe})}),ge.on("error",()=>{qe({code:null,stdout:Se,stderr:Pe})})}catch{ce({code:null,stdout:"",stderr:""})}})}function rn(_){if(!_)return null;let H=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(_);if(H)return H[1]??null;let Y=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(_);if(Y)return Y[1]??null;return _.split(`
`)[0]?.trim()||null}async function on(_,H=ya,Y=process.cwd()){let oe=Promise.all(en.map(async(Pe)=>[Pe.id,rn(await H([...Pe.probeCommand]))])),[ce,fe,ge,we,Se]=await Promise.all([oe,oe.then(async(Pe)=>{let qe=Pe.find(([lt])=>lt==="opencode")?.[1];if(!qe?.startsWith("2.")||!_(qe))return null;let Ke=["--param",`location[directory]=${Y}`],Je=["opencode","api","integration.list",...Ke];return await H(Je,30000),H(["opencode","api","plugin.list",...Ke],30000)}),H(["node","--version"]),H(["npm","--version"]),H(["bun","--version"])]);return{version:Kr,versions:Object.fromEntries(ce),openCodePluginListOutput:fe,nodeVersion:rn(ge),npmVersion:rn(we),bunVersion:rn(Se),platform:`${process.platform} ${process.arch}`}}function sn(){return Promise.resolve({currentVersion:Nt(),latestVersion:null,updateAvailable:!1})}import{createHash as ka}from"node:crypto";import{existsSync as Qr}from"node:fs";import{dirname as an,join as eo}from"node:path";import{dirname as Zr,join as ba,resolve as La}from"node:path";var wa="rule.lock";function xa(_){return ba(Zr(_),wa)}function Xr(_={}){return La(_.cwd??process.cwd(),".safety-net.json")}function bt(_,H){let Y=H.global?H.userConfigPath??M(_,H):H.projectConfigPath??F(H.cwd??process.cwd()),oe=H.global?Ne(_,H):$e(Y,H.cwd??process.cwd()),ce=xa(Y);return{configDir:Zr(Y),configPath:Y,lockPath:ce,filesystemScope:oe,configTarget:o(oe,Y),lockTarget:o(oe,ce)}}var Sa="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Ra="cache",Da="rulebooks";function to(_,H={}){let Y=bt(_,H),oe=o(Y.filesystemScope,ro(Y.configDir)),ce=n(Y.lockTarget);if(console.log(Sa),ce===null&&!Qr(oe.path))return console.log(`No v2 lock or cache leftovers found in ${an(Y.configDir)}; nothing to migrate.`),0;let fe=Aa(ce),ge=d(Y.configTarget);if(!ge.config&&(n(Y.configTarget)!==null||fe.size>0))return console.error(`Cannot migrate: the rules config in ${an(Y.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let we=ge.config?.rules??[];for(let Se of we.flatMap((Pe)=>Ca(Pe,fe,Y,oe,H.global===!0)))console.log(Se);return O(Y.lockTarget),Ye(oe),console.log(`Removed the v2 lock and cache under ${an(Y.configDir)}.`),0}function no(_,H){return[...new Set([{cwd:H},{cwd:H,global:!0}].flatMap((Y)=>{let oe=bt(_,Y);return[oe.lockPath,ro(oe.configDir)]}))].filter((Y)=>Qr(Y))}function Ca(_,H,Y,oe,ce){if(!v(_))return[];let fe=P(_).name,ge=o(Y.filesystemScope,A(Y.configDir,fe)),we=n(ge);if(we!==null&&Pa(we,fe))return[];let Se=H.get(_),Pe=Se?Ea(Se,fe,oe.path,Y.filesystemScope):null;if(Pe===null)return[`Could not migrate ${_} from the v2 cache. Run \`cc-safety-net rule update ${_}${ce?" --global":""}\` to vendor it.`];if(p(ge,Pe),we!==null)return[`Restored ${_} from the v2 cache over an invalid file.`];return[`Vendored ${_} from the v2 cache.`]}function Pa(_,H){let Y=de(_);return!("problem"in Y)&&Y.rulebook.name===H}function Ea(_,H,Y,oe){let ce=eo(Y,Da,`${$a(_)}--${_.digest.replace("sha256:","").slice(0,12)}`,se),fe=n(o(oe,ce));if(fe===null||Ta(fe)!==_.digest)return null;let ge=de(fe);if("problem"in ge||ge.rulebook.name!==H)return null;return fe}function ro(_){return eo(an(_),Ra)}function $a(_){return([_.owner,_.repo,_.display_ref,_.name].every((oe)=>typeof oe==="string"&&oe!=="")?`${_.owner}/${_.repo}#${_.display_ref}/${_.name}`:_.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Aa(_){let H=_===null?null:ja(_),Y=oo(H)&&Array.isArray(H.rulebooks)?H.rulebooks:[];return new Map(Y.filter(_a).map((oe)=>[oe.spec,oe]))}function _a(_){return oo(_)&&typeof _.spec==="string"&&typeof _.digest==="string"}function oo(_){return!!_&&typeof _==="object"}function ja(_){try{return JSON.parse(_)}catch{return null}}function Ta(_){return`sha256:${ka("sha256").update(_).digest("hex")}`}function Nn(_){return Math.max(0,Math.min(1,_))}function Mn(_){return Math.max(0,Math.min(255,Math.round(_)))}function Hn(_){return _<=0.0031308?12.92*_:1.055*_**0.4166666666666667-0.055}function Fa(_,H,Y){let oe=Y*Math.PI/180,ce=H*Math.cos(oe),fe=H*Math.sin(oe),ge=(_+0.3963377774*ce+0.2158037573*fe)**3,we=(_-0.1055613458*ce-0.0638541728*fe)**3,Se=(_-0.0894841775*ce-1.291485548*fe)**3;return{blue:Mn(Hn(Nn(-0.0041960863*ge-0.7034186147*we+1.707614701*Se))*255),green:Mn(Hn(Nn(-1.2684380046*ge+2.6097574011*we-0.3413193965*Se))*255),red:Mn(Hn(Nn(4.0767416621*ge-3.3077115913*we+0.2309699292*Se))*255)}}function Oa(_,H){let Y=(H*_*180/Math.PI%360+360)%360;return Fa(0.72,0.15,Y)}function so(_,H=0.1){let Y=Oa(H,_);return`\x1B[38;2;${Y.red};${Y.green};${Y.blue}m`}var io="\r\x1B[2K",Ia="\x1B[?25l",Na="\x1B[39m",Ma="\x1B[?25h",Ha=100,qa=0.55,Ua=80,ao=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Ba(_){return new Promise((H)=>setTimeout(H,_))}async function Ga(_,H={}){let Y=H.output??process.stdout;if(!Y.isTTY)return _;let oe=H.sleep??Ba,ce=!1,fe=_.then((we)=>(ce=!0,we),(we)=>{throw ce=!0,we});if(await Promise.race([fe.then(()=>!0),oe(Ha).then(()=>!1)]))return fe;Y.write(Ia);try{for(let we=0;!ce;we+=1)Y.write(`${io}${so(we*qa)}${ao[we%ao.length]}${Na} ${H.loadingMessage??"Loading…"}`),await Promise.race([fe,oe(Ua)]);return await fe}finally{Y.write(`${io}${Ma}`)}}async function lo(_,H,Y,oe={}){let ce=H();if(_)await Y();if(_&&ce.ready)await Ga(ce.ready,oe);return ce.finish()}import{existsSync as wo,readFileSync as xo}from"node:fs";import{basename as Ya,join as Lo,resolve as Ka}from"node:path";function co(_){let H="",Y=0,oe=!1,ce=!1,fe=-1;while(Y<_.length){let ge=_[Y],we=_[Y+1];if(ce){H+=ge,ce=!1,Y++;continue}if(ge==='"'&&!oe){oe=!0,fe=-1,H+=ge,Y++;continue}if(ge==='"'&&oe){oe=!1,H+=ge,Y++;continue}if(ge==="\\"&&oe){ce=!0,H+=ge,Y++;continue}if(oe){H+=ge,Y++;continue}if(ge==="/"&&we==="/"){while(Y<_.length&&_[Y]!==`
`)Y++;continue}if(ge==="/"&&we==="*"){Y+=2;while(Y<_.length-1){if(_[Y]==="*"&&_[Y+1]==="/"){Y+=2;break}Y++}continue}if(ge===","){fe=H.length,H+=ge,Y++;continue}if(ge==="}"||ge==="]"){if(fe!==-1){let Se=H.slice(fe+1);if(/^\s*$/.test(Se))H=H.slice(0,fe)+Se}fe=-1,H+=ge,Y++;continue}if(!/\s/.test(ge))fe=-1;H+=ge,Y++}return H}function Lt(_,H){return typeof _==="object"&&_!==null?_[H]:void 0}import{join as ln}from"node:path";var qn="cc-safety-net",uo=["opencode.json","opencode.jsonc"];function po(_){return ln(_.env.get("XDG_CONFIG_HOME")||ln(_.home,".config"),"opencode")}function fo(_){return _.env.get("OPENCODE_CONFIG_DIR")||po(_)}function mo(_){return uo.map((H)=>ln(fo(_),H))}function go(_){return[...new Set([fo(_),po(_)])].flatMap((H)=>uo.map((Y)=>ln(H,Y)))}function ho(_){let H=za(_);if(H.some(Va))return;let Y=H.find((oe)=>Lt(oe,"status")==="failed");if(!Y)return;return`OpenCode reports cc-safety-net failed: ${String(Lt(Y,"error")).split(`
`)[0]}`}function za(_){return Ja(_).filter((H)=>Lt(H,"id")===qn||bo(Lt(Lt(H,"source"),"target"))).map((H)=>Lt(H,"state"))}function Va(_){return Lt(_,"status")==="active"}function Ja(_){if(!_)return[];try{let H=Lt(JSON.parse(_),"data");return Array.isArray(H)?H:[]}catch{return[]}}function yo(_,H){return["plugin","plugins"].some((Y)=>{let oe=Lt(_,Y);if(!Array.isArray(oe))return!1;return oe.some((ce)=>{if(bo(ce))return!0;let fe=vo(ce);return H!==void 0&&typeof fe==="string"&&Wa(fe)&&H(fe)})})}var Un=new Set([qn,"@local/cc-safety-net"]);function vo(_){return typeof _==="string"?_:Lt(_,"package")}function Wa(_){return _.startsWith(".")||_.startsWith("~")||/[\\/]/.test(_)}function bo(_){let H=vo(_);return typeof H==="string"&&(Un.has(H)||H.startsWith(`${qn}@`))}function Za(_,H,Y){let oe=_.startsWith("~")?Lo(Y,_.slice(1)):_,ce=Lo(Ka(H,oe),"package.json");if(!wo(ce))return!1;try{let fe=Lt(JSON.parse(xo(ce,"utf-8")),"name");return typeof fe==="string"&&Un.has(fe)}catch{return!1}}function Mt(_){let H=[];for(let Y of _.openCodeVersion?.startsWith("2.")?mo(_.environment):go(_.environment))if(wo(Y))try{let oe=xo(Y,"utf-8"),ce=co(oe),fe=JSON.parse(ce);if(yo(fe,(ge)=>Za(ge,_.cwd,_.environment.home))){let ge=ho(_.openCodePluginListOutput);if(ge)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:Y,errors:[...H,ge]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:Y,errors:H.length>0?H:void 0}}}catch(oe){H.push(`Failed to parse ${Ya(Y)}: ${oe instanceof Error?oe.message:String(oe)}`)}return{platform:"opencode",status:"n/a",errors:H.length>0?H:void 0}}var Xa={opencode:Mt};function cn(_,H,Y){let oe={...Y,cwd:H,environment:_};return Qt.map((ce)=>Qa(Xa[ce](oe)))}function Qa(_){if(_.status==="not-inspected")return{platform:_.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:_.platform,detected:_.status!=="n/a",configured:_.status==="configured",inspectionStatus:_.status!=="n/a"?"verified":_.errors&&_.errors.length>0?"failed":"not-applicable",method:_.method,configPath:_.configPath,configPaths:_.configPaths,errors:_.errors}}import{join as el}from"node:path";var tl=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),nl=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),rl={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function ko(_){let H=el(et(_),"cc-safety-net-self-test"),Y=tl.map((oe)=>{let ce=me(_,S("self-test",{command:oe.command},{kind:"command",shell:"auto"},{configCwd:H,executionCwd:H},oe.command),{guard:{dependencies:{loadPolicySnapshot:()=>nl,getModes:()=>rl,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),fe=oe.expectBlocked?"blocked":"allowed",ge=ce.decision.kind==="deny"?"blocked":"allowed";return{command:oe.command,description:oe.description,expected:fe,actual:ge,passed:fe===ge,reason:ce.decision.kind==="deny"?ce.decision.reason:void 0,ruleId:ce.decision.kind==="deny"?ce.decision.ruleId:void 0}});return{passed:Y.filter((oe)=>oe.passed).length,failed:Y.filter((oe)=>!oe.passed).length,total:Y.length,results:Y}}function Bn(_){let H=yt({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},_);if(Ct(H.errors))return null;return{json:H.flags.json,skipUpdateCheck:H.flags.skipUpdateCheck}}async function So(_,H={}){let Y=await lo(!H.json,()=>{let oe=ol(_,H);return{ready:oe,finish:()=>oe}},async()=>{},{loadingMessage:"Checking system status…"});if(H.json)console.log(JSON.stringify(Y,null,2));else sl(Y);return Y.engineSelfTest.failed>0||Y.findings.some((oe)=>oe.severity==="error")?1:0}async function ol(_,H){let Y=H.cwd??process.cwd(),oe=await on((st)=>Mt({environment:_,cwd:Y,openCodeVersion:st}).status!=="n/a",void 0,Y),ce=cn(_,Y,{openCodeVersion:oe.versions.opencode,openCodePluginListOutput:oe.openCodePluginListOutput}),fe=Ar(_,Y),ge=_r(_),we=k(_,{cwd:Y}),Se=we.policy,Pe=I(Se,_.env),qe=ne(Se,Pe.capabilities),Ke=Zt(_,7),Je=no(_,Y),lt=H.skipUpdateCheck?{currentVersion:Nt(),latestVersion:null,updateAvailable:!1}:await sn(),Ee={hooks:ce,engineSelfTest:ko(_),userConfig:fe.userConfig,projectConfig:fe.projectConfig,configState:De(we),effectiveRules:fe.effectiveRules,environment:ge,effectiveSafety:{selectedPreset:Se.safety.level??"standard",level:Pe.effectiveLevel,capabilities:Pe.capabilities,ruleOverrides:Se.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(qe).filter(([,st])=>st.source==="rule_override"&&st.override==="off"&&st.inheritedEnabled&&st.changesInherited).map(([st])=>st),ruleCounts:{stored:Object.keys(Se.destructiveCommandRuleOverrides).length,effective:Object.values(qe).filter((st)=>st.changesInherited).length},...we.policyScopes?{policyScopes:we.policyScopes}:{}},...Je.length>0?{v2Leftovers:Je}:{},posture:Vr(_,fe.userConfig.path),activity:Ke,update:lt,system:oe};return{...Ee,findings:Tr(Ee)}}function sl(_){console.log(),console.log(Or(_.hooks)),console.log(),console.log(Ir(_.engineSelfTest)),console.log(),console.log(Nr(_)),console.log(),console.log(Mr(_.environment)),console.log(),console.log(Hr(_)),console.log(),console.log(qr(_.findings)),console.log(),console.log(Ur(_.activity)),console.log(),console.log(Gr(_.system)),console.log(),console.log(Br(_.update)),console.log(zr(_))}import{existsSync as il}from"node:fs";var al=/^[A-Za-z0-9_@%+=:,./-]+$/,Ro="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function Gn(_){let H=yt({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},_);if(Ct(H.errors))return console.error(Ro),console.error("Pass -- before a command that starts with dashes."),null;if(H.values.cwd!==void 0&&!il(H.values.cwd))return console.error(`Error: --cwd path does not exist: ${H.values.cwd}`),null;let Y=H.positionals.length===1?H.positionals[0]:H.positionals.map((oe)=>al.test(oe)?oe:`'${oe.replaceAll("'","'\\''")}'`).join(" ");if(!Y)return console.error("Error: No command provided"),console.error(Ro),null;return{json:H.flags.json,cwd:H.values.cwd,command:Y}}function Do(_){if(_)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function Co(_,H){let oe=H-18;return[`${_.dtl}${_.dh.repeat(H)}${_.dtr}`,`${_.dv}  Command Analysis${" ".repeat(oe)}${_.dv}`,`${_.dbl}${_.dh.repeat(H)}${_.dbr}`]}function zn(_){return JSON.stringify(_)}function Po(_,H=0){return`[${_.map((oe,ce)=>Fr(oe,ce,H)).join(",")}]`}function qt(_,H,Y=70){let oe=_.split(" "),ce=[],fe="";for(let ge of oe)if(fe&&fe.length+ge.length+1>Y)ce.push(fe),fe=ge;else fe=fe?`${fe} ${ge}`:ge;if(fe)ce.push(fe);return ce.map((ge,we)=>we===0?ge:`${H}${ge}`)}function Eo(_,H,Y){let oe=[];switch(_.type){case"parse":return null;case"env-strip":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Strip environment variables`),oe.push(`  Removed: ${_.envVars.map((ce)=>`${ce}=<redacted>`).join(", ")}`),oe.push(`  Tokens:  ${zn(_.output)}`),{lines:oe,incrementStep:!0};case"leading-tokens-stripped":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Strip wrappers`),oe.push(`  Removed: ${_.removed.join(", ")}`),oe.push(`  Tokens:  ${zn(_.output)}`),{lines:oe,incrementStep:!0};case"shell-wrapper":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Detect shell wrapper`),oe.push(`  Wrapper: ${_.wrapper} -c`),oe.push(`  Inner:   ${_.innerCommand}`),{lines:oe,incrementStep:!0};case"interpreter":{if(oe.push(""),oe.push(`STEP ${H} ${Y.h} Detect interpreter`),oe.push(`  Interpreter: ${_.interpreter}`),oe.push(`  Code:        ${_.codeArg}`),_.paranoidBlocked)oe.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:oe,incrementStep:!0}}case"busybox":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Busybox wrapper`),oe.push(`  Subcommand: ${_.subcommand}`),{lines:oe,incrementStep:!0};case"transparent-wrapper":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Transparent wrapper`),oe.push(`  Wrapper: ${_.wrapper}`),oe.push(`  Tokens:  ${zn(_.output)}`),{lines:oe,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(oe.push(""),oe.push(`STEP ${H} ${Y.h} Match rules`),oe.push(`  Rule:   ${_.rule}()`),_.matched)oe.push("  Result: MATCHED");else oe.push("  Result: No match");return{lines:oe,incrementStep:!0}}case"worktree-relaxation":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Worktree relaxation`),oe.push(`  Mode:   ${i.worktree.name}`),oe.push(`  Git cwd: ${_.gitCwd}`),oe.push("  Result: Allowed local discard in linked worktree"),{lines:oe,incrementStep:!0};case"temp-root-relaxation":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Temp-root relaxation`),oe.push(`  Git cwd: ${_.gitCwd}`),oe.push("  Result: Allowed git discard in a temp-root repository"),{lines:oe,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(_.embeddedCommandFound)return oe.push(""),oe.push(`STEP ${H} ${Y.h} Fallback scan`),oe.push(`  Found: ${_.embeddedCommandFound}`),{lines:oe,incrementStep:!0};return null}case"custom-rules-check":{if(_.rulesChecked){if(oe.push(""),oe.push(`STEP ${H} ${Y.h} Custom rules`),_.matched)oe.push("  Result: MATCHED");else oe.push("  Result: No match");return{lines:oe,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(_.matched)return oe.push(""),oe.push(`STEP ${H} ${Y.h} Dangerous text check`),oe.push(`  Token:  ${_.token}`),oe.push("  Result: MATCHED"),{lines:oe,incrementStep:!0};return null}case"strict-unparseable":return oe.push(""),oe.push(`STEP ${H} ${Y.h} Strict mode check`),oe.push(`  Command: ${_.rawCommand}`),oe.push("  Result:  ✗ UNPARSEABLE"),{lines:oe,incrementStep:!0};case"segment-skipped":return null;case"error":return oe.push(""),oe.push(`ERROR: ${_.message}`),{lines:oe,incrementStep:!1};default:return _}}function Vn(_,H){let Y=Do(H?.asciiOnly??!1),oe=58,ce=[],fe=1;ce.push(...Co(Y,58)),ce.push("");let ge=_.trace.steps.find((Ee)=>Ee.type==="error");if(ge&&ge.type==="error"){ce.push("ERROR"),ce.push(`  ${ge.message}`),ce.push(""),ce.push("RESULT"),ce.push(`  Status: ${_.result==="blocked"?ct.red("BLOCKED"):ct.green("ALLOWED")}`),ce.push(""),ce.push("CONFIG");let Ee=_.configSource??"none";return ce.push(`  Path: ${Ee}`),ce.join(`
`)}let we=_.trace.steps.find((Ee)=>Ee.type==="parse");if(we&&we.type==="parse"){ce.push("INPUT"),ce.push(`  ${we.input}`),ce.push(""),ce.push(`STEP ${fe} ${Y.h} Split shell commands`),fe++;for(let Ee=0;Ee<we.segments.length;Ee++){let st=we.segments[Ee];if(st){let at=Math.random();ce.push(`  Segment ${Ee+1}: ${Po(st,at)}`)}}}let Se=_.trace.segments,Pe=Se.length>1;for(let Ee of Se){if(Pe){ce.push("");let ut="";if(we&&we.type==="parse"){let Dn=we.segments[Ee.index];if(Dn)ut=Dn.join(" ")}let pt=54,mt=ut,dt=` Segment ${Ee.index+1}: `,ht=" ";if(ut){if(dt.length+ut.length+ht.length>pt){let Ws=pt-dt.length-ht.length;mt=`${ut.substring(0,Ws-1)}…`}}let wt=ut?`${dt}${mt}${ht}`:` Segment ${Ee.index+1} `,Vs=ut?`${dt}${ct.cyan(mt)}${ht}`:wt,ur=58-wt.length,pr=Math.floor(ur/2),Js=ur-pr;ce.push(`${Y.sh.repeat(pr)}${Vs}${Y.sh.repeat(Js)}`)}if(Ee.steps.find((ut)=>ut.type==="segment-skipped")){ce.push(""),ce.push("  (skipped — prior segment blocked)");continue}let at=!1,nt=!1;for(let ut of Ee.steps){let pt=Eo(ut,fe,Y);if(pt){if(nt=!0,ut.type==="recurse"){ce.push("");let mt=" RECURSING ",dt=58-mt.length-4;ce.push(`  ${Y.tl}${Y.h}${mt}${Y.h.repeat(dt)}`),ce.push(`  ${Y.v}`),at=!0;continue}for(let mt of pt.lines)if(at)ce.push(`  ${Y.v} ${mt}`);else ce.push(mt);if(pt.incrementStep)fe++}}if(at)ce.push(`  ${Y.v}`),ce.push(`  ${Y.bl}${Y.h.repeat(56)}`);if(!nt)ce.push(""),ce.push(`  ${ct.green("✓")} Allowed (no matching rules)`)}if(ce.push(""),ce.push("RESULT"),_.result==="blocked"){if(ce.push(`  Status: ${ct.red("BLOCKED")}`),_.customRule){if(ce.push(`  Rule: ${_.customRule.id}`),_.customRule.rulebook)ce.push(`  Rulebook: ${_.customRule.rulebook.name} ${_.customRule.rulebook.version}`);if(_.customRule.source)ce.push(`  Source: ${_.customRule.source}`);if(_.customRule.override)ce.push(`  Override: reason ${_.customRule.override.reason}`)}if(_.reason){let Ee=qt(_.reason,"          ");ce.push(`  Reason: ${Ee[0]}`);for(let st=1;st<Ee.length;st++)ce.push(Ee[st]??"")}}else ce.push(`  Status: ${ct.green("ALLOWED")}`);ce.push(""),ce.push("CONFIG");let qe=_.configSource??"none",Ke=_.configValid?"":" (invalid)";ce.push(`  Path: ${qe}${Ke}`);let Je=_.safetyPresetScope;ce.push(`  Safety preset: ${_.selectedPreset??"standard"}${Je?` (${tn(Je)})`:""}`),ce.push(`  Effective capabilities: ${_.effectiveLevel}`);let lt=Object.entries(_.destructiveCommandRuleOverrides??{});if(ce.push(`  Rule customizations: ${lt.length}`),_.ruleActivation)ce.push(`  Rule activation: ${_.ruleActivation.id} — ${_.ruleActivation.enabled?"on":"off"} via ${_.ruleActivation.source}`);return ce.join(`
`)}function Jn(_){return JSON.stringify(_,null,2)}import{resolve as pl}from"node:path";var ll=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function $o(_){let H=0,Y={allocateSegment(){return H++},getNextSegmentIndex(){return H},recordGlobal(oe){_.record({kind:"step",scope:"global",step:oe})},recordSegment(oe,ce=Y.currentSegmentIndex){if(ce===void 0)return;_.record({kind:"step",scope:"segment",segmentIndex:ce,step:oe})}};return Y}function Ao(_={}){let H=[],Y=_.maxEvents??512,oe={maxTextLength:_.maxTextLength??2048,maxListLength:_.maxListLength??128,maxObjectProperties:_.maxObjectProperties??_.maxListLength??128,maxDepth:_.maxDepth??16},ce,fe=new Set;return{record(ge){if(ce)return;if(!ge||H.length>=Y)return;try{H.push(Kn(cl(ge,oe,fe)))}catch{}},finish(){if(ce)return ce;return ce=Kn({events:Object.freeze(H)}),ce}}}function cl(_,H,Y){if(_.kind!=="step")throw TypeError("invalid trace event");let{scope:oe,step:ce}=_;dn(ce,Y,H);let fe=Wn(ce,H,Y);if(oe==="global")return{kind:"step",scope:"global",step:fe};if(oe!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:_.segmentIndex,step:fe}}function dn(_,H,Y,oe=0,ce=new WeakSet){if(typeof _==="string"){let we=_.slice(0,Y.maxTextLength);if(!Ue(we))return;for(let Se of tt(we))for(let Pe of Se.match(/[^\s"'()$]+/g)??[])H.add(_o(Pe));return}if(!_||typeof _!=="object"||oe>=Y.maxDepth||ce.has(_))return;if(ce.add(_),Array.isArray(_)){let we=Math.min(_.length,Y.maxListLength);for(let Se=0;Se<we;Se++)dn(_[Se],H,Y,oe+1,ce);return}let fe=0,ge=new Set;for(let we in _){if(!Object.hasOwn(_,we))continue;if(fe>=Y.maxObjectProperties)break;fe++,dn(we,H,Y);let Se=Yn(we,Y,H);if(ge.has(Se))continue;ge.add(Se),dn(_[we],H,Y,oe+1,ce)}}function Wn(_,H,Y,oe=0,ce=new WeakSet){if(typeof _==="string")return Yn(_,H,Y);if(!_||typeof _!=="object")return _;if(oe>=H.maxDepth)return;if(ce.has(_))return;if(ce.add(_),Array.isArray(_)){let we=[],Se=Math.min(_.length,H.maxListLength);for(let Pe=0;Pe<Se;Pe++)we.push(Wn(_[Pe],H,Y,oe+1,ce));return we}let fe={},ge=0;for(let we in _){if(!Object.hasOwn(_,we))continue;if(ge>=H.maxObjectProperties)break;ge++;let Se=Yn(we,H,Y);if(Object.hasOwn(fe,Se))continue;Object.defineProperty(fe,Se,{value:Wn(_[we],H,Y,oe+1,ce),enumerable:!0,configurable:!0,writable:!0})}return fe}function Yn(_,H,Y){let oe=_.slice(0,H.maxTextLength),ce=Ue(oe)?je(oe):oe,fe=Y.size>0?ul(ce,Y):ce;return(dl(fe)?Ce(fe):fe).slice(0,H.maxTextLength)}function dl(_){return _.includes("PRIVATE KEY")||_.includes("://")||_.includes("eyJ")||_.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(_)||_.length>=14&&ll.some((H)=>_.includes(H))||_.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(_)}function ul(_,H){return _.replace(/[^\s"'()$]+/g,(Y)=>H.has(_o(Y))?"<redacted>":Y)}function _o(_){let H=2166136261,Y=2166136261;for(let oe=0;oe<_.length;oe++)H=Math.imul(H^_.charCodeAt(oe),16777619),Y=Math.imul(Y^_.charCodeAt(_.length-oe-1),16777619);return`${H>>>0}:${Y>>>0}:${_.length}`}function Kn(_){if(_&&typeof _==="object"&&!Object.isFrozen(_)){for(let H of Object.values(_))Kn(H);Object.freeze(_)}return _}function Ut(_,H={},Y){let oe=pl(H.cwd??process.cwd()),ce=H.policySnapshot??k(Y,{cwd:oe,userConfigDir:H.userConfigDir}),fe=I(ce.policy,Y.env),ge=Oe({policySnapshot:ce,effectiveCapabilities:fe.capabilities,strict:fe.strict,paranoidRm:fe.paranoidRm,paranoidInterpreters:fe.paranoidInterpreters,worktreeMode:fe.worktreeMode}),we={effectiveLevel:ge.effectiveLevel,selectedPreset:ce.policy.safety.level??"standard",...ce.policyScopes?{safetyPresetScope:ce.policyScopes.levelScope}:{},effectiveCapabilities:ge.effectiveCapabilities,destructiveCommandRuleOverrides:ce.policy.destructiveCommandRuleOverrides},{configSource:Se,configValid:Pe}=ml(Y,{cwd:oe,userConfigDir:H.userConfigDir});if(!_||!_.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:Se,configValid:Pe,...we};let qe=f(_,"auto");if(qe.status==="limited")throw new m;let Ke=qe.dialect==="powershell"?f(_,"posix"):qe,Je=it(Ke),lt=Ao(),Ee=$o(lt);Ee.recordGlobal({type:"parse",input:_,segments:Je.map((wt)=>[...wt])});let st=S("Bash",{command:_},{kind:"command",shell:"auto"},{configCwd:oe,executionCwd:oe},_),at=G(st,{environment:Y,trace:Ee,dependencies:{loadPolicySnapshot:()=>ce}}),nt=at.decision.kind==="deny"?at.decision:null;if(nt&&(at.stage==="policy-protection"||at.stage==="secret-protection")){let wt=fl(nt);return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:wt.rule,matched:!0,reason:nt.reason}]}]},result:"blocked",reason:E(nt.reason),segment:E(jo(nt,_)),...wt.ruleId?{ruleId:E(wt.ruleId)}:{},configSource:Se,configValid:Pe,...we}}let ut=Ee.getNextSegmentIndex();if(nt&&ut>0&&ut<Je.length)Ee.recordSegment({type:"segment-skipped",index:ut,reason:"prior-segment-blocked"},ut);let pt=lt.finish(),mt=nt?.ruleId??gl(st,ce,fe,Y),dt=j.find((wt)=>wt.id===mt&&wt.activationCapability),ht=dt?ge.policy.effectiveDestructiveCommandRules[dt.id]:void 0;return{trace:yl(pt),result:nt?"blocked":"allowed",reason:nt?E(nt.reason):void 0,segment:nt?E(jo(nt,_)):void 0,ruleId:nt?.ruleId?E(nt.ruleId):void 0,customRule:hl(vl(nt?.ruleId,ce)),configSource:Se,configValid:Pe,...we,...dt&&ht?{ruleActivation:{id:dt.id,...ht}}:{}}}function jo(_,H){return _.evidence?.segment??H}function fl(_){if(_.reason===Me)return{ruleId:"policy-protection",rule:"policy-protection:findPolicyConfigMutationTargetInSemanticFacts"};if(_.reason===Fe)return{ruleId:"policy-apply-protection",rule:"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts"};if(_.reason===y)return{ruleId:"git-metadata-protection",rule:"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts"};return{ruleId:_.ruleId,rule:"secret-protection:findSensitiveTargetInSemanticFacts"}}function ml(_,H){let Y=F(H.cwd),oe=M(_,H),ce=z(_,{cwd:H.cwd,userConfigDir:H.userConfigDir});try{if(n(ce.projectConfigTarget)!==null){if(Pt(ce.projectConfigTarget).errors.length===0)return{configSource:Y,configValid:!0};return{configSource:Y,configValid:!1}}}catch(fe){if(fe instanceof r)return{configSource:Y,configValid:!1};throw fe}try{if(n(ce.userConfigTarget)!==null){let fe=Pt(ce.userConfigTarget);return{configSource:oe,configValid:fe.errors.length===0}}return{configSource:null,configValid:!0}}catch(fe){if(fe instanceof r)return{configSource:oe,configValid:!1};throw fe}}function gl(_,H,Y,oe){let ce=H.policy,fe=ve({...ce,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...ce.destructiveCommandRuleOverrides,...Object.fromEntries(j.flatMap((we)=>we.activationCapability?[[we.id,"on"]]:[]))}},H.state==="degraded"?{diagnostics:H.diagnostics,reason:H.reason}:void 0),ge=G(_,{environment:oe,dependencies:{loadPolicySnapshot:()=>fe,getModes:()=>({...Y,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return ge.decision.kind==="deny"?ge.decision.ruleId:void 0}function hl(_){if(!_)return;return{id:E(_.id),..._.rulebook?{rulebook:{name:E(_.rulebook.name),version:E(_.rulebook.version)}}:{},..._.source?{source:E(_.source)}:{},..._.override?{override:{type:"reason",reason:E(_.override.reason)}}:{}}}function yl(_){let H=_.events.flatMap((oe)=>oe.kind==="step"&&oe.scope==="global"?[oe.step]:[]),Y=new Map;for(let oe of _.events){if(oe.kind!=="step"||oe.scope!=="segment")continue;let ce=Y.get(oe.segmentIndex)??{index:oe.segmentIndex,steps:[]};ce.steps.push(oe.step),Y.set(oe.segmentIndex,ce)}return{steps:H,segments:[...Y.values()]}}function vl(_,H){let Y=_?.replace(/^custom\./,"");if(!Y||!H.policy.rules.some((oe)=>oe.name===Y))return;return H.ruleMetadata[Y]??Object.freeze({id:Y})}function To(_){return new Promise((H)=>{process.stdout.write(`${_}
`,()=>H())})}async function Fo(_,H){let Y=Gn(H);if(!Y)return 1;try{let oe=Ut(Y.command,{cwd:Y.cwd},_),ce=!!process.env.NO_COLOR||!process.stdout.isTTY;return await To(Y.json?Jn(oe):Vn(oe,{asciiOnly:ce})),0}catch(oe){let ce=bl(oe instanceof x?oe.cause:oe);if(ce===void 0)throw oe;if(Y.json)return await To(JSON.stringify({error:ce})),1;return console.error(ce),1}}function bl(_){if(_ instanceof m)return _.message;if(_ instanceof h)return _.message;if(_ instanceof s&&a[_.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Oo="2.4.14",xt="  ",_t="cc-safety-net";function Io(_){return _.argument?`${_.flags} ${_.argument}`:_.flags}function Ll(_){return Math.max(..._.map((H)=>Io(H).length))}function wl(_){return Math.max(..._.map((H)=>H.usage.length))}function xl(_){return Math.max(..._.map((H)=>`${_t} ${H.usage}`.length))}function kl(_,H){let Y=`${_t} ${_.usage}`;return`${xt}${Y.padEnd(H+2)}${_.description}`}function St(_,H){return`${xt}${_.padEnd(Math.max(40,_.length+2))}${H}`}function Ht(_,H=console.log){let Y=[];if(Y.push(`${_t} ${_.name}`),Y.push(""),Y.push(`${xt}${_.description}`),Y.push(""),Y.push("USAGE:"),Y.push(`${xt}${_t} ${_.usage}`),Y.push(""),_.subcommands&&_.subcommands.length>0){Y.push("SUBCOMMANDS:");let oe=wl(_.subcommands);for(let ce of _.subcommands)Y.push(`${xt}${ce.usage.padEnd(oe+2)}${ce.description}`);Y.push("")}if(_.options.length>0){Y.push("OPTIONS:");let oe=Ll(_.options);for(let ce of _.options){let fe=Io(ce),ge=ce.default?`${ce.description} (default: ${ce.default})`:ce.description;Y.push(`${xt}${fe.padEnd(oe+2)}${ge}`)}Y.push("")}if(_.examples&&_.examples.length>0){Y.push("EXAMPLES:");for(let oe of _.examples)Y.push(`${xt}${oe}`)}H(Y.join(`
`))}function Zn(){let _=xl(Yt),H=[];H.push(`${_t} v${Oo}`),H.push(""),H.push("Blocks destructive commands and secret access."),H.push(""),H.push("COMMANDS:");for(let Y of Yt)H.push(kl(Y,_));H.push(""),H.push("GLOBAL OPTIONS:"),H.push(`${xt}-h, --help       Show help (use with command for command-specific help)`),H.push(`${xt}-V, --version    Show version`),H.push(""),H.push("HELP:"),H.push(`${xt}${_t} help <command>     Show help for a specific command`),H.push(`${xt}${_t} <command> --help   Show help for a specific command`),H.push(""),H.push("ENVIRONMENT VARIABLES:"),H.push(St(`${i.level.name}=standard|strict|paranoid`,"Set session safety level")),H.push(St(`${i.worktree.name}=1`,"Allow local git discards in linked worktrees")),H.push(St(`${i.debug.name}=1`,"Print diagnostic messages to stderr")),H.push(St(`${i.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),H.push(St("CC_SAFETY_NET_HOME","Override rule config home directory")),H.push(""),H.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),H.push(St(`${i.strict.name}=1`,"Force safety.overrides.fail_closed on")),H.push(St(`${i.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),H.push(St(`${i.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),H.push(St(`${i.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),H.push(""),H.push("Documentation:        https://local/cc-safety-net/docs"),console.log(H.join(`
`))}function No(){console.log(Oo)}function Xn(_,H=console.log){let Y=Kt(_);if(!Y)return!1;if(Y.name.toLowerCase()!==_.toLowerCase())return!1;return Ht(Y,H),!0}import{mkdirSync as El}from"node:fs";import{dirname as $l}from"node:path";import{createInterface as Al}from"node:readline";import{existsSync as Ho,readFileSync as Sl}from"node:fs";function jt(_,H){let Y=Ve(_,H);return{policy:Y.policy,errors:ee(Be(Y.issues,He,(oe)=>oe.kind==="custom")," "," ")}}function Bt(_,H){return jt(_,H).errors}function Mo(_,H){return{"safety.level":_.safety.level,...Qn("safety.overrides",_.safety.overrides),"workflow.worktree_mode":String(_.workflow.worktree_mode),"destructive_command_protection.enabled":String(_.destructive_command_protection.enabled),...Qn("destructive_command_protection.overrides",_.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":er(_.destructive_command_protection.allow_paths),"secret_protection.enabled":String(_.secret_protection.enabled),...Qn("secret_protection.overrides",_.secret_protection.overrides),"secret_protection.deny_paths":er(_.secret_protection.deny_paths),"secret_protection.allow_paths":er(_.secret_protection.allow_paths),...H?{"audit.retention_days":String(_.audit.retention_days)}:{}}}function un(_,H,Y){let oe=Mo(_,Y),ce=Mo(H,Y);return[...new Set([...Object.keys(oe),...Object.keys(ce)])].flatMap((fe)=>oe[fe]===ce[fe]?[]:[{field:fe,before:oe[fe],after:ce[fe]}])}function Gt(_,H){let Y=u(_,H);if(!Ho(Y))return{baseline:R(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,_.home),diagnostics:[]};let oe=Tt(Y),ce=jt(oe.value,_.home);return{baseline:ce.policy,diagnostics:oe.errors.length>0?oe.errors:ce.errors}}function Tt(_){if(!Ho(_))return{errors:[`${_}: file not found`]};try{return{value:JSON.parse(Sl(_,"utf-8")),errors:[]}}catch(H){let Y=H instanceof Error?H.message:String(H);return{errors:[`${_}: ${H instanceof SyntaxError?`Invalid JSON: ${Y}`:Y}`]}}}function pn(_,H){let Y=Rl(_)?_:{};return{version:H.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((oe)=>Y[oe]!==void 0).map((oe)=>[oe,Y[oe]]))}}function Qn(_,H){return Object.fromEntries(Object.entries(H).flatMap(([Y,oe])=>oe===void 0?[]:[[`${_}.${Y}`,String(oe)]]))}function er(_){return _.length===0?"(none)":_.join(", ")}function Rl(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{chmodSync as Dl,existsSync as qo,mkdirSync as Cl,readFileSync as Uo}from"node:fs";import{dirname as Pl}from"node:path";function Bo(_,H={}){let Y=u(_,H);if(!qo(Y))return{path:Y,exists:!1,raw:"",policy:U(),errors:[]};let oe=Uo(Y,"utf-8");if(!oe.trim())return{path:Y,exists:!0,raw:oe,policy:U(),errors:["Config file is empty"]};try{let ce=jt(JSON.parse(oe),_.home);return{path:Y,exists:!0,raw:oe,policy:ce.policy,errors:ce.errors}}catch(ce){return{path:Y,exists:!0,raw:oe,policy:U(),errors:[`Invalid JSON: ${ce instanceof Error?ce.message:String(ce)}`]}}}function Rt(_,H,Y={}){let oe=u(_,Y),ce=jt(H,_.home);if(ce.errors.length>0)return{path:oe,policy:U(),errors:ce.errors};let fe=ce.policy;return Cl(Pl(oe),{recursive:!0,mode:448}),p(X(oe),`${JSON.stringify(fe,null,2)}
`,384),Dl(oe,384),{path:oe,policy:fe,errors:[]}}function Go(_,H){let Y=jt(H,_.home);if(Y.errors.length>0)return{errors:Y.errors};return{preview:_e(Y.policy,_.env),errors:[]}}function zo(_,H={}){let Y=u(_,H);if(!qo(Y))return Rt(_,K,H);let oe=Uo(Y,"utf-8");if(!oe.trim())return Rt(_,K,H);try{return Rt(_,R(JSON.parse(oe),_.home),H)}catch{return Rt(_,K,H)}}var Vo=new Set(["check","apply"]),Jo="(unset)";async function Yo(_,H,Y={}){let oe=yt({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},H),ce=oe.positionals[0],fe=[...oe.errors,...ce&&!Vo.has(ce)?[`Unknown policy subcommand: ${ce}`]:[],...ce&&Vo.has(ce)&&!oe.positionals[1]?[`policy ${ce} requires a file`]:[],...oe.positionals.slice(2).map((Ee)=>`Unexpected policy argument: ${Ee}`)];if(fe.length>0){for(let Ee of fe)console.error(Ee);return 1}let ge=oe.positionals[1];if(!ce||!ge)return Ht(Wt,console.error),1;let we=oe.flags.global?u(_):g(Y.cwd??process.cwd()),Se=Tt(ge),Pe=[...Se.errors,...Bt(Se.value,_.home).map((Ee)=>`${ge}: ${Ee}`),...!oe.flags.global&&Tl(Se.value)&&Se.value.audit!==void 0?[`${ge}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(Pe.length>0){for(let Ee of Pe)console.error(Ee);return 1}let qe=R(Se.value,_.home);if(console.log(`Scope: ${oe.flags.global?"user":"project"} (${we})`),console.log(`Proposal: ${ge}`),oe.flags.global)Wo(R(Tt(we).value,_.home),qe,!0);if(!oe.flags.global){let Ee=Gt(_).baseline;console.log("Effective policy (user + project merged):"),Wo(q(Ee,re(Tt(we).value,_.home).policy).policy,q(Ee,re(Se.value,_.home).policy).policy,!1)}if(ce==="check")return 0;let Ke=Y.input??process.stdin,Je=Y.output??process.stdout;if(!Ke.isTTY||!Je.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ge}${oe.flags.global?" --global":""}`),1;if(!await _l(`Apply this policy to ${we}? [y/N] `,Ke,Je))return console.log("Cancelled; nothing was written."),0;return jl(_,we,Se.value,qe,oe.flags.global),console.log(`Policy applied: ${we}`),0}function _l(_,H,Y){let oe=Al({input:H,output:Y,terminal:!1});return new Promise((ce)=>{oe.once("close",()=>ce(!1)),oe.question(_,(fe)=>{ce(/^y(es)?$/i.test(fe.trim())),oe.close()})})}function jl(_,H,Y,oe,ce){if(ce){Rt(_,oe);return}El($l(H),{recursive:!0}),vt(H,pn(Y,oe))}function Wo(_,H,Y){let oe=un(_,H,Y);if(oe.length===0){console.log("No changes.");return}console.log(`Changes (${oe.length}):`);for(let ce of oe)console.log(`  ${ce.field}: ${ce.before??Jo} -> ${ce.after??Jo}`)}function Tl(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{join as Hc}from"node:path";var Fl="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- Transparent wrappers have no built-in defaults. Configure only wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function Ko(_){return C(_,"rule-doc",Fl)}function fn(_,H){if(!_.ok){ts(_);return}Qo(_,H)}function Xo(_,H,Y){if(_.ok)console.log(Y);if(!_.add){fn(_,`Added rulebook source: ${H}`);return}if(!_.ok){ts(_);return}if(_.add.added.length>0)console.log(`Added ${_.add.added.length} ${_.add.added.length===1?"rulebook":"rulebooks"} from ${_.add.source} at ${_.add.ref}:`),_.add.added.forEach((oe)=>{console.log(`  - ${oe}`)});if(_.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${_.add.source} at ${_.add.ref}: ${_.add.alreadyConfigured.join(", ")}`);if(_.add.commits.length>0)console.log(`Vendored at ${_.add.commits.map((oe)=>oe.slice(0,7)).join(", ")}.`);Qo(_,"Rule config updated.")}function Qo(_,H){for(let Y of _.changes??[])console.log(Y);console.log(H),console.log(""),Ol(_.entries)}function Ol(_){if(_.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${_.length}):`);for(let H of _)console.log(`  - ${H.name} ${H.version} (${Il(H.ruleCount)})`),console.log(`    Source: ${H.spec}`)}function Il(_){return`${_} ${_===1?"rule":"rules"}`}function es(_){Ft("Active sources",_.rulebooks,(H)=>[`[${H.source}] ${H.name} ${H.version}`,`  Source: ${H.spec}`]),Ft("Active rules",_.rules,(H)=>[`[${Ml(_,H.name)}] ${H.name}`,...Nl(H),`  Reason: ${H.reason}`]),Ft("Disabled rules",Zo(_,"off"),(H)=>[H.key]),Ft("Reason overrides",Zo(_,"reason"),(H)=>[H.key,`  Reason: ${H.value.reason}`]),Ft("Transparent wrappers",_.transparent_wrappers,(H)=>[H]),Ft("Issues",_.errors,(H)=>[H]),Ft("Warnings",_.warnings,(H)=>[H])}function Ft(_,H,Y){if(H.length===0){console.log(`${_}: (none)`);return}console.log(`${_} (${H.length}):`);for(let oe of H){let[ce,...fe]=Y(oe);console.log(`  - ${ce}`);for(let ge of fe)console.log(`    ${ge}`)}}function Nl(_){if(!_.match)return[`  Command: ${_.subcommand?`${_.command} ${_.subcommand}`:_.command}`,`  Block args: ${_.block_args.join(", ")}`];return[`  Command: ${[_.command,..._.match.command_path].join(" ")}`,..._.match.any_args?[`  Any args: ${_.match.any_args.join(", ")}`]:[],..._.match.exclude_args?[`  Exclude args: ${_.match.exclude_args.join(", ")}`]:[]]}function Ml(_,H){return _.rulebooks.find((Y)=>Y.rules.includes(H))?.source??"project"}function Zo(_,H){return Object.entries({..._.userConfig?.overrides,..._.projectConfig?.overrides}).filter((Y)=>{if(H==="off")return Y[1]==="off";return!!Y[1]&&typeof Y[1]==="object"}).map(([Y,oe])=>({key:Y,value:oe}))}function ts(_){for(let H of _.errors)console.error(H)}import{dirname as Ss,join as wn}from"node:path";import{join as sr,resolve as Zl}from"node:path";function tr(_){let H=d(_);if(H.errors.length>0)return{ok:!1,result:{ok:!1,errors:H.errors,entries:[]}};return{ok:!0,config:H.config??ot}}function ns(_){vt(_,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function rs(_){vt(_,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as yn}from"node:path";var Hl="custom.";function mn(_){if(_.rulebook_version!==2)return[];let H=_.rules.map((Y)=>({name:Y.name,command:Y.command,block_args:[],match:Y.match,reason:Y.reason,intent:Y.intent}));return(_.tests??[]).flatMap((Y,oe)=>{let ce=nr(f(Y.command));if(ce.length===0)return[`tests[${oe}]: could not parse fixture command: ${Y.command}`];let fe=ce.reduce((ge,we)=>ge??T(we,H)?.id.slice(Hl.length),void 0);if(Y.expect==="blocked"){if(fe===Y.rule)return[];let ge=fe?`"${fe}" matched first`:"no rule matched";return[`tests[${oe}]: expected "${Y.rule}" to block "${Y.command}" but ${ge}`]}return fe?[`tests[${oe}]: expected "${Y.command}" to be allowed but "${fe}" matched`]:[]})}function nr(_){return _.nodes.flatMap((H)=>{if(H.kind==="group"||H.kind==="function")return nr(H.body);if(H.kind!=="command")return[];let Y=pe(J(H.dialect,H.words)).words.map(t);return[...Y.length>0?[Y]:[],...H.nested.flatMap((oe)=>nr(oe))]})}var gn=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function hn(_={}){return{requests:0,responseBytes:0,maxRequests:_.maxRequests??gn.maxRequests,maxResponseBytes:_.maxResponseBytes??gn.maxResponseBytes}}function Dt(_){return{controller:new AbortController,budget:hn(),resolveUrl:_}}function os(_){return _ instanceof Error&&_.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function ss(_){if(_.requests>=_.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.requests++}function is(_,H){if(H>_.maxResponseBytes-_.responseBytes)throw _.responseBytes+=H,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.responseBytes+=H}var cs=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function as(_,H,Y=b(yn(yn(H)),"rules policy"),oe=Dt()){if(v(_))return Gl(_,oe);return Bl(_,H,Y)}async function ds(_,H,Y,oe,ce,fe){if(!v(_))return as(_,H,Y,oe);let ge=ce?null:ql(_,H,Y);if(ge)return ge;if(!ce&&!fe)throw Error(`${_} is not vendored; run rule update ${_} to vendor it`);return as(_,H,Y,oe)}function ql(_,H,Y=b(yn(yn(H)),"rules policy")){let oe=P(_),ce=A(H,oe.name),fe=n(o(Y,ce));if(fe===null)return null;let ge=te(rr(fe,`Invalid rulebook ${ce}.`));if(ge.name!==oe.name)throw Error(`rulebook name "${ge.name}" in ${ce} must match "${oe.name}"`);return{spec:_,rulebook:ge,content:fe}}async function us(_,H={}){if(!B(_))throw Error(`Invalid GitHub repository source: ${_}`);let[Y,oe]=_.split("/");if(!Y||!oe)throw Error(`Invalid GitHub repository source: ${_}`);if(H.ref!==void 0&&!Q(H.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${H.ref}`);let ce=H.operation??Dt(),fe=H.ref??await Ul(Y,oe,_,ce),ge=await fs(Y,oe,fe,_,ce),we=await vn(`https://api.github.com/repos/${Y}/${oe}/git/trees/${ge}?recursive=1`,"tree",ce),Se=we.response;if(!Se.ok)throw Error(`Failed to inspect ${_}: GitHub tree returned ${Se.status}`);let Pe=JSON.parse(we.content);if(!Array.isArray(Pe?.tree))throw Error(`Failed to inspect ${_}: unexpected GitHub tree response`);let qe=Pe.tree,Ke=[...new Set(qe.flatMap((Je)=>{if(!Je||typeof Je!=="object")return[];let lt=Je;if(lt.type!=="blob"||typeof lt.path!=="string")return[];let Ee=lt.path.match(Xe);return Ee?.[1]?[Ee[1]]:[]}))].sort();if(Ke.length===0)throw Error(`No rulebooks found in ${_} under ${ae}/`);return{source:_,owner:Y,repo:oe,ref:fe,commit:ge,names:Ke}}async function Ul(_,H,Y,oe){let ce=await vn(`https://api.github.com/repos/${_}/${H}`,"metadata",oe),fe=ce.response;if(!fe.ok)throw Error(`Failed to inspect ${Y}: GitHub returned ${fe.status}`);let we=JSON.parse(ce.content)?.default_branch;if(typeof we!=="string"||we==="")throw Error(`Failed to inspect ${Y}: missing default branch`);if(!Q(we))throw Error(`GitHub returned an invalid default branch: ${we}`);return we}function Bl(_,H,Y){Qe(_);let oe=A(H,_),ce=n(o(Y,oe));if(ce===null)throw Error(`Rulebook source not found: ${_}`);let fe=ps(rr(ce,"Invalid local rulebook source."));if(fe.name!==_)throw Error(`rulebook name "${fe.name}" must match local source "${_}"`);return{spec:_,rulebook:fe,content:ce}}async function Gl(_,H){let Y=P(_),oe=await fs(Y.owner,Y.repo,Y.ref,_,H),ce=await vn(`https://raw.githubusercontent.com/${Y.owner}/${Y.repo}/${oe}/${Y.path}`,"raw",H),fe=ce.response;if(!fe.ok)throw Error(`Failed to fetch ${_}: GitHub raw returned ${fe.status}`);let ge=ce.content,we=ps(rr(ge,"Invalid GitHub rulebook response."));if(we.name!==Y.name)throw Error(`rulebook name "${we.name}" must match GitHub source "${Y.name}"`);return{spec:_,rulebook:we,content:ge}}function ps(_){let H=te(_),Y=mn(H);if(Y.length>0)throw Error(Y.join("; "));return H}function rr(_,H){try{return JSON.parse(_)}catch{throw Error(H)}}async function fs(_,H,Y,oe,ce){let fe=await vn(`https://api.github.com/repos/${_}/${H}/commits/${encodeURIComponent(Y)}`,"commit",ce),ge=fe.response;if(!ge.ok)throw Error(`Failed to resolve ${oe}: GitHub returned ${ge.status}`);let we=JSON.parse(fe.content);if(typeof we?.sha!=="string"||we.sha==="")throw Error(`Failed to resolve commit for ${oe}`);return we.sha}async function zl(_,H,Y={}){if(Y.signal?.aborted)throw Y.signal.reason;let oe=Y.budget??hn(),ce=new AbortController,fe=()=>ce.abort(Y.signal?.reason);Y.signal?.addEventListener("abort",fe,{once:!0});let ge=!1,we=setTimeout(()=>{if(ce.signal.aborted)return;ge=!0,ce.abort()},Y.timeoutMs??cs.timeoutMs);try{if(Y.signal?.aborted)throw Y.signal.reason;ss(oe);let Se=await fetch(_,{signal:ce.signal,redirect:"error"});if(!Se.ok)return ms(Se),{response:Se,content:""};return{response:Se,content:await Vl(Se,H,oe,()=>ce.abort())}}catch(Se){if(ge)throw Error("GitHub request timed out",{cause:Se});if(Y.signal?.aborted)throw Y.signal.reason;throw Se}finally{clearTimeout(we),Y.signal?.removeEventListener("abort",fe)}}function vn(_,H,Y){return zl(Y.resolveUrl?.(_)??_,H,{budget:Y.budget,signal:Y.controller.signal})}async function Vl(_,H,Y=hn(),oe){let ce=cs[`${H}Bytes`],fe=Number(_.headers.get("content-length"));if(Number.isFinite(fe)&&fe>ce)throw ms(_),Error(`GitHub ${H} response exceeds ${ce} bytes`);if(!_.body)return"";let ge=_.body.getReader(),we=[],Se=0;while(!0){let Pe=await ge.read();if(Pe.done)break;try{is(Y,Pe.value.byteLength)}catch(qe){throw oe?.(),ls(ge),qe}if(Se+=Pe.value.byteLength,Se>ce)throw oe?.(),ls(ge),Error(`GitHub ${H} response exceeds ${ce} bytes`);we.push(Buffer.from(Pe.value))}return Buffer.concat(we,Se).toString("utf-8")}function ms(_){if(!_.body)return;gs(()=>_.body?.cancel())}function ls(_){gs(()=>_.cancel())}function gs(_){try{Promise.resolve(_()).catch(()=>{})}catch{}}var Jl=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function hs(_,H){let Y=bs(_.rules,H);if(Y.length>0)return{ok:!0,specs:Y};return vs(_.rules,H)}function ys(_,H){let Y=bs(_,H);if(Y.length>0)return{ok:!0,specs:Y};let oe=Yl(_,H);if(oe.length>0)return{ok:!0,specs:oe};let ce=Kl(_,H);if(!ce.ok)return ce;if(ce.specs.length>0)return{ok:!0,specs:ce.specs};return vs(_,H)}function vs(_,H){let Y=_.filter((oe)=>or(oe)?.name===H);if(Y.length===1)return{ok:!0,specs:Y};return Wl(H,Y)}function Wl(_,H){return{ok:!1,result:{ok:!1,errors:H.length===0?[`No configured rulebook matches ${_}`]:[`Ambiguous rulebook match ${_}: ${H.join(", ")}`],entries:[]}}}function bs(_,H){return _.filter((Y)=>Y===H)}function Yl(_,H){let Y=H.match(Jl),oe=Y?.[1],ce=Y?.[2],fe=Y?.[3];if(!oe||!ce||!fe||!Q(fe))return[];return Ls(_,(ge)=>ge.owner===oe&&ge.repo===ce&&ge.ref===fe)}function Kl(_,H){if(!B(H))return{ok:!0,specs:[]};let[Y,oe]=H.split("/"),ce=Ls(_,(ge)=>ge.owner===Y&&ge.repo===oe);if(new Set(ce.map((ge)=>or(ge)?.ref).filter((ge)=>!!ge)).size<2)return{ok:!0,specs:ce};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${H}. Use an explicit ref:`,`  cc-safety-net rule remove ${H}#<ref>`],entries:[]}}}function or(_){try{return P(_)}catch{return null}}function Ls(_,H){return _.filter((Y)=>{let oe=or(Y);return oe?H(oe):!1})}async function Ln(_,H={}){let Y=ir(H);return Xl(_,Y,await bn(_,Y,Dt()))}function Xl(_,H,Y){if(!Y.ok)return Y;let oe=bt(_,H),ce=[...new Set(N(oe.configPath,oe.filesystemScope))];if(ce.length===0)return Y;return{ok:!1,errors:ce,entries:Y.entries}}async function bn(_,H,Y,oe={},ce=new Set,fe=new Set){try{let ge=bt(_,H),we=tr(ge.configTarget);if(!we.ok)return we.result;let Se=we.config,Pe=H.only?hs(Se,H.only):{ok:!0,specs:Se.rules};if(!Pe.ok)return Pe.result;let qe=new Set([...H.refresh?Pe.specs:[],...ce]),Ke=(dt)=>ds(dt,ge.configDir,ge.filesystemScope,Y,qe.has(dt),!H.refresh||qe.has(dt)),Je=await cc(Se.rules,H.refresh?(dt)=>Ke(dt).then((ht)=>({ok:!0,item:ht})).catch((ht)=>{if(os(ht))throw ht;return{ok:!1,spec:dt,message:ht instanceof Error?ht.message:String(ht)}}):async(dt)=>({ok:!0,item:await Ke(dt)}),Y),lt=Je.filter((dt)=>!dt.ok),Ee=Je.filter((dt)=>dt.ok).map((dt)=>dt.item),st=Ee.flatMap((dt)=>Ql(dt,Se.rules)),at=Ee.flatMap((dt)=>ec(dt,fe,ge)),nt=new Set([...st,...at].map((dt)=>dt.spec)),ut=[...lt,...st,...at],pt=[],mt=nc(pt,()=>Ee.flatMap((dt)=>nt.has(dt.spec)||ut.length>0&&fe.has(dt.spec)?[]:tc(dt,ge,oe,pt)));return{ok:ut.length===0,errors:ut.map((dt)=>`Failed to update ${dt.spec}: ${dt.message}`),entries:Ee.map(oc),changes:mt}}catch(ge){return Vt(ge)}}function Ql(_,H){if(!v(_.spec))return[];let Y=Te(_.spec),oe=H.filter((ce)=>ce!==_.spec&&Te(ce).toLowerCase()===Y.toLowerCase());if(oe.length===0)return[];return[{ok:!1,spec:_.spec,message:`rulebook name "${Y}" is also claimed by ${oe.join(", ")}; rename one of them`}]}function ec(_,H,Y){if(!H.has(_.spec)||!v(_.spec))return[];let oe=A(Y.configDir,_.rulebook.name),ce=n(o(Y.filesystemScope,oe));if(ce===null||ce===_.content)return[];return[{ok:!1,spec:_.spec,message:`${oe} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function tc(_,H,Y,oe){if(!v(_.spec))return[];let ce=A(H.configDir,_.rulebook.name),fe=o(H.filesystemScope,ce),ge=n(fe);if(ge===_.content)return[];return oe?.push({target:fe,previous:ge}),p(fe,_.content,void 0,Y._testAfterPolicyRename),rc(_,ge)}function nc(_,H){try{return H()}catch(Y){for(let oe of[..._].reverse()){if(oe.previous===null){O(oe.target);continue}p(oe.target,oe.previous)}throw Y}}function rc(_,H){if(H===null)return[`Vendored ${_.spec} (${_.rulebook.version})`];let Y=de(H),oe="problem"in Y?null:Y.rulebook,ce=new Map(oe?.rules.map((ge)=>[ge.name,JSON.stringify(ge)])??[]),fe=new Set(_.rulebook.rules.map((ge)=>ge.name));return[`Updated ${_.spec} (${oe?.version??"unreadable"} -> ${_.rulebook.version})`,...[...fe].filter((ge)=>!ce.has(ge)).map((ge)=>`  + ${ge}`),...[...ce.keys()].filter((ge)=>!fe.has(ge)).map((ge)=>`  - ${ge}`),..._.rulebook.rules.filter((ge)=>{let we=ce.get(ge.name);return we!==void 0&&we!==JSON.stringify(ge)}).map((ge)=>`  ~ ${ge.name}`)]}function oc(_){return{spec:_.spec,name:_.rulebook.name,version:_.rulebook.version,ruleCount:_.rulebook.rules.length}}async function ws(_,H,Y={}){return sc(_,H,uc(Y),Dt())}async function sc(_,H,Y,oe,ce={}){let fe=null,ge=!1;try{let we=bt(_,Y),Se=n(we.configTarget);fe={target:we.configTarget,content:Se};let Pe=tr(we.configTarget);if(!Pe.ok)return Pe.result;let qe=Pe.config,Ke=B(H);ic(H,Y,Ke);let Je=Ke?await us(H,{ref:Y.ref,operation:oe}):null,lt=Je?ac(Je,Y.rulebooks):[],Ee=Je?lt.map((pt)=>lc(qe.rules,Je,pt)??`${H}#${Je.ref}/${pt}`):[H],st=Ee.filter((pt)=>!qe.rules.includes(pt)),at=[...qe.rules,...st];if(at.length>le)return dc();if(at.length!==qe.rules.length)ge=!0,vt(we.configTarget,{version:1,rules:at,overrides:qe.overrides??{},transparent_wrappers:qe.transparent_wrappers??[]},void 0,ce._testAfterPolicyRename);let nt=await bn(_,Y,oe,ce,new Set(st),new Set(st));if(!nt.ok)zt(we.configTarget,Se);if(!nt.ok||!Je)return nt;let ut=lt.filter((pt,mt)=>st.includes(Ee[mt]??""));return{...nt,add:{source:H,ref:Je.ref,selected:lt,added:ut,alreadyConfigured:lt.filter((pt)=>!ut.includes(pt)),commits:st.length>0?[Je.commit]:[]}}}catch(we){if(ge&&fe)try{zt(fe.target,fe.content)}catch(Se){return Vt(Se)}return Vt(we)}}function ic(_,H,Y){if(!Y&&H.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!Y&&H.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${_}`);if(H.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let oe=H.rulebooks?.filter((ce)=>!c.test(ce))??[];if(oe.length>0)throw Error(`Invalid rulebook names: ${oe.join(", ")}`)}function ac(_,H){let Y=H?[...new Set(H)]:_.names,oe=Y.filter((ce)=>!_.names.includes(ce));if(oe.length>0)throw Error(`Rulebooks not found in ${_.source} at ${_.ref}: ${oe.join(", ")}
Available rulebooks: ${_.names.join(", ")}`);return Y}function lc(_,H,Y){let oe=`${H.source}#${H.ref}/${Y}`;if(_.includes(oe))return oe;let ce=`${H.source}#${H.commit}/${Y}`;return _.find((fe)=>fe===ce)}async function cc(_,H,Y=Dt()){if(_.length>le)throw Error(ue);let oe=[],ce=0,fe,ge=Array.from({length:Math.min(_.length,gn.concurrency)},async()=>{while(!fe){let we=ce;if(we>=_.length)return;ce++;try{oe[we]=await H(_[we],we,Y.controller.signal)}catch(Se){if(!fe)fe={value:Se},ce=_.length,Y.controller.abort(Se);return}}});if(await Promise.all(ge),fe)throw fe.value;return oe}function dc(){return{ok:!1,errors:[ue],entries:[]}}function ir(_){return{cwd:_.cwd,userConfigDir:_.userConfigDir,userConfigPath:_.userConfigPath,projectConfigPath:_.projectConfigPath,global:_.global,only:_.only,refresh:_.refresh}}function uc(_){return{...ir(_),ref:_.ref,rulebooks:_.rulebooks}}function pc(_){return{...ir(_),deleteSource:_.deleteSource}}async function xs(_,H,Y={}){try{return await fc(_,H,pc(Y),{})}catch(oe){return Vt(oe)}}async function fc(_,H,Y,oe){let ce=bt(_,Y),fe=d(ce.configTarget);if(fe.errors.length>0)return{ok:!1,errors:fe.errors,entries:[]};if(!fe.config)return{ok:!1,errors:[`No config found at ${ce.configPath}`],entries:[]};let ge=ys(fe.config.rules,H);if(!ge.ok)return ge.result;let we=Y.deleteSource?mc(ce.configDir,ge.specs,ce.filesystemScope):{ok:!0,dirs:[]};if(!we.ok)return we.result;let Se=n(ce.configTarget);if(Se===null)return Vt(Error("Rules config is unavailable."));try{vt(ce.configTarget,{version:1,rules:fe.config.rules.filter((Ke)=>!ge.specs.includes(Ke)),overrides:fe.config.overrides??{},transparent_wrappers:fe.config.transparent_wrappers??[]},void 0,oe._testAfterPolicyRename)}catch(Ke){throw zt(ce.configTarget,Se),Ke}let Pe=await bn(_,Y,Dt(),oe);if(!Pe.ok)return zt(ce.configTarget,Se),Pe;let qe=gc(we.dirs,oe,ce.filesystemScope);if(!qe.ok){zt(ce.configTarget,Se);let Ke=await bn(_,Y,Dt(),oe);if(!Ke.ok)return{ok:!1,errors:[...qe.result.errors,...Ke.errors],entries:Ke.entries};return qe.result}return Pe}function mc(_,H,Y){let oe=H.flatMap((we)=>c.test(we)?[]:["--delete-source can only delete local rulebook sources"]),ce=H.map((we)=>sr(_,we)),fe=oe.length>0?[]:ce.flatMap((we)=>ks(we,Y)),ge=[...oe,...fe];return ge.length>0?{ok:!1,result:{ok:!1,errors:ge,entries:[]}}:{ok:!0,dirs:ce}}function ks(_,H){let Y=Zl(_),oe=o(H,Y),ce=ie(oe);if(!ce)return[`Local rulebook source directory not found: ${_}`];let fe=ce.find((ge)=>ge.name==="rulebook.json");if(!fe)return[`Local rulebook source directory is missing rulebook.json: ${_}`];if(fe.kind!=="file")throw new r(H.label);if(n(o(H,sr(Y,"rulebook.json"))),ce.length>1)return[`Local rulebook source directory contains extra files: ${_}. delete manually if you really want to remove the directory.`];return[]}function gc(_,H,Y){let oe=_.flatMap((ce)=>{try{if(!ie(o(Y,ce)))return[];let fe=ks(ce,Y);if(fe.length>0)return fe;return hc(ce,H,Y),[]}catch(fe){return[`Failed to delete local rulebook source ${ce}: ${fe instanceof Error?fe.message:String(fe)}`]}});return oe.length>0?{ok:!1,result:{ok:!1,errors:oe,entries:[]}}:{ok:!0}}function hc(_,H,Y){if(H._testDeleteLocalSourceDir){H._testDeleteLocalSourceDir(_);return}O(o(Y,sr(_,se))),Ze(o(Y,_))}function zt(_,H){if(H===null){O(_);return}p(_,H)}function Vt(_){return{ok:!1,errors:[_ instanceof Error?_.message:String(_)],entries:[]}}var yc=".safety-net.json",vc="~/.cc-safety-net/config.json";async function Cs(_,H){return[await Rs(_,{legacyPath:Xr({cwd:H.cwd}),configPath:F(H.cwd),defaultRulebookName:"project-rules",migratedFrom:yc,cleanup:H.cleanup,syncOptions:{cwd:H.cwd}}),await Rs(_,{legacyPath:Xt(_),configPath:M(_),defaultRulebookName:"user-rules",migratedFrom:vc,cleanup:H.cleanup,syncOptions:{cwd:H.cwd,global:!0}})].every((oe)=>oe)?0:1}async function Rs(_,H){let Y=bt(_,H.syncOptions),oe=o(Y.filesystemScope,H.legacyPath),ce=n(oe);if(ce===null)return console.log(`No legacy config found at ${H.legacyPath}`),!0;let fe=Lc(ce);if(!fe.ok){for(let lt of fe.errors)console.error(lt);return!1}let ge=d(Y.configTarget);if(ge.errors.length>0){for(let lt of ge.errors)console.error(lt);return!1}let we=ge.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},Se=wc(Ss(H.configPath),we.rules,H.defaultRulebookName,H.migratedFrom,Y.filesystemScope),Pe=wn(Ss(H.configPath),Se,"rulebook.json"),qe=o(Y.filesystemScope,Pe),Ke=[Ds(Y.configTarget),Ds(qe)],Je=await bc(_,H,Y.configTarget,qe,Se,fe.config.rules,we.rules.includes(Se)?we.rules:[...we.rules,Se],we.overrides??{},we.transparent_wrappers??[]);if(!Je.ok){Sc(Ke);for(let lt of Je.errors)console.error(lt);return!1}if(!H.cleanup)return console.log(`Migrated legacy config at ${H.legacyPath}. Legacy file is no longer used.`),!0;if(!kc(Y.configTarget,qe,Se,H.migratedFrom,fe.config.rules))return console.error(`Migration cleanup verification failed for ${H.legacyPath}`),!1;return O(oe),console.log(`Deleted legacy config at ${H.legacyPath}`),!0}async function bc(_,H,Y,oe,ce,fe,ge,we,Se){try{return vt(Y,{version:1,rules:ge,overrides:we,transparent_wrappers:Se}),vt(oe,xc(ce,H.migratedFrom,fe)),await Ln(_,H.syncOptions)}catch(Pe){return{ok:!1,errors:[Pe instanceof Error?Pe.message:String(Pe)]}}}function Lc(_){try{let H=JSON.parse(_),Y=An(H);if(Y.errors.length>0)return{ok:!1,errors:Y.errors};return{ok:!0,config:{version:1,rules:H.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function wc(_,H,Y,oe,ce){let fe=H.find((ge)=>Rc(o(ce,wn(_,ge,"rulebook.json")))===oe);if(fe)return fe;if(n(o(ce,wn(_,Y,"rulebook.json")))===null)return Y;for(let ge=2;;ge++){let we=`${Y}-${ge}`;if(n(o(ce,wn(_,we,"rulebook.json")))===null)return we}}function xc(_,H,Y){return{rulebook_version:1,name:_,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:H,allowed_commands:[...new Set(Y.map((oe)=>oe.command))],rules:Y,tests:Y.map((oe)=>({command:[oe.command,oe.subcommand,oe.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:oe.name}))}}function kc(_,H,Y,oe,ce){if(!d(_).config?.rules.includes(Y))return!1;try{let ge=n(H);if(ge===null)return!1;let we=JSON.parse(ge);return we.migrated_from===oe&&JSON.stringify(we.rules)===JSON.stringify(ce)}catch{return!1}}function Ds(_){return{target:_,content:n(_)}}function Sc(_){for(let H of _){if(H.content===null){O(H.target);continue}p(H.target,H.content)}}function Rc(_){let H=n(_);if(H===null)return null;try{let Y=JSON.parse(H);return typeof Y.migrated_from==="string"?Y.migrated_from:null}catch{return null}}import{join as Dc,resolve as ar}from"node:path";var Ps="CC Safety Net Config",Cc="═".repeat(Ps.length),Pc="https://local/cc-safety-net/assets/cc-safety-net.schema.json",Ec=new Set(["rule.json","rule.lock","cache"]);function Es(_,H={}){try{return $c(_,H)}catch(Y){if(Y instanceof r)return console.error(Y.message),1;throw Y}}function $c(_,H){let Y=H.cwd??process.cwd(),oe=z(_,{cwd:Y}),ce=Xt(_),fe=Er(Y),ge=ar(Y,ae),we=o(oe.userScope,ce),Se=o(oe.projectScope,fe),Pe=!1,qe=!1,Ke=[],Je=[],lt=Ac(o(oe.projectScope,ge));if(jc(),n(oe.userConfigTarget)!==null){let Ee=Pt(oe.userConfigTarget);if(Ee.errors.push(...N(oe.userConfigPath,oe.userScope)),Ke.push({scope:"User",path:oe.userConfigPath,result:Ee,schema:"rules",target:oe.userConfigTarget}),Ee.errors.length>0)Pe=!0}if(n(we)!==null)if(qe=!0,n(oe.userConfigTarget)!==null)Je.push(xn("user","cleanup"));else{let Ee=_n(we);if(Ke.push({scope:"User",path:ce,result:Ee,schema:"legacy",inactive:!0,target:we}),Je.push(xn("user",Ee.errors.length>0?"fix-or-delete":"migrate")),Ee.errors.length>0)Pe=!0}if(n(oe.projectConfigTarget)!==null){let Ee=Pt(oe.projectConfigTarget);if(Ee.errors.push(...N(oe.projectConfigPath,oe.projectScope)),Ke.push({scope:"Project",path:ar(oe.projectConfigPath),result:Ee,schema:"rules",target:oe.projectConfigTarget}),Ee.errors.length>0)Pe=!0;if(n(Se)!==null)qe=!0,Je.push(xn("project","cleanup"))}else if(n(Se)!==null){qe=!0,Pe=!0;let Ee=_n(Se);Ke.push({scope:"Project",path:ar(fe),result:Ee,schema:"legacy",inactive:!0,target:Se}),Je.push(xn("project",Ee.errors.length>0?"fix-or-delete":"migrate"))}if(lt?.result.errors.length)Pe=!0;if(Ke.length===0&&!lt)return console.log(`
No config files found. Using built-in rules only.`),0;for(let Ee of Ke)if(Ee.inactive)Fc(Ee.scope,Ee.path,Ee.result);else if(Ee.result.errors.length>0)Oc(Ee.scope,Ee.path,Ee.result.errors);else{if(Ee.schema==="rules"&&Mc(Ee.target))console.log(`
Added $schema to ${Ee.scope.toLowerCase()} config.`);Tc(Ee.scope,Ee.path,Ee.result,Ee.schema)}for(let Ee of Je)console.error(`
${ct.red(Ee)}`);if(lt)if(lt.result.errors.length>0)Nc(lt.path,lt.result.errors);else Ic(lt.path,lt.result);if(Pe)return console.error(`
Config validation failed.`),1;return console.log(qe?`
Configs valid with warnings.`:`
All configs valid.`),0}function xn(_,H){let Y=`legacy ${_} config`;if(H==="cleanup")return`Warning: Legacy ${_} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(H==="migrate")return`Warning: Legacy ${_} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${_} config is no longer supported. Fix or delete the ${Y}, then run \`npx -y cc-safety-net rule migrate\`.`}function Ac(_){if(ie(_)===null)return null;let H=_c(_);if(H.ruleNames.size===0&&H.errors.length===0)return null;return{path:_.path,result:H}}function _c(_){let H=[],Y=new Set,oe=(ie(_)??[]).filter((ce)=>!Ec.has(ce.name)).sort((ce,fe)=>ce.name.localeCompare(fe.name));if(oe.length===0)return{errors:H,ruleNames:Y};for(let ce of oe){if(!c.test(ce.name)){H.push(`rulebook directory names must match ${c}: ${ce.name}`);continue}if(ce.kind!=="directory"){H.push(`${ce.name} must be a rulebook directory`);continue}let fe=o(_.scope,Dc(_.path,ce.name,"rulebook.json")),ge=n(fe);if(ge===null){H.push(`${ce.name}/rulebook.json is required`);continue}try{let we;try{we=JSON.parse(ge)}catch{H.push(`${ce.name}/rulebook.json: invalid JSON`);continue}let Se=te(we);if(Se.name!==ce.name){H.push(`rulebook name "${Se.name}" must match folder "${ce.name}"`);continue}let Pe=mn(Se);if(Pe.length>0){H.push(...Pe.map((qe)=>`${ce.name}/rulebook.json: ${qe}`));continue}Y.add(ce.name)}catch(we){H.push(we instanceof Error?`${ce.name}/rulebook.json: ${we.message}`:`${ce.name}/rulebook.json: ${String(we)}`)}}return{errors:H,ruleNames:Y}}function jc(){console.log(Ps),console.log(Cc)}function Tc(_,H,Y,oe){if(console.log(`
✓ ${_} config: ${H}`),console.log(`  Schema: ${oe==="rules"?"rulebook sources":"legacy inline rules"}`),Y.ruleNames.size>0){console.log(`  ${oe==="rules"?"Sources":"Rules"}:`);let ce=1;for(let fe of Y.ruleNames)console.log(`    ${ce}. ${fe}`),ce++}else console.log(`  ${oe==="rules"?"Sources":"Rules"}: (none)`)}function Fc(_,H,Y){if(console.error(`
✗ Legacy ${_.toLowerCase()} config: ${H}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),Y.errors.length>0){console.error("  Errors:");let oe=1;for(let ce of Y.errors)for(let fe of ce.split("; "))console.error(`    ${oe}. ${fe}`),oe++;return}if(Y.ruleNames.size>0){console.error("  Rules:");let oe=1;for(let ce of Y.ruleNames)console.error(`    ${oe}. ${ce}`),oe++;return}console.error("  Rules: (none)")}function Oc(_,H,Y){$s(`${_} config`,H,Y)}function Ic(_,H){console.log(`
✓ GitHub source rules: ${_}`),console.log("  Rulebooks:");let Y=1;for(let oe of H.ruleNames)console.log(`    ${Y}. ${oe}`),Y++}function Nc(_,H){$s("GitHub source rules",_,H)}function $s(_,H,Y){console.error(`
✗ ${_}: ${H}`),console.error("  Errors:");let oe=1;for(let ce of Y)for(let fe of ce.split("; "))console.error(`    ${oe}. ${fe}`),oe++}function Mc(_){try{let H=n(_);if(H===null)return!1;let Y=JSON.parse(H);if(Y.$schema)return!1;return p(_,JSON.stringify({$schema:Pc,...Y},null,2)),!0}catch(H){if(H instanceof r)throw H;return!1}}var As=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),qc=new Set(["add","remove","list"]),Uc="cc-safety-net/rulebooks";async function _s(_,H){try{return await Bc(_,H)}catch(Y){if(Y instanceof r)return console.error(Y.message),1;throw Y}}async function Bc(_,H){let Y=zc(H),oe=Y.help?Gc(Y.positionals):null;if(oe)return Ht(oe),0;if(Y.errors.length>0){for(let we of Y.errors)console.error(we);return 1}let ce=Y.positionals[0];if(!ce)return Ht(It,console.error),1;let fe=Y.positionals[1],ge={global:Y.global};if(ce==="init"){let we=bt(_,ge);Yc(we.configTarget);let Se=Hc(we.configDir,"example-rules","rulebook.json"),Pe=o(we.filesystemScope,Se);if(Y.example&&n(Pe)===null)rs(Pe);let qe=N(we.configPath,we.filesystemScope);for(let Ke of qe)console.error(Ke);if(qe.length>0)return 1;return console.log("Rule config initialized."),0}if(ce==="add"){let we=js(Y);if(!we)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let Se=bt(_,ge),Pe=await ws(_,we,{...ge,ref:Y.ref,rulebooks:Y.only.length>0?Y.only:void 0});return Xo(Pe,we,`Scope: ${Y.global?"user":"project"} (${Se.configDir})`),Pe.ok?0:1}if(ce==="remove"){if(!fe)return console.error("rule remove requires a source"),1;let we=await xs(_,fe,{...ge,deleteSource:Y.deleteSource});return fn(we,`Removed rulebook source: ${fe}`),we.ok?0:1}if(ce==="update"){let we=await Ln(_,{...ge,only:fe,refresh:!0});return fn(we,"Rule config updated."),we.ok?0:1}if(ce==="sync")return to(_,{global:Y.global});if(ce==="list"){let we=V(_,{cwd:process.cwd()});return es(we),we.errors.length>0?1:0}if(ce==="wrapper")return Kc(_,Y);if(ce==="migrate")return Cs(_,{cleanup:Y.cleanup,cwd:process.cwd()});if(ce==="doc")return console.log(Ko(_)),0;if(ce==="verify")return Es(_);return 1}function Gc(_){if(_.length===0)return It;let H=It.subcommands.filter((oe)=>oe.usage.split(" ")[0]===_[0]);if(H.length===0)return null;if(_.length===1&&H.length>1)return{name:`rule ${_[0]}`,description:`Subcommands of rule ${_[0]}`,usage:`rule ${_[0]} <subcommand>`,subcommands:H,options:[]};let Y=_.length===1?H[0]:H.find((oe)=>oe.usage.split(" ")[1]===_[1]);if(!Y)return null;return{name:`rule ${_[0]}`,description:Y.description,usage:`rule ${Y.usage}`,options:_[0]==="add"?Pn:[],examples:_[0]==="add"?En:void 0}}function zc(_){let H=yt({label:"rule",booleans:{global:["-g","--global"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},_),Y={...H.flags,ref:H.values.ref,only:H.lists.only??[],help:H.help,positionals:H.positionals,errors:H.errors};return Vc(Y),Y}function Vc(_){let[H]=_.positionals;if(H&&!As.has(H))_.errors.push(`Unknown rule subcommand: ${H}`);if(_.deleteSource&&H!=="remove")if(H&&As.has(H))_.errors.push(`Unknown option for rule ${H}: --delete-source`);else _.errors.push("--delete-source is only valid with 'rule remove'");if(_.cleanup&&H!=="migrate")_.errors.push(Jt(H,"--cleanup"));if(_.example&&H!=="init")_.errors.push(Jt(H,"--example"));if(_.ref&&H!=="add")_.errors.push(Jt(H,"--ref"));if(_.only.length>0&&H!=="add")_.errors.push(Jt(H,"--only"));if(H==="add")Jc(_);if(H==="migrate"){if(_.global)_.errors.push(Jt(H,"--global"));if(_.positionals.length>1)_.errors.push(`Unexpected rule migrate argument: ${_.positionals[1]}`)}else if(H==="wrapper")Wc(_);else if(_.positionals.length>2)_.errors.push(`Unexpected rule argument: ${_.positionals[2]}`);if(H==="list"&&_.global)_.errors.push("Unknown option for rule list: --global")}function js(_){if(_.positionals[1])return _.positionals[1];if(_.ref||_.only.length>0)return Uc;return}function Jc(_){let H=js(_);if(!H)return;if((_.ref||_.only.length>0)&&!B(H)){if(_.ref)_.errors.push(`--ref can only select a ref for an owner/repo source: ${H}`);if(_.only.length>0)_.errors.push("--only can only select rulebooks from an owner/repo source");return}if(_.ref&&!Q(_.ref))_.errors.push(`--ref must use valid path segments: ${_.ref}`);let Y=_.only.filter((oe)=>!c.test(oe));if(Y.length>0)_.errors.push(`Invalid rulebook names: ${Y.join(", ")}`)}function Jt(_,H){return _?`Unknown option for rule ${_}: ${H}`:`Unknown option for rule: ${H}`}function Wc(_){let H=_.positionals[1],Y=_.positionals[2];if(!H){_.errors.push("rule wrapper requires add, remove, or list");return}if(!qc.has(H)){_.errors.push(`Unknown rule wrapper action: ${H}`);return}if(H==="list"){if(Y)_.errors.push(`Unexpected rule wrapper argument: ${Y}`);return}if(!Y){_.errors.push(`rule wrapper ${H} requires a command`);return}if(_.positionals.length>3)_.errors.push(`Unexpected rule wrapper argument: ${_.positionals[3]}`)}function Yc(_){if(n(_)===null){ns(_);return}let H=d(_);if(!H.config)return;vt(_,{version:1,rules:H.config.rules,overrides:H.config.overrides??{},transparent_wrappers:H.config.transparent_wrappers??[]})}async function Kc(_,H){let Y=H.positionals[1],oe=H.positionals[2],ce=bt(_,{global:H.global}).configTarget;if(Y==="list"){let Se=d(ce);if(Se.errors.length>0){for(let Pe of Se.errors)console.error(Pe);return 1}return Zc(Se.config?.transparent_wrappers??[]),0}if(!oe||!w.test(oe))return console.error("transparent wrapper must match command pattern"),1;if(Le(oe))return console.error(`reserved command "${oe}" cannot be a wrapper`),1;let fe=d(ce);if(fe.errors.length>0){for(let Se of fe.errors)console.error(Se);return 1}let ge=fe.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},we=Y==="add"?[...new Set([...ge.transparent_wrappers??[],oe])]:(ge.transparent_wrappers??[]).filter((Se)=>Se!==oe);return vt(ce,{version:1,rules:ge.rules,overrides:ge.overrides??{},transparent_wrappers:we}),console.log(Y==="add"?`Added transparent wrapper: ${oe}`:`Removed transparent wrapper: ${oe}`),0}function Zc(_){if(_.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${_.length}):`);for(let H of _)console.log(`  - ${H}`)}import{sep as Xc}from"node:path";function Ts(_){let H=k(_,{cwd:process.cwd()}),Y=H.policy,oe=I(Y,_.env),ce=!!process.env.NO_COLOR||!process.stdout.isTTY,fe=Math.min(process.stdout.columns||80,100),ge=ce?"ok":"✔",we=ce?"OFF":"✘",Se=(st,at)=>{let nt=`  ${st.padEnd(13)}${at}`;return(nt.length>fe?`${nt.slice(0,fe-1)}…`:nt).replaceAll(we,ct.red(we))},Pe=Object.values(ne(Y,oe.capabilities)).some((st)=>st.changesInherited),qe=(st)=>st===_.home||st.startsWith(`${_.home}${Xc}`)?`~${st.slice(_.home.length)}`:st,Ke={ready:ct.green,degraded:ct.yellow}[H.state],Je=H.policyScopes?.weakenings??[],lt=[...H.diagnostics],Ee=ce?"-":"·";console.log([`${ce?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Ke(H.state)}`,"",Se("Protection",`destructive ${Y.destructiveCommandProtectionEnabled?ge:we}   secrets ${Y.secretProtection.enabled?ge:we}`),Se("Level",Pe?`${oe.effectiveLevel} (customised)`:oe.effectiveLevel),Se("Rules",Y.rules.length===0?"none active":`${Y.rules.length} active`),Se("Policy",qe(u(_))),...H.policyScopes?[Se("Project",qe(g(process.cwd())))]:[],...oe.worktreeMode?[Se("Worktree","relaxations active")]:[],"",...Je.length===0?[]:["  Project policy",...Je.flatMap((st)=>qt(st,"      ",fe-6).map((at,nt)=>nt===0?`    ${at}`:at)),""],...lt.length===0?["  Everything configured is active."]:["  Not active",...lt.flatMap((st)=>qt(st,"      ",fe-6).map((at,nt)=>nt===0?`    ${Ee} ${at}`:at)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as ld}from"node:child_process";import{randomBytes as cd}from"node:crypto";import{existsSync as dd}from"node:fs";import{createServer as ud}from"node:http";var kn=500;function Qc(_){let H=_.filter((ce)=>ce.decision!=="allow"),Y=_.filter((ce)=>ce.decision==="allow"),oe=Math.min(H.length,Math.max(kn-Y.length,Math.ceil(kn/2)));return[...H.slice(0,oe),...Y.slice(0,kn-oe)]}function Fs(_,H,Y=D(_)){if(Y)W(_,Y);let oe=(at)=>new Date(at.getFullYear(),at.getMonth(),at.getDate()).getTime(),ce=oe(new Date),fe=new Date(ce);fe.setDate(fe.getDate()-(H-1));let ge=fe.getTime(),we=[],Se={count:0};for(let at of Y?$t(Y,Se):[])for(let nt of Ot(at,Se)){let ut=new Date(nt.ts).getTime();if(!Number.isFinite(ut))continue;if(ut>=ge)we.push(nt)}we.sort((at,nt)=>new Date(nt.ts).getTime()-new Date(at.ts).getTime());let Pe=Array.from({length:H},()=>0),qe=Array.from({length:H},()=>0),Ke={},Je={},lt={},Ee=0,st=0;for(let at of we){let nt=at.agent||"unknown";Ke[nt]=(Ke[nt]??0)+1;let ut=Math.round((ce-oe(new Date(at.ts)))/86400000),pt=H-1-ut,mt=ut>=0&&ut<H;if(mt)qe[pt]=(qe[pt]??0)+1;if(at.decision!=="allow"){if(Ee++,at.ruleId)Je[at.ruleId]=(Je[at.ruleId]??0)+1;let dt=Cn(at.segment||at.command);if(dt)lt[dt]=(lt[dt]??0)+1;if(at.failureStage)st++;if(mt)Pe[pt]=(Pe[pt]??0)+1}}return{days:H,logsDir:Y,homeDir:_.home,totalInWindow:we.length,truncated:we.length>kn,unreadable:Se.count,counts:{blocked:Ee,allowed:we.length-Ee,agents:Ke,blockedByDay:Pe,analyzedByDay:qe,rules:Je,commands:lt,errors:st},entries:Qc(we).sort((at,nt)=>new Date(nt.ts).getTime()-new Date(at.ts).getTime())}}import{spawn as ed}from"node:child_process";import{existsSync as td,statSync as Os}from"node:fs";import{delimiter as nd,join as rd}from"node:path";var od=120000,Sn="Choose the project folder",sd=`try
  return POSIX path of (choose folder with prompt "${Sn}")
on error number -128
  return ""
end try`,id=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Sn}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Is=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Sn}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Sn]}],Ns=(_,H)=>(H.PATH??"").split(nd).some((Y)=>{if(Y.length===0)return!1;try{let oe=Os(rd(Y,_));return oe.isFile()&&(oe.mode&73)!==0}catch{return!1}});function lr(_,H){if(_==="darwin"||_==="win32")return!0;if(_!=="linux")return!1;if(!H.DISPLAY&&!H.WAYLAND_DISPLAY)return!1;return Is.some((Y)=>Ns(Y.binary,H))}function ad(_,H){if(_==="darwin")return{cmd:"osascript",args:["-e",sd]};if(_==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",id]};let Y=Is.find((oe)=>Ns(oe.binary,H));return Y?{cmd:Y.binary,args:Y.args}:null}function cr(_=process.platform,H=process.env){let Y=ad(_,H);if(!Y)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((oe)=>{let ce=ed(Y.cmd,Y.args,{env:H,stdio:["ignore","pipe","pipe"]}),fe="",ge=!1,we=(Pe)=>{if(ge)return;ge=!0,clearTimeout(Se),oe(Pe)},Se=setTimeout(()=>{ce.kill(),we({error:"The folder dialog timed out"})},od);ce.stdout.on("data",(Pe)=>{fe+=Pe.toString()}),ce.on("error",()=>we({error:`Could not open the folder dialog (${Y.cmd})`})),ce.on("close",()=>{let Pe=fe.trim().replace(/\/+$/,"");if(!Pe)return we({cancelled:!0});if(!td(Pe)||!Os(Pe).isDirectory())return we({error:"That selection is not a folder on disk"});we({path:Pe})})})}var Ms=`<!doctype html>
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
`;var Hs='<script id="ccsn-data" type="application/json">';function qs(_){return Ms.replace(Hs,()=>Hs+JSON.stringify({token:_}).replaceAll("<","\\u003c"))}var pd=7,fd="The project draft directory changed; reload the draft before applying.",md="audit settings are user scope only; remove the audit section from a project proposal";async function Gs(_,H={}){let Y=yt({label:"gui",booleans:{noOpen:["--no-open"]}},_),oe=H.log??console.log,ce=H.error??console.error;if(Y.errors.length>0){for(let ge of Y.errors)ce(ge);return ce("Usage: cc-safety-net gui [--no-open]"),1}let fe=await gd(l,H);if(oe(`CC Safety Net policy GUI: ${fe.url}`),!Y.flags.noOpen)try{await(H.openBrowser??Dd)(fe.url)}catch(ge){ce(`Failed to open browser: ${ge instanceof Error?ge.message:String(ge)}`),ce(`Open this URL manually: ${fe.url}`)}if(H.keepAlive===!1)return await fe.close(),0;return await Rd(fe),0}async function gd(_,H={}){let Y=cd(24).toString("base64url"),oe={dir:null,revision:0},ce=ud((we,Se)=>{hd(_,we,Se,Y,H,oe)});await new Promise((we,Se)=>{ce.once("error",Se),ce.listen(0,"127.0.0.1",()=>{ce.off("error",Se),we()})});let ge=`http://127.0.0.1:${ce.address().port}`;return{origin:ge,token:Y,url:`${ge}/?token=${encodeURIComponent(Y)}`,close:()=>Sd(ce)}}async function hd(_,H,Y,oe,ce,fe){let ge=_(),we=new URL(H.url??"/","http://127.0.0.1");if(H.method==="GET"&&we.pathname==="/favicon.ico"){Y.writeHead(204,{"cache-control":"no-store"}),Y.end();return}if(!wd(H,we,oe)){ft(Y,403,{error:"Forbidden"});return}if(H.method==="GET"&&we.pathname==="/"){kd(Y,qs(oe));return}if(H.method==="GET"&&we.pathname==="/api/policy"){let Se=Bo(ge,ce),Pe=k(ge,dr(ce));ft(Y,200,{...Se,configState:De(Pe),...Pe.policyScopes?{projectPolicy:{path:g(ce.cwd??process.cwd()),weakenings:Pe.policyScopes.weakenings}}:{},destructiveCommandRules:j,secretPatterns:ze,version:Nt(),preview:Se.errors.length>0?null:_e(Se.policy,ge.env)});return}if(H.method==="POST"&&we.pathname==="/api/policy/preview"){let Se=await Rn(H);if(!Se.ok){ft(Y,Se.status,{errors:[Se.error]});return}let Pe=Go(ge,Se.value);ft(Y,Pe.errors.length>0?400:200,Pe);return}if(H.method==="POST"&&we.pathname==="/api/policy/explain"){let Se=await Rn(H);if(!Se.ok){ft(Y,Se.status,{errors:[Se.error]});return}let Pe=Se.value;if(Pe===null||typeof Pe.command!=="string"){ft(Y,400,{errors:["command must be a string"]});return}let qe=Bt(Pe.policy,ge.home);if(qe.length>0){ft(Y,400,{errors:qe});return}ft(Y,200,bd(ge,Pe.command,Pe.policy,ce));return}if(H.method==="POST"&&we.pathname==="/api/policy"){let Se=await Rn(H);if(!Se.ok){ft(Y,Se.status,{errors:[Se.error]});return}let Pe=Rt(ge,Se.value,ce);ft(Y,Pe.errors.length>0?400:200,Pe);return}if(H.method==="POST"&&we.pathname==="/api/reset"){ft(Y,200,Rt(ge,K,ce));return}if(H.method==="POST"&&we.pathname==="/api/repair"){ft(Y,200,zo(ge,ce));return}if(H.method==="POST"&&we.pathname==="/api/policy/project/choose-directory"){let Se=await(ce.chooseDirectory??cr)();if("path"in Se)fe.dir=Se.path,fe.revision+=1;ft(Y,200,{cancelled:"cancelled"in Se,..."error"in Se?{error:Se.error}:{}});return}if(H.method==="GET"&&we.pathname==="/api/policy/project"){let Se=zs(fe,ce),Pe=Us(Se,ge.home),qe=Gt(ge,ce);ft(Y,200,{path:g(Se),revision:fe.revision,baseline:qe.baseline,userPolicyDiagnostics:qe.diagnostics,projection:Pe.projection,projectionDiagnostics:Pe.diagnostics,canPickDirectory:lr(process.platform,process.env)});return}if(H.method==="POST"&&we.pathname==="/api/policy/project/diff"){let Se=await Bs(ge,H,Y,fe,ce);if(!Se)return;let Pe=Us(Se.dir,ge.home),qe=Gt(ge,ce).baseline,Ke=q(qe,re(Se.proposal,ge.home).policy);ft(Y,200,{rows:un(q(qe,Pe.projection).policy,Ke.policy,!1),weakenings:Ke.weakenings,existingFileDiagnostics:Pe.diagnostics});return}if(H.method==="POST"&&we.pathname==="/api/policy/project/apply"){let Se=await Bs(ge,H,Y,fe,ce);if(!Se)return;let Pe=vd(Se.dir,Se.proposal,ge.home);ft(Y,Pe.errors.length>0?500:200,Pe);return}if(H.method==="GET"&&we.pathname==="/api/activity"){let Se=Z(ge,ce),Pe=Ld(we.searchParams.get("days"),Se);if(Pe===null){ft(Y,400,{error:`days must be an integer between 1 and ${Se}`});return}ft(Y,200,Fs(ge,Pe,ce.activityLogsDir));return}if(H.method==="POST"&&we.pathname==="/api/rules/choose-directory"){ft(Y,200,await cr());return}if(H.method==="GET"&&we.pathname==="/api/rules"){let Se=V(ge,dr(ce)),Pe=new Map(Se.rules.map((qe)=>[qe.name,qe]));ft(Y,200,{projectPath:ce.cwd??process.cwd(),canPickDirectory:lr(process.platform,process.env),rulebooks:Se.rulebooks.map((qe)=>({source:qe.source,spec:qe.spec,name:qe.name,version:qe.version,rules:qe.rules.flatMap((Ke)=>{let Je=Pe.get(Ke);if(!Je)return[];return[{name:Je.name,command:Je.command,subcommand:Je.subcommand,block_args:Je.block_args,reason:Je.reason}]})})),errors:Se.errors,warnings:Se.warnings});return}if(H.method==="GET"&&we.pathname==="/api/star/context"){ft(Y,200,await(ce.fetchStarContext??(()=>$d(ge,{logsDir:ce.activityLogsDir})))());return}if(H.method==="GET"&&we.pathname==="/api/integrations"){ft(Y,200,await(ce.fetchIntegrations??(()=>Cd(ge)))());return}if(H.method==="GET"&&we.pathname==="/api/health"){ft(Y,200,await(ce.fetchHealth??Ed)());return}ft(Y,404,{error:"Not found"})}function dr(_){return{..._,cwd:_.cwd??process.cwd()}}function zs(_,H){return _.dir??H.cwd??process.cwd()}function Us(_,H){let Y=g(_),oe=dd(Y)?Tt(Y):{value:void 0,errors:[]},ce=re(oe.value,H);return{projection:ce.policy,diagnostics:[...oe.errors,...ce.diagnostics]}}async function Bs(_,H,Y,oe,ce){let fe=zs(oe,ce),ge=oe.revision,we=await Rn(H);if(!we.ok)return ft(Y,we.status,{errors:[we.error]}),null;let Se=we.value;if(typeof Se?.revision!=="number")return ft(Y,400,{errors:["revision must be a number"]}),null;if(Se.revision!==ge)return ft(Y,409,{errors:[fd]}),null;let Pe=yd(Se.proposal,_.home);if(Pe.length>0)return ft(Y,400,{errors:Pe}),null;return{dir:fe,proposal:Se.proposal}}function yd(_,H){let Y=Bt(_,H);if(Y.length>0)return Y;return _?.audit===void 0?[]:[md]}function vd(_,H,Y){let oe=g(_),ce=pn(H,R(H,Y));try{return p(o(b(_,"project policy"),oe),`${JSON.stringify(ce,null,2)}
`),{path:oe,errors:[]}}catch(fe){return{path:oe,errors:[fe instanceof Error?fe.message:String(fe)]}}}function bd(_,H,Y,oe){let ce=R(Y,_.home),fe=k(_,dr(oe)),ge=ve({rules:fe.policy.rules,transparentWrappers:fe.policy.transparentWrappers,safety:Ie(ce.safety),worktreeMode:ce.workflow.worktree_mode,destructiveCommandProtectionEnabled:ce.destructive_command_protection.enabled,destructiveCommandRuleOverrides:ce.destructive_command_protection.overrides,destructiveCommandAllowPaths:ce.destructive_command_protection.allow_paths,secretProtection:{enabled:ce.secret_protection.enabled,disabledRules:Ae(ce.secret_protection.overrides),denyPaths:ce.secret_protection.deny_paths,allowPaths:ce.secret_protection.allow_paths}});return Ut(H,{policySnapshot:ge,cwd:oe.cwd,userConfigDir:oe.userConfigDir},_)}function Ld(_,H){if(_===null)return Math.min(pd,H);let Y=Number(_);if(!Number.isInteger(Y)||Y<1||Y>H)return null;return Y}function wd(_,H,Y){if(H.searchParams.get("token")!==Y)return!1;if(_.method!=="POST")return!0;return _.headers["x-cc-safety-net-token"]===Y}var xd=1048576;async function Rn(_){let H=[],Y=0;for await(let oe of _){let ce=oe;if(Y+=ce.byteLength,Y>xd)return{ok:!1,status:413,error:"Request body is too large"};H.push(ce)}try{return{ok:!0,value:JSON.parse(Buffer.concat(H).toString("utf-8")||"{}")}}catch(oe){return{ok:!1,status:400,error:`Invalid JSON: ${oe instanceof Error?oe.message:String(oe)}`}}}function kd(_,H){_.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),_.end(H)}function ft(_,H,Y){_.writeHead(H,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),_.end(JSON.stringify(Y))}function Sd(_){return new Promise((H,Y)=>{_.close((oe)=>oe?Y(oe):H())})}function Rd(_){return new Promise((H)=>{let Y=()=>{process.off("SIGINT",oe),process.off("SIGTERM",oe)},oe=()=>{Y(),_.close().then(H)};process.once("SIGINT",oe),process.once("SIGTERM",oe)})}function Dd(_){let H=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",Y=process.platform==="win32"?["/c","start","",_]:[_];return new Promise((oe,ce)=>{let fe=ld(H,Y,{detached:!0,stdio:"ignore"}),ge=(Se)=>{fe.off("spawn",we),ce(Se)},we=()=>{fe.off("error",ge),fe.unref(),oe()};fe.once("error",ge),fe.once("spawn",we)})}async function Cd(_,H={}){let Y=await on((ce)=>Mt({environment:_,cwd:process.cwd(),openCodeVersion:ce}).status!=="n/a",H.fetcher),oe=Pd(_,Y);return{targets:en.map((ce)=>{let fe=oe.find((ge)=>ge.platform===ce.id);return{target:ce.id,label:Et(ce.id),version:Y.versions[ce.id]??null,status:fe?.configured?"active":fe?.detected?"disabled":fe?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:Y.version,nodeVersion:Y.nodeVersion,platform:Y.platform}}}function Pd(_,H){return cn(_,process.cwd(),{openCodeVersion:H.versions.opencode,openCodePluginListOutput:H.openCodePluginListOutput})}async function Ed(_={}){let H=await(_.checkUpdates??sn)();return{update:{latestVersion:H.latestVersion??null,updateAvailable:H.updateAvailable}}}function $d(_,H={}){return Promise.resolve({starred:!0,starCount:null,blockedTotal:Zt(_,Z(_),H.logsDir).totalBlocked})}function Ad(_){if(_[0]!=="help")return!1;let H=_[1];if(!H)Zn(),process.exit(0);if(Xn(H))process.exit(0);console.error(`Unknown command: ${H}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var _d={rule:async(_)=>{process.exit(await _s(l(),_))},policy:async(_)=>{process.exit(await Yo(l(),_))},status:async(_)=>{if(Ct(yt({label:"status"},_).errors))process.exit(1);Ts(l())},doctor:async(_)=>{let H=Bn(_);if(!H)process.exit(1);let Y=await So(l(),{json:H.json,skipUpdateCheck:H.skipUpdateCheck});process.exit(Y)},logs:async(_)=>{process.exit(await vr(l(),_))},gui:async(_)=>{process.exit(await Gs(_))},explain:async(_)=>{process.exit(await Fo(l(),_))}};async function jd(_){let H=yt({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},_);if(Ad(_))return;let Y=_[0],oe=Y?Kt(Y):void 0;if(H.help&&oe&&oe.name!=="rule")Xn(oe.name),process.exit(0);if(!Y||H.help&&!oe)Zn(),process.exit(0);if(H.flags.version)No(),process.exit(0);if(oe){await _d[oe.name](_.slice(1));return}console.error(Y.startsWith("-")?`Unknown option: ${Y}`:`Unknown command: ${Y}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{jd as runCli};
