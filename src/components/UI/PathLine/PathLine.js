import React from "react";
import classes from "./PathLine.module.css";
import { NavLink } from "react-router-dom";
const PathLine = (props) => {
  const current = props.currentPath.map((pathElement, index) => {
    const link = "/" + pathElement.name + "?" + pathElement.search;
    return (
      <React.Fragment key={index}>
        <NavLink className={classes.PathCss} to={link}>
          {pathElement.search === ""
            ? pathElement.name.toUpperCase()
            : pathElement.search.toUpperCase()}
        </NavLink>
        <span className={classes.Strong}>{" >> "}</span>
      </React.Fragment>
    );
  });
  return current;
};

export default PathLine;
