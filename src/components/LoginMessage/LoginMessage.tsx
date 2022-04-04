import {FC} from 'react'

import clsx from 'clsx';

import styles from './LoginMessage.module.css';

interface Props {
  type: string;
  visitorName?: string;
  visitorEmail?: string;
}

const LoginMessage:FC<Props> = ({type, visitorName, visitorEmail}) => {
  const message = type === 'recover' ? 
    <>
      <p className={styles['Container-P']}>
        Dear
        <span className={clsx(styles['Container-PropText'], styles['Container-PropText_Blue'])}>{visitorName}</span>
      </p>
      
      <p className={styles['Container-P']}>
        We have sent a recover link to
        <span className={clsx(styles['Container-PropText'], styles['Container-PropText_Blue'])}>{visitorEmail}</span>
      </p>
      
      <p className={styles['Container-P']}>Please check your email to get your password or reset password within 24 hours.</p>
    </>
  :
    <>
      <p className={styles['Container-P']}>Dear visitor</p>
      
      <p className={styles['Container-P']}>You have reset your password successfully.</p>
      
      <p className={styles['Container-P']}>Please save your password carefully for the next login.</p>
    </>
  
  return (
    <div className={clsx(styles['Container'], styles['Body-Container'])}>
      {message}
      <p className={clsx(styles['Container-P'], styles['Container-Sign'])}>- Jidipi Team</p>
    </div>
  )
}

export default LoginMessage