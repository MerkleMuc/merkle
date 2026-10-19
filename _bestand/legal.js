const fs=require('fs');
function sliceBalanced(html,startIdx){
  // startIdx points at '<div'
  let i=startIdx,depth=0;
  const re=/<\/?div\b[^>]*>/gi; re.lastIndex=startIdx;
  let m;
  while((m=re.exec(html))){
    if(m[0][1]==='/'){depth--; if(depth===0) return html.slice(startIdx,m.index+m[0].length);}
    else if(!/\/>$/.test(m[0])) depth++;
  }
  return html.slice(startIdx);
}
const pages=['impressum','datenschutz','agb','ekb','nutzungsbedingungen'];
for(const p of pages){
  const h=fs.readFileSync('_bestand/'+p+'.html','utf8');
  const idx=h.indexOf('<div class="entry-content sidebar"');
  if(idx<0){console.log(p,'NOT FOUND');continue;}
  let block=sliceBalanced(h,idx);
  // keep only wpb_wrapper contents of text columns
  const parts=[];
  const re=/<div class="wpb_text_column wpb_content_element[^"]*"[^>]*>\s*<div class="wpb_wrapper">/g;
  let m;
  while((m=re.exec(block))){
    const s=m.index+m[0].length;
    // balanced from the wpb_wrapper open div: count from s
    let depth=1,j=s;
    const dre=/<\/?div\b[^>]*>/gi; dre.lastIndex=s;
    let dm;
    while((dm=dre.exec(block))){
      if(dm[0][1]==='/'){depth--; if(depth===0){parts.push(block.slice(s,dm.index));break;}}
      else depth++;
    }
  }
  fs.writeFileSync('_bestand/legal-'+p+'.html',parts.join('\n<!--BLOCK-->\n'));
  console.log(p, 'blocks:',parts.length,'bytes:',parts.join('').length);
}
