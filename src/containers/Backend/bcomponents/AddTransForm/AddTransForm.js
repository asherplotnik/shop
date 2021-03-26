import React from "react";
import classes from "./AddTransForm.module.css";

const addTransForm = (props) => {
  let options = props.stock.map((row, index) => (
    <option key={index}>{row.variation}</option>
  ));
  return (
    <div className={classes.AddTransForm}>
      <form id={props.formId} onSubmit={props.addTransaction}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <label htmlFor="variation">VARIATION: </label>
            <select name="variation" defaultValue="-">
              {options}
            </select>
          </li>
          <li key="qty">
            <label htmlFor="qty">QUANTITY: </label>
            <input
              type="number"
              name="qty"
              min="1"
              step="1"
              defaultValue={props.rQty}
            />
          </li>
          <li key="inout">
            <label htmlFor="inorout">IN / OUT: </label>
            <select name="inorout" defaultValue={props.rInout}>
              <option key={1} value={true}>
                IN
              </option>
              <option key={2} value={false}>
                OUT
              </option>
            </select>
          </li>
          <li key="NOTE">
            <label htmlFor="note">NOTE: </label>
            <input type="text" name="note" defaultValue={props.rNote} />
          </li>
          <br></br>
          <br></br>
          <li key="sub">
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

export default addTransForm;
