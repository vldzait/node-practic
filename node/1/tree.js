const fs = require('fs');
const path = require('path');


const dir = process.argv[2] ? process.argv[2] : '';
const depth =  process.argv[4] ? process.argv[4] : 0;

if (dir == '') {
    console.log('Некорректный путь к файлу');
    return 0;
}

function dirTree(dir, depth = 0, shift = 0) {
    if (shift == depth && depth != 0)
        return;
    let list = fs.readdirSync(dir),
        name;
    for (let item of list) {
        let str = shift === 0 ? 
            `|——${" ".repeat(shift)}${item}` :
            `|${" ".repeat(shift)}|__${item}`;
        console.log(str);
        if (fs.statSync(name = dir + "/" + item).isDirectory()) 
            dirTree(name, depth, shift + 1);
    }
}

dirTree(dir, depth);