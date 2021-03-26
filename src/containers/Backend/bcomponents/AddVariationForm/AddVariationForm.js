import React from "react";
import classes from "./AddVariationForm.module.css";

const addVariationForm = (props) => {
  return (
    <div className={classes.AddVariationForm}>
      <form id="addVariation" onSubmit={props.addVariation}>
        <div className={classes.Font}>ADD VARIATION</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <label htmlFor="mainTitle">VARIATION: </label>
          </li>
          <li>
            <input type="text" name="mainTitle" defaultValue="-" />
          </li>
          <li>
            <br />
          </li>
          <li key="img">
            <label htmlFor="firstImage">IMAGE: </label>
          </li>
          <li>
            <input type="file" name="firstImage" />
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

export default addVariationForm;
