import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { withRouter } from "react-router";
import { gc } from "../../../assets/helper";
import { connect } from "react-redux";

const sideDrawer = (props) => {
  const onPressedCart = () => {
    props.history.push("/shoppingcart");
  };
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            showAccount={props.token !== null}
            lang={props.lang}
          />
        </nav>
        <div onClick={onPressedCart} className={classes.Cart0}>
          <div onClick={onPressedCart} className={classes.Cart2}>
            <img src={gc + "cart2.png"} alt="cart" />
          </div>
          <div className={classes.Cart}>
            <img src={gc + "cart.png"} alt="cart" />
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
  };
};
export default connect(mapStateToProps)(withRouter(sideDrawer));
