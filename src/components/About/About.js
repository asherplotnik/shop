import React, { useEffect, useState } from "react";
import classes from "./About.module.css";
import axios from "axios";
import { serverAddress } from "../../assets/helper";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";

const About = (props) => {
  let [content, setContent] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(serverAddress + "api/getAboutUs").then((response) => {
      setContent(response.data[0]);
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
          <img src={content.firstImage} alt={content.firstImage} />
          <div className={pdiv}>
            <p>{firstParagraph}</p>
          </div>
        </div>
        <div className={classes.SecondDiv}>
          <div className={pdiv}>
            <p>{secondParagraph}</p>
          </div>
          <div>
            <img src={content.secondImage} alt={content.secondImage} />
          </div>
        </div>
        <div className={classes.ThirdDiv}>
          <img src={content.thirdImage} alt={content.thirdImage} />
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
