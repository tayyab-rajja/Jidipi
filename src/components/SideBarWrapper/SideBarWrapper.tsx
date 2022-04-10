import React from "react";
import { Portal } from "../Portal/Portal";
import styles from "./SideBarWrapper.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { useSideBar } from "src/providers/SidebarProvider/SidebarProvider";

interface ISideBarProps {}

const SideBarWrapper: React.FC<ISideBarProps> = ({ children }) => {
  const { close, isOpen } = useSideBar();
  const renderChildren = () => {
    if (isOpen) {
      return <div className={styles.SideBarWrapper}>{isOpen && children}</div>;
    }
    return null;
  };

  return (
    <Portal>
      <Backdrop isOpen={isOpen} close={close} />
      {renderChildren()}
    </Portal>
  );
};

export default SideBarWrapper;
