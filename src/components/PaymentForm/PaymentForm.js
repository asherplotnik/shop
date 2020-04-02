import React, { Component } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import classes from "./PaymentForm.module.css";
import Button from "../UI/Button/Button";

class PaymentForm extends Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: ""
  };

  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form id={"creditcardform"} onSubmit={this.props.submitCard}>
        <div className={classes.Form}>
          <div id="PaymentForm">
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focus={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
          </div>
          <div className={classes.Inputs}>
            <div>
              <input
                className={classes.CrNum}
                type="tel"
                name="number"
                placeholder="Card Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className={classes.CrNum}>
              E.g.: 49..., 51..., 36..., 37...
            </div>
            <div>
              <input
                className={classes.CrNum}
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div>
              <input
                className={classes.Cr}
                type="tel"
                name="expiry"
                placeholder="Valid Thru"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                className={classes.Cr}
                type="tel"
                name="cvc"
                placeholder="CVC"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          TOTAL AMOUNT IN THAI BAHT:
          <div id="amount">{this.props.subTotal}</div>
          <Button btnType="Success" type="submit">
            SUBMIT
          </Button>
        </div>
      </form>
    );
  }
}

export default PaymentForm;
