import {FC} from 'react';

import clsx from 'clsx';

import styles from './styles.module.css';

interface Props {
  label: string;
  className?: string;
}

const Divider:FC<Props> = ({label, className}) => {
  const clazz = clsx(styles['container'], styles['body__container'], className)

  return (
    <div className={clazz}>
      <hr className={styles['container__hr']}/>
      <p className={styles['container__label']}>{label}</p>
      <hr className={styles['container__hr']}/>
    </div>
  )
}

export default Divider