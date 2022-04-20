import { FC, useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import { CardsTab } from "./CardsTab/CardsTab";

import { InfoTab } from "./InfoTab/InfoTab";
import { PageFolder } from "types/pageFolderType";
import { infoPages } from "types/companyInfoPages";

import styles from "./CompanyBoard.module.css";
interface CompanyBoardProps {
  pages: {
    cardPages: PageFolder[];
    infoPages: infoPages[];
  };
}

export const CompanyBoard: FC<CompanyBoardProps> = ({ pages }) => {
  const { cardPages, infoPages } = pages;

  return (
    <Tabs className={styles["CompanyBoard"]}>
      <TabList className={styles["CompanyBoard-Tabs"]}>
        {cardPages.map(({ title, _id }) => (
          <Tab className={styles["CompanyBoard-Tab"]} key={_id}>
            {title}
          </Tab>
        ))}
        {infoPages.map(({ title }, index) => (
          <Tab className={styles["CompanyBoard-Tab"]} key={title + index}>
            {title}
          </Tab>
        ))}
      </TabList>
      <TabPanels className={styles["CompanyBoard-TabPanels"]}>
        {cardPages.map(({ title, _id }) => (
          <TabPanel key={_id}>
            <CardsTab pageFolderId={_id} folder={title} />
          </TabPanel>
        ))}
        {infoPages.map(({ content }) => (
          <TabPanel key={content._id}>
            <InfoTab key={content._id} content={content} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
