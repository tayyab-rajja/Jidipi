import { FC } from "react";

import styles from "../DatesCategoryPicker.module.css";

export const CalendarList: FC = ({ children }) => (
  <ul className={styles["CalendarList"]}>{children}</ul>
);
