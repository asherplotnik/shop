import React, { useEffect, useState } from "react";
import classes from "./About.module.css";
import axios from "axios";
import { serverAddress } from "../../assets/helper";
import Spinner from "../UI/Spinner/Spinner";

const About = () => {
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
  let viewPage = <Spinner />;
  if (!loading) {
    viewPage = (
      <div className={classes.Wrapper}>
        <div>
          <h1 className={classes.FirstHeader}>{content.mainTitle}</h1>
        </div>
        <div className={classes.FirstDiv}>
          <img
            src={serverAddress + "images/" + content.firstImage}
            alt={content.firstImage}
          />
          <div className={classes.Pdiv}>
            <p>{content.firstParagraph}</p>
          </div>
        </div>
        <div className={classes.SecondDiv}>
          <div className={classes.Pdiv}>
            <p>{content.secondParagraph}</p>
          </div>
          <div>
            <img
              src={serverAddress + "images/" + content.secondImage}
              alt={content.secondImage}
            />
          </div>
        </div>
        <div className={classes.ThirdDiv}>
          <img
            src={serverAddress + "images/" + content.thirdImage}
            alt={content.thirdImage}
          />
          <div className={classes.Pdiv}>
            <p>{content.thirdParagraph}</p>
          </div>
        </div>
      </div>
    );
  }
  return viewPage;
};

export default About;
