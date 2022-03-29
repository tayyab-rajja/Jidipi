import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import ActionFilters from "./ActionFilters/ActionFilters";
import Table from "./Table/Table";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";

const PanelTable = () => {
  return (
    <Tabs className={styles["PanelTable"]}>
      <TabList className={styles["PanelTable-TabList"]}>
        <Tab className={styles["PanelTable-Tab"]}>One</Tab>
        <Tab className={styles["PanelTable-Tab"]}>One2</Tab>
        <Tab className={styles["PanelTable-Tab"]}>One3</Tab>
        <Tab className={styles["PanelTable-Tab"]}>One3</Tab>
        <Tab className={styles["PanelTable-Tab"]}>One3</Tab>
        <Tab className={styles["PanelTable-Tab"]}>One3</Tab>
      </TabList>
      <TabPanels className={styles["PanelTable-TabPanels"]}>
        <ActionFilters />
        <Table />
      </TabPanels>
    </Tabs>
  );
};

export default PanelTable;
