/* flow */

var cleanStateKey = function cleanStateKey(key) {
  return key === null || typeof key === 'undefined' ? 'main' : key.toString();
};

export default cleanStateKey;