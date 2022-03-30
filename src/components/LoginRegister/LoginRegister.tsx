import {FC} from 'react';

import clsx from 'clsx';

import styles from './styles.module.css';
import formStyles from '../FormUserData/FormUserData.module.css';

import LoginWithSocialBtn from '../LoginWithSocialBtn';
import ButtonUserData from '../ButtonUserData';
import InputUserData from '../InputUserData';
import FormUserData from '../FormUserData';
import SectionUserData from '../SectionUserData';
import TabsFormsUserData from '../TabsFormsUserData';

const tabLogin = (
  <SectionUserData>
    <FormUserData>
      <>
        <LoginWithSocialBtn logoUrl='/google-logo.png' socialName='Google' className={formStyles['form__elem']} />
        
        <LoginWithSocialBtn logoUrl='/facebook-logo.png' socialName='Facebook' className={formStyles['form__elem']} />

        <InputUserData type='email' placeholder='Email' className={formStyles['form__elem']}/>

        <InputUserData type='password' placeholder='Password' className={formStyles['form__elem']}/>
        
        <ButtonUserData label='LOGIN' className={clsx(styles['setting-account__btn'], formStyles['form__elem'])} action={() => console.log('Login')}/>
      </>
    </FormUserData>
  </SectionUserData>
);

const tabRegister = <h1>Register</h1>

const LoginRegister:FC = () => {
  return (
    <TabsFormsUserData
      tabName1='REGISTER'
      tabName2='LOGIN'
      tab1={tabRegister}
      tab2={tabLogin}

      className={styles['body__login-register']}
    >
    </TabsFormsUserData>
  )
}

export default LoginRegister