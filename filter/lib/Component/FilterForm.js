"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _select = require("@neo-ui/select");

var _toggle = require("@neo-ui/toggle");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SvgUtilities = require("../Utilities/SvgUtilities");

var _dynamicImportProcessor = _interopRequireDefault(require("../dynamicImport/dynamicImportProcessor"));

var FilterForm = function FilterForm(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      filterArray = _useState2[0],
      setFilterArray = _useState2[1];

  var filters = props.filters;
  (0, _react.useEffect)(function () {
    if (filters) {
      var reversedArray = filters.reverse();
      setFilterArray(reversedArray);
    }
  }, [filters]);
  var componentDiv = filterArray.map(function (filter, index) {
    var Component = _dynamicImportProcessor["default"][filter.dataType];
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-group",
      key: "".concat(filter.label)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "title"
    }, /*#__PURE__*/_react["default"].createElement("h4", null, filter.labelName), /*#__PURE__*/_react["default"].createElement("div", {
      className: "controls"
    }, filter.condition && filter.condition.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
      className: "control__condition__wrap"
    }, /*#__PURE__*/_react["default"].createElement(_toggle.IToggle, {
      name: "".concat(filter.label, ">check"),
      onChange: function onChange() {
        props.conditionHandler(filter);
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "control__condition"
    }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconCondition, null))), /*#__PURE__*/_react["default"].createElement("div", {
      role: "presentation",
      "data-testid": "closeField",
      className: "control__close",
      onClick: function onClick() {
        props.closeField(filter);
      }
    }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconTimes, null)))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-inputs"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      disabled: filter.disabled,
      style: {
        display: filter.display
      }
    }, /*#__PURE__*/_react["default"].createElement("label", null, "Condition"), /*#__PURE__*/_react["default"].createElement(_select.ISelect, {
      name: "".concat(filter.label, ".condition"),
      options: filter.condition
    }), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
      key: index,
      fallback: /*#__PURE__*/_react["default"].createElement("div", null, " Loading...")
    }, /*#__PURE__*/_react["default"].createElement(Component, filter.props))));
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, componentDiv);
};

FilterForm.propTypes = {
  conditionHandler: _propTypes["default"].any,
  closeField: _propTypes["default"].any,
  filters: _propTypes["default"].any
};
var _default = FilterForm;
exports["default"] = _default;