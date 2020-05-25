import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAddress, gc } from "../../../../assets/helper";
import classes from "./UpdateSlide.module.css";
import Button from "../../../../components/UI/Button/Button";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Modal from "../../../../components/UI/Modal/Modal";
const UpdateSlide = () => {
  let [slideList, setSlideList] = useState([]);
  let [rowId, setRowId] = useState(null);
  let [addNewImgPressed, setAddNewImagePressed] = useState(false);
  let [updateImgPressed, setUpdateImagePressed] = useState(false);
  let [loadingSlide, setLoadingSlide] = useState(false);
  const onSetAddNewImagePressed = () => {
    setAddNewImagePressed(!addNewImgPressed);
  };
  const onUpdateImagePressed = (rowId) => {
    setUpdateImagePressed(!updateImgPressed);
    setRowId(rowId);
  };

  const onUpdateOff = () => {
    setUpdateImagePressed(false);
  };
  const onSetImgSelected = (e) => {
    e.preventDefault();
    let formData = new FormData(document.querySelector("#addImageToSlide"));
    if (formData.get("imageFile").name.trim() !== "") {
      const newFileName = formData.get("imageFile").name;
      formData.append("original", newFileName);
      formData.append("action", "insert");
      setLoadingSlide(true);
      axios
        .post(serverAddress + "API/uploadSlideImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          onSetAddNewImagePressed();
          if (response.data !== "no file sent") {
            console.log(response.data);
            let t = response.data;
            setSlideList([...t]);
            setLoadingSlide(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("CHOOSE A FILE!");
      onSetAddNewImagePressed();
    }
  };

  const updateSlideList = (event) => {
    event.preventDefault();
    let formData = new FormData(document.querySelector("#updateImageToSlide"));
    if (formData.get("imageFile").name.trim() !== "") {
      const newFileName = formData.get("imageFile").name;
      formData.append("id", rowId);
      formData.append("original", newFileName);
      formData.append("action", "update");

      setLoadingSlide(true);
      axios
        .post(serverAddress + "API/uploadSlideImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setUpdateImagePressed();
          if (response.data !== "no file sent") {
            console.log(response.data);
            let t = response.data;
            setSlideList([...t]);
            setLoadingSlide(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("CHOOSE A FILE!");
      setUpdateImagePressed();
    }
  };

  const onRemoveImage = (event, rowId) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("id", rowId);
    formData.append("action", "delete");
    setLoadingSlide(true);
    axios
      .post(serverAddress + "API/uploadSlideImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        let t = response.data;
        setSlideList([...t]);
        setLoadingSlide(false);
      })
      .catch((err) => console.log(err));
  };
  let listEl = slideList.map((row) => {
    return (
      <div key={row.id}>
        <div className={classes.Row}>
          <div>
            <img
              className={classes.Img}
              src={gc + row.original}
              alt={gc + row.original}
            />
            <p>{row.original}</p>
          </div>
          <div>
            {/* <input
              name={"image" + row.id}
              id={"image" + row.id}
              type="file"
              className={classes.CustomFileInput}
              onChange={(event) => updateSlideList(event, row.id)}
            /> */}
            <Button
              btnType="SuccessSmall"
              clicked={() => onUpdateImagePressed(row.id)}
            >
              UPDATE IMAGE
            </Button>
          </div>
          <div style={{ marginLeft: "120px" }}>
            <button onClick={(event) => onRemoveImage(event, row.id)}>
              Remove
            </button>
          </div>
        </div>
        <hr className={classes.Hr}></hr>
      </div>
    );
  });
  let viewPage = <Spinner />;
  if (!loadingSlide) {
    viewPage = (
      <div className={classes.Scroll}>
        <Modal show={addNewImgPressed} modalClosed={onSetAddNewImagePressed}>
          <form id="addImageToSlide" onSubmit={onSetImgSelected}>
            <div className={classes.Font}>ADD IMAGE</div>
            <div>
              <ul className={classes.FormList}>
                <li>
                  <input
                    id="addImage"
                    name="imageFile"
                    type="file"
                    className={classes.CustomInput}
                  />
                </li>
                <li>
                  <br />
                </li>
                <li>
                  <label className={classes.Label} htmlFor="imageLink">
                    Enter Link:{" "}
                  </label>
                  <input
                    className={classes.Row}
                    name="imageLink"
                    type="text"
                    size="35"
                  />
                </li>
                <li>
                  <br />
                </li>
                <li>
                  <div style={{ textAlign: "center", width: "450px" }}>
                    <input type="submit" />
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </Modal>
        <Modal show={updateImgPressed} modalClosed={onUpdateOff}>
          <form id="updateImageToSlide" onSubmit={updateSlideList}>
            <div className={classes.Font}>UPDATE IMAGE</div>
            <div>
              <ul className={classes.FormList}>
                <li>
                  <input
                    id="updateImage"
                    name="imageFile"
                    type="file"
                    className={classes.CustomInput}
                  />
                </li>
                <li>
                  <br />
                </li>
                <li>
                  <label className={classes.Label} htmlFor="imageLink">
                    Enter Link:{" "}
                  </label>
                  <input
                    className={classes.Row}
                    name="imageLink"
                    type="text"
                    size="35"
                  />
                </li>
                <li>
                  <br />
                </li>
                <li>
                  <div style={{ textAlign: "center", width: "450px" }}>
                    <input type="submit" />
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </Modal>
        <div className={classes.AddImgDiv}>
          <Button clicked={onSetAddNewImagePressed} btnType="GotoCart">
            ADD NEW IMAGE
          </Button>
        </div>
        {listEl}
      </div>
    );
  }
  useEffect(() => {
    let sqlQuery = { sql: "SELECT * FROM slide" };
    setLoadingSlide(true);
    axios.post(serverAddress + "API/query", sqlQuery).then((response) => {
      setSlideList(response.data);
      setLoadingSlide(false);
    });
  }, []);
  return viewPage;
};

export default UpdateSlide;
