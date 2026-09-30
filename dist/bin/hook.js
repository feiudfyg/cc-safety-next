#!/usr/bin/env node
async function n(){let i=await import("../cli.js");await i.runCli(process.argv.slice(2))}n().catch((i)=>{console.error("CC Safety Net error:",i),process.exit(1)});
