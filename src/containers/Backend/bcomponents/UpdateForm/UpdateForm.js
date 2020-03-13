import React, { Component } from "react";
import classes from "./UpdateForm.module.css";
import axios from "axios";
class AddForm extends Component {
  onUpdateCollecionForm = async e => {
    e.preventDefault();

    const addCollecionForm = document.querySelector("#updateCollecionForm");
    const formData = new FormData(addCollecionForm);
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
              <input type="text" id="collName" name="collectionName" value={this.props.collState.pressedRecordName}/>
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
            <li>
              <label htmlFor="collName">COLLECTION'S DESCRIPTION:</label>
            </li>
            <li>
              <input
                type="text"
                id="collDesc"
                name="collectionDesc"
                value={this.props.collState.pressedRecordDesc}
              />
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
            <li>
              <label htmlFor="uploadFile">IMAGE FILE:</label>
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
