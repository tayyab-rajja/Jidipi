import {FC} from 'react'

import LoginWithSocialBtn from 'src/components/LoginWithSocialBtn';
import Divider from 'src/components/Divider';
import FormUserData from 'src/components/FormUserData';
import InputUserData from 'src/components/InputUserData';
import ButtonUserData from 'src/components/ButtonUserData';
import RememberMe from 'src/components/RememberMe';
import FooterUserData from 'src/components/FooterUserData';

import stylesForm from 'src/components/FormUserData/FormUserData.module.css';

import googleIcon from 'public/images/social-icons/google-logo.png';
import facebookIcon from 'public/images/social-icons/facebook-logo.png';

interface Props {
  goToRecoverPassword: () => void;
}

const LoginField:FC<Props> = ({goToRecoverPassword}) => {
  return (
    <>
      <LoginWithSocialBtn img={googleIcon} socialName="Google" action={() => alert('Write your login function')} className={stylesForm['Form-Elem']}/>
      <LoginWithSocialBtn img={facebookIcon} socialName="Facebook" action={() => alert('Write your login function')} className={stylesForm['Form-Elem']}/>
      
      <Divider label='or login with email'/>
      
      <FormUserData>
        <>
          <InputUserData type="email" placeholder="Email"/>
          <InputUserData type="password" placeholder="Password"/>
          <RememberMe className={stylesForm['Form-Elem']} checkAction={() => alert('write your check action')} forgotPasswordAction={goToRecoverPassword}/>
          <ButtonUserData label='login' action={() => alert('Write your Login function')}/>
        </>
      </FormUserData>

      <FooterUserData
        label='Do not have an account?'
        refLabel='Register'
        action={() => alert('Your to registration function')}
      />
    </>
  )
}

export default LoginField