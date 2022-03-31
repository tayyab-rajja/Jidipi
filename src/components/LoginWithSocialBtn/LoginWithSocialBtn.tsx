import {FC, ReactElement} from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import styles from './styles.module.css';

interface Props {
  imgComponent: ReactElement;
  socialName: string;
  action: () => void;
  className?: string;
}

const LoginWithSocialBtn:FC<Props> = ({imgComponent, socialName, action, className}) => {
  console.log(imgComponent);
  const clazz = clsx(styles['container'], styles['body__container'], className);

  return (
    <div className={clazz} onClick={action}>
      {imgComponent}
      <p className={styles['container__text']}>Login with {socialName}</p>
    </div>
  )
}

export default LoginWithSocialBtn;