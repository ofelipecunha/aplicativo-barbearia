import {
  AuthService
} from "./chunk-7RHHINVH.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BE4EWPG2.js";
import {
  ApiService,
  environment
} from "./chunk-Y5F4OO7J.js";
import {
  RouterLink
} from "./chunk-ZLFHMEWZ.js";
import {
  CommonModule,
  CurrencyPipe,
  DecimalPipe,
  __spreadProps,
  __spreadValues,
  computed,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵpipeBindV,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4
} from "./chunk-6OXXDOK5.js";

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}

// node_modules/date-fns/esm/_lib/toInteger/index.js
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

// node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}

// node_modules/date-fns/esm/toDate/index.js
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/date-fns/esm/addDays/index.js
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

// node_modules/date-fns/esm/addMonths/index.js
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

// node_modules/date-fns/esm/addMilliseconds/index.js
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

// node_modules/date-fns/esm/_lib/defaultOptions/index.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

// node_modules/date-fns/esm/constants/index.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var minTime = -maxTime;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/date-fns/esm/isDate/index.js
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/esm/isValid/index.js
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

// node_modules/date-fns/esm/endOfMonth/index.js
function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/startOfMonth/index.js
function startOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/subMilliseconds/index.js
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

// node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

// node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

// node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCWeek/index.js
var MILLISECONDS_IN_WEEK2 = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
}

// node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}

// node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
var formatters = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var lightFormatters_default = formatters;

// node_modules/date-fns/esm/_lib/format/formatters/index.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters2 = {
  // Era
  G: function G(date, token, localize3) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize3.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize3.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize3.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize3) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize3.ordinalNumber(year, {
        unit: "year"
      });
    }
    return lightFormatters_default.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize3, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize3.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize3) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize3.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize3.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize3.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize3.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize3) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize3.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize3.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize3.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize3.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function M2(date, token, localize3) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters_default.M(date, token);
      case "Mo":
        return localize3.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize3.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize3.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize3.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize3) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize3.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize3.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize3.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize3.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize3, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize3.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize3) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize3.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize3) {
    if (token === "do") {
      return localize3.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return lightFormatters_default.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize3) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize3.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize3) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize3.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize3.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize3.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize3.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize3, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize3.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize3.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize3.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize3.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize3.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize3, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize3.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize3.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize3.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize3.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize3.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize3) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize3.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize3.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize3.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize3.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize3.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function a2(date, token, localize3) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize3) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize3) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize3.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function h2(date, token, localize3) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize3.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return lightFormatters_default.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize3) {
    if (token === "Ho") {
      return localize3.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return lightFormatters_default.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize3) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize3.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize3) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize3.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize3) {
    if (token === "mo") {
      return localize3.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return lightFormatters_default.m(date, token);
  },
  // Second
  s: function s2(date, token, localize3) {
    if (token === "so") {
      return localize3.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return lightFormatters_default.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return lightFormatters_default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters_default = formatters2;

// node_modules/date-fns/esm/_lib/format/longFormatters/index.js
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong3) {
  switch (pattern) {
    case "P":
      return formatLong3.date({
        width: "short"
      });
    case "PP":
      return formatLong3.date({
        width: "medium"
      });
    case "PPP":
      return formatLong3.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong3.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong3) {
  switch (pattern) {
    case "p":
      return formatLong3.time({
        width: "short"
      });
    case "pp":
      return formatLong3.time({
        width: "medium"
      });
    case "ppp":
      return formatLong3.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong3.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong3) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong3);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong3.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong3.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong3.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong3.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong3)).replace("{{time}}", timeLongFormatter(timePattern, formatLong3));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters_default = longFormatters;

// node_modules/date-fns/esm/_lib/protectedTokens/index.js
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

// node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance_default = formatDistance;

// node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong_default = formatLong;

// node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative_default = formatRelative;

// node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

// node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize_default = localize;

// node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}

// node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match_default = match;

// node_modules/date-fns/esm/locale/en-US/index.js
var locale = {
  code: "en-US",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var en_US_default = locale;

// node_modules/date-fns/esm/_lib/defaultLocale/index.js
var defaultLocale_default = en_US_default;

// node_modules/date-fns/esm/format/index.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale3 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale3.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale3.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale3,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale3.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters_default[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale3.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/esm/getDay/index.js
function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}

// node_modules/date-fns/esm/isSameMonth/index.js
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}

// node_modules/date-fns/esm/subDays/index.js
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

// node_modules/date-fns/esm/parseISO/index.js
function parseISO(argument, options) {
  var _options$additionalDi;
  requiredArgs(1, arguments);
  var additionalDigits = toInteger((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  }
  if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var date;
  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var timestamp = date.getTime();
  var time = 0;
  var offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time);
    var result = /* @__PURE__ */ new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
  var captures = dateString.match(regex);
  if (!captures) return {
    year: NaN,
    restDateString: ""
  };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null) return /* @__PURE__ */ new Date(NaN);
  var captures = dateString.match(dateRegex);
  if (!captures) return /* @__PURE__ */ new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return NaN;
  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === "+" ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// node_modules/date-fns/esm/subMonths/index.js
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

// node_modules/date-fns/esm/locale/pt-BR/_lib/formatDistance/index.js
var formatDistanceLocale2 = {
  lessThanXSeconds: {
    one: "menos de um segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "meio minuto",
  lessThanXMinutes: {
    one: "menos de um minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "cerca de 1 hora",
    other: "cerca de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dias"
  },
  aboutXWeeks: {
    one: "cerca de 1 semana",
    other: "cerca de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "cerca de 1 m\xEAs",
    other: "cerca de {{count}} meses"
  },
  xMonths: {
    one: "1 m\xEAs",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "cerca de 1 ano",
    other: "cerca de {{count}} anos"
  },
  xYears: {
    one: "1 ano",
    other: "{{count}} anos"
  },
  overXYears: {
    one: "mais de 1 ano",
    other: "mais de {{count}} anos"
  },
  almostXYears: {
    one: "quase 1 ano",
    other: "quase {{count}} anos"
  }
};
var formatDistance3 = function formatDistance4(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale2[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "em " + result;
    } else {
      return "h\xE1 " + result;
    }
  }
  return result;
};
var formatDistance_default2 = formatDistance3;

// node_modules/date-fns/esm/locale/pt-BR/_lib/formatLong/index.js
var dateFormats2 = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
var timeFormats2 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats2 = {
  full: "{{date}} '\xE0s' {{time}}",
  long: "{{date}} '\xE0s' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong2 = {
  date: buildFormatLongFn({
    formats: dateFormats2,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats2,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats2,
    defaultWidth: "full"
  })
};
var formatLong_default2 = formatLong2;

// node_modules/date-fns/esm/locale/pt-BR/_lib/formatRelative/index.js
var formatRelativeLocale2 = {
  lastWeek: function lastWeek(date) {
    var weekday = date.getUTCDay();
    var last = weekday === 0 || weekday === 6 ? "\xFAltimo" : "\xFAltima";
    return "'" + last + "' eeee '\xE0s' p";
  },
  yesterday: "'ontem \xE0s' p",
  today: "'hoje \xE0s' p",
  tomorrow: "'amanh\xE3 \xE0s' p",
  nextWeek: "eeee '\xE0s' p",
  other: "P"
};
var formatRelative3 = function formatRelative4(token, date, _baseDate, _options) {
  var format2 = formatRelativeLocale2[token];
  if (typeof format2 === "function") {
    return format2(date);
  }
  return format2;
};
var formatRelative_default2 = formatRelative3;

// node_modules/date-fns/esm/locale/pt-BR/_lib/localize/index.js
var eraValues2 = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "depois de cristo"]
};
var quarterValues2 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
};
var monthValues2 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  wide: ["janeiro", "fevereiro", "mar\xE7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
};
var dayValues2 = {
  narrow: ["D", "S", "T", "Q", "Q", "S", "S"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
  abbreviated: ["domingo", "segunda", "ter\xE7a", "quarta", "quinta", "sexta", "s\xE1bado"],
  wide: ["domingo", "segunda-feira", "ter\xE7a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s\xE1bado"]
};
var dayPeriodValues2 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "manh\xE3",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manh\xE3",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manh\xE3",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  }
};
var formattingDayPeriodValues2 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "da manh\xE3",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manh\xE3",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manh\xE3",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  }
};
var ordinalNumber3 = function ordinalNumber4(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  if ((options === null || options === void 0 ? void 0 : options.unit) === "week") {
    return number + "\xAA";
  }
  return number + "\xBA";
};
var localize2 = {
  ordinalNumber: ordinalNumber3,
  era: buildLocalizeFn({
    values: eraValues2,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues2,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback2(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues2,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues2,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues2,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues2,
    defaultFormattingWidth: "wide"
  })
};
var localize_default2 = localize2;

// node_modules/date-fns/esm/locale/pt-BR/_lib/match/index.js
var matchOrdinalNumberPattern2 = /^(\d+)[ºªo]?/i;
var parseOrdinalNumberPattern2 = /\d+/i;
var matchEraPatterns2 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
  wide: /^(antes de cristo|depois de cristo)/i
};
var parseEraPatterns2 = {
  any: [/^ac/i, /^dc/i],
  wide: [/^antes de cristo/i, /^depois de cristo/i]
};
var matchQuarterPatterns2 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns2 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns2 = {
  narrow: /^[jfmajsond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
};
var parseMonthPatterns2 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^fev/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dez/i]
};
var matchDayPatterns2 = {
  narrow: /^(dom|[23456]ª?|s[aá]b)/i,
  short: /^(dom|[23456]ª?|s[aá]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
  wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
};
var parseDayPatterns2 = {
  short: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  narrow: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[aá]b/i]
};
var matchDayPeriodPatterns2 = {
  narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
  any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
};
var parseDayPeriodPatterns2 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn|^meia[-\s]noite/i,
    noon: /^md|^meio[-\s]dia/i,
    morning: /manhã/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noite/i
  }
};
var match2 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern2,
    parsePattern: parseOrdinalNumberPattern2,
    valueCallback: function valueCallback3(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns2,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns2,
    defaultParseWidth: "any",
    valueCallback: function valueCallback4(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns2,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns2,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns2,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns2,
    defaultParseWidth: "any"
  })
};
var match_default2 = match2;

// node_modules/date-fns/esm/locale/pt-BR/index.js
var locale2 = {
  code: "pt-BR",
  formatDistance: formatDistance_default2,
  formatLong: formatLong_default2,
  formatRelative: formatRelative_default2,
  localize: localize_default2,
  match: match_default2,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var pt_BR_default = locale2;

// src/app/pages/dashboard-recepcao/dashboard-recepcao.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.id_atendimento;
var _forTrack2 = ($index, $item) => $item.descricao + $item.valor;
var _forTrack3 = ($index, $item) => $item.descricao + $item.quantidade;
var _c0 = (a0) => [a0, "BRL", "symbol", "1.2-2", "pt-BR"];
function DashboardRecepcaoComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 17);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r2.avatarUrl(), \u0275\u0275sanitizeUrl)("alt", (tmp_3_0 = (tmp_3_0 = ctx_r2.user()) == null ? null : tmp_3_0.nome) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "");
  }
}
function DashboardRecepcaoComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 35);
  }
}
function DashboardRecepcaoComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_57_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalRecebimento());
    });
    \u0275\u0275elementStart(1, "div", 51);
    \u0275\u0275element(2, "i", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 53)(4, "div", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 55);
    \u0275\u0275text(7, "Valor: ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 56);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_57_Template_button_click_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharToastRecebimento($event));
    });
    \u0275\u0275element(12, "i", 57);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("RECEBIMENTO para ", ctx_r2.recebimentoNotificacao().subtitulo || "Cliente", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(10, 2, ctx_r2.recebimentoNotificacao().valor, "1.2-2", "pt-BR"), "");
  }
}
function DashboardRecepcaoComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_59_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Abertura: R$ ", \u0275\u0275pipeBind3(2, 1, ctx_r2.valorAberturaCaixa(), "1.2-2", "pt-BR"), "");
  }
}
function DashboardRecepcaoComponent_Conditional_59_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "Caixa fechado");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_59_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "button", 103);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Conditional_16_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.abrirModalLancamentoManual();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(2, "i", 104);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Lan\xE7amento Manual");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 103);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Conditional_16_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.abrirModalSangria();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(6, "i", 105);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Sangria");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 103);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Conditional_16_Template_button_click_9_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.abrirModalRecebimentoLista();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(10, "i", 52);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "Recebimento");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 106);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Conditional_16_Template_button_click_13_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.abrirModalEncerrarCaixa();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(14, "i", 107);
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Encerrar Caixa");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardRecepcaoComponent_Conditional_59_Conditional_45_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("value", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.nome);
  }
}
function DashboardRecepcaoComponent_Conditional_59_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82)(1, "form", 108);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_59_Conditional_45_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarAgendaFiltro());
    });
    \u0275\u0275elementStart(2, "div", 109)(3, "label");
    \u0275\u0275text(4, "M\xEAs");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 109)(7, "label");
    \u0275\u0275text(8, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 111)(10, "option", 112);
    \u0275\u0275text(11, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, DashboardRecepcaoComponent_Conditional_59_Conditional_45_For_13_Template, 2, 2, "option", 113, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 109)(15, "label");
    \u0275\u0275text(16, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 114)(18, "option", 112);
    \u0275\u0275text(19, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 115);
    \u0275\u0275text(21, "AGENDADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 116);
    \u0275\u0275text(23, "CONFIRMADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 117);
    \u0275\u0275text(25, "CANCELADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 118);
    \u0275\u0275text(27, "FINALIZADO");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "button", 119);
    \u0275\u0275text(29, "Aplicar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.agendaFiltroForm);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.cabeleireiros());
  }
}
function DashboardRecepcaoComponent_Conditional_59_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r9.nomeCliente || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r9.cabeleireiro || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r9.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarDataHoraAgenda(a_r9.data_hora));
  }
}
function DashboardRecepcaoComponent_Conditional_59_ForEmpty_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 120);
    \u0275\u0275text(2, "Nenhum agendamento");
    \u0275\u0275elementEnd()();
  }
}
function DashboardRecepcaoComponent_Conditional_59_For_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 90)(1, "div", 121);
    \u0275\u0275element(2, "i", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 123)(4, "span", 124);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 125);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 126);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 127);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const f_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(f_r10.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r10.servico || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r10.hora);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.classeStatusFila(f_r10.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r10.status);
  }
}
function DashboardRecepcaoComponent_Conditional_59_ForEmpty_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 91);
    \u0275\u0275text(1, "Nenhum cliente na fila.");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_59_For_93_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 130);
  }
  if (rf & 2) {
    const p_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.produtoImagemUrl(p_r11), \u0275\u0275sanitizeUrl)("alt", p_r11.descricao || "Produto");
  }
}
function DashboardRecepcaoComponent_Conditional_59_For_93_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 131);
    \u0275\u0275element(1, "i", 132);
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_59_For_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 128);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 129);
    \u0275\u0275template(6, DashboardRecepcaoComponent_Conditional_59_For_93_Conditional_6_Template, 1, 2, "img", 130)(7, DashboardRecepcaoComponent_Conditional_59_For_93_Conditional_7_Template, 2, 0, "span", 131);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const p_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("estoque-baixo", ctx_r2.isEstoqueBaixo(p_r11));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r11.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_14_0 = p_r11.estoque) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.produtoImagemUrl(p_r11) ? 6 : 7);
  }
}
function DashboardRecepcaoComponent_Conditional_59_ForEmpty_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 133);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.searchProduto().trim() ? "Nenhum produto encontrado." : "Nenhum produto cadastrado.");
  }
}
function DashboardRecepcaoComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "section", 58)(2, "div", 59)(3, "div", 60)(4, "div", 61);
    \u0275\u0275element(5, "i", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 63)(7, "span", 64);
    \u0275\u0275text(8, "CAIXA DO DIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 65);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, DashboardRecepcaoComponent_Conditional_59_Conditional_12_Template, 3, 5, "span", 66)(13, DashboardRecepcaoComponent_Conditional_59_Conditional_13_Template, 2, 0, "span", 66);
    \u0275\u0275elementStart(14, "button", 67);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalCaixaDia());
    });
    \u0275\u0275text(15, "Ver atendimentos do dia");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(16, DashboardRecepcaoComponent_Conditional_59_Conditional_16_Template, 17, 0, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 69)(18, "div", 70);
    \u0275\u0275element(19, "i", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 64);
    \u0275\u0275text(21, "EM ESPERA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 72);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 66);
    \u0275\u0275text(25, "Clientes aguardando");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 69)(27, "div", 73);
    \u0275\u0275element(28, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 64);
    \u0275\u0275text(30, "AGENDAMENTOS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 72);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 66);
    \u0275\u0275text(34, "Este m\xEAs");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 74)(36, "div", 75)(37, "section", 76)(38, "div", 77)(39, "h3");
    \u0275\u0275text(40, "Agenda de Hoje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 78)(42, "div", 79)(43, "button", 80);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleAgendaFiltro());
    });
    \u0275\u0275element(44, "i", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275template(45, DashboardRecepcaoComponent_Conditional_59_Conditional_45_Template, 30, 1, "div", 82);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 83)(47, "table", 84)(48, "thead")(49, "tr")(50, "th");
    \u0275\u0275text(51, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "th");
    \u0275\u0275text(53, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "th");
    \u0275\u0275text(55, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "th");
    \u0275\u0275text(57, "Data/Hora");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(58, "tbody");
    \u0275\u0275repeaterCreate(59, DashboardRecepcaoComponent_Conditional_59_For_60_Template, 9, 4, "tr", null, _forTrack0, false, DashboardRecepcaoComponent_Conditional_59_ForEmpty_61_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(62, "section", 85)(63, "div", 86)(64, "h3");
    \u0275\u0275text(65, "Fila de Espera");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 87);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_59_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalFila());
    });
    \u0275\u0275text(67, "Ver todos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 88)(69, "ul", 89);
    \u0275\u0275repeaterCreate(70, DashboardRecepcaoComponent_Conditional_59_For_71_Template, 12, 6, "li", 90, _forTrack0, false, DashboardRecepcaoComponent_Conditional_59_ForEmpty_72_Template, 2, 0, "li", 91);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(73, "div", 92)(74, "section", 93)(75, "div", 94)(76, "h3");
    \u0275\u0275text(77, "Produtos em estoque");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 95)(79, "div", 96);
    \u0275\u0275element(80, "i", 31);
    \u0275\u0275elementStart(81, "input", 97);
    \u0275\u0275listener("ngModelChange", function DashboardRecepcaoComponent_Conditional_59_Template_input_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchProduto.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "div", 98)(83, "table", 99)(84, "thead")(85, "tr")(86, "th");
    \u0275\u0275text(87, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "th", 100);
    \u0275\u0275text(89, "Quantidade");
    \u0275\u0275elementEnd();
    \u0275\u0275element(90, "th", 101);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "tbody");
    \u0275\u0275repeaterCreate(92, DashboardRecepcaoComponent_Conditional_59_For_93_Template, 8, 5, "tr", 102, _forTrack0, false, DashboardRecepcaoComponent_Conditional_59_ForEmpty_94_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(11, 12, ctx_r2.saldoCaixa(), "1.2-2", "pt-BR"), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.caixaAberto() ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.caixaAberto() ? 16 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.clientesEmEspera());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.totalAgendamentosMes());
    \u0275\u0275advance(11);
    \u0275\u0275classProp("active", ctx_r2.agendaFiltroOpen());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.agendaFiltroOpen() ? 45 : -1);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.agendaListaCard());
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.filaItens());
    \u0275\u0275advance(11);
    \u0275\u0275property("ngModel", ctx_r2.searchProduto());
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.produtosEstoqueFiltrados());
  }
}
function DashboardRecepcaoComponent_Conditional_60_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.lancamentoManualErro());
  }
}
function DashboardRecepcaoComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_60_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalLancamentoManual());
    });
    \u0275\u0275elementStart(1, "div", 135);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_60_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "h3");
    \u0275\u0275text(4, "Lan\xE7amento Manual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 137);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_60_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalLancamentoManual());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 138);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_60_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarLancamentoManual());
    });
    \u0275\u0275elementStart(8, "div", 109)(9, "label");
    \u0275\u0275text(10, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 139);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 109)(13, "label");
    \u0275\u0275text(14, "Valor (obrigat\xF3rio)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 140);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, DashboardRecepcaoComponent_Conditional_60_Conditional_16_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(17, "div", 142)(18, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_60_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalLancamentoManual());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 144);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx_r2.lancamentoManualForm);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r2.lancamentoManualErro() ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.lancamentoManualSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.lancamentoManualSalvando() ? "Salvando..." : "SALVAR");
  }
}
function DashboardRecepcaoComponent_Conditional_61_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.sangriaErro());
  }
}
function DashboardRecepcaoComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_61_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalSangria());
    });
    \u0275\u0275elementStart(1, "div", 145);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_61_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "h3");
    \u0275\u0275text(4, "Sangria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 137);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_61_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalSangria());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 138);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_61_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarSangria());
    });
    \u0275\u0275elementStart(8, "div", 109)(9, "label");
    \u0275\u0275text(10, "Valor (obrigat\xF3rio)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 140);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 109)(13, "label");
    \u0275\u0275text(14, "Observa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, DashboardRecepcaoComponent_Conditional_61_Conditional_16_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(17, "div", 142)(18, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_61_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalSangria());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 144);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx_r2.sangriaForm);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r2.sangriaErro() ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.sangriaSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.sangriaSalvando() ? "Salvando..." : "SALVAR");
  }
}
function DashboardRecepcaoComponent_Conditional_62_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.encerrarCaixaErro());
  }
}
function DashboardRecepcaoComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_62_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalEncerrarCaixa());
    });
    \u0275\u0275elementStart(1, "div", 145);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_62_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "h3");
    \u0275\u0275text(4, "Encerrar Caixa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 137);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_62_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalEncerrarCaixa());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 138);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_62_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmarEncerrarCaixa());
    });
    \u0275\u0275elementStart(8, "div", 109)(9, "label");
    \u0275\u0275text(10, "Valor de fechamento (saldo atual)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 147);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 109)(14, "label");
    \u0275\u0275text(15, "Observa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, DashboardRecepcaoComponent_Conditional_62_Conditional_17_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(18, "div", 142)(19, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_62_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalEncerrarCaixa());
    });
    \u0275\u0275text(20, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 148);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx_r2.encerrarCaixaForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", "R$ " + \u0275\u0275pipeBind3(12, 5, ctx_r2.saldoCaixa(), "1.2-2", "pt-BR"));
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.encerrarCaixaErro() ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.encerrarCaixaSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.encerrarCaixaSalvando() ? "Encerrando..." : "ENCERRAR CAIXA");
  }
}
function DashboardRecepcaoComponent_Conditional_63_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 154);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 159);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.recebimentoErro());
  }
}
function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 155)(1, "p");
    \u0275\u0275text(2, "Cliente: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Valor: ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Forma de pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 157)(13, "button", 158);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("DINHEIRO"));
    });
    \u0275\u0275text(14, "Dinheiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 158);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("PIX"));
    });
    \u0275\u0275text(16, "Pix");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 158);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("CARTAO"));
    });
    \u0275\u0275text(18, "Cart\xE3o");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, DashboardRecepcaoComponent_Conditional_63_Conditional_9_Conditional_19_Template, 2, 1, "p", 159);
    \u0275\u0275elementStart(20, "div", 160)(21, "button", 161);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.voltarListaEncerrados());
    });
    \u0275\u0275text(22, "Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 162);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmarRecebimentoEncerrado());
    });
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedEncerradoParaRec().nome || "Cliente");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(9, 11, ctx_r2.selectedEncerradoParaRec().total, "1.2-2", "pt-BR"), "");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "DINHEIRO");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "PIX");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "CARTAO");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.recebimentoErro() ? 19 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.recebimentoCarregando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.recebimentoCarregando() ? "Salvando..." : "Confirmar recebimento", " ");
  }
}
function DashboardRecepcaoComponent_Conditional_63_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 165);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Conditional_10_For_2_Template_div_click_0_listener() {
      const item_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selecionarEncerradoParaRec(item_r18));
    });
    \u0275\u0275elementStart(1, "span", 166);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 167);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "i", 168);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r18 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.nome || "Cliente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(5, 2, item_r18.total, "1.2-2", "pt-BR"), "");
  }
}
function DashboardRecepcaoComponent_Conditional_63_Conditional_10_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 164);
    \u0275\u0275text(1, "Nenhum atendimento aguardando recebimento.");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_63_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156);
    \u0275\u0275repeaterCreate(1, DashboardRecepcaoComponent_Conditional_63_Conditional_10_For_2_Template, 7, 6, "div", 163, _forTrack1, false, DashboardRecepcaoComponent_Conditional_63_Conditional_10_ForEmpty_3_Template, 2, 0, "p", 164);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.listaEncerrados());
  }
}
function DashboardRecepcaoComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimentoLista());
    });
    \u0275\u0275elementStart(1, "div", 150);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 151)(3, "h3");
    \u0275\u0275text(4, "Receber pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 152);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_63_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimentoLista());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 153);
    \u0275\u0275template(8, DashboardRecepcaoComponent_Conditional_63_Conditional_8_Template, 2, 0, "p", 154)(9, DashboardRecepcaoComponent_Conditional_63_Conditional_9_Template, 25, 15, "div", 155)(10, DashboardRecepcaoComponent_Conditional_63_Conditional_10_Template, 4, 1, "div", 156);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r2.carregandoEncerrados() ? 8 : ctx_r2.selectedEncerradoParaRec() ? 9 : 10);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 175);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 187);
    \u0275\u0275text(1, "Carregando servi\xE7os e produtos...");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r22 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r22.descricao, " \u2014 ", \u0275\u0275pipeBindV(2, 2, \u0275\u0275pureFunction1(8, _c0, s_r22.valor)), "");
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 188)(1, "strong");
    \u0275\u0275text(2, "Servi\xE7os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275repeaterCreate(4, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_For_5_Template, 3, 10, "li", null, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const detalhe_r23 = \u0275\u0275readContextLet(0);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(detalhe_r23.servicos);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4("", p_r24.descricao, " \u2014 ", p_r24.quantidade, " x ", \u0275\u0275pipeBindV(2, 4, \u0275\u0275pureFunction1(16, _c0, p_r24.valor)), " = ", \u0275\u0275pipeBindV(3, 10, \u0275\u0275pureFunction1(18, _c0, p_r24.subtotal)), "");
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 188)(1, "strong");
    \u0275\u0275text(2, "Produtos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275repeaterCreate(4, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_For_5_Template, 4, 20, "li", null, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const detalhe_r23 = \u0275\u0275readContextLet(0);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(detalhe_r23.produtos);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 189);
    \u0275\u0275text(1, "Nenhum servi\xE7o ou produto lan\xE7ado.");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_Template, 6, 0, "div", 188)(1, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_Template, 6, 0, "div", 188)(2, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_2_Template, 2, 0, "p", 189);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const detalhe_r23 = \u0275\u0275readContextLet(0);
    \u0275\u0275conditional(detalhe_r23.servicos && detalhe_r23.servicos.length > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(detalhe_r23.produtos && detalhe_r23.produtos.length > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((!detalhe_r23.servicos || detalhe_r23.servicos.length === 0) && (!detalhe_r23.produtos || detalhe_r23.produtos.length === 0) ? 2 : -1);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0);
    \u0275\u0275template(1, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Template, 3, 3);
  }
  if (rf & 2) {
    const item_r21 = \u0275\u0275nextContext(2).$implicit;
    const detalhe_r25 = \u0275\u0275storeLet(\u0275\u0275nextContext(3).detalheAtendimentoMap()[item_r21.id_atendimento]);
    \u0275\u0275advance();
    \u0275\u0275conditional(detalhe_r25 ? 1 : -1);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 186);
    \u0275\u0275template(1, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_1_Template, 2, 0, "p", 187)(2, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Conditional_2_Template, 2, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.carregandoDetalheId() === item_r21.id_atendimento ? 1 : 2);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 176)(1, "div", 178);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Template_div_click_1_listener() {
      const item_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleDetalheAtendimento(item_r21.id_atendimento));
    });
    \u0275\u0275elementStart(2, "div", 179);
    \u0275\u0275element(3, "i", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 180)(5, "span", 181);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 182);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 183);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 184);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "i", 185);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Conditional_14_Template, 3, 1, "div", 186);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r21.nome_cliente || "Cliente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarHoraAgenda(item_r21.data_hora));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.servicos || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarValorAtendimento(item_r21.total));
    \u0275\u0275advance();
    \u0275\u0275classProp("pi-chevron-down", ctx_r2.atendimentoExpandidoId() !== item_r21.id_atendimento)("pi-chevron-up", ctx_r2.atendimentoExpandidoId() === item_r21.id_atendimento);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.atendimentoExpandidoId() === item_r21.id_atendimento ? 14 : -1);
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 177);
    \u0275\u0275text(1, "Nenhum atendimento neste dia.");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_64_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DashboardRecepcaoComponent_Conditional_64_Conditional_9_For_1_Template, 15, 9, "div", 176, _forTrack1, false, DashboardRecepcaoComponent_Conditional_64_Conditional_9_ForEmpty_2_Template, 2, 0, "p", 177);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.listaAtendimentosDia());
  }
}
function DashboardRecepcaoComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 169);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_64_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAtendimentosDia());
    })("keydown.escape", function DashboardRecepcaoComponent_Conditional_64_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAtendimentosDia());
    });
    \u0275\u0275elementStart(1, "div", 170);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_64_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r19);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 171)(3, "h3", 172);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 173);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_64_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAtendimentosDia());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 174);
    \u0275\u0275template(8, DashboardRecepcaoComponent_Conditional_64_Conditional_8_Template, 2, 0, "p", 175)(9, DashboardRecepcaoComponent_Conditional_64_Conditional_9_Template, 3, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Atendimentos em ", ctx_r2.formatarDataTituloModal(ctx_r2.dataSelecionadaAtendimentos()), "");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.carregandoAtendimentosDia() ? 8 : 9);
  }
}
function DashboardRecepcaoComponent_Conditional_65_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 90)(1, "div", 121);
    \u0275\u0275element(2, "i", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 123)(4, "span", 124);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 125);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 126);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 127);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 196);
    \u0275\u0275element(13, "i", 197);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r27 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(f_r27.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r27.servico || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r27.hora);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.classeStatusFila(f_r27.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r27.status);
  }
}
function DashboardRecepcaoComponent_Conditional_65_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 91);
    \u0275\u0275text(1, "Nenhum cliente na fila.");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 190);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_65_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFila());
    });
    \u0275\u0275elementStart(1, "div", 191);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_65_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r26);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 192)(3, "h3");
    \u0275\u0275text(4, "Fila de Espera");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 193);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_65_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFila());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 194)(8, "ul", 195);
    \u0275\u0275repeaterCreate(9, DashboardRecepcaoComponent_Conditional_65_For_10_Template, 14, 6, "li", 90, _forTrack0, false, DashboardRecepcaoComponent_Conditional_65_ForEmpty_11_Template, 2, 0, "li", 91);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r2.filaItens());
  }
}
function DashboardRecepcaoComponent_Conditional_66_For_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 206);
  }
  if (rf & 2) {
    const p_r29 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.produtoImagemUrl(p_r29), \u0275\u0275sanitizeUrl)("alt", p_r29.descricao || "Produto");
  }
}
function DashboardRecepcaoComponent_Conditional_66_For_22_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 207);
    \u0275\u0275element(1, "i", 132);
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_66_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 205)(1, "td", 129);
    \u0275\u0275template(2, DashboardRecepcaoComponent_Conditional_66_For_22_Conditional_2_Template, 1, 2, "img", 206)(3, DashboardRecepcaoComponent_Conditional_66_For_22_Conditional_3_Template, 2, 0, "span", 207);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 208);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 208);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const p_r29 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.produtoImagemUrl(p_r29) ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r29.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_14_0 = p_r29.estoque) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(10, 4, \u0275\u0275pureFunction1(10, _c0, p_r29.valor_venda)));
  }
}
function DashboardRecepcaoComponent_Conditional_66_ForEmpty_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 209);
    \u0275\u0275text(2, "Nenhum produto com estoque baixo no momento.");
    \u0275\u0275elementEnd()();
  }
}
function DashboardRecepcaoComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_66_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalEstoqueBaixo());
    });
    \u0275\u0275elementStart(1, "div", 198);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_66_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r28);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 199)(3, "h3");
    \u0275\u0275text(4, "Produtos com Estoque Baixo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 200);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_66_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalEstoqueBaixo());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 201)(8, "p", 202);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "table", 203)(11, "thead")(12, "tr");
    \u0275\u0275element(13, "th", 101);
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 204);
    \u0275\u0275text(17, "Quantidade");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 204);
    \u0275\u0275text(19, "Valor");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275repeaterCreate(21, DashboardRecepcaoComponent_Conditional_66_For_22_Template, 11, 12, "tr", 205, _forTrack0, false, DashboardRecepcaoComponent_Conditional_66_ForEmpty_23_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("Itens com quantidade igual ou abaixo de ", ctx_r2.ESTOQUE_BAIXO_LIMITE, " unidades.");
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r2.produtosEstoqueBaixo());
  }
}
function DashboardRecepcaoComponent_Conditional_67_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 215);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.produtoErro());
  }
}
function DashboardRecepcaoComponent_Conditional_67_For_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 206);
  }
  if (rf & 2) {
    const p_r32 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.produtoImagemUrl(p_r32), \u0275\u0275sanitizeUrl)("alt", p_r32.descricao || "Produto");
  }
}
function DashboardRecepcaoComponent_Conditional_67_For_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 207);
    \u0275\u0275element(1, "i", 132);
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_67_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 129);
    \u0275\u0275template(2, DashboardRecepcaoComponent_Conditional_67_For_30_Conditional_2_Template, 1, 2, "img", 206)(3, DashboardRecepcaoComponent_Conditional_67_For_30_Conditional_3_Template, 2, 0, "span", 207);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 208);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 208);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 217)(12, "button", 218);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_67_For_30_Template_button_click_12_listener() {
      const p_r32 = \u0275\u0275restoreView(_r31).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirModalEditarProduto(p_r32));
    });
    \u0275\u0275element(13, "i", 219);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 220);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_67_For_30_Template_button_click_14_listener() {
      const p_r32 = \u0275\u0275restoreView(_r31).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.excluirProduto(p_r32));
    });
    \u0275\u0275element(15, "i", 221);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const p_r32 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.produtoImagemUrl(p_r32) ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r32.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(8, 4, \u0275\u0275pureFunction1(10, _c0, p_r32.valor_venda)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_15_0 = p_r32.estoque) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : 0);
  }
}
function DashboardRecepcaoComponent_Conditional_67_ForEmpty_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 222);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.searchProdutoModal().trim() ? "Nenhum produto encontrado." : "Nenhum produto cadastrado.");
  }
}
function DashboardRecepcaoComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_67_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalProdutos());
    });
    \u0275\u0275elementStart(1, "div", 198);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_67_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r30);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 199)(3, "h3");
    \u0275\u0275text(4, "Produtos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 200);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_67_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalProdutos());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 210)(8, "div", 211);
    \u0275\u0275element(9, "i", 31);
    \u0275\u0275elementStart(10, "input", 212);
    \u0275\u0275listener("ngModelChange", function DashboardRecepcaoComponent_Conditional_67_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchProdutoModal.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 213);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_67_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalNovoProduto());
    });
    \u0275\u0275element(12, "i", 214);
    \u0275\u0275text(13, " Cadastrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, DashboardRecepcaoComponent_Conditional_67_Conditional_14_Template, 2, 1, "p", 215);
    \u0275\u0275elementStart(15, "div", 201)(16, "table", 203)(17, "thead")(18, "tr");
    \u0275\u0275element(19, "th", 101);
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 204);
    \u0275\u0275text(23, "Valor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 204);
    \u0275\u0275text(25, "Estoque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 216);
    \u0275\u0275text(27, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "tbody");
    \u0275\u0275repeaterCreate(29, DashboardRecepcaoComponent_Conditional_67_For_30_Template, 16, 12, "tr", null, _forTrack0, false, DashboardRecepcaoComponent_Conditional_67_ForEmpty_31_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r2.searchProdutoModal());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.produtoErro() && !ctx_r2.produtoFormModalOpen() ? 14 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.produtosFiltrados());
  }
}
function DashboardRecepcaoComponent_Conditional_68_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 230);
    \u0275\u0275text(1, "Imagem selecionada");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_68_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.produtoErro());
  }
}
function DashboardRecepcaoComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 223);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_68_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormProduto());
    });
    \u0275\u0275elementStart(1, "div", 145);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_68_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r33);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 137);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_68_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormProduto());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 138);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_68_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarProduto());
    });
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Descri\xE7\xE3o *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 224);
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Valor de venda (R$) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 225);
    \u0275\u0275listener("input", function DashboardRecepcaoComponent_Conditional_68_Template_input_input_13_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onValorVendaInput($event.target.value));
    })("blur", function DashboardRecepcaoComponent_Conditional_68_Template_input_blur_13_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onValorVendaBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15, "Estoque *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 226);
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 227)(20, "input", 228);
    \u0275\u0275listener("change", function DashboardRecepcaoComponent_Conditional_68_Template_input_change_20_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileProdutoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 229);
    \u0275\u0275text(22, "IMAGEM");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, DashboardRecepcaoComponent_Conditional_68_Conditional_23_Template, 2, 0, "p", 230)(24, DashboardRecepcaoComponent_Conditional_68_Conditional_24_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(25, "div", 142)(26, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_68_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormProduto());
    });
    \u0275\u0275text(27, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 144);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.produtoEditId() != null ? "Editar Produto" : "Novo Produto");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.produtoForm);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.valorVendaMask());
    \u0275\u0275advance(10);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r2.produtoForm.get("imagem")) == null ? null : tmp_5_0.value) ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.produtoErro() ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.produtoSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.produtoSalvando() ? "Salvando..." : "Salvar");
  }
}
function DashboardRecepcaoComponent_Conditional_69_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 215);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.servicoErro());
  }
}
function DashboardRecepcaoComponent_Conditional_69_For_28_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 206);
  }
  if (rf & 2) {
    const s_r36 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.servicoImagemUrl(s_r36), \u0275\u0275sanitizeUrl)("alt", s_r36.descricao || "Servi\xE7o");
  }
}
function DashboardRecepcaoComponent_Conditional_69_For_28_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 207);
    \u0275\u0275element(1, "i", 11);
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_69_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 129);
    \u0275\u0275template(2, DashboardRecepcaoComponent_Conditional_69_For_28_Conditional_2_Template, 1, 2, "img", 206)(3, DashboardRecepcaoComponent_Conditional_69_For_28_Conditional_3_Template, 2, 0, "span", 207);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 208);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 217)(10, "button", 218);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_69_For_28_Template_button_click_10_listener() {
      const s_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirModalEditarServico(s_r36));
    });
    \u0275\u0275element(11, "i", 219);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 220);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_69_For_28_Template_button_click_12_listener() {
      const s_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.excluirServico(s_r36));
    });
    \u0275\u0275element(13, "i", 221);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r36 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.servicoImagemUrl(s_r36) ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r36.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(8, 3, \u0275\u0275pureFunction1(9, _c0, s_r36.valor)));
  }
}
function DashboardRecepcaoComponent_Conditional_69_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 209);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.searchServicoModal().trim() ? "Nenhum servi\xE7o encontrado." : "Nenhum servi\xE7o cadastrado.");
  }
}
function DashboardRecepcaoComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_69_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalServicos());
    });
    \u0275\u0275elementStart(1, "div", 198);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_69_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r34);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 199)(3, "h3");
    \u0275\u0275text(4, "Servi\xE7os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 200);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_69_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalServicos());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 210)(8, "div", 211);
    \u0275\u0275element(9, "i", 31);
    \u0275\u0275elementStart(10, "input", 231);
    \u0275\u0275listener("ngModelChange", function DashboardRecepcaoComponent_Conditional_69_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchServicoModal.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 213);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_69_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalNovoServico());
    });
    \u0275\u0275element(12, "i", 214);
    \u0275\u0275text(13, " Cadastrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, DashboardRecepcaoComponent_Conditional_69_Conditional_14_Template, 2, 1, "p", 215);
    \u0275\u0275elementStart(15, "div", 201)(16, "table", 203)(17, "thead")(18, "tr");
    \u0275\u0275element(19, "th", 101);
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 204);
    \u0275\u0275text(23, "Valor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 216);
    \u0275\u0275text(25, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody");
    \u0275\u0275repeaterCreate(27, DashboardRecepcaoComponent_Conditional_69_For_28_Template, 14, 11, "tr", null, _forTrack0, false, DashboardRecepcaoComponent_Conditional_69_ForEmpty_29_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r2.searchServicoModal());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.servicoErro() && !ctx_r2.servicoFormModalOpen() ? 14 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.servicosFiltrados());
  }
}
function DashboardRecepcaoComponent_Conditional_70_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 230);
    \u0275\u0275text(1, "Imagem selecionada");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_70_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.servicoErro());
  }
}
function DashboardRecepcaoComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 223);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_70_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormServico());
    });
    \u0275\u0275elementStart(1, "div", 145);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_70_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r37);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 137);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_70_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormServico());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 138);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_70_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarServico());
    });
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Descri\xE7\xE3o *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 232);
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Valor (R$) *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 140);
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15, "Imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 227)(17, "input", 228);
    \u0275\u0275listener("change", function DashboardRecepcaoComponent_Conditional_70_Template_input_change_17_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileServicoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 233);
    \u0275\u0275text(19, "Enviar imagem");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, DashboardRecepcaoComponent_Conditional_70_Conditional_20_Template, 2, 0, "p", 230)(21, DashboardRecepcaoComponent_Conditional_70_Conditional_21_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(22, "div", 142)(23, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_70_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormServico());
    });
    \u0275\u0275text(24, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 144);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.servicoEditId() != null ? "Editar Servi\xE7o" : "Novo Servi\xE7o");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.servicoForm);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.servicoForm.get("imagem")) == null ? null : tmp_4_0.value) ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.servicoErro() ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.servicoSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.servicoSalvando() ? "Salvando..." : "Salvar");
  }
}
function DashboardRecepcaoComponent_Conditional_71_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 243);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r40 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r40.subtitulo);
  }
}
function DashboardRecepcaoComponent_Conditional_71_For_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 244);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r40 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(2, 1, n_r40.valor, "1.2-2", "pt-BR"), "");
  }
}
function DashboardRecepcaoComponent_Conditional_71_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 241);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_71_For_9_Template_div_click_0_listener() {
      const n_r40 = \u0275\u0275restoreView(_r39).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.marcarNotificacaoLida(n_r40));
    });
    \u0275\u0275elementStart(1, "div", 242);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DashboardRecepcaoComponent_Conditional_71_For_9_Conditional_3_Template, 2, 1, "div", 243)(4, DashboardRecepcaoComponent_Conditional_71_For_9_Conditional_4_Template, 3, 5, "div", 244);
    \u0275\u0275elementStart(5, "div", 245);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const n_r40 = ctx.$implicit;
    \u0275\u0275classProp("lida", n_r40.lido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r40.titulo);
    \u0275\u0275advance();
    \u0275\u0275conditional(n_r40.subtitulo ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(n_r40.valor != null ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r40.tempo_atras);
  }
}
function DashboardRecepcaoComponent_Conditional_71_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 240);
    \u0275\u0275text(1, "Nenhuma notifica\xE7\xE3o.");
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 234);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_71_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNotificacoes());
    });
    \u0275\u0275elementStart(1, "div", 235);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_71_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r38);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 236)(3, "h3");
    \u0275\u0275text(4, "Notifica\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 237);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_71_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNotificacoes());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 238);
    \u0275\u0275repeaterCreate(8, DashboardRecepcaoComponent_Conditional_71_For_9_Template, 7, 6, "div", 239, _forTrack0, false, DashboardRecepcaoComponent_Conditional_71_ForEmpty_10_Template, 2, 0, "p", 240);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r2.notificacoes());
  }
}
function DashboardRecepcaoComponent_Conditional_72_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 159);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.recebimentoErro());
  }
}
function DashboardRecepcaoComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 246);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    });
    \u0275\u0275elementStart(1, "div", 247);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r41);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 151)(3, "h3");
    \u0275\u0275text(4, "Receber pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 152);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 153)(8, "p");
    \u0275\u0275text(9, "Cliente: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13, "Valor: ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Forma de pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 157)(20, "button", 158);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("DINHEIRO"));
    });
    \u0275\u0275text(21, "Dinheiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 158);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("PIX"));
    });
    \u0275\u0275text(23, "Pix");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 158);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("CARTAO"));
    });
    \u0275\u0275text(25, "Cart\xE3o");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, DashboardRecepcaoComponent_Conditional_72_Conditional_26_Template, 2, 1, "p", 159);
    \u0275\u0275elementStart(27, "div", 160)(28, "button", 161);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    });
    \u0275\u0275text(29, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 162);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_72_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmarRecebimentoNotificacao());
    });
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.recebimentoNotificacao().subtitulo || "Cliente");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(16, 11, ctx_r2.recebimentoNotificacao().valor, "1.2-2", "pt-BR"), "");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "DINHEIRO");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "PIX");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "CARTAO");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.recebimentoErro() ? 26 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.recebimentoCarregando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.recebimentoCarregando() ? "Salvando..." : "Confirmar recebimento", " ");
  }
}
function DashboardRecepcaoComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 248);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_73_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAgenda());
    })("keydown.escape", function DashboardRecepcaoComponent_Conditional_73_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAgenda());
    });
    \u0275\u0275elementStart(1, "div", 198);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_73_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r42);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 199)(3, "h3");
    \u0275\u0275text(4, "Agenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 249);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_73_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAgenda());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 201)(8, "p", 250);
    \u0275\u0275text(9, "Consulte a se\xE7\xE3o ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11, "Agenda de Hoje");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " no painel principal para os agendamentos do dia. Use o card ");
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14, "Novo Agendamento");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " para cadastrar.");
    \u0275\u0275elementEnd()()()();
  }
}
function DashboardRecepcaoComponent_Conditional_74_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 257);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirConfigDadosPessoais());
    });
    \u0275\u0275element(1, "i", 122);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Dados Pessoais");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "i", 168);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 257);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirConfigSegurancaSenha());
    });
    \u0275\u0275element(6, "i", 258);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Seguran\xE7a e Senha");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "i", 168);
    \u0275\u0275elementEnd();
  }
}
function DashboardRecepcaoComponent_Conditional_74_Conditional_9_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configDadosErro());
  }
}
function DashboardRecepcaoComponent_Conditional_74_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 256)(1, "button", 259);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275element(2, "i", 260);
    \u0275\u0275text(3, " Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5, "Dados Pessoais");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 108);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_74_Conditional_9_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.salvarConfigDadosPessoais());
    });
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "Nome *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 261);
    \u0275\u0275elementStart(10, "p", 262);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 262);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardRecepcaoComponent_Conditional_74_Conditional_9_Conditional_14_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(15, "div", 142)(16, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Conditional_9_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275text(17, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 144);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r2.configDadosForm);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Login: ", ctx_r2.configUsuarioLogin(), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Perfil: ", ctx_r2.configUsuarioPerfil(), "");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.configDadosErro() ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.configDadosLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configDadosLoading() ? "Salvando..." : "Salvar");
  }
}
function DashboardRecepcaoComponent_Conditional_74_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configSenhaErro());
  }
}
function DashboardRecepcaoComponent_Conditional_74_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 256)(1, "button", 259);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275element(2, "i", 260);
    \u0275\u0275text(3, " Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5, "Seguran\xE7a e Senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 108);
    \u0275\u0275listener("ngSubmit", function DashboardRecepcaoComponent_Conditional_74_Conditional_10_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.salvarConfigSenha());
    });
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "Senha atual *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 263);
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Nova senha *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 264);
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "Confirmar nova senha *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 265);
    \u0275\u0275template(16, DashboardRecepcaoComponent_Conditional_74_Conditional_10_Conditional_16_Template, 2, 1, "p", 141);
    \u0275\u0275elementStart(17, "div", 142)(18, "button", 143);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Conditional_10_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 144);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r2.configSenhaForm);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r2.configSenhaErro() ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.configSenhaLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configSenhaLoading() ? "Alterando..." : "Alterar senha");
  }
}
function DashboardRecepcaoComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 251);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalConfiguracoes());
    })("keydown.escape", function DashboardRecepcaoComponent_Conditional_74_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalConfiguracoes());
    });
    \u0275\u0275elementStart(1, "div", 252);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r43);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 253)(3, "h3");
    \u0275\u0275text(4, "Configura\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 254);
    \u0275\u0275listener("click", function DashboardRecepcaoComponent_Conditional_74_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalConfiguracoes());
    });
    \u0275\u0275element(6, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 255);
    \u0275\u0275template(8, DashboardRecepcaoComponent_Conditional_74_Conditional_8_Template, 10, 0)(9, DashboardRecepcaoComponent_Conditional_74_Conditional_9_Template, 20, 6, "div", 256)(10, DashboardRecepcaoComponent_Conditional_74_Conditional_10_Template, 22, 4, "div", 256);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r2.configSubView() === "menu" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.configSubView() === "dados" ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.configSubView() === "senha" ? 10 : -1);
  }
}
var DashboardRecepcaoComponent = class _DashboardRecepcaoComponent {
  constructor(auth, api, fb) {
    this.auth = auth;
    this.api = api;
    this.fb = fb;
    this.user = this.auth.user;
    this.loading = signal(true);
    this.saldoCaixa = signal(0);
    this.caixaAberto = signal(null);
    this.percentualCaixa = signal(null);
    this.agendaHoje = signal([]);
    this.filaItens = signal([]);
    this.notificacoes = signal([]);
    this.notificacoesModalOpen = signal(false);
    this.filaModalOpen = signal(false);
    this.recebimentoNotificacao = signal(null);
    this.recebimentoModalOpen = signal(false);
    this.tipoPagamentoRecebimento = signal("DINHEIRO");
    this.recebimentoCarregando = signal(false);
    this.recebimentoErro = signal("");
    this.recebimentoIntervalId = null;
    this.ultimoRecebimentoId = null;
    this.emEsperaCount = signal(0);
    this.agendamentosHojeCount = signal(0);
    this.estoqueBaixoCount = signal(0);
    this.atendidosCount = signal(0);
    this.dashboard = signal(null);
    this.agendaListaMesAtual = signal([]);
    this.atendimentosDiaModalOpen = signal(false);
    this.dataSelecionadaAtendimentos = signal("");
    this.listaAtendimentosDia = signal([]);
    this.carregandoAtendimentosDia = signal(false);
    this.atendimentoExpandidoId = signal(null);
    this.detalheAtendimentoMap = signal({});
    this.carregandoDetalheId = signal(null);
    this.produtosModalOpen = signal(false);
    this.produtoFormModalOpen = signal(false);
    this.produtosList = signal([]);
    this.searchProdutoModal = signal("");
    this.produtoEditId = signal(null);
    this.produtoSalvando = signal(false);
    this.produtoErro = signal("");
    this.servicosModalOpen = signal(false);
    this.servicoFormModalOpen = signal(false);
    this.servicosList = signal([]);
    this.searchServicoModal = signal("");
    this.servicoEditId = signal(null);
    this.servicoSalvando = signal(false);
    this.servicoErro = signal("");
    this.modalAgendaOpen = signal(false);
    this.lancamentoManualModalOpen = signal(false);
    this.lancamentoManualErro = signal("");
    this.lancamentoManualSalvando = signal(false);
    this.sangriaModalOpen = signal(false);
    this.sangriaErro = signal("");
    this.sangriaSalvando = signal(false);
    this.encerrarCaixaModalOpen = signal(false);
    this.encerrarCaixaErro = signal("");
    this.encerrarCaixaSalvando = signal(false);
    this.recebimentoListaModalOpen = signal(false);
    this.carregandoEncerrados = signal(false);
    this.listaEncerrados = signal([]);
    this.selectedEncerradoParaRec = signal(null);
    this.produtosEstoque = signal([]);
    this.searchProduto = signal("");
    this.ESTOQUE_BAIXO_LIMITE = 5;
    this.estoqueBaixoModalOpen = signal(false);
    this.produtosEstoqueBaixo = signal([]);
    this.dashboardGrafico = signal(null);
    this.chartPeriodo = signal(15);
    this.chartDataInicio = signal("");
    this.chartDataFim = signal("");
    this.chartFiltroOpen = signal(false);
    this.cabeleireiros = signal([]);
    this.agendaLista = signal([]);
    this.agendaFiltroOpen = signal(false);
    this.configModalOpen = signal(false);
    this.configSubView = signal("menu");
    this.configDadosLoading = signal(false);
    this.configDadosErro = signal("");
    this.configSenhaLoading = signal(false);
    this.configSenhaErro = signal("");
    this.configUsuarioLogin = signal("");
    this.configUsuarioPerfil = signal("");
    this.avatarUploading = signal(false);
    this.saudacao = computed(() => {
      const h3 = (/* @__PURE__ */ new Date()).getHours();
      if (h3 < 12)
        return "Bom dia";
      if (h3 < 18)
        return "Boa tarde";
      return "Boa noite";
    });
    this.nomeUsuario = computed(() => this.user()?.nome?.split(" ")[0] ?? "recep\xE7\xE3o");
    this.notificacoesNaoLidas = computed(() => this.notificacoes().filter((n) => !n.lido));
    this.pagamentosPendentesCount = computed(() => this.notificacoes().filter((n) => (n.tipo || "").toUpperCase() === "RECEBIMENTO" && !n.lido).length);
    this.produtosFiltrados = computed(() => {
      const lista = this.produtosList();
      const q2 = this.searchProdutoModal().trim().toLowerCase();
      if (!q2)
        return lista;
      return lista.filter((p) => (p.descricao ?? "").toLowerCase().includes(q2));
    });
    this.servicosFiltrados = computed(() => {
      const lista = this.servicosList();
      const q2 = this.searchServicoModal().trim().toLowerCase();
      if (!q2)
        return lista;
      return lista.filter((s3) => (s3.descricao ?? "").toLowerCase().includes(q2));
    });
    this.produtosEstoqueFiltrados = computed(() => {
      const lista = this.produtosEstoque();
      const q2 = this.searchProduto().trim().toLowerCase();
      if (!q2)
        return lista;
      return lista.filter((p) => (p.descricao ?? "").toLowerCase().includes(q2));
    });
    this.fluxoCaixaTotal = computed(() => {
      const d3 = this.dashboard();
      const grafico = d3?.grafico ?? [];
      return grafico.reduce((s3, i2) => s3 + (i2.valor || 0), 0);
    });
    this.clientesEmEspera = computed(() => this.dashboard()?.em_espera ?? this.emEsperaCount());
    this.totalAgendamentosMes = computed(() => this.agendaListaMesAtual().length);
    this.valorAberturaCaixa = computed(() => this.caixaAberto()?.valor_abertura ?? 0);
    this.graficoDados = computed(() => {
      const d3 = this.dashboardGrafico();
      return d3?.grafico ?? [];
    });
    this.agendaListaCard = computed(() => this.agendaLista().slice(0, 5));
    this.rankingProfissionais = computed(() => {
      const d3 = this.dashboard();
      const r = d3?.ranking ?? [];
      return r.slice(0, 5).map((item) => ({
        nome: item.nome ?? "",
        atendimentos: item.atendimentos ?? 0,
        total: item.total ?? 0
      }));
    });
    this.chartWidth = 380;
    this.chartHeight = 140;
    this.chartPadding = { top: 20, right: 16, bottom: 24, left: 16 };
    this.chartBars = computed(() => {
      const dados = this.graficoDados();
      const w2 = this.chartWidth;
      const h3 = this.chartHeight;
      const pad = this.chartPadding;
      const innerW = w2 - pad.left - pad.right;
      const innerH = h3 - pad.top - pad.bottom;
      if (dados.length === 0)
        return [];
      const max = Math.max(...dados.map((d3) => d3.valor), 1);
      const n = dados.length;
      const gap = 4;
      const barWidth = Math.max(2, (innerW - (n - 1) * gap) / n);
      const baseY = h3 - pad.bottom;
      return dados.map((d3, i2) => {
        const barHeight = d3.valor / max * innerH;
        const x2 = pad.left + i2 * (barWidth + gap);
        const y3 = baseY - barHeight;
        return { x: x2, y: y3, width: barWidth, height: barHeight, valor: d3.valor, index: i2 };
      });
    });
    this.chartGridLines = computed(() => {
      const h3 = this.chartHeight;
      const pad = this.chartPadding;
      const innerH = h3 - pad.top - pad.bottom;
      const count = 4;
      const lines = [];
      for (let i2 = 1; i2 <= count; i2++) {
        lines.push(pad.top + innerH * i2 / (count + 1));
      }
      return lines;
    });
    this.valorVendaMask = signal("");
    this.produtoForm = this.fb.group({
      descricao: ["", Validators.required],
      valor_venda: [0, [Validators.required, Validators.min(0)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      imagem: [""]
    });
    this.servicoForm = this.fb.group({
      descricao: ["", Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      imagem: [""]
    });
    const hoje = /* @__PURE__ */ new Date();
    const quinzeDiasAtras = subDays(hoje, 14);
    this.chartDataInicio.set(format(quinzeDiasAtras, "yyyy-MM-dd"));
    this.chartDataFim.set(format(hoje, "yyyy-MM-dd"));
    this.agendaFiltroForm = this.fb.group({
      mes: [format(hoje, "yyyy-MM")],
      id_cabeleireiro: [""],
      status: [""]
    });
    this.lancamentoManualForm = this.fb.group({
      descricao: [""],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
    this.sangriaForm = this.fb.group({
      valor: [0, [Validators.required, Validators.min(0.01)]],
      observacao: [""]
    });
    this.encerrarCaixaForm = this.fb.group({
      observacao: [""]
    });
    this.configDadosForm = this.fb.group({
      nome: [this.auth.user()?.nome ?? "", Validators.required]
    });
    this.configSenhaForm = this.fb.group({
      senha_atual: ["", Validators.required],
      nova_senha: ["", [Validators.required, Validators.minLength(4)]],
      confirmar: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.carregarTudo();
    this.carregarGraficoAtendimentos();
    this.carregarCabeleireiros();
    this.carregarAgenda();
    this.iniciarMonitorRecebimentos();
  }
  ngOnDestroy() {
    if (this.recebimentoIntervalId) {
      clearInterval(this.recebimentoIntervalId);
    }
  }
  carregarTudo() {
    this.loading.set(true);
    const hoje = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
    const mesAtual = format(/* @__PURE__ */ new Date(), "yyyy-MM");
    this.api.get("/admin/dashboard", { periodo: "30" }).subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.dashboard.set(null)
    });
    this.api.get("/agendamentos/agenda", { mes: mesAtual }).subscribe({
      next: (list) => this.agendaListaMesAtual.set(list ?? []),
      error: () => this.agendaListaMesAtual.set([])
    });
    this.api.get("/caixa/saldo").subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {
      }
    });
    this.api.get("/caixa/aberto").subscribe({
      next: (res) => this.caixaAberto.set(res && res.valor_abertura != null ? res : null),
      error: () => this.caixaAberto.set(null)
    });
    this.api.get("/admin/dashboard", { periodo: "1" }).subscribe({
      next: (data) => this.percentualCaixa.set(data?.percentual_vs_anterior ?? null),
      error: () => {
      }
    });
    this.api.get("/agendamentos", { data: hoje }).subscribe({
      next: (list) => {
        const items = (list || []).map((a3) => ({
          id: a3.id,
          data_hora: a3.data_hora,
          horaFormatada: format(parseISO(a3.data_hora), "HH:mm"),
          clienteNome: a3.cliente?.nome ?? "Cliente",
          servicoDescricao: a3.servico?.descricao ?? "Servi\xE7o",
          cabeleireiroNome: a3.cabeleireiro?.nome,
          status: a3.status ?? "AGENDADO"
        }));
        this.agendaHoje.set(items);
        this.agendamentosHojeCount.set(items.length);
      },
      error: () => {
        this.agendaHoje.set([]);
        this.agendamentosHojeCount.set(0);
      }
    });
    this.carregarFila();
    this.api.get("/produtos", { todos: "1" }).subscribe({
      next: (list) => this.produtosEstoque.set(list ?? []),
      error: () => this.produtosEstoque.set([])
    });
    this.api.get("/notificacoes", { perfil: "RECEPCAO" }).subscribe({
      next: (list) => {
        this.notificacoes.set(list || []);
        const estoque = (list || []).filter((n) => (n.tipo || "").toUpperCase() === "REABASTECER" || (n.titulo || "").toLowerCase().includes("estoque"));
        this.estoqueBaixoCount.set(estoque.length);
      },
      error: () => this.notificacoes.set([]),
      complete: () => this.loading.set(false)
    });
    this.api.get("/atendimentos", { data_inicio: hoje, data_fim: hoje, status: "ENCERRADO" }).subscribe({
      next: (list) => this.atendidosCount.set((list || []).length),
      error: () => this.atendidosCount.set(0)
    });
  }
  carregarGraficoAtendimentos() {
    const periodo = this.chartPeriodo();
    this.api.get("/admin/dashboard", { periodo: String(periodo) }).subscribe({
      next: (data) => this.dashboardGrafico.set(data),
      error: () => this.dashboardGrafico.set(null)
    });
  }
  carregarCabeleireiros() {
    this.api.get("/usuarios", { perfil: "CABELEIREIRO" }).subscribe({
      next: (list) => this.cabeleireiros.set(list ?? []),
      error: () => this.cabeleireiros.set([])
    });
  }
  carregarAgenda() {
    const v = this.agendaFiltroForm.value;
    const params = {};
    params["mes"] = v.mes || format(/* @__PURE__ */ new Date(), "yyyy-MM");
    if (v.id_cabeleireiro)
      params["id_cabeleireiro"] = String(v.id_cabeleireiro);
    if (v.status)
      params["status"] = v.status;
    this.api.get("/agendamentos/agenda", params).subscribe({
      next: (list) => this.agendaLista.set(list ?? []),
      error: () => this.agendaLista.set([])
    });
  }
  toggleChartFiltro() {
    this.chartFiltroOpen.update((v) => !v);
  }
  aplicarPeriodoGrafico(dias) {
    const fim = /* @__PURE__ */ new Date();
    const inicio = subDays(fim, dias - 1);
    this.chartPeriodo.set(dias);
    this.chartDataInicio.set(format(inicio, "yyyy-MM-dd"));
    this.chartDataFim.set(format(fim, "yyyy-MM-dd"));
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }
  aplicarFiltroGrafico() {
    const ini = this.chartDataInicio();
    const fim = this.chartDataFim();
    if (ini && fim) {
      const dIni = parseISO(ini);
      const dFim = parseISO(fim);
      const dias = Math.max(1, Math.ceil((dFim.getTime() - dIni.getTime()) / (24 * 60 * 60 * 1e3)) + 1);
      this.chartPeriodo.set(Math.min(365, Math.max(1, dias)));
    }
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }
  toggleAgendaFiltro() {
    this.agendaFiltroOpen.update((v) => !v);
  }
  aplicarAgendaFiltro() {
    this.carregarAgenda();
    this.agendaFiltroOpen.set(false);
  }
  diaDoMes(data) {
    if (!data)
      return "";
    try {
      const d3 = parseISO(data);
      return String(d3.getDate());
    } catch {
      return data;
    }
  }
  avatarUrlNome(nome) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=3e3b47&color=ff9000`;
  }
  abrirModalAtendimentosDia(data) {
    if (!data)
      return;
    this.dataSelecionadaAtendimentos.set(data);
    this.atendimentosDiaModalOpen.set(true);
    this.carregandoAtendimentosDia.set(true);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.api.get("/admin/atendimentos-dia", { data }).subscribe({
      next: (list) => {
        this.listaAtendimentosDia.set(list ?? []);
        this.carregandoAtendimentosDia.set(false);
      },
      error: () => {
        this.listaAtendimentosDia.set([]);
        this.carregandoAtendimentosDia.set(false);
      }
    });
  }
  carregarFila() {
    this.api.get("/fila", { status: "AGUARDANDO" }).subscribe({
      next: (aguardando) => {
        const list = aguardando || [];
        this.emEsperaCount.set(list.length);
        const toItem = (f) => ({
          id: f.id,
          nome: f.cliente?.nome ?? "Cliente",
          servico: f.agendamento?.servico?.descricao,
          hora: f.data_entrada ? format(parseISO(f.data_entrada), "HH:mm") : "\u2014",
          status: this.normalizarStatusFila(f.status)
        });
        this.filaItens.set(list.map(toItem));
      },
      error: () => {
      }
    });
  }
  abrirModalFila() {
    this.filaModalOpen.set(true);
  }
  fecharModalFila() {
    this.filaModalOpen.set(false);
  }
  carregarProdutosModal() {
    this.api.get("/produtos", { todos: "1" }).subscribe({
      next: (list) => this.produtosList.set(list ?? []),
      error: () => this.produtosList.set([])
    });
  }
  abrirModalProdutos() {
    this.produtosModalOpen.set(true);
    this.searchProdutoModal.set("");
    this.produtoErro.set("");
    this.carregarProdutosModal();
  }
  fecharModalProdutos() {
    this.produtosModalOpen.set(false);
  }
  abrirModalNovoProduto() {
    this.produtoEditId.set(null);
    this.produtoForm.reset({ descricao: "", valor_venda: 0, estoque: 0, imagem: "" });
    this.valorVendaMask.set(this.formatarMoeda(0));
    this.produtoErro.set("");
    this.produtoFormModalOpen.set(true);
  }
  abrirModalEditarProduto(p) {
    this.produtoEditId.set(p.id);
    const valor = p.valor_venda ?? 0;
    this.produtoForm.patchValue({
      descricao: p.descricao ?? "",
      valor_venda: valor,
      estoque: p.estoque ?? 0,
      imagem: p.imagem ?? ""
    });
    this.valorVendaMask.set(this.formatarMoeda(valor));
    this.produtoErro.set("");
    this.produtoFormModalOpen.set(true);
  }
  /** Formata número para exibição em reais (R$ 1.234,56) */
  formatarMoeda(val) {
    if (val == null || Number.isNaN(val))
      return "R$ 0,00";
    return "R$ " + val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  /** Converte string do input (máscara) em número. Dígitos são tratados como centavos (150 -> 1,50). */
  parsearMoeda(s3) {
    if (!s3 || typeof s3 !== "string")
      return 0;
    const limpo = s3.replace(/\D/g, "");
    if (limpo.length === 0)
      return 0;
    return Math.round(parseInt(limpo, 10) * 100) / 1e4;
  }
  onValorVendaInput(val) {
    const num = this.parsearMoeda(val);
    this.produtoForm.patchValue({ valor_venda: num }, { emitEvent: true });
    this.valorVendaMask.set(val ? this.formatarMoeda(num) : "");
  }
  onValorVendaBlur() {
    const num = this.produtoForm.get("valor_venda")?.value ?? 0;
    this.valorVendaMask.set(this.formatarMoeda(num));
  }
  fecharModalFormProduto() {
    this.produtoFormModalOpen.set(false);
    this.produtoEditId.set(null);
    this.produtoErro.set("");
  }
  produtoImagemUrl(p) {
    if (!p?.imagem?.trim())
      return "";
    const img = p.imagem.trim();
    if (img.startsWith("http://") || img.startsWith("https://"))
      return img;
    const base = (environment?.apiUrl ?? "").replace(/\/api\/?$/, "") || "http://localhost:8080";
    return base + (img.startsWith("/") ? "" : "/") + img;
  }
  onFileProdutoSelected(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    this.api.upload("/upload", file).subscribe({
      next: (res) => {
        if (res?.imagem)
          this.produtoForm.patchValue({ imagem: res.imagem });
      },
      error: () => this.produtoErro.set("Falha ao enviar imagem.")
    });
    input.value = "";
  }
  salvarProduto() {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }
    const id = this.produtoEditId();
    const val = this.produtoForm.value;
    const payload = {
      descricao: val.descricao?.trim() ?? "",
      valor_venda: Number(val.valor_venda) ?? 0,
      estoque: Number(val.estoque) ?? 0,
      imagem: val.imagem?.trim() || void 0
    };
    this.produtoSalvando.set(true);
    this.produtoErro.set("");
    if (id != null) {
      this.api.patch(`/produtos/${id}`, payload).subscribe({
        next: () => {
          this.produtoSalvando.set(false);
          this.fecharModalFormProduto();
          this.carregarProdutosModal();
        },
        error: (err) => {
          this.produtoSalvando.set(false);
          this.produtoErro.set(err?.error?.error || "Erro ao atualizar.");
        }
      });
    } else {
      this.api.post("/produtos", payload).subscribe({
        next: () => {
          this.produtoSalvando.set(false);
          this.fecharModalFormProduto();
          this.carregarProdutosModal();
        },
        error: (err) => {
          this.produtoSalvando.set(false);
          this.produtoErro.set(err?.error?.error || "Erro ao cadastrar.");
        }
      });
    }
  }
  excluirProduto(p) {
    if (!confirm(`Excluir o produto "${p.descricao ?? "Produto"}"?`))
      return;
    this.api.delete(`/produtos/${p.id}`).subscribe({
      next: () => this.carregarProdutosModal(),
      error: () => this.produtoErro.set("Erro ao excluir.")
    });
  }
  carregarServicosModal() {
    this.api.get("/servicos", { todos: "1" }).subscribe({
      next: (list) => this.servicosList.set(list ?? []),
      error: () => this.servicosList.set([])
    });
  }
  abrirModalServicos() {
    this.servicosModalOpen.set(true);
    this.searchServicoModal.set("");
    this.servicoErro.set("");
    this.carregarServicosModal();
  }
  abrirModalAgenda() {
    this.modalAgendaOpen.set(true);
  }
  fecharModalAgenda() {
    this.modalAgendaOpen.set(false);
  }
  formatarDataHoraAgenda(dataHora) {
    if (!dataHora)
      return "\u2014";
    try {
      const d3 = parseISO(dataHora);
      return format(d3, "dd/MM/yyyy HH:mm", { locale: pt_BR_default });
    } catch {
      return dataHora;
    }
  }
  formatarHoraAgenda(dataHora) {
    if (!dataHora)
      return "\u2014";
    try {
      const d3 = parseISO(dataHora);
      return format(d3, "HH:mm", { locale: pt_BR_default });
    } catch {
      return dataHora;
    }
  }
  classeStatusAgenda(status) {
    if (!status)
      return "agendado";
    const s3 = (status || "").toUpperCase();
    if (s3.includes("CONFIRMADO"))
      return "confirmado";
    if (s3.includes("PENDENTE"))
      return "pendente";
    return "agendado";
  }
  isEstoqueBaixo(p) {
    return (p.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE;
  }
  fecharModalServicos() {
    this.servicosModalOpen.set(false);
  }
  abrirModalNovoServico() {
    this.servicoEditId.set(null);
    this.servicoForm.reset({ descricao: "", valor: 0, imagem: "" });
    this.servicoErro.set("");
    this.servicoFormModalOpen.set(true);
  }
  abrirModalEditarServico(s3) {
    this.servicoEditId.set(s3.id);
    this.servicoForm.patchValue({
      descricao: s3.descricao ?? "",
      valor: s3.valor ?? 0,
      imagem: s3.imagem ?? ""
    });
    this.servicoErro.set("");
    this.servicoFormModalOpen.set(true);
  }
  fecharModalFormServico() {
    this.servicoFormModalOpen.set(false);
    this.servicoEditId.set(null);
    this.servicoErro.set("");
  }
  servicoImagemUrl(s3) {
    if (!s3?.imagem?.trim())
      return "";
    const img = s3.imagem.trim();
    if (img.startsWith("http://") || img.startsWith("https://"))
      return img;
    const base = (environment?.apiUrl ?? "").replace(/\/api\/?$/, "") || "http://localhost:8080";
    return base + (img.startsWith("/") ? "" : "/") + img;
  }
  onFileServicoSelected(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    this.api.upload("/upload", file).subscribe({
      next: (res) => {
        if (res?.imagem)
          this.servicoForm.patchValue({ imagem: res.imagem });
      },
      error: () => this.servicoErro.set("Falha ao enviar imagem.")
    });
    input.value = "";
  }
  salvarServico() {
    if (this.servicoForm.invalid) {
      this.servicoForm.markAllAsTouched();
      return;
    }
    const id = this.servicoEditId();
    const val = this.servicoForm.value;
    const payload = {
      descricao: val.descricao?.trim() ?? "",
      valor: Number(val.valor) ?? 0,
      imagem: val.imagem?.trim() || void 0
    };
    this.servicoSalvando.set(true);
    this.servicoErro.set("");
    if (id != null) {
      this.api.patch(`/servicos/${id}`, payload).subscribe({
        next: () => {
          this.servicoSalvando.set(false);
          this.fecharModalFormServico();
          this.carregarServicosModal();
        },
        error: (err) => {
          this.servicoSalvando.set(false);
          this.servicoErro.set(err?.error?.error || "Erro ao atualizar.");
        }
      });
    } else {
      this.api.post("/servicos", payload).subscribe({
        next: () => {
          this.servicoSalvando.set(false);
          this.fecharModalFormServico();
          this.carregarServicosModal();
        },
        error: (err) => {
          this.servicoSalvando.set(false);
          this.servicoErro.set(err?.error?.error || "Erro ao cadastrar.");
        }
      });
    }
  }
  excluirServico(s3) {
    if (!confirm(`Excluir o servi\xE7o "${s3.descricao ?? "Servi\xE7o"}"?`))
      return;
    this.api.delete(`/servicos/${s3.id}`).subscribe({
      next: () => this.carregarServicosModal(),
      error: () => this.servicoErro.set("Erro ao excluir.")
    });
  }
  abrirModalEstoqueBaixo() {
    this.estoqueBaixoModalOpen.set(true);
    this.api.get("/produtos", { todos: "1" }).subscribe({
      next: (list) => {
        const baixo = (list ?? []).filter((p) => (p.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE);
        this.produtosEstoqueBaixo.set(baixo.sort((a3, b2) => (a3.estoque ?? 0) - (b2.estoque ?? 0)));
      },
      error: () => this.produtosEstoqueBaixo.set([])
    });
  }
  fecharModalEstoqueBaixo() {
    this.estoqueBaixoModalOpen.set(false);
  }
  normalizarStatusFila(s3) {
    const u2 = (s3 || "").toUpperCase();
    if (u2 === "FINALIZADO")
      return "ATENDIDO";
    if (u2 === "EM_ATENDIMENTO")
      return "EM ATENDIMENTO";
    return "AGUARDANDO";
  }
  iniciarMonitorRecebimentos() {
    this.verificarRecebimentos();
    this.recebimentoIntervalId = setInterval(() => this.verificarRecebimentos(), 15e3);
  }
  verificarRecebimentos() {
    this.api.get("/notificacoes", { perfil: "RECEPCAO" }).subscribe({
      next: (list) => {
        const rec = (list || []).filter((n) => (n.tipo || "").toUpperCase() === "RECEBIMENTO");
        if (rec.length > 0 && rec[0].id !== this.ultimoRecebimentoId) {
          this.ultimoRecebimentoId = rec[0].id;
          this.recebimentoNotificacao.set(rec[0]);
        }
      },
      error: () => {
      }
    });
  }
  recarregarCaixa() {
    this.api.get("/caixa/saldo").subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {
      }
    });
  }
  /** Abre modal de atendimentos do dia (ao clicar no card Caixa do Dia) */
  abrirModalLancamentoManual() {
    this.lancamentoManualForm.reset({ descricao: "", valor: 0 });
    this.lancamentoManualErro.set("");
    this.lancamentoManualModalOpen.set(true);
  }
  fecharModalLancamentoManual() {
    this.lancamentoManualModalOpen.set(false);
    this.lancamentoManualErro.set("");
  }
  salvarLancamentoManual() {
    if (this.lancamentoManualForm.invalid) {
      this.lancamentoManualForm.markAllAsTouched();
      this.lancamentoManualErro.set("Preencha o valor (obrigat\xF3rio e maior que zero).");
      return;
    }
    const u2 = this.user();
    const idUsuario = u2?.id ?? 0;
    if (!idUsuario) {
      this.lancamentoManualErro.set("Usu\xE1rio n\xE3o identificado.");
      return;
    }
    const { descricao, valor } = this.lancamentoManualForm.value;
    this.lancamentoManualSalvando.set(true);
    this.lancamentoManualErro.set("");
    this.api.post("/caixa/lancamento-manual", { descricao: (descricao || "").trim(), valor: Number(valor), id_usuario: idUsuario }).subscribe({
      next: () => {
        this.lancamentoManualSalvando.set(false);
        this.fecharModalLancamentoManual();
        this.recarregarCaixa();
      },
      error: (err) => {
        this.lancamentoManualSalvando.set(false);
        this.lancamentoManualErro.set(err?.error?.error || "Erro ao registrar lan\xE7amento.");
      }
    });
  }
  abrirModalSangria() {
    this.sangriaForm.reset({ valor: 0, observacao: "" });
    this.sangriaErro.set("");
    this.sangriaModalOpen.set(true);
  }
  fecharModalSangria() {
    this.sangriaModalOpen.set(false);
    this.sangriaErro.set("");
  }
  salvarSangria() {
    if (this.sangriaForm.invalid) {
      this.sangriaForm.markAllAsTouched();
      this.sangriaErro.set("Informe um valor maior que zero.");
      return;
    }
    const { valor, observacao } = this.sangriaForm.value;
    this.sangriaSalvando.set(true);
    this.sangriaErro.set("");
    this.api.post("/caixa/sangria", { valor: Number(valor), observacao: (observacao || "").trim() }).subscribe({
      next: () => {
        this.sangriaSalvando.set(false);
        this.fecharModalSangria();
        this.recarregarCaixa();
      },
      error: (err) => {
        this.sangriaSalvando.set(false);
        this.sangriaErro.set(err?.error?.error || "Erro ao registrar sangria.");
      }
    });
  }
  abrirModalEncerrarCaixa() {
    this.encerrarCaixaForm.reset({ observacao: "" });
    this.encerrarCaixaErro.set("");
    this.encerrarCaixaModalOpen.set(true);
  }
  fecharModalEncerrarCaixa() {
    this.encerrarCaixaModalOpen.set(false);
    this.encerrarCaixaErro.set("");
  }
  confirmarEncerrarCaixa() {
    const saldo = this.saldoCaixa();
    this.encerrarCaixaSalvando.set(true);
    this.encerrarCaixaErro.set("");
    const observacao = this.encerrarCaixaForm.get("observacao")?.value?.trim() || "";
    this.api.post("/caixa/fechar", { valor_fechamento: saldo, observacao }).subscribe({
      next: () => {
        this.encerrarCaixaSalvando.set(false);
        this.fecharModalEncerrarCaixa();
        this.recarregarCaixa();
        this.carregarTudo();
      },
      error: (err) => {
        this.encerrarCaixaSalvando.set(false);
        this.encerrarCaixaErro.set(err?.error?.error || "Erro ao encerrar caixa.");
      }
    });
  }
  abrirModalRecebimentoLista() {
    this.recebimentoListaModalOpen.set(true);
    this.selectedEncerradoParaRec.set(null);
    this.recebimentoErro.set("");
    this.tipoPagamentoRecebimento.set("DINHEIRO");
    this.carregandoEncerrados.set(true);
    this.api.get("/recepcao/encerrados").subscribe({
      next: (list) => {
        this.listaEncerrados.set(list ?? []);
        this.carregandoEncerrados.set(false);
      },
      error: () => {
        this.listaEncerrados.set([]);
        this.carregandoEncerrados.set(false);
      }
    });
  }
  fecharModalRecebimentoLista() {
    this.recebimentoListaModalOpen.set(false);
    this.selectedEncerradoParaRec.set(null);
    this.recebimentoErro.set("");
  }
  selecionarEncerradoParaRec(item) {
    this.selectedEncerradoParaRec.set(item);
    this.tipoPagamentoRecebimento.set("DINHEIRO");
    this.recebimentoErro.set("");
  }
  voltarListaEncerrados() {
    this.selectedEncerradoParaRec.set(null);
    this.recebimentoErro.set("");
  }
  confirmarRecebimentoEncerrado() {
    const item = this.selectedEncerradoParaRec();
    if (!item)
      return;
    this.recebimentoCarregando.set(true);
    this.recebimentoErro.set("");
    this.api.post("/caixa", {
      id_atendimento: item.id_atendimento,
      valor: item.total,
      tipo_pagamento: this.tipoPagamentoRecebimento()
    }).subscribe({
      next: () => {
        this.recebimentoCarregando.set(false);
        this.fecharModalRecebimentoLista();
        this.carregarTudo();
      },
      error: (err) => {
        this.recebimentoCarregando.set(false);
        this.recebimentoErro.set(err?.error?.error || "Erro ao registrar recebimento.");
      }
    });
  }
  abrirModalCaixaDia() {
    const hoje = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
    this.dataSelecionadaAtendimentos.set(hoje);
    this.atendimentosDiaModalOpen.set(true);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.carregandoAtendimentosDia.set(true);
    this.api.get("/admin/atendimentos-dia", { data: hoje }).subscribe({
      next: (list) => {
        this.listaAtendimentosDia.set(list ?? []);
        this.carregandoAtendimentosDia.set(false);
      },
      error: () => {
        this.listaAtendimentosDia.set([]);
        this.carregandoAtendimentosDia.set(false);
      }
    });
  }
  fecharModalAtendimentosDia() {
    this.atendimentosDiaModalOpen.set(false);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.carregandoDetalheId.set(null);
  }
  toggleDetalheAtendimento(idAtendimento) {
    const atual = this.atendimentoExpandidoId();
    if (atual === idAtendimento) {
      this.atendimentoExpandidoId.set(null);
      return;
    }
    this.atendimentoExpandidoId.set(idAtendimento);
    const map = this.detalheAtendimentoMap();
    if (map[idAtendimento])
      return;
    this.carregandoDetalheId.set(idAtendimento);
    this.api.get(`/atendimentos/${idAtendimento}/detalhe`).subscribe({
      next: (detalhe) => {
        this.detalheAtendimentoMap.update((m3) => __spreadProps(__spreadValues({}, m3), { [idAtendimento]: detalhe }));
        this.carregandoDetalheId.set(null);
      },
      error: () => this.carregandoDetalheId.set(null)
    });
  }
  formatarDataTituloModal(data) {
    if (!data)
      return "";
    try {
      const d3 = parseISO(data);
      return format(d3, "dd/MM/yyyy", { locale: pt_BR_default });
    } catch {
      return data;
    }
  }
  formatarValorAtendimento(total) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total ?? 0);
  }
  abrirModalNotificacoes() {
    this.notificacoesModalOpen.set(true);
  }
  fecharModalNotificacoes() {
    this.notificacoesModalOpen.set(false);
  }
  marcarNotificacaoLida(not) {
    if (!not || not.lido)
      return;
    this.api.patch(`/notificacoes/${not.id}/lido`, {}).subscribe({
      next: () => this.notificacoes.update((lista) => lista.map((n) => n.id === not.id ? __spreadProps(__spreadValues({}, n), { lido: true }) : n)),
      error: () => {
      }
    });
  }
  abrirModalRecebimento() {
    if (!this.recebimentoNotificacao())
      return;
    this.recebimentoErro.set("");
    this.tipoPagamentoRecebimento.set("DINHEIRO");
    this.recebimentoModalOpen.set(true);
  }
  fecharModalRecebimento() {
    this.recebimentoModalOpen.set(false);
  }
  setTipoPagamentoRecebimento(tipo) {
    this.tipoPagamentoRecebimento.set(tipo);
  }
  fecharToastRecebimento(event) {
    event.stopPropagation();
    this.recebimentoNotificacao.set(null);
  }
  confirmarRecebimentoNotificacao() {
    const notif = this.recebimentoNotificacao();
    if (!notif || !notif.id_atendimento || !notif.valor)
      return;
    this.recebimentoCarregando.set(true);
    this.recebimentoErro.set("");
    this.api.post("/caixa", {
      id_atendimento: notif.id_atendimento,
      valor: notif.valor,
      tipo_pagamento: this.tipoPagamentoRecebimento()
    }).subscribe({
      next: () => {
        this.api.patch(`/notificacoes/${notif.id}/lido`, {}).subscribe({ next: () => {
        }, error: () => {
        } });
        this.recebimentoCarregando.set(false);
        this.recebimentoModalOpen.set(false);
        this.recebimentoNotificacao.set(null);
        this.carregarTudo();
      },
      error: (err) => {
        this.recebimentoCarregando.set(false);
        this.recebimentoErro.set(err?.error?.error || "Erro ao registrar recebimento.");
      }
    });
  }
  get serverBase() {
    const url = environment?.apiUrl ?? "http://localhost:8080/api";
    return url.replace(/\/api\/?$/, "");
  }
  avatarUrl() {
    const u2 = this.user();
    if (u2?.avatar) {
      const av = u2.avatar;
      if (av.startsWith("http"))
        return av;
      return `${this.serverBase}/${av.startsWith("api/") ? av : "api/" + av}`;
    }
    const nome = u2?.nome ?? "R";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=ff9000&color=1a1a1a`;
  }
  abrirModalConfiguracoes() {
    this.configSubView.set("menu");
    this.configDadosErro.set("");
    this.configSenhaErro.set("");
    this.configModalOpen.set(true);
  }
  fecharModalConfiguracoes() {
    this.configModalOpen.set(false);
    this.configSubView.set("menu");
  }
  configVoltarMenu() {
    this.configSubView.set("menu");
  }
  abrirConfigDadosPessoais() {
    const u2 = this.user();
    this.configDadosForm.patchValue({ nome: u2?.nome ?? "" });
    this.configUsuarioLogin.set(u2?.login ?? "");
    this.api.getUsuario(u2?.id ?? 0).subscribe({
      next: (usuario) => {
        this.configUsuarioLogin.set(usuario.login ?? "");
        this.configUsuarioPerfil.set(usuario.perfil ?? "");
        this.configDadosForm.patchValue({ nome: usuario.nome ?? "" });
        this.configSubView.set("dados");
        this.configDadosErro.set("");
      },
      error: () => this.configDadosErro.set("Erro ao carregar dados.")
    });
  }
  abrirConfigSegurancaSenha() {
    this.configSenhaForm.reset({ senha_atual: "", nova_senha: "", confirmar: "" });
    this.configSenhaErro.set("");
    this.configSubView.set("senha");
  }
  salvarConfigDadosPessoais() {
    if (this.configDadosForm.invalid) {
      this.configDadosForm.markAllAsTouched();
      return;
    }
    const id = this.user()?.id ?? 0;
    if (!id)
      return;
    const nome = this.configDadosForm.get("nome")?.value?.trim() ?? "";
    if (!nome) {
      this.configDadosErro.set("Nome \xE9 obrigat\xF3rio.");
      return;
    }
    this.configDadosLoading.set(true);
    this.configDadosErro.set("");
    this.api.updateUsuario(id, { nome }).subscribe({
      next: () => {
        this.auth.updateUser(__spreadProps(__spreadValues({}, this.user()), { nome }));
        this.configDadosLoading.set(false);
        this.configSubView.set("menu");
      },
      error: (err) => {
        this.configDadosLoading.set(false);
        this.configDadosErro.set(err?.error?.error || "Erro ao salvar.");
      }
    });
  }
  salvarConfigSenha() {
    if (this.configSenhaForm.invalid) {
      this.configSenhaForm.markAllAsTouched();
      const nova = this.configSenhaForm.get("nova_senha")?.value ?? "";
      const conf = this.configSenhaForm.get("confirmar")?.value ?? "";
      if (nova.length < 4)
        this.configSenhaErro.set("Nova senha deve ter no m\xEDnimo 4 caracteres.");
      else if (nova !== conf)
        this.configSenhaErro.set("Nova senha e confirma\xE7\xE3o n\xE3o conferem.");
      return;
    }
    const id = this.user()?.id ?? 0;
    if (!id)
      return;
    const senhaAtual = this.configSenhaForm.get("senha_atual")?.value ?? "";
    const novaSenha = this.configSenhaForm.get("nova_senha")?.value ?? "";
    const confirmar = this.configSenhaForm.get("confirmar")?.value ?? "";
    if (novaSenha.length < 4) {
      this.configSenhaErro.set("Nova senha deve ter no m\xEDnimo 4 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      this.configSenhaErro.set("Nova senha e confirma\xE7\xE3o n\xE3o conferem.");
      return;
    }
    this.configSenhaLoading.set(true);
    this.configSenhaErro.set("");
    this.api.alterarSenha(id, senhaAtual, novaSenha).subscribe({
      next: () => {
        this.configSenhaLoading.set(false);
        this.configSubView.set("menu");
      },
      error: (err) => {
        this.configSenhaLoading.set(false);
        this.configSenhaErro.set(err?.error?.error || "Erro ao alterar senha.");
      }
    });
  }
  onAvatarSelected(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    const id = this.user()?.id ?? 0;
    if (!id)
      return;
    this.avatarUploading.set(true);
    this.api.uploadAvatar(id, file).subscribe({
      next: () => {
        this.api.getUsuario(id).subscribe({
          next: (usuario) => {
            this.auth.updateUser(__spreadProps(__spreadValues({}, this.user()), { avatar: usuario.avatar ?? void 0 }));
            this.avatarUploading.set(false);
          },
          error: () => this.avatarUploading.set(false)
        });
      },
      error: () => {
        this.avatarUploading.set(false);
      }
    });
    input.value = "";
  }
  classeStatusFila(status) {
    const s3 = (status || "").toUpperCase().replace(/_/g, " ");
    if (s3 === "ATENDIDO" || s3 === "FINALIZADO")
      return "atendido";
    if (s3 === "EM ATENDIMENTO")
      return "em-atendimento";
    return "aguardando";
  }
  graficoCaixaLinha() {
    const saldo = this.saldoCaixa();
    const max = Math.max(saldo, 1);
    const h3 = 60;
    const pct = Math.min(100, saldo / max * 100);
    const y3 = h3 - pct / 100 * h3;
    return `M 0 ${h3} L 0 ${y3} L 80 ${y3} L 80 ${h3} Z`;
  }
  static {
    this.\u0275fac = function DashboardRecepcaoComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardRecepcaoComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardRecepcaoComponent, selectors: [["app-dashboard-recepcao"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 75, vars: 23, consts: [["avatarFileInput", ""], [1, "dashboard-recepcao"], [1, "sidebar"], [1, "sidebar-logo"], ["src", "/assets/logoWl.png", "alt", "Logo", 1, "sidebar-logo-img"], [1, "logo-barbearia"], [1, "sidebar-nav"], ["routerLink", "/dashboard-recepcao", "routerLinkActive", "active", 1, "nav-item"], [1, "pi", "pi-home"], ["type", "button", 1, "nav-item", "nav-item-btn", 3, "click"], [1, "pi", "pi-box"], [1, "pi", "pi-wrench"], [1, "pi", "pi-calendar"], [1, "sidebar-footer"], [1, "profile-card"], ["type", "button", "title", "Alterar foto", 1, "profile-avatar-wrap", 3, "click", "disabled"], [1, "profile-avatar", "profile-avatar-loading"], [1, "profile-avatar", 3, "src", "alt"], ["type", "file", "accept", "image/*", 1, "profile-avatar-input", 3, "change"], [1, "profile-info"], [1, "profile-nome"], [1, "profile-cargo"], ["type", "button", 1, "btn-config", 3, "click"], [1, "pi", "pi-cog"], [1, "main"], [1, "header"], [1, "header-left"], [1, "header-label"], [1, "header-title"], [1, "header-right"], [1, "search-wrap"], [1, "pi", "pi-search"], ["type", "text", "placeholder", "Buscar clientes, servi\xE7os...", 1, "search-input"], ["type", "button", "aria-label", "Notifica\xE7\xF5es", 1, "btn-icon", "notif", 3, "click"], [1, "pi", "pi-bell"], [1, "badge"], ["type", "button", "aria-label", "Sair", 1, "btn-logout", 3, "click"], [1, "pi", "pi-arrow-right"], [1, "recebimento-toast"], [1, "loading-state"], [1, "dashboard-animate"], ["role", "button", "tabindex", "0", 1, "prod-overlay"], ["role", "button", "tabindex", "0", 1, "rec-overlay"], ["role", "button", "tabindex", "0", 1, "atendimentos-dia-overlay"], ["role", "button", "tabindex", "0", 1, "fila-overlay"], ["role", "button", "tabindex", "0", 1, "prod-form-overlay"], ["role", "button", "tabindex", "0", 1, "notif-overlay"], ["role", "button", 1, "rec-overlay"], ["role", "button", "tabindex", "0", 1, "config-overlay"], [1, "pi", "pi-spin", "pi-spinner"], [1, "recebimento-toast", 3, "click"], [1, "recebimento-toast-icon"], [1, "pi", "pi-dollar"], [1, "recebimento-toast-content"], [1, "recebimento-toast-title"], [1, "recebimento-toast-text"], ["type", "button", "aria-label", "Fechar", 1, "recebimento-toast-close", 3, "click"], [1, "pi", "pi-times"], [1, "cards"], [1, "card", "card-caixa"], [1, "card-caixa-left"], [1, "card-icon", "caixa"], [1, "pi", "pi-money-bill"], [1, "card-caixa-info"], [1, "card-label"], [1, "card-value", "card-value--caixa"], [1, "card-detail"], ["type", "button", 1, "card-caixa-ver-detalhes", 3, "click"], [1, "card-caixa-buttons"], [1, "card"], [1, "card-icon", "em-espera"], [1, "pi", "pi-users"], [1, "card-value"], [1, "card-icon", "agendamentos"], [1, "charts-and-grid"], [1, "col-left"], [1, "panel", "agenda-panel", "agenda-panel--inline"], [1, "panel-head", "panel-head-agenda"], [1, "agenda-head-right"], [1, "agenda-filter-wrap"], ["type", "button", "title", "Filtros", 1, "btn-agenda-filtro", 3, "click"], [1, "pi", "pi-filter"], [1, "agenda-filter-panel"], [1, "agenda-table-wrap"], [1, "agenda-table"], [1, "panel", "card-fila-panel"], [1, "panel-head"], ["type", "button", 1, "link-ver", 3, "click"], [1, "fila-list-wrap"], [1, "fila-list", "fila-list--panel"], [1, "fila-item"], [1, "fila-empty"], [1, "col-right"], [1, "chart-section", "estoque-section"], [1, "chart-header", "estoque-header"], [1, "chart-pie-wrap", "estoque-wrap"], [1, "estoque-search-wrap"], ["type", "text", "placeholder", "Pesquisar produto...", 1, "estoque-search-input", 3, "ngModelChange", "ngModel"], [1, "estoque-grid-wrap"], [1, "estoque-grid"], [1, "th-qtd"], [1, "th-img"], [3, "estoque-baixo"], ["type", "button", 1, "btn-caixa-acao", 3, "click"], [1, "pi", "pi-plus-circle"], [1, "pi", "pi-wallet"], ["type", "button", 1, "btn-caixa-acao", "btn-caixa-encerrar", 3, "click"], [1, "pi", "pi-times-circle"], [3, "ngSubmit", "formGroup"], [1, "filter-field"], ["type", "month", "formControlName", "mes"], ["formControlName", "id_cabeleireiro"], ["value", ""], [3, "value"], ["formControlName", "status"], ["value", "AGENDADO"], ["value", "CONFIRMADO"], ["value", "CANCELADO"], ["value", "FINALIZADO"], ["type", "submit", 1, "btn-aplicar"], ["colspan", "4", 1, "agenda-empty-cell"], [1, "fila-avatar"], [1, "pi", "pi-user"], [1, "fila-info"], [1, "fila-nome"], [1, "fila-servico"], [1, "fila-hora"], [1, "fila-status"], [1, "td-qtd"], [1, "td-img"], [1, "estoque-produto-img", 3, "src", "alt"], [1, "estoque-produto-placeholder"], [1, "pi", "pi-image"], ["colspan", "3", 1, "estoque-empty"], ["role", "button", "tabindex", "0", 1, "prod-overlay", 3, "click"], ["role", "dialog", 1, "prod-form-modal", "lancamento-manual-modal", 3, "click"], [1, "prod-form-head"], ["type", "button", 1, "prod-form-close", 3, "click"], [1, "prod-form-body", 3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "descricao", "placeholder", "Ex: Refrigerante lata, Caf\xE9, Pomada capilar", 1, "prod-form-input"], ["type", "number", "formControlName", "valor", "step", "0.01", "min", "0", "placeholder", "0,00", 1, "prod-form-input"], [1, "prod-form-err"], [1, "prod-form-footer"], ["type", "button", 1, "prod-form-btn-sec", 3, "click"], ["type", "submit", 1, "prod-form-btn-pri", 3, "disabled"], ["role", "dialog", 1, "prod-form-modal", 3, "click"], ["type", "text", "formControlName", "observacao", "placeholder", "Opcional", 1, "prod-form-input"], ["type", "text", "readonly", "", 1, "prod-form-input", "readonly", 3, "value"], ["type", "submit", 1, "prod-form-btn-pri", "prod-form-btn-danger", 3, "disabled"], ["role", "button", "tabindex", "0", 1, "rec-overlay", 3, "click"], ["role", "dialog", 1, "rec-modal", "rec-modal-lista", 3, "click"], [1, "rec-header"], ["type", "button", 1, "rec-close", 3, "click"], [1, "rec-body"], [1, "rec-loading"], [1, "rec-confirm-view"], [1, "rec-lista-encerrados"], [1, "rec-tipos"], ["type", "button", 1, "rec-tipo", 3, "click"], [1, "rec-erro"], [1, "rec-footer"], ["type", "button", 1, "rec-btn-sec", 3, "click"], ["type", "button", 1, "rec-btn-pri", 3, "click", "disabled"], [1, "rec-item-encerrado"], [1, "rec-empty"], [1, "rec-item-encerrado", 3, "click"], [1, "rec-item-nome"], [1, "rec-item-valor"], [1, "pi", "pi-chevron-right"], ["role", "button", "tabindex", "0", 1, "atendimentos-dia-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "atendimentos-dia-title", 1, "atendimentos-dia-modal", 3, "click"], [1, "atendimentos-dia-header"], ["id", "atendimentos-dia-title"], ["type", "button", "aria-label", "Fechar", 1, "atendimentos-dia-close", 3, "click"], [1, "atendimentos-dia-body"], [1, "atendimentos-dia-loading"], [1, "atendimentos-dia-item"], [1, "atendimentos-dia-empty"], ["role", "button", "tabindex", "0", 1, "atendimentos-dia-card", "atendimentos-dia-card-clickable", 3, "click"], [1, "atendimentos-dia-card-icon"], [1, "atendimentos-dia-card-info"], [1, "atendimentos-dia-card-nome"], [1, "atendimentos-dia-card-hora"], [1, "atendimentos-dia-card-servico"], [1, "atendimentos-dia-card-valor"], [1, "pi", "atendimentos-dia-card-chevron"], [1, "atendimentos-dia-detalhe"], [1, "atendimentos-dia-detalhe-loading"], [1, "atendimentos-dia-detalhe-block"], [1, "atendimentos-dia-detalhe-empty"], ["role", "button", "tabindex", "0", 1, "fila-overlay", 3, "click"], ["role", "dialog", 1, "fila-modal", 3, "click"], [1, "fila-modal-head"], ["type", "button", 1, "fila-close", 3, "click"], [1, "fila-modal-body"], [1, "fila-list"], ["type", "button", "aria-label", "Op\xE7\xF5es", 1, "fila-menu"], [1, "pi", "pi-ellipsis-v"], ["role", "dialog", 1, "prod-modal", 3, "click"], [1, "prod-modal-head"], ["type", "button", 1, "prod-close", 3, "click"], [1, "prod-modal-body"], [1, "estoque-baixo-desc"], [1, "prod-table"], [1, "th-num"], [1, "estoque-baixo-row"], [1, "prod-row-img", 3, "src", "alt"], [1, "prod-row-placeholder"], [1, "td-num"], ["colspan", "4", 1, "prod-empty"], [1, "prod-modal-toolbar"], [1, "prod-search-wrap"], ["type", "text", "placeholder", "Buscar produtos...", 1, "prod-search-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "prod-btn-add", 3, "click"], [1, "pi", "pi-plus"], [1, "prod-err"], [1, "th-actions"], [1, "td-actions"], ["type", "button", "title", "Editar", 1, "prod-btn-action", 3, "click"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Excluir", 1, "prod-btn-action", "danger", 3, "click"], [1, "pi", "pi-trash"], ["colspan", "5", 1, "prod-empty"], ["role", "button", "tabindex", "0", 1, "prod-form-overlay", 3, "click"], ["type", "text", "formControlName", "descricao", "placeholder", "Nome do produto", 1, "prod-form-input"], ["type", "text", "placeholder", "R$ 0,00", 1, "prod-form-input", 3, "input", "blur", "value"], ["type", "number", "formControlName", "estoque", "min", "0", "placeholder", "0", 1, "prod-form-input"], [1, "prod-form-file-wrap"], ["type", "file", "accept", "image/*", 1, "prod-form-file", 3, "change"], [1, "prod-form-file-label", "prod-form-file-label--orange"], [1, "prod-form-imagem-preview"], ["type", "text", "placeholder", "Buscar servi\xE7os...", 1, "prod-search-input", 3, "ngModelChange", "ngModel"], ["type", "text", "formControlName", "descricao", "placeholder", "Nome do servi\xE7o", 1, "prod-form-input"], [1, "prod-form-file-label"], ["role", "button", "tabindex", "0", 1, "notif-overlay", 3, "click"], ["role", "dialog", 1, "notif-modal", 3, "click"], [1, "notif-header"], ["type", "button", 1, "notif-close", 3, "click"], [1, "notif-body"], [1, "notif-item", 3, "lida"], [1, "notif-empty"], [1, "notif-item", 3, "click"], [1, "notif-titulo"], [1, "notif-sub"], [1, "notif-valor"], [1, "notif-tempo"], ["role", "button", 1, "rec-overlay", 3, "click"], ["role", "dialog", 1, "rec-modal", 3, "click"], ["role", "button", "tabindex", "0", 1, "prod-overlay", 3, "click", "keydown.escape"], ["type", "button", "aria-label", "Fechar", 1, "prod-close", 3, "click"], [1, "agenda-modal-placeholder"], ["role", "button", "tabindex", "0", 1, "config-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", 1, "config-modal", 3, "click"], [1, "config-header"], ["type", "button", "aria-label", "Fechar", 1, "config-close", 3, "click"], [1, "config-body"], [1, "config-form-wrap"], ["type", "button", 1, "config-menu-item", 3, "click"], [1, "pi", "pi-lock"], ["type", "button", 1, "config-back", 3, "click"], [1, "pi", "pi-arrow-left"], ["type", "text", "formControlName", "nome", "placeholder", "Seu nome", 1, "prod-form-input"], [1, "config-readonly"], ["type", "password", "formControlName", "senha_atual", "placeholder", "Senha atual", 1, "prod-form-input"], ["type", "password", "formControlName", "nova_senha", "placeholder", "M\xEDnimo 4 caracteres", 1, "prod-form-input"], ["type", "password", "formControlName", "confirmar", "placeholder", "Repita a nova senha", 1, "prod-form-input"]], template: function DashboardRecepcaoComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "aside", 2)(2, "div", 3);
        \u0275\u0275element(3, "img", 4);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Wender ");
        \u0275\u0275elementStart(6, "span", 5);
        \u0275\u0275text(7, "Barbearia");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(8, "nav", 6)(9, "a", 7);
        \u0275\u0275element(10, "i", 8);
        \u0275\u0275elementStart(11, "span");
        \u0275\u0275text(12, "Inicio");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "button", 9);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_13_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalProdutos());
        });
        \u0275\u0275element(14, "i", 10);
        \u0275\u0275elementStart(15, "span");
        \u0275\u0275text(16, "Produtos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "button", 9);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_17_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalServicos());
        });
        \u0275\u0275element(18, "i", 11);
        \u0275\u0275elementStart(19, "span");
        \u0275\u0275text(20, "Servi\xE7os");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "button", 9);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_21_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalAgenda());
        });
        \u0275\u0275element(22, "i", 12);
        \u0275\u0275elementStart(23, "span");
        \u0275\u0275text(24, "Agenda");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "div", 13)(26, "div", 14)(27, "button", 15);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_27_listener() {
          \u0275\u0275restoreView(_r1);
          const avatarFileInput_r2 = \u0275\u0275reference(31);
          return \u0275\u0275resetView(avatarFileInput_r2.click());
        });
        \u0275\u0275template(28, DashboardRecepcaoComponent_Conditional_28_Template, 2, 0, "span", 16)(29, DashboardRecepcaoComponent_Conditional_29_Template, 1, 2, "img", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "input", 18, 0);
        \u0275\u0275listener("change", function DashboardRecepcaoComponent_Template_input_change_30_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onAvatarSelected($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 19)(33, "span", 20);
        \u0275\u0275text(34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 21);
        \u0275\u0275text(36, "Recepcionista");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "button", 22);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_37_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalConfiguracoes());
        });
        \u0275\u0275element(38, "i", 23);
        \u0275\u0275elementStart(39, "span");
        \u0275\u0275text(40, "Configura\xE7\xF5es");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(41, "main", 24)(42, "header", 25)(43, "div", 26)(44, "span", 27);
        \u0275\u0275text(45, "BEM-VINDO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "h2", 28);
        \u0275\u0275text(47);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 29)(49, "div", 30);
        \u0275\u0275element(50, "i", 31)(51, "input", 32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "button", 33);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_52_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalNotificacoes());
        });
        \u0275\u0275element(53, "i", 34);
        \u0275\u0275template(54, DashboardRecepcaoComponent_Conditional_54_Template, 1, 0, "span", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "button", 36);
        \u0275\u0275listener("click", function DashboardRecepcaoComponent_Template_button_click_55_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.auth.logout());
        });
        \u0275\u0275element(56, "i", 37);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(57, DashboardRecepcaoComponent_Conditional_57_Template, 13, 6, "div", 38)(58, DashboardRecepcaoComponent_Conditional_58_Template, 2, 0, "div", 39)(59, DashboardRecepcaoComponent_Conditional_59_Template, 95, 16, "div", 40);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(60, DashboardRecepcaoComponent_Conditional_60_Template, 22, 4, "div", 41)(61, DashboardRecepcaoComponent_Conditional_61_Template, 22, 4, "div", 41)(62, DashboardRecepcaoComponent_Conditional_62_Template, 23, 9, "div", 41)(63, DashboardRecepcaoComponent_Conditional_63_Template, 11, 1, "div", 42)(64, DashboardRecepcaoComponent_Conditional_64_Template, 10, 2, "div", 43)(65, DashboardRecepcaoComponent_Conditional_65_Template, 12, 1, "div", 44)(66, DashboardRecepcaoComponent_Conditional_66_Template, 24, 2, "div", 41)(67, DashboardRecepcaoComponent_Conditional_67_Template, 32, 3, "div", 41)(68, DashboardRecepcaoComponent_Conditional_68_Template, 30, 7, "div", 45)(69, DashboardRecepcaoComponent_Conditional_69_Template, 30, 3, "div", 41)(70, DashboardRecepcaoComponent_Conditional_70_Template, 27, 6, "div", 45)(71, DashboardRecepcaoComponent_Conditional_71_Template, 11, 1, "div", 46)(72, DashboardRecepcaoComponent_Conditional_72_Template, 32, 15, "div", 47)(73, DashboardRecepcaoComponent_Conditional_73_Template, 16, 0, "div", 41)(74, DashboardRecepcaoComponent_Conditional_74_Template, 11, 3, "div", 48);
      }
      if (rf & 2) {
        let tmp_3_0;
        \u0275\u0275advance(27);
        \u0275\u0275property("disabled", ctx.avatarUploading());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.avatarUploading() ? 28 : 29);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate((tmp_3_0 = ctx.user()) == null ? null : tmp_3_0.nome);
        \u0275\u0275advance(13);
        \u0275\u0275textInterpolate2("", ctx.saudacao(), ", ", ctx.nomeUsuario(), " \u{1F44B}");
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.notificacoesNaoLidas().length > 0 ? 54 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.recebimentoNotificacao() ? 57 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 58 : 59);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.lancamentoManualModalOpen() ? 60 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.sangriaModalOpen() ? 61 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.encerrarCaixaModalOpen() ? 62 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.recebimentoListaModalOpen() ? 63 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.atendimentosDiaModalOpen() ? 64 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.filaModalOpen() ? 65 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.estoqueBaixoModalOpen() ? 66 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.produtosModalOpen() ? 67 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.produtoFormModalOpen() ? 68 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.servicosModalOpen() ? 69 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.servicoFormModalOpen() ? 70 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.notificacoesModalOpen() ? 71 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.recebimentoModalOpen() && ctx.recebimentoNotificacao() ? 72 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.modalAgendaOpen() ? 73 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.configModalOpen() ? 74 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, CurrencyPipe, RouterLink, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.dashboard-recepcao[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  min-height: 100vh;\n  overflow: hidden;\n  background: #0d0d0d;\n  color: #fff;\n}\n@media (max-width: 768px) {\n  .dashboard-recepcao[_ngcontent-%COMP%] {\n    overflow-x: hidden;\n  }\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 260px;\n  min-width: 260px;\n  height: 100vh;\n  flex-shrink: 0;\n  background: #141414;\n  display: flex;\n  flex-direction: column;\n  border-right: 1px solid #1f1f1f;\n  overflow: hidden;\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.sidebar-logo[_ngcontent-%COMP%]   .sidebar-logo-img[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  color: #fff;\n  margin: 0;\n}\n.sidebar-logo[_ngcontent-%COMP%]   .logo-barbearia[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  padding: 16px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  overflow-y: auto;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  color: #a3a3a3;\n  text-decoration: none;\n  font-size: 0.95rem;\n  transition: background 0.2s, color 0.2s;\n}\n.nav-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: inherit;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: #1f1f1f;\n  color: #fff;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n}\n.nav-item.active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n}\n.nav-item.nav-item-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  background: none;\n  cursor: pointer;\n  text-align: left;\n  font-family: inherit;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 16px 12px 24px;\n  margin-top: auto;\n  border-top: 1px solid #1f1f1f;\n  display: flex;\n  justify-content: center;\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 10px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n.profile-avatar-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  cursor: pointer;\n  display: block;\n  line-height: 0;\n}\n.profile-avatar-wrap[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.profile-avatar-input[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  pointer-events: none;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n  background: #2a2a2a;\n  display: block;\n}\n.profile-avatar-loading[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: #2a2a2a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #ff9000;\n  font-size: 1.2rem;\n}\n.profile-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  text-align: center;\n}\n.profile-info[_ngcontent-%COMP%]   .profile-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.profile-info[_ngcontent-%COMP%]   .profile-cargo[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n}\n.btn-config[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 12px;\n  background: #262626;\n  border: none;\n  border-radius: 8px;\n  color: #a3a3a3;\n  font-size: 0.9rem;\n  transition: background 0.2s, color 0.2s;\n  width: 100%;\n  cursor: pointer;\n  font-family: inherit;\n}\n.btn-config[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-config[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.config-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1100;\n}\n.config-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  min-width: 320px;\n  max-width: 420px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);\n}\n.config-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #2a2a2a;\n}\n.config-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.config-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #a3a3a3;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n}\n.config-close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background: #333;\n}\n.config-body[_ngcontent-%COMP%] {\n  padding: 16px 20px 24px;\n  overflow-y: auto;\n}\n.config-menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  padding: 14px 16px;\n  background: #262626;\n  border: none;\n  border-radius: 10px;\n  color: #e5e5e5;\n  font-size: 1rem;\n  text-align: left;\n  cursor: pointer;\n  font-family: inherit;\n  margin-bottom: 10px;\n  transition: background 0.2s;\n}\n.config-menu-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:first-child {\n  color: #ff9000;\n  font-size: 1.1rem;\n}\n.config-menu-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child {\n  margin-left: auto;\n  color: #737373;\n  font-size: 0.9rem;\n}\n.config-menu-item[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.config-form-wrap[_ngcontent-%COMP%]   .config-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #a3a3a3;\n  cursor: pointer;\n  padding: 0 0 12px;\n  font-size: 0.9rem;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-family: inherit;\n}\n.config-form-wrap[_ngcontent-%COMP%]   .config-back[_ngcontent-%COMP%]:hover {\n  color: #ff9000;\n}\n.config-form-wrap[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 1rem;\n  color: #fff;\n}\n.config-form-wrap[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n  font-size: 0.9rem;\n  color: #a3a3a3;\n}\n.config-form-wrap[_ngcontent-%COMP%]   .config-readonly[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n  margin: 8px 0;\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  min-height: 0;\n  height: 100vh;\n  overflow-y: auto;\n  padding: 24px 32px 48px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%]   .header-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  letter-spacing: 0.08em;\n  color: #737373;\n  margin-bottom: 4px;\n}\n.header-left[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.search-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  background: #1a1a1a;\n  border-radius: 8px;\n  border: 1px solid #262626;\n  min-width: 280px;\n}\n.search-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 1rem;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 8px;\n  color: #fff;\n  cursor: pointer;\n  position: relative;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.btn-icon[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 8px;\n  height: 8px;\n  background: #ff9000;\n  border-radius: 50%;\n}\n.btn-logout[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-logout[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.loading-state[_ngcontent-%COMP%] {\n  padding: 48px;\n  text-align: center;\n  color: #737373;\n}\n@keyframes _ngcontent-%COMP%_dashboardFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 28px;\n  margin-bottom: 32px;\n}\n.card[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.card-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\n.card-clickable[_ngcontent-%COMP%]:hover {\n  background: #222;\n  border-color: #333;\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 4px;\n}\n.card-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #1a1a1a;\n}\n.card-icon.receita[_ngcontent-%COMP%], \n.card-icon.em-espera[_ngcontent-%COMP%], \n.card-icon.agendamentos[_ngcontent-%COMP%], \n.card-icon.caixa[_ngcontent-%COMP%] {\n  background: #ff9000;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  letter-spacing: 0.06em;\n  color: #a3a3a3;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #fff;\n}\n.card-value.card-value--green[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.card-detail[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n}\n.card-progress[_ngcontent-%COMP%] {\n  height: 4px;\n  background: #262626;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 8px;\n}\n.card-progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #ff9000;\n  border-radius: 2px;\n  transition: width 0.3s ease;\n}\n.charts-and-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-top: 8px;\n  margin-bottom: 24px;\n  align-items: stretch;\n}\n.col-left[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.col-left[_ngcontent-%COMP%]   .card-fila-panel[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n.col-left[_ngcontent-%COMP%]   .agenda-panel--inline[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n}\n.col-left[_ngcontent-%COMP%]   .agenda-panel--inline[_ngcontent-%COMP%]   .agenda-table-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n}\n.col-right[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n.col-right[_ngcontent-%COMP%]   .estoque-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 auto;\n}\n.agenda-panel--inline[_ngcontent-%COMP%]   .agenda-table-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n}\n.grid-bottom--single[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.card-fila-panel[_ngcontent-%COMP%] {\n  min-height: 280px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-list-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 200px;\n  max-height: 420px;\n  overflow-y: auto;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .link-ver[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #ff9000;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  font-weight: 600;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .link-ver[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-list--panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  background: #262626;\n  border-radius: 8px;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: #ff9000;\n  color: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px 12px;\n  font-size: 0.9rem;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  width: 100%;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-servico[_ngcontent-%COMP%], \n.card-fila-panel[_ngcontent-%COMP%]   .fila-hora[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-status[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-status.aguardando[_ngcontent-%COMP%] {\n  background: #93c5fd;\n  color: #1e3a8a;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-status.em-atendimento[_ngcontent-%COMP%] {\n  background: #1e3a8a;\n  color: #fff;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-status.atendido[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.card-fila-panel[_ngcontent-%COMP%]   .fila-empty[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #737373;\n  font-size: 0.9rem;\n}\n.chart-section[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  padding: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n}\n.chart-section[_ngcontent-%COMP%]   .chart-wrap[_ngcontent-%COMP%], \n.chart-section[_ngcontent-%COMP%]   .chart-pie-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n}\n.chart-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.chart-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0 0 4px 0;\n}\n.chart-filter-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.btn-chart-filtro[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 10px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-chart-filtro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.btn-chart-filtro[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.btn-chart-filtro.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n  border-color: #ff9000;\n}\n.chart-filter-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  z-index: 50;\n  min-width: 280px;\n  padding: 16px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.chart-filter-dates[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 8px 12px;\n}\n.chart-filter-dates[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.chart-date-input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #333;\n  border-radius: 8px;\n  background: #0d0d0d;\n  color: #fff;\n  font-size: 0.9rem;\n}\n.chart-date-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #ff9000;\n}\n.chart-filter-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.chart-period-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #a3a3a3;\n  font-size: 0.85rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.chart-period-btn[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.chart-period-btn.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n  border-color: #ff9000;\n}\n.chart-filter-aplicar[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: none;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.chart-filter-aplicar[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.chart-wrap[_ngcontent-%COMP%] {\n  min-height: 220px;\n  padding: 12px 0;\n  background: transparent;\n  border-radius: 8px;\n  position: relative;\n  overflow: hidden;\n}\n.chart-bars-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.chart-svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  display: block;\n}\n.chart-grid[_ngcontent-%COMP%] {\n  stroke: rgba(255, 255, 255, 0.08);\n  stroke-width: 0.5;\n}\n.chart-svg-bars[_ngcontent-%COMP%]   .chart-bar[_ngcontent-%COMP%] {\n  transition: opacity 0.2s ease;\n}\n.chart-svg-bars[_ngcontent-%COMP%]   .chart-bar[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.chart-svg-bars[_ngcontent-%COMP%]   .chart-bar.chart-bar-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.chart-labels-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-evenly;\n  padding: 0 16px;\n  gap: 4px;\n}\n.chart-label[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  font-size: 0.8rem;\n  color: #737373;\n  min-width: 0;\n}\n.chart-label-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.chart-label-clickable[_ngcontent-%COMP%]:hover {\n  color: rgba(255, 255, 255, 0.9);\n}\n.chart-empty[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #525252;\n  font-size: 0.9rem;\n}\n.estoque-section[_ngcontent-%COMP%]   .chart-header.estoque-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.estoque-section[_ngcontent-%COMP%]   .chart-pie-wrap.estoque-wrap[_ngcontent-%COMP%] {\n  flex-direction: column;\n  align-items: stretch;\n  gap: 12px;\n  min-height: 0;\n}\n.grid-bottom[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.panel[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n}\n.panel-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.panel-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0;\n}\n.panel-head-agenda[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.panel-head-agenda[_ngcontent-%COMP%]   .agenda-head-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.agenda-filter-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.btn-agenda-filtro[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-agenda-filtro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-agenda-filtro[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.btn-agenda-filtro.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #000;\n  border-color: #ff9000;\n}\n.agenda-filter-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  z-index: 50;\n  min-width: 260px;\n  max-width: min(320px, 100vw - 32px);\n  padding: 16px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #a3a3a3;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 6px;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #ff9000;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .btn-aplicar[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .btn-aplicar[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.agenda-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 8px;\n  border: 1px solid #262626;\n}\n.agenda-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.agenda-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #262626;\n}\n.agenda-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  font-weight: 600;\n  color: #a3a3a3;\n  white-space: nowrap;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #262626;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 144, 0, 0.06);\n}\n.agenda-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  color: #e5e5e5;\n}\n.agenda-table[_ngcontent-%COMP%]   .agenda-empty-cell[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #525252;\n  padding: 20px;\n}\n.prof-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.prof-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #262626;\n}\n.prof-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.prof-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  background: #262626;\n  flex-shrink: 0;\n}\n.prof-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.prof-info[_ngcontent-%COMP%]   .prof-nome[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #fff;\n}\n.prof-info[_ngcontent-%COMP%]   .prof-media[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #ff9000;\n  font-weight: 500;\n}\n.prof-valor[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-weight: 600;\n  color: #ff9000;\n  font-size: 0.95rem;\n}\n.prof-empty[_ngcontent-%COMP%] {\n  padding: 16px 0;\n  color: #525252;\n  font-size: 0.9rem;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.45s ease forwards;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.05s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.1s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.15s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.2s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .top-row[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.5s ease forwards;\n  animation-delay: 0.25s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .recepcao-cards-row[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.5s ease forwards;\n  animation-delay: 0.32s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .agenda-top-card[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.5s ease forwards;\n  animation-delay: 0.3s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .middle-row[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.5s ease forwards;\n  animation-delay: 0.38s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .middle-row[_ngcontent-%COMP%]   .card-fila[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.recebimento-toast[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 32px;\n  bottom: 32px;\n  z-index: 1100;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #ff9000;\n  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);\n  cursor: pointer;\n  min-width: 260px;\n}\n.recebimento-toast-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #ff9000;\n  color: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.recebimento-toast-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.recebimento-toast-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.recebimento-toast-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #fff;\n}\n.recebimento-toast-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #e5e5e5;\n}\n.recebimento-toast-close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.recebimento-toast-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.top-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 24px;\n  align-items: stretch;\n  margin-top: 40px;\n  margin-bottom: 24px;\n}\n.top-row[_ngcontent-%COMP%]   .col-4[_ngcontent-%COMP%] {\n  grid-column: span 4;\n  min-width: 0;\n  max-height: 200px;\n}\n.top-row[_ngcontent-%COMP%]   .col-4.col-agenda[_ngcontent-%COMP%] {\n  max-height: none;\n}\n.agenda-top-card[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 16px;\n  border: 1px solid #262626;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 200px;\n}\n.agenda-top-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n}\n.agenda-top-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.agenda-top-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-agenda-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid #262626;\n  border-radius: 8px;\n  color: #fff;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-agenda-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-agenda-icon[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #ff9000;\n}\n.agenda-top-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.agenda-top-item[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n  border-left: 3px solid #ff9000;\n  background: #262626;\n}\n.agenda-top-item.agenda-top-item--confirmado[_ngcontent-%COMP%] {\n  border-left-color: #22c55e;\n}\n.agenda-top-item.agenda-top-item--pendente[_ngcontent-%COMP%] {\n  border-left-color: #737373;\n}\n.agenda-top-item-inner[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n}\n.agenda-top-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.agenda-top-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  font-size: 0.9rem;\n}\n.agenda-top-hora[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n}\n.agenda-top-barbeiro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.8rem;\n  color: #737373;\n  margin-bottom: 8px;\n}\n.agenda-top-barbeiro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.agenda-top-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.agenda-top-status[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.agenda-top-status.agenda-top-status--agendado[_ngcontent-%COMP%] {\n  background: #93c5fd;\n  color: #1e3a8a;\n}\n.agenda-top-status.agenda-top-status--confirmado[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.agenda-top-status.agenda-top-status--pendente[_ngcontent-%COMP%] {\n  background: #525252;\n  color: #fff;\n}\n.agenda-top-confirm[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #ff9000;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n}\n.agenda-top-confirm[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.agenda-top-empty[_ngcontent-%COMP%] {\n  padding: 16px;\n  text-align: center;\n  color: #737373;\n  font-size: 0.9rem;\n  list-style: none;\n}\n.middle-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 24px;\n  align-items: stretch;\n  margin-bottom: 24px;\n}\n.middle-row[_ngcontent-%COMP%]   .col-8[_ngcontent-%COMP%] {\n  grid-column: span 8;\n  min-width: 0;\n  max-height: none;\n}\n.card-caixa[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  padding: 20px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  justify-content: space-between;\n  gap: 16px;\n  position: relative;\n  min-width: 0;\n  overflow: hidden;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-caixa-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-caixa-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-caixa-ver-detalhes[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 0.8rem;\n  color: #ff9000;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  text-decoration: none;\n  text-align: left;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-caixa-ver-detalhes[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-caixa-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: center;\n}\n.card-caixa[_ngcontent-%COMP%]   .btn-caixa-acao[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 12px;\n  background: #262626;\n  border: 1px solid #404040;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 0.8rem;\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n}\n.card-caixa[_ngcontent-%COMP%]   .btn-caixa-acao[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.card-caixa[_ngcontent-%COMP%]   .btn-caixa-acao[_ngcontent-%COMP%]:hover {\n  background: #333;\n  border-color: #ff9000;\n  color: #ff9000;\n}\n.card-caixa[_ngcontent-%COMP%]   .btn-caixa-encerrar[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n  color: #ef4444;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-label[_ngcontent-%COMP%] {\n  color: #a3a3a3;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-detail[_ngcontent-%COMP%] {\n  color: #737373;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-value.card-value--caixa[_ngcontent-%COMP%] {\n  color: #fff;\n  font-weight: 700;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-icon.caixa[_ngcontent-%COMP%] {\n  background: #ff9000;\n}\n.card-caixa[_ngcontent-%COMP%]   .card-icon.caixa[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n}\n.card-caixa-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 4px;\n}\n.card-caixa-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #fff;\n}\n.btn-refresh[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: #ff9000;\n  cursor: pointer;\n  border-radius: 8px;\n}\n.btn-refresh[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 144, 0, 0.15);\n}\n.btn-refresh[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.card-caixa-valor[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 0;\n}\n.card-caixa-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  background: rgba(255, 144, 0, 0.18);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-caixa-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  color: #ff9000;\n}\n.card-acoes[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 6px;\n  min-width: 0;\n}\n.card-acoes--grid[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  padding: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  align-items: stretch;\n}\n.card-acoes-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-height: 0;\n}\n.card-acoes-col[_ngcontent-%COMP%]   .acao-item[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 70px;\n  padding: 20px 16px;\n  gap: 14px;\n  font-size: 1rem;\n}\n.card-acoes-col[_ngcontent-%COMP%]   .acao-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n}\n.acao-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 6px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  transition: background 0.2s, border-color 0.2s;\n  position: relative;\n  cursor: pointer;\n  text-decoration: none;\n  font-family: inherit;\n  box-sizing: border-box;\n}\n.acao-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #fff;\n}\n.acao-item[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  border-color: #ff9000;\n}\nbutton.acao-item[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100%;\n  cursor: pointer;\n  font-family: inherit;\n}\n.acao-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.7rem;\n  font-weight: 700;\n  border-radius: 999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-agenda[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n  display: flex;\n  flex-direction: column;\n  min-width: 280px;\n}\n.card-agenda-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.card-agenda-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.card-agenda-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-icon-sm[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n}\n.btn-icon-sm[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.btn-icon-sm[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.agenda-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 16px 0;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.agenda-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #262626;\n  border-left: 3px solid transparent;\n  padding-left: 8px;\n}\n.agenda-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.agenda-item.agendado[_ngcontent-%COMP%] {\n  border-left-color: #3b82f6;\n}\n.agenda-item.confirmado[_ngcontent-%COMP%] {\n  border-left-color: #22c55e;\n}\n.agenda-item.pendente[_ngcontent-%COMP%] {\n  border-left-color: #737373;\n}\n.agenda-item-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px 12px;\n}\n.agenda-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.agenda-hora[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 0.9rem;\n}\n.agenda-barbeiro[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n  width: 100%;\n}\n.agenda-status[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.agenda-status.agendado[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: #fff;\n}\n.agenda-status.confirmado[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.agenda-status.pendente[_ngcontent-%COMP%] {\n  background: #e5e5e5;\n  color: #404040;\n}\n.agenda-confirmar[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #ff9000;\n  text-decoration: none;\n  flex-shrink: 0;\n}\n.agenda-confirmar[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.agenda-empty[_ngcontent-%COMP%] {\n  padding: 16px 0;\n  color: #737373;\n  font-size: 0.9rem;\n  list-style: none;\n}\n.btn-novo-agendamento[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n  margin-top: auto;\n}\n.btn-novo-agendamento[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.recepcao-cards-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-bottom: 24px;\n  align-items: stretch;\n}\n.recepcao-cards-row--single[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.recepcao-estoque-section[_ngcontent-%COMP%], \n.recepcao-agenda-panel[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n.recepcao-estoque-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.recepcao-estoque-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.recepcao-estoque-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  flex: 1;\n  min-height: 0;\n}\n.estoque-search-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n}\n.estoque-search-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 1rem;\n}\n.estoque-search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.estoque-search-input[_ngcontent-%COMP%]::placeholder {\n  color: #737373;\n}\n.estoque-grid-wrap[_ngcontent-%COMP%] {\n  max-height: 520px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.estoque-grid[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background: #1a1a1a;\n  z-index: 1;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  color: #a3a3a3;\n  font-weight: 600;\n  border-bottom: 1px solid #262626;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   .th-qtd[_ngcontent-%COMP%] {\n  text-align: right;\n  width: 90px;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   .th-img[_ngcontent-%COMP%] {\n  width: 56px;\n  text-align: right;\n  padding-right: 12px;\n}\n.estoque-grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-bottom: 1px solid #262626;\n  color: rgba(255, 255, 255, 0.9);\n}\n.estoque-grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.estoque-baixo[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 600;\n}\n.estoque-grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.estoque-baixo[_ngcontent-%COMP%]   .td-qtd[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.estoque-grid[_ngcontent-%COMP%]   .td-qtd[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: #ff9000;\n}\n.estoque-grid[_ngcontent-%COMP%]   .td-img[_ngcontent-%COMP%] {\n  text-align: right;\n  vertical-align: middle;\n  padding: 6px 12px;\n  width: 56px;\n}\n.estoque-grid[_ngcontent-%COMP%]   .estoque-produto-img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n  border-radius: 8px;\n  background: #262626;\n  display: block;\n  margin-left: auto;\n}\n.estoque-grid[_ngcontent-%COMP%]   .estoque-produto-placeholder[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #262626;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: auto;\n  color: #525252;\n  font-size: 1rem;\n}\n.estoque-grid[_ngcontent-%COMP%]   .estoque-empty[_ngcontent-%COMP%] {\n  color: #737373;\n  text-align: center;\n  padding: 24px 12px;\n  font-size: 0.9rem;\n}\n.recepcao-agenda-panel[_ngcontent-%COMP%]   .panel-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.recepcao-agenda-panel[_ngcontent-%COMP%]   .panel-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.agenda-head-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.btn-agenda-calendar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-agenda-calendar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-agenda-calendar[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.agenda-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 8px;\n  border: 1px solid #262626;\n  flex: 1;\n  min-height: 0;\n}\n.agenda-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.agenda-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #262626;\n}\n.agenda-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  font-weight: 600;\n  color: #a3a3a3;\n  white-space: nowrap;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #262626;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  color: rgba(255, 255, 255, 0.9);\n}\n.agenda-table[_ngcontent-%COMP%]   .agenda-empty-cell[_ngcontent-%COMP%] {\n  color: #737373;\n  text-align: center;\n  padding: 24px 12px;\n}\n.card-fila[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 10px;\n  padding: 10px 12px;\n  border: 1px solid #262626;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n.card-fila-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n  flex-shrink: 0;\n}\n.card-fila-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #fff;\n}\n.link-ver-todos[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #ff9000;\n  text-decoration: none;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n}\n.link-ver-todos[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.fila-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 4px;\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n}\n.fila-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 8px;\n  background: #262626;\n  border-radius: 6px;\n  flex-shrink: 0;\n}\n.fila-avatar[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: #ff9000;\n  color: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.fila-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.fila-info[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  grid-template-columns: auto auto;\n  grid-auto-rows: auto;\n  align-items: center;\n  gap: 2px 8px;\n  font-size: 0.8rem;\n}\n.fila-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  grid-column: 1/-1;\n}\n.fila-servico[_ngcontent-%COMP%], \n.fila-hora[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #737373;\n}\n.fila-status[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.fila-status.aguardando[_ngcontent-%COMP%] {\n  background: #93c5fd;\n  color: #1e3a8a;\n}\n.fila-status.em-atendimento[_ngcontent-%COMP%] {\n  background: #1e3a8a;\n  color: #fff;\n}\n.fila-status.atendido[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.fila-menu[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: #737373;\n  cursor: pointer;\n  border-radius: 8px;\n  flex-shrink: 0;\n}\n.fila-menu[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.fila-menu[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.fila-empty[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: center;\n  color: #737373;\n  font-size: 0.8rem;\n  list-style: none;\n  grid-column: 1/-1;\n}\n.fila-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1150;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.fila-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 520px;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.fila-modal-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.fila-modal-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.fila-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.fila-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.fila-modal-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n}\n.prod-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1150;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.prod-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 720px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.prod-modal-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.prod-modal-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.prod-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.prod-modal-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 20px;\n  border-bottom: 1px solid #262626;\n}\n.prod-search-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  background: #262626;\n  border-radius: 8px;\n  border: 1px solid #333;\n}\n.prod-search-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 0.95rem;\n}\n.prod-search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.prod-search-input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\n.prod-btn-add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.prod-btn-add[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.prod-btn-add[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.prod-err[_ngcontent-%COMP%] {\n  margin: 0 20px 8px;\n  font-size: 0.85rem;\n  color: #ef4444;\n}\n.prod-modal-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n}\n.agenda-modal-placeholder[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #a3a3a3;\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n.agenda-modal-placeholder[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e5e5e5;\n}\n.prod-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.prod-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.prod-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  text-align: left;\n  border-bottom: 1px solid #262626;\n  color: #e5e5e5;\n}\n.prod-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #a3a3a3;\n}\n.prod-table[_ngcontent-%COMP%]   .th-img[_ngcontent-%COMP%] {\n  width: 56px;\n}\n.prod-table[_ngcontent-%COMP%]   .th-num[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: right;\n}\n.prod-table[_ngcontent-%COMP%]   .th-actions[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n}\n.prod-table[_ngcontent-%COMP%]   .td-num[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.prod-table[_ngcontent-%COMP%]   .td-actions[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.prod-row-img[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  object-fit: cover;\n  border-radius: 8px;\n  display: block;\n}\n.prod-row-placeholder[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 8px;\n  background: #262626;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #737373;\n}\n.prod-row-placeholder[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.prod-btn-action[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  margin: 0 2px;\n  border: none;\n  background: #262626;\n  color: #e5e5e5;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-btn-action[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.prod-btn-action.danger[_ngcontent-%COMP%]:hover {\n  background: #7f1d1d;\n  color: #fca5a5;\n}\n.prod-btn-action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.prod-empty[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #737373;\n  font-size: 0.9rem;\n}\n.prod-form-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1250;\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.prod-form-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 420px;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.prod-form-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.prod-form-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.prod-form-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-form-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.prod-form-body[_ngcontent-%COMP%] {\n  padding: 18px 20px 20px;\n}\n.prod-form-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  color: #a3a3a3;\n  margin-top: 12px;\n  margin-bottom: 6px;\n}\n.prod-form-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n.prod-form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 0.95rem;\n  box-sizing: border-box;\n  outline: none;\n}\n.prod-form-input.readonly[_ngcontent-%COMP%] {\n  background: #1f1f1f;\n  color: #a3a3a3;\n  cursor: default;\n}\n.prod-form-input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\n.prod-form-file-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.prod-form-file[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.prod-form-file-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 10px 16px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.prod-form-file-label[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.prod-form-file-label.prod-form-file-label--orange[_ngcontent-%COMP%] {\n  background: #ff9000;\n  border-color: #ff9000;\n  color: #1a1a1a;\n  font-weight: 600;\n}\n.prod-form-file-label.prod-form-file-label--orange[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n  border-color: #e67e00;\n  color: #1a1a1a;\n}\n.prod-form-imagem-preview[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 0.85rem;\n  color: #22c55e;\n}\n.prod-form-err[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  font-size: 0.85rem;\n  color: #ef4444;\n}\n.prod-form-footer[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.prod-form-btn-sec[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #e5e5e5;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.prod-form-btn-sec[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.prod-form-btn-pri[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  border: none;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.prod-form-btn-pri[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.prod-form-btn-pri[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e67e00;\n}\n.prod-form-btn-pri.prod-form-btn-danger[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n.prod-form-btn-pri.prod-form-btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #b91c1c;\n}\n.bottom-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 20px;\n}\n.bottom-cards--compact[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n  margin: 0;\n}\n.resumo-card[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 8px;\n}\n.resumo-card[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.resumo-card[_ngcontent-%COMP%]   .resumo-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #e5e5e5;\n}\n.resumo-card[_ngcontent-%COMP%]   .resumo-valor[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.resumo-card[_ngcontent-%COMP%]:hover {\n  border-color: #333;\n}\n.resumo-card.estoque[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n}\n.resumo-card.em-espera[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\n.resumo-card.em-espera[_ngcontent-%COMP%]   .resumo-valor[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\n.resumo-card.agendamentos[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.resumo-card.agendamentos[_ngcontent-%COMP%]   .resumo-valor[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.resumo-card.estoque[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.resumo-card.estoque[_ngcontent-%COMP%]   .resumo-valor[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.resumo-card.atendidos[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.resumo-card.atendidos[_ngcontent-%COMP%]   .resumo-valor[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\nbutton.resumo-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #262626;\n  font-family: inherit;\n  color: inherit;\n  text-align: left;\n  width: 100%;\n  box-sizing: border-box;\n}\n.estoque-baixo-desc[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.estoque-baixo-row[_ngcontent-%COMP%]   .td-num[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 600;\n}\n@media (max-width: 1100px) {\n  .main[_ngcontent-%COMP%] {\n    padding: 20px 24px 40px;\n  }\n  .cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n    margin-bottom: 24px;\n  }\n  .charts-and-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    margin-bottom: 20px;\n  }\n  .col-left[_ngcontent-%COMP%], \n   .col-right[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .card-fila-panel[_ngcontent-%COMP%] {\n    min-height: 240px;\n  }\n  .card-fila-panel[_ngcontent-%COMP%]   .fila-list-wrap[_ngcontent-%COMP%] {\n    max-height: 320px;\n  }\n  .estoque-grid-wrap[_ngcontent-%COMP%] {\n    max-height: 360px;\n  }\n  .agenda-table-wrap[_ngcontent-%COMP%], \n   .estoque-grid-wrap[_ngcontent-%COMP%] {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  .agenda-table[_ngcontent-%COMP%] {\n    min-width: 480px;\n  }\n  .estoque-grid[_ngcontent-%COMP%] {\n    min-width: 280px;\n  }\n  .grid-bottom[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .top-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .top-row[_ngcontent-%COMP%]   .col-4[_ngcontent-%COMP%] {\n    grid-column: span 1;\n    max-height: none;\n  }\n  .middle-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .middle-row[_ngcontent-%COMP%]   .col-8[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n  .middle-row[_ngcontent-%COMP%]   .card-fila[_ngcontent-%COMP%] {\n    min-height: 180px;\n  }\n  .recepcao-cards-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .bottom-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .dashboard-recepcao[_ngcontent-%COMP%] {\n    flex-direction: column;\n    height: auto;\n    min-height: 100vh;\n  }\n  .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: unset;\n    height: auto;\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 12px 16px;\n    gap: 8px;\n    align-items: center;\n  }\n  .sidebar-logo[_ngcontent-%COMP%] {\n    padding: 12px 0;\n    flex: 0 0 auto;\n  }\n  .sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .sidebar-logo[_ngcontent-%COMP%]   .sidebar-logo-img[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n  }\n  .sidebar-nav[_ngcontent-%COMP%] {\n    flex-direction: row;\n    flex-wrap: wrap;\n    flex: 1;\n    padding: 0;\n    gap: 4px;\n    justify-content: flex-end;\n  }\n  .nav-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .nav-item[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n  }\n  .nav-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n  .sidebar-footer[_ngcontent-%COMP%] {\n    width: auto;\n    padding: 0;\n    margin: 0;\n    border: none;\n  }\n  .profile-card[_ngcontent-%COMP%] {\n    flex-direction: row;\n    padding: 8px 12px;\n    gap: 8px;\n  }\n  .profile-info[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .btn-config[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: 60vh;\n    padding: 16px 16px 32px;\n    gap: 20px;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .header-title[_ngcontent-%COMP%] {\n    font-size: 1.35rem !important;\n  }\n  .header-right[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n  }\n  .search-wrap[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n  }\n  .cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n    margin-bottom: 20px;\n  }\n  .card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .card-value[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .charts-and-grid[_ngcontent-%COMP%] {\n    gap: 16px;\n    margin-bottom: 16px;\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .card-fila-panel[_ngcontent-%COMP%] {\n    min-height: 200px;\n  }\n  .card-fila-panel[_ngcontent-%COMP%]   .fila-list-wrap[_ngcontent-%COMP%] {\n    max-height: 280px;\n  }\n  .estoque-grid-wrap[_ngcontent-%COMP%] {\n    max-height: 280px;\n  }\n  .agenda-table[_ngcontent-%COMP%] {\n    min-width: 420px;\n    font-size: 0.85rem;\n  }\n  .estoque-grid[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n@media (max-width: 480px) {\n  .sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .main[_ngcontent-%COMP%] {\n    padding: 12px 12px 24px;\n  }\n  .header-title[_ngcontent-%COMP%] {\n    font-size: 1.15rem !important;\n  }\n  .cards[_ngcontent-%COMP%] {\n    gap: 10px;\n    margin-bottom: 16px;\n  }\n  .card[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .card-value[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .agenda-table[_ngcontent-%COMP%] {\n    min-width: 360px;\n  }\n  .fila-item[_ngcontent-%COMP%] {\n    padding: 10px !important;\n  }\n  .fila-avatar[_ngcontent-%COMP%] {\n    width: 32px !important;\n    height: 32px !important;\n  }\n  .fila-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 0.85rem !important;\n  }\n}\n@media (max-width: 768px) {\n  .notif-overlay[_ngcontent-%COMP%], \n   .fila-overlay[_ngcontent-%COMP%], \n   .atendimentos-dia-overlay[_ngcontent-%COMP%], \n   .prod-overlay[_ngcontent-%COMP%], \n   .rec-overlay[_ngcontent-%COMP%], \n   .prod-form-overlay[_ngcontent-%COMP%] {\n    padding: 12px;\n    align-items: flex-start;\n  }\n  .notif-modal[_ngcontent-%COMP%], \n   .fila-modal[_ngcontent-%COMP%], \n   .atendimentos-dia-modal[_ngcontent-%COMP%], \n   .prod-modal[_ngcontent-%COMP%], \n   .rec-modal[_ngcontent-%COMP%], \n   .prod-form-modal[_ngcontent-%COMP%] {\n    width: 100% !important;\n    max-width: 100% !important;\n    max-height: 90vh;\n  }\n  .recebimento-toast[_ngcontent-%COMP%] {\n    left: 12px;\n    right: 12px;\n    width: auto;\n  }\n}\n.notif-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1150;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.notif-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 420px;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.notif-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.notif-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.notif-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.notif-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.notif-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  max-height: calc(80vh - 60px);\n}\n.notif-item[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  border-bottom: 1px solid #262626;\n  cursor: pointer;\n}\n.notif-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.notif-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 144, 0, 0.08);\n}\n.notif-item.lida[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.notif-titulo[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.notif-sub[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.notif-valor[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #ff9000;\n  font-weight: 600;\n}\n.notif-tempo[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #737373;\n  margin-top: 4px;\n}\n.notif-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 20px 0;\n  text-align: center;\n  color: #737373;\n}\n.rec-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1200;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.rec-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 400px;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.rec-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.rec-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.rec-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.rec-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.rec-body[_ngcontent-%COMP%] {\n  padding: 18px 20px 20px;\n}\n.rec-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 0.95rem;\n  color: #e5e5e5;\n}\n.rec-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.rec-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  color: #a3a3a3;\n  margin-top: 12px;\n  margin-bottom: 8px;\n}\n.rec-tipos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.rec-tipo[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 999px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #e5e5e5;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.rec-tipo[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.rec-tipo.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  border-color: #ff9000;\n  color: #1a1a1a;\n}\n.rec-erro[_ngcontent-%COMP%] {\n  margin: 8px 0 0 !important;\n  font-size: 0.85rem;\n  color: #ef4444 !important;\n}\n.rec-footer[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.rec-btn-sec[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #e5e5e5;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.rec-btn-sec[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.rec-btn-pri[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: none;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.rec-btn-pri[_ngcontent-%COMP%]:disabled {\n  opacity: 0.8;\n  cursor: not-allowed;\n}\n.rec-btn-pri[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e67e00;\n}\n.rec-modal-lista[_ngcontent-%COMP%] {\n  max-width: 420px;\n}\n.rec-loading[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 20px 0;\n  text-align: center;\n  color: #a3a3a3;\n  font-size: 0.95rem;\n}\n.rec-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 20px 0;\n  text-align: center;\n  color: #737373;\n  font-size: 0.95rem;\n}\n.rec-confirm-view[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.rec-lista-encerrados[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  max-height: 280px;\n  overflow-y: auto;\n}\n.rec-item-encerrado[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n}\n.rec-item-encerrado[_ngcontent-%COMP%]:hover {\n  background: #333;\n  border-color: #404040;\n}\n.rec-item-encerrado[_ngcontent-%COMP%]   i.pi-chevron-right[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #737373;\n  font-size: 0.85rem;\n}\n.rec-item-nome[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.95rem;\n  color: #e5e5e5;\n}\n.rec-item-valor[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #ff9000;\n}\n.atendimentos-dia-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1200;\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.atendimentos-dia-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 420px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);\n}\n.atendimentos-dia-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n  flex-shrink: 0;\n}\n.atendimentos-dia-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.atendimentos-dia-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.atendimentos-dia-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.atendimentos-dia-close[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.atendimentos-dia-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  max-height: calc(85vh - 70px);\n}\n.atendimentos-dia-loading[_ngcontent-%COMP%], \n.atendimentos-dia-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #737373;\n  font-size: 0.95rem;\n  text-align: center;\n  padding: 24px;\n}\n.atendimentos-dia-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #2c2c2c;\n  border-radius: 10px;\n  border: 1px solid #333;\n}\n.atendimentos-dia-card-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #ff9000;\n  color: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.atendimentos-dia-card-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.atendimentos-dia-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.atendimentos-dia-card-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  font-size: 1rem;\n}\n.atendimentos-dia-card-hora[_ngcontent-%COMP%], \n.atendimentos-dia-card-servico[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.atendimentos-dia-card-valor[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #ff9000;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.atendimentos-dia-item[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.atendimentos-dia-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.atendimentos-dia-card-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\n.atendimentos-dia-card-clickable[_ngcontent-%COMP%]:hover {\n  background: #333;\n  border-color: #404040;\n}\n.atendimentos-dia-card-chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #737373;\n  font-size: 0.9rem;\n  margin-left: 8px;\n}\n.atendimentos-dia-detalhe[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding: 14px 16px 14px 56px;\n  background: #252525;\n  border-radius: 10px;\n  border: 1px solid #333;\n  font-size: 0.9rem;\n}\n.atendimentos-dia-detalhe-loading[_ngcontent-%COMP%], \n.atendimentos-dia-detalhe-empty[_ngcontent-%COMP%] {\n  color: #a3a3a3;\n  margin: 0;\n  font-size: 0.9rem;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e5e5e5;\n  display: block;\n  margin-bottom: 6px;\n  font-size: 0.85rem;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: #a3a3a3;\n  padding: 4px 0;\n  border-bottom: 1px solid #2c2c2c;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n/*# sourceMappingURL=dashboard-recepcao.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardRecepcaoComponent, { className: "DashboardRecepcaoComponent", filePath: "src\\app\\pages\\dashboard-recepcao\\dashboard-recepcao.component.ts", lineNumber: 40 });
})();

export {
  addMonths,
  endOfMonth,
  startOfMonth,
  format,
  getDay,
  isSameMonth,
  subDays,
  parseISO,
  subMonths,
  pt_BR_default,
  DashboardRecepcaoComponent
};
//# sourceMappingURL=chunk-VBX3JNLB.js.map
