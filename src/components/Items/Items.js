import React, { Component } from "react";
import "./Items.module.css";
import ItemsElement from "./ItemsElement/ItemsElement";
import classes from "./Items.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import PathLine from "../UI/PathLine/PathLine";
import { serverAddress, dic } from "../../assets/helper";
import { connect } from "react-redux";
let TOPITEM;
class Items extends Component {
  state = {
    loading: true,
    Items: [],
    search: "",
    //pageRangeStart: 0,
    //pageRangeEnd: 11,
  };

  changePageBack = () => {
    if (this.props.pageRangeStart > 0) {
      window.scrollTo(0, 0);
      this.props.setPageRangeBack();
      // this.setState((prevState) => {
      //   return { pageRangeStart: prevState.pageRangeStart - 12 };
      // });
      // this.setState((prevState) => {
      //   return { pageRangeEnd: prevState.pageRangeEnd - 12 };
      // });
    }
  };

  changePageForward = () => {
    if (this.props.pageRangeEnd < TOPITEM) {
      window.scrollTo(0, 0);
      this.props.setPageRangeForward();
      // this.setState((prevState) => {
      //   return {
      //     pageRangeStart: prevState.pageRangeStart + 12,
      //   };
      // });
      // this.setState((prevState) => {
      //   return {
      //     pageRangeEnd: prevState.pageRangeEnd + 12,
      //   };
      // });
    }
  };
  fetchItems = () => {
    let selectedColl = this.props.location.search.substr(1);
    selectedColl = selectedColl.replace(/%20/g, " ");
    axios
      .get(serverAddress + "api/getItemsByCollectionName/" + selectedColl)
      .then((response) => {
        this.setState({ loading: false });
        this.setState({ Items: response.data });
        if (this.props.pageRangeStart > response.data.length) {
          this.props.resetRange();
        }
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
    let currentPath = [{ name: dic.collections[this.props.lang], search: "" }];
    if (this.state.loading === false) {
      const jsxMap = this.state.Items.map((item, index) => {
        currentPath = [
          { name: dic.collections[this.props.lang], search: "" },
          {
            name: dic.items[this.props.lang],
            search: this.props.location.search.substr(1),
          },
        ];
        const link = { pathname: "/product", search: item.code };
        const imagePath = item.image1;
        const imagePath2 = item.image2;
        TOPITEM = index;
        return (
          <ItemsElement
            show={
              item.code.includes(this.state.search) ||
              this.state.search === null
            }
            search={this.state.search}
            keyP={index}
            start={this.props.pageRangeStart}
            end={this.props.pageRangeEnd}
            link={link}
            img={imagePath}
            img2={imagePath2}
            name={item.code}
            key={item.id}
            size={item.size}
            price={item.price}
            desc={item.description}
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
                {this.props.pageRangeStart + 1} - {this.props.pageRangeEnd + 1}
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
    pageRangeStart: state.itemsReducer.pageRangeStart,
    pageRangeEnd: state.itemsReducer.pageRangeEnd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageRangeBack: () => dispatch(actions.setPageRangeBack()),
    setPageRangeForward: () => dispatch(actions.setPageRangeForward()),
    resetRange: () => dispatch(actions.resetRange()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
