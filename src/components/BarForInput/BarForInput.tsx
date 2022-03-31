import {FC} from 'react'

import clsx from 'clsx'

import Selector from 'src/components/Selector';

import styles from './BarForInput.module.css'

interface Props {
  label: string;
  hasSelector?: boolean;
  isUnlock?: boolean;
  selectorAction?: () => void;
  className?: string;
}

const BarForInput:FC<Props> = ({label, hasSelector = false, isUnlock = true, selectorAction, className}) => {
  return (
    <div className={clsx(styles['Bar'], styles['Form-Bar'], className)}>
      <p>{label}</p>
      
      {hasSelector && <Selector isUnlock={isUnlock} action={selectorAction}/>}
    </div>
  )
}

export default BarForInput