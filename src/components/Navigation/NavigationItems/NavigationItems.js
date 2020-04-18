import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => {
  const dic = {
    home: { eng: "HOME", thai: "หน้าแรก" },
    collections: { eng: "COLLECTIONS", thai: "คอลเลกชัน" },
    trending: { eng: "TRENDING NOW", thai: "แนวโน้ม" },
    aboutUs: { eng: "ABOUT US", thai: "เกี่ยวกับเรา" },
    aboutYou: { eng: "ABOUT YOU", thai: "ข้อมูลส่วนตัว" },
    backend: { eng: "BACK END", thai: "แบ็กเอนด์" },
  };
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem show={true} link="/" exact>
        {dic.home[props.lang]}
      </NavigationItem>
      <NavigationItem show={true} link="/collections" exact>
        {dic.collections[props.lang]}
      </NavigationItem>
      <NavigationItem show={true} link="/trending" exact>
        {dic.trending[props.lang]}
      </NavigationItem>
      <NavigationItem show={true} link="/about" exact>
        {dic.aboutUs[props.lang]}
      </NavigationItem>
      <NavigationItem show={props.showAccount} link="/profile" exact>
        {dic.aboutYou[props.lang]}
      </NavigationItem>
      <NavigationItem
        bStyle={{ backgroundColor: "rgb(235, 232, 232)" }}
        show={props.showBackend}
        link="/backend"
        exact
      >
        {dic.backend[props.lang]}
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
