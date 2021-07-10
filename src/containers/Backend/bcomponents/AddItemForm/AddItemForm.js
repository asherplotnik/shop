import React, { useEffect, useState } from "react";
import classes from "./AddItemForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { MenuItem, TextField, Typography } from "@material-ui/core";
const AddItemForm = (props) => {
  const [uploaded1,setUploaded1] = useState(null);
  const [uploaded2,setUploaded2] = useState(null);
  const [state, setState] = useState();
  useEffect(()=>{
    setState(props);
    console.log("fdsgdfGDFYEESS");
  },[props]);
  const onUploaded1 = (e) => {
    setUploaded1(e.target.value);
  }
  const onUploaded2 = (e) => {
    setUploaded2(e.target.value);
  }
  
  const onSelectColl = (e) => {
    let temp = {...state};
    temp.rCollection = e.target.value
    setState(temp);
  };
  const onSelectType = (e) => {
    let temp = {...state};
    temp.rType = e.target.value;
    setState(temp);
  };
  const onSelectTrend = (e) => {
    let temp = {...state};
    temp.rTrending = e.target.value;
    setState(temp);
  };
  
  const onSelectCode = (e) => {
    let temp = {...state};
    temp.rCode = e.target.value;
    setState(temp);
  };
  const onSelectDesc = (e) => {
    let temp = {...state};
    temp.rDesc = e.target.value;
    setState(temp);
  };
  const onSelectSize = (e) => {
    let temp = {...state};
    temp.rSize = e.target.value;
    setState(temp);
  };
  const onSelectPrice = (e) => {
    let temp = {...state};
    temp.rPrice = e.target.value;
    setState(temp);
  };
  const onSelectDetails = (e) => {
    let temp = {...state};
    temp.rDetails = e.target.value;
    setState(temp);
  };


  let options = [];
  if (props.collSelect) {
    for (let i = 0; i < props.collSelect.length; i++) {
      options.push(<MenuItem key={i} value={props.collSelect[i].name}>{props.collSelect[i].name}</MenuItem>);
    }
  }
  console.log(props.rDetails);
  return (
    <div className={classes.AddItemsForm}>
      <form id={props.formId} onSubmit={props.addItem}>
        <Typography component="h1" variant="h5">{props.title}</Typography>
        <ul className={classes.FormList}>
          <li key="code">
            <TextField
              value={state?.rCode || ""}
              onChange={onSelectCode}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="CODE:"
              name="mainTitle"
              type="text"
              autoFocus
            />
          </li>
          <li key="collection">
            <TextField
            fullWidth
            className={classes.TextField}
            value={state?.rCollection  || ""}
            onChange={onSelectColl}
            variant="outlined"
            name="mainTitleT"
            select
            margin="dense"
            label="COLLECTION:"
            >
            {options}
          </TextField>
          </li>
          <li key="desc">
            <TextField
              value={state?.rDesc  || ""}
              onChange={onSelectDesc}
              variant="outlined"
              margin="dense"
              fullWidth
              label="DESCRIPTION:"
              name="firstParagraph"
              type="text"
              autoFocus
            />
          </li>
          <li key="size">
            <TextField
              value={state?.rSize  || ""}
              onChange={onSelectSize}
              variant="outlined"
              margin="dense"
              fullWidth
              label="SIZE:"
              name="firstParagraphT"
              type="text"
              autoFocus
            />
          </li>
          <li key="price">
            <TextField
              value={state?.rPrice  || ""}
              onChange={onSelectPrice}
              variant="outlined"
              margin="dense"
              fullWidth
              label="PRICE:"
              name="secondParagraph"
              type="number"
              autoFocus
            />
          </li>
          <li key="type">
            <TextField
            fullWidth
            className={classes.TextField}
            value={state?.rType  || ""}
            onChange={onSelectType}
            variant="outlined"
            name="secondParagraphT"
            margin="dense"
            select
            label="TYPE:"
            >
            <MenuItem key="EARRINGS" value="EARRINGS">EARRINGS</MenuItem>
            <MenuItem key="BRACELET" value="BRACELET">BRACELET</MenuItem>
            <MenuItem key="NECKLACE" value="NECKLACE">NECKLACE</MenuItem>
            <MenuItem key="PENDANT" value="PENDANT">PENDANT</MenuItem>
            <MenuItem key="PENDANT" value="PENDANT">RING</MenuItem>
            <MenuItem key="RING" value="RING">ACCESSORY</MenuItem>
          </TextField>
          </li>
          <li key="trending">
            <TextField
            fullWidth
            defaultValue={false}
            className={classes.TextField}
            value={state?.rTrending  || false}
            onChange={onSelectTrend}
            variant="outlined"
            name="thirdParagraph"
            select
            label="TRENDING:"
            margin="dense"
            >
            <MenuItem key="false" value="false">FALSE</MenuItem>
            <MenuItem key="true" value="true">TRUE</MenuItem>
          </TextField>
          </li>
          <li key="image">
            <div className={classes.ButtonDiv}>
            <MyButton fullWidth btnType={uploaded1 ? "uploaded" : "upload"} component="label">
                ADD PRIMARY IMAGE FILE:
                <input
                  type="file"
                  hidden
                  name="firstImage"
                  type="file"
                  onChange={onUploaded1}
                  required={props.title === "ADD PRODUCT" ? true : false}
                />
              </MyButton>
              </div>
          </li>
          <li key="image2">
          <div className={classes.ButtonDiv}>
            <MyButton fullWidth btnType={uploaded2 ? "uploaded" : "upload"} component="label">
                ADD SECONDARY IMAGE FILE:
                <input
                  type="file"
                  hidden
                  name="secondImage"
                  type="file"
                  onChange={onUploaded2}
                  required={props.title === "ADD PRODUCT" ? true : false}
                />
              </MyButton>
              </div>
          </li>
          <li key="productDetails">
            <TextField
              value={state?.rDetails  || ""}
              onChange={onSelectDetails}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              name="thirdParagraphT"
              label="PRODUCT DETAILS:"
              margin="dense"
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

export default AddItemForm;
