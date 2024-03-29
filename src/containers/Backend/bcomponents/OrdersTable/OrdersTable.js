import React from "react";
import classes from "./OrdersTable.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

const OrdersTable = (props) => {
  const orderDetailsColumns = [
    {
      Header: <span className={classes.OrderDetails}>ID</span>,
      accessor: "id",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <span className={classes.OrderDetails}>ORDER ID</span>,
      accessor: "orderid",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <span className={classes.OrderDetails}>CODE</span>,
      accessor: "code",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <span className={classes.OrderDetails}>VARIATION</span>,
      accessor: "variation",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <span className={classes.OrderDetails}>QUANTITY</span>,
      accessor: "quantity",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <span className={classes.OrderDetails}>PRICE</span>,
      accessor: "price",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <span className={classes.OrderDetails}>TOTAL</span>,
      accessor: "total",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
  ];

  const columns = [
    {
      Header: (
        <div key="ID" className={classes.HeaderStyle}>
          ID
        </div>
      ),
      accessor: "id",
      width: 40,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="USERID" className={classes.HeaderStyle}>
          USER ID
        </div>
      ),
      accessor: "userid",
      width: 240,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}
        </div>
      ),
    },
    {
      Header: (
        <div key="USERNAME" className={classes.HeaderStyle}>
          USER NAME
        </div>
      ),
      accessor: "username",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].toUpperCase()).startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="EMAIL" className={classes.HeaderStyle}>
          EMAIL
        </div>
      ),
      accessor: "email",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].toUpperCase()).startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="ADDRESS" className={classes.HeaderStyle}>
          ADDRESS
        </div>
      ),
      accessor: "address",
      filterable: false,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value === null ? "" : row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="WIREDATE" className={classes.HeaderStyle}>
          PAYMENT DATE
        </div>
      ),
      accessor: "wiredate",
      filterable: false,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="ACC" className={classes.HeaderStyle}>
          ACC
        </div>
      ),
      accessor: "acc",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}
        </div>
      ),
    },
    {
      Header: (
        <div key="STATUS" className={classes.HeaderStyle}>
          STATUS
        </div>
      ),
      accessor: "status",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].toUpperCase()).startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}
        </div>
      ),
    },
    {
      Header: (
        <div key="TRACKING" className={classes.HeaderStyle}>
          TRACKING No
        </div>
      ),
      accessor: "tracking",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}
        </div>
      ),
    },
    {
      Header: (
        <div key="UPDATE" className={classes.HeaderStyle}>
          UPDATE
        </div>
      ),
      accessor: "status",
      Cell: (row) => (
        <div>
          { row.value === "canceled" ?
          <MyButton id="updateButton" btnType="cancel">
           DISABLED
          </MyButton> :
          <MyButton id="updateButton" btnType="update">
           UPDATE
         </MyButton>}
        </div>
      ),
      filterable: false,
    },
    {
      Header: (
        <div key="DELETE" className={classes.HeaderStyle}>
          DELETE
        </div>
      ),
      accessor: "del",
      Cell: () => (
        <div>
          <MyButton btnType="delete">DELETE</MyButton>
        </div>
      ),
      filterable: false,
    },
  ];

  const makeSubComp = (row) => {
    const subTable = [];
    let subTotal = 0;
    for (let i = 0; i < props.orderDetails.length; i++) {
      if (props.orderDetails[i].orderid === row.original.id) {
        let currentRow = {};
        currentRow = {
          id: props.orderDetails[i].id,
          orderid: props.orderDetails[i].orderid,
          code: props.orderDetails[i].code,
          variation: props.orderDetails[i].variation,
          quantity: props.orderDetails[i].quantity,
          price: props.orderDetails[i].price,
          total: props.orderDetails[i].quantity * props.orderDetails[i].price,
        };
        subTable.push(currentRow);
        subTotal = subTotal + currentRow.total;
        break;
      }
    }
    subTable.push({
      id: null,
      orderid: null,
      code: null,
      variation: null,
      quantity: null,
      price: null,
      total: "Sub Total: " + subTotal,
    });
    return subTable;
  };
  return (
    <ReactTable
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            const row = {
              id: null,
              userId: null,
              username: null,
              email: null,
              address: null,
              wiredate: null,
              acc: null,
              status: null,
              tracking: null,
            };
            if (rowInfo !== undefined) {
              if (e.target.innerHTML === "DELETE") {
                props.pressedDelete(rowInfo.original.id);
              }
              if (e.target.innerHTML === "UPDATE") {
                row.id = rowInfo.original.id;
                row.userId = rowInfo.original.userid;
                row.username = rowInfo.original.username;
                row.email = rowInfo.original.email;
                row.address = rowInfo.original.address;
                row.wiredate = rowInfo.original.wiredate;
                row.acc = rowInfo.original.acc;
                row.status = rowInfo.original.status;
                row.tracking = rowInfo.original.tracking;
                props.pressedUpdate(row);
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
          style: {
            background:
              rowInfo !== undefined
                ? rowInfo.original.status === "canceled"
                  ? "#ccc"
                  : "transparent"
                : "transparent",
          },
        };
      }}
      className="-highlight "
      data={props.orders}
      columns={columns}
      defaultPageSize={19}
      filterable
      SubComponent={(row) => {
        return (
          <ReactTable
            style={{ border: "1px solid black" }}
            columns={orderDetailsColumns}
            data={makeSubComp(row)}
            defaultPageSize={50}
            minRows={1}
            showPagination={false}
          />
        );
      }}
    />
  );
};

export default OrdersTable;
