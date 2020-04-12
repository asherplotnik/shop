import React, { useState, useEffect } from "react";
import classes from "./BHome.module.css";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import UpdateAbout from "../UpdateAbout/UpdateAbout";
const BHome = (props) => {
  let [updateAboutPressed, setUpdateAboutPressed] = useState(false);
  let [content, setContent] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post(serverAddress + "API/queryJson", { sql: "about.json" })
      .then((response) => {
        setContent(response.data);
        setLoading(false);
        console.log(response.data);
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
    setUpdateAboutPressed();
  };
  const onUpdateAbout = () => {
    setUpdateAboutPressed(!updateAboutPressed);
  };
  let viewPage = <Spinner />;
  let viewUpdateAbout = null;
  if (updateAboutPressed) {
    viewUpdateAbout = (
      <div className={classes.ShowAbout}>
        <div className={classes.Border}>
          <UpdateAbout
            onUpdateAbout={onUpdateAbout}
            updateAboutHandler={updateAboutHandler}
            content={content}
          />
        </div>
      </div>
    );
  }
  if (!loading) {
    viewPage = (
      <div className={classes.Wrapper}>
        <div className={classes.Buttons}>
          <Button clicked={onUpdateAbout} btnType="Success">
            Update About Us
          </Button>
        </div>
        {viewUpdateAbout}
      </div>
    );
  }
  return viewPage;
};

export default BHome;
