import InfoBlock from "./InfoBlock/InfoBlock";

import styles from "./UserPanelData.module.css";

const UserPanelData = () => {
  const testData = [
    {
      title: "Title",
      text: "Text text",
      type: "DESIGNER",
    },
    {
      title: "Title",
      text: "Text text",
      type: "DESIGNER",
    },
    {
      title: "Title",
      text: "Text text",
      type: "DESIGNER",
    },
    {
      title: "Title",
      text: "Text text",
      type: "DESIGNER",
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
