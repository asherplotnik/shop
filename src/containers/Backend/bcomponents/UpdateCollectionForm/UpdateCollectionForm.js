import React, { Component } from "react";
import classes from "./UpdateCollectionForm.module.css";
import axios from "axios";
class AddForm extends Component {
  onUpdateCollecionForm = async e => {
    e.preventDefault();
    const updateCollecionForm = document.querySelector("#updateCollecionForm");
    const formData = new FormData(updateCollecionForm);
    formData.append("collectionId", this.props.updateState.pressedRecordId);
    formData.append("collPrev", this.props.updateState.pressedRecordName);
    axios
      .post("http://localhost:9000/API/updateCollectionForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "collection exists already") {
          alert(response.data);
        }
        this.props.updateForm();
      })
      .catch(error => {
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
                name="collectionName"
                defaultValue={this.props.updateState.pressedRecordName}
              />
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
            <li>
              <label htmlFor="collDesc">COLLECTION'S DESCRIPTION:</label>
            </li>
            <li>
              <input
                type="text"
                id="collDesc"
                name="collectionDesc"
                size="30"
                defaultValue={this.props.updateState.pressedRecordDesc}
              />
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
            <li>
              <label htmlFor="uploadFile">CHANGE IMAGE FILE:</label>
            </li>
            <li>
              <input id="uploadFile" type="file" name="image" />
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
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
