import React from "react";
import classes from "./BNavigationItems.module.css";
import NavigationItem from "../../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem";
const bNavigationItems = (props) => (
  <ul className={classes.BNavigationItems}>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/backend" exact>
        HOME
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/backend/collections">
        COLLECTIONS
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/backend/items">
        ITEMS
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/backend/stock">
        STOCK
      </NavigationItem>{" "}
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/backend/users">
        USERS
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/backend/orders">
        ORDERS
      </NavigationItem>
    </div>
    <div style={{ margin: "0px 20px 0px 20px" }}>
      <NavigationItem show={true} link="/" exact>
        SHOP
      </NavigationItem>
    </div>
  </ul>
);

export default bNavigationItems;
