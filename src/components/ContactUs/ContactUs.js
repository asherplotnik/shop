import React, { useState } from "react";
import classes from "./ContactUs.module.css";
import MyButton from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { serverAddress, dic } from "../../assets/helper";
import axios from "axios";

const ContactUs = (props) => {
  const [loading, setLoading] = useState(false);
  const onSendClicked = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#contactUs"));
    const emailBody =
      "First name: " +
      formData.get("firstName") +
      "\n" +
      "last name: " +
      formData.get("lastName") +
      "\n" +
      "Email: " +
      formData.get("requestEmail") +
      "\n" +
      "Subject: " +
      formData.get("requestSubject") +
      "\n" +
      "Details: " +
      formData.get("requestDetails");

    formData.append("email", "asherplotnik@gmail.com");
    formData.append("subject", "INDY FASHION Customer contact us!!!");
    formData.append("body", emailBody);
    setLoading(true);
    axios
      .post(serverAddress + "user/email/sendContactUsEmail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        alert(dic.emailSent[props.lang]);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let mainTitle = dic.contactUs[props.lang];
  let firstHeader = classes.FirstHeader;
  let firstDiv = classes.FirstDiv;
  if (props.lang === "thai") {
    firstHeader = classes.FirstHeaderT;
    firstDiv = classes.FirstDivT;
  }
  let userEmail = null;
  let userName = null;
  let firstName = null;
  let lastName = null;
  if (props.token !== null) {
    userEmail = props.user.email;
    userName = props.user.username.split(" ");
    firstName = userName[0];
    if (userName.length > 1) lastName = userName[1];
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  let pageView = <Spinner />;
  if (!loading) {
    pageView = (
      <div className={[classes.Wrapper, classes.Trans].join(" ")}>
        <div>
          <h1 className={firstHeader}>{mainTitle}</h1>
        </div>
        <div className={firstDiv}>
          <form id="contactUs" onSubmit={onSendClicked}>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder={dic.firstName[props.lang]}
                defaultValue={firstName}
                required
              />
              <span style={{ opacity: "0" }}>________________</span>
              <input
                type="text"
                name="lastName"
                placeholder={dic.lastName[props.lang]}
                defaultValue={lastName}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="requestEmail"
                placeholder={dic.emailC[props.lang]}
                defaultValue={userEmail}
                required
              />
              <span style={{ opacity: "0" }}>________________</span>
              <input
                type="text"
                name="requestSubject"
                placeholder={dic.subject[props.lang]}
                required
              />
            </div>
            <div>
              <textarea
                style={{ resize: "none" }}
                rows="5"
                name="requestDetails"
                placeholder={dic.details[props.lang]}
                required
              />
            </div>
            <div style={{ fontSize: "1.6em" }}>
              <MyButton type="submit" btnType="email">
                {dic.send[props.lang]}
              </MyButton>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return pageView;
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    lang: state.langReducer.lang,
  };
};

export default connect(mapStateToProps)(withRouter(ContactUs));
