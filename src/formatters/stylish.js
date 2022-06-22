/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import _ from 'lodash';

const getIndent = (depth, isBracketIndent = false, spaceCount = 2) =>
  ' '.repeat(
    spaceCount * depth + spaceCount * (depth - 1) - (isBracketIndent ? 2 : 0)
  );

const buildObjectStr = (lines, depth) =>
  ['{', ...lines, `${getIndent(depth, true)}}`].join('\n');

const stringify = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) return currentValue;
  const lines = Object.entries(currentValue).map(
    ([key, value]) =>
      `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`
  );
  return buildObjectStr(lines, depth);
};

export default (data) => {
  const iter = (tree, depth = 1) =>
    tree.map((node) => {
      const indent = getIndent(depth);
      const depthOfValue = depth + 1;
      const { key, value } = node;
      const buildEntrieStr = (entrieVal, marker = ' ') =>
        `${indent}${marker} ${key}: ${entrieVal}`;
      switch (node.status) {
        case 'added':
          return buildEntrieStr(stringify(value, depthOfValue), '+');
        case 'removed':
          return buildEntrieStr(stringify(value, depthOfValue), '-');
        case 'nested':
          return buildEntrieStr(
            buildObjectStr(iter(node.children, depthOfValue), depthOfValue)
          );
        case 'updated':
          return [
            buildEntrieStr(stringify(node.oldValue, depthOfValue), '-'),
            buildEntrieStr(stringify(node.newValue, depthOfValue), '+'),
          ].join('\n');
        default:
          return buildEntrieStr(stringify(value, depthOfValue));
      }
    });

  return buildObjectStr(iter(data));
};
