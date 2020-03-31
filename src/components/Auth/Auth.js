import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "../UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router";
class Auth extends Component {
  state = {
    signIn: true,
    massage: <br></br>,
    messageClass: classes.messageOff
  };

  onSignIn = (email, password) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        this.props.onSignInSuccess(
          response.data.idToken,
          response.data.localId
        );
        this.props.history.push("/");
      })
      .catch(err => {
        this.props.onSignInFail(err.response.data.error);
        alert("INVALID EMAIL OR PASSWORD!");
      });
  };

  onSignUp = data => {
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        this.props.onSignInSuccess(
          response.data.idToken,
          response.data.localId
        );
        const userInfo = {
          username: data.get("username"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          level: "normal"
        };
        const sqlQuery = {
          sql:
            "INSERT INTO users VALUES (null,'" +
            userInfo.username +
            "','" +
            userInfo.email +
            "','" +
            userInfo.address +
            "','" +
            userInfo.phone +
            "','" +
            response.data.localId +
            "','" +
            userInfo.level +
            "')"
        };
        axios
          .post("http://localhost:9000/API/update", sqlQuery)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.log(error);
          });

        this.props.history.push("/");
      })
      .catch(err => {
        this.props.onSignInFail(err.response.data.error);
        alert(err.response.data.error.message.replace("_", " "));
      });
  };
  onSub = event => {
    event.preventDefault();
    if (this.state.signIn) {
      const formData = new FormData(document.querySelector("#signin"));
      this.onSignIn(formData.get("email"), formData.get("password"));
    } else {
      const formData = new FormData(document.querySelector("#signup"));
      if (formData.get("password") === formData.get("confirm")) {
        const formData = new FormData(document.querySelector("#signup"));
        this.onSignUp(formData);
      } else {
        this.setState({
          massage: "CONFIRMED PASSWORD INCORRECT!",
          messageClass: classes.MessageOn
        });
      }
    }
  };

  switchSign = () => {
    this.setState(prevState => {
      return {
        signIn: !prevState.signIn
      };
    });
  };
  render() {
    let form = (
      <div className={classes.Auth}>
        <form id="signin" onSubmit={this.onSub} className={classes.Form}>
          <div>
            <p>SIGN IN</p>
          </div>
          <ul className={classes.FormList}>
            <li>
              <label htmlFor="email">EMAIL:</label>
              <input name="email" type="email" required />
            </li>
            <li>
              <label htmlFor="password">PASSWORD:</label>
              <input name="password" type="password" minLength="6" required />
            </li>
            <li>
              <Button btnType="SuccessSmall" type="submit">
                SUBMIT
              </Button>
            </li>
          </ul>
        </form>
        <p className={this.state.messageClass}>{this.state.massage}</p>
      </div>
    );

    if (!this.state.signIn)
      form = (
        <div className={classes.Auth}>
          <form id="signup" onSubmit={this.onSub} className={classes.Form}>
            <div>
              <p>SIGN UP</p>
            </div>
            <ul className={classes.FormList}>
              <li>
                <label htmlFor="username">NAME:</label>
                <input name="username" type="text" required />
              </li>
              <li className={classes.FormList}>
                <label htmlFor="address">SHIPPING ADDRESS:</label>
                <textarea
                  style={{ resize: "none" }}
                  rows="4"
                  cols="30"
                  name="address"
                  required
                />
              </li>
              <li className={classes.FormList}>
                <label htmlFor="phone">PHONE:</label>
                <input name="phone" type="text" required />
              </li>
              <li className={classes.FormList}>
                <label htmlFor="email">EMAIL:</label>
                <input name="email" type="mail" required />
              </li>
              <li>
                <label htmlFor="password">PASSWORD:</label>
                <input name="password" type="password" minLength="6" required />
              </li>
              <li>
                <label htmlFor="confirm">CONFIRM PASSWORD:</label>
                <input
                  className={this.state.messageClass}
                  name="confirm"
                  type="password"
                  minLength="6"
                  required
                />
              </li>
              <li>
                <Button btnType="SuccessSmall" type="submit">
                  SUBMIT
                </Button>
              </li>
            </ul>
          </form>
          <p className={this.state.messageClass}>{this.state.massage}</p>
        </div>
      );
    return (
      <React.Fragment>
        {form}
        <div style={{ fontSize: "x-large" }}>
          <Button clicked={this.switchSign} btnType="NavySmall">
            {this.state.signIn ? "SIGN UP" : "SIGN IN"}
          </Button>{" "}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignInSuccess: (token, userId) =>
      dispatch(actions.signInSuccess(token, userId)),
    onSignInFail: data => dispatch(actions.signInFail(data))
  };
};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    error: state.authReducer.error,
    loading: state.authReducer.loading
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
