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
var DateTimeRange = function DateTimeRange(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      fieldComponentArr = _useState2[0],
      setFieldComponentArr = _useState2[1];

  (0, _react.useEffect)(function () {
    if (props.dateTimeRangesArray) setFieldComponentArr(props.dateTimeRangesArray);
  }, [props.dateTimeRangesArray]);
  var dateTimeRangeDiv = fieldComponentArr.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-group",
      key: item.name
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "title"
    }, /*#__PURE__*/_react["default"].createElement("h5", null, item.name), /*#__PURE__*/_react["default"].createElement("div", {
      className: "controls"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      role: "presentation",
      "data-testid": "closeDateRange",
      onClick: function onClick() {
        props.closeDateTimeRange(item);
      }
    }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconTimes, null)))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-inputs"
    }, /*#__PURE__*/_react["default"].createElement("label", null, "From Date Time"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "input-wrap"
    }, /*#__PURE__*/_react["default"].createElement(_date.IDatePicker, {
      name: "fromDateTime"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-inputs"
    }, /*#__PURE__*/_react["default"].createElement("label", null, "To Date Time"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "input-wrap"
    }, /*#__PURE__*/_react["default"].createElement(_date.IDatePicker, {
      name: "toDateTime"
    }))));
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, dateTimeRangeDiv);
};

var _default = DateTimeRange;
exports["default"] = _default;
DateTimeRange.propTypes = {
  dateTimeRangesArray: _propTypes["default"].any,
  closeDateTimeRange: _propTypes["default"].any
};