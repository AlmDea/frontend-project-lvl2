/* eslint-disable implicit-arrow-linebreak */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getPath('before.json');
const jsonFile2 = getPath('after.json');

const ymlFile1 = getPath('before.yml');
const ymlFile2 = getPath('after.yml');

const stylishFormat = readFileSync(getPath('stylish.txt'), 'utf-8');
const plainFormat = readFileSync(getPath('plain.txt'), 'utf-8');
const jsonFormat = readFileSync(getPath('json.txt'), 'utf-8');

test('format stylish test', () => {
  expect(generateDiff(jsonFile1, jsonFile2)).toBe(stylishFormat);
  expect(generateDiff(ymlFile1, ymlFile2)).toBe(stylishFormat);
});

test('format plain test', () => {
  expect(generateDiff(jsonFile1, jsonFile2, 'plain')).toBe(plainFormat);
  expect(generateDiff(ymlFile1, ymlFile2, 'plain')).toBe(plainFormat);
});

test('format json test', () => {
  expect(generateDiff(jsonFile1, jsonFile2, 'json')).toBe(jsonFormat);
  expect(generateDiff(ymlFile1, ymlFile2, 'json')).toBe(jsonFormat);
});
