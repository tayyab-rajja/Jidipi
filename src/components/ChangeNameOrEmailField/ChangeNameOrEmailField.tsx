import {FC, useEffect, useState} from 'react';

import ButtonUserData from 'src/components/ButtonUserData';
import BarForInput from 'src/components/BarForInput';
import InputUserData from 'src/components/InputUserData';
import FormUserData from 'src/components/FormUserData';
import NoValidationText from 'src/components/NoValidationText'

import styles from './ChangeNameOrEmailField.module.css'

const ChangeNameOrEmailField:FC = () => {
  interface State {
    [key: string]: {isUnlock: boolean, value: string | null};
  }

  const [inputsState, setInputsState] = useState<State>({
    name: {isUnlock: false, value: null},
    email: {isUnlock: false, value: null},
    password: {isUnlock: false, value: null},
  })

  const changeInputUnlock = (input: string) => {
    setInputsState(prevState => {
      return {
        ...prevState,
        [input]: {isUnlock: !prevState[input].isUnlock, value: prevState[input].value}
      }
    })
  }

  const returnInputValue = (input: string) => {
    return (value: string) => {
      setInputsState(prevState => {
        return {
          ...prevState,
          [input]: {isUnlock: prevState[input].isUnlock, value: value}
        }
      })
    }
  }
  
  return (
    <FormUserData>
      <>
        <BarForInput label='Name' hasSelector isUnlock={inputsState.name.isUnlock} selectorAction={() => changeInputUnlock('name')}/>

        <InputUserData type='text' isUnlock={inputsState.name.isUnlock} returnInputValue={returnInputValue('name')} />

        <BarForInput label='Email' hasSelector isUnlock={inputsState.email.isUnlock} selectorAction={() => changeInputUnlock('email')}/>

        <InputUserData type='email' isUnlock={inputsState.email.isUnlock}/>

        <BarForInput label='Current Password' hasSelector isUnlock={inputsState.password.isUnlock} selectorAction={() => alert('write func to go to password chenching')}/>

        <InputUserData type='password' isUnlock={inputsState.password.isUnlock}/>

        <ButtonUserData label='Save Change' action={() => alert('your func here')} className={styles['Form-Button']} />
      </>
    </FormUserData>
  )
}

export default ChangeNameOrEmailField