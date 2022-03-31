import {FC, useState} from 'react';

import ButtonUserData from 'src/components/ButtonUserData';
import BarForInput from 'src/components/BarForInput';
import InputUserData from 'src/components/InputUserData';
import FormUserData from 'src/components/FormUserData';

import styles from './SettingNameEmail.module.css'

const SettingNameEmail:FC = () => {
  // const [inputNameUnlock, setInputNameUnlock] = useState(true);
  // const [inputEmailUnlock, setInputEmailUnlock] = useState(true);
  // const [inputPasswordsUnlock, setInputPasswordsUnlock] = useState(true);

  interface State {
    [key: string]: boolean;
  }

  const [inputsUnlock, setInputsUnlock] = useState<State>({
    name: true,
    email: true,
    password: true,
  })

  const changeInputUnlock = (input: string) => {
    setInputsUnlock(s => {
      return {...s, [input]: !s[input]}
    })
  }

  return (
    <FormUserData>
      <>
        <BarForInput label='Name' hasSelector={true} isUnlock={inputsUnlock.name} selectorAction={() => changeInputUnlock('name')}/>

        <InputUserData type='text' isUnlock={inputsUnlock.name}/>

        <BarForInput label='Email' hasSelector={true} isUnlock={inputsUnlock.email} selectorAction={() => changeInputUnlock('email')}/>

        <InputUserData type='email' isUnlock={inputsUnlock.email}/>

        <BarForInput label='Current Password' hasSelector={true} isUnlock={inputsUnlock.password} selectorAction={() => changeInputUnlock('password')}/>

        <InputUserData type='password' isUnlock={inputsUnlock.password}/>
        
        <BarForInput label='New Password'/>

        <InputUserData type='password' isUnlock={inputsUnlock.password}/>
        
        <BarForInput label='New Password Confirmation'/>

        <InputUserData type='password' isUnlock={inputsUnlock.password}/>

        <ButtonUserData label='Save Change' className={styles['SettingNameEmail-Btn']} action={() => console.log('Saved')}/>
      </>
    </FormUserData>
  )
}

export default SettingNameEmail