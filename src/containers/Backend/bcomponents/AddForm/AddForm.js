import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import classes from "./AddForm.module.css";
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
        this.props.addForm();
      })
      .catch(error => {
        alert(error);
        this.props.addForm();
      });
  };

  render() {
    return (
      <div className={classes.Control}>
        <div className={classes.AddButton}>
          <Button
            className={classes.Add}
            clicked={this.props.onAddInputHanadler}
            btnType="Success"
            disabled={this.props.updateToggle}
          >
            ADD COLLECTION
          </Button>
        </div>
        <div className={classes.FormDiv} style={{ display: this.props.input }}>
          <form id="addCollecionForm" onSubmit={this.onAddCollecionForm}>
            <ul className={classes.FormList}>
              <label className={classes.Font}>ADD COLLECTION :</label>
              <br></br>
              <br></br>
              <li>
                <label htmlFor="collName">ENTER COLLECTION'S NAME:</label>
              </li>
              <li>
                <input type="text" id="collName" name="collectionName" />
              </li>
              <li style={{ opacity: " 0% " }}>space</li>
              <li>
                <label htmlFor="collName">
                  ENTER COLLECTION'S DESCRIPTION:
                </label>
              </li>
              <li>
                <input
                  type="text"
                  id="collDesc"
                  name="collectionDesc"
                  size="30"
                />
              </li>
              <li style={{ opacity: " 0% " }}>space</li>
              <li>
                <label htmlFor="uploadFile">ADD IMAGE FILE:</label>
              </li>
              <li>
                <input id="uploadFile" type="file" name="image" required />
              </li>
              <li style={{ opacity: " 0% " }}>space</li>
              <li>
                <input type="submit" value="Submit" />
              </li>
            </ul>
          </form>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AddForm;
