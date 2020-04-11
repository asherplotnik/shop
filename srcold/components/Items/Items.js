import React, { Component } from "react";
import { serverAddress } from "../../assets/helper";
import "./Items.module.css";
import ItemsElement from "./ItemsElement/ItemsElement";
import classes from "./Items.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import PathLine from "../UI/PathLine/PathLine";
let TOPITEM;
class Items extends Component {
  state = {
    loading: true,
    Items: [],
    search: "",
    pageRangeStart: 0,
    pageRangeEnd: 11,
  };

  changePageBack = () => {
    if (this.state.pageRangeStart > 0) {
      this.setState((prevState) => {
        return { pageRangeStart: prevState.pageRangeStart - 12 };
      });
      this.setState((prevState) => {
        return { pageRangeEnd: prevState.pageRangeEnd - 12 };
      });
    }
  };

  changePageForward = () => {
    if (this.state.pageRangeEnd < TOPITEM) {
      this.setState((prevState) => {
        return {
          pageRangeStart: prevState.pageRangeStart + 12,
        };
      });
      this.setState((prevState) => {
        return {
          pageRangeEnd: prevState.pageRangeEnd + 12,
        };
      });
    }
  };
  fetchItems = () => {
    const selectedColl = this.props.location.search.substr(1);
    const sql = "SELECT * FROM Items WHERE collection = '" + selectedColl + "'";
    console.log("[ ----items]", sql);
    const sqlQuery = { sql: sql };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        console.log("[sql] => ", response.data);
        this.setState({ loading: false });
        this.setState({ Items: response.data });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchItems();
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value.toUpperCase() });
  };

  render() {
    let viewPage = <Spinner />;
    let currentPath = [{ name: "collections", search: "" }];
    if (this.state.loading === false) {
      const jsxMap = this.state.Items.map((item, index) => {
        currentPath = [
          { name: "collections", search: "" },
          { name: "items", search: item.collection },
        ];
        const link = { pathname: "/product", search: item.code };
        const imagePath = item.img;
        const imagePath2 = item.img2;
        TOPITEM = index;
        return (
          <ItemsElement
            show={
              item.code.includes(this.state.search) ||
              this.state.search === null
            }
            search={this.state.search}
            keyP={index}
            start={this.state.pageRangeStart}
            end={this.state.pageRangeEnd}
            link={link}
            img={imagePath}
            img2={imagePath2}
            name={item.code}
            key={item.id}
            size={item.size}
            price={item.price}
            desc={item.desc}
            exact
          ></ItemsElement>
        );
      });
      viewPage = (
        <React.Fragment>
          <div className={classes.PathName}>
            <PathLine currentPath={currentPath} />
          </div>
          <div className={classes.Search}>
            SEARCH:{" "}
            <input
              className={classes.Input}
              type="text"
              onChange={this.updateSearch}
              value={this.state.search}
            />
            <br></br>
            <br></br>
          </div>
          <div className={classes.Wrapper}>
            <div className={classes.Items}>{jsxMap}</div>
            <div>
              <br></br>
              <button
                className={classes.Button}
                disabled={this.state.search !== ""}
                onClick={this.changePageBack}
              >
                {"<<"}
              </button>
              <span
                className={
                  this.state.search !== "" ? classes.SpanD : classes.Span
                }
                disabled={this.state.search !== ""}
              >
                {this.state.pageRangeStart + 1} - {this.state.pageRangeEnd + 1}
              </span>
              <button
                className={classes.Button}
                disabled={this.state.search !== ""}
                onClick={this.changePageForward}
              >
                {">>"}
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return viewPage;
  }
}

export default Items;
