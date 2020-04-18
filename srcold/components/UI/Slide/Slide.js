import React from "react";

import ImageGallery from "react-image-gallery";

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
