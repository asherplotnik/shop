import React from "react";
import classes from "./UpdateFooter.module.css";
const UpdateFooter = (props) => {
  return (
    <div className={classes.Scroll}>
      <form id="updateFooter" onSubmit={props.updateFooterHandler}>
        <ul className={classes.Ul}>
          <li>
            <label htmlFor="youtube">YOUTUBE LINK:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.youtube}
              name="youtube"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="facebook">FACEBOOK LINK:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.facebook}
              name="facebook"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="secondParagraph">EMAIL:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.email}
              name="email"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="tel">PHONE NUMBER:</label>
          </li>
          <li>
            <input type="text" defaultValue={props.content.tel} name="tel" />
          </li>
          <br className={classes.Br}></br>
          <button type="submit">SUBMIT</button>
          <button type="button" onClick={props.onUpdateFooter}>
            CANCEL
          </button>
        </ul>
      </form>
    </div>
  );
};

export default UpdateFooter;
