import { FC } from "react";
import CustomButton from "src/components/CustomButton";

import { sidebarTabs } from "constant/sidebarTabs";

import styles from "./SidebarTabs.module.css";

interface SidebarTabsProps {
  currentTab: string;
  handleChange: (tab: string) => void;
}

export const SidebarTabs: FC<SidebarTabsProps> = ({
  currentTab,
  handleChange,
}) => {
  const tabs = sidebarTabs["architectures"];
  return (
    <>
      {tabs.map((_, index) => {
        const currentIndex = index === 1 ? index + 1 : index + 2;
        const tab = tabs[index === 0 ? index : currentIndex];
        const nextTab = tabs[index === 0 ? index + 1 : currentIndex + 1];

        return !nextTab || !tab ? null : (
          <div key={index} className={styles["SidebarTabs"]}>
            <CustomButton
              text={tab.text}
              iconType={tab.type}
              onClick={() => handleChange(tab.type)}
              isActive={tab.type === currentTab}
            />
            <CustomButton
              text={nextTab.text}
              iconType={nextTab.type}
              onClick={() => handleChange(nextTab.type)}
              isActive={nextTab.type === currentTab}
            />
          </div>
        );
      })}
    </>
  );
};
