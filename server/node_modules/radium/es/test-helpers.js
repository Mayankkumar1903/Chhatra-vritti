var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Color from 'color';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestUtils from 'react-dom/test-utils';

export function getRenderOutput(element) {
  var renderer = new ShallowRenderer();
  renderer.render(element);
  return renderer.getRenderOutput();
}

export function getElement(output, tagName) {
  return ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(output, tagName));
}

export function getElements(output, tagName) {
  return TestUtils.scryRenderedDOMComponentsWithTag(output, tagName).map(function (component) {
    return ReactDOM.findDOMNode(component);
  });
}

function cleanCSS(css) {
  return css.replace(/\s*\n\s*/g, '').replace(/\s*([{};:,])\s*/g, '$1');
}

export function expectCSS(styleElement, css) {
  // strip newlines and excess whitespace from both to normalize browsers.
  // IE9, for instance, does not include new lines in innerText.
  // Also allows us to write our expected CSS cleanly, without worring about the
  // format of the actual output.
  expect(cleanCSS(styleElement.innerText)).to.equal(cleanCSS(css));
}

export function expectColor(actual, expected) {
  expect(Color(actual).hex()).to.equal(Color(expected).hex());
}

export function createEsClass(renderFn) {
  var Composed = function (_Component) {
    _inherits(Composed, _Component);

    function Composed() {
      _classCallCheck(this, Composed);

      return _possibleConstructorReturn(this, (Composed.__proto__ || Object.getPrototypeOf(Composed)).apply(this, arguments));
    }

    _createClass(Composed, [{
      key: 'render',
      value: function render() {
        return renderFn() || React.createElement('div', null);
      }
    }]);

    return Composed;
  }(Component);

  return Composed;
}