import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BCollections from "./bcomponents/BCollections/BCollections";
import BItems from "./bcomponents/BItems/BItems";
import BStock from "./bcomponents/BStock/BStock";
import BUsers from "./bcomponents/BUsers/BUsers";
import BLayout from "./bcomponents/BLayout/BLayout";
import BHome from "./bcomponents/BHome/BHome";
class Backend extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <BLayout>
            <Route path="/backend" exact component={BHome} />
            <Route path="/backend/collections" component={BCollections} />
            <Route path="/backend/items" component={BItems} />
            <Route path="/backend/stock" component={BStock} />
            <Route path="/backend/users" component={BUsers} />
          </BLayout>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Backend;
