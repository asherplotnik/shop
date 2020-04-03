import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { withRouter } from "react-router";

const sideDrawer = props => {
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
          <NavigationItems />
        </nav>
        <div onClick={onPressedCart} className={classes.Cart0}>
          <div onClick={onPressedCart} className={classes.Cart2}>
            <img src="http://localhost:9000/images/cart2.png" alt="cart" />
          </div>
          <div className={classes.Cart}>
            <img src="http://localhost:9000/images/cart.png" alt="cart" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(sideDrawer);
