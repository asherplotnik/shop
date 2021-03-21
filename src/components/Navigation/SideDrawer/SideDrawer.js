import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const sideDrawer = (props) => {
  const onPressedCart = () => {
    props.closed();
    props.history.push("/shoppingcart");
  };
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  let showCart = classes.Hide;
  if (props.entries.length > 0) {
    showCart = classes.Cart0;
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div onClick={props.closed} className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            showAccount={props.token !== null}
            lang={props.lang}
          />
        </nav>
        <div onClick={onPressedCart} className={showCart}>
          <div className={classes.Cart2}>
            <img
              src={process.env.PUBLIC_URL + "static/images/cart2.png"}
              alt="cart"
            />
          </div>
          <div className={classes.Cart}>
            <img
              src={process.env.PUBLIC_URL + "static/images/cart.png"}
              alt="cart"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.lang,
    token: state.authReducer.token,
    entries: state.cartReducer.entries,
  };
};
export default connect(mapStateToProps)(withRouter(sideDrawer));
