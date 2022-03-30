import { FC } from "react";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";

import clsx from "clsx";

import styles from "./Table.module.css";
import React from "react";

interface TableProps {
  columns: [];
  data: [];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
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
        {headerGroups.map((headerGroup, index) => (
          <div
            key={index}
            {...headerGroup.getHeaderGroupProps()}
            className={styles["Table-Row"]}
          >
            {headerGroup.headers.map((column, index) => (
              <div
                key={index}
                {...column.getHeaderProps()}
                className={clsx(
                  styles["Table-Column"],
                  styles["Table-Column_Header"]
                )}
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className={styles["Table-Body"]}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <div
              key={index}
              {...row.getRowProps()}
              className={styles["Table-Row"]}
            >
              {row.cells.map((cell, index) => {
                return (
                  <div
                    key={index}
                    {...cell.getCellProps()}
                    className={styles["Table-Column"]}
                  >
                    {cell.render("Cell")}
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
