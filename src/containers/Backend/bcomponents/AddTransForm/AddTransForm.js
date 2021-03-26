import React from "react";
import classes from "./AddTransForm.module.css";

const addTransForm = (props) => {
  let options = props.stock.map((row) => <option>{row.variation}</option>);
  return (
    <div className={classes.AddTransForm}>
      <form id={props.formId} onSubmit={props.addTransaction}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <label htmlFor="addVariation">VARIATION: </label>
            <select name="addVariation" defaultValue="-">
              {options}
            </select>
          </li>
          <li key="qty">
            <label htmlFor="addQty">QUANTITY: </label>
            <input
              type="number"
              name="addQty"
              min="1"
              step="1"
              defaultValue={props.rQty}
            />
          </li>
          <li key="inout">
            <label htmlFor="addInout">IN / OUT: </label>
            <select name="addInout" defaultValue={props.rInout}>
              <option>IN</option>
              <option>OUT</option>
            </select>
          </li>
          <li key="NOTE">
            <label htmlFor="addINote">NOTE: </label>
            <input type="text" name="addNote" defaultValue={props.rNote} />
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
