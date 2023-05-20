var _camelCaseRegex = /([a-z])?([A-Z])/g;

var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
  return (p1 || '') + '-' + p2.toLowerCase();
};

export var camelCaseToDashCase = function camelCaseToDashCase(s) {
  return s.replace(_camelCaseRegex, _camelCaseReplacer);
};

var camelCasePropsToDashCase = function camelCasePropsToDashCase(prefixedStyle) {
  // Since prefix is expected to work on inline style objects, we must
  // translate the keys to dash case for rendering to CSS.
  return Object.keys(prefixedStyle).reduce(function (result, key) {
    var dashCaseKey = camelCaseToDashCase(key);

    // Fix IE vendor prefix
    if (/^ms-/.test(dashCaseKey)) {
      dashCaseKey = '-' + dashCaseKey;
    }

    result[dashCaseKey] = prefixedStyle[key];
    return result;
  }, {});
};

export default camelCasePropsToDashCase;