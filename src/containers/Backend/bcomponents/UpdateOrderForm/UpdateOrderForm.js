import React, { useEffect, useState } from "react";
import classes from "./UpdateOrderForm.module.css";

const UpdateOrderForm = (props) => {
  const [statusState, setStatusState] = useState(props.status);
  const handleStatus = (e) => {
    setStatusState(e.target.value);
  };
  useEffect(() => {
    if (props.status) {
      setStatusState(props.status);
    }
  }, [props.status]);
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
              name="shipping"
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
            <select name="status" value={statusState} onChange={handleStatus}>
              <option key="1">wait approve cc payment</option>
              <option key="2">wait approve bank transfer</option>
              <option key="3">confirmed payment</option>
              <option key="4">special issue</option>
              <option key="5">shipped</option>
              <option key="6">canceled</option>
            </select>
          </li>
          <li key="tracking">
            <label htmlFor="tracking">TRACKING No: </label>
            <input type="text" name="tracking" defaultValue={props.tracking} />
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

export default UpdateOrderForm;
