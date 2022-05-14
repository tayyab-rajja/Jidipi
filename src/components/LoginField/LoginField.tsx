import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
// import ReactFacebookLogin, {
//   ReactFacebookFailureResponse,
//   ReactFacebookLoginInfo,
// } from "react-facebook-login";
import Image from "next/image";
import clsx from "clsx";

import { useLoginRequest } from "src/hooks/api/useLoginRequest";

import LoginWithSocialBtn from "src/components/LoginWithSocialBtn";
import Divider from "src/components/Divider";
import ButtonUserData from "src/components/ButtonUserData";
import CheckBox from "src/components/CheckBox";
import ForgotPassword from "src/components/ForgotPassword";
import FooterUserData from "src/components/FooterUserData";
import InputUserDataRHF from "src/components/InputUserDataRHF";
import NoValidationText from "src/components/NoValidationText";

import googleIcon from "public/images/icons/social/google-colorful.svg";
import facebookIcon from "public/images/icons/social/facebook-colorful.svg";

import stylesForm from "src/components/FormUserData/FormUserData.module.css";
import styles from "./LoginField.module.css";
import styleSocialBtn from "src/components/LoginWithSocialBtn/LoginWithSocialBtn.module.css";

interface InputValues {
  email: string;
  password: string;
}

interface Props {
  goToRecoverPassword: () => void;
}

const LoginField: FC<Props> = ({ goToRecoverPassword }) => {
  // const [dataIsValid, setDataIsValid] = useState(false)
  const [noValidText, setNoValidText] = useState<string | null>(null);

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
      showNoValidation(result.response?.data.error);
      // TODO: show error
    }
  };

  // const responseFacebook = async (response: any) => {
  //   if (response?.status) {
  //     const res: ReactFacebookFailureResponse = response;
  //     // TODO: show error from Facebook request
  //   }
  //   const res: ReactFacebookLoginInfo = response;
  //   const result = await login({
  //     type: "social",
  //     network: "facebook",
  //     accessToken: res.accessToken,
  //   });
  //   if (result) {
  //     // TODO: show error
  //   }
  // };

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
  const classSocialBtn = clsx(
    styleSocialBtn["Container"],
    styleSocialBtn["Body-Container"],
    stylesForm["Form-Elem"]
  );

  const showNoValidation = (label: string | null) => {
    setNoValidText(label);

    setTimeout(() => setNoValidText(null), 3000);
  };

  return (
    <div className={clsx(styles["Container"], styles["Body-Container"])}>
      {/*<ReactFacebookLogin*/}
      {/*  appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!}*/}
      {/*  fields="name,email,picture"*/}
      {/*  callback={responseFacebook}*/}
      {/*  autoLoad={false}*/}
      {/*  cssClass={classSocialBtn}*/}
      {/*  icon={*/}
      {/*    <div className={styles["SocialBtn-Icon"]}>*/}
      {/*      <Image src={facebookIcon} alt="logo" width={20} height={20} />*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*/>*/}

      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        buttonText="Login"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailed}
        cookiePolicy={"single_host_origin"}
        render={({ onClick, disabled }) => (
          <LoginWithSocialBtn
            img={googleIcon}
            socialName="Google"
            action={onClick}
            className={stylesForm["Form-Elem"]}
          />
        )}
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

        <div
          className={clsx(styles["CheckboxContainer"], stylesForm["Form-Elem"])}
        >
          <CheckBox
            checkAction={() => alert("write your check action")}
            label="Remember Me"
          />

          <ForgotPassword
            className={styles["CheckboxContainer-ForgotPassword"]}
            action={goToRecoverPassword}
          />
        </div>

        <ButtonUserData label="login" action={handleSubmit(loginHandler)} />
      </form>

      <NoValidationText label={noValidText} />

      <FooterUserData
        label="Do not have an account?"
        refLabel="Register"
        action={() => alert("Your to registration function")}
      />
    </div>
  );
};

export default LoginField;
