import { FC, useState } from "react";

import Divider from "src/components/Divider";
import FormUserData from "src/components/FormUserData";
import InputUserData from "src/components/InputUserData";
import ButtonUserData from "src/components/ButtonUserData";
import FooterUserData from "src/components/FooterUserData";

import LoginMessage from "src/components/LoginMessage";

import { useUserData } from "src/api/useUserData";

interface Props {
  type: string;
  footerAction?: () => void;
}

const RecoverOrResetPasswordField: FC<Props> = ({
  type,
  footerAction = () => {},
}) => {
  const [dataSended, setDataSended] = useState(false);

  const [email, setEmail] = useState("");

  const returnInputValue = (value: string) => setEmail(value);

  const { sendEmailToRecoverPassword } = useUserData();

  const dividerLabel =
    type === "recover" ? "recover pasword" : "reset password";

  const formChildren =
    type === "recover" ? (
      <>
        <InputUserData
          type="email"
          placeholder="Email"
          returnInputValue={returnInputValue}
        />
        <ButtonUserData
          label="recover password"
          action={() => {
            sendEmailToRecoverPassword(email).then((data) => {
              if (data.request.status >= 200 && data.request.status <= 299) {
                setDataSended(true);
              }
            });
          }}
        />
      </>
    ) : (
      <>
        <InputUserData type="email" placeholder="Email" />
        <InputUserData type="password" placeholder="Pasword" />
        <InputUserData type="password" placeholder="Password Confirm" />
        <ButtonUserData
          label="reset password"
          action={() => setDataSended((prevState) => !prevState)}
        />
      </>
    );

  const messageComponent = (
    <LoginMessage type={type} visitorName={"Lorem"} visitorEmail={email} />
  );

  const renderedContent = dataSended ? (
    messageComponent
  ) : (
    <FormUserData>{formChildren}</FormUserData>
  );

  return (
    <>
      <Divider label={dividerLabel} />

      {renderedContent}

      <FooterUserData
        label="Go back to"
        refLabel="Login"
        action={footerAction}
      />
    </>
  );
};

export default RecoverOrResetPasswordField;
