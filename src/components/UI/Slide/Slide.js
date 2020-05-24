import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { serverAddress, gc } from "../../../assets/helper";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Slide.module.css";

const Slide = (props) => {
  let [loading, setLoading] = useState(true);
  let [images, setImages] = useState([]);

  const fetchImages = () => {
    axios
      .post(serverAddress + "API/query", { sql: "SELECT * FROM slide" })
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      });
  };

  const onImageClick = (event) => {
    const clickedImage = images.find(
      (el) => el.original === event.target.src.slice(gc.length)
    );
    if (clickedImage.imagelink !== null) {
      window.location.replace(clickedImage.imagelink);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  let viewPage = <Spinner />;
  if (!loading) {
    let arr = images.map((row) => {
      return {
        original: gc + row.original,
        thumbnail: gc + row.thumbnail,
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

export default Slide;
