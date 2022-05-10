import React, { FC } from "react";
import clsx from "clsx";

import styles from "./ForgotPassword.module.css";

const ForgotPassword: FC<{ className?: string; action: () => void }> = ({
  className: propClass,
  action,
}) => {
  return (
    <p className={clsx(styles["ForgotPassword"], propClass)} onClick={action}>
      Forgot Password?
    </p>
  );
};

export default ForgotPassword;
