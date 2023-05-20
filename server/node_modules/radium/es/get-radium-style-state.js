var getRadiumStyleState = function getRadiumStyleState(component) {
  return component._lastRadiumState || component.state && component.state._radiumStyleState || {};
};

export default getRadiumStyleState;