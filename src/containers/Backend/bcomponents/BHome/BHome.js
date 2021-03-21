import React, { useState, useEffect } from "react";
import classes from "./BHome.module.css";
import Button from "../../../../components/UI/Button/Button";
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
      console.log(response.data[0]);
      console.log(response.data[1]);
      setAboutContent(response.data[0]);
      setFooterContent(response.data[1]);
      setLoadingFooter(false);
      setLoadingAbout(false);
    });
  };

  const updateAboutHandler = (e) => {
    e.preventDefault();
    setLoadingAbout(true);
    const formData = new FormData(document.querySelector("#updateAboutUs"));
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
          <Button clicked={onUpdateAbout} btnType="Success">
            Update About Us
          </Button>
          <Button clicked={onUpdateSlide} btnType="Success">
            Update Slide
          </Button>
          <Button clicked={onUpdateFooter} btnType="Success">
            Update Footer
          </Button>
        </div>
        {viewSubComponent}
      </div>
    );
  }
  return viewPage;
};

export default BHome;
