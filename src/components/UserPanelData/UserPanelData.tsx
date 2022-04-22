import { useAuth } from "src/providers/AuthProvider/AuthProvider";

import InfoBlock from "./InfoBlock/InfoBlock";

import styles from "./UserPanelData.module.css";

const UserPanelData = () => {
  const {
    session: { user },
  } = useAuth();

  const testData = [
    {
      title: "Registed From",
      text: "Text text",
      type: "USER",
    },
    {
      title: "Login Hours",
      text: "Text text",
      type: "HOURS",
    },
    {
      title: "Visited Post",
      text: "Text text",
      type: "POSTS",
    },
    {
      title: "Favorate Post",
      text: "Text text",
      type: "FAVORITE",
    },
  ];
  return (
    <div className={styles["UserPanelData"]}>
      {testData.map(({ text, type, title }, index) => (
        <InfoBlock key={index} text={text} type={type} title={title} />
      ))}
      <div className={styles["UserPanelData-NameBlock"]}>
        <span>data</span>
      </div>
    </div>
  );
};

export default UserPanelData;
