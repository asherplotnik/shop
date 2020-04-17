import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import classes from "./UpdateSlide.module.css";
import Button from "../../../../components/UI/Button/Button";
import Spinner from "../../../../components/UI/Spinner/Spinner";
const UpdateSlide = () => {
  let [slideList, setSlideList] = useState([]);
  let [addNewImgPressed, setAddNewImagePressed] = useState(false);
  let [loadingSlide, setLoadingSlide] = useState(false);
  const onSetAddNewImagePressed = () => {
    setAddNewImagePressed(!addNewImgPressed);
  };
  const onSetImgSelected = (event) => {
    if (event.target.files.length > 0) {
      const newFileName = event.target.files[0].name;
      let formData = new FormData();
      formData.append("imageFile", event.target.files[0]);
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
          if (response.data !== "no file sent") {
            console.log(response.data);
            let t = response.data;
            setSlideList([...t]);
            setLoadingSlide(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const updateSlideList = (event, rowId) => {
    if (event.target.files.length > 0) {
      const newFileName = event.target.files[0].name;
      let formData = new FormData();
      formData.append("imageFile", event.target.files[0]);
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
          if (response.data !== "no file sent") {
            console.log(response.data);
            let t = response.data;
            setSlideList([...t]);
            setLoadingSlide(false);
          }
        })
        .catch((err) => console.log(err));
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
              src={serverAddress + "images/" + row.original}
              alt={serverAddress + "images/" + row.original}
            />
            <p>{row.original}</p>
          </div>
          <div>
            <input
              name={"image" + row.id}
              id={"image" + row.id}
              type="file"
              className={classes.CustomFileInput}
              onChange={(event) => updateSlideList(event, row.id)}
            />
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
        <div className={classes.AddImgDiv}>
          <Button clicked={onSetAddNewImagePressed} btnType="GotoCart">
            ADD NEW IMAGE
          </Button>
          <div
            className={
              addNewImgPressed
                ? classes.AddImgInputShow
                : classes.AddImgInputHide
            }
          >
            <input
              id="addImage"
              name="addImage"
              type="file"
              className={classes.CustomInput}
              onChange={onSetImgSelected}
            />
          </div>
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
