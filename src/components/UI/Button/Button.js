import React from "react";
import classes from "./Button.module.css";
import { Button, makeStyles } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import EmailIcon from '@material-ui/icons/Email';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import BackupIcon from '@material-ui/icons/Backup';
const MyButton = props => {
  let icon;
  let variant;
  let color;
  switch (props.btnType) {
    case "cancel":
      icon = <CancelIcon />;
      variant = "contained";
      color="secondary";
      break;
    case "continue":
      icon = <CheckIcon />;
      variant = "contained";
      color="primary";
      break;
    case "signin":
      icon = <ExitToAppIcon />;
      variant = "outlined";
      color="primary";
      break;
    case "signup":
      icon = <AssignmentTurnedInOutlinedIcon />;
      variant = "outlined";
      color="primary";
      break;
    case "AddShoppingCartIcon": 
      icon = <AddShoppingCartIcon />;
      variant = "contained";
      color="primary";
      break;
    case "ShoppingCartIcon":
      icon = <ShoppingCartIcon />;
      variant = "outlined";
      color="primary";
      break;
    case "change":
      icon = <SwapHorizIcon />;
      variant = "outlined";
      color="secondary";
      break;
    case "delete":
      icon = <DeleteIcon />;
      variant = "contained";
      color="secondary";
      break;
    case "email":
      icon = <EmailIcon />;
      variant = "contained";
      color="primary";
      break;
    case "add":
      icon = <AddIcon />;
      variant = "contained";
      color="primary";
      break;
    case "file":
      icon = <InsertDriveFileIcon />;
      variant = "contained";
      color="primary";
      break;
    case "update":
      icon = <UpdateIcon />;
      variant = "contained";
      color="primary";
      break;
    case "upload":
      icon = <BackupIcon />;
      variant = "contained";
      color="default";
      break;
    case "uploaded":
      icon = <BackupIcon />;
      variant = "contained";
      color="primary";
      break;
  }
  return(
  <Button
    component={props.component}
    fullWidth = {props.fullWidth}
    m={10}
    variant={variant}
    startIcon={icon}
    color={color}
    type={props.type === "submit" ? props.type : "button"}
    disabled={props.disabled}
    onClick={props.clicked}
  >
    <div className={classes.ButtonDiv}>{props.children}</div>
  </Button>
);
  }

export default MyButton;
