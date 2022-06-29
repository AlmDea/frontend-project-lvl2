/* eslint-disable function-paren-newline */
/* eslint-disable spaced-comment */
/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import generateDiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');
const result1 = readFile('stylish.txt').trim();
const result2 = readFile('plain.txt').trim();
const result3 = readFile('json.txt').trim();

const exts = ['.json', '.yml'];

test.each(exts)('testing gendiff for %s', (ext) => {
  const actual1 = generateDiff(
    getPath(`before${ext}`),
    getPath(`after${ext}`, 'stylish')
  );
  expect(actual1).toBe(result1);
  const actual2 = generateDiff(
    getPath(`before${ext}`),
    getPath(`after${ext}`),
    'plain'
  );
  expect(actual2).toBe(result2);
  const actual3 = generateDiff(
    getPath(`before${ext}`),
    getPath(`after${ext}`),
    'json'
  );
  expect(actual3).toBe(result3);
});

// const stylish = fs.readFileSync(getFixturePath('stylish.txt'), {
//   encoding: 'utf8',
// });
// const plain = fs.readFileSync(getFixturePath('plain.txt'), {
//   encoding: 'utf8',
// });

// const json = fs.readFileSync(getFixturePath('json.txt'), { encoding: 'utf8' });
// const result = { stylish, plain, json };

// const args = formatters.flatMap((format) =>
//   fileexts.map((fileext) => [fileext, format])
// );

// test.each(args)(
//   '%s type files difference with %s result',
//   (fileext, format) => {
//     const before = getFixturePath(`before.${fileext}`);
//     const after = getFixturePath(`after.${fileext}`);
//     expect(generateDiff(before, after, format)).toEqual(result[format]);
//   }
// );

//const getPath = (filename) =>
//path.join(__dirname, '..', '__fixtures__', filename);
//const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

// test.each([
//   ['before.json', 'after.json', 'stylish', 'stylish.txt'],
//   ['before.yml', 'after.yml', 'stylish', 'stylish.txt'],
//   ['before.json', 'after.json', 'plain', 'plain.txt'],
//   ['before.yml', 'after.yml', 'plain', 'plain.txt'],
//   ['before.json', 'after.json', 'json', 'json.txt'],
//   ['before.yml', 'after.yml', 'json', 'json.txt'],
// ])('Show difference', (before, after, format, expectedResult) => {
//   const result = generateDiff(getPath(before), getPath(after), format);
//   expect(result).toBe(readFile(`${expectedResult}`));
// });

// test('unknown format', () => {
//   const before = getPath('before.json');
//   const after = getPath('after.json');
//   const error = new Error("Unknown format 'txt'.");
//   expect(() => {
//     generateDiff(before, after, 'txt');
//   }).toThrow(error);
// });
