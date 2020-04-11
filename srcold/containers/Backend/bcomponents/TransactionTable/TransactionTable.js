import React from "react";

import classes from "./TransactionTable.module.css";
import Button from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

const transactionTable = (props) => {
  const transColumns = [
    {
      Header: <strong className={classes.CellStyle}>ID</strong>,
      accessor: "id",
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
      width: 80,
    },
    {
      Header: <strong className={classes.CellStyle}>VARIATION</strong>,
      accessor: "variation",
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
    },
    {
      Header: <strong className={classes.CellStyle}>QUANTITY</strong>,
      accessor: "qty",
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
      width: 110,
    },
    {
      Header: <strong className={classes.CellStyle}>IN/OUT</strong>,
      accessor: "inout",
      Cell: (row) => (
        <span className={classes.CellStyle}>
          {row.value === true ? "IN" : "OUT"}
        </span>
      ),
    },
    {
      Header: <strong className={classes.CellStyle}>DATE</strong>,
      accessor: "transdate",
      width: 250,
      Cell: (row) => (
        <span className={classes.CellStyle}>
          {row.value.slice(0, row.value.length - 25)}
        </span>
      ),
    },
    {
      Header: <strong className={classes.CellStyle}>NOTE</strong>,
      accessor: "note",
      width: 350,
      Cell: (row) => <span className={classes.CellStyle}>{row.value}</span>,
    },
    {
      Header: <strong className={classes.CellStyle}>ORDER ID</strong>,
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
        <Button
          id="updateButton"
          style={{ padding: "0px", margin: "0px" }}
          btnType="SuccessTiny"
        >
          UPDATE
        </Button>
      ),
      width: 90,
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
        <Button style={{ padding: "0px", margin: "0px" }} btnType="DangerTiny">
          DELETE
        </Button>
      ),
      width: 90,
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
              orderId: null,
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
                rowDetails.oderId = rowInfo.original.orderId;
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
                rowDetails.orderID = rowInfo.original.orderId;
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
