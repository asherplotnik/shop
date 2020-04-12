import React, { useState } from "react";
import { serverAddress } from "../../../../assets/helper";
import classes from "./UpdateSlide.module.css";
import Button from "../../../../components/UI/Button/Button";
const UpdateSlide = (props) => {
  let [slideList, setSlideList] = useState(props.content);
  //     props.content.map((row, index) => {
  //       return { original: row.original, thumbnail: row.thumbnail, index: index };
  //     })
  //   );
  let [addNewImgPressed, setAddNewImagePressed] = useState(false);
  let [addImgSelected, setImgSelected] = useState(false);
  let [formData] = useState(new FormData());
  const onSetAddNewImagePressed = () => {
    setAddNewImagePressed(!addNewImgPressed);
  };
  const onSetImgSelected = () => {
    setImgSelected(true);
  };
  const updateSlideHandler = (e) => {
    e.preventDefault();
    formData.append("slideList", slideList);
    formData = document.querySelector("#updateSlideForm");
  };

  const updateSlideList = (event, rowIndex) => {
    let t = [...slideList];
    const newFileName = event.target.files[0].name;
    t[rowIndex] = { orginal: newFileName, thumbnail: newFileName };
    setSlideList([...t]);
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
              src={serverAddress + "images/slide/" + row.original}
              alt={row.original}
            />
            <p>{row.original}</p>
          </div>
          <div>
            <input
              name={"image" + index}
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
    <form id="updateSlideForm" onSubmit={updateSlideHandler}>
      {listEl}
      <input
        className={classes.Row}
        style={{ display: "inline-block", marginTop: "10px" }}
        type="submit"
      />
    </form>
  );

  let allowAdd = false;
  if (document.querySelector("#addImage") !== null) {
    if (document.querySelector("#addImage").files.length > 0) {
      allowAdd = true;
    }
  }
  return (
    <div className={classes.Scroll}>
      <div className={classes.AddImgDiv}>
        <Button clicked={onSetAddNewImagePressed} btnType="GotoCart">
          ADD NEW IMAGE
        </Button>
        <div
          className={
            addNewImgPressed ? classes.AddImgInputShow : classes.AddImgInputHide
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
        <div
          className={
            addNewImgPressed ? classes.AddImgInputShow : classes.AddImgInputHide
          }
        >
          <button disabled={!allowAdd}>Add</button>
        </div>
      </div>
      {slideForm}
    </div>
  );
};

export default UpdateSlide;
