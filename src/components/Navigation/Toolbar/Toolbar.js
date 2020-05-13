import React from "react";
import Logo from "../../UI/Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { gc } from "../../../assets/helper";
const Toolbar = (props) => {
  const dic = {
    login: { eng: "LOGIN", thai: "เข้าสู่ระบบ" },
    logout: { eng: "LOGOUT", thai: "ออกจากระบบ" },
  };
  if (localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", props.lang);
  } else {
    props.setLang(localStorage.getItem("lang"));
  }

  const onPressedCart = () => {
    props.history.push("/shoppingcart");
  };

  const onChangeLangPressed = () => {
    props.setLang(props.lang === "thai" ? "eng" : "thai");
    if (localStorage.getItem("lang") === "thai") {
      localStorage.setItem("lang", "eng");
    } else {
      localStorage.setItem("lang", "thai");
    }
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
                lang={props.lang}
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
            <div className={classes.Flag} onClick={onChangeLangPressed}>
              <img
                style={{ width: "40px" }}
                src={
                  process.env.PUBLIC_URL +
                  "static/images/" +
                  props.lang +
                  ".png"
                }
                alt={""}
              />
            </div>
            <div style={{ width: "150px", cursor: "pointer" }}>
              <p onClick={onPressedLogin} className={classes.PLogin}>
                {props.token === null
                  ? dic.login[props.lang]
                  : dic.logout[props.lang]}
              </p>
            </div>
            <div
              onClick={onPressedCart}
              className={[showCart, classes.DesktopOnly].join(" ")}
            >
              <div onClick={onPressedCart} className={classes.Cart2}>
                <img
                  onClick={onPressedCart}
                  src={gc + "cart2.png"}
                  alt="cart"
                />
              </div>
              <div onClick={onPressedCart} className={classes.Cart}>
                <img onClick={onPressedCart} src={gc + "cart.png"} alt="cart" />
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
    lang: state.langReducer.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    setLang: (passedLang) => dispatch(actions.changeLang(passedLang)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Toolbar));
