import React, { useEffect, useState } from "react";
import classes from "./UpdateUserForm.module.css";

const UpdateUserForm = (props) => {
  const [levelState, setLevelState] = useState(props.level);
  useEffect(() => {
    if (props.level) {
      setLevelState(props.level);
    }
  }, [props.level]);
  const handleLevel = (e) => {
    setLevelState(e.target.value);
  };
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
            <select name="level" value={levelState} onChange={handleLevel}>
              <option key="1">normal</option>
              <option key="2">admin</option>
            </select>
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

export default UpdateUserForm;
