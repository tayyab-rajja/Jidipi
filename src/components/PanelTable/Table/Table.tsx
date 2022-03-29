import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";

import styles from "./Table.module.css";

const Table = ({ columns, data }) => {
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
      className="table sticky"
      style={{ maxWidth: 1000, height: 400 }}
    >
      <div className="header">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className="body">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className="tr">
              {row.cells.map((cell) => {
                return (
                  <div {...cell.getCellProps()} className="td">
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
