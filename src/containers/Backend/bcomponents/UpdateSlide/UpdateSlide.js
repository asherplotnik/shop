import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import classes from "./UpdateSlide.module.css";
import MyButton from "../../../../components/UI/Button/Button";
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
    if (formData.get("firstImage").name.trim() !== "") {
      setLoadingSlide(true);
      formData.append("mainTitle", 0);
      axios
        .post(serverAddress + "admin/uploadSlideImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setLoadingSlide(true);
          axios.get(serverAddress + "api/getSlideImages").then((res) => {
            setSlideList(res.data);
            setLoadingSlide(false);
          });
          onSetAddNewImagePressed();
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
    if (formData.get("firstImage").name.trim() !== "") {
      formData.append("mainTitle", rowId);
      setLoadingSlide(true);
      axios
        .post(serverAddress + "admin/uploadSlideImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setUpdateImagePressed();
          console.log(response.data);
          setLoadingSlide(true);
          axios.get(serverAddress + "api/getSlideImages").then((res) => {
            setSlideList(res.data);
            setLoadingSlide(false);
          });
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
    formData.append("mainTitle", rowId);
    setLoadingSlide(true);
    axios
      .delete(serverAddress + "admin/deleteSlideImage/" + rowId, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setLoadingSlide(true);
        axios.get(serverAddress + "api/getSlideImages").then((res) => {
          setSlideList(res.data);
          setLoadingSlide(false);
        });
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
              src={row.original}
              alt={row.original}
            />
            <p>{row.original}</p>
          </div>
          <div>
            <MyButton
              btnType="update"
              clicked={() => onUpdateImagePressed(row.id)}
            >
              UPDATE IMAGE
            </MyButton>
            {"\u00A0"} {"\u00A0"}
            <MyButton btnType="delete" clicked={(event) => onRemoveImage(event, row.id)}>
              Remove
            </MyButton>
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
                    name="firstImage"
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
                    name="firstImage"
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
          <MyButton clicked={onSetAddNewImagePressed} btnType="add">
            ADD NEW IMAGE
          </MyButton>
        </div>
        {listEl}
      </div>
    );
  }
  useEffect(() => {
    setLoadingSlide(true);
    axios.get(serverAddress + "api/getSlideImages").then((response) => {
      console.log(response.data);
      setSlideList(response.data);
      setLoadingSlide(false);
    });
  }, []);
  return viewPage;
};

export default UpdateSlide;
