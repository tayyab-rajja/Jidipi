import {FC, useState} from 'react';

import ButtonUserData from 'src/components/ButtonUserData';
import BarForInput from 'src/components/BarForInput';
import InputUserData from 'src/components/InputUserData';
import FormUserData from 'src/components/FormUserData';
import NoValidationText from 'src/components/NoValidationText'

import {usePutUserData} from 'src/api/usePutUserData'

import styles from './ChangeNameOrEmailField.module.css'

const ChangeNameOrEmailField:FC = () => {
  interface InputState {
    [key: string]: {isUnlock: boolean, value: string};
  }

  const [inputsState, setInputsState] = useState<InputState>({
    name: {isUnlock: false, value: ''},
    email: {isUnlock: false, value: ''},
    password: {isUnlock: false, value: ''},
  })

  const [noValidationLabel, setNoValidationLabel] = useState<string | null>(null)

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

  const {data, error, isValidating, putData} = usePutUserData()
  console.log({data}, {error}, {isValidating});

  const validateAndPostData = async () => {
    const {name, email} = inputsState

    if (name.value && /@/.test(email.value)) {
      // putData({
      //   firstName: name.value,
      //   email: email.value,
      // })
      
      return;
    }

    if (!name.value) {
      setNoValidationLabel('Please, write your name.')
    } else {
      setNoValidationLabel('Wrong email format! please check and enter a correct one.')
    }

    setTimeout(() => setNoValidationLabel(null), 3000)
    
  }
  
  return (
    <FormUserData>
      <>
        <BarForInput label='Name' hasSelector isUnlock={inputsState.name.isUnlock} selectorAction={() => changeInputUnlock('name')}/>

        <InputUserData type='text' isUnlock={inputsState.name.isUnlock} returnInputValue={returnInputValue('name')} />

        <BarForInput label='Email' hasSelector isUnlock={inputsState.email.isUnlock} selectorAction={() => changeInputUnlock('email')}/>

        <InputUserData type='email' isUnlock={inputsState.email.isUnlock} returnInputValue={returnInputValue('email')} />

        <BarForInput label='Current Password' hasSelector isUnlock={inputsState.password.isUnlock} selectorAction={() => alert('write func to go to password chenching')}/>

        <InputUserData type='password' isUnlock={inputsState.password.isUnlock}/>

        <ButtonUserData label='Save Change' action={validateAndPostData} className={styles['Form-Button']} />

        <NoValidationText label={noValidationLabel} />
      </>
    </FormUserData>
  )
}

export default ChangeNameOrEmailField