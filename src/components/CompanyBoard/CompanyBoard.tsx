import { FC, useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";

import styles from "./CompanyBoard.module.css";

interface CompanyBoardProps {
  tabs: {}[];
  content: {}[];
}

export const CompanyBoard: FC<CompanyBoardProps> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  useEffect(() => {
    if (tabs) {
      setCurrentTab(tabs[0]);
    }
  }, [tabs]);

  return (
    <Tabs className={styles["CompanyBoard"]}>
      <TabList className={styles["CompanyBoard-Tabs"]}>
        {tabs.map((item) => (
          <Tab className={styles["CompanyBoard-Tab"]} key={item.title}>
            {item.title}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};
