import {FC} from 'react';

import clsx from 'clsx';

import styles from './Divider.module.css';

interface Props {
  label: string;
  className?: string;
}

const Divider:FC<Props> = ({label, className}) => {
  const clazz = clsx(styles['Container'], styles['Body-Container'], className)

  return (
    <div className={clazz}>
      <hr className={styles['Container-Hr']}/>
      <p className={styles['Container-Label']}>{label}</p>
      <hr className={styles['Container-Hr']}/>
    </div>
  )
}

export default Divider