import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../../components/Navigation/Footer/Footer";
import axios from "axios";
import { serverAddress } from "../../assets/helper";
import Spinner from "../../components/UI/Spinner/Spinner";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    loadingFooter: true,
    footerContent: null,
  };

  fetchFooterData = () => {
    axios.get(serverAddress + "api/getAboutUs").then((res) => {
      this.setState({ footerContent: res.data[1] });
      this.setState({ loadingFooter: false });
    });
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  componentDidMount() {
    this.fetchFooterData();
  }
  render() {
    let footer = <Spinner />;
    if (!this.state.loadingFooter) {
      footer = <Footer content={this.state.footerContent} />;
    }
    return (
      <div className={classes.Trans} style={{ textAlign: "center" }}>
        <div className={classes.Layout}>
          <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
          <main className={classes.Content}>{this.props.children}</main>
          {footer}
        </div>
      </div>
    );
  }
}
export default Layout;
