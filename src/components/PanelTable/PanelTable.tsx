import { useMemo } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import ActionFilters from "./ActionFilters/ActionFilters";
import Table from "./Table/Table";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";

const PanelTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        sticky: "left",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        sticky: "left",
        accessor: "lastName",
      },
      {
        Header: "Age",
        sticky: "left",

        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Progress",
        accessor: "progress",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const data = [
    {
      firstName: "patch11111111111111111",
      lastName: "psychology",
      age: 28,
      visits: 42,
      progress: 21,
      status: "complicated",
    },
    {
      firstName: "cord",
      lastName: "extent",
      age: 10,
      visits: 2,
      progress: 96,
      status: "complicated",
    },
    {
      firstName: "instrument",
      lastName: "affair",
      age: 15,
      visits: 7,
      progress: 41,
      status: "relationship",
    },
    {
      firstName: "border",
      lastName: "comb",
      age: 20,
      visits: 5,
      progress: 32,
      status: "single",
    },
    {
      firstName: "holiday",
      lastName: "decision",
      age: 3,
      visits: 67,
      progress: 42,
      status: "complicated",
    },
  ];

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
        <Table columns={columns} data={data} />
      </TabPanels>
    </Tabs>
  );
};

export default PanelTable;
