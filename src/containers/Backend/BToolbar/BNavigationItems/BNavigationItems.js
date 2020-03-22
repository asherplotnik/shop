import React from "react";
import classes from "./BNavigationItems.module.css";
import NavigationItem from "../../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem";
const bNavigationItems = props => (
  <ul className={classes.BNavigationItems}>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem link="/backend" exact>
        HOME
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem link="/backend/collections" exact>
        COLLECTIONS
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem link="/backend/items" exact>
        ITEMS
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem link="/backend/stock" exact>
        STOCK
      </NavigationItem>{" "}
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem link="/backend/users" exact>
        USERS
      </NavigationItem>
    </div>
  </ul>
);

export default bNavigationItems;
