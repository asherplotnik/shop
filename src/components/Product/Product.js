import React, { Component } from "react";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Product.module.css";
import PathLine from "../UI/PathLine/PathLine";
import Button from "../UI/Button/Button";
import ReactTable from "react-table-6";
import Modal from "../UI/Modal/Modal";
import AddToCartForm from "../AddToCartForm/AddToCartForm";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { serverAddress, gc } from "../../assets/helper";

class Product extends Component {
  state = {
    product: [],
    stock: [],
    addToCartPressed: false,
  };

  goToCart = () => {
    this.props.history.push("/shoppingcart");
  };
  confirmForm = (entry) => {
    this.onAddToCartPressed();
    let arr = [...this.props.entries];
    arr.push({
      code: this.state.product[0].code,
      variation: entry.selectedVar,
      quantity: entry.quantity,
      price: this.state.product[0].price,
      img: this.state.product[0].img,
      desc: this.state.product[0].desc,
      total: entry.quantity * this.state.product[0].price,
    });
    this.props.onAddToCart(arr);
    let a = [...this.state.stock];
    for (let i = 0; i < a.length; i++) {
      if (a[i].variation === entry.selectedVar) {
        a[i].qty = a[i].qty - entry.quantity;
      }
    }
    this.setState({ stock: [...a] });
  };

  onAddToCartPressed = () => {
    this.setState((prevState) => {
      return {
        addToCartPressed: !prevState.addToCartPressed,
      };
    });
  };

  fetchProduct = () => {
    let selectedProduct = this.props.location.search.substr(1);
    selectedProduct = selectedProduct.replace(/%20/g, " ");
    const sql = "SELECT * FROM items WHERE code = '" + selectedProduct + "'";
    const sqlQuery = { sql: sql };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        console.log("[product] => ", response.data);
        this.setState({ loading: false });
        this.setState({ product: response.data });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });

    const sqlStock =
      "SELECT * FROM stock WHERE code = '" + selectedProduct + "'";
    const sqlStockQuery = { sql: sqlStock };
    axios
      .post(serverAddress + "API/query", sqlStockQuery)
      .then((response) => {
        let a = [...response.data];
        for (let i = 0; i < a.length; i++) {
          console.log(a.length);
          for (let j = 0; j < this.props.entries.length; j++) {
            if (
              this.state.product[0].code === this.props.entries[j].code &&
              a[i].variation === this.props.entries[j].variation
            ) {
              a[i].qty = a[i].qty - this.props.entries[j].quantity;
            }
          }
        }
        this.setState({ stock: [...a] });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    const stockColumns = [
      {
        Header: <strong className={classes.StockColumns}>#</strong>,
        accessor: "variation",
        Cell: (row) => (
          <span className={classes.StockColumns}>{row.value}</span>
        ),
      },
      {
        Header: <strong className={classes.StockColumns}>IN STOCK</strong>,
        accessor: "qty",
        Cell: (row) => (
          <span className={classes.StockColumns}>{row.value}</span>
        ),
        width: 152,
      },
    ];
    let currentPath = [{ name: "", search: "" }];

    let viewPage = <Spinner />;
    if (this.state.loading === false) {
      const jsxMap = this.state.product.map((item) => {
        currentPath = [
          { name: "collections", search: "" },
          { name: "items", search: item.collection },
          { name: "product", search: item.code },
        ];
        return (
          <div className={classes.Trans} key={1}>
            <div className={classes.ImageDiv}>
              <img src={gc + item.img} alt="img" />
              <div className={classes.Desc}>
                <img
                  src={gc + item.img2}
                  alt="img2"
                  className={classes.Image2}
                />
              </div>
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
              <div style={{ display: "flex" }}>
                <Button
                  disabled={this.state.stock.length === 0}
                  clicked={this.onAddToCartPressed}
                  btnType="Success"
                >
                  ADD TO CART
                </Button>
                <div
                  className={
                    this.props.entries.length === 0
                      ? classes.Hide
                      : classes.Show
                  }
                >
                  <Button
                    disabled={this.props.entries.length === 0}
                    clicked={this.goToCart}
                    btnType="GotoCart"
                  >
                    GO TO CART
                  </Button>
                </div>
              </div>
            </div>
            <div className={classes.Stock}>
              <ReactTable
                style={{ border: "1px solid #b6e4f5" }}
                columns={stockColumns}
                data={
                  this.state.stock.length >= 1
                    ? this.state.stock
                    : [{ qty: 0, variation: "-" }]
                }
                defaultPageSize={50}
                minRows={1}
                showPagination={false}
              />
            </div>
          </div>
        );
      });
      viewPage = (
        <React.Fragment>
          <Modal
            show={this.state.addToCartPressed}
            modalClosed={this.onAddToCartPressed}
          >
            <AddToCartForm
              cancel={this.onAddToCartPressed}
              stock={this.state.stock}
              confirmForm={this.confirmForm}
            />
          </Modal>
          <div className={classes.PathName}>
            <PathLine currentPath={currentPath} />
          </div>
          <br></br>
          <br></br>
          <div className={classes.Wrapper}>{jsxMap}</div>
        </React.Fragment>
      );
    }

    return viewPage;
  }
}

const mapsStateToProps = (state) => {
  return {
    entries: state.cartReducer.entries,
    token: state.authReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (passedData) => dispatch(actions.addToCart(passedData)),
  };
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(withRouter(Product));
