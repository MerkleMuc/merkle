const fs=require('fs'),path=require('path');
function jpegSize(b){let i=2;while(i<b.length){if(b[i]!==0xFF){i++;continue;}const m=b[i+1];if(m>=0xC0&&m<=0xCF&&m!==0xC4&&m!==0xC8&&m!==0xCC){return[b.readUInt16BE(i+7),b.readUInt16BE(i+5)];}i+=2+b.readUInt16BE(i+2);}return null;}
function pngSize(b){return[b.readUInt32BE(16),b.readUInt32BE(20)];}
const dir=process.argv[2]||'site/assets/img';
const rows=[];
for(const f of fs.readdirSync(dir)){
  const p=path.join(dir,f);const b=fs.readFileSync(p);let d=null;
  try{ if(b[0]===0xFF&&b[1]===0xD8) d=jpegSize(b); else if(b.slice(1,4).toString()==='PNG') d=pngSize(b);}catch(e){}
  rows.push([f,d?d[0]:'?',d?d[1]:'?',b.length]);
}
rows.sort((a,b)=>b[3]-a[3]);
for(const r of rows) console.log(String(r[1]).padStart(5)+'x'+String(r[2]).padEnd(6)+String(Math.round(r[3]/1024)).padStart(6)+'kB  '+r[0]);
