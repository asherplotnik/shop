import React from "react";
import "./Home.css";
import Slide from "../UI/Slide/Slide";

const Home = () => {
  return (
    <div className="Outer" style={{ display: "block" }}>
      <div style={{ display: "inline-block" }}>
        <div style={{ width: "100%" }}>
          <Slide />
        </div>
      </div>
    </div>
  );
};

export default Home;
