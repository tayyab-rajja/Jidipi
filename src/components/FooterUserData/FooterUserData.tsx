import {FC} from 'react'

import clsx from 'clsx'

import styles from './FooterUserData.module.css'

interface Props {
  label: string;
  refLabel: string;
  action: () => void;
  className?: string;
}

const FooterUserData:FC<Props> = ({label, refLabel, action, className}) => {
  return (
    <div
      className={clsx(styles['FooterContainer'], styles['Body-FooterContainer'], className)}
    >
      {label}
      <span className={styles['FooterContainer-Ref']} onClick={action}>{refLabel}</span>
    </div>

  )
}

export default FooterUserData