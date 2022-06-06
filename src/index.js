import { fs, readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import gendiff from './genDiffTree.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const extractFormat = (filepath) => path.extname(filepath).replace('.', '');

const genDiff = (filepath1, filepath2, formatName 'stylish') => {
  const extname1 = extractFormat(filepath1);
  const extname2 = extractFormat(filepath2);

  const data1 = readFile(filepath1, 'utf-8');
  const data2 = readFile(filepath2, 'utf-8');

  const parsedData1 = parser(data1, extname1);
  const parsedData2 = parser(data2, extname2);

  const diffTree = gendiff(parsedData1, parsedData2);
  return formatter(formatName)(diffTree);
};

export default genDiff;