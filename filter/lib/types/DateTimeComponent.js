"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _date = require("@neo-ui/date");

require("react-datepicker/dist/react-datepicker.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SvgUtilities = require("../Utilities/SvgUtilities");

/* eslint-disable react/destructuring-assignment */
var DateTime = function DateTime(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      fieldComponentArr = _useState2[0],
      setFieldComponentArr = _useState2[1];

  (0, _react.useEffect)(function () {
    if (props.dateTimesArray) setFieldComponentArr(props.dateTimesArray);
  }, [props.dateTimesArray]);
  var dateTimeDiv = fieldComponentArr.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "title",
      key: item.name
    }, /*#__PURE__*/_react["default"].createElement("h5", null, item.name), /*#__PURE__*/_react["default"].createElement("div", {
      className: "controls"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      role: "presentation",
      "data-testid": "closeDateTime",
      onClick: function onClick() {
        props.closeDateTime(item);
      }
    }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconTimes, null)))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-inputs"
    }, /*#__PURE__*/_react["default"].createElement(_date.IDatePicker, {
      name: "date",
      "data-testid": "cargoDateField"
    })));
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, dateTimeDiv);
};

var _default = DateTime;
exports["default"] = _default;
DateTime.propTypes = {
  dateTimesArray: _propTypes["default"].any,
  closeDateTime: _propTypes["default"].any
};