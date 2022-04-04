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
  
  const dividerLabel = type === 'recover' ? 'recover pasword' : 'Label for reset password will be here';
  
  const formChildren = type === 'recover' ? 
    <>
      <InputUserData type='email' placeholder='Email'/>
      <ButtonUserData label='recover password' action={() => setDataSended(prevState => !prevState)}/>
    </>
    :
    <p>Form for reset password will be here</p>
  
    const messageComponent = type === 'recover' ?
    <LoginMessage
      type={type}
      visitorName={'Lorem'}
      visitorEmail={'lorem@mail.com'}
    />
    :
    null;
  
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