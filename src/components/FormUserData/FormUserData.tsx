import {FC, ReactElement} from 'react';

import clsx from "clsx";

import styles from './FormUserData.module.css';

interface Props {
  children: ReactElement;
  className?: string;
  elementClass?: string;
  modificatorClass?: string;
}

const FormUserData:FC<Props> = ({children, className}) => {
  const clazz = clsx(styles.form, className);

  return (
    <form className={clazz}>
      {children}
    </form>
  )
}

export default FormUserData;