import { useMemo } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import Image from "next/image";

import ActionFilters from "./ActionFilters/ActionFilters";
import Table from "./Table/Table";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";

const emptyImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAD0CAMAAAAL4oIDAAAAOVBMVEXAwMD///+7u7vJycnu7u7Pz8/7+/v19fXS0tK+vr7x8fG6urrd3d34+PjCwsLGxsbl5eXY2Njo6OhvnUvPAAABN0lEQVR4nO3Yy46CMABAUeRd3vj/HzuIksxMlMTNmHbO2SB00xvSBptlAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN8J+blPz+9NYShPddOnZ/ieUF7OxdczVK/VEfa0L5dQ6KPsya/NU+Ocx9nTvFg7Rcw99dAuCfXUcwh5m07PELa7fEymZ917umR6yv3L5t4xJtBzWUI/3Te6bqoT6Nm2hMdrWfMliZ7DHOY6oZ4lz8KSUM+8PS7qZHr2jTsrk+hpyqHYc7Iq/p5xKLIQjoEu9p7rFL4PrLeeSP//bD31Gn4OTF3MPdc5/B5Z61h7QlU9GZmqdopy/VT9cVzwuNzcfvR5lO9nbJpu03RluV2Oc7f7EUKM51XnIuvJ5uLcp+cHAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8cXFZgNlyZfDNsAAAAASUVORK5CYII=";

const PanelTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Select",
        sticky: "left",
        width: 60,
        accessor: "isSelect",
      },
      {
        Header: "Image",
        sticky: "left",
        width: 60,
        Cell: (tableProps: any) => (
          <Image
            src={tableProps.row.original.image}
            width={60}
            height={60}
            alt="Table Image"
          />
        ),
        accessor: "image",
      },
      {
        Header: "Name",
        sticky: "left",
        width: 280,
        accessor: "name",
      },
      {
        Header: "Location",
        accessor: "visits",
        width: 160,
      },
      {
        Header: "Company",
        accessor: "progress",
        width: 160,
      },
      {
        Header: "Note",
        accessor: "status",
        width: 280,
      },
      {
        Header: "Label",
        accessor: "status1",
        width: 160,
      },
      {
        Header: "Edit",
        accessor: "status2",
        width: 160,
      },
    ],
    []
  );

  const data = [
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      visits: 42,
      progress: 21,
      status: "complicated",
    },
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      visits: 2,
      progress: 96,
      status: "complicated",
    },
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      visits: 7,
      progress: 41,
      status: "relationship",
    },
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      visits: 5,
      progress: 32,
      status: "single",
    },
    {
      isSelect: "1",
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
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
