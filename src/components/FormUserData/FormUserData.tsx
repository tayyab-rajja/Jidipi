import {FC, ReactElement} from 'react';

import clsx from "clsx";

import styles from './FormUserData.module.css';

interface Props {
  children: ReactElement;
  className?: string;
}

const FormUserData:FC<Props> = ({children, className}) => {
  const classForm = clsx(styles['Form'], className);

  return (
    <form className={classForm}>
      {children}
    </form>
  )
}

export default FormUserData;