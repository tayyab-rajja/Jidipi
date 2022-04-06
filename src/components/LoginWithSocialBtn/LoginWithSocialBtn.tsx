import {FC, ReactElement} from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import styles from './LoginWithSocialBtn.module.css';



interface Props {
  img: StaticImageData | string;
  socialName: string;
  action: () => void;
  className?: string;
}

const LoginWithSocialBtn:FC<Props> = ({img, socialName, action, className}) => {
  const classContainer = clsx(styles['Container'], styles['Body-Container'], className);

  return (
    <div className={classContainer} onClick={action}>
      <Image src={img} alt='logo' width={20} height={20} />
      <p className={styles['Container-Text']}>Login with {socialName}</p>
    </div>
  )
}

export default LoginWithSocialBtn;