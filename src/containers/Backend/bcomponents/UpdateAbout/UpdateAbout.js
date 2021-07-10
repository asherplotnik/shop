import React, { useState } from "react";
import classes from "./UpdateAbout.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { TextField } from "@material-ui/core";
const UpdateAbout = (props) => {
  const [uploaded1,setUploaded1] = useState(null);
  const [uploaded2,setUploaded2] = useState(null);
  const [uploaded3,setUploaded3] = useState(null);
  const onUploaded1 = (e) => {
    setUploaded1(e.target.value);
  }
  const onUploaded2 = (e) => {
    setUploaded2(e.target.value);
  }
  const onUploaded3 = (e) => {
    setUploaded3(e.target.value);
  }
  return (
    <div className={classes.Scroll}>
      <form id="updateAboutUs" onSubmit={props.updateAboutHandler}>
        <ul className={classes.Ul}>
          <li>
            <TextField
              id="updateAboutUsMainTitle"
              defaultValue={props.content.mainTitle}
              variant="outlined"
              margin="normal"
              label="MAIN TITLE:"
              name="mainTitle"
              type="text"
              autoFocus
              required
            />
          </li>
          <li>
            <TextField
              defaultValue={props.content.mainTitleT}
              variant="outlined"
              margin="normal"
              label="MAIN TITLE (THAI):"
              name="mainTitleT"
              id="updateAboutUsMainTitleT"
              type="text"
              autoFocus
              required
            />
          </li>
          <li>
            <MyButton btnType={uploaded1 ? "uploaded" : "upload"} component="label">
                  UPLOAD FIRST IMAGE:
                <input
                  type="file"
                  hidden
                  name="firstImage"
                  id="firstImage"
                  type="file"
                  onChange={onUploaded1}
                />
              </MyButton>
          </li>
          <li>
            <TextField
              defaultValue={props.content.firstParagraph}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              margin="normal"
              label="FIRST PARAGRAPH:"
              name="firstParagraph"
              id="firstParagraph"
              type="text"
              autoFocus
              required
            />
          </li>
          <li>
            <TextField
              defaultValue={props.content.firstParagraphT}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              margin="normal"
              label="FIRST PARAGRAPH (THAI):"
              name="firstParagraphT"
              id="firstParagraphT"
              type="text"
              autoFocus
              required
            />
          </li>
          <li>
            <MyButton btnType={uploaded2 ? "uploaded" : "upload"} component="label">
                  UPLOAD SECOND IMAGE:
                <input
                  type="file"
                  hidden
                  name="secondImage"
                  type="file"
                  onChange={onUploaded2}
                />
              </MyButton>
          </li>
          <br className={classes.Br}></br>
          <li>
            <TextField
              defaultValue={props.content.secondParagraph}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              margin="normal"
              label="SECOND PARAGRAPH:"
              name="secondParagraph"
              id="secondParagraph"
              type="text"
              autoFocus
              required
            />
          </li>
         <li>
            <TextField
              defaultValue={props.content.secondParagraphT}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              margin="normal"
              label="SECOND PARAGRAPH (THAI):"
              name="secondParagraphT"
              id="secondParagraphT"
              type="text"
              autoFocus
              required
            />
          </li> 
          <li>
            <MyButton btnType={uploaded3 ? "uploaded" : "upload"} component="label">
                  UPLOAD THIRD IMAGE:
                <input
                  type="file"
                  hidden
                  name="thirdImage"
                  type="file"
                  onChange={onUploaded3}
                />
              </MyButton>
          </li>
          <br className={classes.Br}></br>
          <li>
            <TextField
              defaultValue={props.content.thirdParagraph}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              margin="normal"
              label="THIRD PARAGRAPH:"
              name="thirdParagraph"
              id="thirdParagraph"
              type="text"
              autoFocus
              required
            />
          </li>
          <li>
            <TextField
              defaultValue={props.content.secondParagraphT}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              margin="normal"
              label="SECOND PARAGRAPH (THAI):"
              name="secondParagraphT"
              id="secondParagraphT"
              type="text"
              autoFocus
              required
            />
          </li>
          <MyButton btnType="continue" type="submit">SUBMIT</MyButton>
          <MyButton  btnType="cancel" type="button" clicked={props.onUpdateAbout}>
            CANCEL
          </MyButton>
        </ul>
      </form>
    </div>
  );
};

export default UpdateAbout;
