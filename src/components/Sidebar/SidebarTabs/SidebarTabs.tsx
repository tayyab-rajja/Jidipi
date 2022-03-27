import { FC } from "react";
import CustomButton from "src/components/CustomButton";

import styles from "./SidebarTabs.module.css";

interface SidebarTabsProps {
  currentTab: string;
  tabs?: [];
  handleChange: (tab: string) => void;
}

export const SidebarTabs: FC<SidebarTabsProps> = ({
  tabs,
  currentTab,
  handleChange,
}) => {
  const testTabs = [
    {
      text: "Dates",
      iconType: "DATE",
    },
    {
      text: "Categories",
      iconType: "CATEGORIES",
    },
    {
      text: "Style",
      iconType: "STYLE",
    },
    {
      text: "Years",
      iconType: "YEAR",
    },
    {
      text: "Location",
      iconType: "LOCATION",
    },
    {
      text: "Architects",
      iconType: "ARCHITECTS",
    },
  ];
  return (
    <>
      {testTabs.map((_, index) => {
        const currentIndex = index === 1 ? index + 1 : index + 2;
        const tab = testTabs[index === 0 ? index : currentIndex];
        const nextTab = testTabs[index === 0 ? index + 1 : currentIndex + 1];

        return !nextTab || !tab ? null : (
          <div key={index} className={styles["SidebarTabs"]}>
            <CustomButton
              text={tab.text}
              iconType={tab.iconType}
              onClick={() => handleChange(tab.iconType)}
              isActive={tab.iconType === currentTab}
            />
            <CustomButton
              text={nextTab.text}
              iconType={nextTab.iconType}
              onClick={() => handleChange(nextTab.iconType)}
              isActive={nextTab.iconType === currentTab}
            />
          </div>
        );
      })}
    </>
  );
};
