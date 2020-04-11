import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.Blk}>
      <div className={classes.Mail}>
        <a
          rel="noopener noreferrer"
          href="https://www.facebook.com/Indy-lady-fashion-101376811323628/"
          target="_blank"
        >
          <img
            className={classes.Facebook}
            src={process.env.PUBLIC_URL + "/images/facebook-logo.png"}
            alt="linkImage"
          />
        </a>
      </div>
      <div className={classes.Mail}>email: asherplotnik@gmail.com</div>
      <div className={classes.Mail}>tel:0879037504</div>
    </div>
  );
};

export default Footer;
