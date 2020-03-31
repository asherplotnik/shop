import React, { Component } from "react";
import classes from "./BLayout.module.css";
import BToolbar from "../../BToolbar/BToolbar";
class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <BToolbar />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
export default Layout;
