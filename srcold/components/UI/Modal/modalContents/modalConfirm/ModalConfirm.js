import React from "react";

import Button from "../../../Button/Button";
import classes from "./ModalConfirm.module.css";
const modalConfirm = (props) => {
  return (
    <div>
      <div>
        <p>ARE YOU SURE?</p>
      </div>
      <div className={classes.Cont}>
        <div>
          <Button btnType="Success" clicked={props.confirmed}>
            YES
          </Button>
        </div>
        <p style={{ color: "transparent" }}> {"-------"}</p>
        <div>
          <Button btnType="Danger" clicked={props.modalClosed}>
            NO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default modalConfirm;
