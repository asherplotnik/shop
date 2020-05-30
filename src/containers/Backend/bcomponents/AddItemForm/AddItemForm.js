import React from "react";
import classes from "./AddItemForm.module.css";

const addItemForm = (props) => {
  let options = [];
  if (props.collSelect) {
    for (let i = 0; i < props.collSelect.length; i++) {
      options.push(
        <option
          key={i}
          selected={props.collSelect[i] === props.rCollection ? "selected" : ""}
        >
          {props.collSelect[i]}
        </option>
      );
    }
  }
  console.log("rTrendning", props.rTrending);
  return (
    <div className={classes.AddItemsForm}>
      <form id={props.formId} onSubmit={props.addItem}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li key="code">
            <label htmlFor="AddCode">CODE: </label>
            <input type="text" name="addCode" defaultValue={props.rCode} />
          </li>
          <li key="collection">
            <label htmlFor="AddCollection">COLLECTION: </label>
            <select name="addCollection"> {options}</select>
          </li>
          <li key="desc">
            <label htmlFor="AddDesc">DESCRIPTION: </label>
            <input type="text" name="addDesc" defaultValue={props.rDesc} />
          </li>
          <li key="size">
            <label htmlFor="AddSize">SIZE: </label>
            <input type="text" name="addSize" defaultValue={props.rSize} />
          </li>
          <li key="price">
            <label htmlFor="AddPrice">PRICE: </label>
            <input type="number" name="addPrice" defaultValue={props.rPrice} />
          </li>
          <li key="type">
            <label htmlFor="AddType">TYPE: </label>
            <select name="addType">
              <option selected={props.rType === "EARRINGS" ? true : false}>
                EARRINGS
              </option>
              <option selected={props.rType === "BRACELET" ? true : false}>
                BRACELET
              </option>
              <option selected={props.rType === "NECKLACE" ? true : false}>
                NECKLACE
              </option>
              <option selected={props.rType === "PENDANT" ? true : false}>
                PENDANT
              </option>
              <option selected={props.rType === "RING" ? true : false}>
                {" "}
                RING
              </option>
              <option selected={props.rType === "ACCESSORY" ? true : false}>
                {" "}
                ACCESSORY
              </option>
            </select>
          </li>
          <li key="trending">
            <label htmlFor="AddTrending">TRENDING: </label>
            <select name="addTrending">
              <option selected={props.rTrending === false ? true : false}>
                false
              </option>
              <option selected={props.rTrending === true ? true : false}>
                true
              </option>
            </select>
          </li>
          <li key="imageL">
            <label htmlFor="AddImg">IMAGE: </label>
          </li>{" "}
          <li key="image">
            <input
              type="file"
              name="addImg"
              required={props.title === "ADD PRODUCT" ? true : false}
            />
          </li>
          <li key="imageL2">
            <label htmlFor="AddImg2">IMAGE 2: </label>
          </li>{" "}
          <li key="image2">
            <input
              type="file"
              name="addImg2"
              required={props.title === "ADD PRODUCT" ? true : false}
            />
          </li>{" "}
          <li key="productDetails">
            <textarea
              style={{ resize: "none" }}
              rows="5"
              cols="50"
              name="productDetails"
              placeholder="Product Details"
              defaultValue={props.rDetails}
            />
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

export default addItemForm;
