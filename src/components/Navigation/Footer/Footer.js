import React from "react";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";
const Footer = (props) => {
  // mainTitle = "youtube"
  // mainTitleT = "facebook"
  // firstParagraph = "email"
  // firstParagraphT = "tel"
  return (
    <div className={classes.Blk}>
      <div className={classes.Mail}>
        <a
          rel="noopener noreferrer"
          // href="https://www.youtube.com/channel/UCOleG6EtOlMMU3lhwIGCgcQ"
          href={props.content.mainTitle}
          target="_blank"
        >
          <img
            className={classes.Facebook}
            src={process.env.PUBLIC_URL + "static/images/youtube.png"}
            alt="linkImage"
          />
        </a>
      </div>
      <div className={classes.Mail}>
        <a
          rel="noopener noreferrer"
          //href="https://www.facebook.com/Indy-lady-fashion-101376811323628/"
          href={props.content.mainTitleT}
          target="_blank"
        >
          <img
            className={classes.Facebook}
            src={process.env.PUBLIC_URL + "static/images/facebook-logo.png"}
            alt="linkImage"
          />
        </a>
      </div>
      <div className={classes.Mail}>
        <NavLink to="/contactus" exact={true}>
          email: {props.content.firstParagraph} Email:
          {/* "indy-collection@gmail.com" */}
        </NavLink>
      </div>
      <div className={classes.Mail}>
        Tel: {props.content.firstParagraphT}
        {/* Tel: +66(0)879037504 */}
      </div>
    </div>
  );
};

export default Footer;
