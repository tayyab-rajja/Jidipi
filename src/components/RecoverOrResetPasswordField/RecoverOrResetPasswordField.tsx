import {FC, useState} from 'react'

import Divider from 'src/components/Divider'
import FormUserData from 'src/components/FormUserData'
import InputUserData from 'src/components/InputUserData'
import ButtonUserData from 'src/components/ButtonUserData'
import FooterUserData from 'src/components/FooterUserData'

import LoginMessage from 'src/components/LoginMessage'

interface Props {
  type: string;
  footerAction?: () => void;
}

const RecoverOrResetPasswordField:FC<Props> = ({type, footerAction = () => {}}) => {
  const [dataSended, setDataSended] = useState(false);
  
  const dividerLabel = type === 'recover' ? 'recover pasword' : 'reset password';
  
  const formChildren = type === 'recover' ? 
    <>
      <InputUserData type='email' placeholder='Email'/>
      <ButtonUserData label='recover password' action={() => setDataSended(prevState => !prevState)}/>
    </>
    :
    <>
      <InputUserData type='email' placeholder='Email'/>
      <InputUserData type='password' placeholder='Pasword'/>
      <InputUserData type='password' placeholder='Password Confirm'/>
      <ButtonUserData label='reset password' action={() => setDataSended(prevState => !prevState)}/>
    </>
  
    const messageComponent = (
      <LoginMessage
        type={type}
        visitorName={'Lorem'}
        visitorEmail={'lorem@mail.com'}
      />
    )

    const renderedContent = dataSended ? messageComponent : <FormUserData>{formChildren}</FormUserData>
  
  return (
    <>
      <Divider label={dividerLabel}/>

      {renderedContent}

      <FooterUserData label='Go back to' refLabel='Login' action={footerAction}/>
    </>
  )
}

export default RecoverOrResetPasswordField