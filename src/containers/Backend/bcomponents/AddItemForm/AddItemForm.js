import React from "react";
import classes from "./AddItemForm.module.css";

const addItemForm = props => {
  let options = [];
  if (props.collSelect) {
    for (let i = 0; i < props.collSelect.length; i++) {
      options.push(
        <option value={props.collSelect[i]}>{props.collSelect[i]}</option>
      );
    }
  }
  return (
    <div className={classes.AddItemsForm}>
      <form id="addItemForm" onSubmit={props.addItem}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li>
            <label htmlFor="AddCode">CODE: </label>
            <input type="text" name="addCode" />
          </li>
          <li>
            <label htmlFor="AddCollection">COLLECTION: </label>
            <select name="addCollection"> {options} </select>
          </li>
          <li>
            <label htmlFor="AddDesc">DESCRIPTION: </label>
            <input type="text" name="addDesc" />
          </li>
          <li>
            <label htmlFor="AddSize">SIZE: </label>
            <input type="text" name="addSize" />
          </li>
          <li>
            <label htmlFor="AddPrice">PRICE: </label>
            <input type="text" name="addPrice" />
          </li>
          <li>
            <label htmlFor="AddType">TYPE: </label>
            <input type="text" name="addType" />
          </li>
          <li>
            <label htmlFor="AddImg">IMAGE: </label>
          </li>{" "}
          <li>
            <input type="file" name="addImg" />
          </li>
          <li>
            <label htmlFor="AddImg2">IMAGE 2: </label>
          </li>{" "}
          <li>
            <input type="file" name="addImg2" />
          </li>{" "}
          <li style={{opacity:"0%"}}>
          <input type="text" name="formType" value={props.title} />
          </li>
          <br></br>
          <li>
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

export default addItemForm;
