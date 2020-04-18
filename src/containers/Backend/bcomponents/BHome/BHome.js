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
  // let [changeLangPressed, setChangeLangPressed] = useState(false);
  let [aboutContent, setAboutContent] = useState(null);
  let [loadingAbout, setLoadingAbout] = useState(true);

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
        setLoadingAbout(false);
      });
  };

  // const onChangeLangHandler = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(document.querySelector("#setLang"));
  //   const selectedLang = formData.get("lang") === "ENGLISH" ? "eng" : "thai";
  //   axios
  //     .post(serverAddress + "API/update", {
  //       sql: "UPDATE about set lang = '" + selectedLang + "' WHERE id = 1",
  //     })
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  //   setChangeLangPressed(false);
  // };
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
  const onUpdateAbout = () => {
    setUpdateSlidePressed(false);
    // setChangeLangPressed(false);
    setUpdateAboutPressed(!updateAboutPressed);
  };
  const onUpdateSlide = () => {
    setUpdateAboutPressed(false);
    // setChangeLangPressed(false);
    setUpdateSlidePressed(!updateSlidePressed);
  };

  // const onChangeLangPressed = () => {
  //   setUpdateAboutPressed(false);
  //   setUpdateSlidePressed(false);
  //   setChangeLangPressed(!changeLangPressed);
  // };

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
  // if (changeLangPressed) {
  //   viewSubComponent = (
  //     <div className={classes.Show}>
  //       <div className={classes.Lang}>
  //         <p>SELECT LANGUAGE: </p>
  //         <form id="setLang" onSubmit={onChangeLangHandler}>
  //           <select name="lang">
  //             <option key={"1"}>ENGLISH</option>
  //             <option key={"2"}>ไทย</option>
  //           </select>
  //           <br />
  //           <div style={{ textAlign: "center" }}>
  //             <input type="submit" value="SUBMIT" />
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  if (!loadingAbout) {
    viewPage = (
      <div className={[classes.Wrapper, classes.Trans].join(" ")}>
        <div className={classes.Buttons}>
          <Button clicked={onUpdateAbout} btnType="Success">
            Update About Us
          </Button>
          <Button clicked={onUpdateSlide} btnType="Success">
            Update slide
          </Button>
          {/* <Button clicked={onChangeLangPressed} btnType="Success">
            Change Language
          </Button> */}
        </div>
        {viewSubComponent}
      </div>
    );
  }
  return viewPage;
};

export default BHome;
