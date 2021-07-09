import React from "react";
import classes from "./UpdateFooter.module.css";
import MyButton from "../../../../components/UI/Button/Button";
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
            <label htmlFor="mainTitle">YOUTUBE LINK:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.mainTitle}
              name="mainTitle"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="mainTitleT">FACEBOOK LINK:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.mainTitleT}
              name="mainTitleT"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="firstParagraph">EMAIL:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.firstParagraph}
              name="firstParagraph"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="firstParagraphT">PHONE NUMBER:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.firstParagraphT}
              name="firstParagraphT"
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
