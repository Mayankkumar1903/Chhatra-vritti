

import { getPrefixedStyle } from '../prefixer';

export default function prefixPlugin(_ref // eslint-disable-line no-shadow
) {
  var config = _ref.config,
      style = _ref.style;

  var newStyle = getPrefixedStyle(style, config.userAgent);
  return { style: newStyle };
}