import React from "react";
import Logo from "../../UI/Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const toolbar = props => (
  <React.Fragment>
    <header className={classes.HeaderClass}>
      <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
          <NavigationItems />
        </nav>
      </div>
      <hr className={classes.HrClass} />
    </header>
  </React.Fragment>
);

export default toolbar;
