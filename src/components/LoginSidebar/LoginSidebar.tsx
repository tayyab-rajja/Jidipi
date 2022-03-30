import { useState } from "react";
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
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { setSession, removeSession, session, setLoading } = useAuth();

  const { register, reset, handleSubmit } = useForm<InputValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login: SubmitHandler<InputValues> = async ({ email, password }) => {
    setIsFormSubmitting(true);
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
        setIsFormSubmitting(true);
        return;
      }
    } catch (error) {
      console.log(error);
      // TODO: show error message
    }

    // const response: ILoginError = await res.json();
  };

  return (
    <div>
      {(session.status === "unauthenticated" ||
        session.status === "loading") && (
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
            <button disabled={isFormSubmitting}>Submit</button>
          </div>
        </form>
      )}
      <div className={styles["Main-Logout"]}>
        <button
          disabled={session.status === "unauthenticated"}
          onClick={removeSession}
        >
          Sign out
        </button>
      </div>
      {session.status === "loading" && <p>loading</p>}
    </div>
  );
};

export default LoginSidebar;
