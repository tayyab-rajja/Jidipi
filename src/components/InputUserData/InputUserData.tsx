import {FC, useState, FormEvent} from 'react';

import clsx from "clsx";

import styles from './InputUserData.module.css';
import formStyles from 'src/components/FormUserData/FormUserData.module.css';

interface Props {
  type: string;
  placeholder?: string;
  value?: string;
  isUnlock?: boolean;
  canShowPassword?: boolean;
  returnInputValue?: (value: string) => any;
  className?: string;
}

const InputUserData:FC<Props> = ({type: originalType, placeholder, value, isUnlock = true, canShowPassword = true, returnInputValue = (value) => {}, className}) => {
  const [newType, setNewType] = useState(originalType);
  const [inputValue, setInputValue] = useState('');

  const isBtnShowPassword = canShowPassword && originalType === 'password' && inputValue;

  const iconShowPassword = newType === 'password' ? 'Show' : 'Hide';

  const setValue = (e:FormEvent<HTMLInputElement>) => {
    setInputValue(`${(e.target as HTMLInputElement).value}`)
  }

  const classContainer = clsx(styles['Container'], formStyles['Form-Elem']);
  const classInput = clsx(styles['Input'], styles['Form-Input'], className);

  const readOnly = isUnlock ? false : true;

  const input = (
    <div
      className={classContainer}
      data-type-container={originalType}
      data-is-unlock={isUnlock}
    >
      <input 
        type={newType} 
        placeholder={placeholder}
        value={value}
        className={classInput} 
        readOnly={readOnly} 
        onInput={(e) => {
          setValue(e)
          returnInputValue(`${(e.target as HTMLInputElement).value}`)
        }}
      />
      
      {isBtnShowPassword && (
        <div
          className={styles['Container-Btn']}
          onClick={() => setNewType(s => s === 'password' ? 'text' : 'password')}
        >
          {iconShowPassword}
        </div>
      )}
    </div>
  )
  
  return input;
}

export default InputUserData;