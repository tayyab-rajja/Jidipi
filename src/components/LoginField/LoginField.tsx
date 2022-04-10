import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";

import { useLoginRequest } from "src/hooks/api/useLoginRequest";

import LoginWithSocialBtn from "src/components/LoginWithSocialBtn";
import Divider from "src/components/Divider";
import ButtonUserData from "src/components/ButtonUserData";
import RememberMe from "src/components/RememberMe";
import FooterUserData from "src/components/FooterUserData";
import InputUserDataRHF from "src/components/InputUserDataRHF";

import googleIcon from "public/images/social-icons/Google.svg";
import facebookIcon from "public/images/social-icons/Facebook.svg";

import stylesForm from "src/components/FormUserData/FormUserData.module.css";
import styles from "./LoginField.module.css";

interface InputValues {
  email: string;
  password: string;
}

interface Props {
  goToRecoverPassword: () => void;
}

const LoginField: FC<Props> = ({ goToRecoverPassword }) => {
  const { login } = useLoginRequest();

  const { handleSubmit, control } = useForm<InputValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler: SubmitHandler<InputValues> = async ({
    email,
    password,
  }) => {
    const result = await login({ email, password });
    if (result) {
      // TODO: show error
    }
  };

  const responseFacebook = async (response: any) => {
    if (response?.status) {
      const res: ReactFacebookFailureResponse = response;
      // TODO: show error from Facebook request
    }
    const res: ReactFacebookLoginInfo = response;
    const result = await login({
      type: "social",
      network: "facebook",
      accessToken: res.accessToken,
    });
    if (result) {
      // TODO: show error
    }
  };

  const responseGoogleSuccess = async (response: any) => {
    if (!response.accessToken) {
      const res: GoogleLoginResponseOffline = response;
      // TODO: show error from Google request
    }
    const res: GoogleLoginResponse = response;
    const result = await login({
      type: "social",
      network: "google",
      credential: res.tokenId,
    });
    if (result) {
      // TODO: show error
    }
  };

  const responseGoogleFailed = (value: any) => {
    console.log(value);
    // TODO: show error from Google request
  };

  return (
    <>
      <LoginWithSocialBtn
        img={googleIcon}
        socialName="Google"
        action={() => alert("Write your login function")}
        className={stylesForm["Form-Elem"]}
      />
      <LoginWithSocialBtn
        img={facebookIcon}
        socialName="Facebook"
        action={() => alert("Write your login function")}
        className={stylesForm["Form-Elem"]}
      />

      <Divider label="or login with email" />

      <form className={styles["Form"]} noValidate>
        <Controller
          control={control}
          name={"email"}
          render={({ field: { ref, ...field } }) => (
            <InputUserDataRHF
              type="email"
              placeholder="Email"
              {...field}
              ref={ref}
            />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field: { ref, ...field } }) => (
            <InputUserDataRHF
              type="password"
              placeholder="Password"
              {...field}
              ref={ref}
            />
          )}
        />
        <RememberMe
          className={stylesForm["Form-Elem"]}
          checkAction={() => alert("write your check action")}
          forgotPasswordAction={goToRecoverPassword}
        />
        <ButtonUserData label="login" action={handleSubmit(loginHandler)} />
      </form>

      <FooterUserData
        label="Do not have an account?"
        refLabel="Register"
        action={() => alert("Your to registration function")}
      />
    </>
  );
};

export default LoginField;
