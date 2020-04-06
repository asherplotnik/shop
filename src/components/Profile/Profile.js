import React, { Component } from "react";
import Button from "../UI/Button/Button";
import classes from "./Profile.module.css";
import Modal from "../UI/Modal/Modal";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions/index";

class Profile extends Component {
  state = {
    changeDetailsPressed: false,
    changeEmailPressed: false,
    changePasswordsPressed: false,
    message: <br></br>,
    messageClass: null,
  };

  changeDetailsHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#detailsForm"));
    let userName = "";
    let phone = "";
    let address = "";
    if (formData.get("username").trim() !== "") {
      userName = "username = '" + formData.get("username") + "' ";
    }
    if (formData.get("phone").trim() !== "") {
      phone = "phone = '" + formData.get("phone") + "' ";
    }
    if (formData.get("address").trim() !== "") {
      address = "address = '" + formData.get("address") + "'";
    }
    let sql = "";
    if (userName === "" && phone === "" && address === "") {
      this.setState({
        message: <p className={classes.MessageOn}>NO DATA WAS ENTERED</p>,
        messageClass: "noData",
      });
    } else {
      let colonNP =
        userName !== "" && (phone !== "" || address !== "") ? "," : "";
      let colonPA = phone !== "" && address !== "" ? "," : "";
      sql =
        "UPDATE users SET " +
        userName +
        colonNP +
        phone +
        colonPA +
        address +
        " WHERE userId = '" +
        this.props.userId +
        "'";

      if (
        formData.get("phone").includes("'") ||
        formData.get("address").includes("'") ||
        formData.get("username").includes("'")
      ) {
        this.setState({
          message: (
            <p className={classes.MessageOn}>
              PLEASE AVOID USING ANY QUOTE SIGN{" "}
            </p>
          ),
          messageClass: "quote",
        });
      } else {
        if (/\D/.test(formData.get("phone")) !== false) {
          this.setState({
            message: <p className={classes.MessageOn}>PHONE NUMBER INVALID</p>,
            messageClass: "phone",
          });
        } else {
          console.log("[ SQL]", sql);
          const sqlQuery = { sql: sql };
          axios
            .post("http://localhost:9000/API/update", sqlQuery)
            .then((response) => {
              if (userName !== "") {
                this.props.onChangeUserName(formData.get("username"));
                localStorage.setItem("userName", formData.get("username"));
              }
              if (address !== "") {
                this.props.onChangeAddress(formData.get("address"));
                localStorage.setItem("userAddress", formData.get("address"));
              }
              if (phone !== "") {
                this.props.onChangePhone(formData.get("phone"));
                localStorage.setItem("userPhone", formData.get("phone"));
              }
              this.onChangeDetailsPressed();
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  changeEmailHandler = () => {};
  changePasswordHandler = () => {};

  onChangeDetailsPressed = () => {
    this.setState((prevState) => {
      return { changeDetailsPressed: !prevState.changeDetailsPressed };
    });
  };
  onChangeEmailPressed = () => {
    this.setState((prevState) => {
      return { changeEmailPressed: !prevState.changeEmailPressed };
    });
  };
  onChangePasswordPressed = () => {
    this.setState((prevState) => {
      return { changePasswordPressed: !prevState.changePasswordPressed };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.state.changeDetailsPressed}
          modalClosed={this.onChangeDetailsPressed}
        >
          <div className={classes.Modal}>
            <form id="detailsForm" onSubmit={this.changeDetailsHandler}>
              <p className={classes.Font}>CHANGE DETAILS:</p>
              <ul className={classes.FormList}>
                <li key="f">
                  <label htmlFor="username">NAME:</label>
                  <input name="username" />
                </li>
                <li key="g">
                  <label htmlFor="phone">PHONE:</label>
                  <input type="text" name="phone" />
                </li>
                <li key="h">
                  <label htmlFor="address">ADDRESS:</label>
                  <textarea
                    style={{ resize: "none" }}
                    rows="4"
                    cols="30"
                    name="address"
                  />
                </li>
              </ul>
              {this.state.message}
              <input className={classes.Font} type="submit" value="SUBMIT" />
              <span style={{ opacity: "0%" }}>_____</span>
              <button
                className={classes.Font}
                onClick={this.onChangeDetailsPressed}
              >
                CANCEL
              </button>
            </form>
          </div>
        </Modal>
        <Modal
          show={this.state.changeEmailPressed}
          modalClosed={this.onChangeEmailPressed}
        ></Modal>
        <Modal
          show={this.state.changePasswordPressed}
          modalClosed={this.onChangePasswordPressed}
        ></Modal>
        <div className={classes.Page}>
          <h1>MY DETAILS</h1>
          <div className={classes.DetailsWrapper}>
            <div>
              <ul className={classes.List}>
                <li key="a">NAME: {this.props.user.username}</li>
                <li key="b">PHONE: {this.props.user.phone}</li>
                <li key="c">ADDRESS: {this.props.user.address}</li>
              </ul>
            </div>
            <div className={classes.Buttons}>
              <Button
                btnType="SuccessSmall"
                clicked={this.onChangeDetailsPressed}
              >
                CHANGE DETAILS
              </Button>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className={classes.DetailsWrapper}>
            <div>
              <ul className={classes.List}>
                <li key="d">EMAIL: {this.props.user.email}</li>
                <li key="e">PASSWORD: •••••••••• </li>
              </ul>
            </div>
            <div className={classes.Buttons}>
              <div>
                <Button
                  btnType="SuccessSmall"
                  clicked={this.onChangeEmailPressed}
                >
                  CHANGE EMAIL
                </Button>
              </div>
              <div>
                <Button
                  btnType="SuccessSmall"
                  clicked={this.onChangePasswordPressed}
                >
                  CHANGE PASSWORD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeAddress: (address) => dispatch(actions.changeAddress(address)),
    onChangePhone: (phone) => dispatch(actions.changePhone(phone)),
    onChangeUserName: (username) => dispatch(actions.changeUserName(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
