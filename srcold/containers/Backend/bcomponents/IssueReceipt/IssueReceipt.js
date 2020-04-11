import React, { useState, useEffect } from "react";
import Button from "../../../../components/UI/Button/Button";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import classes from "./IssueReceipt.module.css";
import ReactTable from "react-table-6";
import Logo from "../../../../components/UI/Logo/Logo";
import { serverAddress } from "../../../../assets/helper";

const IssueReceipt = (props) => {
  const [orderdetails, setOrderDetails] = useState([]);

  const sendReceipt = () => {
    const emailBody =
      "THANK YOU FOR YOUR PURCHASE. PLEASE SEE ATTACHED RECEIPT";
    html2canvas(document.querySelector("#receipt")).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF();

      pdf.addImage(imgData, "JPEG", 35, 5, 140, 60 + orderdetails.length * 8);

      const blobFile = pdf.output("blob");
      const formData = new FormData();
      formData.append("email", props.order.email);
      formData.append("subject", "RECEIPT FOR ORDER #" + props.order.id);
      formData.append("body", emailBody);
      formData.append("attachment", blobFile, "attachment.pdf");
      axios
        .post(serverAddress + "email/sendEmail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    props.modalClosed();
  };
  const orderDetailsColumns = [
    {
      Header: <strong className={classes.OrderDetails}>CODE</strong>,
      accessor: "code",
      shadow: "none",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <strong className={classes.OrderDetails}>VARIATION</strong>,
      accessor: "variation",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <strong className={classes.OrderDetails}>QUANTITY</strong>,
      accessor: "quantity",
      width: 100,
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <strong className={classes.OrderDetails}>PRICE</strong>,
      accessor: "price",
      width: 100,

      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
    {
      Header: <strong className={classes.OrderDetails}>TOTAL</strong>,
      accessor: "total",
      Cell: (row) => <span className={classes.OrderDetails}>{row.value}</span>,
    },
  ];
  useEffect(() => {
    const fetchOrderDetails = (orderId) => {
      const sqlQuery = {
        sql: "SELECT * FROM orderdetails WHERE orderid='" + orderId + "'",
      };
      axios
        .post(serverAddress + "API/query", sqlQuery)
        .then((response) => {
          let subTotal = 0;
          let tempArr = response.data.map((row) => {
            subTotal = subTotal + row.quantity * row.price;
            return {
              id: row.id,
              code: row.code,
              variation: row.variation,
              quantity: row.quantity,
              price: row.price,
              total: row.quantity * row.price,
            };
          });
          tempArr.push({
            id: null,
            code: null,
            variation: null,
            quantity: null,
            price: null,
            total: "Sub Total: " + subTotal + " THB",
          });
          setOrderDetails(tempArr);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchOrderDetails(props.order.id);
  }, [props.order.id]);

  let viewPage = <Spinner />;

  if (orderdetails !== []) {
    viewPage = (
      <div className={classes.Wrapper}>
        <div id="receipt">
          <div className={classes.Logo}>
            <Logo />
          </div>
          <h1>INDY COLLECTION - RECEIPT</h1>
          <ul className={classes.List}>
            <li key="name">NAME: {props.order.username}</li>
            <li key="email">EMAIL: {props.order.email}</li>
            <li key="address">ADDRESS: {props.order.address}</li>
            <li key="payment">PAYMENT DATE: {props.order.id}</li>
            <br></br>
            <li key="details">ORDER DETAILS: </li>
          </ul>
          <ReactTable
            getTheadProps={() => {
              return {
                style: {
                  background: "navy",
                  color: "white",
                },
              };
            }}
            style={{
              width: "850px",
            }}
            data={orderdetails}
            columns={orderDetailsColumns}
            defaultPageSize={50}
            minRows={1}
            showPagination={false}
          />
          <p className={classes.OrderDetails}>thank you.</p>
        </div>
        <div>
          <Button btnType="SuccessSmall" clicked={sendReceipt}>
            SEND RECEIPT TO CUSTOMER
          </Button>
          <Button btnType="DangerSmall" clicked={props.modalClosed}>
            DON'T SEND RECEIPT
          </Button>
        </div>
      </div>
    );
  }
  return viewPage;
};

export default IssueReceipt;
