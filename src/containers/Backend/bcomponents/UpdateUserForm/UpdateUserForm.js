import React, { useEffect, useState } from "react";
import classes from "./UpdateUserForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { MenuItem, TextField } from "@material-ui/core";

const UpdateUserForm = (props) => {
  const [state, setState] = useState(props.level);
  useEffect(() => {
    if (props) {
      setState(props);
    }
  }, [props.level]);
  
  const handleLevel = (e) => {
    let temp = {...state};
    temp.level = e.target.value;
    setState(temp);
  };

  const handleName = (e)=>{
    let temp = {...state};
    temp.username = e.target.value;
    setState(temp);
  }

  const handlePhone = (e)=>{
    let temp = {...state};
    temp.phone = e.target.value;
    setState(temp);
  }

  const handleAddress = (e)=>{
    let temp = {...state};
    temp.address = e.target.value;
    setState(temp);
  }


  
  return (
    <div className={classes.UpdateUserForm}>
      <form id="userupdate" onSubmit={props.update}>
        <div className={classes.Font}>UPDATE USER DETAILS</div>
        <ul className={classes.FormList}>
          <li key="username">
            <TextField
                  variant="outlined"
                  margin="normal"
                  value={state?.username || ""}
                  onChange={handleName}
                  fullWidth
                  label="USERNAME:"
                  name="username"
                  type="text"
                  autoFocus
                />
          </li>
          <li key="address">
            <TextField
                  variant="outlined"
                  margin="normal"
                  value={state?.address || ""}
                  onChange={handleAddress}
                  fullWidth
                  label="ADDRESS:"
                  name="address"
                  type="text"
                  autoFocus
                />
          </li>
          <li key="phone">
            <TextField
                  variant="outlined"
                  margin="normal"
                  value={state?.phone || ""}
                  onChange={handlePhone}
                  fullWidth
                  label="PHONE:"
                  name="phone"
                  type="text"
                  autoFocus
                />
          </li>
          <li key="level">
            <TextField
                  variant="outlined"
                  select
                  margin="normal"
                  value={state?.level || "normal"}
                  onChange={handleLevel}
                  fullWidth
                  label="LEVEL:"
                  name="level"
                  type="text"
                  autoFocus
            >
              <MenuItem key="1" value="normal">NORMAL</MenuItem>
              <MenuItem key="2" value="admin">ADMIN</MenuItem>
            </TextField>
          </li>
          <li key="submit">
            <MyButton btnType="continue" type="submit">SUBMIT</MyButton>
            <MyButton btnType="cancel" clicked={props.modalClosed}>
              CANCEL
            </MyButton>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default UpdateUserForm;
