import React, { Component } from "react";
import classes from "./Checkout.module.css";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import Button from "../UI/Button/Button";
import ShoppingTable from "../ShoppingTable/ShoppingTable";
import PaymentForm from "../PaymentForm/PaymentForm";
import Modal from "../UI/Modal/Modal";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";
class Checkout extends Component {
  state = {
    loading: true,
    user: {
      userId: this.props.userId,
      username: "",
      phone: "",
      address: "",
      email: "",
      amount: 0,
      confirmed: false,
      confirmationNo: null
    },
    responseDetails: [],
    paymentMethod: "-"
  };

  onConfirmedPressed = () => {
    this.setState(prevState => {
      return {
        confirmed: !prevState.confirmed,
        confirmationNo: null
      };
    });
    this.props.onClearCart();
    this.props.history.push("/");
  };
  sendCard = e => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#creditcardform"));
    formData.append("userId", this.state.user.userId);
    formData.append("username", this.state.user.username);
    formData.append("address", this.state.user.address);
    formData.append("email", this.state.user.email);
    formData.append("amount", document.getElementById("amount").innerHTML);
    formData.append("order", JSON.stringify(this.props.entries));
    formData.append("acc", "ccp");
    formData.append("wiredate", Date.now());
    axios
      .post("http://localhost:9000/API/creditcardtest", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[checkout wire respons] => ", response.data);
        document.querySelector("#creditcardform").reset();
        this.setState({ confirmed: true, confirmationNo: response.data });
      })
      .catch(error => {
        alert(error);
        document.querySelector("#creditcardform").reset();
      });
  };
  wireSubmit = e => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#banktransfer"));
    formData.append("userId", this.state.user.userId);
    formData.append("username", this.state.user.username);
    formData.append("address", this.state.user.address);
    formData.append("email", this.state.user.email);
    formData.append("amount", document.getElementById("amount").innerHTML);
    formData.append("order", JSON.stringify(this.props.entries));
    axios
      .post("http://localhost:9000/API/checkoutwire", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[checkout wire respons] => ", response.data);
        document.querySelector("#banktransfer").reset();
        this.setState({ confirmed: true, confirmationNo: response.data });
      })
      .catch(error => {
        alert(error);
        document.querySelector("#banktransfer").reset();
      });
  };
  paymentSelection = e => {
    this.setState({ paymentMethod: e.target.value });
  };
  subAmount = num => {
    return num + Math.floor(Math.random() * 100) / 100;
  };

  loadUser = () => {
    const sqlQuery = {
      sql: "SELECT * FROM users WHERE userId = '" + this.props.userId + "'"
    };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        this.setState({ responseDetails: response.data });
        this.state.responseDetails.map(row => {
          this.setState({
            user: {
              username: row.username.toUpperCase(),
              email: row.email.toUpperCase(),
              address: row.address.toUpperCase(),
              userId: this.props.userId
            }
          });
          return null;
        });

        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("SERVER ERROR:", err);
      });
  };
  componentDidMount() {
    this.loadUser();
  }
  render() {
    let subtotal = 0;
    this.props.entries.map(entry => (subtotal = subtotal + entry.total));
    let paymentEl = null;
    if (this.state.paymentMethod === "BANK TRANSFER") {
      paymentEl = (
        <form
          id="banktransfer"
          className={classes.Form}
          onSubmit={this.wireSubmit}
        >
          <p>
            PLEASE DEPOSITE <span id="amount">{this.subAmount(subtotal)}</span>{" "}
            BAHT TO THE FOLLOWING BANK ACCOUNT
          </p>
          <p>KBANK 020-360-4440 ACC NAME:ASHER PLOTNIK</p>
          <p>ONCE FINISHED, PLEASE ENTER THE DETAILS BELOW:</p>
          <br></br>
          <p>
            <label htmlFor="datewire">date and time of transfer:</label>
            <input type="datetime-local" name="datewire" required />
          </p>
          <p>
            <label htmlFor="accwire">last 3 digits of your bank account</label>
            <input type="text" name="accwire" />
          </p>
          <div style={{ textAlign: "center" }}>
            <Button btnType="SuccessSmall" type="submit">
              SUBMIT
            </Button>
          </div>
        </form>
      );
    }
    if (this.state.paymentMethod === "CREDIT CARD") {
      paymentEl = (
        <PaymentForm subTotal={subtotal} submitCard={this.sendCard} />
      );
    }
    let viewPage = <Spinner />;
    if (!this.state.loading) {
      viewPage = this.state.responseDetails.map(row => {
        return (
          <React.Fragment>
            <div className={classes.Checkout}>
              <div className={classes.Container}>
                <ul className={classes.Ul}>
                  <li key="name">
                    <p>NAME: {row.username.toUpperCase()}</p>
                  </li>
                  <li key="email">
                    <p>EMAIL: {row.email.toUpperCase()}</p>
                  </li>
                  <li key="address">
                    <p>SHIPPING ADDRESS: {row.address.toUpperCase()}</p>
                  </li>
                  <li key="phone">
                    <p>PHONE: {row.phone.toUpperCase()}</p>
                  </li>
                </ul>
                <br></br>
                <div className={classes.Shop}>
                  <ShoppingTable entries={this.props.entries} />
                  <p style={{ textAlign: "left" }}>SUBTOTAL: {subtotal} BAHT</p>
                </div>
              </div>
              <div className={classes.Container}>
                <div>
                  <p>SELECT PAYMENT METHOD:</p>
                  <select
                    onChange={this.paymentSelection}
                    value={this.state.paymentMethod}
                    className={classes.Select}
                  >
                    <option>-</option>
                    <option>BANK TRANSFER</option>
                    <option>CREDIT CARD</option>
                  </select>
                </div>
                <br></br>
                {paymentEl}
              </div>
            </div>
          </React.Fragment>
        );
      });
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.confirmed}
          modalCLosed={this.onConfirmedPressed}
        >
          <div className={classes.Conf}>
            {" CONFIRMATION REFERENCE :#" + this.state.confirmationNo}
          </div>
          <div className={classes.Conf}>
            {"AN EMAIL WAS SENT TO YOU AT: " + this.state.user.email}
          </div>
          <div className={classes.Conf}>THANK YOU</div>
          <div className={classes.Conf}>
            <Button clicked={this.onConfirmedPressed} btnType="SuccessSmall">
              OK
            </Button>
          </div>
        </Modal>
        <h2 className={classes.Header}>CHECKOUT</h2>
        {viewPage}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.authReducer.userId,
    entries: state.cartReducer.entries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearCart: () => dispatch(actions.clearCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
