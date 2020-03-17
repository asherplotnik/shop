import React from "react";
import classes from "./PathLine.module.css";
import { NavLink } from "react-router-dom";
const PathLine = props => {
  const current = props.currentPath.map((pathElement, index) => {
    const link = "/" + pathElement.name + "?" + pathElement.search;
    return (
      <React.Fragment key={index}>
        <NavLink className={classes.PathCss} to={link} exact>
          {pathElement.search === ""
            ? pathElement.name.toUpperCase()
            : pathElement.search.toUpperCase()}
        </NavLink>
        <strong className={classes.Strong}>{" >> "}</strong>
      </React.Fragment>
    );
  });
  return current;
};

export default PathLine;
