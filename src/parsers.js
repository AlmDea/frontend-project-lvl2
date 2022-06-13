import YAML from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: YAML.load,
  yml: YAML.load,
};

export default (fileData, dataFormat) => parsers[dataFormat](fileData);
