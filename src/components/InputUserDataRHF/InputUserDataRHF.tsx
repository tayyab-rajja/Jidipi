import React, { FC, useState, ChangeEvent } from "react";

import clsx from "clsx";

import styles from "./InputUserDataRHF.module.css";
import formStyles from "src/components/FormUserData/FormUserData.module.css";
import { ControllerRenderProps } from "react-hook-form";

interface Props extends Omit<ControllerRenderProps, "ref"> {
  type: string;
  placeholder?: string;
  isUnlock?: boolean;
  canShowPassword?: boolean;
  className?: string;
  ref: any;
}

const InputUserDataRHF: FC<Props> = React.forwardRef(
  (
    {
      type: originalType,
      placeholder,
      isUnlock = true,
      canShowPassword = true,
      className,
      ...field
    },
    ref
  ) => {
    const [newType, setNewType] = useState(originalType);

    const isBtnShowPassword =
      canShowPassword && originalType === "password" && field.value;

    const iconShowPassword = newType === "password" ? "Show" : "Hide";

    const classContainer = clsx(styles["Container"], formStyles["Form-Elem"]);
    const classInput = clsx(styles["Input"], styles["Form-Input"], className);

    const readOnly = isUnlock ? false : true;

    const input = (
      <div
        className={classContainer}
        data-type-container={originalType}
        data-is-unlock={isUnlock}
      >
        <input
          type={newType}
          placeholder={placeholder}
          className={classInput}
          readOnly={readOnly}
          {...field}
          ref={ref}
        />

        {isBtnShowPassword && (
          <div
            className={styles["Container-Btn"]}
            onClick={() =>
              setNewType((s) => (s === "password" ? "text" : "password"))
            }
          >
            {iconShowPassword}
          </div>
        )}
      </div>
    );

    return input;
  }
);

export default InputUserDataRHF;
