"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CallLimitier = function () {
  function CallLimitier(fn, interval) {
    _classCallCheck(this, CallLimitier);

    this.fn = fn;
    this.interval = interval || 20;
  }

  _createClass(CallLimitier, [{
    key: "register",
    value: function register(fn, ctx) {
      this.fn = fn;
    }
  }, {
    key: "invoke",
    value: function invoke() {
      var _this = this;

      var args = arguments;
      if (this.tm) {
        clearTimeout(this.tm);
      }
      var currentTm = this.tm = setTimeout(function () {
        var _fn;

        var canceled = {
          isCancaled: function isCancaled() {
            return _this.tm !== currentTm;
          }
        };
        (_fn = _this.fn).call.apply(_fn, [null].concat(_toConsumableArray(args), [canceled]));
      }, this.interval);
    }
  }, {
    key: "tm",
    get: function get() {
      return this._tm;
    },
    set: function set(value) {
      this._tm = value;
    }
  }]);

  return CallLimitier;
}();

exports.default = CallLimitier;