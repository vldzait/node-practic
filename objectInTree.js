const startObject = [
  {
    "name": 1,
    "items": [
      {
        "name": 2,
        "items": [
          { "name": 3 }, 
          { "name": 4 }
        ]
      }, 
      {
        "name": 5,
        "items": [{ "name": 6 }]
      }
    ]
  }
];

function drawTree (obj, level = 0) {
  for (const item of obj) {
    let str = item.name;
    if (level > 0) {
      str = `|${level > 1 ? ' '.repeat(level) : ''}${level > 1 ? '└──' : '──'}` + str;
    }
    console.log(str);
    if (item?.items?.length > 0) {
      drawTree(item.items, level + 1);
    }
  }
}

drawTree(startObject);

