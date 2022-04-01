import {FC} from 'react'

import Divider from 'src/components/Divider'
import FormUserData from 'src/components/FormUserData'
import InputUserData from 'src/components/InputUserData'
import ButtonUserData from 'src/components/ButtonUserData'
import FooterUserData from 'src/components/FooterUserData'

interface Props {
  changeLoginForgottenStatus: () => void;
}

const ForgotPasswordContainer:FC<Props> = ({changeLoginForgottenStatus}) => {  
  return (
    <>
      <Divider label="reset password"/>

      <FormUserData>
        <>
          <InputUserData type="email" placeholder="Email"/>
          <InputUserData type="password" placeholder="Password"/>
          <InputUserData type="password" placeholder="Password Confirm"/>
          <ButtonUserData label="reset password" action={() => alert('write your reset password function')}/>
        </>
      </FormUserData>

      <FooterUserData
        label='Go back to'
        refLabel='Login'
        action={changeLoginForgottenStatus}
      />
    </>
  )
}

export default ForgotPasswordContainer