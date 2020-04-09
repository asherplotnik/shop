import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import OrdersTable from "../OrdersTable/OrdersTable";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import UpdateOrderForm from "../UpdateOrderForm/UpdateOrderForm";
import IssueReceipt from "../IssueReceipt/IssueReceipt";
import classes from "./BOrders.module.css";
import Button from "../../../../components/UI/Button/Button";
const BOrders = () => {
  let [confirmed, setConfirmed] = useState(false);
  let [canceled, setCanceled] = useState(false);
  let [shipped, setShipped] = useState(null);
  let [orders, setOrders] = useState([]);
  let [orderDetails, setOrderDetails] = useState([]);
  let [loadingOrders, setLoadingOrders] = useState(true);
  let [showDelete, setShowDelete] = useState(false);
  let [pressedOrder, setPressedOrder] = useState({});
  let [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchOrderDetails();
  }, []);

  const toggleShipped = () => {
    setShipped(null);
  };
  const toggleConfirmed = () => {
    setConfirmed(false);
  };
  const toggleCanceled = () => {
    setCanceled(false);
  };

  const onUpdatePressed = (row) => {
    setShowUpdate(!showUpdate);
    setPressedOrder(row);
  };

  const sendShippedEmail = () => {
    console.log("arrived sendShippedEmail");
    const formData = new FormData();
    const emailBody =
      "THANK YOU FOR YOUR PURCHASE. YOUR TRACKING NUMBER IS: " +
      shipped +
      "\n FOR ORDER #" +
      pressedOrder.id;
    formData.append("email", pressedOrder.email);
    formData.append(
      "subject",
      "INDY COLLECTION SHIPPMENT TRACKING NUMBER FOR ORDER #" + shipped
    );
    formData.append("body", emailBody);
    axios
      .post("http://localhost:9000/email/sendEmail", formData, {
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
    toggleShipped();
  };

  const onCancelHandler = () => {
    const sqlQuery = { sql: pressedOrder.id };
    const formData = new FormData(document.querySelector("#orderupdate"));
    formData.append("id", pressedOrder.id);
    axios
      .post("http://localhost:9000/API/updateOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        document.querySelector("#orderupdate").reset();
        fetchOrders();
        axios
          .post("http://localhost:9000/API/cancelOrder", sqlQuery)
          .then((response) => {
            console.log(response);
            toggleCanceled();
          });
      });
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#orderupdate"));
    formData.append("id", pressedOrder.id);
    setShowUpdate(!showUpdate);
    let status = formData.get("status");
    if (status === "canceled") {
      setCanceled(true);
    } else {
      axios
        .post("http://localhost:9000/API/updateOrder", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          document.querySelector("#orderupdate").reset();
          fetchOrders();
          if (status === "confirmed payment") {
            setConfirmed(true);
          } else if (
            status === "shipped" &&
            formData.get("tracking").trim() !== ""
          ) {
            setShipped(formData.get("tracking"));
          }
        })
        .catch((error) => {
          alert(error);
          document.querySelector("#orderupdate").reset();
          fetchOrders();
        });
    }
  };

  const onDeletePressed = (rId) => {
    setShowDelete(!showDelete);
    setPressedOrder({ id: rId });
  };

  const onDeleteHandler = () => {
    requestQuery("delete from pending where id = " + pressedOrder.id, "delete");
    requestQuery(
      "delete from orderdetails where orderid = " + pressedOrder.id,
      "delete"
    );
  };

  const fetchOrders = () => {
    const sqlQuery = { sql: "SELECT * FROM pending" };
    setLoadingOrders(true);
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then((response) => {
        setLoadingOrders(false);
        setOrders(
          response.data.map((row) => {
            return {
              id: row.id,
              userId: row.userId,
              username: row.username,
              email: row.email,
              address: row.address,
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

  const requestQuery = (sql, act) => {
    setLoadingOrders(true);
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/" + act, sqlQuery)
      .then((response) => {
        if (act === "delete") {
          fetchOrders();
          setLoadingOrders(false);
          onDeletePressed();
        }
        if (act === "update") {
          fetchOrders();
          setLoadingOrders(false);
          toggleCanceled();
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingOrders(false);
        onDeletePressed();
      });
  };

  const fetchOrderDetails = () => {
    let sqlQuery = { sql: "SELECT * FROM orderdetails" };
    setLoadingOrders(true);
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
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
  let issuer = null;
  if (confirmed) {
    issuer = (
      <IssueReceipt order={pressedOrder} modalClosed={toggleConfirmed} />
    );
  }
  let viewOrders = <Spinner />;
  if (!loadingOrders) {
    viewOrders = (
      <React.Fragment>
        <Modal show={showDelete} modalClosed={onDeletePressed}>
          <ModalConfirm
            modalClosed={onDeletePressed}
            confirmed={onDeleteHandler}
          />
        </Modal>
        <Modal show={showUpdate} modalClosed={onUpdatePressed}>
          <UpdateOrderForm
            address={pressedOrder.address}
            wiredate={pressedOrder.wiredate}
            acc={pressedOrder.acc}
            status={pressedOrder.status}
            tracking={pressedOrder.tracking}
            modalClosed={onUpdatePressed}
            update={onUpdateHandler}
          />
        </Modal>
        <Modal show={shipped !== null} modalClosed={toggleShipped}>
          <div>
            <p>SEND TRACKING NUMBER: {shipped}</p>
          </div>
          <div className={classes.Buttons}>
            <Button clicked={sendShippedEmail} btnType="SuccessSmall">
              SEND
            </Button>
            <Button clicked={toggleShipped} btnType="DangerSmall">
              DON'T SEND
            </Button>
          </div>
        </Modal>
        <Modal
          show={confirmed}
          modalClosed={toggleConfirmed}
          left="calc(50% - 450px)"
          width="900px"
        >
          {issuer}
        </Modal>
        <Modal show={canceled} modalClosed={toggleCanceled}>
          <div>
            <div>
              <p>ARE YOU SURE? TRANSACTIONS OF THIS ORDER WILL BE DELETED!</p>
              <p>AFTER CANCEL YOU WON'T BE ABLE TO CHANGE STATUS AGAIN?</p>
            </div>
            <div className={classes.Cont}>
              <div>
                <Button btnType="Success" clicked={onCancelHandler}>
                  YES
                </Button>
              </div>
              <p style={{ color: "transparent" }}> {"-------"}</p>
              <div>
                <Button btnType="Danger" clicked={toggleCanceled}>
                  NO
                </Button>
              </div>
            </div>
          </div>
        </Modal>
        <OrdersTable
          orders={orders}
          orderDetails={orderDetails}
          pressedDelete={onDeletePressed}
          pressedUpdate={onUpdatePressed}
        />
      </React.Fragment>
    );
  }
  return viewOrders;
};

export default BOrders;
