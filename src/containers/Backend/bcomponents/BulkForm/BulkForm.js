import React, { useState } from "react";
import classes from "./bulkForm.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import { Typography } from "@material-ui/core";
const BulkForm = (props) => {
  const [ExcelfileUploaded, setExcelFileUploaded] = useState(0);
  const [ZipfileUploaded, setZipFileUploaded] = useState(0);
  const [uploaded1,setUploaded1] = useState(null);
  const [uploaded2,setUploaded2] = useState(null);
  const checkExcelValidity = (e) => {
    if (document.getElementById("bulkExcelFile").value.slice(-5) === ".xlsx") {
      setExcelFileUploaded((prevState) => {
        setUploaded1(e.target.value);
        return { ExcelfileUploaded: !prevState.ExcelfileUploaded };
      });
    } else {
      alert("PLEASE ENTER ONLY XLSX FILE FORMAT!");
      document.querySelector("#bulkForm").reset();
    }
  };

  const checkZipValidity = (e) => {
    if (document.getElementById("zipFile").value.slice(-4) === ".zip") {
      setZipFileUploaded((prevState) => {
        setUploaded2(e.target.value);
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
        <Typography variant="h5" component="h1">
          SELECT FILES TO UPLOAD:
        </Typography>
        <br></br>
        <div className={classes.ButtonDiv}>
            <MyButton btnType={uploaded1 ? "uploaded" : "upload"} component="label">
                UPLOAD EXCEL FILE:
                <input
                  type="file"
                  hidden
                  name="firstImage"
                  type="file"
                  onChange={checkExcelValidity}
                  id="bulkExcelFile"
                  required={props.title === "ADD PRODUCT" ? true : false}
                />
              </MyButton>
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
            <p>MAKE FILE NAMES AS EXAMPLE FOR PRIMARY IMAGE "P 0010a.jpg"</p>
            <p>MAKE FILE NAMES AS EXAMPLE FOR SECONDARY IMAGE "P 0010b.jpg"</p>
            <p>(ADD "a" OR "b" AT THE END OF THE FILE)</p>
          <div className={classes.ButtonDiv}>
            <MyButton btnType={uploaded2 ? "uploaded" : "upload"} component="label">
                UPLOAD ZIPPED IMAGES FILE:(.jpg ONLY)
                <input
                  type="file"
                  hidden
                  name="secondImage"
                  type="file"
                  onChange={checkZipValidity}
                  id="zipFile"
                  required={props.title === "ADD PRODUCT" ? true : false}
                />
              </MyButton>
          </div>
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
