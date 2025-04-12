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

// const { pipeline } = require('node:stream/promises');
const { Transform, pipeline } = require('node:stream');
const fs = require('node:fs');

console.time('Finish');

const sourceFilePath = process.argv[2] ? process.argv[2] : '';
const resultFilePath = './files/result.txt';
const readStream = fs.createReadStream(sourceFilePath);
const writeStream = fs.createWriteStream(resultFilePath);

// удаляем из строки спец. символы
function replaceChunk (chunck) {
  const regx = /[^\w\s]/g;
  return chunck.replace(regx, '');
}

// считаем сколько раз встречается каждое слово
function countWords (row) {
  const countWordsObj = {};
  const wordsArr = row.split(/\s+/);

  for (const word of wordsArr) {
    if (word.length < 1) continue;
    if (!countWordsObj.hasOwnProperty(word)) {
      countWordsObj[word] = 0;
    }
    countWordsObj[word] += 1;
  }
  return countWordsObj;
}

// сортируем
function sortCountWords (countWordsObj) {
  const sortedWords = Object.keys(countWordsObj).sort();
  return sortedWords.map(word => countWordsObj[word]);
}

const wordCountStream = new Transform ({
  transform (chunck, encoding, callback) {
    chunck = replaceChunk(chunck.toString());
    const countWordsObj = countWords(chunck); 
    const resultArr = sortCountWords(countWordsObj);
    
    callback(null, JSON.stringify(resultArr));
  },
});



if (!sourceFilePath) {
  console.error('undefined file path');
  return 0;
}

readStream.pipe(wordCountStream).pipe(writeStream);


console.timeLog("Finish");
