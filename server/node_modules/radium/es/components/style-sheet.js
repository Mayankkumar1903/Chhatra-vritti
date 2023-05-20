var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyleKeeper from '../style-keeper';

var StyleSheet = (_temp = _class = function (_Component) {
  _inherits(StyleSheet, _Component);

  function StyleSheet() {
    _classCallCheck(this, StyleSheet);

    var _this = _possibleConstructorReturn(this, (StyleSheet.__proto__ || Object.getPrototypeOf(StyleSheet)).apply(this, arguments));

    _this._onChange = function () {
      var nextCSS = _this.context._radiumStyleKeeper.getCSS();

      if (nextCSS !== _this._css) {
        if (_this._root) {
          _this._root.innerHTML = nextCSS;
        } else {
          throw new Error('No root style object found, even after StyleSheet mount.');
        }
        _this._css = nextCSS;
      }
    };

    _this._css = _this.context._radiumStyleKeeper.getCSS();
    return _this;
  }

  _createClass(StyleSheet, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._subscription = this.context._radiumStyleKeeper.subscribe(this._onChange);
      this._onChange();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._subscription) {
        this._subscription.remove();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement('style', {
        dangerouslySetInnerHTML: { __html: this._css },
        ref: function ref(c) {
          _this2._root = c;
        }
      });
    }
  }]);

  return StyleSheet;
}(Component), _class.contextTypes = {
  _radiumStyleKeeper: PropTypes.instanceOf(StyleKeeper)
}, _temp);
export { StyleSheet as default };