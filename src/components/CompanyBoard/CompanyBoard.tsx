import { FC, useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";

import { CardsTab } from "./CardsTab/CardsTab";

import styles from "./CompanyBoard.module.css";
import { InfoTab } from "./InfoTab/InfoTab";

interface CompanyBoardProps {
  tabs: {}[];
  content: {}[];
}

export const CompanyBoard: FC<CompanyBoardProps> = ({ tabs, content }) => {
  const [currentTab, setCurrentTab] = useState({});

  const handleTab = (index: number) => {
    setCurrentTab(tabs[index]);
  };

  useEffect(() => {
    if (tabs) {
      setCurrentTab(tabs[0]);
    }
  }, [tabs]);

  console.log(content);

  return (
    <Tabs onChange={handleTab} className={styles["CompanyBoard"]}>
      <TabList className={styles["CompanyBoard-Tabs"]}>
        {tabs.map((item) => (
          <Tab className={styles["CompanyBoard-Tab"]} key={item.title}>
            {item.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels className={styles["CompanyBoard-TabPanels"]}>
        {currentTab?.pageType ? (
          <CardsTab pageFolderId={currentTab._id} folder={currentTab.title} />
        ) : (
          <InfoTab
            content={content.find((item) => item.id === currentTab?.title)}
          />
        )}
      </TabPanels>
    </Tabs>
  );
};
