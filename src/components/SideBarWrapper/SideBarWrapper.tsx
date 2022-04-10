import React from "react";
import { Portal } from "../Portal/Portal";
import styles from "./SideBarWrapper.module.css";
import Backdrop from "../Backdrop/Backdrop";

interface ISideBarProps {
  isOpen: boolean;
  closeBar: VoidFunction;
}

const SideBarWrapper: React.FC<ISideBarProps> = ({
  isOpen,
  children,
  closeBar,
}) => {
  const renderChildren = () => {
    if (isOpen) {
      return <div className={styles.SideBarWrapper}>{isOpen && children}</div>;
    }
    return null;
  };

  return (
    <Portal>
      <Backdrop isOpen={isOpen} close={closeBar} />
      {renderChildren()}
    </Portal>
  );
};

export default SideBarWrapper;
