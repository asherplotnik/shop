import React, { useEffect, useState } from "react";
import classes from "./AddItemForm.module.css";

const AddItemForm = (props) => {
  useEffect(() => {
    if (props.rCollection) {
      setCollState(props.rCollection);
    }
  }, [props.rCollection]);
  useEffect(() => {
    if (props.rType) {
      setTypeState(props.rType);
    }
  }, [props.rType]);
  useEffect(() => {
    if (props.rTrending) {
      setTrendState(props.rTrending);
    }
  }, [props.rTrending]);
  const [collState, setCollState] = useState("-");
  const [typeState, setTypeState] = useState("-");
  const [trendState, setTrendState] = useState("-");
  const onSelectColl = (e) => {
    setCollState(e.target.value);
  };
  const onSelectType = (e) => {
    setTypeState(e.target.value);
  };
  const onSelectTrend = (e) => {
    setTrendState(e.target.value);
  };
  let options = [];
  if (props.collSelect) {
    for (let i = 0; i < props.collSelect.length; i++) {
      options.push(<option key={i}>{props.collSelect[i].name}</option>);
    }
  }
  console.log(props.rDetails);
  return (
    <div className={classes.AddItemsForm}>
      <form id={props.formId} onSubmit={props.addItem}>
        <div className={classes.Font}>{props.title}</div>
        <ul className={classes.FormList}>
          <li key="code">
            <label htmlFor="AddCode">CODE: </label>
            <input type="text" name="mainTitle" defaultValue={props.rCode} />
          </li>
          <li key="collection">
            <label htmlFor="mainTitleT">COLLECTION: </label>
            <select name="mainTitleT" value={collState} onChange={onSelectColl}>
              {" "}
              {options}
            </select>
          </li>
          <li key="desc">
            <label htmlFor="firstParagraph">DESCRIPTION: </label>
            <input
              type="text"
              name="firstParagraph"
              defaultValue={props.rDesc}
            />
          </li>
          <li key="size">
            <label htmlFor="firstParagraphT">SIZE: </label>
            <input
              type="text"
              name="firstParagraphT"
              defaultValue={props.rSize}
            />
          </li>
          <li key="price">
            <label htmlFor="secondParagraph">PRICE: </label>
            <input
              type="number"
              name="secondParagraph"
              defaultValue={props.rPrice}
            />
          </li>
          <li key="type">
            <label htmlFor="secondParagraphT">TYPE: </label>
            <select
              name="secondParagraphT"
              value={typeState}
              onChange={onSelectType}
            >
              <option>EARRINGS</option>
              <option>BRACELET</option>
              <option>NECKLACE</option>
              <option>PENDANT</option>
              <option>RING</option>
              <option>ACCESSORY</option>
            </select>
          </li>
          <li key="trending">
            <label htmlFor="thirdParagraph">TRENDING: </label>
            <select
              name="thirdParagraph"
              value={trendState}
              onChange={onSelectTrend}
            >
              <option>false</option>
              <option>true</option>
            </select>
          </li>
          <li key="imageL">
            <label htmlFor="firstImage">IMAGE: </label>
          </li>{" "}
          <li key="image">
            <input
              type="file"
              name="firstImage"
              required={props.title === "ADD PRODUCT" ? true : false}
            />
          </li>
          <li key="imageL2">
            <label htmlFor="secondImage">IMAGE 2: </label>
          </li>{" "}
          <li key="image2">
            <input
              type="file"
              name="secondImage"
              required={props.title === "ADD PRODUCT" ? true : false}
            />
          </li>{" "}
          <li key="productDetails">
            <textarea
              style={{ resize: "none" }}
              rows="5"
              cols="50"
              name="thirdParagraphT"
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

export default AddItemForm;
