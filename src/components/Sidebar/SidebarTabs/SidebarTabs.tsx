import { FC } from "react";
import { useTranslation } from "next-i18next";

import { Tabs, TabList, Tab } from "@reach/tabs";

import { sidebarTabs } from "constant/sidebarTabs";
import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./SidebarTabs.module.css";
import "@reach/tabs/styles.css";

interface SidebarTabsProps {
  currentTab: string;
  handleChange: (tab: string) => void;
}

export const SidebarTabs: FC<SidebarTabsProps> = ({
  currentTab,
  handleChange,
}) => {
  const { t } = useTranslation();

  const tabs = sidebarTabs["architectures"];
  return (
    <>
      <Tabs className={styles["SidebarTabs"]}>
        <TabList className={styles["SidebarTabs-List"]}>
          {tabs.map(({ text, type }, index) => (
            <Tab
              key={index}
              className={styles["SidebarTabs-Tab"]}
              onClick={() => {
                console.log("s");

                handleChange(type);
              }}
            >
              {categoriesSvg[type]}
              <span>{text}</span>
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </>
  );
};
