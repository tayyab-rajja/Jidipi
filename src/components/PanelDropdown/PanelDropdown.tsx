import {FC} from 'react'

import clsx from 'clsx'

import styles from './PanelDropdown.module.css'

interface Props {
  // showOrHide: () => void;
}

const PanelDropdown:FC<Props> = () => {
  return (
    <div className={clsx(styles["Container"], styles["Body-Container"])}>
      <div className={styles["Container-List"]}>panel</div>
      <div className={styles["Container-List"]}>setting</div>
      <div className={styles["Container-List"]}>logout</div>
    </div>
  )
}

export default PanelDropdown