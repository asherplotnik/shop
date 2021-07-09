import React, { useState, useEffect } from "react";
import classes from "./AddTransForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
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
    <option key={index}>{row.variation}</option>
  ));
  return (
    <div className={classes.AddTransForm}>
      <form id={props.formId} onSubmit={props.addTransaction}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <label htmlFor="variation">VARIATION: </label>
            <select name="variation" value={varState} onChange={handleChange}>
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
