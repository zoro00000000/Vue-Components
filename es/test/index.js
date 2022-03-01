"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _test = _interopRequireDefault(require("./src/test"));

_test.default.install = function (Vue) {
  Vue.component(_test.default.name, _test.default);
};

var _default = _test.default;
exports.default = _default;