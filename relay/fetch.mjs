import fs from 'node:fs'; import sharp from 'sharp';
const list=JSON.parse(fs.readFileSync('relay/list.json','utf8')); fs.mkdirSync('relay/out',{recursive:true}); const log=[];
for(const it of list){try{const r=await fetch(it.url);if(!r.ok)throw new Error('http '+r.status);const b=Buffer.from(await r.arrayBuffer());const m=await sharp(b).metadata();
 if(it.png){await sharp(b).resize({width:720,height:720,fit:'inside',withoutEnlargement:true}).png({compressionLevel:9}).toFile(`relay/out/${it.name}.png`);}else{await sharp(b).rotate().resize({width:it.w||1600,height:it.w||1600,fit:'inside',withoutEnlargement:true}).jpeg({quality:78,mozjpeg:true}).toFile(`relay/out/${it.name}.jpg`);}log.push(`${it.name} ok ${m.width}x${m.height} ${it.file}`);}catch(e){log.push(`${it.name} FAIL ${e.message} ${it.file}`);}}
fs.writeFileSync('relay/out/log.txt',log.join('\n')+'\n');console.log(log.join('\n'));
