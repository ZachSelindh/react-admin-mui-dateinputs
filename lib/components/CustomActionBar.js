"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _internals = require("@mui/x-date-pickers/internals");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CustomActionBar = function CustomActionBar(props) {
  var onAccept = props.onAccept,
    onClear = props.onClear,
    onCancel = props.onCancel,
    actions = props.actions,
    handleChange = props.handleChange,
    setFragileValue = props.setFragileValue;
  var localeText = (0, _internals.useLocaleText)();
  if (null == actions || 0 === actions.length) {
    return null;
  }
  var actionButtons = actions === null || actions === void 0 ? void 0 : actions.map(function (actionType) {
    switch (actionType) {
      case 'clear':
        return /*#__PURE__*/React.createElement(_Button["default"], {
          "data-mui-test": "clear-action-button",
          onClick: function onClick() {
            onClear();
          },
          key: actionType
        }, localeText.clearButtonLabel);
      case 'cancel':
        return /*#__PURE__*/React.createElement(_Button["default"], {
          onClick: function onClick() {
            onCancel();
          },
          key: actionType
        }, localeText.cancelButtonLabel);
      case 'accept':
        return /*#__PURE__*/React.createElement(_Button["default"], {
          onClick: function onClick() {
            onAccept();
          },
          key: actionType
        }, localeText.okButtonLabel);
      case 'today':
        return /*#__PURE__*/React.createElement(_Button["default"], {
          "data-mui-test": "today-action-button",
          onClick: function onClick() {
            var now = new Date();
            handleChange(now);
            setFragileValue(now);
            onAccept();
          },
          key: actionType
        }, localeText.todayButtonLabel);
      default:
        return null;
    }
  });
  return /*#__PURE__*/React.createElement(_DialogActions["default"], props, actionButtons);
};
var _default = CustomActionBar;
exports["default"] = _default;