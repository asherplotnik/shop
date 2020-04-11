import React from "react";
import Logo from "../../UI/Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { serverAddress } from "../../../assets/helper";
const toolbar = (props) => {
  const onPressedCart = () => {
    props.history.push("/shoppingcart");
  };

  const onPressedLogin = () => {
    if (props.token !== null) {
      props.onLogout();
    }
    props.history.push("auth");
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
              <NavigationItems
                showBackend={
                  props.user === null
                    ? false
                    : props.user.level === "admin"
                    ? true
                    : false
                }
                showAccount={props.token !== null}
              />
            </nav>
          </div>
          <div style={{ display: "flex" }}>
            <p
              onClick={onPressedLogin}
              style={{ margin: "20px", cursor: "pointer" }}
            >
              {props.token === null ? "LOGIN" : "LOGOUT"}
            </p>
            <div
              onClick={onPressedCart}
              className={[showCart, classes.DesktopOnly].join(" ")}
            >
              <div onClick={onPressedCart} className={classes.Cart2}>
                <img
                  onClick={onPressedCart}
                  src={serverAddress + "/images/cart2.png"}
                  alt="cart"
                />
              </div>
              <div onClick={onPressedCart} className={classes.Cart}>
                <img
                  onClick={onPressedCart}
                  src={serverAddress + "/images/cart.png"}
                  alt="cart"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className={classes.HrClass} />
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    entries: state.cartReducer.entries,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(toolbar));
