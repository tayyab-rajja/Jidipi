import { FC, useCallback, useEffect, useState } from "react";
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
import { FilterTypes } from "types/filterTypes";

import styles from "./PanelTable.module.css";
import "@reach/tabs/styles.css";
import { SearchInputValue } from "types/searcInputTypes";
interface PanelTableProps {
  tabs: PageFolder[];
  tableColumns: TableColumn[];
  tableFilters: string[];
  tableData: TableData[];
}

const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

const PanelTable: FC<PanelTableProps> = ({ tabs, tableColumns, tableData }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<TableData[] | []>([]);
  const [page, setPage] = useState(1);
  const [filtersValues, setFiltersValues] = useState({
    location: "",
    filter: "",
    all: true,
  });
  const [searchValue, setSearchValue] = useState<SearchInputValue>([]);
  const [currentTab, setCurrentTab] = useState(tabs[0]._id);

  const handleFilterChange = (type: FilterTypes, value: string | boolean) => {
    setFiltersValues({ ...filtersValues, [type]: value });
  };

  const handleSearchChange = (value: SearchInputValue) => {
    setSearchValue(value);
  };

  const handleAction = (type: string) => {
    const selectedData = data.filter(({ isSelect }) => isSelect);

    if (!selectedData.length) {
      return;
    }

    switch (type) {
      case "move":
        console.log(selectedData);
        break;

      case "copy":
        console.log(selectedData);

        break;
      case "delete":
        console.log(selectedData);

        break;
    }
  };

  const handleChange = useCallback(() => {
    const { all } = filtersValues;
    const filteredDataWithTab = tableData.filter(
      ({ pageFolderId }) => pageFolderId === currentTab
    );

    let data = filteredDataWithTab.filter(({ isTrashed }) =>
      all ? !isTrashed : isTrashed
    );

    if (!searchValue || !searchValue.length) {
      setData(data);
      return;
    }

    data = data.filter((data) => {
      let isHasValue = false;

      for (const key in data) {
        isHasValue = searchValue.some(({ value }) =>
          String(getKeyValue(data)(key as keyof TableData))
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
        if (isHasValue) {
          return true;
        }
      }

      return isHasValue;
    });

    setData(data);
  }, [filtersValues, searchValue, currentTab, tableData]);

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
  };

  useEffect(() => {
    handleChange();
  }, [tableData, searchValue, currentTab, filtersValues, handleChange]);

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
        <ActionFilters
          handleAction={handleAction}
          handleFilterChange={handleFilterChange}
        />
        <SearchInput value={searchValue} onChange={handleSearchChange} />
        <Table
          isDataTrashed={!filtersValues.all}
          tableColumns={tableColumns}
          data={data}
          updateMyData={updateMyData}
        />
        <div className={styles["PanelTable-ButtomFilters"]}>
          <ActionFilter handleAction={handleAction} />
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
