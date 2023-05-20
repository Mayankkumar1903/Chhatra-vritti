import appendPxIfNeeded from './append-px-if-needed';
import mapObject from './map-object';

export default function appendImportantToEachValue(style) {
  return mapObject(style, function (result, key) {
    return appendPxIfNeeded(key, style[key]) + ' !important';
  });
}