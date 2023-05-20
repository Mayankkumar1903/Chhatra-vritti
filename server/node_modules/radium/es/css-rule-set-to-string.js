import appendPxIfNeeded from './append-px-if-needed';
import camelCasePropsToDashCase from './camel-case-props-to-dash-case';
import mapObject from './map-object';
import { getPrefixedStyle } from './prefixer';

function createMarkupForStyles(style) {
  return Object.keys(style).map(function (property) {
    return property + ': ' + style[property] + ';';
  }).join('\n');
}

export default function cssRuleSetToString(selector, rules, userAgent) {
  if (!rules) {
    return '';
  }

  var rulesWithPx = mapObject(rules, function (value, key) {
    return appendPxIfNeeded(key, value);
  });
  var prefixedRules = getPrefixedStyle(rulesWithPx, userAgent);
  var cssPrefixedRules = camelCasePropsToDashCase(prefixedRules);
  var serializedRules = createMarkupForStyles(cssPrefixedRules);
  return selector + '{' + serializedRules + '}';
}