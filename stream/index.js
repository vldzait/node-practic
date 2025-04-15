// Используйте модуль streams для программы простой индексации текста.
// Она должна:

// Читать текстовый файл переданный в аргументах к скрипту
// Разделять входные данные на отдельные слова, разделенные разделителем (пробел, символ новой строки)
// Фильтровать не-текстовые символы (например, ',')
// Индексировать текст в вектор - массив чисел. Позиция в массиве представляет порядок всех входных слов, отсортированных в алфавитном порядке. Значение - это количество появлений определенного слова в тексте.
// Вывести результирующий вектор в файл.
// Примеры:

// a c b b -> потенциальное промежуточное представление { a: 1, b: 2, c: 1 } -> [1, 2, 1]
// ab cb bss b -> [1, 1, 1, 1]
// ab, cb, bss, cb, b, cb -> [1, 1, 1, 3]
// alex, alex, juan, dima -> [2, 1, 1]

const { Transform, pipeline } = require('node:stream');
const fs = require('node:fs');

console.time('Finish');

const sourceFilePath = process.argv[2] ? process.argv[2] : '';
const resultFilePath = './files/result.txt';
if (!sourceFilePath) {
  console.error('Error: No input file specified');
  process.exit(1);
}
const readStream = fs.createReadStream(sourceFilePath);
const writeStream = fs.createWriteStream(resultFilePath);


// заполняем массив слов
const wordsArr = [];
const generateWordArrStream = new Transform ({
  transform (chunck, encoding, callback) {
    const regx = /[^\w\s]/g;
    chunck = chunck.toString().replace(regx, '');
    wordsArr.push(...chunck.split(/\s+/));

    callback();
  },flush(callback) {
    this.push(JSON.stringify(wordsArr));
    callback();
  }
});

// считаем частоту повторов
const countWordsObj = {};
const countWordReplayStream = new Transform ({
  transform (chunck, encoding, callback) {
    const wordsArr = JSON.parse(chunck.toString());
    for (const word of wordsArr) {
      if (word.length < 1) continue;
      if (!countWordsObj.hasOwnProperty(word)) {
        countWordsObj[word] = 0;
      }
      countWordsObj[word] += 1;
    }

    callback();
  },flush(callback) {
    this.push(JSON.stringify(countWordsObj));
    callback();
  }
});

// сортируем
let sortedWords = [];
const sortStream = new Transform ({
  transform (chunck, encoding, callback) {
    sortedWords = Object.keys(countWordsObj).sort().map(word => countWordsObj[word]);
    
    callback();
  },flush(callback) {
    this.push(JSON.stringify(sortedWords));
    callback();
  }
});

pipeline(
  readStream,
  generateWordArrStream,
  countWordReplayStream,
  sortStream,
  writeStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.timeLog('Finish');
      console.info('Processing completed');
    }
  }
);
