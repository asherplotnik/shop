import React, { useEffect, useState } from "react";
import classes from "./About.module.css";
import axios from "axios";
import { serverAddress, gc } from "../../assets/helper";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";

const About = (props) => {
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
  let mainTitle = "";
  let firstHeader = classes.FirstHeader;
  let pdiv = classes.Pdiv;
  let firstParagraph = "";
  let secondParagraph = "";
  let thirdParagraph = "";
  if (!loading) {
    mainTitle = content.mainTitle;
    firstParagraph = content.firstParagraph;
    secondParagraph = content.secondParagraph;
    thirdParagraph = content.thirdParagraph;
    if (props.lang === "thai") {
      mainTitle = content.mainTitleT;
      firstHeader = classes.FirstHeaderT;
      pdiv = classes.PdivT;
      firstParagraph = content.firstParagraphT;
      secondParagraph = content.secondParagraphT;
      thirdParagraph = content.thirdParagraphT;
    }
    viewPage = (
      <div className={[classes.Wrapper, classes.Trans].join(" ")}>
        <div>
          <h1 className={firstHeader}>{mainTitle}</h1>
        </div>
        <div className={classes.FirstDiv}>
          <img src={gc + content.firstImage} alt={content.firstImage} />
          <div className={pdiv}>
            <p>{firstParagraph}</p>
          </div>
        </div>
        <div className={classes.SecondDiv}>
          <div className={pdiv}>
            <p>{secondParagraph}</p>
          </div>
          <div>
            <img src={gc + content.secondImage} alt={content.secondImage} />
          </div>
        </div>
        <div className={classes.ThirdDiv}>
          <img src={gc + content.thirdImage} alt={content.thirdImage} />
          <div className={pdiv}>
            <p>{thirdParagraph}</p>
          </div>
        </div>
      </div>
    );
  }
  return viewPage;
};

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.lang,
  };
};

export default connect(mapStateToProps)(About);
