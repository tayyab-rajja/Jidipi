import {FC, useEffect, useState} from 'react';

import axios from 'axios'

import ButtonUserData from 'src/components/ButtonUserData';
import BarForInput from 'src/components/BarForInput';
import InputUserData from 'src/components/InputUserData';
import FormUserData from 'src/components/FormUserData';
import NoValidationText from 'src/components/NoValidationText'

import {usePutUserData} from 'src/api/usePutUserData'

import styles from './ChangeNameOrEmailField.module.css'

interface Props {
  switchToChangePassword: () => void;
}

const ChangeNameOrEmailField:FC<Props> = ({switchToChangePassword}) => {
  interface InputState {
    [key: string]: {isUnlock: boolean, value: string};
  }

  const {data: serverData, error, isValidating, putData} = usePutUserData()

  const [inputsState, setInputsState] = useState<InputState>({
    name: {isUnlock: false, value: ''},
    email: {isUnlock: false, value: ''},
  })

  useEffect(() => {
    if (serverData) {
      setInputsState((prev) => ({
        name: {...prev.name, value: serverData.user.firstName},
        email: {...prev.email, value: serverData.user.email}
      }));
    }
  }, [isValidating, serverData])

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

  const showNoValidationText = (label: string) => {
    setNoValidationLabel(label)

    setTimeout(() => setNoValidationLabel(null), 3000)
  }

  const validateAndPostData = () => {
    const {name, email} = inputsState

    if (name.value && /@/.test(email.value)) {
      putData({
        firstName: name.value,
        email: email.value,
      })

      return;
    }

    if (!name.value) {
      showNoValidationText('Please, write your name.')
    } else {
      showNoValidationText('Wrong email format! please check and enter a correct one.')
    }
  }
  
  return (
    <FormUserData>
      <>
        <BarForInput label='Name' hasSelector isUnlock={inputsState.name.isUnlock} selectorAction={() => changeInputUnlock('name')}/>

        <InputUserData type='text' isUnlock={inputsState.name.isUnlock} returnInputValue={returnInputValue('name')} value={inputsState.name.value}/>

        <BarForInput label='Email' hasSelector isUnlock={inputsState.email.isUnlock} selectorAction={() => {
          if (!isValidating) {
            if (serverData.user.googleId || serverData.user.facebookId) {
              showNoValidationText('You can not change email if you logged in by social network')
            } else {
              changeInputUnlock('email')
            }
          } else {
            showNoValidationText('Please wait for data loading')
          }
      }}/>

        <InputUserData type='email' isUnlock={inputsState.email.isUnlock} returnInputValue={returnInputValue('email')} value={inputsState.email.value}/>

        <BarForInput label='Current Password' hasSelector isUnlock={false} selectorAction={() => switchToChangePassword()}/>

        <InputUserData type='password' isUnlock={false} value={''}/>

        <ButtonUserData label='Save Change' action={validateAndPostData} className={styles['Form-Button']} />

        <NoValidationText label={noValidationLabel} />
      </>
    </FormUserData>
  )
}

export default ChangeNameOrEmailField