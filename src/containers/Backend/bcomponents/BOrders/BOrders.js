//import classes from "./BOrders.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import OrdersTable from "../OrdersTable/OrdersTable";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import UpdateOrderForm from "../UpdateOrderForm/UpdateOrderForm";

const BOrders = () => {
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

  const onUpdatePressed = row => {
    setShowUpdate(!showUpdate);
    setPressedOrder(row);
  };

  const onUpdateHandler = e => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#orderupdate"));
    formData.append("id", pressedOrder.id);
    setShowUpdate(!showUpdate);
    axios
      .post("http://localhost:9000/API/updateOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        document.querySelector("#orderupdate").reset();
        fetchOrders();
      })
      .catch(error => {
        alert(error);
        document.querySelector("#orderupdate").reset();
        fetchOrders();
      });
  };

  const onDeletePressed = rId => {
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
      .then(response => {
        setLoadingOrders(false);
        setOrders(
          response.data.map(row => {
            return {
              id: row.id,
              userId: row.userId,
              username: row.username,
              email: row.email,
              address: row.address,
              wiredate: row.wiredate,
              acc: row.acc,
              status: row.status,
              tracking: row.tracking
            };
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  const requestQuery = (sql, act) => {
    setLoadingOrders(true);
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/" + act, sqlQuery)
      .then(response => {
        if (act === "delete") {
          fetchOrders();
          setLoadingOrders(false);
          onDeletePressed();
        }
      })
      .catch(error => {
        console.log(error);
        setLoadingOrders(false);
        onDeletePressed();
      });
  };

  const fetchOrderDetails = () => {
    const sqlQuery = { sql: "SELECT * FROM orderdetails" };
    setLoadingOrders(true);
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        setLoadingOrders(false);
        setOrderDetails(
          response.data.map(row => {
            return {
              id: row.id,
              userId: row.userId,
              orderid: row.orderid,
              code: row.code,
              variation: row.variation,
              quantity: row.quantity,
              price: row.price
            };
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  let viewOrders = <Spinner />;
  if (!loadingOrders) {
    viewOrders = (
      <React.Fragment>
        <Modal show={showDelete} modalClosed={onDeletePressed}>
          <ModalConfirm
            modalClosed={onDeletePressed}
            deleteConfirmed={onDeleteHandler}
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
