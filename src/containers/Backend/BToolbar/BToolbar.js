import React from "react";
import Logo from "../../../components/UI/Logo/Logo";
import classes from "./BToolbar.module.css";
import BNavigationItems from "./BNavigationItems/BNavigationItems";
import DrawerToggle from "../../../components/Navigation/SideDrawer//SideDrawer";
const toolbar = props => (
  <React.Fragment>
    <header>
      <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
          <BNavigationItems />
        </nav>
        <div className={classes.Tback}>ADMIN</div>
      </div>
      <hr className={classes.HrClass} />
    </header>
  </React.Fragment>
);

export default toolbar;
