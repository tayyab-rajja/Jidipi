import { FC, ReactElement, useState } from "react";
import Image from "next/image";

import clsx from "clsx";

import styles from "./CheckBox.module.css";
import formStyles from "../FormUserData/FormUserData.module.css";

interface Props {
  checkAction: () => void;
  label: string | HTMLElement;
  className?: string;
  children?: ReactElement | HTMLElement;
}

const CheckBox: FC<Props> = ({ checkAction, label, className, children }) => {
  const [checked, setChecked] = useState(true);

  const classContainer = clsx(styles["Container"], className);

  const check = checked ? (
    <span className={styles["Check"]}>
      <Image src="/check.svg" alt="check" width="10px" height="8px" />
    </span>
  ) : null;

  const clickAction = () => {
    setChecked((s) => !s);
    checkAction();
  };

  return (
    <div className={classContainer} onClick={clickAction}>
      <div
        className={clsx(styles["Checkbox"], styles["Container-Checkbox"])}
        data-checked={checked}
      >
        {check}
      </div>

      <p className={styles["Container-Label"]}>{label}</p>

      {children}
    </div>
  );
};

export default CheckBox;
