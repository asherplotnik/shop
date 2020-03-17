import React, { Component } from "react";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Product.module.css";
import PathLine from "../UI/PathLine/PathLine";
import Button from "../UI/Button/Button";

class Product extends Component {
  state = {
    product: []
  };
  fetchProduct = () => {
    const selectedProduct = this.props.location.search.substr(1);
    const sql = "SELECT * FROM items WHERE code = '" + selectedProduct + "'";
    console.log(sql);
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        console.log("[product] => ", response.data);
        this.setState({ loading: false });
        this.setState({ product: response.data });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchProduct();
  }
  render() {
    let currentPath = [{ name: "", search: "" }];
    let viewPage = <Spinner />;
    if (this.state.loading === false) {
      const jsxMap = this.state.product.map(item => {
        currentPath = [
          { name: "collections", search: "" },
          { name: "items", search: item.collection },
          { name: "product", search: item.code }
        ];

        const imagePath = item.img;
        return (
          <div key={1}>
            <div className={classes.ImageDiv}>
              <img
                src={imagePath}
                alt="whatever are you satisfied from the alt"
              />
            </div>
            <div className={classes.Text}>
              <p className={classes.PDesc}>{item.desc}</p>
              <hr className={classes.HrClass} />
              <p className={classes.PName}>Code: {item.code}</p>
              <hr className={classes.HrClass} />
              <p className={classes.PSize}>Size: {item.size}</p>
              <hr className={classes.HrClass} />
              <p className={classes.PPrice}>Price: {item.price} BHT</p>
              <hr className={classes.HrClass} />
              <Button btnType="Success">ADD</Button>
            </div>
          </div>
        );
      });
      viewPage = (
        <React.Fragment>
          <div className={classes.PathName}>
            <PathLine currentPath={currentPath} />
          </div>
          <div className={classes.Wrapper}>
            <div>{jsxMap}</div>
          </div>
        </React.Fragment>
      );
    }

    return viewPage;
  }
}

export default Product;
