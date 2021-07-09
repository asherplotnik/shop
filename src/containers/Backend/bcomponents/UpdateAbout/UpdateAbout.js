import React from "react";
import classes from "./UpdateAbout.module.css";
import MyButton from "../../../../components/UI/Button/Button";
const UpdateAbout = (props) => {
  return (
    <div className={classes.Scroll}>
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
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="mainTitle">MAIN TITLE (THAI):</label>
          </li>
          <li>
            <input
              type="text"
              defaultValue={props.content.mainTitleT}
              name="mainTitleT"
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="firstImage">FIRST IMAGE:</label>
          </li>
          <li>
            <input type="file" name="firstImage" />
          </li>
          <br className={classes.Br}></br>
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
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="firstParagraphT">FIRST PARAGRAPH (THAI):</label>
          </li>
          <li>
            <textarea
              defaultValue={props.content.firstParagraphT}
              style={{ resize: "none" }}
              rows="2"
              cols="100"
              name="firstParagraphT"
              required
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="secondImage">SECOND IMAGE:</label>
          </li>
          <li>
            <input type="file" name="secondImage" />
          </li>
          <br className={classes.Br}></br>
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
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="secondParagraphT">SECOND PARAGRAPH (THAI):</label>
          </li>
          <li>
            <textarea
              defaultValue={props.content.secondParagraphT}
              style={{ resize: "none" }}
              rows="2"
              cols="100"
              name="secondParagraphT"
              required
            />
          </li>
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="thirdImage">THIRD IMAGE:</label>
          </li>
          <li>
            <input type="file" name="thirdImage" />
          </li>
          <br className={classes.Br}></br>
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
          <br className={classes.Br}></br>
          <li>
            <label htmlFor="thirdParagraphT">THIRD PARAGRAPH (THAI):</label>
          </li>
          <li>
            <textarea
              defaultValue={props.content.thirdParagraphT}
              style={{ resize: "none" }}
              rows="2"
              cols="100"
              name="thirdParagraphT"
              required
            />
          </li>
          <br className={classes.Br}></br>

          <MyButton btnType="continue" type="submit">SUBMIT</MyButton>
          <MyButton  btnType="cancel" type="button" clicked={props.onUpdateAbout}>
            CANCEL
          </MyButton>
        </ul>
      </form>
    </div>
  );
};

export default UpdateAbout;
