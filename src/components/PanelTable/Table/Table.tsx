import { FC, useMemo } from "react";
import {
  useTable,
  useBlockLayout,
  useSortBy,
  TableOptions,
  UseSortByOptions,
} from "react-table";
import { useSticky } from "react-table-sticky";

import clsx from "clsx";

import { EditableCell } from "./EditableCell";

import { UpdateMyData } from "types/updateMyData";
import { TableData } from "types/tableDataTypes";
import { TableColumn } from "types/tableColumnTypes";

import styles from "./Table.module.css";
import "@reach/checkbox/styles.css";

interface TableProps {
  data: TableData[];
  tableColumns: TableColumn[];
  updateMyData: UpdateMyData;
}

interface CustomTableOptions {
  autoResetSortBy: boolean;
  updateMyData: UpdateMyData;
}

const Table: FC<TableProps> = ({ data, tableColumns, updateMyData }) => {
  const defaultColumn = {
    Cell: EditableCell,
  };
  const columns = useMemo(() => tableColumns, [tableColumns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        autoResetSortBy: false,
        updateMyData,
      } as TableOptions<UseSortByOptions<CustomTableOptions>>,
      useBlockLayout,
      useSortBy,
      useSticky
    );

  return (
    <div
      {...getTableProps()}
      className={clsx(styles["Table"], styles["Sticky"])}
    >
      <div className={styles["Table-Header"]}>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <div
              key={key}
              {...restHeaderGroupProps}
              className={styles["Table-Row"]}
            >
              {headerGroup.headers.map((column: any) => {
                const { key, ...restHeaderProps } = column.getHeaderProps(
                  column.getSortByToggleProps()
                );

                return (
                  <div
                    key={key}
                    {...restHeaderProps}
                    className={clsx(
                      styles["Table-Column"],
                      styles["Table-Column_Header"]
                    )}
                  >
                    <div className={styles["Table-Column_Wrapper"]}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div {...getTableBodyProps()} className={styles["Table-Body"]}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <div key={key} {...restRowProps} className={styles["Table-Row"]}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <div
                    key={key}
                    {...restCellProps}
                    className={styles["Table-Column"]}
                  >
                    <div className={styles["Table-Column_Wrapper"]}>
                      {cell.render("Cell")}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
