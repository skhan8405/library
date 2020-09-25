"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/* eslint-disable react/destructuring-assignment */

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useClickAwayListener(ref, props) {
  (0, _react.useEffect)(function () {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClickAway();
      }
    } // Bind the event listener


    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
/**
 * Component that alerts if you click outside of it
 */


function ClickAwayListener(props) {
  var wrapperRef = (0, _react.useRef)(null);
  useClickAwayListener(wrapperRef, props);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: wrapperRef
  }, props.children);
}

ClickAwayListener.propTypes = {
  children: _propTypes["default"].any
};
var _default = ClickAwayListener;
exports["default"] = _default;