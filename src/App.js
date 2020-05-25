import React, { Component } from "react";
import classes from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import Home from "./components/Home/Home";
import Trending from "./components/Trending/Trending";
import Collections from "./components/Collections/Collections";
import About from "./components/About/About";
import Items from "./components/Items/Items";
import Product from "./components/Product/Product";
import Backend from "./containers/Backend/Backend";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import Checkout from "./components/Checkout/Checkout";
import ContactUs from "./components/ContactUs/ContactUs";
import Restricted from "./components/Restricted/Restricted";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let backend = Restricted;
    if (this.props.isAuth) {
      backend = Backend;
    }
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Switch>
            <Route path="/backend" component={backend} />
            <Switch>
              <Layout>
                <Route path="/" exact component={Home} />
                <Route path="/collections" component={Collections} />
                <Route path="/trending" component={Trending} />
                <Route path="/about" component={About} />
                <Route path="/items" component={Items} />
                <Route path="/product" component={Product} />
                <Route path="/profile" component={Profile} />
                <Route path="/shoppingcart" component={ShoppingCart} />
                <Route path="/auth" component={Auth} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/contactus" component={ContactUs} />
                <Route path="/restricted" component={Restricted} />
              </Layout>
            </Switch>
          </Switch>{" "}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth:
      state.authReducer.user === null
        ? false
        : state.authReducer.user.level === "admin"
        ? true
        : false,
    logedOut: state.authReducer.token === null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
