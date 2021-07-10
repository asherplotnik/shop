import React, { useState, useEffect } from "react";
import classes from "./BHome.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import UpdateAbout from "../UpdateAbout/UpdateAbout";
import UpdateFooter from "../UpdateFooter/UpdateFooter";
import UpdateSlide from "../UpdateSlide/UpdateSlide";
const BHome = (props) => {
  let [updateAboutPressed, setUpdateAboutPressed] = useState(false);
  let [updateSlidePressed, setUpdateSlidePressed] = useState(false);
  let [updateFooterPressed, setUpdateFooterPressed] = useState(false);
  let [aboutContent, setAboutContent] = useState(null);
  let [footerContent, setFooterContent] = useState(null);
  let [loadingAbout, setLoadingAbout] = useState(true);
  let [loadingFooter, setLoadingFooter] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(serverAddress + "api/getAboutUs").then((response) => {
      setAboutContent(response?.data.find(el => el.id === 1));
      setFooterContent(response?.data.find(el => el.id === 2));
      setLoadingFooter(false);
      setLoadingAbout(false);
    });
  };

  const updateAboutHandler = (e) => {
    e.preventDefault();
    setLoadingAbout(true);
    const formData = new FormData(document.querySelector("#updateAboutUs"));
    console.log(formData.get("mainTitle"));
    console.log(formData.get("firstParagraph"));
    axios
      .post(serverAddress + "admin/updateAboutUs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAboutContent(response.data);
        setLoadingAbout(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFooterHandler = (e) => {
    e.preventDefault();
    setLoadingFooter(true);
    const formData = new FormData(document.querySelector("#updateFooter"));
    axios
      .post(serverAddress + "admin/updateFooter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFooterContent(response.data);
        console.log(response);
        setLoadingFooter(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateAbout = () => {
    setUpdateSlidePressed(false);
    setUpdateFooterPressed(false);
    setUpdateAboutPressed(!updateAboutPressed);
  };
  const onUpdateSlide = () => {
    setUpdateAboutPressed(false);
    setUpdateFooterPressed(false);
    setUpdateSlidePressed(!updateSlidePressed);
  };
  const onUpdateFooter = () => {
    setUpdateAboutPressed(false);
    setUpdateSlidePressed(false);
    setUpdateFooterPressed(!updateFooterPressed);
  };

  let viewPage = <Spinner />;
  let viewSubComponent = null;
  if (updateSlidePressed) {
    viewSubComponent = (
      <div className={classes.Show}>
        <div className={classes.Border}>
          <UpdateSlide onUpdateSlide={onUpdateSlide} />
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
  if (updateFooterPressed) {
    viewSubComponent = (
      <div className={classes.Show}>
        <div className={classes.Border}>
          <UpdateFooter
            onUpdateFooter={onUpdateFooter}
            updateFooterHandler={updateFooterHandler}
            content={footerContent}
          />
        </div>
      </div>
    );
  }

  if (!loadingAbout && !loadingFooter) {
    viewPage = (
      <div className={[classes.Wrapper, classes.Trans].join(" ")}>
        <div className={classes.Buttons}>
          <MyButton clicked={onUpdateAbout} btnType="update">
            Update About Us
          </MyButton>{"\u00A0"} {"\u00A0"}
          <MyButton clicked={onUpdateSlide} btnType="update">
            Update Slide
          </MyButton>{"\u00A0"} {"\u00A0"}
          <MyButton clicked={onUpdateFooter} btnType="update">
            Update Footer
          </MyButton>
        </div>
        {viewSubComponent}
      </div>
    );
  }
  return viewPage;
};

export default BHome;
