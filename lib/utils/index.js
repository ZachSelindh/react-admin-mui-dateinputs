"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateTime = exports.formatDateTime = void 0;
var leftPad = function leftPad() {
  var nb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return function (value) {
    return ('0'.repeat(nb) + value).slice(-nb);
  };
};
var leftPad4 = leftPad(4);
var leftPad2 = leftPad(2);

/**
 * @param {Date} value value to convert
 * @returns {String} A standardized datetime (yyyy-MM-ddThh:mm), to be passed to an <input type="datetime-local" />
 */
var convertDateToString = function convertDateToString(value) {
  if (!(value instanceof Date) || isNaN(value.getDate())) {
    return '';
  }
  var yy = leftPad4(value.getFullYear());
  var MM = leftPad2(value.getMonth() + 1);
  var dd = leftPad2(value.getDate());
  var hh = leftPad2(value.getHours());
  var mm = leftPad2(value.getMinutes());
  return "".concat(yy, "-").concat(MM, "-").concat(dd, "T").concat(hh, ":").concat(mm);
};

// yyyy-MM-ddThh:mm
var dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * Converts a date from the Redux store, with timezone, to a date string
 * without timezone for use in an <input type="datetime-local" />.
 *
 * @param {Date | String} value date string or object
 */
var formatDateTime = function formatDateTime(value) {
  // null, undefined and empty string values should not go through convertDateToString
  // otherwise, it returns undefined and will make the input an uncontrolled one.
  if (null == value || '' === value) {
    return '';
  }
  if (value instanceof Date) {
    return convertDateToString(value);
  }
  // valid dates should not be converted
  if (dateTimeRegex.test(value)) {
    return value;
  }
  return convertDateToString(new Date(value));
};

/**
 * Converts a datetime string without timezone to a date object
 * with timezone, using the browser timezone.
 *
 * @param {String} value Date string, formatted as yyyy-MM-ddThh:mm
 * @return {Date}
 */
exports.formatDateTime = formatDateTime;
var parseDateTime = function parseDateTime(value) {
  return value ? new Date(value) : null;
};
exports.parseDateTime = parseDateTime;