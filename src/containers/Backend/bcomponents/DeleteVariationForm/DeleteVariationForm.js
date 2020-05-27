import React from "react";
import classes from "./DeleteVariationForm.module.css";

const deleteVariationForm = (props) => {
  let options = props.stock.map((row) => <option>{row.variation}</option>);
  return (
    <div className={classes.deleteVariationForm}>
      <form id="deleteVariation" onSubmit={props.deleteVariation}>
        <div className={classes.Font}>DELETE VARIATION</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <label htmlFor="deleteVariation">VARIATION: </label>
            <select name="deleteVariation">{options}</select>
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
export default deleteVariationForm;
