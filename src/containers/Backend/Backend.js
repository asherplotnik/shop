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
        <Switch>
          <BLayout>
            <Route path="/backend" exact component={BHome} />
            <Route path="/backend/collections" component={BCollections} />
            <Route path="/backend/items" component={BItems} />
            <Route path="/backend/stock" component={BStock} />
            <Route path="/backend/users" component={BUsers} />
            <Route path="/backend/orders" component={BOrders} />
          </BLayout>
        </Switch>
      </div>
    );
  }
}

export default Backend;
