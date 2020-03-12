import React, { Component } from "react";
import classes from "./UpdateForm.module.css";
import axios from "axios";
class AddForm extends Component {
  onAddCollecionForm = async e => {
    e.preventDefault();

    const addCollecionForm = document.querySelector("#addCollecionForm");
    const formData = new FormData(addCollecionForm);
    axios
      .post("http://localhost:9000/API/uploadCollectionForm", formData, {
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
        <form id="updateCollecionForm" onSubmit={this.onupdateCollecionForm}>
          <ul className={classes.FormList}>
            <li>
              <label htmlFor="collName">ENTER COLLECTION'S NAME:</label>
            </li>
            <li>
              <input type="text" id="collName" name="collectionName" />
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
            <li>
              <label htmlFor="collName">ENTER COLLECTION'S DESCRIPTION:</label>
            </li>
            <li>
              <input
                type="text"
                id="collDesc"
                name="collectionDesc"
                width="30"
              />
            </li>
            <li style={{ opacity: " 0% " }}>space</li>
            <li>
              <label htmlFor="uploadFile">ADD IMAGE FILE:</label>
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
