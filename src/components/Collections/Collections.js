import React, { Component } from "react";
import "./Collections.module.css";
import CollectionsElement from "./CollectionsElement/CollectionsElement";
import classes from "./Collections.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import PathLine from "../UI/PathLine/PathLine";
import { serverAddress } from "../../assets/helper";
class Collections extends Component {
  state = {
    loading: true,
    collections: [],
  };

  fetchCollections = () => {
    const sql = "SELECT * FROM collections";
    const sqlQuery = { sql: sql };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        this.setState({ loading: false });
        this.setState({ collections: response.data });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchCollections();
  }
  render() {
    let currentPath = [{ name: "collections", search: "" }];
    let viewPage = <Spinner />;
    if (this.state.loading === false) {
      const jsxMap = this.state.collections.map((collection) => {
        const link = { pathname: "/items", search: collection.name };
        return (
          <CollectionsElement
            link={link}
            name={collection.name}
            key={collection.id}
            img={collection.img}
            exact
          ></CollectionsElement>
        );
      });
      viewPage = (
        <React.Fragment>
          <div className={classes.PathName}>
            <PathLine currentPath={currentPath} />
          </div>
          <div className={classes.Wrapper}>
            <div className={classes.Collections}>{jsxMap}</div>
          </div>
        </React.Fragment>
      );
    }

    return viewPage;
  }
}

export default Collections;
