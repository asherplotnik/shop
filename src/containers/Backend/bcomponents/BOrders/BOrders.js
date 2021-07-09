import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import OrdersTable from "../OrdersTable/OrdersTable";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import UpdateOrderForm from "../UpdateOrderForm/UpdateOrderForm";
import IssueReceipt from "../IssueReceipt/IssueReceipt";
import classes from "./BOrders.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { serverAddress } from "../../../../assets/helper";
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

  const onDeletePressed = (rId) => {
    setShowDelete(!showDelete);
    setPressedOrder({ id: rId });
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
      "INDY FASHION SHIPPMENT TRACKING NUMBER FOR ORDER #" + pressedOrder.id
    );
    formData.append("body", emailBody);
    axios
      .post(serverAddress + "user/email/sendEmailShipped", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
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
      .post(serverAddress + "API/updateOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        document.querySelector("#orderupdate").reset();
        fetchOrders();
        axios
          .post(serverAddress + "API/cancelOrder", sqlQuery)
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
    const payload = {
      id: pressedOrder.id,
      wiredate: formData.get("wiredate"),
      acc: formData.get("acc"),
      shipping: formData.get("shipping"),
      status: formData.get("status"),
      tracking: formData.get("tracking"),
    };
    formData.delete("wiredate");
    setShowUpdate(!showUpdate);
    let status = formData.get("status");
    if (status === "canceled") {
      setCanceled(true);
    } else {
      axios
        .post(serverAddress + "admin/updateOrder", payload, {
          headers: {
            token: localStorage.getItem("token"),
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

  const onDeleteHandler = () => {
    setShowDelete(!showDelete);
    axios
      .delete(serverAddress + "admin/deleteOrder/" + pressedOrder.id, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        fetchOrders();
      })
      .catch((error) => {
        alert(error);
        fetchOrders();
      });
  };

  const fetchOrders = () => {
    setLoadingOrders(true);
    axios
      .get(serverAddress + "admin/getOrders", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setLoadingOrders(false);
        setOrders(
          response.data.map((row) => {
            return {
              id: row.id,
              userid: row.user.id,
              username: row.user.username,
              email: row.user.email,
              address: row.shipping,
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
    setLoadingOrders(true);
    axios
      .get(serverAddress + "admin/getOrderDetails", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setLoadingOrders(false);
        setOrderDetails(
          response.data.map((row) => {
            return {
              id: row.id,
              //userId: row.userId,
              orderid: row.purchase.id,
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
      <div className={classes.Trans}>
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
            <MyButton clicked={sendShippedEmail} btnType="email">
              SEND
            </MyButton>
            <MyButton clicked={toggleShipped} btnType="cancel">
              DON'T SEND
            </MyButton>
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
                <MyButton btnType="continue" clicked={onCancelHandler}>
                  YES
                </MyButton>
              </div>
              <p style={{ color: "transparent" }}> {"-------"}</p>
              <div>
                <MyButton btnType="cancel" clicked={toggleCanceled}>
                  NO
                </MyButton>
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
      </div>
    );
  }
  return viewOrders;
};

export default BOrders;
