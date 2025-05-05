const dirTree = require('./tree');
const mock = require('mock-fs');

describe('draw folder structure', () => {
  // create mock folder
  beforeAll(async () => {
    await mock({
      'folder': {
        'file1.txt': '111',
        'subfolder1': {
          'file2.txt': '222',
          'file3.txt': '333',
          'subsubfolder': {
            'file4txt': '444',
          }
        },
        'subfolder2': {
          'file5.txt': '555',
          'file6.txt': '666',
        },
      },
    });
    console.log('before');
    
  });

  // delete mock folder
  afterAll(() => {
    mock.restore();
    console.log('after');
  });

  test('Draw when depth 0', () => {
    const spy = jest.spyOn(console, 'log');
    dirTree('folder', 0);
    expect(spy).toHaveBeenCalledWith('folder');
  })

  test('Draw when depth 1', () => {
    const spy = jest.spyOn(console, 'log');
    dirTree('folder', 1);
    expect(spy).toHaveBeenCalledWith('folder');
    expect(spy).toHaveBeenCalledWith('|──file1.txt');
    expect(spy).toHaveBeenCalledWith('|──subfolder1');
    expect(spy).toHaveBeenCalledWith('|──subfolder2');
  })

  test('Draw when depth 2', () => {
    const spy = jest.spyOn(console, 'log');
    dirTree('folder', 2);
    expect(spy).toHaveBeenCalledWith('folder');
    expect(spy).toHaveBeenCalledWith('|──file1.txt');
    expect(spy).toHaveBeenCalledWith('|──subfolder1');
    expect(spy).toHaveBeenCalledWith('| └──file2.txt');
    expect(spy).toHaveBeenCalledWith('| └──file3.txt');
    expect(spy).toHaveBeenCalledWith('| └──subsubfolder');
    expect(spy).toHaveBeenCalledWith('|──subfolder2');
    expect(spy).toHaveBeenCalledWith('| └──file5.txt');
    expect(spy).toHaveBeenCalledWith('| └──file6.txt');
  })
})

test('start function with incorrect file path', () => {
  const spy = jest.spyOn(console, 'log');
  dirTree('/1', 2);
  expect(spy).toHaveBeenCalledWith('Некорректный путь к папке');
});
