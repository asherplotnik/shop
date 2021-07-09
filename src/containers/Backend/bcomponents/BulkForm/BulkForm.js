import React, { useState } from "react";
import classes from "./bulkForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
const BulkForm = (props) => {
  const [ExcelfileUploaded, setExcelFileUploaded] = useState(0);
  const [ZipfileUploaded, setZipFileUploaded] = useState(0);

  const checkExcelValidity = () => {
    if (document.getElementById("bulkExcelFile").value.slice(-5) === ".xlsx") {
      setExcelFileUploaded((prevState) => {
        return { ExcelfileUploaded: !prevState.ExcelfileUploaded };
      });
    } else {
      alert("PLEASE ENTER ONLY XLSX FILE FORMAT!");
      document.querySelector("#bulkForm").reset();
    }
  };

  const checkZipValidity = () => {
    if (document.getElementById("zipFile").value.slice(-4) === ".zip") {
      setZipFileUploaded((prevState) => {
        return { ZipfileUploaded: !prevState.ZipfileUploaded };
      });
    } else {
      alert("PLEASE ENTER ONLY ZIP FILE FORMAT!");
      document.querySelector("#bulkForm").reset();
    }
  };

  return (
    <div>
      <form id="bulkForm" onSubmit={props.bulkConfirmed}>
        <div id="testD" className={classes.Font}>
          SELECT FILES TO UPLOAD:
        </div>
        <br></br>
        <div>
          <strong>
            <label htmlFor="bulkExcelFile">EXCEL FILE:</label>
            <input
              className={classes.FontInput}
              type="file"
              name="firstImage"
              id="bulkExcelFile"
              onChange={checkExcelValidity}
            />
          </strong>
        </div>
        <div>
          <p>Instructions: only excel file with the following columns: </p>
          <p>
            CODE , COLLECTION , DESCRIPTION , SIZE , PRICE , TYPE , IMAGE ,
            IMAGE2
          </p>
          <div className={classes.ImageDiv}>
            <img
              style={{ border: "solid 1px black", width: "95%" }}
              className={classes.Image}
              src="https://i.ibb.co/8XgT6Gw/bulk.jpg"
              alt="bulk"
            />
          </div>
          <br></br>
          <br></br>
        </div>
        <div>
          <strong>
            <p>MAKE FILE NAMES AS EXAMPLE FOR PRIMARY IMAGE "N 0025a.jpg"</p>
            <p>MAKE FILE NAMES AS EXAMPLE FOR SECONDARY IMAGE "N 0025b.jpg"</p>
            <p>(ADD "a" OR "b" AT THE END OF THE FILE)</p>

            <label htmlFor="zipFile">ZIPPED IMAGES FILE:(.jpg ONLY)</label>
            <input
              className={classes.FontInput}
              type="file"
              name="secondImage"
              id="zipFile"
              onChange={checkZipValidity}
            />
          </strong>
        </div>
        <div>
          <MyButton
            className={classes.Font}
            name="bulk"
            disabled={!ExcelfileUploaded || !ZipfileUploaded}
            type="submit"
            btnType="continue"
            >SUBMIT</MyButton>
          <span style={{ opacity: "0" }}>________</span>
          <MyButton
            className={classes.Font}
            type="button"
            btnType="cancel"
            clicked={props.modalClosed}
          >
            CANCEL
          </MyButton>
        </div>
      </form>
    </div>
  );
};
export default BulkForm;
