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

var _button = require("@neo/button");

var _SvgUtilities = require("../Utilities/SvgUtilities");

var chips;
var chipCount;

var MainFilterPanel = function MainFilterPanel(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      listFilter = _useState2[0],
      setListFilter = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      chipArray = _useState4[0],
      setChipArray = _useState4[1];

  var _useState5 = (0, _react.useState)("none"),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      countShow = _useState6[0],
      setCountShow = _useState6[1];

  var applyFilterChip = props.applyFilterChip,
      showDrawer = props.showDrawer,
      CustomPanel = props.CustomPanel;
  (0, _react.useEffect)(function () {
    setChipArray(applyFilterChip);

    if (Object.keys(applyFilterChip).length > 0) {
      setCountShow("");
    } else {
      setCountShow("none");
    }
  }, [applyFilterChip]);
  /**
   * Method to display and not display saved filters list
   */

  var handleListFilter = function handleListFilter() {
    setListFilter(!listFilter);
  };

  if (chipArray) {
    chipCount = 0;
    chips = Object.entries(chipArray).map(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          key = _ref2[0],
          values = _ref2[1];

      if (values.value && (values.value.length > 0 || Object.keys(values.value).length > 0)) {
        chipCount += 1;
        return /*#__PURE__*/_react["default"].createElement("div", {
          role: "presentation",
          className: "listContent",
          "data-testid": "".concat(values.value, ",").concat(key),
          key: "".concat(values.value, ",").concat(key),
          onClick: function onClick() {
            props.showDrawer();
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          key: key
        }, key), values.condition && values.condition.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
          key: values
        }, values.condition, "\xA0\xA0"), values.value && values.value.length > 0 && !Array.isArray(values.value) && /*#__PURE__*/_react["default"].createElement("div", {
          key: values.value
        }, values.value), values.value && values.value.length > 0 && Array.isArray(values.value) && values.value.map(function (item) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: item
          }, "\xA0\xA0", item, "\xA0\xA0");
        }), values.value && Object.keys(values.value).length > 0 && !values.value.length > 0 && Object.keys(values.value).map(function (item) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: item
          }, "\xA0\xA0", item, ":", values.value[item], "\xA0\xA0");
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", null);
    });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "neo-header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "header__filter"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "displayFlex"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "alignLeft"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      cursor: "pointer"
    },
    role: "presentation",
    className: "iconLeft",
    "data-testid": "handleListFilterCheck",
    onClick: handleListFilter
  }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconLeftAlign, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "leftSpace"
  }, "All flights")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "header__custompanel"
  }, /*#__PURE__*/_react["default"].createElement(CustomPanel, null))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "secondList"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "displayFlex"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__tags"
  }, chipCount > 0 && /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      display: countShow
    },
    className: "listContent"
  }, "count:", chipCount), chips), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_button.IButton, {
    color: "link",
    size: "sm",
    style: {
      cursor: "pointer"
    },
    role: "presentation",
    "data-testid": "showDrawer-check",
    onClick: function onClick() {
      showDrawer();
    },
    className: "addFilter"
  }, "+ Add Filter"))))));
};

MainFilterPanel.propTypes = {
  applyFilterChip: _propTypes["default"].any,
  showDrawer: _propTypes["default"].any,
  CustomPanel: _propTypes["default"].any
};
var _default = MainFilterPanel;
exports["default"] = _default;