import React, { useState, useEffect } from "react";
import classes from "./BHome.module.css";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import UpdateAbout from "../UpdateAbout/UpdateAbout";
import UpdateSlide from "../UpdateSlide/UpdateSlide";
const BHome = (props) => {
  let [updateAboutPressed, setUpdateAboutPressed] = useState(false);
  let [updateSlidePressed, setUpdateSlidePressed] = useState(false);
  let [aboutContent, setAboutContent] = useState(null);
  let [slideContent, setSlideContent] = useState(null);
  let [loadingAbout, setLoadingAbout] = useState(true);
  let [loadingSlide, setLoadingSlide] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post(serverAddress + "API/queryJson", { sql: "about.json" })
      .then((response) => {
        setAboutContent(response.data);
        setLoadingAbout(false);
      });
    axios
      .post(serverAddress + "API/queryJson", { sql: "slide.json" })
      .then((response) => {
        setSlideContent(response.data);
        setLoadingSlide(false);
      });
  };

  const updateAboutHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateAboutUs"));
    axios
      .post(serverAddress + "API/updateAboutUs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    onUpdateAbout();
  };
  const onUpdateAbout = () => {
    setUpdateSlidePressed(false);
    setUpdateAboutPressed(!updateAboutPressed);
  };
  const onUpdateSlide = () => {
    setUpdateAboutPressed(false);
    setUpdateSlidePressed(!updateSlidePressed);
  };
  let viewPage = <Spinner />;
  let viewSubComponent = null;
  if (updateSlidePressed) {
    viewSubComponent = (
      <div className={classes.Show}>
        <div className={classes.Border}>
          <UpdateSlide content={slideContent} />;
        </div>
      </div>
    );
  }
  if (updateAboutPressed) {
    viewSubComponent = (
      <div className={classes.Show}>
        <div className={classes.Border}>
          <UpdateAbout
            onUpdateAbout={onUpdateAbout}
            updateAboutHandler={updateAboutHandler}
            content={aboutContent}
          />
        </div>
      </div>
    );
  }
  if (!loadingAbout && !loadingSlide) {
    viewPage = (
      <div className={classes.Wrapper}>
        <div className={classes.Buttons}>
          <Button clicked={onUpdateAbout} btnType="Success">
            Update About Us
          </Button>
          <Button clicked={onUpdateSlide} btnType="Success">
            Update slide
          </Button>
        </div>
        {viewSubComponent}
      </div>
    );
  }
  return viewPage;
};

export default BHome;
