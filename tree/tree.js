const fs = require('fs');
const dir = process.argv[2] ? process.argv[2] : '';
const maxDepth =  process.argv[4] >= 0? process.argv[4] : Infinity;

let folderCount = 0;
let fileCount = 0;

function dirTree (dir, maxDepth = 0, level = 0) {
  if (level === 0 && (dir === '' || !fs.existsSync(dir))) {
    console.log('Некорректный путь к папке');
    return 0;
  }

  const folder = fs.readdirSync(dir);
  if( level === 0) console.log(dir);

  if (level >= maxDepth) return 0;

  for (const item of folder) {
    const str = `|${level > 0 ? ' '.repeat(level) : ''}${level > 0 ? '└──' : '──'}${item}`;
    console.log(str);
    if (fs.statSync(`${dir}/${item}`).isDirectory()) {
      ++folderCount;
    } else {
      ++fileCount;
    }
    if (fs.statSync(`${dir}/${item}`).isDirectory()) {
      dirTree(`${dir}/${item}`, maxDepth, level + 1);
    }
  }  
}


dirTree (dir, maxDepth);
// console.log(`${folderCount} directories, ${fileCount} files`);

module.exports = dirTree;