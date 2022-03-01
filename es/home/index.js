"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _home = _interopRequireDefault(require("./src/home"));

_home.default.install = function (Vue) {
  Vue.component(_home.default.name, _home.default);
};

var _default = _home.default;
exports.default = _default;