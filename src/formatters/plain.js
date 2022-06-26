/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};
const buildRemovedPropStr = (key) => `Property '${key}' was removed`;
const buildAddedPropStr = (key, value) =>
  `Property '${key}' was added with value: ${stringify(value)}`;
const buildUpdatedPropStr = (key, oldValue, newValue) =>
  `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(
    newValue
  )}`;

const buildDiffLines = (diff, parent = '') =>
  diff.map((node) => {
    const keyPath = parent ? `${parent}.${node.key}` : node.key;
    switch (node.status) {
      case 'added':
        return buildAddedPropStr(keyPath, node.value);
      case 'removed':
        return buildRemovedPropStr(keyPath);
      case 'updated':
        return buildUpdatedPropStr(keyPath, node.oldValue, node.newValue);
      case 'nested':
        return buildDiffLines(node.children, keyPath);
      default:
        return '';
    }
  });

export default (data) =>
  _.flattenDeep(buildDiffLines(data))
    .filter((line) => line)
    .join('\n');
