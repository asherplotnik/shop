import React, { useState, useEffect } from "react";
import classes from "./AddTransForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { MenuItem, TextField } from "@material-ui/core";
const AddTransForm = (props) => {
  useEffect(() => {
    if (props.rVariation) {
      setVarState(props.rVariation);
    }
  }, [props.rVariation]);
  const [varState, setVarState] = useState("-");
  const handleChange = (e) => {
    setVarState(e.target.value);
  };

  let options = props.stock.map((row, index) => (
    <MenuItem key={index} value={row.variation}>{row.variation}</MenuItem>
  ));
  return (
    <div className={classes.AddTransForm}>
      <form id={props.formId} onSubmit={props.addTransaction}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <TextField
              fullWidth
              className={classes.TextField}
              value={varState}
              onChange={handleChange}
              variant="outlined"
              name="variation"
              select
              margin="dense"
              label="VARIATION: "
            >
              {options}
            </TextField>
          </li>
          <li key="qty">
            {/* <label htmlFor="qty">QUANTITY: </label>
            <input
              type="number"
              name="qty"
              
              defaultValue={props.rQty}
            /> */}
            <TextField
              fullWidth
              type="number"
              min="1"
              step="1"
              name="qty"
              margin="dense"
              variant="outlined"
              label="QUANTITY: "
            />
          </li>
          <li key="inout">
            {/* <label htmlFor="inorout">IN / OUT: </label>
            <select name="inorout" defaultValue={props.rInout}>
              <option key={1} value={true}>
                IN
              </option>
              <option key={2} value={false}>
                OUT
              </option>
            </select> */}
            <TextField
              fullWidth
              variant="outlined"
              name="inorout"
              select
              margin="dense"
              label="IN / OUT: "
            >
              <MenuItem key={1} value={true}>
                IN
              </MenuItem>
              <MenuItem key={2} value={false}>
                OUT
              </MenuItem>
            </TextField>
          </li>
          <li key="NOTE">
            <TextField
              fullWidth
              type="text"
              name="note"
              margin="dense"
              variant="outlined"
              label="NOTE: "
            />
          </li>
          <br></br>
          <br></br>
          <li key="sub">
            <MyButton type="submit" btnType="continue">SUBMIT</MyButton>
            <MyButton type="button" btnType="cancel" clicked={props.modalClosed}>
              CANCEL
            </MyButton>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddTransForm;
