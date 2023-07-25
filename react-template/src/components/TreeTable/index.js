import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { useTable } from 'react-table';

const classNames = require('classnames');

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
];

const data = [
  {
    id: 1,
    name: 'Category A',
    children: [
      {
        id: 11,
        name: 'Subcategory A1',
      },
      {
        id: 12,
        name: 'Subcategory A2',
      },
    ],
  },
];

const checkedNodes = []; // array to store checked node ids

const TableTreeCheckbox = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleNodeCheck = (checked) => {
    checkedNodes = checked;
  };

  return (
    <div>
      <table {...getTableProps()} className="react-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableTreeCheckbox;
