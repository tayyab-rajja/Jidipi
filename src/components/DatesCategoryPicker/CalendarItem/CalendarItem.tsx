import clsx from "clsx";
import { FC } from "react";

import { getComparableDate } from "helpers/getComparableDate";
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
      <div className={clsx(styles["CalendarList-Item_Month"], styles["Day"])}>
        {month}
      </div>
      {days.map(({ day, isPrevMonth }, index) => {
        const dayOfWeek = day.getDate();
        const comparableDate = getComparableDate(day);
        const isToday = todayDate === comparableDate;
        const isDateSelected = currentDate === comparableDate;

        return (
          <div
            key={dayOfWeek + index}
            onClick={() => handleClick(day)}
            className={clsx(
              styles["CalendarList-Item_Day"],
              styles["Day"],
              isPrevMonth && styles["PrevMonth"],
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
