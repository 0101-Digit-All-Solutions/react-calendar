"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
require("./calendar.css");
var _styles = require("./styles");
var _dropdown_icon = _interopRequireDefault(require("../assets/icons/dropdown_icon.png"));
const Calendar = props => {
  const weekdayshort = _moment.default.weekdaysShort();
  const [showCalendarTable, setShowCalendarTable] = (0, _react.useState)(true);
  const [showMonthTable, setShowMonthTable] = (0, _react.useState)(false);
  const [dateObject, setDateObject] = (0, _react.useState)((0, _moment.default)());
  const [allmonths, setAllMonths] = (0, _react.useState)(_moment.default.months());
  const [showYearNav, setShowYearNav] = (0, _react.useState)(false);
  const [blanks, setBlanks] = (0, _react.useState)([]);
  const [daysInMonth, setDaysInMonth] = (0, _react.useState)([]);
  const [yearTitle, setYearTitle] = (0, _react.useState)(null);
  const [monthTitle, setMonthTitle] = (0, _react.useState)(null);
  const [headerLabel, setHeaderLabel] = (0, _react.useState)('');
  const onDayClick = (0, _react.useCallback)((e, d) => {
    let newDtObj = Object.assign({}, dateObject);
    newDtObj = (0, _moment.default)(newDtObj).set("date", d);
    setDateObject(newDtObj);
    props.onSelectDate(newDtObj);
  }, [dateObject, props]);
  (0, _react.useEffect)(() => {
    let yearData = dateObject.format("Y");
    let monthData = dateObject.format("MMMM");
    let today = dateObject.date();
    let navHeaderText = "".concat(monthData, " ").concat(today, ", ").concat(yearData);
    setYearTitle(yearData);
    setMonthTitle(monthData);
    setHeaderLabel(navHeaderText);
  }, [dateObject]);
  (0, _react.useEffect)(() => {
    const tempBlanks = [];
    let date_Object = dateObject;
    let firstDay = (0, _moment.default)(date_Object).startOf("month").format("d"); // Day of week 0...1..5...6
    for (let i = 0; i < firstDay; i++) {
      tempBlanks.push( /*#__PURE__*/_react.default.createElement("td", {
        className: "calendar-day empty"
      }, ""));
    }
    ;
    setBlanks(tempBlanks);
  }, [dateObject]);
  (0, _react.useEffect)(() => {
    const tempDIM = [];
    console.log(dateObject);
    console.log(dateObject.month());
    const days_In_Month = dateObject.daysInMonth();
    const currentDay = dateObject.format("D");
    for (let d = 1; d <= days_In_Month; d++) {
      let current_Day = parseInt(d) === parseInt(currentDay) ? "today" : null;
      let hasTask = props.taskArray && props.taskArray.filter(item => (0, _moment.default)(item.due_date).date() === d && (0, _moment.default)(item.due_date).month() === dateObject.month());
      tempDIM.push( /*#__PURE__*/_react.default.createElement("td", {
        key: d,
        className: "calendar-day ".concat(current_Day)
      }, /*#__PURE__*/_react.default.createElement("span", {
        onClick: e => {
          onDayClick(e, d);
        }
      }, d, hasTask.length > 0 && /*#__PURE__*/_react.default.createElement("p", {
        style: _styles.styles.dotStyle
      }, "."))));
    }
    setDaysInMonth(tempDIM);
  }, [dateObject, onDayClick]);
  const showMonth = (e, month) => {
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
  };
  const setMonth = (0, _react.useCallback)(month => {
    let monthNo = allmonths.indexOf(month);
    let date_Object = Object.assign({}, dateObject);
    date_Object = (0, _moment.default)(date_Object).set("month", monthNo);
    setDateObject(date_Object);
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
  }, [allmonths, dateObject, showCalendarTable, showMonthTable]);
  const MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push( /*#__PURE__*/_react.default.createElement("td", {
        key: data,
        className: "calendar-month",
        onClick: e => {
          setMonth(data);
        }
      }, /*#__PURE__*/_react.default.createElement("span", null, data)));
    });
    let rows = [];
    let cells = [];
    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return /*#__PURE__*/_react.default.createElement("tr", null, d);
    });
    return /*#__PURE__*/_react.default.createElement("table", {
      className: "calendar-month"
    }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
      colSpan: "4"
    }, "Select a Month"))), /*#__PURE__*/_react.default.createElement("tbody", null, monthlist));
  };
  const showYearEditor = () => {
    setShowYearNav(true);
    setShowCalendarTable(!showCalendarTable);
  };
  const setYear = (0, _react.useCallback)(year => {
    let date_Object = Object.assign({}, dateObject);
    date_Object = (0, _moment.default)(date_Object).set("year", year);
    setDateObject(date_Object);
    setShowMonthTable(!showMonthTable);
    setShowYearNav(!showYearNav);
  }, [dateObject, showMonthTable, showYearNav]);
  const getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = (0, _moment.default)(startDate);
    var stop_Date = (0, _moment.default)(stopDate);
    while (currentDate <= stop_Date) {
      dateArray.push((0, _moment.default)(currentDate).format("YYYY"));
      currentDate = (0, _moment.default)(currentDate).add(1, "year");
    }
    return dateArray;
  };
  const YearTable = props => {
    let months = [];
    let nextten = (0, _moment.default)().set("year", props).add("year", 12).format("Y");
    let tenyear = getDates(props, nextten);
    tenyear.map(data => {
      months.push( /*#__PURE__*/_react.default.createElement("td", {
        key: data,
        className: "calendar-month",
        onClick: e => {
          setYear(data);
        }
      }, /*#__PURE__*/_react.default.createElement("span", null, data)));
    });
    let rows = [];
    let cells = [];
    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return /*#__PURE__*/_react.default.createElement("tr", null, d);
    });
    return /*#__PURE__*/_react.default.createElement("table", {
      className: "calendar-month"
    }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
      colSpan: "4"
    }, "Select a Year"))), /*#__PURE__*/_react.default.createElement("tbody", null, yearlist));
  };
  const weekdayshortname = () => {
    let shortName = weekdayshort.map(day => {
      let initial = day.slice(0, 1);
      return /*#__PURE__*/_react.default.createElement("th", {
        key: day
      }, initial);
    });
    return shortName;
  };
  const getDaysInMonth = () => {
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });
    let daysinmonth = rows.map((d, i) => {
      return /*#__PURE__*/_react.default.createElement("tr", null, d);
    });
    return daysinmonth;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "labs-calendar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: _styles.styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '40%'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: _styles.styles.headerLabel
  }, headerLabel)), /*#__PURE__*/_react.default.createElement("div", {
    style: _styles.styles.dropdownContainerCenter
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: _styles.styles.headerLabel
  }, monthTitle), /*#__PURE__*/_react.default.createElement("img", {
    src: _dropdown_icon.default,
    style: _styles.styles.dropdown,
    alt: "month-dropdown",
    onClick: showMonth
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: _styles.styles.dropdownContainerRight
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: _styles.styles.headerLabel
  }, yearTitle), /*#__PURE__*/_react.default.createElement("img", {
    src: _dropdown_icon.default,
    style: _styles.styles.dropdown,
    alt: "year-dropdown",
    onClick: showYearEditor
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-date"
  }, showYearNav && /*#__PURE__*/_react.default.createElement(YearTable, {
    props: yearTitle
  }), showMonthTable && /*#__PURE__*/_react.default.createElement(MonthList, {
    data: _moment.default.months()
  })), showCalendarTable && /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-date"
  }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, weekdayshortname())), /*#__PURE__*/_react.default.createElement("tbody", null, getDaysInMonth()))));
};
exports.Calendar = Calendar;