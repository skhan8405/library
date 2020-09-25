"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LeftDrawer;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _accordion = require("@neo-ui/accordion");

var _propTypes = _interopRequireDefault(require("prop-types"));

function LeftDrawer(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      leftDrawData = _useState2[0],
      setLeftDrawData = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      leftDrawTemp = _useState4[0],
      setLeftDrawTemp = _useState4[1];

  var filterData = props.filterData;
  (0, _react.useEffect)(function () {
    var typeArray = [];
    setLeftDrawData(filterData.filter);
    setLeftDrawTemp(filterData.filter);
    filterData.filter.forEach(function (item) {
      if (item.types) {
        item.types.forEach(function (type) {
          typeArray.push(type.name);
        });
      }
    });
  }, [filterData.filter]);
  /**
   * Method To filter out the filters displayed at the left drawer
   * @param {*} e triggered while typing on the search field
   */

  var searchFilterHandler = function searchFilterHandler(e) {
    var filteredList = [];
    var searchKey = e.target.value;

    if (leftDrawData) {
      filteredList = leftDrawTemp.filter(function (item) {
        return item.name && item.name.toLowerCase().includes(searchKey.toLowerCase());
      });
    }

    setLeftDrawData(filteredList);
  };

  var groupFilters = leftDrawData.map(function (item, index) {
    if (item.isSubFilters) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "".concat(item.name, "+").concat(index)
      }, /*#__PURE__*/_react["default"].createElement(_accordion.IAccordion, {
        className: "accordion-no-border"
      }, /*#__PURE__*/_react["default"].createElement(_accordion.IAccordionItem, null, /*#__PURE__*/_react["default"].createElement(_accordion.IAccordionItemTitle, null, item.name), /*#__PURE__*/_react["default"].createElement(_accordion.IAccordionItemBody, null, item.types && item.types.map(function (type) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          role: "presentation",
          style: {
            fontWeight: type.weight,
            cursor: "pointer"
          },
          "data-testid": "".concat(type.name, ":").concat(item.name),
          onClick: function onClick() {
            props.accordionFromLeftToRight(item.name, item.isSubFilters, type.name, type.dataType, type.condition, type.required, type.label, type.props);
            props.setInitialValueFilterGroup(type.label, type.dataType);
          },
          key: "".concat(type.name, ":").concat(item.name)
        }, type.name);
      })))));
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    });
  });
  var dateTimeHeads = leftDrawData.map(function (item, index) {
    if (item.dataType === "IDatePicker") {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "fieldHeads",
        key: "".concat(item.name, ",").concat(index)
      }, /*#__PURE__*/_react["default"].createElement("li", {
        key: "".concat(item.name, "_").concat(index),
        role: "presentation",
        style: {
          fontWeight: item.weight
        },
        "data-testid": "fieldHeads",
        onClick: function onClick() {
          props.fromLeftToRight(item.name, item.isSubFilters, item.dataType, item.condition, item.required, item.label, item.props);
          props.setInitialValueDate(item.label);
        }
      }, item.name));
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    });
  });
  var normalHeads = leftDrawData.map(function (item, index) {
    if (!item.isSubFilters && item.dataType !== "IDatePicker") {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "normalHeads",
        key: "".concat(item.name, ">").concat(index)
      }, /*#__PURE__*/_react["default"].createElement("li", {
        key: "".concat(item.name, "_").concat(index),
        role: "presentation",
        style: {
          fontWeight: item.weight
        },
        "data-testid": item.name,
        onClick: function onClick() {
          props.fromLeftToRight(item.name, item.isSubFilters, item.dataType, item.condition, item.required, item.label, item.props);
          props.setInitialValueTextField(item);
        }
      }, item.name));
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    required: true,
    type: "text",
    placeholder: "Search a Filter",
    defaultValue: "",
    className: "customControl",
    "data-testid": "searchFilterHandler-input",
    onChange: searchFilterHandler
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "leftDrawer"
  }, /*#__PURE__*/_react["default"].createElement("div", null, groupFilters), /*#__PURE__*/_react["default"].createElement("div", null, dateTimeHeads), /*#__PURE__*/_react["default"].createElement("div", null, normalHeads)));
}

LeftDrawer.propTypes = {
  filterData: _propTypes["default"].any,
  fromLeftToRight: _propTypes["default"].any,
  accordionFromLeftToRight: _propTypes["default"].any,
  setInitialValueDate: _propTypes["default"].any,
  setInitialValueFilterGroup: _propTypes["default"].any,
  setInitialValueTextField: _propTypes["default"].any
};