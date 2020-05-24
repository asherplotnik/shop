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
    axios
      .post(serverAddress + "API/query", {
        sql: "SELECT content FROM about WHERE id = 1",
      })
      .then((response) => {
        setAboutContent(JSON.parse(response.data[0].content));
        axios
          .post(serverAddress + "API/query", {
            sql: "SELECT content FROM about WHERE id = 2",
          })
          .then((res) => {
            setFooterContent(JSON.parse(res.data[0].content));
            setLoadingFooter(false);
          });
        setLoadingAbout(false);
      });
  };

  const updateAboutHandler = (e) => {
    e.preventDefault();
    setLoadingAbout(true);
    const formData = new FormData(document.querySelector("#updateAboutUs"));
    axios
      .post(serverAddress + "API/updateAboutUs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAboutContent(JSON.parse(response.data[0].content));
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
    const youtube = formData.get("youtube");
    const facebook = formData.get("facebook");
    const email = formData.get("email");
    const tel = formData.get("tel");
    const sql = `UPDATE about SET "content" = '{"youtube": "${youtube}", "facebook": "${facebook}", "email": "${email}", "tel": "${tel}"}', lang = 'eng' WHERE id = 2`;
    const sqlQuery = { sql: sql };
    axios
      .post(serverAddress + "API/update", sqlQuery)
      .then((response) => {
        setFooterContent(
          JSON.parse(
            `{"youtube": "${youtube}", "facebook": "${facebook}", "email": "${email}", "tel": "${tel}"}`
          )
        );
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
