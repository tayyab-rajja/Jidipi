import {FC} from 'react';
import clsx from "clsx";

import styles from './ButtonUserData.module.css';
import formStyles from '../FormUserData/FormUserData.module.css';

interface Props {
  label: string;
  action: () => void;
  className?: string;
}

const ButtonUserData:FC<Props> = ({label, action, className}) => {
  const clazz = clsx(styles['btn'], styles['form__btn'], formStyles['form__elem'], className);

  return (
    <button
      className={clazz}
      onClick={e => {
        e.preventDefault();
        action();
      }}
    >
      {label}
    </button>
  );
}

export default ButtonUserData;