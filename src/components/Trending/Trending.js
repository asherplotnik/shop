import React, { Component } from "react";
import ItemsElement from "../Items/ItemsElement/ItemsElement";
import classes from "./Trending.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import PathLine from "../UI/PathLine/PathLine";
import { serverAddress, dic } from "../../assets/helper";
import { connect } from "react-redux";
let TOPITEM;
class Trending extends Component {
  state = {
    loading: true,
    Items: [],
    search: "",
    pageRangeStart: 0,
    pageRangeEnd: 11,
  };

  changePageBack = () => {
    if (this.state.pageRangeStart > 0) {
      window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
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
    //const sql = "SELECT * FROM Items  WHERE instr(code, 'LT.ROSE') > 0";
    const sql = "SELECT * FROM Items WHERE trending = true ";
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
    let currentPath = [{ name: dic.trending[this.props.lang], search: "" }];
    if (this.state.loading === false) {
      const jsxMap = this.state.Items.map((item, index) => {
        currentPath = [{ name: dic.trending[this.props.lang], search: "" }];
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
        <div className={classes.Trans}>
          <div className={classes.PathName}>
            <PathLine currentPath={currentPath} />
          </div>
          <div className={classes.Search}>
            {dic.search[this.props.lang]}{" "}
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

export default connect(mapStateToProps)(Trending);
