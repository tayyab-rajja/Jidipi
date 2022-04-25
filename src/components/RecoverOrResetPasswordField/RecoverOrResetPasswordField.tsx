import { FC, useState } from "react";

import Divider from "src/components/Divider";
import FormUserData from "src/components/FormUserData";
import InputUserData from "src/components/InputUserData";
import ButtonUserData from "src/components/ButtonUserData";
import NoValidationText from "src/components/NoValidationText";
import FooterUserData from "src/components/FooterUserData";

import LoginMessage from "src/components/LoginMessage";

import { useUserData } from "src/api/useUserData";
import clsx from "clsx";

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

  const [noValidationLabel, setNoValidationLabel] = useState("");

  const showNoValidation = (label: string) => {
    setNoValidationLabel(label);

    setTimeout(() => {
      setNoValidationLabel("");
    }, 3000);
  };

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
          redBorder={Boolean(noValidationLabel)}
        />

        <NoValidationText label={noValidationLabel} />

        <ButtonUserData
          label="recover password"
          action={() => {
            if (/@/.test(email) === false) {
              showNoValidation("Wrong email format.");
              return;
            }

            sendEmailToRecoverPassword(email).then(
              (data: { [key: string]: any }) => {
                if (data.request.status >= 200 && data.request.status <= 299) {
                  setDataSended(true);
                } else showNoValidation(data.response.data.error);
              }
            );
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
