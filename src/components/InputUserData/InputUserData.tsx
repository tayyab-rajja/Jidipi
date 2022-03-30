import {FC, useState} from 'react';
import Image from 'next/image';

import clsx from "clsx";

import styles from './InputUserData.module.css';
import formStyles from '../FormUserData/FormUserData.module.css';

interface Props {
  type: string;
  placeholder?: string;
  isUnlock?: boolean;
  className?: string;
}

const InputUserData:FC<Props> = ({type: originalType, placeholder, isUnlock = true, className}) => {
  const [newType, setNewType] = useState(originalType);

  const iconShowPassword = newType === 'password' ? 'Show' : 'Hide';

  const btnShowPassword = originalType === 'password' ?
    <div className={styles['container__btn']} onClick={() => setNewType(s => s === 'password' ? 'text' : 'password')}>
      {iconShowPassword}
    </div>
    :
    null;

  const clazz = clsx(styles.input, styles['form__input'], className);

  const readOnly = isUnlock ? false : true;

  const input = (
    <div className={clsx(styles['container'], formStyles['form__elem'])} data-type-container={originalType} data-is-unlock={isUnlock}>
      <input type={newType} placeholder={placeholder} className={clazz} readOnly={readOnly}/>
      {btnShowPassword}
    </div>
  )
  
  return input;
}

export default InputUserData;