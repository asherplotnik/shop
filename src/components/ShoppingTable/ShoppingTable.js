import React from "react";
import classes from "./ShoppingTable.module.css";
import Button from "../UI/Button/Button";
import { gc } from "../../assets/helper";
const shoppingTable = (props) => {
  const shoppingHead = (
    <thead>
      <tr key={"head"}>
        <th
          style={{
            fontSize: "x-large",
            width: "100px",
            borderBottom: "solid 1px #b6e4f5",
          }}
        >
          IMAGE
        </th>
        <th className={classes.Th}>CODE</th>
        <th className={classes.Th}>DESCRIPTION</th>
        <th className={classes.Th}>#</th>
        <th className={classes.Th}>QUANTITY</th>
        <th className={classes.Th}>PRICE</th>
        <th className={classes.Th}>TOTAL</th>
        <th
          className={props.onDeletePressed ? classes.Th : classes.Tbutton}
        ></th>
      </tr>
    </thead>
  );

  const shoppingBody = props.entries.map((entry, index) => {
    return (
      <tr key={index}>
        <td className={classes.Td}>
          <img src={gc + entry.img} alt={entry.img} className={classes.Img} />
        </td>
        <td className={classes.Td}>
          <span>{entry.code}</span>
        </td>
        <td className={classes.Td}>
          <span>{entry.desc}</span>
        </td>
        <td className={classes.Td}>
          <span>{entry.variation}</span>
        </td>
        <td className={classes.Td}>
          <span>{entry.quantity}</span>
        </td>
        <td className={classes.Td}>
          <span>{entry.price}</span>
        </td>
        <td className={classes.Td}>
          <span>{entry.total}</span>
        </td>
        <td className={props.onDeletePressed ? classes.Td : classes.Tbutton}>
          <Button
            clicked={() => props.onDeletePressed(index)}
            btnType="ShoppingTable"
          >
            REMOVE
          </Button>
        </td>
      </tr>
    );
  });

  const shoppingTable = [];
  shoppingTable.push(shoppingHead);
  shoppingTable.push(<tbody>{shoppingBody}</tbody>);
  let subtotal = 0;
  props.entries.map((entry) => (subtotal = subtotal + entry.total));
  const selectedItems = <table className={classes.Tb}>{shoppingTable}</table>;
  return selectedItems;
};

export default shoppingTable;
