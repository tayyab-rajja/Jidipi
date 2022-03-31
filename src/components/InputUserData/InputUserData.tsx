import {FC, useState, ChangeEvent} from 'react';

import clsx from "clsx";

import styles from './InputUserData.module.css';
import formStyles from '../FormUserData/FormUserData.module.css';

interface Props {
  type: string;
  placeholder?: string;
  isUnlock?: boolean;
  canShowPassword?: boolean;
  className?: string;
}

const InputUserData:FC<Props> = ({type: originalType, placeholder, isUnlock = true, canShowPassword = true, className}) => {
  const [newType, setNewType] = useState(originalType);
  const [inputValue, setInputValue] = useState('');

  let btnShowPassword = null;

  if (canShowPassword && originalType === 'password' && inputValue) {
    const iconShowPassword = newType === 'password' ? 'Show' : 'Hide';

    btnShowPassword = (
      <div className={styles['container__btn']} onClick={() => setNewType(s => s === 'password' ? 'text' : 'password')}>
        {iconShowPassword}
      </div>
    )
  }

  const setValue = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(`${(e.target as HTMLInputElement).value}`)
  }

  const clazz = clsx(styles.input, styles['form__input'], className);

  const readOnly = isUnlock ? false : true;

  const input = (
    <div className={clsx(styles['container'], formStyles['form__elem'])} data-type-container={originalType} data-is-unlock={isUnlock}>
      <input type={newType} placeholder={placeholder} className={clazz} readOnly={readOnly} onInput={setValue}/>
      {btnShowPassword}
    </div>
  )
  
  return input;
}

export default InputUserData;