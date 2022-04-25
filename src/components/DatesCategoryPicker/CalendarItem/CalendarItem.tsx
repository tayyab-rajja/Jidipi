import clsx from "clsx";
import { FC } from "react";

import { getComparableDate } from "helpers/getComparableDate";
import { getIsPrevMonth } from "helpers/getIsPrevMonth";
import { getDateMonth } from "helpers/getDateMonth";

import { ItemOfDatePicker } from "types/calendarTypes";

import styles from "../DatesCategoryPicker.module.css";

interface CalendarItemProps {
  data: ItemOfDatePicker;
  todayDate: string;
  currentDate: string;
  handleClick: (day: Date) => void;
}

export const CalendarItem: FC<CalendarItemProps> = ({
  data: { days, month },
  handleClick,
  currentDate,
  todayDate,
}) => {
  return (
    <li className={styles["CalendarList-Item"]}>
      <div
        className={clsx(
          styles["CalendarList-Item_Month"],
          styles["Day"],
          getIsPrevMonth(month) && styles["PrevMonth"]
        )}
      >
        {month}
      </div>
      {days.map((day, index) => {
        const dayOfWeek = day.getDate();
        const comparableDate = getComparableDate(day);
        const dayMonth = getDateMonth(day);
        const isToday = todayDate === comparableDate;
        const isDateSelected = currentDate === comparableDate;

        return (
          <div
            key={dayOfWeek + comparableDate + index}
            onClick={() => handleClick(day)}
            className={clsx(
              styles["CalendarList-Item_Day"],
              styles["Day"],
              getIsPrevMonth(dayMonth) && styles["PrevMonth"],
              isToday && styles["Today"],
              isDateSelected && styles["SelectedDay"]
            )}
          >
            {dayOfWeek}
          </div>
        );
      })}
    </li>
  );
};
