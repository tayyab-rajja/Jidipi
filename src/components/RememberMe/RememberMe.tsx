import {FC, useState} from 'react'
import Link from 'next/link';

import clsx from 'clsx'

import styles from './styles.module.css'
import formStyles from '../FormUserData/FormUserData.module.css'

interface Props {
  action?: () => void;
  className?: string;
}

const RememberMe:FC<Props> = ({action = () => {}, className}) => {
  const [checked, setChecked] = useState(true)

  const clazz = clsx(styles['container'], formStyles['form__elem'], className)

  const check = checked ?
    <span className={styles['check']}>&#10004;</span>
    :
    null

  return (
    <div className={clazz}>
      <div
        className={clsx(styles['checkbox'], styles['container__checkbox'])}
        data-checked={checked}
        onClick={() => {
          setChecked(s => !s);
          action();
        }}  
      >
        {check}
      </div>

      <p className={styles['container__label']}>Remember Me</p>

      <Link href="/"><a className={styles['forgot-password']}>Forgot Password?</a></Link>
    </div>
  )
}

export default RememberMe