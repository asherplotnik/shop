import React from "react";
import classes from "./ShoppingCart.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../UI/Button/Button";
const shoppingCart = props => {
  const onDeletePressed = index => {
    const arr = [...props.entries];
    arr.splice(index, 1);
    props.deleteEntry(arr);
  };

  const shoppingHead = (
    <tr>
      <th
        style={{
          fontSize: "x-large",
          width: "100px",
          borderBottom: "solid 1px #b6e4f5"
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
      <th className={classes.Th}></th>
    </tr>
  );
  const shoppingBody = props.entries.map((entry, index) => {
    return (
      <tr key={index}>
        <td className={classes.Td}>
          <img
            src={"http://localhost:9000/images/" + entry.img}
            alt={entry.img}
            className={classes.Img}
          />
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
        <td className={classes.Td}>
          <Button
            clicked={() => onDeletePressed(index)}
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
  shoppingTable.push(shoppingBody);
  let subtotal = 0;
  props.entries.map(entry => (subtotal = subtotal + entry.total));
  const selectedItems = (
    <table style={{ borderCollapse: "collapse" }}>{shoppingTable}</table>
  );

  return (
    <div className={classes.Wrapper}>
      <h1>SHOPPING CART</h1>
      {selectedItems}
      <br></br>
      <p>
        SUBTOTAL: {subtotal}
        <span style={{ opacity: "0%" }}>{"___"}</span>
        <Button disabled={props.entries.length === 0} btnType="SuccessSmall">
          CONTINUE TO CHECKOUT
        </Button>
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    entries: state.cartReducer.entries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEntry: entries => dispatch(actions.deleteEntry(entries))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(shoppingCart);
