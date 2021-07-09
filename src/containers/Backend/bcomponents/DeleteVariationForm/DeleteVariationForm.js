import React from "react";
import classes from "./DeleteVariationForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
const deleteVariationForm = (props) => {
  let options = props.stock.map((row, index) => (
    <option key={index}>{row.variation}</option>
  ));
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
            <MyButton type="submit" btnType="continue">SUBMIT</MyButton> 
            <MyButton type="button" clicked={props.modalClosed} btnType="cancel">
              CANCEL
            </MyButton>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default deleteVariationForm;
