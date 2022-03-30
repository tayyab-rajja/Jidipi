import {FC, useState} from 'react'

import clsx from 'clsx';

import styles from './Selector.module.css';

interface Props {
  isUnlock: boolean;
  action?: () => void; // TODO: убери вопрос
}

const Selector:FC<Props> = ({isUnlock, action}) => {  
  const statusText = isUnlock ? 'Unlock' : 'Lock';

  return (
    <div className={styles['container']}>
      <span>{statusText}</span>
      <div
        className={clsx(styles['switcher-container'], styles['bar__switcher-container'])}
        onClick={action}
        data-unlocked={isUnlock}
      >
        <div className={styles['switcher']}></div>
      </div>
    </div>
  )
}

export default Selector;