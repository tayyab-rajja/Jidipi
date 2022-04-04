import {FC, useState} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
import LoginField from 'src/components/LoginField';
import RecoverOrResetPasswordField from 'src/components/RecoverOrResetPasswordField';

import styles from './SidebarLoginRegister.module.css';

const SidebarLoginRegister:FC = () => {
  const [loginForgotten, setLoginForgotten] = useState(false);

  const goToRecoverPassword = () => setLoginForgotten(prevState => !prevState);
  
  const tabsData = [
    {
      name: 'register',
      panel: <h1>Register</h1>
    },
    
    {
      name: 'login',
      panel: loginForgotten ? <RecoverOrResetPasswordField type={'reset'} footerAction={goToRecoverPassword}/> : <LoginField goToRecoverPassword={goToRecoverPassword}/>
    },
  ]

  return (
    <div className={styles['Body-LoginRegisterContainer']}>
      <TabsFormsUserData
        tabsData={tabsData}
      />
    </div>
  )
}

export default SidebarLoginRegister