import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  return keys.map((key) => {
    if (!_.has(object1, key)) {
      return { key, status: 'added', value: object2[key] };
    }
    if (!_.has(object2, key)) {
      return { key, status: 'removed', value: object1[key] };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        key,
        status: 'nested',
        children: buildTree(object1[key], object2[key]),
      };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      return {
        key,
        status: 'updated',
        oldValue: object1[key],
        newValue: object2[key],
      };
    }
    return { key, status: 'original', value: object1[key] };
  });
};

export default buildTree;
