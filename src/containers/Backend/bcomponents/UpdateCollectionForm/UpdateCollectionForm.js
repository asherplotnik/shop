import React, { useEffect, useState } from "react";
import classes from "./UpdateCollectionForm.module.css";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import MyButton from "../../../../components/UI/Button/Button";
import { TextField } from "@material-ui/core";
const AddForm =(props)=> {
  const [uploaded,setUploaded] = useState(null);
  const [pressedRecordName, setPressedRecordName] = useState();
  const [pressedRecordDesc, setPressedRecordDesk] = useState();
  useEffect(()=>{
    setPressedRecordDesk(props.updateState.pressedRecordDesc);
    setPressedRecordName(props.updateState.pressedRecordName);
  },[props.updateState])
  const handleDesc = (e)=>{
    setPressedRecordDesk(e.target.value);
  }
  const handleName = (e)=>{
    setPressedRecordName(e.target.value);
  }
  const onUploaded = (e) => {
    setUploaded(e.target.value);
  }
  const onUpdateCollecionForm = async (e) => {
    e.preventDefault();
    const updateCollecionForm = document.querySelector("#updateCollecionForm");
    const formData = new FormData(updateCollecionForm);
    formData.append("id", props.updateState.pressedRecordId);
    axios
      .post(serverAddress + "admin/updateCollection", formData, {
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
        props.updateForm();
      })
      .catch((error) => {
        alert(error);
        props.updateForm();
      });
  };


    return (
      <div className={classes.FormDiv} style={{ display: props.update }}>
        <form id="updateCollecionForm" onSubmit={onUpdateCollecionForm}>
          <ul className={classes.FormList}>
            <label className={classes.Font}>UPDATE COLLECTION :</label>
            <br></br>
            <br></br>
            <li>
              <TextField
                  className={classes.TextField}
                  variant="outlined"
                  margin="normal"
                  value={pressedRecordName}
                  onChange={handleName}
                  fullWidth
                  label="ENTER COLLECTION'S NAME:"
                  name="mainTitle"
                  id="collName"
                  type="text"
                  autoFocus
                />
            </li>
            <li>
            <TextField
                  className={classes.TextField}
                  variant="outlined"
                  margin="normal"
                  value={pressedRecordDesc}
                  onChange={handleDesc}
                  fullWidth
                  label="ENTER COLLECTION'S DESCRIPTION:"
                  name="mainTitleT"
                  id="collDesc"
                  type="text"
                  autoFocus
                />
            </li>
            <li style={{ opacity: " 0 " }}>space</li>
            <li>
              {/* <label htmlFor="uploadFile">CHANGE IMAGE FILE:</label> */}
            </li>
            <li>
            <MyButton btnType={uploaded ? "uploaded" : "upload"} component="label">
                UPDATE IMAGE FILE:
                <input
                  type="file"
                  hidden
                  name="firstImage"
                  type="file"
                  id="uploadFile"
                  onChange={onUploaded}
                />
             </MyButton>
            </li>
            <li style={{ opacity: " 0 " }}>space</li>
            <li>
              <MyButton type="submit" btnType="continue" >SUBMIT</MyButton>
            </li>
          </ul>
        </form>
      </div>
    );
 
}

export default AddForm;
