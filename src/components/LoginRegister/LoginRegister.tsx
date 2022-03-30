import {FC} from 'react';

import clsx from 'clsx';

import styles from './styles.module.css';
import formStyles from '../FormUserData/FormUserData.module.css';

import LoginWithSocialBtn from '../LoginWithSocialBtn';
import Divider from '../Divider';
import ButtonUserData from '../ButtonUserData';
import InputUserData from '../InputUserData';
import RememberMe from '../RememberMe';
import FormUserData from '../FormUserData';
import SectionUserData from '../SectionUserData';
import TabsFormsUserData from '../TabsFormsUserData';
import Link from 'next/link';

const tabLogin = (
  <SectionUserData>
    <FormUserData>
      <>
        <LoginWithSocialBtn logoUrl='/google-logo.png' socialName='Google' className={formStyles['form__elem']} />

        
        <LoginWithSocialBtn logoUrl='/facebook-logo.png' socialName='Facebook' className={formStyles['form__elem']} />

        <Divider label='OR LOGIN WITH EMAIL'/>
        
        <InputUserData type='email' placeholder='Email'/>

        <InputUserData type='password' placeholder='Password'/>

        <RememberMe/>
        
        <ButtonUserData label='LOGIN' className={clsx(styles['setting-account__btn'])} action={() => console.log('Login')}/>
      </>
    </FormUserData>
  </SectionUserData>
);

const backToLogin = (
  <div className={styles['login-register__back-to-login']}>Go back to <Link href='/'><a className={styles['login-register__a']}> Login</a></Link></div>
)

const tabRegister = (
  <SectionUserData>
    <>
      <FormUserData>
        <>
          <Divider label='RESET PASSWORD'/>
          
          <InputUserData type='email' placeholder='Email'/>

          <InputUserData type='password' placeholder='Password'/>

          <InputUserData type='password' placeholder='Password Confirm'/>
          
          <ButtonUserData label='RESET PASSWORD' className={clsx(styles['setting-account__btn'])} action={() => console.log('Reset Password')}/>
        </>
      </FormUserData>
      
      {backToLogin}
    </>
  </SectionUserData>
);


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