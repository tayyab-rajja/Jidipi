import clsx from "clsx";
import { FC, useState } from "react";

import YearPicker from "./YearPicker/YearPicker";
import { CalendarList } from "./CalendarList/CalendarList";
import { CalendarItem } from "./CalendarItem/CalendarItem";
import { CalendarWeeks } from "./CalendarWeeks/CalendarWeeks";

import { getCalendarDatas } from "helpers/getCalendarDatas";
import { getComparableDate } from "helpers/getComparableDate";

import styles from "./DatesCategoryPicker.module.css";

interface DatesCategoryPickerProps {
  // TODO: add types to func for set selected date
  handleChange: any;
}

const DatesCategoryPicker: FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
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
        <CalendarWeeks />
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
