import { FC, ReactElement } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import clsx from "clsx";

import styles from "./TabsFormsUserData.module.css";
import "@reach/tabs/styles.css";

interface Props {
  tabsData: Array<{ name: string; panel: ReactElement }>;
}

const TabsFormsContainer: FC<Props> = ({ tabsData }) => {
  return (
    <Tabs className={styles["Body-Tabs"]}>
      <TabList className={styles["TabList"]}>
        {tabsData.map(({ name }, index) => (
          <Tab key={index} className={styles["Tabs-Tab"]}>
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels
        className={clsx(styles["TabPanels"], styles["Body-TabPanels"])}
      >
        {tabsData.map(({ panel }, index) => (
          <TabPanel className={styles["TabPanel"]} key={index}>
            {panel}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabsFormsContainer;
