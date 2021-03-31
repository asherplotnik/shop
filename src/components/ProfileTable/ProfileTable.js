import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import classes from "./ProfileTable.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import { serverAddress, dic } from "../../assets/helper";

const ProfileTable = (props) => {
  let [loadingOrders, setLoadingOrders] = useState(true);
  let [orders, setOrders] = useState([]);
  let [orderDetails, setOrderDetails] = useState([]);

  const checkStatus = (val) => {
    switch (val) {
      case "WAIT APPROVE BANK TRANSFER":
        return dic.checkingPayment[props.lang];
      case "WAIT APPROVE CC PAYMENT":
        return dic.checkingPayment[props.lang];
      case "CONFIRMED PAYMENT":
        return dic.paymentConfirmed[props.lang];
      case "SHIPPED":
        return dic.shipped[props.lang];
      case "CANCELED":
        return dic.canceled[props.lang];
      case "SPECIAL ISSUE":
        return dic.specialIssue[props.lang];
      default:
        return val;
    }
  };

  useEffect(() => {
    const fetchOrders = () => {
      setLoadingOrders(true);
      axios
        .get(serverAddress + "user/getOrders/" + props.userId, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((response) => {
          setLoadingOrders(false);
          setOrders(
            response.data.map((row) => {
              return {
                id: row.id,
                wiredate: row.wiredate,
                acc: row.acc,
                status: row.status,
                tracking: row.tracking,
              };
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const fetchOrderDetails = () => {
      let sqlQuery = { sql: "SELECT * FROM orderdetails" };
      setLoadingOrders(true);
      axios
        .post(serverAddress + "API/query", sqlQuery)
        .then((response) => {
          setLoadingOrders(false);
          setOrderDetails(
            response.data.map((row) => {
              return {
                id: row.id,
                userId: row.userId,
                orderid: row.orderid,
                code: row.code,
                variation: row.variation,
                quantity: row.quantity,
                price: row.price,
              };
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchOrders();
    fetchOrderDetails();
  }, [props.userId]);

  const makeSubComp = (row) => {
    const subTable = [];
    let subTotal = 0;
    for (let i = 0; i < orderDetails.length; i++) {
      if (orderDetails[i].orderid === row.original.id) {
        let currentRow = {};
        currentRow = {
          code: orderDetails[i].code,
          variation: orderDetails[i].variation,
          quantity: orderDetails[i].quantity,
          price: orderDetails[i].price,
          total: orderDetails[i].quantity * orderDetails[i].price,
        };
        subTable.push(currentRow);
        subTotal = subTotal + currentRow.total;
      }
    }
    subTable.push({
      id: null,
      orderid: null,
      code: null,
      variation: null,
      quantity: null,
      price: null,
      total: dic.subTotal[props.lang] + subTotal,
    });
    return subTable;
  };

  const orderDetailsColumns = [
    {
      Header: (
        <strong className={classes.OrderDetails}>{dic.code[props.lang]}</strong>
      ),
      accessor: "code",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: (
        <strong className={classes.OrderDetails}>
          {dic.variation[props.lang]}
        </strong>
      ),
      accessor: "variation",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: (
        <strong className={classes.OrderDetails}>
          {dic.quantity[props.lang]}
        </strong>
      ),
      accessor: "quantity",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: (
        <strong className={classes.OrderDetails}>
          {dic.price[props.lang]}
        </strong>
      ),
      accessor: "price",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: (
        <strong className={classes.OrderDetails}>
          {dic.total[props.lang]}
        </strong>
      ),
      accessor: "total",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
  ];

  const columns = [
    {
      Header: (
        <div key="orderid" className={classes.HeaderStyle}>
          {dic.orderId[props.lang]}
        </div>
      ),
      width: 90,
      accessor: "id",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="wiredate" className={classes.HeaderStyle}>
          {dic.paymentDate[props.lang]}
        </div>
      ),
      accessor: "wiredate",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="acc" className={classes.HeaderStyle}>
          {dic.note[props.lang]}
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
        <div key="status" className={classes.HeaderStyle}>
          {dic.status[props.lang]}
        </div>
      ),
      accessor: "status",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {checkStatus(row.value.toUpperCase())}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="tracking" className={classes.HeaderStyle}>
          {dic.trackingNo[props.lang]}
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
  ];
  let viewTable = <Spinner />;
  if (!loadingOrders) {
    viewTable = (
      <ReactTable
        data={orders}
        style={{ borderRadius: "5px" }}
        columns={columns}
        defaultPageSize={50}
        minRows={1}
        showPagination={false}
        SubComponent={(row) => {
          return (
            <ReactTable
              style={{ border: "1px solid black", borderRadius: "5px" }}
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
  }
  return viewTable;
};

export default ProfileTable;
