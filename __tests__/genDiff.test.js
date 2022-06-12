import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('before.json');
const jsonFile2 = getFixturePath('after.json');

const yamlFile1 = getFixturePath('before.yml');
const yamlFile2 = getFixturePath('after.yaml');

const formatStylishCorrectLine = fs.readFileSync(
  getFixturePath('stylish.txt'),
  'utf-8'
);
const formatPlainCorrectLine = fs.readFileSync(
  getFixturePath('plain.txt'),
  'utf-8'
);
const formatJsonCorrectLine = fs.readFileSync(
  getFixturePath('json.txt'),
  'utf-8'
);

test('format stylish test', () => {
  expect(generateDiff(jsonFile1, jsonFile2)).toBe(formatStylishCorrectLine);
  expect(generateDiff(yamlFile1, yamlFile2)).toBe(formatStylishCorrectLine);
});

test('format plain test', () => {
  expect(generateDiff(jsonFile1, jsonFile2, 'plain')).toBe(
    formatPlainCorrectLine
  );
  expect(generateDiff(yamlFile1, yamlFile2, 'plain')).toBe(
    formatPlainCorrectLine
  );
});

test('format json test', () => {
  expect(generateDiff(jsonFile1, jsonFile2, 'json')).toBe(
    formatJsonCorrectLine
  );
  expect(generateDiff(yamlFile1, yamlFile2, 'json')).toBe(
    formatJsonCorrectLine
  );
});
