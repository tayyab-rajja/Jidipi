import { FC, useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";

import ActionFilters from "./ActionFilters/ActionFilters";
import Table from "./Table/Table";
import Pagination from "src/components/Pagination/Pagination";
import { ActionFilter, PostsPerPage } from "./Filters";

import { UpdateMyData } from "types/updateMyData";
import { PageFolder } from "types/pageFolderType";
import { TableData } from "types/tableDataTypes";
import { TableColumn } from "types/tableColumnTypes";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";
import { tableColumns } from "constant/tableColumns";
interface PanelTableProps {
  tabs: PageFolder[];
  tableColumns: TableColumn[];
  tableFilters: string[];
  tableData: TableData[];
}

const PanelTable: FC<PanelTableProps> = ({ tabs, tableColumns, tableData }) => {
  const [data, setData] = useState<TableData[] | []>([]);
  const [filtersValues, setFiltersValues] = useState({
    action: "",
    location: "",
    language: "",
    all: "",
  });
  const [searchValues, setSearchValues] = useState([]);
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(tabs[0]._id);

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

  // const handleSearch = (value) => {
  //   setSearchValues(value);
  // };

  const handleTabsChange = (index: number) => {
    if (index === tabs.length) {
      return;
    }
    setCurrentTab(tabs[index]._id);
  };

  useEffect(() => {}, [searchValues]);

  useEffect(() => {
    setData(
      tableData.filter(({ pageFolderId }) => pageFolderId === currentTab)
    );
  }, [tableData, currentTab]);

  return (
    <Tabs className={styles["PanelTable"]} onChange={handleTabsChange}>
      <TabList className={styles["PanelTable-TabList"]}>
        {tabs.map(({ title, _id }) => (
          <Tab key={_id} className={styles["PanelTable-Tab"]}>
            {title}
          </Tab>
        ))}
        <Tab className={styles["PanelTable-Tab"]}>mine</Tab>
      </TabList>
      <TabPanels className={styles["PanelTable-TabPanels"]}>
        <ActionFilters />
        <Table
          tableColumns={tableColumns}
          data={data}
          updateMyData={updateMyData}
        />
        <div className={styles["PanelTable-ButtomFilters"]}>
          <ActionFilter />
          <PostsPerPage />
        </div>
        <div className={styles["PanelTable-Pagination"]}>
          <Pagination
            siblingCount={3}
            pageSize={10}
            totalCount={data.length ? data.length : 1}
            currentPage={page}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      </TabPanels>
    </Tabs>
  );
};

export default PanelTable;
