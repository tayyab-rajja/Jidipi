import {FC} from 'react'

import clsx from 'clsx'

import Selector from '../Selector';

import styles from './BarForInput.module.css'

interface Props {
  label: string;
  hasSelector?: boolean;
  isUnlock?: boolean;
  selectorAction?: () => void;
  className?: string;
}

const BarForInput:FC<Props> = ({label, hasSelector = false, isUnlock = true, selectorAction, className}) => {
  const clazz = clsx(styles['bar'], className);
  const selector = hasSelector ? <Selector isUnlock={isUnlock} action={selectorAction}/> : null;

  return (
    <div className={clazz}>
      <p>{label}</p>
      {selector}
    </div>
  )
}

export default BarForInput