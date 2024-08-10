import React, { useMemo, useState } from "react";
import {
  FinanceRecord,
  useFinanceContext,
} from "../../context/finance-record-context";
import { CellProps, Column, useTable } from "react-table";

interface EditableCellProps extends CellProps<FinanceRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  updateRecord,
  editable,
  value: initialValue,
  row,
  column,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const onBlur = () => {
    setEditing(false);
  };
  return (
    <div onClick={() => setEditing(editable && true)}>
      {editing ? (
        <input
          onBlur={onBlur}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        value
      )}
    </div>
  );
};

const FinanceRecordList = () => {
  const { records: data } = useFinanceContext();

  const columns: Array<Column<FinanceRecord>> = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props: any) => <EditableCell editable={true} {...props} />,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: (props: any) => <EditableCell editable={true} {...props} />,
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props: any) => <EditableCell editable={true} {...props} />,
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props: any) => <EditableCell editable={true} {...props} />,
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props: any) => <EditableCell editable={false} {...props} />,
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => <button>Delete</button>,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div style={{ marginTop: "50px" }}>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceRecordList;
