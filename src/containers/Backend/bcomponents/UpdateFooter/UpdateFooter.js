import React from "react";
import classes from "./UpdateFooter.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { TextField } from "@material-ui/core";
const UpdateFooter = (props) => {
  // mainTitle = "youtube"
  // mainTitleT = "facebook"
  // firstParagraph = "email"
  // firstParagraphT = "tel"
  return (
    <div className={classes.Scroll}>
      <form id="updateFooter" onSubmit={props.updateFooterHandler}>
        <ul className={classes.Ul}>
          <li>
            <TextField
              defaultValue={props.content.mainTitle}
              variant="outlined"
              margin="normal"
              label="YOUTUBE LINK:"
              name="mainTitle"
              id="youtube"
              type="text"
              autoFocus
              required
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <TextField
              defaultValue={props.content.mainTitleT}
              variant="outlined"
              margin="normal"
              label="FACEBOOK LINK:"
              name="mainTitleT"
              id="facebook"
              type="text"
              autoFocus
              required
            />
          </li>
          <br className={classes.Br}></br>
          <li>
             <TextField
              defaultValue={props.content.firstParagraph}
              variant="outlined"
              margin="normal"
              label="EMAIL:"
              name="firstParagraph"
              id="myEmail"
              type="email"
              autoFocus
              required
            />
          </li>
          <br className={classes.Br}></br>
          <li>
          <TextField
              defaultValue={props.content.firstParagraphT}
              variant="outlined"
              margin="normal"
              label="PHONE NUMBER:"
              name="firstParagraphT"
              id="myPhone"
              type="text"
              autoFocus
              required
            />
          </li>
          <br className={classes.Br}></br>
          <MyButton btnType="continue" type="submit">SUBMIT</MyButton>
          <MyButton btnType="cancel" type="button" clicked={props.onUpdateFooter}>
            CANCEL
          </MyButton>
        </ul>
      </form>
    </div>
  );
};

export default UpdateFooter;
