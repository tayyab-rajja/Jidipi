import {FC, ReactElement} from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import styles from './LoginWithSocialBtn.module.css';

interface Props {
  imgUrl: string;
  socialName: string;
  action: () => void;
  className?: string;
}

const LoginWithSocialBtn:FC<Props> = ({imgUrl, socialName, action, className}) => {
  const clazz = clsx(styles['Container'], styles['Body-Container'], className);

  return (
    <div className={clazz} onClick={action}>
      <Image src={imgUrl} alt='logo' width={20} height={20} />
      <p className={styles['Container-Text']}>Login with {socialName}</p>
    </div>
  )
}

export default LoginWithSocialBtn;