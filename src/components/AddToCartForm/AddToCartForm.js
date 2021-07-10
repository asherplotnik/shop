import React, { useState } from "react";
import ReactTable from "react-table-6";
import classes from "./AddToCartForm.module.css";
import MyButton from "../UI/Button/Button";
import { MenuItem, TextField, Typography } from "@material-ui/core";
import { dic } from "../../assets/helper";
import { store } from "../..";
const AddToCartForm = (props) => {
  const lang = store.getState().langReducer.lang;
  const [variation, setVariation] = useState();
  const stockColumns = [
    {
      Header: <strong className={classes.StockColumns}>IN STOCK</strong>,
      accessor: "qty",
      Cell: (row) => <span className={classes.StockColumns}>{row.value}</span>,
      width: 130,
    },
    {
      Header: <strong className={classes.StockColumns}>#</strong>,
      accessor: "variation",
      Cell: (row) => <span className={classes.StockColumns}>{row.value}</span>,
    },
  ];
  let option = props.stock.map((row, index) => {
    return (
      <MenuItem key={index} value={row.variation}>
        {row.variation}
      </MenuItem>
    );
  });

  const findImage = (variation) => {
    for (let i = 0; i < props.stock.length; i++) {
      if (props.stock[i].variation === variation) {
        return props.stock[i].img;
      }
    }
  };

  const handleVariation = (e) => {
    setVariation(e.target.value);
  };
  const checkValidity = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addToCart"));
    const qty = formData.get("quantity");
    const vari = formData.get("selectedVar");
    const img = findImage(vari);
    let entry = null;
    for (let i = 0; i < props.stock.length; i++) {
      if (props.stock[i].variation === vari) {
        if (qty <= props.stock[i].qty) {
          entry = { selectedVar: vari, quantity: qty, img: img };
        }
        i = props.stock.length;
      }
    }
    if (entry !== null) {
      props.confirmForm(entry);
    } else {
      alert("INVALID INPUT!");
    }
  };

  return (
    <div>
      <Typography component="h1" variant="h6">
        ADD TO CART
      </Typography>
      <ReactTable
        style={{ border: "1px solid #b6e4f5" }}
        columns={stockColumns}
        data={
          props.stock.length >= 1 ? props.stock : [{ qty: 0, variation: "-" }]
        }
        defaultPageSize={50}
        minRows={1}
        showPagination={false}
      />
      <div className={classes.Font}>
        <form id="addToCart" onSubmit={checkValidity}>
          <br />

          <TextField
            className={classes.TextField}
            value={variation}
            onChange={handleVariation}
            variant="outlined"
            name="selectedVar"
            select
            label="SELECT VARIATION:"
            helperText="Please select variation"
          >
            {option}
          </TextField>
          <br />
          <TextField
            className={classes.TextField}
            min="1"
            step="1"
            defaultValue="1"
            variant="outlined"
            margin="normal"
            required
            label={dic.quantity[lang]}
            name="quantity"
            type="number"
            autoFocus
          />
          <br />
          <ul className={classes.Flist}>
            <li>
              {" "}
              <MyButton type="submit" btnType="continue">
                CONTINUE
              </MyButton>
              <MyButton btnType="cancel" clicked={props.cancel}>
                CANCEL
              </MyButton>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};
export default AddToCartForm;
