import cleanStateKey from './clean-state-key';

var getState = function getState(state, elementKey, value) {
  var key = cleanStateKey(elementKey);

  return !!state && !!state._radiumStyleState && !!state._radiumStyleState[key] && state._radiumStyleState[key][value];
};

export default getState;