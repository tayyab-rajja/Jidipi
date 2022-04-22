import clsx from "clsx";

import { dayNames } from "constant/calendar";

import styles from "../DatesCategoryPicker.module.css";

export const CalendarWeeks = () => {
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
