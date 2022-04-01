import {FC, useState} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
import LoginField from 'src/components/LoginField';
// import ForgotPasswordField from 'src/components/ForgotPasswordField';
{/* <ForgotPasswordField changeLoginForgottenStatus={changeLoginForgottenStatus}/> */}

import styles from './SidebarLoginRegister.module.css';

const SidebarLoginRegister:FC = () => {
  const [loginForgotten, setLoginForgotten] = useState(false);

  const changeLoginForgottenStatus = () => setLoginForgotten(prevState => !prevState);
  
  const tabsData = [
    {
      name: 'register',
      panel: <h1>Register</h1>
    },
    
    {
      name: 'login',
      panel: loginForgotten ? <h1>Reset Password</h1> : <LoginField changeLoginForgottenStatus={changeLoginForgottenStatus}/>
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