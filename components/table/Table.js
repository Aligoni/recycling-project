import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS, mockData } from "./columns";
import styles from "./Table.module.scss";

const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockData, []);

  const tabeInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tabeInstance;

  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                );
              })}
              <th>Action</th>
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps}>{cell.render("Cell")}</td>;
              })}
              <td>
                <a className={styles.btn}>suspend</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
