import React, { useState } from "react";
import MyButton from "../../../../components/UI/Button/Button";
import classes from "./AddCollectionForm.module.css";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import { TextField, Typography } from "@material-ui/core";

const AddForm =(props) => {
  const [uploaded,setUploaded] = useState(null);

  const onUploaded = (e) => {
    setUploaded(e.target.value);
  }
  const onAddCollecionForm = async (e) => {
    e.preventDefault();

    const addCollecionForm = document.querySelector("#addCollecionForm");
    const formData = new FormData(addCollecionForm);
    axios
      .post(serverAddress + "admin/addCollection", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "collection exists already") {
          alert(response.data);
        }
        props.addForm();
      })
      .catch((error) => {
        alert(error);
        props.addForm();
      });
  };

    return (
      <div className={classes.Control}>
        <div className={classes.AddButton}>
          <MyButton
            className={classes.Add}
            clicked={props.onAddInputHanadler}
            btnType="add"
            disabled={props.updateToggle}
          >
            ADD COLLECTION
          </MyButton>
        </div>
        <div className={classes.FormDiv} style={{ display: props.input }}>
          <form id="addCollecionForm" onSubmit={onAddCollecionForm}>
            <ul className={classes.FormList}>
              <li>
                <Typography component="h1" variant="h6">
                  ADD COLLECTION :
                </Typography>
              </li>
              <br></br>
              <li>
                <TextField
                  className={classes.TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ENTER COLLECTION'S NAME:"
                  name="mainTitle"
                  id="addCollName"
                  type="text"
                  autoFocus
                />
              </li>
              <li>
                <TextField
                  className={classes.TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ENTER COLLECTION'S DESCRIPTION:"
                  name="mainTitleT"
                  id="addCollDesc"
                  type="text"
                  autoFocus
                />
              </li>
              <br></br>
              <MyButton btnType={uploaded ? "uploaded" : "upload"} component="label">
                ADD IMAGE FILE:
                <input
                  type="file"
                  hidden
                  name="firstImage"
                  type="file"
                  id="addUploadFile"
                  onChange={onUploaded}
                  required
                />
              </MyButton>
              <li style={{ opacity: " 0 " }}>space</li>
              <li>
                <MyButton btnType="continue" type="submit">
                  SUBMIT
                </MyButton>
              </li>
            </ul>
          </form>
        </div>
        {props.children}
      </div>
    );
}

export default AddForm;
