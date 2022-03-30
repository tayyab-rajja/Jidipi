import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  useTable,
  useBlockLayout,
  Column,
  Row,
  CellValue,
  ColumnGroup,
} from "react-table";
import { useSticky } from "react-table-sticky";

import clsx from "clsx";

import styles from "./Table.module.css";
import React from "react";

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(value, index, id);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (id === "edit") {
    return <button></button>;
  }

  if (id === "label" || id === "note") {
    return (
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles["Table-Input"]}
      />
    );
  }
  return value;
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
              {headerGroup.headers.map((column) => {
                const { key, ...restHeaderProps } = column.getHeaderProps();
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
