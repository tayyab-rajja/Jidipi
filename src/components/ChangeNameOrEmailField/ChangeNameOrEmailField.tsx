import {FC, useState} from 'react';

import axios from 'axios'

import ButtonUserData from 'src/components/ButtonUserData';
import BarForInput from 'src/components/BarForInput';
import InputUserData from 'src/components/InputUserData';
import FormUserData from 'src/components/FormUserData';
import NoValidationText from 'src/components/NoValidationText'

// import {usePutUserData} from 'src/api/usePutUserData'

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

  const validateAndPostData = async () => {
    const {name, email} = inputsState

    if (name.value && /@/.test(email.value)) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imdvb2dsZUVtYWlsIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJnb29nbGVJZCI6IjEwOTA0ODA4Njc5NTA3MzM2NjEzNCIsImZpcnN0TmFtZSI6IkRhbmlsIFpheWNoZW5rbyIsInVzZXJuYW1lIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5dDJvakRnS0lhUWFBc1AyckQzMF9BSDlfR1AzekRSaHdUcXhZNz1zOTYtYyIsImVtYWlsIjoiZGFuaWwuemF5Y2hlbmtvQGhlYWR3b3Jrcy5jb20udWEiLCJpc1ZlcmlmaWVkIjp0cnVlLCJfaWQiOiI2MjRkYWFjNWNmOTE1MzAwMDk0OTg5MTYiLCJyb2xlcyI6W3siX2lkIjoiNjA3NzY3ZGRkM2U1ZWZmYzU1YjYxNTIyIiwidGl0bGUiOiJyZWFkZXIifV19LCJpYXQiOjE2NDkzMTc5NDgsImV4cCI6MTY1MTkwOTk0OH0.RHLV9Ovxawv7XRrgYSWOqoq-lR1SJRkZIGl60SjNnL0'

      axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
        headers: {Authorization: "Bearer " + token},
        data: {
          firstName: name.value,
          email: email.value,
        }
      })
      
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