import React, { Component } from "react";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Profile.module.css";
import Modal from "../UI/Modal/Modal";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions/index";
import ProfileTable from "../ProfileTable/ProfileTable";
import { serverAddress, dic } from "../../assets/helper";

class Profile extends Component {
  state = {
    changeDetailsPressed: false,
    changeEmailPressed: false,
    changePasswordsPressed: false,
    message: <br></br>,
    messageClass: null,
  };

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
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
            .post(serverAddress + "API/update", sqlQuery)
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
  changeEmailHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#emailForm"));
    if (formData.get("email") === formData.get("confirm")) {
      axios
        .post(serverAddress + "API/query", {
          sql:
            "SELECT * FROM users WHERE email = '" + formData.get("email") + "'",
        })
        .then((response) => {
          const arr = [];
          response.data.map((el) => {
            arr.push(el.email);
            return null;
          });
          if (arr.length === 0) {
            const authData = {
              idToken: this.props.token,
              email: formData.get("email"),
              returnSecureToken: true,
            };
            let url =
              "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
            axios.post(url, authData).then((response) => {
              console.log("password Changed", response);
              const sqlQuery = {
                sql:
                  "UPDATE users SET email = '" +
                  formData.get("email") +
                  "' WHERE userId= '" +
                  this.props.userId +
                  "'",
              };
              axios
                .post(serverAddress + "API/update", sqlQuery)
                .then((response) => {
                  console.log("after update", sqlQuery);
                  this.onChangePasswordPressed();
                });
            });
          } else {
            this.setState({
              message: (
                <p className={classes.MessageOn}>EMAIL EXISTS ALREADY!</p>
              ),
              messageClass: "confirm",
            });
          }
          this.onChangeEmailPressed();
        });
    } else {
      this.setState({
        message: <p className={classes.MessageOn}>CONFIRMED EMAIL WRONG!</p>,
        messageClass: "confirm",
      });
    }
  };
  changePasswordHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#passwordForm"));
    if (formData.get("password") === formData.get("confirm")) {
      const authData = {
        idToken: this.props.token,
        password: formData.get("password"),
        returnSecureToken: true,
      };
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
      axios.post(url, authData).then((response) => {
        console.log("password Changed", response);
        const sqlQuery = {
          sql:
            "UPDATE users SET password = '" +
            formData.get("password") +
            "' WHERE userId= '" +
            this.props.userId +
            "'",
        };
        axios.post(serverAddress + "API/update", sqlQuery).then((response) => {
          console.log("after update", sqlQuery);
          this.onChangePasswordPressed();
        });
      });
    }
  };

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
    const lang = this.props.lang;
    let viewPage = <Spinner />;
    console.log("TOKEN+++: " + this.props.token);
    if (this.props.token !== null) {
      viewPage = (
        <div className={classes.Trans}>
          <Modal
            show={this.state.changeDetailsPressed}
            modalClosed={this.onChangeDetailsPressed}
          >
            <div className={classes.Modal}>
              <form id="detailsForm" onSubmit={this.changeDetailsHandler}>
                <p className={classes.Font}>{dic.changeDetails[lang]}:</p>
                <ul className={classes.FormList}>
                  <li key="f">
                    <label htmlFor="username">{dic.name[lang]}</label>
                    <input
                      type="text"
                      defaultValue={this.props.user.username}
                      name="username"
                    />
                  </li>
                  <li key="g">
                    <label htmlFor="phone">{dic.phone[lang]}</label>
                    <input
                      defaultValue={this.props.user.phone}
                      type="text"
                      name="phone"
                    />
                  </li>
                  <li key="h">
                    <label htmlFor="address">{dic.address[lang]}</label>
                    <textarea
                      style={{ resize: "none" }}
                      rows="4"
                      cols="30"
                      name="address"
                      defaultValue={this.props.user.address}
                    />
                  </li>
                </ul>
                {this.state.message}
                <input
                  className={classes.Font}
                  type="submit"
                  value={dic.submit[lang]}
                />
                <span style={{ opacity: "0" }}>_____</span>
                <button
                  type="button"
                  className={classes.Font}
                  onClick={this.onChangeDetailsPressed}
                >
                  {dic.cancel[lang]}
                </button>
              </form>
            </div>
          </Modal>

          <Modal
            show={this.state.changeEmailPressed}
            modalClosed={this.onChangeEmailPressed}
          >
            <div className={classes.Modal}>
              <form id="emailForm" onSubmit={this.changeEmailHandler}>
                <p className={classes.Font}>{dic.changeEmail[lang]}:</p>
                <ul className={classes.FormList}>
                  <li key="i">
                    <label htmlFor="email">{dic.newEmail[lang]}</label>
                    <input type="email" name="email" />
                  </li>
                  <li key="j">
                    <label htmlFor="confirm">{dic.confirmEmail[lang]}</label>
                    <input type="email" name="confirm" />
                  </li>
                </ul>
                {this.state.message}
                <input
                  className={classes.Font}
                  type="submit"
                  value={dic.submit[lang]}
                />
                <span style={{ opacity: "0" }}>_____</span>
                <button
                  type="button"
                  className={classes.Font}
                  onClick={this.onChangeEmailPressed}
                >
                  {dic.cancel[lang]}
                </button>
              </form>
            </div>
          </Modal>

          <Modal
            show={this.state.changePasswordPressed}
            modalClosed={this.onChangePasswordPressed}
          >
            <div className={classes.Modal}>
              <form id="passwordForm" onSubmit={this.changePasswordHandler}>
                <p className={classes.Font}>{dic.changePassword[lang]}:</p>
                <ul className={classes.FormList}>
                  <li key="i">
                    <label htmlFor="password">NEW PASSWORD:</label>
                    <input type="password" name="password" />
                  </li>
                  <li key="j">
                    <label htmlFor="confirm">CONFIRM PASSWORD:</label>
                    <input type="password" name="confirm" />
                  </li>
                </ul>
                {this.state.message}
                <input
                  className={classes.Font}
                  type="submit"
                  value={dic.submit[lang]}
                />
                <span style={{ opacity: "0" }}>_____</span>
                <button
                  type="button"
                  className={classes.Font}
                  onClick={this.onChangePasswordPressed}
                >
                  {dic.cancel[lang]}
                </button>
              </form>
            </div>
          </Modal>
          <div className={classes.Page}>
            <h1>{dic.yourDetails[lang]}</h1>
            <div className={[classes.Divider, classes.Trans].join(" ")}>
              <div>
                <div className={classes.DetailsWrapper}>
                  <div className={classes.DetailList}>
                    <ul className={classes.List}>
                      <li key="a">
                        {dic.name[lang]} {this.props.user.username}
                      </li>
                      <li key="b">
                        {dic.phone[lang]} {this.props.user.phone}
                      </li>
                      <li key="c">
                        {dic.address[lang]} {this.props.user.address}
                      </li>
                    </ul>
                  </div>
                  <div className={classes.Buttons}>
                    <Button
                      btnType="SuccessSmall"
                      clicked={this.onChangeDetailsPressed}
                    >
                      {dic.changeDetails[lang]}
                    </Button>
                  </div>
                </div>
                <br></br>
                <br></br>
                <div className={classes.DetailsWrapper}>
                  <div className={classes.DetailList}>
                    <ul className={classes.List}>
                      <li key="d">
                        {dic.email[lang]} {this.props.user.email}
                      </li>
                      <li key="e">{dic.password[lang]} •••••••••• </li>
                    </ul>
                  </div>
                  <div className={classes.Buttons}>
                    <div>
                      <Button
                        btnType="SuccessSmall"
                        clicked={this.onChangeEmailPressed}
                      >
                        {dic.changeEmail[lang]}
                      </Button>
                    </div>
                    <div>
                      <Button
                        btnType="SuccessSmall"
                        clicked={this.onChangePasswordPressed}
                      >
                        {dic.changePassword[lang]}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.TableDiv}>
                <h2 className={classes.Header}>{dic.yourOrders[lang]}</h2>
                <ProfileTable lang={lang} userId={this.props.userId} />
              </div>
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
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    user: state.authReducer.user,
    lang: state.langReducer.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeAddress: (address) => dispatch(actions.changeAddress(address)),
    onChangePhone: (phone) => dispatch(actions.changePhone(phone)),
    onChangeUserName: (username) => dispatch(actions.changeUserName(username)),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
