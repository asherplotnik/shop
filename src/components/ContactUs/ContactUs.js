import React from "react";
import classes from "./ContactUs.module.css";
import Button from "../UI/Button/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { serverAddress, dic } from "../../assets/helper";
import axios from "axios";

const ContactUs = (props) => {
  const onSendClicked = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#contactUs"));
    const emailBody =
      "First name: " +
      formData.get("firstName") +
      "<br />" +
      "last name: " +
      formData.get("lastName") +
      "<br />" +
      "Email: " +
      formData.get("requestEmail") +
      "<br />" +
      "Subject: " +
      formData.get("requestSubject") +
      "<br />" +
      "Details: " +
      formData.get("requestDetails");

    formData.append("email", "asherplotnik@gmail.com");
    formData.append("subject", "INDY FASHION Customer contact us!!!");
    formData.append("body", emailBody);
    axios
      .post(serverAddress + "email/sendEmail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert(dic.emailSent[props.lang]);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("clicked send");
  };
  let mainTitle = dic.contactUs[props.lang];
  let firstHeader = classes.FirstHeader;
  let firstDiv = classes.FirstDiv;
  if (props.lang === "thai") {
    firstHeader = classes.FirstHeaderT;
    firstDiv = classes.FirstDivT;
  }
  return (
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
              required
            />
            <span style={{ opacity: "0" }}>________________</span>
            <input
              type="text"
              name="lastName"
              placeholder={dic.lastName[props.lang]}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="requestEmail"
              placeholder={dic.emailC[props.lang]}
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
              cols="50"
              name="requestDetails"
              placeholder={dic.details[props.lang]}
              required
            />
          </div>
          <div style={{ fontSize: "1.6em" }}>
            <Button type="submit" btnType="NavySmall">
              {dic.send[props.lang]}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    lang: state.langReducer.lang,
  };
};

export default connect(mapStateToProps)(withRouter(ContactUs));
