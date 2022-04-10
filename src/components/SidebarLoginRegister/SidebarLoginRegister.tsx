import { FC, useState } from "react";

import TabsFormsUserData from "src/components/TabsFormsUserData";
import LoginField from "src/components/LoginField";
import RecoverOrResetPasswordField from "src/components/RecoverOrResetPasswordField";

import styles from "./SidebarLoginRegister.module.css";
import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";

interface ISidebarLoginRegisterProps {
  isOpen: boolean;
  close: VoidFunction;
}

const SidebarLoginRegister: FC<ISidebarLoginRegisterProps> = ({
  isOpen,
  close,
}) => {
  const [loginForgotten, setLoginForgotten] = useState(false);

  const goToRecoverPassword = () =>
    setLoginForgotten((prevState) => !prevState);

  const tabsData = [
    {
      name: "register",
      panel: <h1>Register</h1>,
    },

    {
      name: "login",
      panel: loginForgotten ? (
        <RecoverOrResetPasswordField
          type={"reset"}
          footerAction={goToRecoverPassword}
        />
      ) : (
        <LoginField goToRecoverPassword={goToRecoverPassword} />
      ),
    },
  ];

  return (
    <SideBarWrapper isOpen={isOpen} closeBar={close}>
      <aside className={styles["AuthContainer"]}>
        <header className={styles["AuthContainer-Header"]}>
          <h1 className={styles["AuthContainer-Title"]}>JIDIPI</h1>
        </header>
        <div className={styles["AuthContainer-Content"]}>
          <TabsFormsUserData tabsData={tabsData} />
        </div>
      </aside>
    </SideBarWrapper>
  );
};

export default SidebarLoginRegister;
