import { readFileSync } from 'fs';

const data = readFileSync(path, 'utf-8');
const dataParse = JSON.parse(data);

console.log(dataParse);
