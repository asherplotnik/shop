import React from "react";
import MyButton from "../../../Button/Button";
import classes from "./ModalConfirm.module.css";
const modalConfirm = (props) => {
  return (
    <div>
      <div>
        <p>ARE YOU SURE?</p>
      </div>
      <div className={classes.Cont}>
        <div>
          <MyButton btnType="continue" clicked={props.confirmed}>
            YES
          </MyButton>
        </div>
        <p style={{ color: "transparent" }}> {"-------"}</p>
        <div>
          <MyButton btnType="cancel" clicked={props.modalClosed}>
            NO
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default modalConfirm;
