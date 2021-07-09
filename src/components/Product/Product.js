import React, { Component } from "react";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Product.module.css";
import PathLine from "../UI/PathLine/PathLine";
import MyButton from "../UI/Button/Button";
import ReactTable from "react-table-6";
import Modal from "../UI/Modal/Modal";
import ImageWindow from "../UI/ImageWindow/ImageWindow";
import AddToCartForm from "../AddToCartForm/AddToCartForm";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { serverAddress, dic } from "../../assets/helper";

class Product extends Component {
  state = {
    product: {},
    stock: [],
    addToCartPressed: false,
    imageHover: false,
    image: "",
    detailsPressed: false,
  };

  goToCart = () => {
    this.props.history.push("/shoppingcart");
  };
  confirmForm = (entry) => {
    this.onAddToCartPressed();
    let arr = [...this.props.entries];
    let chkExists = null;
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].code === this.state.product.code &&
        arr[i].variation === entry.selectedVar
      ) {
        chkExists = i;
        break;
      }
    }
    if (chkExists !== null) {
      arr[chkExists].quantity = +arr[chkExists].quantity + +entry.quantity;
      arr[chkExists].total = arr[chkExists].quantity * arr[chkExists].price;
    } else {
      arr.push({
        code: this.state.product.code,
        variation: entry.selectedVar,
        quantity: entry.quantity,
        price: this.state.product.price,
        img: entry.img,
        desc: this.state.product.description,
        total: entry.quantity * this.state.product.price,
      });
    }
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

    axios
      .get(serverAddress + "api/getProductByCode/" + selectedProduct)
      .then((response) => {
        this.setState({ product: response.data });
        this.setState({ loading: false });
        axios
          .get(serverAddress + "api/getStockByCode/" + selectedProduct)
          .then((response) => {
            console.log(response.data);
            let a = [...response.data];
            for (let i = 0; i < a.length; i++) {
              for (let j = 0; j < this.props.entries.length; j++) {
                if (
                  this.state.product.code === this.props.entries[j].code &&
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
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("axios:", error);
      });
  };

  onMouseOverImage = (row) => {
    this.setState({
      imageHover: true,
      image: row.img,
    });
  };

  onMouseOutImage = () => {
    this.setState({
      imageHover: false,
      image: "",
    });
  };

  onDetailsPressed = () => {
    this.setState((prevState) => {
      return {
        detailsPressed: !prevState.detailsPressed,
      };
    });
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    const lang = this.props.lang;
    const stockColumns = [
      {
        Header: <strong className={classes.StockColumns}>#</strong>,
        accessor: "variation",
        Cell: (row) => (
          <div style={{ lineHeight: "50px" }}>
            <span className={classes.StockColumns}>{row.value}</span>
          </div>
        ),
      },
      {
        Header: <strong className={classes.StockColumns}>IN STOCK</strong>,
        accessor: "qty",
        Cell: (row) => (
          <div style={{ lineHeight: "50px" }}>
            <span className={classes.StockColumns}>{row.value}</span>
          </div>
        ),
        width: 125,
      },
      {
        Header: <strong className={classes.StockColumns}>IMAGE</strong>,
        accessor: "img",
        Cell: (row) => (
          <div style={{ width: "50px", height: "50px", lineHeight: "50px" }}>
            <img
              src={row.value}
              alt=""
              style={{ width: "50px" }}
              className={classes.CellStyle}
            />
          </div>
        ),
        width: 110,
      },
    ];
    let currentPath = [{ name: "", search: "" }];
    let viewPage = <Spinner />;
    if (this.state.loading === false) {
      const item = this.state.product;
      currentPath = [
        { name: "collections", search: "" },
        { name: "items", search: item.collection.name },
        { name: "product", search: item.code },
      ];
      let moreDetails = null;
      if (item.productDetails && item.productDetails !== "") {
        moreDetails = (
          <div className={classes.BorderDetails}>
            <div
              className={classes.MoreDetails}
              onClick={this.onDetailsPressed}
            >
              <div>{dic.moreDetails[lang]}</div>
              <div>{this.state.detailsPressed ? "-" : "+"}</div>
            </div>
            <div
              className={
                this.state.detailsPressed
                  ? classes.MoreDetailsShow
                  : classes.MoreDetailsHide
              }
            >
              {item.productDetails}
            </div>
          </div>
        );
      }

      const jsxMap = (
        <div className={classes.Trans} key={1}>
          <div className={classes.ImgAndText}>
            <div className={classes.ImageDiv}>
              <img src={item.image1} alt="img" />
              <div className={classes.Desc}>
                <img src={item.image2} alt="img2" className={classes.Image2} />
              </div>
            </div>
            <div className={classes.Text}>
              <p className={classes.PDesc}>{item.description}</p>
              <hr className={classes.HrClass} />
              <p className={classes.PName}>
                {dic.code[lang]} {item.code}
              </p>
              <hr className={classes.HrClass} />
              <p className={classes.PSize}>
                {dic.size[lang]} {item.size}
              </p>
              <hr className={classes.HrClass} />
              <p className={classes.PPrice}>
                {dic.price[lang]} {item.price} ฿
              </p>
              <hr className={classes.HrClass} />
              <div style={{ display: "flex",padding: "5px" }}>
                <MyButton
                  disabled={this.state.stock.length === 0}
                  clicked={this.onAddToCartPressed}
                  btnType="AddShoppingCartIcon"
                >
                  ADD TO CART
                </MyButton>
                <div
                  className={
                    this.props.entries.length === 0
                      ? classes.Hide
                      : classes.Show
                  }
                >
                  <MyButton
                    disabled={this.props.entries.length === 0}
                    clicked={this.goToCart}
                    btnType="ShoppingCartIcon"
                  >
                    GO TO CART
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
          {moreDetails}
          <div className={classes.Stock}>
            <ReactTable
              style={{ border: "1px solid #b6e4f5" }}
              columns={stockColumns}
              data={
                this.state.stock.length >= 1
                  ? this.state.stock
                  : [{ qty: 0, variation: "-" }]
              }
              defaultPageSize={70}
              minRows={1}
              showPagination={false}
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onMouseOver: (e, handleOriginal) => {
                    if (rowInfo.original.img && rowInfo.original.img !== "") {
                      const rowDetails = {
                        rowId: null,
                        img: null,
                      };
                      if (rowInfo !== undefined) {
                        rowDetails.rowId = rowInfo.original.id;
                        rowDetails.img = rowInfo.original.img;
                        this.onMouseOverImage(rowDetails);
                        if (handleOriginal) {
                          handleOriginal();
                        }
                      }
                    }
                  },
                  onMouseEnter: (e, handleOriginal) => {
                    if (rowInfo.original.img && rowInfo.original.img !== "") {
                      const rowDetails = {
                        rowId: null,
                        img: null,
                      };
                      if (rowInfo !== undefined) {
                        rowDetails.rowId = rowInfo.original.id;
                        rowDetails.img = rowInfo.original.img;
                        this.onMouseOverImage(rowDetails);
                        if (handleOriginal) {
                          handleOriginal();
                        }
                      }
                    }
                  },
                  onMouseOut: (e, handleOriginal) => {
                    this.onMouseOutImage();
                    if (handleOriginal) {
                      handleOriginal();
                    }
                  },
                };
              }}
            />
          </div>
        </div>
      );
      viewPage = (
        <div
          onMouseOut={this.onMouseOutImage}
          onMouseEnter={this.onMouseOutImage}
        >
          <ImageWindow show={this.state.imageHover} image={this.state.image} />
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
          <div
            onMouseOut={this.onMouseOutImage}
            onMouseEnter={this.onMouseOutImage}
            className={classes.Wrapper}
          >
            {jsxMap}
          </div>
          <br />
          <br />
        </div>
      );
    }
    return viewPage;
  }
}

const mapsStateToProps = (state) => {
  return {
    entries: state.cartReducer.entries,
    token: state.authReducer.token,
    lang: state.langReducer.lang,
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
