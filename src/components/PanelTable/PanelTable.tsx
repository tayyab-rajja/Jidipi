import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";

import ActionFilters from "./ActionFilters/ActionFilters";
import Table from "./Table/Table";
import Pagination from "src/components/Pagination/Pagination";
import { ActionFilter, PostsPerPage } from "./Filters";

import { UpdateMyData } from "types/updateMyData";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";

const emptyImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAD0CAMAAAAL4oIDAAAAOVBMVEXAwMD///+7u7vJycnu7u7Pz8/7+/v19fXS0tK+vr7x8fG6urrd3d34+PjCwsLGxsbl5eXY2Njo6OhvnUvPAAABN0lEQVR4nO3Yy46CMABAUeRd3vj/HzuIksxMlMTNmHbO2SB00xvSBptlAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN8J+blPz+9NYShPddOnZ/ieUF7OxdczVK/VEfa0L5dQ6KPsya/NU+Ocx9nTvFg7Rcw99dAuCfXUcwh5m07PELa7fEymZ917umR6yv3L5t4xJtBzWUI/3Te6bqoT6Nm2hMdrWfMliZ7DHOY6oZ4lz8KSUM+8PS7qZHr2jTsrk+hpyqHYc7Iq/p5xKLIQjoEu9p7rFL4PrLeeSP//bD31Gn4OTF3MPdc5/B5Z61h7QlU9GZmqdopy/VT9cVzwuNzcfvR5lO9nbJpu03RluV2Oc7f7EUKM51XnIuvJ5uLcp+cHAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8cXFZgNlyZfDNsAAAAASUVORK5CYII=";

const PanelTable = () => {
  const [data, setData] = useState([
    {
      isSelect: true,
      image: emptyImage,
      name: "Aaaa Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "Bbbb Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "Dsdcsd Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "MdmLorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: true,
      image: emptyImage,
      name: "Aaaa Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "Bbbb Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "Dsdcsd Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
    {
      isSelect: false,
      image: emptyImage,
      name: "MdmLorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, expedita!",
      location: "Lorem ipsum dolor sit.",
      compay: "Lorem, ipsum.",
      label: "",
      note: "",
      edit: "complicated",
    },
  ]);

  const [filtersValues, setFiltersValues] = useState({
    action: "",
    location: "",
    language: "",
    all: "",
    searchValues: [],
  });

  const [page, setPage] = useState(1);

  const updateMyData: UpdateMyData = (value, rowIndex, columnId) => {
    if (!columnId) {
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
        <Table data={data} updateMyData={updateMyData} />
        <div className={styles["PanelTable-ButtomFilters"]}>
          <ActionFilter />
          <PostsPerPage />
        </div>
        <Pagination
          pageSize={1}
          totalCount={199}
          currentPage={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </TabPanels>
    </Tabs>
  );
};

export default PanelTable;
