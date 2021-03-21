import React, { Component } from "react";
import classes from "./UpdateCollectionForm.module.css";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
class AddForm extends Component {
  onUpdateCollecionForm = async (e) => {
    e.preventDefault();
    const updateCollecionForm = document.querySelector("#updateCollecionForm");
    const formData = new FormData(updateCollecionForm);
    formData.append("id", this.props.updateState.pressedRecordId);
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
        this.props.updateForm();
      })
      .catch((error) => {
        alert(error);
        this.props.updateForm();
      });
  };

  render() {
    return (
      <div className={classes.FormDiv} style={{ display: this.props.update }}>
        <form id="updateCollecionForm" onSubmit={this.onUpdateCollecionForm}>
          <ul className={classes.FormList}>
            <label className={classes.Font}>UPDATE COLLECTION :</label>
            <br></br>
            <br></br>
            <li>
              <label htmlFor="collName">COLLECTION'S NAME:</label>
            </li>
            <li>
              <input
                type="text"
                id="collName"
                name="mainTitle"
                defaultValue={this.props.updateState.pressedRecordName}
              />
            </li>
            <li style={{ opacity: " 0 " }}>space</li>
            <li>
              <label htmlFor="collDesc">COLLECTION'S DESCRIPTION:</label>
            </li>
            <li>
              <input
                type="text"
                id="collDesc"
                name="mainTitleT"
                size="30"
                defaultValue={this.props.updateState.pressedRecordDesc}
              />
            </li>
            <li style={{ opacity: " 0 " }}>space</li>
            <li>
              <label htmlFor="uploadFile">CHANGE IMAGE FILE:</label>
            </li>
            <li>
              <input id="uploadFile" type="file" name="firstImage" />
            </li>
            <li style={{ opacity: " 0 " }}>space</li>
            <li>
              <input type="submit" value="Submit" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default AddForm;
