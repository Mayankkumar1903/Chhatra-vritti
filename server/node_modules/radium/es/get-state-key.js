var getStateKey = function getStateKey(renderedElement) {
  return typeof renderedElement.ref === 'string' ? renderedElement.ref : renderedElement.key;
};

export default getStateKey;