import clsx from "clsx";
import { useState } from "react";

import YearPicker from "./YearPicker/YearPicker";
import { CalendarList } from "./CalendarList/CalendarList";
import { CalendarItem } from "./CalendarItem/CalendarItem";

import { getCalendarDatas } from "helpers/getCalendarDatas";
import { getComparableDate } from "helpers/getComparableDate";

import { dayNames } from "constant/calendar";

import styles from "./DatesCategoryPicker.module.css";

const CalendarDays = () => {
  return (
    <ul className={styles["DaysOfWeek"]}>
      {dayNames.map((day, index) => (
        <li
          className={clsx(styles["DaysOfWeek-Day"], styles["Day"])}
          key={day + index}
        >
          {day}
        </li>
      ))}
    </ul>
  );
};

const DatesCategoryPicker = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [year, setYear] = useState(today.getFullYear());

  const datas = getCalendarDatas(year);

  const handleClick = (day: Date) => {
    setCurrentDate(day);
  };

  const handleYear = (newYear: number) => {
    setYear(newYear);
  };

  return (
    <div className={styles["Container"]}>
      <YearPicker
        todayDate={getComparableDate(today)}
        year={year}
        handleChange={handleYear}
      />
      <div className={styles["Calendar"]}>
        <CalendarDays />
        <CalendarList>
          {datas.map((data, index) => (
            <CalendarItem
              key={index}
              handleClick={handleClick}
              data={data}
              todayDate={getComparableDate(today)}
              currentDate={getComparableDate(currentDate)}
            />
          ))}
        </CalendarList>
      </div>
      <YearPicker
        todayDate={getComparableDate(today)}
        year={year}
        handleChange={handleYear}
      />
    </div>
  );
};

export default DatesCategoryPicker;
