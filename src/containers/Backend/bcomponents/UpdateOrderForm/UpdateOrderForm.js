import React, { useEffect, useState } from "react";
import classes from "./UpdateOrderForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { MenuItem, TextField } from "@material-ui/core";

const UpdateOrderForm = (props) => {
  const [state, setState] = useState();
   
  useEffect(() => {
      setState(props);
  }, [props]);

  const handleWiredate = (e) => {
    let temp = {...state};
    temp.wiredate = e.target.value;
    setState(temp);
  };

  const handleAcc = (e)=>{
    let temp = {...state};
    temp.acc = e.target.value;
    setState(temp);
  }

  const handleStatus = (e)=>{
    let temp = {...state};
    temp.status = e.target.value;
    setState(temp);
  }

  const handleAddress = (e)=>{
    let temp = {...state};
    temp.address = e.target.value;
    setState(temp);
  }
  const handleTracking = (e)=>{
    let temp = {...state};
    temp.tracking = e.target.value;
    setState(temp);
  }


  return (
    <div className={classes.UpdateOrderForm}>
      <form id="orderupdate" onSubmit={props.update}>
        <div className={classes.Font}>UPDATE ORDER DETAILS</div>
        <ul className={classes.FormList}>
          <li key="address">
            {/* <label htmlFor="address">ADDRESS: </label>
            <textarea
              style={{ resize: "none" }}
              rows="4"
              cols="30"
              name="shipping"
              defaultValue={props.address}
              required
            /> */}
            <TextField
                  variant="outlined"
                  multiline
                  rows={2}
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
          <li key="wiredate">
            {/* <label htmlFor="wiredate">PAYMENT DATE: </label>
            <input
              type="datetime-local"
              name="wiredate"
              defaultValue={props.wiredate}
              required
            /> */}
            <TextField
                  variant="outlined"
                  margin="normal"
                  value={state?.wiredate || ""}
                  onChange={handleWiredate}
                  fullWidth
                  label="WIRE DATE:"
                  name="wiredate"
                  type="datetime-local"
                  autoFocus
                />
          </li>
          <li key="acc">
            {/* <label htmlFor="acc">ACC: </label>
            <input type="text" name="acc" defaultValue={props.acc} required /> */}
            <TextField
                  variant="outlined"
                  margin="normal"
                  value={state?.acc || ""}
                  onChange={handleAcc}
                  fullWidth
                  label="ACC:"
                  name="acc"
                  type="text"
                  autoFocus
                />
          </li>
          <li key="status">
            {/* <label htmlFor="status">STATUS: </label>
            <select name="status" value={statusState} onChange={handleStatus}>
              <option key="1">wait approve cc payment</option>
              <option key="2">wait approve bank transfer</option>
              <option key="3">confirmed payment</option>
              <option key="4">special issue</option>
              <option key="5">shipped</option>
              <option key="6">canceled</option>
            </select> */}
            <TextField
                  variant="outlined"
                  select
                  margin="normal"
                  value={state?.status || "wait approve cc payment"}
                  onChange={handleStatus}
                  fullWidth
                  label="STATUS:"
                  name="status"
                  type="text"
                  autoFocus
            >
              <MenuItem key="1" value="wait approve cc payment">wait approve cc payment</MenuItem>
              <MenuItem key="2" value="wait approve bank transfer">wait approve bank transfer</MenuItem>
              <MenuItem key="3" value="confirmed payment">confirmed payment</MenuItem>
              <MenuItem key="4" value="special issue">special issue</MenuItem>
              <MenuItem key="5" value="shipped">shipped</MenuItem>
              <MenuItem key="6" value="canceled">canceled</MenuItem>
            </TextField>
          </li>
          <li key="tracking">
            {/* <label htmlFor="tracking">TRACKING No: </label>
            <input type="text" name="tracking" defaultValue={props.tracking} /> */}
            <TextField
                  variant="outlined"
                  margin="normal"
                  value={state?.tracking || ""}
                  onChange={handleTracking}
                  fullWidth
                  label="TRACKING No:"
                  name="tracking"
                  type="text"
                  autoFocus
                />
          </li>
          <li key="submit">
            <MyButton type="submit" btnType="continue">SUBMIT</MyButton>
            <MyButton type="button" clicked={props.modalClosed} btnType="cancel">
              CANCEL
            </MyButton>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
