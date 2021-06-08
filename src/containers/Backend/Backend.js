import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BCollections from "./bcomponents/BCollections/BCollections";
import BItems from "./bcomponents/BItems/BItems";
import BStock from "./bcomponents/BStock/BStock";
import BUsers from "./bcomponents/BUsers/BUsers";
import BLayout from "./bcomponents/BLayout/BLayout";
import BHome from "./bcomponents/BHome/BHome";
import BOrders from "./bcomponents/BOrders/BOrders";
import classes from "./Backend.module.css";
class Backend extends Component {
  state = {};
  render() {
    return (
      <div className={classes.Trans}>
        <BLayout>
          <Switch>
            <Route path="/backend/home" component={BHome} exact />
            <Route path="/backend/collections" component={BCollections} exact />
            <Route path="/backend/items" component={BItems} exact />
            <Route path="/backend/stock" component={BStock} exact />
            <Route path="/backend/users" component={BUsers} exact />
            <Route path="/backend/orders" component={BOrders} exact />
          </Switch>
        </BLayout>
      </div>
    );
  }
}

export default Backend;
