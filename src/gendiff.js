import _ from 'lodash';

const gendiffTree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'added', key, val: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', key, children: gendiffTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated',
        key,
        val1: value1,
        val2: value2,
      };
    }
    return { type: 'original', key, val: value1 };
  });
};

export default gendiffTree;
