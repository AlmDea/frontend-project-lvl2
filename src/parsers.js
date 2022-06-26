import yaml from 'js-yaml';

const getParse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Format ${format} is not supported.`);
  }
};

export default getParse;
