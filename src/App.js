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
import Footer from "./components/Navigation/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/backend" exact component={Backend} />
          <Route path="/backend/collections" exact component={Backend} />
          <Route path="/backend/items" exact component={Backend} />
          <Route path="/backend/stock" exact component={Backend} />
          <Route path="/backend/users" exact component={Backend} />
        </Switch>
        <Switch>
          <Layout>
            <Route path="/" exact component={Home} />
            <Route path="/collections" exact component={Collections} />
            <Route path="/trending" exact component={Trending} />
            <Route path="/about" exact component={About} />
            <Route path="/items" exact component={Items} />
            <Route path="/product" exact component={Product} />
            <Footer />
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
