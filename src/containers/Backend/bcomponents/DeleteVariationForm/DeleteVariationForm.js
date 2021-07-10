import React from "react";
import classes from "./DeleteVariationForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { MenuItem, TextField } from "@material-ui/core";
const deleteVariationForm = (props) => {
  let options = props.stock.map((row, index) => (
    <MenuItem key={index} value={row.variation}>{row.variation}</MenuItem>
  ));
  return (
    <div className={classes.deleteVariationForm}>
      <form id="deleteVariation" onSubmit={props.deleteVariation}>
        <div className={classes.Font}>DELETE VARIATION</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <TextField
            fullWidth
            variant="outlined"
            name="deleteVariation"
            select
            margin="dense"
            label="VARIATION:"
            >
            {options}
          </TextField>
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
