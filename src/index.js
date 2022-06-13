import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getDataFormat = (filePath) => path.extname(filePath).substring(1);

const getFormattedFile = (filePath) => {
  const fileData = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  const dataFormat = getDataFormat(filePath);
  const parsedData = parse(fileData, dataFormat);
  return parsedData;
};

const generateDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const parsedData1 = getFormattedFile(filePath1);
  const parsedData2 = getFormattedFile(filePath2);
  const getDifference = buildTree(parsedData1, parsedData2);
  return format(getDifference, formatName);
};

export default generateDiff;
