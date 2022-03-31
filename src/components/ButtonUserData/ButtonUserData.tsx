import {FC} from 'react';
import clsx from "clsx";

import styles from './ButtonUserData.module.css';
import formStyles from 'src/components/FormUserData/FormUserData.module.css';

interface Props {
  label: string;
  action: () => void;
  className?: string;
}

const ButtonUserData:FC<Props> = ({label, action, className}) => {
  const classBtn = clsx(styles['Btn'], styles['Form-Btn'], formStyles['Form-Elem'], className);

  return (
    <button
      className={classBtn}
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