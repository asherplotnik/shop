import React, { useEffect, useState } from "react";
import Logo from "../../UI/Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import cart from "../../../assets/images/cart.png";
import cart2 from "../../../assets/images/cart2.png";
import engImage from "../../../assets/images/eng.png";
import thaiImage from "../../../assets/images/thai.png";
import { Tooltip } from "@material-ui/core";
import { dic } from "../../../assets/helper";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import IconButton from "@material-ui/core/IconButton";

const Toolbar = (props) => {
  const [showBackend, setShowBackend] = useState(false);
  useEffect(() => {
    console.log(props.user);
    if (props.user && props.user.level === "admin") {
      setShowBackend(true);
    } else {
      setShowBackend(false);
    }
  }, [props.user]);
  if (localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", props.lang);
  } else {
    props.setLang(localStorage.getItem("lang"));
  }

  const onPressedCart = () => {
    props.history.push("/shoppingcart");
  };

  const onPressedLogo = () => {
    props.history.push("/");
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
            <div className={classes.Logo} onClick={onPressedLogo}>
              <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
              <NavigationItems
                lang={props.lang}
                showBackend={showBackend && props.token !== null}
                showAccount={props.token !== null}
              />
            </nav>
          </div>
          <div style={{ display: "flex" }}>
            <div className={classes.Flag} onClick={onChangeLangPressed}>
              <Tooltip title={dic.switchLanguage[props.lang]}>
                <img
                  style={{ width: "40px" }}
                  src={props.lang === "eng" ? engImage : thaiImage}
                  alt={"language"}
                />
              </Tooltip>
            </div>
            <div style={{ width: "150px", cursor: "pointer" , fontSize:"17px"}}>
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
                <IconButton color="primary" aria-label="to shopping cart">
                  <ShoppingCartIcon fontSize="large" />
                </IconButton>
              </div>
              <div onClick={onPressedCart} className={classes.Cart}>
                <IconButton color="primary" aria-label="to shopping cart">
                  <ShoppingCartOutlinedIcon fontSize="large" />
                </IconButton>
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
