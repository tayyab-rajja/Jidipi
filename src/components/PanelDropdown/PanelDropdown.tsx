import { FC } from "react";

import clsx from "clsx";

import styles from "./PanelDropdown.module.css";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setShowLoginBar: (arg: boolean) => void;
  setShowSetting: (arg: boolean) => void;
  logOut: () => void;
}

const PanelDropdown: FC<Props> = ({
  isOpen,
  setShowLoginBar,
  setShowSetting,
  logOut,
}) => {
  return isOpen ? (
    /* <div className={styles["Body-Wrapper"]} onClick={close}> */
    <div
      className={clsx(styles["Container"], styles["Body-Container"])}
      onClick={() => setShowLoginBar(false)}
    >
      <Link href={"/panel"}>
        <a className={styles["Container-List"]}>panel</a>
      </Link>
      <div
        className={styles["Container-List"]}
        onClick={() => setShowSetting(true)}
      >
        setting
      </div>
      <div className={styles["Container-List"]} onClick={logOut}>
        logout
      </div>
    </div>
  ) : // </div>
  null;
};

export default PanelDropdown;
