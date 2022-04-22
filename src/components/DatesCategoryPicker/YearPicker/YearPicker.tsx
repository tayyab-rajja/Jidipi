import { FC } from "react";

import { arrowsSvgs } from "constant/arrowsSvgs";

import styles from "./YearPicker.module.css";

interface YearPickerProps {
  year: number;
  todayDate: string;
  handleChange: (year: number) => void;
}

const YearPicker: FC<YearPickerProps> = ({ handleChange, year, todayDate }) => {
  const onNext = () => {
    handleChange(+year + 1);
  };

  const onPrevious = () => {
    handleChange(+year - 1);
  };

  return (
    <div className={styles["YearPicker"]}>
      <div onClick={onPrevious} className={styles["YearPicker-Arrow"]}>
        {arrowsSvgs["LEFT"]}
      </div>
      {year}
      <div onClick={onNext} className={styles["YearPicker-Arrow"]}>
        {arrowsSvgs["RIGHT"]}
      </div>
    </div>
  );
};

export default YearPicker;
