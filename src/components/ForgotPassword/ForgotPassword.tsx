import React, { FC } from "react";
import clsx from "clsx";

import styles from "./ForgotPassword.module.css";

const ForgotPassword: FC<{ className?: string }> = ({
  className: propClass,
}) => {
  const action = () =>
    alert("write your function inside ForgotPassword component");

  return (
    <p className={clsx(styles["ForgotPassword"], propClass)} onClick={action}>
      Forgot Password?
    </p>
  );
};

export default ForgotPassword;
