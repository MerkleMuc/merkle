const fs=require('fs'),path=require('path');
const dir='_bestand';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html'));
let out='';
for(const f of files){
  let h=fs.readFileSync(path.join(dir,f),'utf8');
  const title=(h.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'';
  const desc=(h.match(/<meta name="description" content="([\s\S]*?)"/)||[])[1]||'';
  const canon=(h.match(/<link rel="canonical" href="([^"]*)"/)||[])[1]||'';
  // strip scripts/styles/head
  let b=h.replace(/<head[\s\S]*?<\/head>/gi,'').replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<noscript[\s\S]*?<\/noscript>/gi,'');
  // capture headings & paragraphs & list items in order
  const parts=[];
  const re=/<(h1|h2|h3|h4|h5|p|li|td|th|a|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while((m=re.exec(b))){
    let t=m[2].replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#8211;/g,'–').replace(/&#8217;/g,'’').replace(/&quot;/g,'"').replace(/&#\d+;/g,m=>String.fromCharCode(m.match(/\d+/)[0])).replace(/\s+/g,' ').trim();
    if(t&&t.length>1) parts.push(m[1].toLowerCase()+': '+t);
  }
  // dedupe consecutive
  const seen=new Set(); const clean=parts.filter(p=>{if(seen.has(p))return false;seen.add(p);return true;});
  out+='\n\n========== '+f+' ==========\nTITLE: '+title+'\nDESC: '+desc+'\nCANON: '+canon+'\n'+clean.join('\n');
}
fs.writeFileSync('_bestand/CONTENT.txt',out);
console.log('bytes',out.length);
