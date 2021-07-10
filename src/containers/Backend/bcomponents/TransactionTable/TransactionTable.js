import React from "react";
import classes from "./TransactionTable.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

const transactionTable = (props) => {
  const transColumns = [
    {
      Header: <div className={classes.CellStyle}>ID</div>,
      accessor: "id",
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
      width: 80,
    },
    {
      Header: <div className={classes.CellStyle}>VARIATION</div>,
      accessor: "variation",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].toUpperCase()).startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
    },
    {
      Header: <div className={classes.CellStyle}>QUANTITY</div>,
      accessor: "qty",
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
      width: 110,
    },
    {
      Header: <div className={classes.CellStyle}>IN/OUT(true/false)</div>,
      width:150,
      accessor: "inorout",
      Cell: (row) => (
          <span className={classes.CellStyle}>
            {row.value === true ? "IN" : "OUT"}
          </span>
      ),
    },
    {
      Header: <div className={classes.CellStyle}>DATE</div>,
      accessor: "transdate",
      width: 250,
      Cell: (row) => (
        <span className={classes.CellStyle}>
          {row.value} {/*.slice(0, row.value.length - 25)} */}
        </span>
      ),
    },
    {
      Header: <div className={classes.CellStyle}>NOTE</div>,
      accessor: "note",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].toUpperCase()).startsWith(filter.value.toUpperCase())
          : true;
      },
      width: 350,
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
    },
    {
      Header: <div className={classes.CellStyle}>ORDER ID</div>,
      accessor: "orderid",
      width: 80,
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
    },

    {
      Header: (
        <div>
          <div key="UPDATE" className={classes.CellStyle}>
            UPDATE
          </div>
        </div>
      ),
      accessor: "upt",
      Cell: () => (
        <MyButton
          id="updateButton"
          style={{ padding: "0px", margin: "0px" }}
          btnType="update"
        >
          UPDATE
        </MyButton>
      ),
      width: 140,
      filterable: false,
    },
    {
      Header: (
        <div key="DELETE" className={classes.CellStyle}>
          DELETE
        </div>
      ),
      accessor: "del",
      Cell: () => (
        <MyButton style={{ padding: "0px", margin: "0px" }} btnType="delete">
          DELETE
        </MyButton>
      ),
      width: 140,
      filterable: false,
    },
  ];
  return (
    <ReactTable
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            const rowDetails = {
              rowId: null,
              code: null,
              qty: null,
              variation: null,
              inout: null,
              transdate: null,
              note: null,
            };
            if (rowInfo !== undefined) {
              if (e.target.innerHTML === "DELETE") {
                rowDetails.rowId = rowInfo.original.id;
                rowDetails.code = rowInfo.original.code;
                rowDetails.qty = rowInfo.original.qty;
                rowDetails.variation = rowInfo.original.variation;
                rowDetails.inout = rowInfo.original.inout;
                rowDetails.transdate = rowInfo.original.transdate;
                rowDetails.note = rowInfo.original.note;
                props.pressedDelete(rowDetails);
              }
              if (e.target.innerHTML === "UPDATE") {
                rowDetails.rowId = rowInfo.original.id;
                rowDetails.code = rowInfo.original.code;
                rowDetails.qty = rowInfo.original.qty;
                rowDetails.variation = rowInfo.original.variation;
                rowDetails.inout = rowInfo.original.inout;
                rowDetails.transdate = rowInfo.original.transdate;
                rowDetails.note = rowInfo.original.note;
                props.pressedUpdate(rowDetails);
              }
              // console.log("A Td Element was clicked!");
              // console.log("it produced this event:", e.target.innerHTML);
              // console.log("It was in this column:", column.Header);
              // console.log("It was in this row:", rowInfo);
              // console.log("It was in this table instance:", instance);
              if (handleOriginal) {
                handleOriginal();
              }
            }
          },
        };
      }}
      className="-highlight"
      style={{ borderRadius: "5px" }}
      columns={transColumns}
      data={props.transactions}
      defaultPageSize={50}
      minRows={1}
      filterable
      showPagination={false}
    />
  );
};

export default transactionTable;
