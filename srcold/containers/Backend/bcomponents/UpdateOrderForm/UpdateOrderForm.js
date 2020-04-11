import React from "react";

import classes from "./UpdateOrderForm.module.css";

const updateOrderForm = (props) => {
  return (
    <div className={classes.UpdateOrderForm}>
      <form id="orderupdate" onSubmit={props.update}>
        <div className={classes.Font}>UPDATE ORDER DETAILS</div>
        <ul className={classes.FormList}>
          <li key="address">
            <label htmlFor="address">ADDRESS DETAILS: </label>
            <textarea
              style={{ resize: "none" }}
              rows="4"
              cols="30"
              name="address"
              defaultValue={props.address}
              required
            />
          </li>
          <li key="wiredate">
            <label htmlFor="wiredate">PAYMENT DATE: </label>
            <input
              type="datetime-local"
              name="wiredate"
              defaultValue={props.wiredate}
              required
            />
          </li>
          <li key="acc">
            <label htmlFor="acc">ACC: </label>
            <input type="text" name="acc" defaultValue={props.acc} required />
          </li>
          <li key="status">
            <label htmlFor="status">STATUS: </label>
            <select name="status">
              <option
                key="1"
                selected={
                  // props.status === "wait approve cc payment" ? true : false
                  true
                }
              >
                wait approve cc payment
              </option>
              <option
                key="2"
                selected={
                  props.status === "wait approve bank transfer" ? true : false
                }
              >
                wait approve bank transfer
              </option>
              <option
                key="3"
                selected={props.status === "confirmed payment" ? true : false}
              >
                confirmed payment
              </option>
              <option
                key="4"
                // selected={props.status === "special issue" ? true : false}
                selected={false}
              >
                special issue
              </option>
              <option
                key="5"
                selected={props.status === "shipped" ? true : false}
              >
                shipped
              </option>
              <option
                key="6"
                selected={props.status === "canceled" ? true : false}
              >
                canceled
              </option>
            </select>
          </li>
          <li key="tracking">
            <label htmlFor="tracking">TRACKING No: </label>
            <input
              type="tracking"
              name="tracking"
              defaultValue={props.tracking}
            />
          </li>
          <li key="submit">
            <input type="submit" value="SUBMIT" />
            <button type="button" onClick={props.modalClosed}>
              CANCEL
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default updateOrderForm;
