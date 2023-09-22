"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _reactAdmin = require("react-admin");
var _InputAdornment = _interopRequireDefault(require("@mui/material/InputAdornment"));
var _Event = _interopRequireDefault(require("@mui/icons-material/Event"));
var _AdapterDateFns = require("@mui/x-date-pickers/AdapterDateFns");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _CustomActionBar = _interopRequireDefault(require("./CustomActionBar"));
var _utils = require("../utils");
var _excluded = ["className", "fullWidth", "helperText", "label", "margin", "pickerOptions", "onClose", "onOpen", "PickerComponent", "resource", "size", "source", "stringFormat", "toolbarActions", "variant"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Picker = function Picker(props) {
  var className = props.className,
    fullWidth = props.fullWidth,
    helperText = props.helperText,
    label = props.label,
    margin = props.margin,
    pickerOptions = props.pickerOptions,
    _onClose = props.onClose,
    _onOpen = props.onOpen,
    PickerComponent = props.PickerComponent,
    resource = props.resource,
    size = props.size,
    source = props.source,
    stringFormat = props.stringFormat,
    toolbarActions = props.toolbarActions,
    variant = props.variant,
    rest = (0, _objectWithoutProperties2["default"])(props, _excluded);
  var _useInput = (0, _reactAdmin.useInput)(_objectSpread({
      resource: resource,
      source: source
    }, rest)),
    field = _useInput.field,
    _useInput$fieldState = _useInput.fieldState,
    error = _useInput$fieldState.error,
    invalid = _useInput$fieldState.invalid,
    isTouched = _useInput$fieldState.isTouched,
    isSubmitted = _useInput.formState.isSubmitted,
    id = _useInput.id,
    isRequired = _useInput.isRequired;
  var _React$useState = React.useState(field.value ? new Date(field.value) : null),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    fragileValue = _React$useState2[0],
    setFragileValue = _React$useState2[1];
  var handleChange = React.useCallback(function (value) {
    return Date.parse(value) ? field.onChange('ISO' === stringFormat ? value.toISOString() : value.toString()) : field.onChange(null);
  }, [field, stringFormat]);
  var hasError = (isTouched || isSubmitted) && invalid;
  var renderHelperText = false !== helperText || (isTouched || isSubmitted) && invalid;
  return /*#__PURE__*/React.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDateFns.AdapterDateFns
  }, /*#__PURE__*/React.createElement(PickerComponent, (0, _extends2["default"])({}, (0, _reactAdmin.sanitizeInputRestProps)(rest), field, pickerOptions, {
    id: id,
    label: /*#__PURE__*/React.createElement(_reactAdmin.FieldTitle, {
      label: label,
      source: source,
      resource: resource,
      isRequired: isRequired
    }),
    slots: {
      actionBar: _CustomActionBar["default"]
    },
    slotProps: {
      textField: {
        variant: variant,
        size: size,
        margin: margin,
        fullWidth: fullWidth,
        onBlur: field.onBlur,
        error: hasError,
        helperText: renderHelperText ? /*#__PURE__*/React.createElement(_reactAdmin.InputHelperText, {
          touched: isTouched || isSubmitted,
          error: error === null || error === void 0 ? void 0 : error.message,
          helperText: helperText
        }) : null,
        InputProps: {
          endAdornment: /*#__PURE__*/React.createElement(_InputAdornment["default"], {
            position: "end"
          }, /*#__PURE__*/React.createElement(_Event["default"], null))
        }
      },
      actionBar: {
        actions: toolbarActions,
        handleChange: handleChange,
        setFragileValue: setFragileValue
      }
    },
    className: (0, _clsx["default"])('ra-input', "ra-input-".concat(source), className),
    value: field.value ? new Date(field.value) : null,
    onChange: function onChange(value, context) {
      return setFragileValue(value);
    },
    onOpen: function onOpen(value) {
      return _onOpen && 'function' === typeof _onOpen ? _onOpen(value) : null;
    },
    onClose: function onClose(value) {
      return _onClose && 'function' === typeof _onClose ? _onClose(value) : null;
    },
    onAccept: function onAccept(value) {
      return handleChange(fragileValue);
    }
  })));
};
Picker.propTypes = {
  onOpen: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  pickerOptions: _propTypes["default"].object,
  PickerComponent: _propTypes["default"].object.isRequired,
  stringFormat: _propTypes["default"].string,
  toolbarActions: _propTypes["default"].arrayOf(_propTypes["default"].string)
};
Picker.defaultProps = {
  className: '',
  format: _utils.formatDateTime,
  fullWidth: false,
  label: '',
  margin: 'dense',
  pickerOptions: {},
  parse: _utils.parseDateTime,
  resource: '',
  size: 'small',
  source: '',
  stringFormat: 'ISO',
  toolbarActions: ['cancel', 'clear', 'today', 'accept'],
  variant: 'filled'
};
var _default = Picker;
exports["default"] = _default;