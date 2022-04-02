import {FC, useState} from 'react'
import Link from 'next/link';

import clsx from 'clsx'

import styles from './RememberMe.module.css'
import formStyles from '../FormUserData/FormUserData.module.css'

interface Props {
  checkAction?: () => void;
  forgotPasswordAction?: () => void;
  className?: string;
}

const RememberMe:FC<Props> = ({checkAction = () => {}, forgotPasswordAction, className}) => {
  const [checked, setChecked] = useState(true)

  const classContainer = clsx(styles['Container'], formStyles['Form-Elem'], className)

  const check = checked ?
    <span className={styles['Check']}>&#10004;</span>
    :
    null

  return (
    <div className={classContainer}>
      <div
        className={clsx(styles['Checkbox'], styles['Container-Checkbox'])}
        data-checked={checked}
        onClick={() => {
          setChecked(s => !s);
          checkAction();
        }}  
      >
        {check}
      </div>

      <p className={styles['Container-Label']}>Remember Me</p>

      <p
        className={clsx(styles['ForgotPassword'], styles['Container-ForgotPassword'])}
        onClick={forgotPasswordAction}
      >
        Forgot Password?
      </p>
    </div>
  )
}

export default RememberMe