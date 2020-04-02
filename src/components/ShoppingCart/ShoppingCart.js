import React from "react";
import classes from "./ShoppingCart.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../UI/Button/Button";
import { withRouter } from "react-router";
import ShoppingTable from "../ShoppingTable/ShoppingTable";

const shoppingCart = props => {
  const onDeletePressed = index => {
    const arr = [...props.entries];
    arr.splice(index, 1);
    props.deleteEntry(arr);
    if (arr.length === 0) {
      props.history.push("/");
    }
  };

  const redirectCheckout = () => {
    if (props.token === null) {
      props.history.push("/auth");
    } else {
      props.history.push("/checkout");
    }
  };

  let subtotal = 0;
  props.entries.map(entry => (subtotal = subtotal + entry.total));

  let viewPage = <h1 className={classes.Message}> SHOPPING CART IS EMPTY </h1>;
  if (props.entries.length > 0) {
    viewPage = (
      <div className={classes.Wrapper}>
        <h1>SHOPPING CART</h1>
        <ShoppingTable
          entries={props.entries}
          onDeletePressed={onDeletePressed}
        />
        <br></br>
        <p style={{ marginLeft: "40px" }}>SUBTOTAL: {subtotal}</p>
        <Button
          clicked={redirectCheckout}
          // disabled={props.token === null}
          btnType="SuccessSmall"
        >
          {props.token === null
            ? "PLEASE LOGIN BEFORE CHECKOUT"
            : "CONTINUE TO CHECKOUT"}
        </Button>
      </div>
    );
  }
  return viewPage;
};

const mapStateToProps = state => {
  return {
    entries: state.cartReducer.entries,
    token: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEntry: entries => dispatch(actions.deleteEntry(entries))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(shoppingCart));
