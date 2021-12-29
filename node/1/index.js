let obj = [{
  name: 1,
  items: [
    { name: 2, items: [{ name: 3 }, { name: 4 }] },
    { name: 5, items: [{ name: 6 }] },
    { name: 7, items: [{ name: 8, items: [{ name: 9 }] }] },
  ],
}];

function tree (obj = [], str = 0,) {
  for (const iterator of obj) {
    check(iterator, str);
  }
}

function check (item , str = 0) {
  // console.log("_____________________________________");
  if(str === 0) console.log(`${item.name}`);
  if(str === 1) console.log(`|__${item.name}`);
  if(str > 1) {
    let char = '|';
    while (char.length < str) {
      char += '  ';
    }
    console.log(`${char}|__${item.name}`);
  }

  if (item.hasOwnProperty('items')) {
    tree(item.items, ++str);
  } else {
    return ;
  }
}

tree(obj);
