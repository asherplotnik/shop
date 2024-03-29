import React, { Component } from "react";
import "./Collections.module.css";
import CollectionsElement from "./CollectionsElement/CollectionsElement";
import classes from "./Collections.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import PathLine from "../UI/PathLine/PathLine";
import { serverAddress, dic } from "../../assets/helper";
import { connect } from "react-redux";
class Collections extends Component {
  state = {
    loading: true,
    collections: [],
  };

  fetchCollections = () => {
    axios
      .get(serverAddress + "api/getCollections")
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
    let currentPath = [{ name: dic.collections[this.props.lang], search: "" }];
    let viewPage = <Spinner />;
    if (this.state.loading === false) {
      const jsxMap = this.state.collections.map((collection) => {
        const link = { pathname: "/items", search: collection.name };
        return (
          <CollectionsElement
            link={link}
            name={collection.name}
            key={collection.id}
            image={collection.image}
          ></CollectionsElement>
        );
      });
      viewPage = (
        <div className={classes.Trans}>
          <div className={classes.PathName}>
            <PathLine currentPath={currentPath} />
          </div>
          <div className={classes.Wrapper}>
            <div className={classes.Collections}>{jsxMap}</div>
          </div>
        </div>
      );
    }

    return viewPage;
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.lang,
  };
};

export default connect(mapStateToProps)(Collections);
