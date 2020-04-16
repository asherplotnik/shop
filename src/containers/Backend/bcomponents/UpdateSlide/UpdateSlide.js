import React, { useState } from "react";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import classes from "./UpdateSlide.module.css";
import Button from "../../../../components/UI/Button/Button";
import Spinner from "../../../../components/UI/Spinner/Spinner";
const UpdateSlide = (props) => {
  let [slideList, setSlideList] = useState(props.content);
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
      axios
        .post(serverAddress + "API/uploadSlideImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== "no file sent") {
            console.log(response.data);
            let t = [...slideList];
            t.push({ original: newFileName, thumbnail: newFileName });
            setSlideList([...t]);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const updateSlideHandler = () => {
    let formData = new FormData();
    formData.append("fileName", "slide.json");
    formData.append("content", JSON.stringify(slideList));
    setLoadingSlide(true);
    axios
      .post(serverAddress + "API/updateJson", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("updatejson...", response);
        axios
          .post(serverAddress + "API/queryJson", { sql: "slide.json" })
          .then((res) => {
            setSlideList(res.data);
            console.log(res);
            setLoadingSlide(false);
          });
      })
      .catch((err) => console.log(err));
  };

  const updateSlideList = (event, rowIndex) => {
    if (event.target.files.length > 0) {
      const newFileName = event.target.files[0].name;
      let formData = new FormData();
      formData.append("imageFile", event.target.files[0]);
      axios
        .post(serverAddress + "API/uploadSlideImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== "no file sent") {
            console.log(response.data);

            let t = [...slideList];
            t[rowIndex] = { original: newFileName, thumbnail: newFileName };
            setSlideList([...t]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onRemoveImage = (index) => {
    let t = [...slideList];
    t.splice(index, 1);
    setSlideList([...t]);
  };
  let listEl = slideList.map((row, index) => {
    return (
      <div key={index}>
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
              name={"image" + index}
              id={"image" + index}
              type="file"
              className={classes.CustomFileInput}
              onChange={(event) => updateSlideList(event, index)}
            />
          </div>
          <div style={{ marginLeft: "120px" }}>
            <button onClick={() => onRemoveImage(index)}>Remove</button>
          </div>
        </div>
        <hr className={classes.Hr}></hr>
      </div>
    );
  });
  const slideForm = (
    <form id="updateSlideForm">
      {listEl}
      <input
        className={classes.Row}
        style={{ display: "inline-block", marginTop: "10px" }}
        type="button"
        onClick={updateSlideHandler}
        value="submit"
      />
    </form>
  );
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
        {slideForm}
      </div>
    );
  }
  return viewPage;
};

export default UpdateSlide;
