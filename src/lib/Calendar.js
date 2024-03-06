import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

import "./calendar.css";
import { styles } from "./styles";

import DropdownIcon from './assets/icons/dropdown_icon.png';

export const Calendar = ({
  taskArray = [],
  onSelectDate = () => {},
  style,
  headerLabelText = '',
  headerLabelStyle,
  headerContainerStyle,
  dropdownStyle,
  dotStyle,
}) => {
  const weekdayshort = moment.weekdaysShort();
  const [showCalendarTable, setShowCalendarTable] = useState(true);
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [dateObject, setDateObject] = useState(moment());
  const [allmonths, setAllMonths] = useState(moment.months());
  const [showYearNav, setShowYearNav] = useState(false);
  const [blanks, setBlanks] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [yearTitle, setYearTitle] = useState(null);
  const [monthTitle, setMonthTitle] = useState(null);
  const [headerLabel, setHeaderLabel] = useState('');

  const onDayClick = useCallback((e, d) => {
    let newDtObj = Object.assign({}, dateObject);
    newDtObj = moment(newDtObj).set("date", d);
    setDateObject(newDtObj)
    onSelectDate(newDtObj);
  }, [dateObject]);

  useEffect(() => {
    let yearData = dateObject.format("Y");
    let monthData = dateObject.format("MMMM");
    let today = dateObject.date();
    let navHeaderText = '';
    if(headerLabelText && headerLabelText.length > 0) {
      navHeaderText = headerLabelText;
    } else {
      navHeaderText = `${monthData} ${today}, ${yearData}`;
    }
    setYearTitle(yearData);
    setMonthTitle(monthData);
    setHeaderLabel(navHeaderText);
  }, [dateObject]);

 useEffect(() => {
    const tempBlanks = [];
    let date_Object = dateObject;
    let firstDay = moment(date_Object)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    for (let i = 0; i < firstDay; i++) {
        tempBlanks.push(
          <td className="calendar-day empty">{""}</td>
        );
    };
    setBlanks(tempBlanks);
  }, [dateObject]);


  useEffect(() => {
    const tempDIM = [];
    const days_In_Month = dateObject.daysInMonth();
    const currentDay = dateObject.format("D");
    for (let d = 1; d <= days_In_Month; d++) {
        let current_Day = parseInt(d) === parseInt(currentDay) ? "today" : null;
        let hasTask = taskArray && taskArray.filter(item => moment(item.due_date).date() === d && moment(item.due_date).month() === dateObject.month() && moment(item.due_date).year() === dateObject.year());
        tempDIM.push(
          <td key={d} className={`calendar-day ${current_Day}`}>
            <span
              onClick={e => {
                onDayClick(e, d);
              }}
            >
              {d}
              {hasTask && hasTask.length > 0 && <p style={dotStyle || styles.dotStyle}>.</p>}
            </span>
          </td>
        );
      }
      setDaysInMonth(tempDIM);

  }, [dateObject, onDayClick]);

  const showMonth = (e, month) => {
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
  };

  const setMonth = useCallback((month) => {
    let monthNo = allmonths.indexOf(month);
    let date_Object = Object.assign({}, dateObject);
    date_Object = moment(date_Object).set("month", monthNo);
    setDateObject(date_Object);
    setShowMonthTable(!showMonthTable);
    setShowCalendarTable(!showCalendarTable);
    onSelectDate(date_Object);
  },[allmonths, dateObject, showCalendarTable, showMonthTable]);

    const MonthList = props => {
        let months = [];
        props.data.map(data => {
        months.push(
            <td
            key={data}
            className="calendar-month"
            onClick={e => {
                setMonth(data);
            }}
            >
            <span>{data}</span>
            </td>
        );
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
        return <tr>{d}</tr>;
        });

        return (
        <table className="calendar-month">
            <thead>
            <tr>
                <th colSpan="4">Select a Month</th>
            </tr>
            </thead>
            <tbody>{monthlist}</tbody>
        </table>
        );
    };

  const showYearEditor = () => {
    setShowYearNav(true);
    setShowCalendarTable(!showCalendarTable);
  };

  const setYear = useCallback((year) => {
    let date_Object = Object.assign({}, dateObject);
    date_Object = moment(date_Object).set("year", year);
    setDateObject(date_Object);
    setShowMonthTable(!showMonthTable);
    setShowYearNav(!showYearNav);
    onSelectDate(date_Object);
  },[dateObject, showMonthTable, showYearNav]);

  const getDates = (startDate, stopDate) => {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stop_Date = moment(stopDate);
      while (currentDate <= stop_Date) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
      }
      return dateArray;
  }

  const YearTable = props => {
    let months = [];
    let nextten = moment()
    .set("year", props)
    .add("year", 12)
    .format("Y");

    let tenyear = getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
              setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
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
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
              <th colSpan="4">Select a Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };



  const weekdayshortname = () => {
    let shortName = weekdayshort.map((day) => {
        let initial = day.slice(0, 1);
        return <th key={day}>{initial}</th>;
    });

    return shortName;
  }

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
      return <tr>{d}</tr>;
    });

    return daysinmonth;
  }

  return (
    <div className="labs-calendar" style={style}>
      <div style={headerContainerStyle || styles.headerContainer}>
        <div style={{width: '40%'}}>
          <p style={headerLabelStyle || styles.headerLabel}>{headerLabel}</p>
        </div>
        <div style={styles.dropdownContainerCenter}>
          <p style={headerLabelStyle || styles.headerLabel}>{monthTitle}</p>
          <img src={DropdownIcon} style={dropdownStyle || styles.dropdown} alt="month-dropdown" onClick={showMonth}/>
        </div>
        <div style={styles.dropdownContainerRight}>
          <p style={headerLabelStyle || styles.headerLabel}>{yearTitle}</p>
          <img src={DropdownIcon} style={dropdownStyle || styles.dropdown} alt="year-dropdown" onClick={showYearEditor}/>
        </div>
      </div>
      <div className="calendar-date">
        {showYearNav && <YearTable props={yearTitle} />}
        {showMonthTable && (
          <MonthList data={moment.months()} />
        )}
      </div>

      {showCalendarTable && (
        <div className="calendar-date">
          <table>
            <thead>
              <tr>{weekdayshortname()}</tr>
            </thead>
            <tbody>{getDaysInMonth()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
