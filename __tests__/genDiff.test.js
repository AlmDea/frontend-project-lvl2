/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

test.each([
  ['before.json', 'after.json', 'stylish', 'stylish.txt'],
  ['before.yml', 'after.yml', 'stylish', 'stylish.txt'],
  ['before.json', 'after.json', 'plain', 'plain.txt'],
  ['before.yml', 'after.yml', 'plain', 'plain.txt'],
  ['before.json', 'after.json', 'json', 'json.txt'],
  ['before.yml', 'after.yml', 'json', 'json.txt'],
])('Show difference', (file1, file2, format, expectedResult) => {
  const result = generateDiff(getPath(file1), getPath(file2), format);
  expect(result).toBe(readFile(`${expectedResult}`));
});

test('unknown format', () => {
  const file1 = getPath('before.json');
  const file2 = getPath('after.json');
  const error = new Error("Unknown format 'txt'.");
  expect(() => {
    generateDiff(file1, file2, 'txt');
  }).toThrow(error);
});
