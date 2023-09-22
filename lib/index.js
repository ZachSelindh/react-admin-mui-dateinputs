"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeInput = exports.DateTimeInput = exports.DateInput = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _MobileDatePicker = require("@mui/x-date-pickers/MobileDatePicker");
var _MobileTimePicker = require("@mui/x-date-pickers/MobileTimePicker");
var _MobileDateTimePicker = require("@mui/x-date-pickers/MobileDateTimePicker");
var _Pickers = _interopRequireDefault(require("./components/Pickers"));
var DateInput = function DateInput(props) {
  return /*#__PURE__*/_react["default"].createElement(_Pickers["default"], (0, _extends2["default"])({
    PickerComponent: _MobileDatePicker.MobileDatePicker
  }, props));
};
exports.DateInput = DateInput;
var TimeInput = function TimeInput(props) {
  return /*#__PURE__*/_react["default"].createElement(_Pickers["default"], (0, _extends2["default"])({
    PickerComponent: _MobileTimePicker.MobileTimePicker
  }, props));
};
exports.TimeInput = TimeInput;
var DateTimeInput = function DateTimeInput(props) {
  return /*#__PURE__*/_react["default"].createElement(_Pickers["default"], (0, _extends2["default"])({
    PickerComponent: _MobileDateTimePicker.MobileDateTimePicker
  }, props));
};
exports.DateTimeInput = DateTimeInput;