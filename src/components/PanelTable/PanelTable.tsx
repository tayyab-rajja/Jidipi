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
  tableData: TableData[];
  params: any;
  deleteFavorite: (postId: string) => void;
  setParams: ({}) => void;
}

const PanelTable: FC<PanelTableProps> = ({
  tabs,
  tableColumns,
  tableData,
  params,
  deleteFavorite,
  setParams,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<TableData[] | []>([]);
  const [filtersValues, setFiltersValues] = useState({
    location: "",
    filter: "",
    all: true,
    postsPerPage: 20,
  });
  const [searchValue, setSearchValue] = useState<SearchInputValue>([]);
  const [currentTab, setCurrentTab] = useState(tabs[0]._id);

  const handleFilterChange = (
    type: FilterTypes,
    value: string | boolean | number
  ) => {
    setFiltersValues({ ...filtersValues, [type]: value });

    if (type === "postsPerPage") {
      setParams({
        pageSize: value,
      });
    }
  };

  const handleSearchChange = (value: SearchInputValue) => {
    setSearchValue(value);
    setParams({
      searchKey: value.map(({ value }) => value).join(" "),
    });
  };

  const handleAction = async (type: string, postId?: string) => {
    const selectedData = data.filter(({ isSelect }) => isSelect);

    if (!selectedData.length) {
      return;
    }

    switch (type) {
      case "move":
        if (postId) {
          break;
        }
        console.log(selectedData);
        break;

      case "copy":
        if (postId) {
          break;
        }
        console.log(selectedData);
        break;
      case "delete":
        if (postId) {
          deleteFavorite(postId);
        }
        selectedData.forEach(({ id }) => deleteFavorite(id));
        break;
    }
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
  };

  useEffect(() => {
    if (tableData) {
      setData(tableData);
    }
  }, [tableData]);

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
          <PostsPerPage handleFilterChange={handleFilterChange} />
        </div>
        <div className={styles["PanelTable-Pagination"]}>
          <Pagination
            siblingCount={3}
            pageSize={params.pageSize}
            totalCount={tableData.length ? tableData.length : 1}
            currentPage={params.pageNumber + 1}
            onChange={(page) => {
              setParams({
                pageNumber: page - 1,
              });
            }}
          />
        </div>
      </TabPanels>
    </Tabs>
  );
};

export default PanelTable;
