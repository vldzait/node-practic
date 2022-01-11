const fs = require('fs');


fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const obj = JSON.parse(data);
        tree(obj, 0);
    }
});

// function tree (obj = [], str = 0,) {

//   for (const iterator of obj) {
//     check(iterator, str);
//   }
// }

// function check (item , str = 0) {
//   if(str === 0) console.log(`${item.name}`);
//   if(str === 1) console.log(`|__${item.name}`);
//   if(str > 1) {
//     let char = '|';
//     while (char.length < str) {
//       char += '  ';
//     }
//     console.log(`${char}|__${item.name}`);
//   }

//   if (item.hasOwnProperty('items')) {
//     tree(item.items, ++str);
//   } 
// }

function tree(obj, shift) {
  for (let item of obj) {
      let str = shift === 0 ? 
          `|——${"  ".repeat(shift)}${item.name}` :
          `|${"  ".repeat(shift)}|__${item.name}`;
      console.log(str);
      if (item.hasOwnProperty('items')) {
        tree(item.items, shift+1);
      } 
      
  }
}
  
  
  