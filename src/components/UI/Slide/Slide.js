import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { serverAddress, gc } from "../../../assets/helper";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Slide.module.css";
import { withRouter } from "react-router-dom";

const Slide = (props) => {
  let [loading, setLoading] = useState(true);
  let [images, setImages] = useState({});

  const fetchImages = () => {
    axios.get(serverAddress + "api/getSlideImages").then((response) => {
      setImages(response.data);
      setLoading(false);
    });
  };

  const onImageClick = (event) => {
    const clickedImage = images.find(
      (el) => el.original === event.target.src.slice(gc.length)
    );
    if (clickedImage.imagelink !== null) {
      if (clickedImage.imagelink.slice(0, 24) === "https://indy-fashion.com") {
        props.history.push(clickedImage.imagelink.slice(24));
      } else {
        window.open(clickedImage.imagelink, "_blank", "noopener");
      }
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  let viewPage = <Spinner />;
  if (!loading) {
    let arr = images.map((row) => {
      return {
        original: row.original,
        thumbnail: row.thumbnail,
      };
    });
    viewPage = (
      <div>
        <div className={classes.Trans}>
          <ImageGallery
            onClick={onImageClick}
            items={arr}
            showNav={true}
            showPlayButton={false}
            showThumbnails={false}
            showFullscreenButton={false}
            autoPlay={true}
            slideDuration={2000}
            slideInterval={2000}
          />
        </div>
      </div>
    );
  }
  return viewPage;
};

export default withRouter(Slide);
