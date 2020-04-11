import React, { useState, useEffect } from "react";
import Modal from "../../../../components/UI/Modal/Modal";
import classes from "./BHome.module.css";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import { serverAddress } from "../../../../assets/helper";
import Spinner from "../../../../components/UI/Spinner/Spinner";
const BHome = (props) => {
  let [updateAboutPressed, setUpdateAboutPressed] = useState(false);
  let [content, setContent] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(serverAddress + "API/queryAboutUs").then((response) => {
      setContent(response.data);
      setLoading(false);
      console.log(response.data);
    });
  };

  const updateAboutHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateAboutUs"));
    axios
      .post(serverAddress + "API/updateAboutUs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setUpdateAboutPressed();
  };
  const onUpdateAbout = () => {
    setUpdateAboutPressed(!updateAboutPressed);
  };
  let viewPage = <Spinner />;
  if (!loading) {
    viewPage = (
      <div>
        <Modal
          width="900px"
          left="25%"
          show={updateAboutPressed}
          modalClosed={onUpdateAbout}
        >
          <form id="updateAboutUs" onSubmit={updateAboutHandler}>
            <ul className={classes.Ul}>
              <li>
                <label htmlFor="mainTitle">MAIN TITLE:</label>
              </li>
              <li>
                <input
                  type="text"
                  defaultValue={content.mainTitle}
                  name="mainTitle"
                />
              </li>
              <br></br>
              <li>
                <label htmlFor="firstImage">FIRST IMAGE:</label>
              </li>
              <li>
                <input type="file" name="firstImage" />
              </li>
              <br></br>
              <li>
                <label htmlFor="firstParagraph">FIRST PARAGRAPH:</label>
              </li>
              <li>
                <textarea
                  defaultValue={content.firstParagraph}
                  style={{ resize: "none" }}
                  rows="2"
                  cols="100"
                  name="firstParagraph"
                  required
                />
              </li>
              <br></br>
              <li>
                <label htmlFor="secondImage">SECOND IMAGE:</label>
              </li>
              <li>
                <input type="file" name="secondImage" />
              </li>
              <br></br>
              <li>
                <label htmlFor="secondParagraph">SECOND PARAGRAPH:</label>
              </li>
              <li>
                <textarea
                  defaultValue={content.secondParagraph}
                  style={{ resize: "none" }}
                  rows="2"
                  cols="100"
                  name="secondParagraph"
                  required
                />
              </li>
              <br></br>
              <li>
                <label htmlFor="thirdImage">THIRD IMAGE:</label>
              </li>
              <li>
                <input type="file" name="thirdImage" />
              </li>
              <br></br>
              <li>
                <label htmlFor="thirdParagraph">THIRD PARAGRAPH:</label>
              </li>
              <li>
                <textarea
                  defaultValue={content.thirdParagraph}
                  style={{ resize: "none" }}
                  rows="2"
                  cols="100"
                  name="thirdParagraph"
                  required
                />
              </li>
              <br></br>

              <button type="submit">SUBMIT</button>
              <button type="button" onClick={onUpdateAbout}>
                CANCEL
              </button>
            </ul>
          </form>
        </Modal>
        <h1>Bhome</h1>
        <Button clicked={onUpdateAbout} btnType="SuccessSmall">
          Update About Us
        </Button>
      </div>
    );
  }
  return viewPage;
};

export default BHome;
