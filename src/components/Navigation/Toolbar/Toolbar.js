import React from "react";
import Logo from "../../UI/Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { withRouter } from "react-router";
import { connect } from "react-redux";
const toolbar = props => {
  const onPressedCart = () => {
    props.history.push("shoppingcart");
  };
  let showCart = classes.Hide;
  if (props.entries.length > 0) {
    showCart = classes.Cart0;
  }
  return (
    <React.Fragment>
      <header className={classes.HeaderClass}>
        <div className={classes.Toolbar}>
          <DrawerToggle clicked={props.drawerToggleClicked} />
          <div className={classes.Left}>
            <div className={classes.Logo}>
              <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
              <NavigationItems />
            </nav>
          </div>
          <div
            onClick={onPressedCart}
            className={[showCart, classes.DesktopOnly].join(" ")}
          >
            <div onClick={onPressedCart} className={classes.Cart2}>
              <img
                onClick={onPressedCart}
                src="http://localhost:9000/images/cart2.png"
                alt="cart"
              />
            </div>
            <div onClick={onPressedCart} className={classes.Cart}>
              <img
                onClick={onPressedCart}
                src="http://localhost:9000/images/cart.png"
                alt="cart"
              />
            </div>
          </div>
        </div>
        <hr className={classes.HrClass} />
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    entries: state.cartReducer.entries
  };
};
export default connect(mapStateToProps)(withRouter(toolbar));
