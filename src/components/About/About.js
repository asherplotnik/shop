import React from "react";
import axios from "axios";
const about = () => {
  const doThis = () => {
    let sql = {
      sql:
        "UPDATE collections set `desc` = 'PEARLS COLLECTION' WHERE name = 'PEARLS'",
    };
    axios.post("http://localhost:9000/API/update", sql).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

export default about;
