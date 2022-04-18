import {FC, useState, useEffect} from 'react';

import ButtonUserData from 'src/components/ButtonUserData';
import BarForInput from 'src/components/BarForInput';
import InputUserData from 'src/components/InputUserData';
import FormUserData from 'src/components/FormUserData';
import NoValidationText from 'src/components/NoValidationText'

import {usePutUserData} from 'src/api/usePutUserData'

import styles from './ChangePasswordField.module.css'

interface InputsValue {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

interface InputsUnlock {
  // name: boolean;
  // email: boolean;
  // passwords: boolean;
  [key: string]: any;
}

const ChangePasswordField:FC = () => {
  const {data: serverData, error, isValidating, putData, updatePassword} = usePutUserData()

  const [inputsValue, setInputsValue] = useState<InputsValue>({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  })

  const [inputsUnlock, setInputsUnlock] = useState<InputsUnlock>({
    name: false,
    email: false,
    passwords: true,
  })

  const [noValidationLabel, setNoValidationLabel] = useState<string | null>(null)

  const changeInputUnlock = (input: string) => {
    return () => {
      setInputsUnlock(prev => {
        return {
          ...prev,
          [input]: !prev[input]
        }
      })
    }
  }

  const returnInputValue = (input: string) => {
    return (value: string) => {
      setInputsValue(prev => {
        return {
          ...prev,
          [input]: value,
        }
      })
    }
  }

  const showNoValidationText = (label: string) => {
    setNoValidationLabel(label)

    setTimeout(() => setNoValidationLabel(null), 3000)
  }

  const validateAndPostData = () => {
    const {name, email, currentPassword, newPassword, newPasswordConfirmation} = inputsValue

    interface NewUserData {
      firstName?: string;
      email?: string;
    }

    let newUserData: NewUserData = {}
    
    if (inputsUnlock.name && name) newUserData.firstName = name

    if (inputsUnlock.email && /@/.test(email)) newUserData.email = email
    
    if (Object.keys(newUserData).length) putData(newUserData)

    if (currentPassword) {
      if (newPassword === newPasswordConfirmation) {
        updatePassword({
          currentPassword,
          password: newPassword
        })
      } else {
        showNoValidationText('Password confirmation is not equal to new password')
      }
    }
    
    if (!name) {
      showNoValidationText('Please, write your name.')
    } else {
      if (!/@/.test(email)) {
        showNoValidationText('Wrong email format! please check and enter a correct one.')
      }
    }
  }

  useEffect(() => {
    if (serverData) {
      setInputsValue(prev => {
        return {
          ...prev,
          name: serverData.user.firstName,
          email: serverData.user.email,
        }
      });
    }
  }, [isValidating, serverData])

  return (
    <FormUserData>
      <>
        <BarForInput label='Name' hasSelector isUnlock={inputsUnlock.name} selectorAction={changeInputUnlock('name')} />

        <InputUserData type='text' isUnlock={inputsUnlock.name} value={inputsValue.name} returnInputValue={returnInputValue('name')} />

        <BarForInput label='Email' hasSelector isUnlock={inputsUnlock.email} selectorAction={() => {
          if (!isValidating) {
            if (serverData.user.googleId || serverData.user.facebookId) {
              showNoValidationText('You can not change email if you logged in by social network')
            } else {
              changeInputUnlock('email')
            }
          } else {
            showNoValidationText('Please wait for data loading')
          }
      }} />

        <InputUserData type='email' isUnlock={inputsUnlock.email} value={inputsValue.email} returnInputValue={returnInputValue('email')} />

        <BarForInput label='Current Password' hasSelector isUnlock={inputsUnlock.passwords} selectorAction={changeInputUnlock('passwords')} />

        <InputUserData type='password' isUnlock={inputsUnlock.passwords} returnInputValue={returnInputValue('currentPassword')} />
        
        <BarForInput label='New Password'/>

        <InputUserData type='password' isUnlock={inputsUnlock.passwords} returnInputValue={returnInputValue('newPassword')} />
        
        <BarForInput label='New Password Confirmation'/>

        <InputUserData type='password' isUnlock={inputsUnlock.passwords} returnInputValue={returnInputValue('newPasswordConfirmation')} />

        <ButtonUserData label='Save Change' className={styles['SettingNameEmail-Btn']} action={validateAndPostData}/>

        <NoValidationText label={noValidationLabel} />
      </>
    </FormUserData>
  )
}

export default ChangePasswordField