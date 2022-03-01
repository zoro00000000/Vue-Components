"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(require("./src/demo"));

_demo.default.install = function (Vue) {
  Vue.component(_demo.default.name, _demo.default);
};

var _default = _demo.default;
exports.default = _default;