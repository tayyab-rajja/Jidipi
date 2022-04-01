import {FC} from 'react'

import LoginWithSocialBtn from 'src/components/LoginWithSocialBtn';
import Divider from 'src/components/Divider';
import FormUserData from 'src/components/FormUserData';
import InputUserData from 'src/components/InputUserData';
import ButtonUserData from 'src/components/ButtonUserData';
import RememberMe from 'src/components/RememberMe';

import stylesForm from 'src/components/FormUserData/FormUserData.module.css';

const Login:FC = () => {
  return (
    <>
      <LoginWithSocialBtn imgUrl={'/public/images/social-icons/google-logo.png'} socialName="Google" action={() => alert('Write your login function')} className={stylesForm['Form-Elem']}/>
      <LoginWithSocialBtn imgUrl='/public/images/social-icons/facebook-logo.png' socialName="Facebook" action={() => alert('Write your login function')} className={stylesForm['Form-Elem']}/>
      
      <Divider label='or login with email'/>
      
      <FormUserData>
        <>
          <InputUserData type="email" placeholder="Email"/>
          <InputUserData type="password" placeholder="Password"/>
          <RememberMe className={stylesForm['Form-Elem']} checkAction={() => alert('write your check action')} forgotPasswordAction={() => alert('write your remember action')}/>
          <ButtonUserData label='login' action={() => alert('Write your Login function')}/>
        </>
      </FormUserData>
    </>
  )
}

export default Login