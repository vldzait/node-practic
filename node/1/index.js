const fs = require('fs');

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

fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const obj = JSON.parse(data);
        tree(obj, 0);
    }
});

  
  
  