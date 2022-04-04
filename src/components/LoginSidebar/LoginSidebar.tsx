import { useForm, SubmitHandler } from "react-hook-form";
import ReactFacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { useAuth } from "src/providers/AuthProvider";
import { useLoginRequest } from "../../hooks/api/useLoginRequest";

import styles from "./LoginSidebar.module.css";

interface InputValues {
  email: string;
  password: string;
}

const LoginSidebar = () => {
  const {
    removeSession,
    session: { status },
  } = useAuth();

  const { login } = useLoginRequest();

  const { register, reset, handleSubmit } = useForm<InputValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler: SubmitHandler<InputValues> = async ({
    email,
    password,
  }) => {
    const result = login({ email, password });
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
    const result = login({
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
    const result = login({
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
    <div>
      {status !== "authenticated" && (
        <form
          className={styles["Main-FormContainer"]}
          onSubmit={handleSubmit(loginHandler)}
          noValidate
        >
          <div className={styles["Main-ClientInfo"]}>
            <input
              type="email"
              placeholder="E-Mail*"
              {...register("email", {
                required: "required",
              })}
            />
            <input
              type="password"
              placeholder="Passwort*"
              {...register("password", {
                required: "required",
              })}
            />
          </div>
          <div className={styles["Main-Submit"]}>
            <button disabled={status === "loading"}>Submit</button>
          </div>
        </form>
      )}
      {status !== "authenticated" && (
        <ReactFacebookLogin
          appId={process.env.FACEBOOK_CLIENT_ID!}
          fields="name,email,picture"
          callback={responseFacebook}
          autoLoad={false}
        />
      )}
      {status !== "authenticated" && (
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID!}
          buttonText="Login"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailed}
          cookiePolicy={"single_host_origin"}
        />
      )}
      <div className={styles["Main-Logout"]}>
        <button disabled={status === "unauthenticated"} onClick={removeSession}>
          Sign out
        </button>
      </div>
      {status === "loading" && <p>loading</p>}
    </div>
  );
};

export default LoginSidebar;
