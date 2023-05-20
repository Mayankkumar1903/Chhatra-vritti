import cssRuleSetToString from './css-rule-set-to-string';
import hash from './hash';
import { getPrefixedKeyframes } from './prefixer';

export default function keyframes(keyframeRules, name) {
  return {
    __radiumKeyframes: true,
    __process: function __process(userAgent) {
      var keyframesPrefixed = getPrefixedKeyframes(userAgent);
      var rules = Object.keys(keyframeRules).map(function (percentage) {
        return cssRuleSetToString(percentage, keyframeRules[percentage], userAgent);
      }).join('\n');
      var animationName = (name ? name + '-' : '') + 'radium-animation-' + hash(rules);
      var css = '@' + keyframesPrefixed + ' ' + animationName + ' {\n' + rules + '\n}\n';
      return { css: css, animationName: animationName };
    }
  };
}