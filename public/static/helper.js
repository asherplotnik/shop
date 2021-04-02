import React from "react";
import axios from "axios";

export function makeShittyTable(obj) {
  let table = {};
  let firstLine = {};
  let keysArr = [];
  let akey = obj.slice(0, 1).map((keys) => {
    for (let i = 0; i < Object.getOwnPropertyNames(keys).length; i++) {
      keysArr[i] = Object.getOwnPropertyNames(keys)[i];
    }
    return Object.getOwnPropertyNames(keys)[0];
  });
  firstLine = (
    <tr>
      {keysArr.map((aKey) => (
        <th key={akey}>{aKey}</th>
      ))}
    </tr>
  );
  let rows = obj.map((row) => {
    let rowArr = [];
    for (let i = 0; i < keysArr.length; i++) {
      rowArr.push(<td key={i}>{row[keysArr[i]]}</td>);
    }
    return <tr>{rowArr}</tr>;
  });
  table = [firstLine, ...rows];
  return <table>{table}</table>;
}

export function requestQuery(sql, action) {
  const sqlQuery = { sql: sql };
  axios
    .post(serverAddress + "API/" + action, sqlQuery)
    .then((response) => {
      console.log("[response.data] => ", response.data);
      if (action === "query") {
        this.setState({
          loading: false,
          collections: response.data,
        });
      } else if (action === "delete") {
        this.setState({
          loading: false,
          deletePressed: false,
          canceled: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({ loading: false, deletePressed: false });
    });
}

export const dic = {
  collections: { eng: "COLLECTIONS", thai: "คอลเลกชัน" },
  home: { eng: "HOME", thai: "หน้าแรก" },
  aboutUs: { eng: "ABOUT US", thai: "เกี่ยวกับเรา" },
  aboutYou: { eng: "ABOUT YOU", thai: "ข้อมูลส่วนตัว" },
  backend: { eng: "BACK END", thai: "แบ็กเอนด์" },
  items: { eng: "ITEMS", thai: "รายการ" },
  cancel: { eng: "CANCEL", thai: "ยกเลิก" },
  submit: { eng: "SUBMIT", thai: "เสนอ" },
  search: { eng: "SEARCH: ", thai: "ค้นหา: " },
  trending: { eng: "TRENDING", thai: "แนวโน้ม" },
  yourDetails: { eng: "YOUR DETAILS", thai: "รายละเอียด" },
  yourOrders: { eng: "YOUR ORDERS", thai: "ออเดอร์" },
  name: { eng: "NAME: ", thai: "ชื่อ: " },
  phone: { eng: "PHONE: ", thai: "โทรศัพท์: " },
  address: { eng: "ADDRESS: ", thai: "ที่อยู่: " },
  email: { eng: "EMAIL :", thai: "อีเมล: " },
  emailC: { eng: "Email", thai: "อีเมล " },
  newEmail: { eng: "NEW EMAIL :", thai: "อีเมลใหม่: " },
  confirmEmail: { eng: "CONFIRM EMAIL :", thai: "ยืนยันอีเมล: " },
  password: { eng: "PASSWORD: ", thai: "รหัสผ่าน: " },
  confirmPassword: { eng: "CONFIRM PASSWORD: ", thai: "ยืนยันรหัสผ่าน: " },
  orderId: { eng: "ORDER ID: ", thai: "ออเดอร์: " },
  paymentDate: { eng: "PAYMENT DATE: ", thai: "วันที่จ่าย: " },
  note: { eng: "note: ", thai: "บันทึก: " },
  status: { eng: "STATUS: ", thai: "สถานะ: " },
  trackingNo: { eng: "TRACKING No: ", thai: "รหัสไปรษณีย์: " },
  code: { eng: "CODE: ", thai: "รหัส: " },
  variation: { eng: "VARIATION: ", thai: "เภท: " },
  quantity: { eng: "QUANTITY: ", thai: "จำนวน: " },
  price: { eng: "PRICE: ", thai: "ราคา: " },
  total: { eng: "TOTAL: ", thai: "รวม: " },
  subTotal: { eng: "Sub total: ", thai: "รวมหมด: " },
  changeDetails: { eng: "CHANGE DETAILS", thai: "เปลี่ยนรายละเอียด" },
  changeEmail: { eng: "CHANGE EMAIL", thai: "เปลี่ยนอีเมล" },
  changePassword: { eng: "CHANGE PASSWORD", thai: "เปลี่ยนรหัสผ่าน" },
  signIn: { eng: "SIGN IN", thai: "เข้าสู่ระบบ" },
  signUp: { eng: "SIGN UP", thai: "สมัคร" },
  checkingPayment: {
    eng: "CHECKING PAYMENT",
    thai: "รอการยืนยันชำระเงิน",
  },
  paymentConfirmed: {
    eng: "PAYMENT CONFIRMED",
    thai: "ยืนยันการชำระเงินแล้ว",
  },
  shipped: { eng: "SHIPPED", thai: "ส่งแล้ว" },
  specialIssue: { eng: "SPECIAL ISSUE", thai: "กรณีพิเศษ" },
  canceled: { eng: "CANCELED", thai: "ยกเลิก" },
  size: { eng: "SIZE: ", thai: "ขนาด: " },
  contactUs: { eng: "Contact Us ", thai: "ติดต่อกับเรา" },
  send: { eng: "SEND ", thai: "ส่ง" },
  firstName: { eng: "First Name ", thai: "ชื่อ" },
  lastName: { eng: "Last Name ", thai: "นามสกุล" },
  subject: { eng: "Subject ", thai: "เรื่อง" },
  details: { eng: "Details ", thai: "รายละเอียด" },
  emailSent: {
    eng: "Email Sent Successfully. Thank you. ",
    thai: "ส่งอีเมลสำเร็จแล้วขอบคุณ",
  },
  moreDetails: { eng: "MORE DETAILS", thai: "รายละเอียด" },
};

export const awsApi = "";
export const local = "http://localhost:8080/";
export const lan = "http://192.168.1.103:9000/";
export const heroku = "https://indyapi.herokuapp.com/";
//export const gc = "https://storage.cloud.google.com/indy-4cba2.appspot.com/";
export const gc = "https://s3-ap-southeast-1.amazonaws.com/indyfashion.images/";
export const serverAddress = local;
