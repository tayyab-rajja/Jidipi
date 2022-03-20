import CustomButton from "src/components/CustomButton";

import styles from "./Sidebar.module.css";

export const SidebarTabs = () => {
  return (
    <>
      {[0, 1].map((_, index) => (
        <div key={index} className={styles["SidebarTabs"]}>
          <CustomButton text="text" iconType="YEAR" onClick={() => {}} />
          <CustomButton text="text" onClick={() => {}} />
        </div>
      ))}
    </>
  );
};
