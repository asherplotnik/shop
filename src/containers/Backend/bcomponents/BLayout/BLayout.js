import React, { Component } from "react";
import classes from "./BLayout.module.css";
import BToolbar from "../../BToolbar/BToolbar";
class Layout extends Component {
  //   state = {
  //     showSideDrawer: false
  //   };
  //   sideDrawerClosedHandler = () => {
  //     this.setState({ showSideDrawer: false });
  //   };
  //   sideDrawerToggleHandler = () => {
  //     this.setState(prevState => {
  //       return { showSideDrawer: !prevState.showSideDrawer };
  //     });
  //   };
  render() {
    return (
      <React.Fragment>
        {/* <BToolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
       <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        /> */}
        <BToolbar />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
export default Layout;
