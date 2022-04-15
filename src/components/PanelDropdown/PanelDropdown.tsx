import {FC} from 'react'

import clsx from 'clsx'

import styles from './PanelDropdown.module.css'

interface Props {
  isOpen: boolean;
  logOut: () => void;
}

const PanelDropdown:FC<Props> = ({isOpen, logOut}) => {
  return (isOpen
    ? /* <div className={styles["Body-Wrapper"]} onClick={close}> */
        <div className={clsx(styles["Container"], styles["Body-Container"])}>
            <div className={styles["Container-List"]}>panel</div>
            <div className={styles["Container-List"]}>setting</div>
            <div className={styles["Container-List"]} onClick={logOut}>logout</div>
        </div>
      // </div>
    : null)
}

export default PanelDropdown