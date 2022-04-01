import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./LoginSidebar.module.css";
import { ILoginSuccess } from "types/loginTypes";
import { useAuth } from "src/providers/AuthProvider";
import axios from "axios";
import ReactFacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";

interface InputValues {
  email: string;
  password: string;
}

const LoginSidebar = () => {
  const {
    setSession,
    removeSession,
    session: { status },
    setLoading,
  } = useAuth();

  const { register, reset, handleSubmit } = useForm<InputValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login: SubmitHandler<InputValues> = async ({ email, password }) => {
    try {
      setLoading();
      const res = await axios.post<ILoginSuccess>(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        { email, password }
      );
      if (res.status === 200) {
        const response: ILoginSuccess = res.data;
        setSession(response);
        reset();
        return;
      }
      console.log({ ...res });
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      // TODO: show error message
    }
  };

  const responseFacebook = async (
    response: any
    // response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    if (response?.status) {
      const res: ReactFacebookFailureResponse = response;
    }
    const res: ReactFacebookLoginInfo = response;

    try {
      setLoading();
      const body = {
        type: "social",
        network: "facebook",
        //network:google
        accessToken: res.accessToken,
      };
      const socialLoginResponse = await axios.post<ILoginSuccess>(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        body
      );
      if (socialLoginResponse.status === 200) {
        const response: ILoginSuccess = socialLoginResponse.data;
        setSession(response);
        return;
      }
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      // TODO: show error message
    }
    console.log(response);
  };

  return (
    <div>
      {status !== "authenticated" && (
        <form
          className={styles["Main-FormContainer"]}
          onSubmit={handleSubmit(login)}
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
      <ReactFacebookLogin
        appId={process.env.FACEBOOK_ID!}
        fields="name,email,picture"
        callback={responseFacebook}
        autoLoad={false}
      />
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
