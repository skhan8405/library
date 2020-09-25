"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _config = _interopRequireDefault(require("./config.json"));

var components = {};

var _loop = function _loop(i) {
  components[_config["default"].config[i].name] = /*#__PURE__*/(0, _react.lazy)(function () {
    return import("".concat(_config["default"].config[i].path)).then(function (module) {
      return {
        "default": module[_config["default"].config[i].name]
      };
    });
  });
};

for (var i = 0; i < _config["default"].config.length; i++) {
  _loop(i);
}

var _default = components;
exports["default"] = _default;