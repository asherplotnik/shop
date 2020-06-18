import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "../UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { serverAddress, dic } from "../../assets/helper";
class Auth extends Component {
  state = {
    signIn: true,
    message: <br className={classes.MessageOff}></br>,
    messageClass: null,
  };

  onLogOut = () => {
    this.props.history.push("/");
  };

  onSignIn = (email, password) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      // "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
      serverAddress + "API/login";
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const sqlQuery = {
          sql:
            "SELECT * FROM users WHERE userid = '" +
            response.data.localId +
            "'",
        };
        axios
          .post(serverAddress + "API/query", sqlQuery)
          .then((res) => {
            let user = {};
            res.data.map((row) => {
              user = {
                id: row.id,
                username: row.username,
                email: row.email,
                address: row.address,
                phone: row.phone,
                userId: row.userId,
                level: row.level,
              };
              return null;
            });
            localStorage.setItem("userName", user.username);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userAddress", user.address);
            localStorage.setItem("userPhone", user.phone);
            localStorage.setItem("userLevel", user.level);
            localStorage.setItem("user", user);
            localStorage.setItem("userId", response.data.localId);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            this.props.onSignInSuccess(
              response.data.idToken,
              response.data.localId,
              user
            );
            if (this.props.entries.length > 0) {
              this.props.history.push("/checkout");
            } else {
              this.props.history.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        this.props.onSignInFail(err.response.data.error);
        alert("INVALID EMAIL OR PASSWORD!");
      });
  };

  onSignUp = (data) => {
    const userInfo = {
      username: data.get("username"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      level: "normal",
      password: data.get("password"),
    };

    let url =
      //"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
      serverAddress + "API/newUser";
    axios
      .post(url, userInfo)
      .then((response) => {
        this.props.onSignInSuccess(null, null, "normal");
        this.setState({ signIn: true });
        this.props.onSignOut();
        this.props.history.push("/Auth");
      })
      .catch((err) => {
        this.props.onSignInFail(err.message);
        alert(err.message.replace("_", " "));
      });
  };
  onSub = (event) => {
    event.preventDefault();
    if (this.state.signIn) {
      const formData = new FormData(document.querySelector("#signin"));
      this.onSignIn(formData.get("email"), formData.get("password"));
    } else {
      const formData = new FormData(document.querySelector("#signup"));
      if (
        formData.get("password").includes("'") ||
        formData.get("address").includes("'") ||
        formData.get("email").includes("'") ||
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
        if (formData.get("password") === formData.get("confirm")) {
          if (/\D/.test(formData.get("phone")) === false) {
            const formData = new FormData(document.querySelector("#signup"));
            this.onSignUp(formData);
          } else {
            this.setState({
              message: (
                <p className={classes.MessageOn}>PHONE NUMBER INVALID</p>
              ),
              messageClass: "phone",
            });
          }
        } else {
          this.setState({
            message: (
              <p className={classes.MessageOn}>CONFIRMED PASSWORD INCORRECT!</p>
            ),
            messageClass: "password",
          });
        }
      }
    }
  };

  switchSign = () => {
    this.setState((prevState) => {
      this.setState({
        message: <br></br>,
      });
      return {
        signIn: !prevState.signIn,
      };
    });
  };
  render() {
    const lang = this.props.lang;
    if (this.props.token !== null) {
      this.onLogOut();
    }
    let form = (
      <div className={[classes.Auth, classes.TransIn].join(" ")}>
        <form id="signin" onSubmit={this.onSub} className={classes.Form}>
          <div>
            <p>{dic.signIn[lang]}</p>
          </div>
          <ul className={classes.FormList}>
            <li>
              <label htmlFor="email">{dic.email[lang]} </label>
              <input name="email" type="email" required />
            </li>
            <li>
              <label htmlFor="password">{dic.password[lang]} </label>
              <input name="password" type="password" minLength="6" required />
            </li>
          </ul>
          <br></br>
          <Button btnType="SuccessSmall" type="submit">
            {dic.submit[lang]}
          </Button>
        </form>
        <p>{this.state.message}</p>
      </div>
    );

    if (!this.state.signIn)
      form = (
        <div className={[classes.Auth, classes.TransUp].join(" ")}>
          <form id="signup" onSubmit={this.onSub} className={classes.Form}>
            <div>
              <p>{dic.signUp[lang]}</p>
            </div>
            <ul className={classes.FormList}>
              <li>
                <label htmlFor="username">{dic.name[lang]}</label>
                <input name="username" type="text" required />
              </li>
              <li className={classes.FormList}>
                <label htmlFor="address">{dic.address[lang]}</label>
                <textarea
                  style={{ resize: "none" }}
                  rows="4"
                  cols="30"
                  name="address"
                  required
                />
              </li>
              <li className={classes.FormList}>
                <label htmlFor="phone">{dic.phone[lang]}</label>
                <input
                  className={
                    this.state.messageClass === "phone"
                      ? classes.MessageOn
                      : classes.MessageOff
                  }
                  name="phone"
                  type="text"
                  required
                />
              </li>
              <li className={classes.FormList}>
                <label htmlFor="email">{dic.email[lang]}</label>
                <input name="email" type="mail" required />
              </li>
              <li>
                <label htmlFor="password">{dic.password[lang]}</label>
                <input name="password" type="password" minLength="6" required />
              </li>
              <li>
                <label htmlFor="confirm">{dic.confirmPassword[lang]}</label>
                <input
                  className={
                    this.state.messageClass === "password"
                      ? classes.MessageOn
                      : classes.MessageOff
                  }
                  name="confirm"
                  type="password"
                  minLength="6"
                  required
                />
              </li>
            </ul>
            <Button btnType="SuccessSmall" type="submit">
              {dic.submit[lang]}
            </Button>
          </form>
          {this.state.message}
        </div>
      );
    return (
      <div className={classes.Trans}>
        {form}
        <div style={{ fontSize: "x-large" }}>
          <Button clicked={this.switchSign} btnType="NavySmall">
            {this.state.signIn ? dic.signUp[lang] : dic.signIn[lang]}
          </Button>{" "}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInSuccess: (token, userId, user) =>
      dispatch(actions.signInSuccess(token, userId, user)),
    onSignInFail: (data) => dispatch(actions.signInFail(data)),
    onSignOut: () => dispatch(actions.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    entries: state.cartReducer.entries,
    lang: state.langReducer.lang,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
