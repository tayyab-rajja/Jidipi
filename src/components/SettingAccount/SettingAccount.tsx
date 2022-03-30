import {FC, useState} from 'react';

import styles from './SettingAccount.module.css';

import ButtonUserData from '../ButtonUserData';
import BarForInput from '../BarForInput';
import InputUserData from '../InputUserData';
import FormUserData from '../FormUserData';
import SectionUserData from '../SectionUserData';
import TabsFormsUserData from '../TabsFormsUserData';

const SettingAccount:FC = () => {
  const [inputNameUnlock, setInputNameUnlock] = useState(true);
  const [inputEmailUnlock, setInputEmailUnlock] = useState(true);
  const [inputPasswordsUnlock, setInputPasswordsUnlock] = useState(true);
  
  return (
    <TabsFormsUserData
      tabName1='AVATAR'
      tabName2='ACCOUNT'
      tab1={<h1>Avatar</h1>}
      tab2={
        <SectionUserData>
          <FormUserData>
            <>
              <BarForInput label='Name' hasSelector={true} isUnlock={inputNameUnlock} selectorAction={() => setInputNameUnlock((s) => !s)}/>

              <InputUserData type='text' isUnlock={inputNameUnlock}/>

              <BarForInput label='Email' hasSelector={true} isUnlock={inputEmailUnlock} selectorAction={() => setInputEmailUnlock((s) => !s)}/>

              <InputUserData type='email' isUnlock={inputEmailUnlock}/>

              <BarForInput label='Current Password' hasSelector={true} isUnlock={inputPasswordsUnlock} selectorAction={() => setInputPasswordsUnlock((s) => !s)}/>

              <InputUserData type='password' isUnlock={inputPasswordsUnlock}/>
              
              <BarForInput label='New Password'/>

              <InputUserData type='password' isUnlock={inputPasswordsUnlock}/>
              
              <BarForInput label='New Password Confirmation'/>

              <InputUserData type='password' isUnlock={inputPasswordsUnlock}/>

              <ButtonUserData label='Save Change' className={styles['setting-account__btn']} action={() => console.log('Saved')}/>
            </>
          </FormUserData>
        </SectionUserData>
      }

      className={styles['body__setting-account']}
    >
    </TabsFormsUserData>
  )
}

export default SettingAccount