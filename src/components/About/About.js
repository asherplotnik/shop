import React, { useEffect, useState } from "react";
import classes from "./About.module.css";
import axios from "axios";
import { serverAddress, gc } from "../../assets/helper";
import Spinner from "../UI/Spinner/Spinner";

const About = () => {
  let [content, setContent] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post(serverAddress + "API/query", {
        sql: "SELECT content FROM about WHERE id = 1",
      })
      .then((response) => {
        setContent(JSON.parse(response.data[0].content));
        setLoading(false);
      });
  };
  let viewPage = <Spinner />;
  if (!loading) {
    viewPage = (
      <div className={[classes.Wrapper, classes.Trans].join(" ")}>
        <div>
          <h1 className={classes.FirstHeader}>{content.mainTitle}</h1>
        </div>
        <div className={classes.FirstDiv}>
          <img
            src={gc + "images/" + content.firstImage}
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
              src={gc + "images/" + content.secondImage}
              alt={content.secondImage}
            />
          </div>
        </div>
        <div className={classes.ThirdDiv}>
          <img
            src={gc + "images/" + content.thirdImage}
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
