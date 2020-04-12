import React from "react";
import classes from "./UpdateAbout.module.css";
const UpdateAbout = (props) => {
  return (
    <div>
      <form id="updateAboutUs" onSubmit={props.updateAboutHandler}>
        <ul className={classes.Ul}>
          <li>
            <label htmlFor="mainTitle">MAIN TITLE:</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.mainTitle}
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
              defaultValue={props.content.firstParagraph}
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
              defaultValue={props.content.secondParagraph}
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
              defaultValue={props.content.thirdParagraph}
              style={{ resize: "none" }}
              rows="2"
              cols="100"
              name="thirdParagraph"
              required
            />
          </li>
          <br></br>

          <button type="submit">SUBMIT</button>
          <button type="button" onClick={props.onUpdateAbout}>
            CANCEL
          </button>
        </ul>
      </form>
    </div>
  );
};

export default UpdateAbout;
