import React, { useState } from "react";
import classes from "./AddVariationForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { TextField } from "@material-ui/core";
const AddVariationForm = (props) => {
  const [uploaded,setUploaded] = useState(null);
  const onUploaded = (e) => {
    setUploaded(e.target.value);
  }
  const [variationVal, setVariationVal] = useState();
  const handleVal = (e) => {
    setVariationVal(e.target.value);
  }
  return (
    <div className={classes.AddVariationForm}>
      <form id="addVariation" onSubmit={props.addVariation}>
        <div className={classes.Font}>ADD VARIATION</div>
        <ul className={classes.FormList}>
          <li key="variation">
            <TextField
              value={variationVal}
              onChange={handleVal}
              defaultValue="-"
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="VARIATION:"
              name="mainTitle"
              type="text"
              autoFocus
            />
          </li>
          <li>
            <br />
          </li>
          <li>
            <div className={classes.ButtonDiv}>
             <MyButton fullWidth btnType={uploaded ? "uploaded" : "upload"} component="label">
                UPLOAD IMAGE FILE:
                <input
                  type="file"
                  hidden
                  name="firstImage"
                  type="file"
                  onChange={onUploaded}
                  required
                />
              </MyButton> 
              </div>
          </li>
          <br></br>
          <br></br>
          <li key="sub">
            <MyButton type="submit" btnType="continue" >SUBMIT</MyButton>
            <MyButton type="button" btnType="cancel" clicked={props.modalClosed}>
              CANCEL
            </MyButton>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddVariationForm;
