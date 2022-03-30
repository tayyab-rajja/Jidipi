import { useMemo, useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import ActionFilters from "./ActionFilters/ActionFilters";
import Table from "./Table/Table";

import { tableColumns } from "constant/tableColumns";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";

const emptyImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAD0CAMAAAAL4oIDAAAAOVBMVEXAwMD///+7u7vJycnu7u7Pz8/7+/v19fXS0tK+vr7x8fG6urrd3d34+PjCwsLGxsbl5eXY2Njo6OhvnUvPAAABN0lEQVR4nO3Yy46CMABAUeRd3vj/HzuIksxMlMTNmHbO2SB00xvSBptlAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN8J+blPz+9NYShPddOnZ/ieUF7OxdczVK/VEfa0L5dQ6KPsya/NU+Ocx9nTvFg7Rcw99dAuCfXUcwh5m07PELa7fEymZ917umR6yv3L5t4xJtBzWUI/3Te6bqoT6Nm2hMdrWfMliZ7DHOY6oZ4lz8KSUM+8PS7qZHr2jTsrk+hpyqHYc7Iq/p5xKLIQjoEu9p7rFL4PrLeeSP//bD31Gn4OTF3MPdc5/B5Z61h7QlU9GZmqdopy/VT9cVzwuNzcfvR5lO9nbJpu03RluV2Oc7f7EUKM51XnIuvJ5uLcp+cHAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8cXFZgNlyZfDNsAAAAASUVORK5CYII=";

const PanelTable = () => {
  const columns = useMemo(() => tableColumns, []);

  const [data, setData] = useState([
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "22",
      note: "22",
      edit: "complicated",
    },
  ]);

  console.log(data);

  const updateMyData = (value: string, rowIndex: number, columnId?: string) => {
    if (!rowIndex || !columnId) {
      return;
    }
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

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
        <Table columns={columns} data={data} updateMyData={updateMyData} />
      </TabPanels>
    </Tabs>
  );
};

export default PanelTable;
