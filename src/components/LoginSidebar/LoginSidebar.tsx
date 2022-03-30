import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./LoginSidebar.module.css";
import { ILoginSuccess } from "types/loginTypes";
import { useAuth } from "src/providers/AuthProvider";
import axios from "axios";

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
    } catch (error) {
      console.log(error?.response?.data?.error);
      // TODO: show error message
    }
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
