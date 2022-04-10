import { FC, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Tabs, TabList, Tab, TabPanels } from "@reach/tabs";

import Pagination from "src/components/Pagination/Pagination";
import { SearchInput } from "src/components/Input/SearchInput";
import ActionFilters from "./ActionFilters/ActionFilters";
import { ActionFilter, PostsPerPage } from "./Filters";
import Table from "./Table/Table";

import { UpdateMyData } from "types/updateMyData";
import { PageFolder } from "types/pageFolderType";
import { TableData } from "types/tableDataTypes";
import { TableColumn } from "types/tableColumnTypes";

import { tableColumns } from "constant/tableColumns";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";
import { SearchInputValue } from "types/searcInputTypes";
interface PanelTableProps {
  tabs: PageFolder[];
  tableColumns: TableColumn[];
  tableFilters: string[];
  tableData: TableData[];
}

const PanelTable: FC<PanelTableProps> = ({ tabs, tableColumns, tableData }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<TableData[] | []>([]);
  const [page, setPage] = useState(1);
  const [filtersValues, setFiltersValues] = useState({
    location: "",
    language: "",
    all: "",
  });
  const [searchValue, setSearchValue] = useState<SearchInputValue>([]);
  const [currentTab, setCurrentTab] = useState(tabs[0]._id);
  const filteredDataWithTab = tableData.filter(
    ({ pageFolderId }) => pageFolderId === currentTab
  );

  const handleSearchChange = (values: SearchInputValue) => {
    if (!values || !values.length) {
      setData(filteredDataWithTab);
      return;
    }

    setData(
      filteredDataWithTab.filter((data) => {
        let isHasValue = false;

        for (const key in data) {
          isHasValue = values.some(({ value }) =>
            //@ts-ignore
            String(data[key])
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          );
          if (isHasValue) {
            return true;
          }
        }

        return isHasValue;
      })
    );
  };

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

  const handleTabsChange = (index: number) => {
    if (index === tabs.length) {
      return;
    }
    setCurrentTab(tabs[index]._id);
    setData(
      tableData.filter(({ pageFolderId }) => pageFolderId === tabs[index]._id)
    );
  };

  return (
    <Tabs className={styles["PanelTable"]} onChange={handleTabsChange}>
      <TabList className={styles["PanelTable-TabList"]}>
        {tabs.map(({ title, _id }) => (
          <Tab key={_id} className={styles["PanelTable-Tab"]}>
            {t(title)}
          </Tab>
        ))}
        <Tab className={styles["PanelTable-Tab"]}>{t("mine")}</Tab>
      </TabList>
      <TabPanels className={styles["PanelTable-TabPanels"]}>
        <ActionFilters />
        <SearchInput
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
        />
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
