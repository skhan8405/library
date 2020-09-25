"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Port;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airport = require("@neo-ui/airport");

var _textfield = require("@neo-ui/textfield");

var _select = require("@neo-ui/select");

var _SvgUtilities = require("../Utilities/SvgUtilities");

/* eslint-disable react/destructuring-assignment */
function Port(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      portArray = _useState2[0],
      setPortArray = _useState2[1];

  (0, _react.useEffect)(function () {
    if (props.portsArray) setPortArray(props.portsArray);
  }, [props.portsArray]);
  var portDiv = portArray.map(function (item) {
    if (item.dataType === "Airport") {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group",
        key: "".concat(item.name, ">").concat(item.type)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "title"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, item.name, "\xA0>\xA0", item.type), /*#__PURE__*/_react["default"].createElement("div", {
        className: "controls"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        role: "presentation",
        "data-testid": "closeAirport-click",
        onClick: function onClick() {
          props.closePortElement(item);
        }
      }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconTimes, null)))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-inputs",
        "data-testid": "".concat(item.name, ">").concat(item.type)
      }, /*#__PURE__*/_react["default"].createElement(_airport.IAirport, {
        name: "".concat(item.name, ">").concat(item.type)
      })));
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-group",
      key: "".concat(item.name, ",").concat(item.type)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "title"
    }, /*#__PURE__*/_react["default"].createElement("h4", null, item.name, " \xA0>\xA0", item.type), /*#__PURE__*/_react["default"].createElement("div", {
      className: "controls"
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: "switch",
      htmlFor: "".concat(item.name, ">").concat(item.type)
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "checkBox",
      label: "",
      id: "".concat(item.name, ">").concat(item.type),
      "data-testid": "portField-check",
      onClick: function onClick() {
        props.portConditionHandler(item);
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "slider round"
    })), /*#__PURE__*/_react["default"].createElement("div", {
      role: "presentation",
      "data-testid": "closePortField-close",
      className: "control__close",
      onClick: function onClick() {
        props.closePortElement(item);
      }
    }, /*#__PURE__*/_react["default"].createElement(_SvgUtilities.IconTimes, null)))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-inputs"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      disabled: item.disabled,
      style: {
        display: item.display
      }
    }, /*#__PURE__*/_react["default"].createElement("label", null, "Condition"), /*#__PURE__*/_react["default"].createElement(_select.ISelect, {
      name: "".concat(item.name, ">").concat(item.type, ">condition"),
      options: item.condition
    }), /*#__PURE__*/_react["default"].createElement("label", null, "Value")), /*#__PURE__*/_react["default"].createElement(_textfield.ITextField, {
      name: "".concat(item.name, ">").concat(item.type, ">value")
    })));
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, portDiv);
}

Port.propTypes = {
  portsArray: _propTypes["default"].any,
  closePortElement: _propTypes["default"].any,
  portConditionHandler: _propTypes["default"].any
};