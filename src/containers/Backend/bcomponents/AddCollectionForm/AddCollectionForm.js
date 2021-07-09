import React, { Component } from "react";
import MyButton from "../../../../components/UI/Button/Button";
import classes from "./AddCollectionForm.module.css";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";

class AddForm extends Component {
  onAddCollecionForm = async (e) => {
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
        this.props.addForm();
      })
      .catch((error) => {
        alert(error);
        this.props.addForm();
      });
  };

  render() {
    return (
      <div className={classes.Control}>
        <div className={classes.AddButton}>
          <MyButton
            className={classes.Add}
            clicked={this.props.onAddInputHanadler}
            btnType="add"
            disabled={this.props.updateToggle}
          >
            ADD COLLECTION
          </MyButton>
        </div>
        <div className={classes.FormDiv} style={{ display: this.props.input }}>
          <form id="addCollecionForm" onSubmit={this.onAddCollecionForm}>
            <ul className={classes.FormList}>
              <label className={classes.Font}>ADD COLLECTION :</label>
              <br></br>
              <br></br>
              <li>
                <label htmlFor="addCollName">ENTER COLLECTION'S NAME:</label>
              </li>
              <li>
                <input type="text" id="addCollName" name="mainTitle" />
              </li>
              <li style={{ opacity: " 0 " }}>space</li>
              <li>
                <label htmlFor="addCollDesc">
                  ENTER COLLECTION'S DESCRIPTION:
                </label>
              </li>
              <li>
                <input
                  type="text"
                  id="addCollDesc"
                  name="mainTitleT"
                  size="30"
                />
              </li>
              <li style={{ opacity: " 0 " }}>space</li>
              <li>
                <label htmlFor="addUploadFile">ADD IMAGE FILE:</label>
              </li>
              <li>
                <input
                  id="addUploadFile"
                  type="file"
                  name="firstImage"
                  required
                />
              </li>
              <li style={{ opacity: " 0 " }}>space</li>
              <li>
                <MyButton btnType="continue" type="submit">SUBMIT</MyButton>
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
