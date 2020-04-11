import React from "react";

import axios from "axios";

export function makeShittyTable(obj) {
  let table = {};
  let firstLine = {};
  let keysArr = [];
  let akey = obj.slice(0, 1).map((keys) => {
    for (let i = 0; i < Object.getOwnPropertyNames(keys).length; i++) {
      keysArr[i] = Object.getOwnPropertyNames(keys)[i];
    }
    return Object.getOwnPropertyNames(keys)[0];
  });
  firstLine = (
    <tr>
      {keysArr.map((aKey) => (
        <th key={akey}>{aKey}</th>
      ))}
    </tr>
  );
  let rows = obj.map((row) => {
    let rowArr = [];
    for (let i = 0; i < keysArr.length; i++) {
      rowArr.push(<td key={i}>{row[keysArr[i]]}</td>);
    }
    return <tr>{rowArr}</tr>;
  });
  table = [firstLine, ...rows];
  return <table>{table}</table>;
}

export function requestQuery(sql, action) {
  const sqlQuery = { sql: sql };
  axios
    .post(serverAddress + "API/" + action, sqlQuery)
    .then((response) => {
      console.log("[response.data] => ", response.data);
      if (action === "query") {
        this.setState({
          loading: false,
          collections: response.data,
        });
      } else if (action === "delete") {
        this.setState({
          loading: false,
          deletePressed: false,
          canceled: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({ loading: false, deletePressed: false });
    });
}

export const local = "http://localhost:9000/";
export const heroku = "https://indyapi.herokuapp.com/";

export const serverAddress = local;
