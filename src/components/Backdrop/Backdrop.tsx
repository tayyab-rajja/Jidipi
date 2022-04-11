import React from "react";
import clsx from "clsx";

import styles from "./Backdrop.module.css";

interface IBackdropProps {
  isOpen: boolean;
  close: VoidFunction;
}

const Backdrop: React.FC<IBackdropProps> = ({ children, isOpen, close }) => {
  return (
    <>
      <div
        className={clsx(styles.Backdrop, isOpen && styles["Backdrop_open"])}
        onClick={close}
      />
      {children}
    </>
  );
};

export default Backdrop;
