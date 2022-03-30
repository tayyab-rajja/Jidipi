import {FC} from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import styles from './styles.module.css';

interface Props {
  logoUrl: string;
  socialName: string;
  className?: string;
}

const LoginWithSocialBtn:FC<Props> = ({logoUrl, socialName, className}) => {
  const clazz = clsx(styles['container'], styles['body__container'], className);

  return (
    <div className={clazz}>
      <Image src={logoUrl} alt='logo' width={20} height={20} className={styles['container__logo']}/>
      <p>Login with {socialName}</p>
    </div>
  )
}

export default LoginWithSocialBtn;