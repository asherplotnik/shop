import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            width: this.props.width,
            left: this.props.left,
            transform: this.props.show ? "translateY(0)" : "translateY(-200vh)",
            opacity: this.props.show ? true : false,
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
export default Modal;
