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
import { Route, Switch } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Auth from "./components/Auth/Auth";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/backend" component={Backend} />
          <Switch>
            <Layout>
              <Route path="/" exact component={Home} />
              <Route path="/collections" exact component={Collections} />
              <Route path="/trending" exact component={Trending} />
              <Route path="/about" exact component={About} />
              <Route path="/items" exact component={Items} />
              <Route path="/product" exact component={Product} />
              <Route path="/shoppingcart" exact component={ShoppingCart} />
              <Route path="/auth" exact component={Auth} />
            </Layout>
          </Switch>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);
