import React from "react";
import "./Home.css";
import Slide from "../UI/Slide/Slide";
import Collections from "../Collections/Collections";

const Home = () => {
  return (
    <div className="Outer" style={{ display: "block" }}>
      <div style={{ display: "block" }}>
        <div>
          <Slide />
        </div>
      </div>
      <Collections />
    </div>
  );
};

export default Home;
