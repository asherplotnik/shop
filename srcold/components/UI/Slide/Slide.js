import React from "react";

import ImageGallery from "react-image-gallery";

const images = [
  {
    original: require("../../../assets/images/small/AQUARIUS1.jpg"),
    thumbnail: require("../../../assets/images/small/AQUARIUS1.jpg"),
  },
  {
    original: require("../../../assets/images/small/ARIES1.jpg"),
    thumbnail: require("../../../assets/images/small/ARIES1.jpg"),
  },
  {
    original: require("../../../assets/images/small/CANCER1.jpg"),
    thumbnail: require("../../../assets/images/small/CANCER1.jpg"),
  },
  {
    original: require("../../../assets/images/small/CAPRICORN1.jpg"),
    thumbnail: require("../../../assets/images/small/CAPRICORN1.jpg"),
  },
  {
    original: require("../../../assets/images/small/GEMINI1.jpg"),
    thumbnail: require("../../../assets/images/small/GEMINI1.jpg"),
  },
  {
    original: require("../../../assets/images/small/LEO1.jpg"),
    thumbnail: require("../../../assets/images/small/LEO1.jpg"),
  },
  {
    original: require("../../../assets/images/small/LIBRA1.jpg"),
    thumbnail: require("../../../assets/images/small/LIBRA1.jpg"),
  },
  {
    original: require("../../../assets/images/small/PISCES1.jpg"),
    thumbnail: require("../../../assets/images/small/PISCES1.jpg"),
  },
  {
    original: require("../../../assets/images/small/SAGGITARIUS1.jpg"),
    thumbnail: require("../../../assets/images/small/SAGGITARIUS1.jpg"),
  },
  {
    original: require("../../../assets/images/small/SCORPIO1.jpg"),
    thumbnail: require("../../../assets/images/small/SCORPIO1.jpg"),
  },
  {
    original: require("../../../assets/images/small/TAURUS1.jpg"),
    thumbnail: require("../../../assets/images/small/TAURUS1.jpg"),
  },
  {
    original: require("../../../assets/images/small/VIRGO1.jpg"),
    thumbnail: require("../../../assets/images/small/VIRGO1.jpg"),
  },
];

const Slide = () => {
  return (
    <div style={{ display: "inline-block" }}>
      <div style={{ width: "100%" }}>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showThumbnails={false}
          showFullscreenButton={false}
          autoPlay={true}
          slideDuration={600}
        />
      </div>
    </div>
  );
};

export default Slide;
