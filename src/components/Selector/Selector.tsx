import {FC} from 'react'

import clsx from 'clsx';

import styles from './Selector.module.css';

interface Props {
  isUnlock: boolean;
  action?: () => void;
}

const Selector:FC<Props> = ({isUnlock, action}) => {  
  const statusText = isUnlock ? 'Unlock' : 'Lock';

  return (
    <div className={styles['Container']}>
      <span>{statusText}</span>
      <div
        className={clsx(styles['SwitcherContainer'], styles['Bar-SwitcherContainer'])}
        onClick={action}
        data-unlocked={isUnlock}
      >
        <div className={styles['Switcher']}></div>
      </div>
    </div>
  )
}

export default Selector;