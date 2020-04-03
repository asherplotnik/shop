import React from "react";
import classes from "./UpdateUserForm.module.css";

const updateUserForm = props => {
  return (
    <div className={classes.UpdateUserForm}>
      <form id="userupdate" onSubmit={props.update}>
        <div className={classes.Font}>UPDATE USER DETAILS</div>
        <ul className={classes.FormList}>
          <li key="username">
            <label htmlFor="username">USER NAME: </label>
            <input type="text" name="username" defaultValue={props.username} />
          </li>
          <li key="address">
            <label htmlFor="address">ADDRESS: </label>
            <input type="text" name="address" defaultValue={props.address} />
          </li>
          <li key="phone">
            <label htmlFor="phone">PHONE: </label>
            <input type="text" name="phone" defaultValue={props.phone} />
          </li>
          <li key="level">
            <label htmlFor="level">LEVEL: </label>
            <select name="level">
              <option
                key="1"
                selected={props.level === "normal" ? true : false}
              >
                normal
              </option>
              <option key="2" selected={props.level === "admin" ? true : false}>
                admin
              </option>
            </select>
            {/* <input type="text" name="level" defaultValue={props.level} /> */}
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

export default updateUserForm;
