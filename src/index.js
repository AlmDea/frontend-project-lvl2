import { readFileSync } from 'fs';

export default (filepath1, filepath2) => {
  // const data = readFileSync(path, 'utf-8');
  // const dataParse = JSON.parse(data);

  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  console.log(data1);
  console.log(data2);
};
