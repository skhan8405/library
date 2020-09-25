"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TextField;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _textfield = require("@neo-ui/textfield");

var _select = require("@neo-ui/select");

var _SvgUtilities = require("../Utilities/SvgUtilities");

/* eslint-disable react/destructuring-assignment */
function TextField(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      textComponentArr = _useState2[0],
      setTextComponentArr = _useState2[1];

  (0, _react.useEffect)(function () {
    console.log(props.textComponentsArray);
    setTextComponentArr(props.textComponentsArray);
  }, [props.textComponentsArray]);
  var textComponentDiv = textComponentArr.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: item.name,
      className: "form-group"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "title"
    }, /*#__PURE__*/_react["default"].createElement("h5", null, item.name), /*#__PURE__*/_react["default"].createElement("div", {
      className: "controls"
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: "switch",
      htmlFor: item.name
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "checkBox",
      label: "",
      id: item.name,
      "data-testid": "".concat(item.name, ">check"),
      onClick: function onClick() {
        props.textFieldconditionHandler(item);
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "slider round"
    })), /*#__PURE__*/_react["default"].createElement("div", {
      role: "presentation",
      "data-testid": "".concat(item.name, ">close"),
      className: "control__close",
      onClick: function onClick() {
        props.closeTextField(item);
      }
    }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconTimes, null)))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-inputs"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: item.display
      },
      disabled: item.disabled
    }, /*#__PURE__*/_react["default"].createElement("label", null, "Condition"), /*#__PURE__*/_react["default"].createElement(_select.ISelect, {
      name: "".concat(item.name, ">condition"),
      options: item.condition
    }), /*#__PURE__*/_react["default"].createElement("label", null, "Value")), /*#__PURE__*/_react["default"].createElement(_textfield.ITextField, {
      name: "".concat(item.name, ">value")
    })));
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, textComponentDiv);
}

TextField.propTypes = {
  textComponentsArray: _propTypes["default"].any,
  closeTextField: _propTypes["default"].any,
  textFieldconditionHandler: _propTypes["default"].any
};