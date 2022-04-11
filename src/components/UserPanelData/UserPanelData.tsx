import InfoBlock from "./InfoBlock/InfoBlock";

import styles from "./UserPanelData.module.css";

const UserPanelData = () => {
  const testData = [
    {
      title: "Title",
      text: "Text text",
      type: "USER",
    },
    {
      title: "Title",
      text: "Text text",
      type: "HOURS",
    },
    {
      title: "Title",
      text: "Text text",
      type: "POSTS",
    },
    {
      title: "Title",
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
