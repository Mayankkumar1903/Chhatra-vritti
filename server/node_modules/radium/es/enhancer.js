var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import PropTypes from 'prop-types';

import StyleKeeper from './style-keeper';
import resolveStyles from './resolve-styles';
import getRadiumStyleState from './get-radium-style-state';

var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];

var RADIUM_PROTO = void 0;
var RADIUM_METHODS = void 0;

function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  });
}

// Handle scenarios of:
// - Inherit from `React.Component` in any fashion
//   See: https://github.com/FormidableLabs/radium/issues/738
// - There's an explicit `render` field defined
function isStateless(component) {
  var proto = component.prototype || {};

  return !component.isReactComponent && !proto.isReactComponent && !component.render && !proto.render;
}

// Check if value is a real ES class in Native / Node code.
// See: https://stackoverflow.com/a/30760236
function isNativeClass(component) {
  return typeof component === 'function' && /^\s*class\s+/.test(component.toString());
}

// Handle es7 arrow functions on React class method names by detecting
// and transfering the instance method to original class prototype.
// (Using a copy of the class).
// See: https://github.com/FormidableLabs/radium/issues/738
function copyArrowFuncs(enhancedSelf, ComposedComponent) {
  RADIUM_METHODS.forEach(function (name) {
    var thisDesc = Object.getOwnPropertyDescriptor(enhancedSelf, name);
    var thisMethod = (thisDesc || {}).value;
    // Only care if have instance method.
    if (!thisMethod) {
      return;
    }
    var radiumDesc = Object.getOwnPropertyDescriptor(RADIUM_PROTO, name);
    var radiumProtoMethod = (radiumDesc || {}).value;
    var superProtoMethod = ComposedComponent.prototype[name];
    // Allow transfer when:
    // 1. have an instance method
    // 2. the super class prototype doesn't have any method
    // 3. it is not already the radium prototype's
    if (!superProtoMethod && thisMethod !== radiumProtoMethod) {
      // Transfer dynamic render component to Component prototype (copy).
      Object.defineProperty(ComposedComponent.prototype, name, thisDesc);
      // Remove instance property, leaving us to have a contrived
      // inheritance chain of (1) radium, (2) superclass.
      delete enhancedSelf[name];
    }
  });
}

function createEnhancedComponent(origComponent, ComposedComponent, config) {
  var _class, _temp;

  var RadiumEnhancer = (_temp = _class = function (_ComposedComponent) {
    _inherits(RadiumEnhancer, _ComposedComponent);

    function RadiumEnhancer() {
      _classCallCheck(this, RadiumEnhancer);

      var _this = _possibleConstructorReturn(this, (RadiumEnhancer.__proto__ || Object.getPrototypeOf(RadiumEnhancer)).apply(this, arguments));

      _this.state = _this.state || {};
      _this.state._radiumStyleState = {};
      _this._radiumIsMounted = true;

      var self = _this;

      // Handle es7 arrow functions on React class method
      copyArrowFuncs(self, ComposedComponent);
      return _this;
    }

    _createClass(RadiumEnhancer, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (_get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this)) {
          _get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this).call(this);
        }

        this._radiumIsMounted = false;

        if (this._radiumMouseUpListener) {
          this._radiumMouseUpListener.remove();
        }

        if (this._radiumMediaQueryListenersByQuery) {
          Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
            this._radiumMediaQueryListenersByQuery[query].remove();
          }, this);
        }
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var superChildContext = _get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'getChildContext', this) ? _get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'getChildContext', this).call(this) : {};

        if (!this.props.radiumConfig) {
          return superChildContext;
        }

        var newContext = _extends({}, superChildContext);

        if (this.props.radiumConfig) {
          newContext._radiumConfig = this.props.radiumConfig;
        }

        return newContext;
      }
    }, {
      key: 'render',
      value: function render() {
        var renderedElement = _get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'render', this).call(this);
        var currentConfig = this.props.radiumConfig || this.context._radiumConfig || config;

        if (config && currentConfig !== config) {
          currentConfig = _extends({}, config, currentConfig);
        }

        // do the style and interaction work

        var _resolveStyles = resolveStyles(this, renderedElement, currentConfig),
            extraStateKeyMap = _resolveStyles.extraStateKeyMap,
            element = _resolveStyles.element;

        this._extraRadiumStateKeys = Object.keys(extraStateKeyMap);

        return element;
      }

      /* eslint-disable react/no-did-update-set-state, no-unused-vars */

    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (_get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentDidUpdate', this)) {
          _get(RadiumEnhancer.prototype.__proto__ || Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState, snapshot);
        }

        if (this._extraRadiumStateKeys && this._extraRadiumStateKeys.length > 0) {
          var trimmedRadiumState = this._extraRadiumStateKeys.reduce(function (state, key) {
            var extraStateKey = state[key],
                remainingState = _objectWithoutProperties(state, [key]);

            return remainingState;
          }, getRadiumStyleState(this));

          this._lastRadiumState = trimmedRadiumState;
          this.setState({ _radiumStyleState: trimmedRadiumState });
        }
      }
      /* eslint-enable react/no-did-update-set-state, no-unused-vars */

    }]);

    return RadiumEnhancer;
  }(ComposedComponent), _class._isRadiumEnhanced = true, _temp);

  // Lazy infer the method names of the Enhancer.

  RADIUM_PROTO = RadiumEnhancer.prototype;
  RADIUM_METHODS = Object.getOwnPropertyNames(RADIUM_PROTO).filter(function (n) {
    return n !== 'constructor' && typeof RADIUM_PROTO[n] === 'function';
  });

  // Class inheritance uses Object.create and because of __proto__ issues
  // with IE <10 any static properties of the superclass aren't inherited and
  // so need to be manually populated.
  // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-
  copyProperties(origComponent, RadiumEnhancer);

  if (process.env.NODE_ENV !== 'production') {
    // This also fixes React Hot Loader by exposing the original components top
    // level prototype methods on the Radium enhanced prototype as discussed in
    // https://github.com/FormidableLabs/radium/issues/219.
    copyProperties(ComposedComponent.prototype, RadiumEnhancer.prototype);
  }

  // add Radium propTypes to enhanced component's propTypes
  if (RadiumEnhancer.propTypes && RadiumEnhancer.propTypes.style) {
    RadiumEnhancer.propTypes = _extends({}, RadiumEnhancer.propTypes, {
      style: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    });
  }

  // copy display name to enhanced component
  RadiumEnhancer.displayName = origComponent.displayName || origComponent.name || 'Component';

  // handle context
  RadiumEnhancer.contextTypes = _extends({}, RadiumEnhancer.contextTypes, {
    _radiumConfig: PropTypes.object,
    _radiumStyleKeeper: PropTypes.instanceOf(StyleKeeper)
  });

  RadiumEnhancer.childContextTypes = _extends({}, RadiumEnhancer.childContextTypes, {
    _radiumConfig: PropTypes.object,
    _radiumStyleKeeper: PropTypes.instanceOf(StyleKeeper)
  });

  return RadiumEnhancer;
}

function createComposedFromStatelessFunc(ComposedComponent, component) {
  ComposedComponent = function (_Component) {
    _inherits(ComposedComponent, _Component);

    function ComposedComponent() {
      _classCallCheck(this, ComposedComponent);

      return _possibleConstructorReturn(this, (ComposedComponent.__proto__ || Object.getPrototypeOf(ComposedComponent)).apply(this, arguments));
    }

    _createClass(ComposedComponent, [{
      key: 'render',
      value: function render() {
        return component(this.props, this.context);
      }
    }]);

    return ComposedComponent;
  }(Component);
  ComposedComponent.displayName = component.displayName || component.name;
  return ComposedComponent;
}

function createComposedFromNativeClass(ComposedComponent) {
  ComposedComponent = function (OrigComponent) {
    function NewComponent() {
      // Use Reflect.construct to simulate 'new'
      var obj = Reflect.construct(OrigComponent, arguments, this.constructor);
      return obj;
    }
    // $FlowFixMe
    Reflect.setPrototypeOf(NewComponent.prototype, OrigComponent.prototype);
    // $FlowFixMe
    Reflect.setPrototypeOf(NewComponent, OrigComponent);
    return NewComponent;
  }(ComposedComponent);
  return ComposedComponent;
}

export default function enhanceWithRadium(configOrComposedComponent) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof configOrComposedComponent !== 'function') {
    return createFactoryFromConfig(config, configOrComposedComponent);
  }

  var origComponent = configOrComposedComponent;
  var _ComposedComponent2 = origComponent;

  // Radium is transpiled in npm, so it isn't really using es6 classes at
  // runtime.  However, the user of Radium might be.  In this case we have
  // to maintain forward compatibility with native es classes.
  if (isNativeClass(_ComposedComponent2)) {
    _ComposedComponent2 = createComposedFromNativeClass(_ComposedComponent2);
  }

  // Handle stateless components
  if (isStateless(_ComposedComponent2)) {
    _ComposedComponent2 = createComposedFromStatelessFunc(_ComposedComponent2, origComponent);
  }

  // Shallow copy composed if still original (we may mutate later).
  if (_ComposedComponent2 === origComponent) {
    _ComposedComponent2 = function (_ComposedComponent3) {
      _inherits(ComposedComponent, _ComposedComponent3);

      function ComposedComponent() {
        _classCallCheck(this, ComposedComponent);

        return _possibleConstructorReturn(this, (ComposedComponent.__proto__ || Object.getPrototypeOf(ComposedComponent)).apply(this, arguments));
      }

      return ComposedComponent;
    }(_ComposedComponent2);
  }

  return createEnhancedComponent(origComponent, _ComposedComponent2, config);
}

function createFactoryFromConfig(config, configOrComposedComponent) {
  var newConfig = _extends({}, config, configOrComposedComponent);
  return function (configOrComponent) {
    return enhanceWithRadium(configOrComponent, newConfig);
  };
}