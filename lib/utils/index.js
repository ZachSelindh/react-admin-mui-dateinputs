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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsZWZ0UGFkIiwibmIiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsInJlcGVhdCIsInNsaWNlIiwibGVmdFBhZDQiLCJsZWZ0UGFkMiIsImNvbnZlcnREYXRlVG9TdHJpbmciLCJEYXRlIiwiaXNOYU4iLCJnZXREYXRlIiwieXkiLCJnZXRGdWxsWWVhciIsIk1NIiwiZ2V0TW9udGgiLCJkZCIsImhoIiwiZ2V0SG91cnMiLCJtbSIsImdldE1pbnV0ZXMiLCJjb25jYXQiLCJkYXRlVGltZVJlZ2V4IiwiZm9ybWF0RGF0ZVRpbWUiLCJ0ZXN0IiwiZXhwb3J0cyIsInBhcnNlRGF0ZVRpbWUiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbGVmdFBhZCA9XHJcbiAgICAobmIgPSAyKSA9PlxyXG4gICAgdmFsdWUgPT5cclxuICAgICAgICAoJzAnLnJlcGVhdChuYikgKyB2YWx1ZSkuc2xpY2UoLW5iKTtcclxuY29uc3QgbGVmdFBhZDQgPSBsZWZ0UGFkKDQpO1xyXG5jb25zdCBsZWZ0UGFkMiA9IGxlZnRQYWQoMik7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtEYXRlfSB2YWx1ZSB2YWx1ZSB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgc3RhbmRhcmRpemVkIGRhdGV0aW1lICh5eXl5LU1NLWRkVGhoOm1tKSwgdG8gYmUgcGFzc2VkIHRvIGFuIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiAvPlxyXG4gKi9cclxuY29uc3QgY29udmVydERhdGVUb1N0cmluZyA9IHZhbHVlID0+IHtcclxuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgfHwgaXNOYU4odmFsdWUuZ2V0RGF0ZSgpKSkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB5eSA9IGxlZnRQYWQ0KHZhbHVlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgY29uc3QgTU0gPSBsZWZ0UGFkMih2YWx1ZS5nZXRNb250aCgpICsgMSk7XHJcbiAgICBjb25zdCBkZCA9IGxlZnRQYWQyKHZhbHVlLmdldERhdGUoKSk7XHJcbiAgICBjb25zdCBoaCA9IGxlZnRQYWQyKHZhbHVlLmdldEhvdXJzKCkpO1xyXG4gICAgY29uc3QgbW0gPSBsZWZ0UGFkMih2YWx1ZS5nZXRNaW51dGVzKCkpO1xyXG4gICAgcmV0dXJuIGAke3l5fS0ke01NfS0ke2RkfVQke2hofToke21tfWA7XHJcbn07XHJcblxyXG4vLyB5eXl5LU1NLWRkVGhoOm1tXHJcbmNvbnN0IGRhdGVUaW1lUmVnZXggPSAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn0kLztcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIGRhdGUgZnJvbSB0aGUgUmVkdXggc3RvcmUsIHdpdGggdGltZXpvbmUsIHRvIGEgZGF0ZSBzdHJpbmdcclxuICogd2l0aG91dCB0aW1lem9uZSBmb3IgdXNlIGluIGFuIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiAvPi5cclxuICpcclxuICogQHBhcmFtIHtEYXRlIHwgU3RyaW5nfSB2YWx1ZSBkYXRlIHN0cmluZyBvciBvYmplY3RcclxuICovXHJcbmNvbnN0IGZvcm1hdERhdGVUaW1lID0gKHZhbHVlOiBzdHJpbmcgfCBEYXRlKSA9PiB7XHJcbiAgICAvLyBudWxsLCB1bmRlZmluZWQgYW5kIGVtcHR5IHN0cmluZyB2YWx1ZXMgc2hvdWxkIG5vdCBnbyB0aHJvdWdoIGNvbnZlcnREYXRlVG9TdHJpbmdcclxuICAgIC8vIG90aGVyd2lzZSwgaXQgcmV0dXJucyB1bmRlZmluZWQgYW5kIHdpbGwgbWFrZSB0aGUgaW5wdXQgYW4gdW5jb250cm9sbGVkIG9uZS5cclxuICAgIGlmIChudWxsID09IHZhbHVlIHx8ICcnID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnREYXRlVG9TdHJpbmcodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gdmFsaWQgZGF0ZXMgc2hvdWxkIG5vdCBiZSBjb252ZXJ0ZWRcclxuICAgIGlmIChkYXRlVGltZVJlZ2V4LnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb252ZXJ0RGF0ZVRvU3RyaW5nKG5ldyBEYXRlKHZhbHVlKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBkYXRldGltZSBzdHJpbmcgd2l0aG91dCB0aW1lem9uZSB0byBhIGRhdGUgb2JqZWN0XHJcbiAqIHdpdGggdGltZXpvbmUsIHVzaW5nIHRoZSBicm93c2VyIHRpbWV6b25lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgRGF0ZSBzdHJpbmcsIGZvcm1hdHRlZCBhcyB5eXl5LU1NLWRkVGhoOm1tXHJcbiAqIEByZXR1cm4ge0RhdGV9XHJcbiAqL1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVGltZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiAodmFsdWUgPyBuZXcgRGF0ZSh2YWx1ZSkgOiBudWxsKTtcclxuXHJcbmV4cG9ydCB7IGZvcm1hdERhdGVUaW1lLCBwYXJzZURhdGVUaW1lIH07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUNULFNBREVBLE9BQU9BLENBQUE7RUFBQSxJQUNSQyxFQUFFLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUM7RUFBQSxPQUNQLFVBQUFHLEtBQUs7SUFBQSxPQUNELENBQUMsR0FBRyxDQUFDQyxNQUFNLENBQUNMLEVBQUUsQ0FBQyxHQUFHSSxLQUFLLEVBQUVFLEtBQUssQ0FBQyxDQUFDTixFQUFFLENBQUM7RUFBQTtBQUFBO0FBQzNDLElBQU1PLFFBQVEsR0FBR1IsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMzQixJQUFNUyxRQUFRLEdBQUdULE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTVUsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBR0wsS0FBSyxFQUFJO0VBQ2pDLElBQUksRUFBRUEsS0FBSyxZQUFZTSxJQUFJLENBQUMsSUFBSUMsS0FBSyxDQUFDUCxLQUFLLENBQUNRLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNwRCxPQUFPLEVBQUU7RUFDYjtFQUVBLElBQU1DLEVBQUUsR0FBR04sUUFBUSxDQUFDSCxLQUFLLENBQUNVLFdBQVcsQ0FBQyxDQUFDLENBQUM7RUFDeEMsSUFBTUMsRUFBRSxHQUFHUCxRQUFRLENBQUNKLEtBQUssQ0FBQ1ksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDekMsSUFBTUMsRUFBRSxHQUFHVCxRQUFRLENBQUNKLEtBQUssQ0FBQ1EsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNwQyxJQUFNTSxFQUFFLEdBQUdWLFFBQVEsQ0FBQ0osS0FBSyxDQUFDZSxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3JDLElBQU1DLEVBQUUsR0FBR1osUUFBUSxDQUFDSixLQUFLLENBQUNpQixVQUFVLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLFVBQUFDLE1BQUEsQ0FBVVQsRUFBRSxPQUFBUyxNQUFBLENBQUlQLEVBQUUsT0FBQU8sTUFBQSxDQUFJTCxFQUFFLE9BQUFLLE1BQUEsQ0FBSUosRUFBRSxPQUFBSSxNQUFBLENBQUlGLEVBQUU7QUFDeEMsQ0FBQzs7QUFFRDtBQUNBLElBQU1HLGFBQWEsR0FBRyxpQ0FBaUM7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBY0EsQ0FBSXBCLEtBQW9CLEVBQUs7RUFDN0M7RUFDQTtFQUNBLElBQUksSUFBSSxJQUFJQSxLQUFLLElBQUksRUFBRSxLQUFLQSxLQUFLLEVBQUU7SUFDL0IsT0FBTyxFQUFFO0VBQ2I7RUFFQSxJQUFJQSxLQUFLLFlBQVlNLElBQUksRUFBRTtJQUN2QixPQUFPRCxtQkFBbUIsQ0FBQ0wsS0FBSyxDQUFDO0VBQ3JDO0VBQ0E7RUFDQSxJQUFJbUIsYUFBYSxDQUFDRSxJQUFJLENBQUNyQixLQUFLLENBQUMsRUFBRTtJQUMzQixPQUFPQSxLQUFLO0VBQ2hCO0VBRUEsT0FBT0ssbUJBQW1CLENBQUMsSUFBSUMsSUFBSSxDQUFDTixLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkFzQixPQUFBLENBQUFGLGNBQUEsR0FBQUEsY0FBQTtBQVFBLElBQU1HLGFBQWEsR0FBRyxTQUFoQkEsYUFBYUEsQ0FBSXZCLEtBQWE7RUFBQSxPQUFNQSxLQUFLLEdBQUcsSUFBSU0sSUFBSSxDQUFDTixLQUFLLENBQUMsR0FBRyxJQUFJO0FBQUEsQ0FBQztBQUFDc0IsT0FBQSxDQUFBQyxhQUFBLEdBQUFBLGFBQUEifQ==