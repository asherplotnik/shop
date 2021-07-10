import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import MyButton from "../UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { dic, serverAddress } from "../../assets/helper";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextareaAutosize } from "@material-ui/core";
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
    };
    let url = serverAddress + "/auth/signIn";
    axios
      .post(url, authData)
      .then((response) => {
        let session = response.data;
        let user = {
          id: session.id,
          username: session.username,
          email: session.email,
          address: session.address,
          phone: session.phone,
          userId: session.userId,
          level: session.level,
          expiration: session.expiration,
        };
        localStorage.setItem("userName", user.username);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userAddress", user.address);
        localStorage.setItem("userPhone", user.phone);
        localStorage.setItem("userLevel", user.level);
        localStorage.setItem("user", user);
        localStorage.setItem("userId", user.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationDate", user.expiration);

        this.props.onSignInSuccess(response.data.token, user.id, user);
        if (this.props.entries.length > 0) {
          this.props.history.push("/checkout");
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        this.props.onSignInFail(err.response?.data.error);
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

    let url = serverAddress + "/auth/signUp";
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
    let form = (
      
        <div className={[classes.Auth, classes.TransIn].join(" ")}>
          <form id="signin" onSubmit={this.onSub} className={classes.Form}>
            <Typography component="h1" variant="h6">
              {dic.signIn[lang]}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={dic.email[lang]}
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={dic.password[lang]}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <br />
            <br />
            <MyButton btnType="continue" type="submit">
              {dic.submit[lang]}
            </MyButton>
          </form>
          <p>{this.state.message}</p>
        </div>
    );

    if (!this.state.signIn)
      form = (
        <div className={[classes.Auth, classes.TransUp].join(" ")}>
          <form id="signup" onSubmit={this.onSub} className={classes.Form}>
            <Typography component="h1" variant="h6">
              {dic.signUp[lang]}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={dic.name[lang]}
              name="username"
              type="text"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={dic.address[lang]}
              name="address"
              type="text"
              multiline
              rows={2}
              autoFocus
            />
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={dic.phone[lang]}
              name="phone"
              type="text"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={dic.email[lang]}
              name="email"
              type="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={dic.password[lang]}
              name="password"
              type="password"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={dic.confirmPassword[lang]}
              name="confirm"
              type="password"
              autoFocus
            />
            <br />
            <br />
            <MyButton btnType="continue" type="submit">
              {dic.submit[lang]}
            </MyButton>
          </form>
          {this.state.message}
        </div>
      );

    return (
      <div >
        {form}
        {this.state.signIn ? (
          <MyButton clicked={this.switchSign} btnType="signup">
            {dic.signUp[lang]}
          </MyButton>
        ) : (
          <MyButton clicked={this.switchSign} btnType="signin">
            {dic.signIn[lang]}
          </MyButton>
        )}
        
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
