import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS, mockData } from "./columns";
import styles from "./Table.module.scss";

const Table = ({ admins, subscribers }) => {
  
  let dataInfo;
  if (admins) {
    dataInfo = admins.map((admin, i) => {
      return { "s/n": i+1, email: admin.email, name: `${admin.firstname} ${admin.lastname}` }
    })
  } else if (subscribers) {
    dataInfo = subscribers.map((sub, i) => {
      return { "s/n": i+1, email: sub.email, name: `${sub.firstname} ${sub.lastname}` }
    });
  }

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataInfo, []);

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
