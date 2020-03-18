import React, { useState } from "react";
import classes from "./bulkForm.module.css";
const BulkForm = props => {
  const checkValidity = () => {
    if (document.getElementById("bulkFile").value.slice(-5) === ".xlsx") {
      setFileUploaded(prevState => {
        return { fileUploaded: !prevState.fileUploaded };
      });
    } else {
      alert("PLEASE ENTER ONLY XLSX FILE FORMAT!");
      document.querySelector("#bulkForm").reset();
    }
  };
  const [fileUploaded, setFileUploaded] = useState(0);
  return (
    <form id="bulkForm" onSubmit={props.bulkConfirmed}>
      <div id="testD" className={classes.Font}>
        SELECT FILE TO UPLOAD:
      </div>
      <br></br>
      <div>
        <input
          className={classes.FontInput}
          type="file"
          name="bulkFile"
          id="bulkFile"
          onChange={checkValidity}
        />
      </div>
      <div>
        <p>Instructions: only excel file with the following columns: </p>
        <p>
          CODE , COLLECTION , DESCRIPTION , SIZE , PRICE , TYPE , IMAGE , IMAGE2{" "}
        </p>
        <img
          style={{ border: "solid 1px black", width: "95%" }}
          src="http://localhost:9000/images/bulk.jpg"
          alt="bulk"
        />{" "}
        <br></br> <br></br>
        <input
          className={classes.Font}
          name="bulk"
          value="SUBMIT"
          disabled={!fileUploaded}
          type="submit"
        />
      </div>
    </form>
  );
};

export default BulkForm;
