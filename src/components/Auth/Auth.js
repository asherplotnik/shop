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
    message: <br className={classes.MessageOff}></br>,
    messageClass: null
  };

  onLogOut = () => {
    this.props.history.push("/");
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
        const sqlQuery = {
          sql:
            "SELECT * FROM users WHERE userId = '" + response.data.localId + "'"
        };
        axios
          .post("http://localhost:9000/API/query", sqlQuery)
          .then(response => {
            let user = {};
            response.data.map(row => {
              user = {
                id: row.id,
                username: row.username,
                email: row.email,
                address: row.address,
                phone: row.phone,
                userId: row.userId,
                level: row.level
              };
              return null;
            });
            localStorage.setItem("user", user);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId);
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
          .catch(error => {
            console.log(error);
          });
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
        localStorage.setItem("level", "normal");

        this.props.onSignInSuccess(
          response.data.idToken,
          response.data.localId,
          "normal"
        );
        const userInfo = {
          username: data.get("username"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          level: "normal",
          password: data.get("password")
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
            "','" +
            userInfo.password +
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
        this.setState({ signIn: true });
        this.props.onSignOut();
        this.props.history.push("/Auth");
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
        if (/\D/.test(formData.get("phone")) === false) {
          const formData = new FormData(document.querySelector("#signup"));
          this.onSignUp(formData);
        } else {
          this.setState({
            message: <p className={classes.MessageOn}>PHONE NUMBER INVALID</p>,
            messageClass: "phone"
          });
        }
      } else {
        this.setState({
          message: (
            <p className={classes.MessageOn}>CONFIRMED PASSWORD INCORRECT!</p>
          ),
          messageClass: "password"
        });
      }
    }
  };

  switchSign = () => {
    this.setState(prevState => {
      this.setState({
        message: <br></br>
      });
      return {
        signIn: !prevState.signIn
      };
    });
  };
  render() {
    if (this.props.token !== null) {
      this.onLogOut();
    }
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
        <p>{this.state.message}</p>
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
              <li>
                <Button btnType="SuccessSmall" type="submit">
                  SUBMIT
                </Button>
              </li>
            </ul>
          </form>
          {this.state.message}
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
    onSignInSuccess: (token, userId, user) =>
      dispatch(actions.signInSuccess(token, userId, user)),
    onSignInFail: data => dispatch(actions.signInFail(data)),
    onSignOut: () => dispatch(actions.logout())
  };
};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    entries: state.cartReducer.entries
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
