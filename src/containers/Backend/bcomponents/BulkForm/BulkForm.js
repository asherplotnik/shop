import React, { useState } from "react";
import classes from "./bulkForm.module.css";
const BulkForm = props => {
  
  const [ExcelfileUploaded, setExcelFileUploaded] = useState(0);
  const [ZipfileUploaded, setZipFileUploaded] = useState(0);

  const checkExcelValidity = () => {
    if (document.getElementById("bulkExcelFile").value.slice(-5) === ".xlsx") {
      setExcelFileUploaded(prevState => {
        return { ExcelfileUploaded: !prevState.ExcelfileUploaded };
      });
    } else {
      alert("PLEASE ENTER ONLY XLSX FILE FORMAT!");
      document.querySelector("#bulkForm").reset();
    }
  };

  const checkZipValidity = () => {
    if (document.getElementById("zipFile").value.slice(-4) === ".zip") {
      setZipFileUploaded(prevState => {
        return { ZipfileUploaded: !prevState.ZipfileUploaded };
      });
    } else {
      alert("PLEASE ENTER ONLY ZIP FILE FORMAT!");
      document.querySelector("#bulkForm").reset();
    }
  };

  
  return (
    <form id="bulkForm" onSubmit={props.bulkConfirmed}>
      <div id="testD" className={classes.Font}>
        SELECT FILES TO UPLOAD:
      </div>
      <br></br>
      <div>
        <label for="bulkExcelFile" >EXCEL FILE:</label>
        <input
          className={classes.FontInput}
          type="file"
          name="bulkExcelFile"
          id="bulkExcelFile"
          onChange={checkExcelValidity}
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
        <br></br> 
        <br></br>
      </div>
      <div>
        <label for="zipFile" >ZIPPED IMAGE FOLDER FILE:(.jpg ONLY)y
        </label>
        <input
          className={classes.FontInput}
          type="file"
          name="zipFile"
          id="zipFile"
          onChange={checkZipValidity}
        />
      </div>
      <div>
        <p>Instructions: only excel file with the following columns: </p>
        <p>
          CODE , COLLECTION , DESCRIPTION , SIZE , PRICE , TYPE , IMAGE , IMAGE2{" "}
        </p>
        <input
          className={classes.Font}
          name="bulk"
          value="SUBMIT"
          disabled={!ExcelfileUploaded || !ZipfileUploaded}
          type="submit"
        />
      </div>
    </form>
  );
};

export default BulkForm;
