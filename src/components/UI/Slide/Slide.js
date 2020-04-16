import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { serverAddress } from "../../../assets/helper";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";

const Slide = () => {
  const fetchImages = () => {
    axios
      .post(serverAddress + "API/queryJson", { sql: "slide.json" })
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      });
  };
  let [loading, setLoading] = useState(true);
  let [images, setImages] = useState([]);
  useEffect(() => {
    fetchImages();
  }, []);

  let viewPage = <Spinner />;
  if (!loading) {
    let arr = images.map((row) => {
      return {
        original: serverAddress + "images/" + row.original,
        thumbnail: serverAddress + "images/" + row.thumbnail,
      };
    });
    viewPage = (
      <div>
        <div>
          <ImageGallery
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
