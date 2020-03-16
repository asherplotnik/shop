import React, { Component } from "react";
import "./Items.module.css";
import ItemsElement from "./ItemsElement/ItemsElement";
import classes from "./Items.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import PathLine from "../UI/PathLine/PathLine";
class Items extends Component {
  state = {
    loading: true,
    Items: []
  };
  fetchItems = () => {
    const selectedColl = this.props.location.search.substr(1).toLowerCase();
    const sql = "SELECT * FROM Items WHERE collection = '" + selectedColl + "'";
    console.log(sql);
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        console.log("[sql] => ", response.data);
        this.setState({ loading: false });
        this.setState({ Items: response.data });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchItems();
  }
  render() {
    let viewPage = <Spinner />;
    let currentPath = [{ name: "collections", search: "" }];
    if (this.state.loading === false) {
      const jsxMap = this.state.Items.map(item => {
        currentPath = [
          { name: "collections", search: "" },
          { name: "items", search: item.collection }
        ];
        const link = { pathname: "/product", search: item.code };
        const imagePath = "http://localhost:9000/images/" + item.code + ".jpg";
        return (
          <ItemsElement
            link={link}
            img={imagePath}
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
          <div className={classes.Wrapper}>
            <div className={classes.Items}>{jsxMap}</div>
          </div>
        </React.Fragment>
      );
    }

    return viewPage;
  }
}

export default Items;
