import path from 'path';
import fs from 'fs';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

export default readFile;
