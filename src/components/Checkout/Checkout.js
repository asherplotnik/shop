import React, { Component } from "react";
import classes from "./Checkout.module.css";
import axios from "axios";
import { connect } from "react-redux";
import MyButton from "../UI/Button/Button";
import ShoppingTable from "../ShoppingTable/ShoppingTable";
import PaymentForm from "../PaymentForm/PaymentForm";
import Modal from "../UI/Modal/Modal";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Logo from "../UI/Logo/Logo";
import Spinner from "../UI/Spinner/Spinner";
import { serverAddress } from "../../assets/helper";

class Checkout extends Component {
  state = {
    sTotal: 0,
    addressPressed: false,
    paymentMethod: "-",
    confirmed: null,
    confirmationNo: null,
    loading: false,
  };

  onAddressPressed = () => {
    this.setState((prevState) => {
      return { addressPressed: !prevState.addressPressed };
    });
  };

  onChangeAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#changeaddress"));
    this.props.changeAddress(formData.get("address"));
    this.onAddressPressed();
  };

  onConfirmedPressed = () => {
    this.setState({
      confirmed: false,
      confirmationNo: null,
    });
    this.props.onClearCart();
    this.props.history.push("/");
  };

  sendCheckoutEmail = (payment, confNo) => {
    const emailBody =
      "<text> THANK YOU FOR YOUR PURCHASE. PLEASE SEE ATTACHED ORDER CONFIRMATION.</text> <br></br> <text> WE WILL REVIEW YOUR PAYMENT SHORTLY, AND SEND YOU A RECEIPT. </text><br></br> <text>  ONCE WE SENT THE PARCELL WE WILL NOTIFY YOU WITH THE TRACKING NUMBER. THANK YOU. </text>";

    const formData = new FormData();
    formData.append("email", this.props.reduxUser.email);
    formData.append("address", this.props.reduxUser.address);
    formData.append("username", this.props.reduxUser.username);
    formData.append("subject", "ORDER CONFIRMATION #" + confNo);
    formData.append("body", emailBody);
    formData.append("confNo", confNo);
    formData.append("sTotal", this.state.sTotal);
    formData.append("entries", JSON.stringify(this.props.entries));
    // axios
    //   .post(serverAddress + "email/sendConfirmEmail", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       token: localStorage.getItem("token"),
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  sendCard = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const formData = new FormData(document.querySelector("#creditcardform"));
    formData.append("userId", this.props.reduxUser.userId);
    formData.append("username", this.props.reduxUser.username);
    formData.append("address", this.props.reduxUser.address);
    formData.append("email", this.props.reduxUser.email);
    formData.append("amount", document.getElementById("amount").innerHTML);
    formData.append("order", JSON.stringify(this.props.entries));
    formData.append("status", "wait approve cc payment");
    formData.append("accwire", "ccp");
    formData.append(
      "datewire",
      Date()
        .toString()
        .substring(0, Date().toString().length - 25)
    );
    axios
      .post(serverAddress + "API/checkoutwire", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.setState({ loading: false });
        document.querySelector("#creditcardform").reset();
        this.setState({ confirmed: true, confirmationNo: response.data });
        this.sendCheckoutEmail("ccp", this.state.confirmationNo);
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert(error);
        document.querySelector("#creditcardform").reset();
      });
  };
  wireSubmit = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const formData = new FormData(document.querySelector("#banktransfer"));
    const orderEntries = this.props.entries.map((entry) => {
      return {
        id: 0,
        code: entry.code,
        variation: entry.variation,
        quantity: entry.quantity,
        price: entry.price,
        purchase: {},
      };
    });
    const purchase = {
      user: { id: this.props.userId },
      shipping: this.props.reduxUser.address,
      status: "wait approve bank transfer",
      acc: formData.get("accwire"),
      wiredate: formData.get("datewire"),
      tracking: "",
      entries: [],
    };
    const payload = { purchase: purchase, entries: orderEntries };
    axios
      .post(serverAddress + "user/checkoutwire", payload, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.setState({ loading: false });
        document.querySelector("#banktransfer").reset();
        this.setState({ confirmed: true, confirmationNo: response.data.id });
        //this.sendCheckoutEmail("tt", this.state.confirmationNo);
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert(error);
        document.querySelector("#banktransfer").reset();
      });
  };
  paymentSelection = (e) => {
    this.setState({ paymentMethod: e.target.value });
  };

  componentDidMount() {
    let subtotal = 0;
    this.props.entries.map((entry) => (subtotal = subtotal + entry.total));
    const subAmount = (num) => {
      return num + Math.floor(Math.random() * 100) / 100;
    };
    this.setState({ sTotal: subAmount(subtotal) });
  }

  render() {
    let paymentEl = null;
    if (this.state.paymentMethod === "BANK TRANSFER") {
      paymentEl = (
        <form
          id="banktransfer"
          className={classes.Form}
          onSubmit={this.wireSubmit}
        >
          <p>
            PLEASE DEPOSITE <span id="amount">{this.state.sTotal}</span> BAHT TO
            THE FOLLOWING BANK ACCOUNT
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
            <input type="number" name="accwire" required />
          </p>
          <div style={{ textAlign: "center" }}>
            <MyButton btnType="continue" type="submit">
              SUBMIT
            </MyButton>
          </div>
        </form>
      );
    }
    if (this.state.paymentMethod === "CREDIT CARD") {
      paymentEl = (
        <PaymentForm subTotal={this.state.sTotal} submitCard={this.sendCard} />
      );
    }
    let showConf =
      this.state.confirmationNo === null ? classes.Hide : classes.Show;

    let attachment = (
      <div className={classes.Container}>
        <div id="attachment">
          <div className={classes.Logo}>
            <Logo />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3>
              ORDER CONFIRMATION
              <span className={showConf}> #{this.state.confirmationNo}</span>
            </h3>
            <h3> INDY FASHION </h3>
          </div>
          <ul className={classes.Ul}>
            <li key="name">
              <p>NAME: {this.props.reduxUser.username.toUpperCase()}</p>
            </li>
            <li key="email">
              <p>EMAIL: {this.props.reduxUser.email.toUpperCase()}</p>
            </li>
            <li key="address">
              <div className={classes.WrapAddress}>
                <p className={classes.Address}>
                  SHIPPING ADDRESS: <br></br>
                  {this.props.reduxUser.address.toUpperCase()}{" "}
                </p>
              </div>
            </li>
            <li key="phone">
              <p>PHONE: {this.props.reduxUser.phone.toUpperCase()}</p>
            </li>
          </ul>
          <br></br>
          <div className={classes.Shop}>
            <ShoppingTable entries={this.props.entries} />
            <p style={{ textAlign: "left" }}>
              SUBTOTAL: {this.state.sTotal} BAHT
            </p>
          </div>
        </div>
      </div>
    );

    let viewPage = (
      <React.Fragment>
        <div className={classes.Checkout}>
          {attachment}
          <div className={classes.Container}>
            <div>
              <p>SELECT PAYMENT METHOD:</p>
              <select
                autoFocus
                onChange={this.paymentSelection}
                value={this.state.paymentMethod}
                className={classes.Select}
              >
                <option>-</option>
                <option>BANK TRANSFER</option>
                {/* <option>CREDIT CARD</option> */}
              </select>
              <div className={classes.ButtonAddress}>
                <MyButton clicked={this.onAddressPressed} btnType="change">
                  Change Shipping Address
                </MyButton>
              </div>
            </div>
            <br></br>
            {paymentEl}
          </div>
        </div>
      </React.Fragment>
    );

    let checkoutPage = <Spinner />;
    if (!this.state.loading) {
      checkoutPage = (
        <div className={classes.Trans}>
          <Modal
            show={this.state.confirmed}
            modalCLosed={this.onConfirmedPressed}
          >
            <div className={classes.Conf}>
              {" CONFIRMATION REFERENCE :#" + this.state.confirmationNo}
            </div>
            <div className={classes.Conf}>
              {"AN EMAIL WAS SENT TO YOU AT: " + this.props.reduxUser.email}
            </div>
            <div className={classes.Conf}>
              IF YOU CAN'T SEE THE EMAIL PLEASE LOOK AT THE SPAM FOLDER
            </div>
            <div className={classes.Conf}>THANK YOU</div>
            <div className={classes.Conf}>
              <MyButton clicked={this.onConfirmedPressed} btnType="SuccessSmall">
                OK
              </MyButton>
            </div>
          </Modal>
          <Modal
            show={this.state.addressPressed}
            modalClosed={this.onAddressPressed}
          >
            <form
              className={classes.Font}
              id="changeaddress"
              onSubmit={this.onChangeAddress}
            >
              <p>
                <label htmlFor="address">PLEASE ENTER NEW ADDRESS:</label>
              </p>
              <textarea
                style={{ resize: "none" }}
                rows="5"
                cols="50"
                name="address"
                required
              />
              <br></br>
              <input type="submit" value="SUBMIT"></input>
            </form>
          </Modal>
          <h2 className={classes.Header}>CHECKOUT</h2>
          {viewPage}
        </div>
      );
    }
    return checkoutPage;
  }
}

const mapStateToProps = (state) => {
  return {
    reduxUser: state.authReducer.user,
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    entries: state.cartReducer.entries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCart: () => dispatch(actions.clearCart()),
    changeAddress: (address) => dispatch(actions.changeAddress(address)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
