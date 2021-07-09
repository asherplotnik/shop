import React from "react";
import ReactTable from "react-table-6";
import classes from "./AddToCartForm.module.css";
import MyButton from "../UI/Button/Button";
const AddToCartForm = (props) => {
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
    return <option key={index}>{row.variation}</option>;
  });

  const findImage = (variation) => {
    for (let i = 0; i < props.stock.length; i++) {
      if (props.stock[i].variation === variation) {
        return props.stock[i].img;
      }
    }
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
      alert("QUANTITY ABOVE STOCK AVAILABILITY!");
    }
  };

  return (
    <div>
      <h1 className={classes.Title}>ADD TO CART</h1>
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
          {/*onSubmit={props.confirmForm}> */}
          <ul className={classes.Flist}>
            <li>
              {" "}
              <label htmlFor="selectedVar"> SELECT VARIATION: </label>{" "}
              <select name="selectedVar">{option}</select>
            </li>
            <li>
              {" "}
              <label htmlFor="quantity">ENTER QUANTITY:</label>{" "}
              <input
                type="number"
                name="quantity"
                min="1"
                step="1"
                defaultValue="1"
                required
              />
            </li>
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
