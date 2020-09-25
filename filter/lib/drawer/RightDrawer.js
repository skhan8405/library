"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formik = require("formik");

var _button = require("@neo/button");

var _SvgUtilities = require("../Utilities/SvgUtilities");

require("react-datepicker/dist/react-datepicker.css");

var _FilterForm = _interopRequireDefault(require("../Component/FilterForm"));

var RightDrawer = function RightDrawer(props) {
  var values = props.values,
      handleSubmit = props.handleSubmit;

  var _useFormikContext = (0, _formik.useFormikContext)(),
      setFieldValue = _useFormikContext.setFieldValue;

  var _useState = (0, _react.useState)(""),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      applyFilterWarning = _useState2[0],
      setApplyFilterWarning = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      applyfilterWarningClassName = _useState4[0],
      setApplyFilterWariningClassname = _useState4[1];

  var _useState5 = (0, _react.useState)("none"),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      recentFilterShow = _useState6[0],
      setRecentFilterShow = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      filterShow = _useState8[0],
      setFilterShow = _useState8[1];

  var emptyFilterWarning = props.emptyFilterWarning,
      emptyFilterClassName = props.emptyFilterClassName,
      filterShowProp = props.filterShowProp,
      recentFilterShowProp = props.recentFilterShowProp,
      filterCount = props.filterCount,
      filters = props.filters,
      closeField = props.closeField,
      conditionHandler = props.conditionHandler,
      applyValidator = props.applyValidator,
      resetDrawer = props.resetDrawer,
      applyFilter = props.applyFilter;
  (0, _react.useEffect)(function () {
    setApplyFilterWarning(emptyFilterWarning);
    setApplyFilterWariningClassname(emptyFilterClassName);
  }, [emptyFilterWarning, emptyFilterClassName]);
  (0, _react.useEffect)(function () {
    setRecentFilterShow(recentFilterShowProp);
    setFilterShow(filterShowProp);
  }, [recentFilterShowProp, filterShowProp]);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: recentFilterShow
    },
    className: "filter__content"
  }, /*#__PURE__*/_react["default"].createElement("div", null, "Recent Filters")), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: filterShow
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__title"
  }, "Selected Filters", /*#__PURE__*/_react["default"].createElement("span", {
    className: "filter-count"
  }, filterCount)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__content"
  }, /*#__PURE__*/_react["default"].createElement(_FilterForm["default"], {
    filters: filters,
    closeField: closeField,
    conditionHandler: conditionHandler
  }), /*#__PURE__*/_react["default"].createElement("span", {
    id: "fieldWarning",
    className: "text-danger",
    style: {
      display: applyValidator
    }
  }, "No filter selected!")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__btn"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__save"
  }, /*#__PURE__*/_react["default"].createElement(_button.IButton, {
    type: "button",
    className: "button-save",
    variant: ""
  }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.SaveLogo, null), /*#__PURE__*/_react["default"].createElement("span", null, "SAVE"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn-wrap"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: applyfilterWarningClassName
  }, applyFilterWarning), /*#__PURE__*/_react["default"].createElement(_button.IButton, {
    type: "button",
    variant: "",
    "data-testid": "resetClick",
    className: "reset",
    onClick: function onClick() {
      resetDrawer(setFieldValue);
    }
  }, "Reset"), /*#__PURE__*/_react["default"].createElement(_button.IButton, {
    color: "info",
    type: "submit",
    className: "applyFilter",
    "data-testid": "applyFilter-button",
    onClick: function onClick() {
      applyFilter(values);
    }
  }, "Apply Filter"))))));
};

RightDrawer.propTypes = {
  emptyFilterWarning: _propTypes["default"].any,
  emptyFilterClassName: _propTypes["default"].any,
  recentFilterShowProp: _propTypes["default"].any,
  filterShowProp: _propTypes["default"].any,
  filterCount: _propTypes["default"].any,
  resetDrawer: _propTypes["default"].any,
  applyFilter: _propTypes["default"].any,
  filters: _propTypes["default"].any,
  closeField: _propTypes["default"].any,
  conditionHandler: _propTypes["default"].any,
  values: _propTypes["default"].any,
  handleSubmit: _propTypes["default"].any,
  applyValidator: _propTypes["default"].any
};

var _default = (0, _formik.withFormik)({
  displayName: "BasicForm",
  mapPropsToValues: function mapPropsToValues(props) {
    return props.initialValuesObject;
  },
  validateOnBlur: false,
  validateOnChange: false
})(RightDrawer);

exports["default"] = _default;