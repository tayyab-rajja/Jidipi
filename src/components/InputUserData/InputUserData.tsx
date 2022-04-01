import {FC, useState, ChangeEvent} from 'react';

import clsx from "clsx";

import styles from './InputUserData.module.css';
import formStyles from 'src/components/FormUserData/FormUserData.module.css';

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

  const isBtnShowPassword = canShowPassword && originalType === 'password' && inputValue;

  let btnShowPassword = null;

  const setValue = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(`${(e.target as HTMLInputElement).value}`)
  }

  const classContainer = clsx(styles['Container'], formStyles['Form-Elem']);
  const classInput = clsx(styles['Input'], styles['Form-Input'], className);

  const readOnly = isUnlock ? false : true;

  const input = (
    <div className={classContainer} data-type-container={originalType} data-is-unlock={isUnlock}>
      <input type={newType} placeholder={placeholder} className={classInput} readOnly={readOnly} onInput={setValue}/>
      
      {isBtnShowPassword && (
        <div className={styles['Container-Btn']} onClick={() => setNewType(s => s === 'password' ? 'text' : 'password')}>
          {/* {iconShowPassword} */}
        </div>
      )}
    </div>
  )
  
  return input;
}

export default InputUserData;