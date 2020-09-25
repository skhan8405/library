"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Filter;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _RightDrawer = _interopRequireDefault(require("./drawer/RightDrawer"));

var _LeftDrawer = _interopRequireDefault(require("./drawer/LeftDrawer"));

var _MainFilterPanel = _interopRequireDefault(require("./panel/MainFilterPanel"));

var _ClickAwayListener = _interopRequireDefault(require("./Utilities/ClickAwayListener"));

require("!style-loader!css-loader!sass-loader!./Styles/main.scss");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Filter(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      showApplyFilter = _useState2[0],
      setApplyFilter = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      applyFilterChip = _useState4[0],
      setApplyFilterChip = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      filterCount = _useState6[0],
      setFilterCount = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      filterData = _useState8[0],
      setFilterData = _useState8[1];

  var _useState9 = (0, _react.useState)(""),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      emptyFilterWarning = _useState10[0],
      setEmptyFilterWarning = _useState10[1];

  var _useState11 = (0, _react.useState)(""),
      _useState12 = (0, _slicedToArray2["default"])(_useState11, 2),
      emptyFilterClassName = _useState12[0],
      setEmptyFilterClassName = _useState12[1];

  var _useState13 = (0, _react.useState)("none"),
      _useState14 = (0, _slicedToArray2["default"])(_useState13, 2),
      recentFilterShow = _useState14[0],
      setRecentFilterShow = _useState14[1];

  var _useState15 = (0, _react.useState)(""),
      _useState16 = (0, _slicedToArray2["default"])(_useState15, 2),
      filterShow = _useState16[0],
      setFilterShow = _useState16[1];

  var _useState17 = (0, _react.useState)({
    masterSelect: {
      value: []
    }
  }),
      _useState18 = (0, _slicedToArray2["default"])(_useState17, 2),
      initialValuesObject = _useState18[0],
      setInitialValuesObject = _useState18[1];

  var _useState19 = (0, _react.useState)("none"),
      _useState20 = (0, _slicedToArray2["default"])(_useState19, 2),
      applyValidator = _useState20[0],
      setApplyFilterValidator = _useState20[1];

  var _useState21 = (0, _react.useState)([]),
      _useState22 = (0, _slicedToArray2["default"])(_useState21, 2),
      filters = _useState22[0],
      setFilters = _useState22[1];

  var filterDataProp = props.filterDataProp,
      appliedFiltersProp = props.appliedFiltersProp,
      CustomPanel = props.CustomPanel;
  (0, _react.useEffect)(function () {
    setFilterData(filterDataProp);
  }, [filterDataProp]);
  (0, _react.useEffect)(function () {
    var count = 0;
    count = filters.length;
    setFilterCount(count);

    if (count > 0) {
      setApplyFilterValidator("none");
    }
  }, [filters]);
  /**
   * Method set the state which shows the drawer when on true condition
   */

  var showDrawer = function showDrawer() {
    setApplyFilter(true);
  };
  /**
   * Method set the state which closes the drawer when the state is in false condition
   */


  var closeDrawer = function closeDrawer() {
    setApplyFilter(false);
  };
  /**
   * Method to check whether atleast a filter is being selected
   */


  var applyFilterValidation = function applyFilterValidation() {
    if (filterCount === 0) {
      setApplyFilterValidator("");
      setApplyFilter(true);
    } else {
      closeDrawer();
    }
  };
  /**
   * Method which creates the array which contains the elements to be shown in the applied filter chips
   * @param {*} appliedFilters is the filter changes to be applied
   */


  var applyFilter = function applyFilter(appliedFilters) {
    applyFilterValidation();
    setApplyFilterChip(appliedFilters);

    var initialValueObject = _objectSpread({}, initialValuesObject);

    Object.entries(appliedFilters).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      initialValueObject[key] = value;
    });
    setInitialValuesObject(initialValueObject);
    var applied = {};
    Object.entries(appliedFilters).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      if (value.value || value.condition) {
        applied[key] = value;
      }
    });

    if (Object.keys(applied).length > 0) {
      appliedFiltersProp(applied);
    }
  };
  /**
   * Method To reset the right drawer
   * @param {*} setFieldValue is the formik method to change the field values
   */


  var resetDrawer = function resetDrawer(setFieldValue) {
    setApplyFilterChip({});
    setRecentFilterShow("");
    setFilterShow("none");

    var filterDatas = _objectSpread({}, filterData);

    filterDatas.filter.forEach(function (filte) {
      var weigh = filte;
      weigh.weight = 400;

      if (filte.isSubFilters) {
        filte.types.forEach(function (item) {
          var fontweigh = item;
          fontweigh.weight = 400;
        });
      }
    });
    setFilterData(filterDatas);
    setFilters([]);
    Object.keys(initialValuesObject).forEach(function (item) {
      setFieldValue(item, "");
    });
  };
  /**
   * Method To create the filter field arrays for Port type filter element
   * @param {*} name is the name of the filter field
   * @param {*} isSubFilters is a boolean check for whether the subFilters are there or not
   * @param {*} type is the name of the filter field
   * @param {*} dataType is the dataType of the filter field
   * @param {*} condition is the condition array of the filter field if present
   * @param {*} required is the required of the filter field
   * @param {*} label is the label of the filter field
   *  @param {*} prop is the prop of the filter field
   */


  var accordionFromLeftToRight = function accordionFromLeftToRight(name, isSubFilters, type, dataType, condition, required, label, prop) {
    setRecentFilterShow("none");
    setFilterShow("");
    setEmptyFilterClassName("");
    setEmptyFilterWarning("");
    var filter = (0, _toConsumableArray2["default"])(filters);
    var value = {};
    value = {
      name: name,
      type: type,
      dataType: dataType,
      condition: condition,
      required: required
    };
    filterData.filter.forEach(function (item) {
      var itemParam = item;

      if (item.name === value.name) {
        itemParam.weight = 700;
        item.types.forEach(function (tip) {
          var tipParam = tip;

          if (tip.name === value.type) {
            tipParam.weight = 600;
          }
        });
      }
    });

    if (filter.length > 0) {
      var index = filter.findIndex(function (x) {
        return x.name === value.name && x.type === value.type;
      });

      if (index === -1) {
        filter.push({
          labelName: "".concat(name, " > ").concat(type),
          name: name,
          label: label,
          isSubFilters: isSubFilters,
          type: type,
          dataType: dataType,
          condition: condition,
          required: required,
          display: "none",
          disabled: true,
          validationDisplay: "none",
          props: prop
        });
      }
    } else {
      filter.push({
        labelName: "".concat(name, " > ").concat(type),
        name: name,
        label: label,
        isSubFilters: isSubFilters,
        type: type,
        dataType: dataType,
        condition: condition,
        required: required,
        display: "none",
        disabled: true,
        validationDisplay: "none",
        props: prop
      });
    }

    setFilters(filter);
  };
  /**
   * Method To create the filter field arrays for each specific type based on datatype
   * @param {*} name is the name of the filter field
   * @param {*} isSubFilters is a boolean check for whether the subFilters are there or not
   * @param {*} dataType is the dataType of the filter field
   * @param {*} condition is the condition array of the filter field if present
   * @param {*} required is the required of the filter field
   * @param {*} label is the label of the filter field
   * @param {*} prop is the props of the filter field
   */


  var fromLeftToRight = function fromLeftToRight(name, isSubFilters, dataType, condition, required, label, prop) {
    setRecentFilterShow("none");
    setFilterShow("");
    setEmptyFilterClassName("");
    setEmptyFilterWarning("");
    var value = {
      name: name,
      isSubFilters: isSubFilters,
      dataType: dataType,
      condition: condition,
      required: required,
      label: label
    };
    filterData.filter.forEach(function (item) {
      var itemParam = item;

      if (item.name === value.name) {
        itemParam.weight = 700;
      }
    });
    var filter = (0, _toConsumableArray2["default"])(filters);

    if (filter.length > 0) {
      var index = filter.findIndex(function (x) {
        return x.name === value.name && x.dataType === value.dataType;
      });

      if (index === -1) {
        filter.push({
          labelName: "".concat(name),
          name: name,
          label: label,
          isSubFilters: isSubFilters,
          dataType: dataType,
          condition: condition,
          required: required,
          display: "none",
          disabled: true,
          validationDisplay: "none",
          props: prop
        });
      }
    } else {
      filter.push({
        labelName: "".concat(name),
        name: name,
        label: label,
        isSubFilters: isSubFilters,
        dataType: dataType,
        condition: condition,
        required: required,
        display: "none",
        disabled: true,
        validationDisplay: "none",
        props: prop
      });
    }

    setFilters(filter);
  };
  /**
   * Method To close the filter element from rightDrawer
   * @param {*} item is the specific filter element object
   */


  var closeField = function closeField(item) {
    var index = filters.findIndex(function (it) {
      return it.label === item.label;
    });

    if (index !== -1) {
      filterData.filter.forEach(function (it) {
        var itParam = it;
        if (it.name === item.name) itParam.weight = 400;
      });

      if (item.isSubFilters) {
        filterData.filter.forEach(function (its) {
          if (its.name === item.name) {
            its.types.forEach(function (ite) {
              var iteParam = ite;

              if (ite.name === item.type) {
                iteParam.weight = 400;
              }
            });
          }
        });
      }

      var filter = (0, _toConsumableArray2["default"])(filters);
      filter.splice(index, 1);
      setFilters(filter);
    }
  };
  /**
   * Method To handle filter conditional field in rightDrawer
   * @param {*} item is the specific filter element object
   */


  var conditionHandler = function conditionHandler(item) {
    var filter = (0, _toConsumableArray2["default"])(filters);
    filter.forEach(function (it) {
      var itParam = it;

      if (it.label === item.label) {
        if (it.disabled === false) {
          itParam.disabled = true;
        } else {
          itParam.disabled = false;
        }

        if (it.display === "none") {
          itParam.display = "";
        } else {
          itParam.display = "none";
        }
      }
    });
    setFilters(filter);
  };
  /**
   * Method To dateTime initialValues in rightDrawer
   * @param {*} label is the specific filter element name
   */


  var setInitialValueDate = function setInitialValueDate(label) {
    var initialValueObject = _objectSpread({}, initialValuesObject);

    if (!Object.prototype.hasOwnProperty.call(initialValueObject, "".concat(label, ".value"))) {
      initialValueObject["".concat(label, ".value")] = "";
    }

    setInitialValuesObject(initialValueObject);
  };
  /**
   * Method To port initialValues in rightDrawer
   * @param {*} label is the specific filter element labelName
   * @param {*} dataType is the specific filter element type
   */


  var setInitialValueFilterGroup = function setInitialValueFilterGroup(label, dataType) {
    var initialValueObject = _objectSpread({}, initialValuesObject);

    if (dataType !== "IAirport") {
      if (!Object.prototype.hasOwnProperty.call(initialValueObject, "".concat(label, ".condition")) && !Object.prototype.hasOwnProperty.call(initialValueObject, "".concat(label, ".value"))) {
        initialValueObject["".concat(label, ".condition")] = "";
        initialValueObject["".concat(label, ".value")] = "";
      }
    } else if (!Object.prototype.hasOwnProperty.call(initialValueObject, "".concat(label, ".value"))) {
      initialValueObject["".concat(label, ".value")] = "";
    }

    setInitialValuesObject(initialValueObject);
  };
  /**
   * Method To port initialValues in rightDrawer
   * @param {*} item is the specific filter element object
   */


  var setInitialValueTextField = function setInitialValueTextField(item) {
    var initialValueObject = _objectSpread({}, initialValuesObject);

    if (!Object.prototype.hasOwnProperty.call(initialValueObject, "".concat(item.label, ".condition")) && !Object.prototype.hasOwnProperty.call(initialValueObject, "".concat(item.label, ".value"))) {
      if (item.dataType !== "MasterSelect") {
        if (item.dataType === "IFlightNumber") {
          initialValueObject["".concat(item.label, ".value")] = [];
          initialValueObject["".concat(item.label, ".condition")] = "";
        } else {
          initialValueObject["".concat(item.label, ".condition")] = "";
          initialValueObject["".concat(item.label, ".value")] = "";
        }
      } else {
        initialValueObject.masterSelect = {
          condition: ""
        };
      }
    }

    setInitialValuesObject(initialValueObject);
  };

  return /*#__PURE__*/_react["default"].createElement(_ClickAwayListener["default"], {
    onClickAway: closeDrawer
  }, showApplyFilter && /*#__PURE__*/_react["default"].createElement("div", {
    className: "neo-filter filter--grid iCargo__custom"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__wrap"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__list"
  }, /*#__PURE__*/_react["default"].createElement(_LeftDrawer["default"], {
    filterData: filterData,
    fromLeftToRight: fromLeftToRight,
    accordionFromLeftToRight: accordionFromLeftToRight,
    setInitialValueDate: setInitialValueDate,
    setInitialValueFilterGroup: setInitialValueFilterGroup,
    setInitialValueTextField: setInitialValueTextField
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "filter__inputwrap"
  }, /*#__PURE__*/_react["default"].createElement(_RightDrawer["default"], {
    filters: filters,
    applyFilter: applyFilter,
    closeDrawer: closeDrawer,
    resetDrawer: resetDrawer,
    filterCount: filterCount,
    emptyFilterClassName: emptyFilterClassName,
    emptyFilterWarning: emptyFilterWarning,
    recentFilterShowProp: recentFilterShow,
    filterShowProp: filterShow,
    initialValuesObject: initialValuesObject,
    applyFilterValidation: applyFilterValidation,
    applyValidator: applyValidator,
    closeField: closeField,
    conditionHandler: conditionHandler
  })))), /*#__PURE__*/_react["default"].createElement(_MainFilterPanel["default"], {
    showDrawer: showDrawer,
    applyFilterChip: applyFilterChip,
    CustomPanel: CustomPanel
  }));
}

Filter.propTypes = {
  filterDataProp: _propTypes["default"].any,
  appliedFiltersProp: _propTypes["default"].any,
  CustomPanel: _propTypes["default"].any
};