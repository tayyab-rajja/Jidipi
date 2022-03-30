import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  useTable,
  useBlockLayout,
  useSortBy,
  Column,
  Row,
  CellValue,
  ColumnGroup,
} from "react-table";
import { useSticky } from "react-table-sticky";

import clsx from "clsx";

import styles from "./Table.module.css";
import {
  CustomCheckbox,
  CustomCheckboxContainer,
  CustomCheckboxInput,
} from "@reach/checkbox";
import "@reach/checkbox/styles.css";

interface TableProps {
  columns: Column[];
  data: {}[];
  updateMyData: (value: string, rowIndex: number, columnId?: string) => void;
}

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}: {
  row: Row;
  value: CellValue;
  column: ColumnGroup;
  updateMyData: (value: string, rowIndex: number, columnId?: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onCheckboxCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  const onBlur = () => {
    updateMyData(value, index, id);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (id) {
    case "edit":
      return (
        <div className={styles["Table-Column_Edit"]}>
          <button></button>
          <button></button>
          <button></button>
        </div>
      );
    case "label":
    case "note":
      return (
        <input
          value={value}
          onChange={onInputChange}
          onBlur={onBlur}
          className={styles["Table-Input_Text"]}
        />
      );
    case "isSelect":
      return (
        <CustomCheckbox
          value={value}
          onChange={onCheckboxCahnge}
          className={styles["Table-Input_Select"]}
        />
      );

    default:
      return value;
  }
};

const Table: FC<TableProps> = ({ columns, data, updateMyData }) => {
  const defaultColumn = {
    Cell: EditableCell,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        //@ts-ignore
        updateMyData,
      },
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
