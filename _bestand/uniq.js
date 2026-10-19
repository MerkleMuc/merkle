const fs=require('fs');
const txt=fs.readFileSync('_bestand/CONTENT.txt','utf8');
const blocks=txt.split(/\n\n========== /).filter(Boolean);
const count={};
const parsed=blocks.map(b=>{const lines=b.split('\n');return {head:lines[0],lines:lines.slice(1)};});
for(const p of parsed){const s=new Set(p.lines);for(const l of s) count[l]=(count[l]||0)+1;}
let out='';
for(const p of parsed){
  out+='\n\n===== '+p.head+'\n'+p.lines.filter(l=>l.startsWith('TITLE')||l.startsWith('DESC')||l.startsWith('CANON')||(count[l]||0)<20).join('\n');
}
fs.writeFileSync('_bestand/UNIQUE.txt',out);
console.log('bytes',out.length);
