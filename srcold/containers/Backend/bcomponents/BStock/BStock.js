import React, { Component } from "react";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import classes from "./BStock.module.css";
import ReactTable from "react-table-6";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TransactionTable from "../TransactionTable/TransactionTable";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import Button from "../../../../components/UI/Button/Button";
import AddTransForm from "../AddTransForm/AddTransForm";
import { serverAddress, gc } from "../../../../assets/helper";

class BStock extends Component {
  state = {
    illegal: false,
    drop: [],
    stock: [],
    transactions: [],
    loadingDrop: true,
    loadingStock: true,
    loadingTransactions: true,
    val: null,
    image: "",
    addEntryPressed: false,
    pressedDelete: false,
    pressedUpdate: false,
    pressedRecordId: null,
    pressedRecordCode: null,
    pressedRecordQty: null,
    pressedRecordVariation: null,
    pressedRecordInout: null,
    pressedRecordTransdate: null,
    pressedRecordNote: null,
  };

  componentDidMount() {
    this.requestDrop();
  }

  onAddEntryPressed = () => {
    this.setState((prevState) => {
      return {
        addEntryPressed: !prevState.addEntryPressed,
        loadingTransactions: !prevState.loadingTransactions,
      };
    });
  };

  onToggleUpdate = () => {
    this.setState((prevState) => {
      return {
        pressedUpdate: !prevState.pressedUpdate,
      };
    });
  };

  onUpdateTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateTransForm"));
    formData.append("addCode", this.state.val);
    formData.append("oldVariation", this.state.pressedRecordVariation);
    formData.append("oldQty", this.state.pressedRecordQty);
    formData.append("oldInout", this.state.pressedRecordInout);
    formData.append("addId", this.state.pressedRecordId);
    this.onToggleUpdate();
    axios
      .post(serverAddress + "API/updateTransForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        document.querySelector("#updateTransForm").reset();
        this.requestTransactions(this.state.val);
        this.requestStock(this.state.val);
        if (response.data === "ILLEGAL ACTION") {
          this.setState({ illegal: true });
        }
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#updateTransForm").reset();
        this.requestTransactions(this.state.val);
      });
  };

  onAddTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addTransForm"));
    formData.append("addCode", this.state.val);
    this.onAddEntryPressed();

    axios
      .post(serverAddress + "API/uploadTransForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        document.querySelector("#addTransForm").reset();
        this.requestTransactions(this.state.val);
        this.requestStock(this.state.val);
        if (response.data === "ILLEGAL ACTION") {
          this.setState({ illegal: true });
        }
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#addTransForm").reset();
        this.requestTransactions(this.state.val);
      });
  };

  onDeletePressed = (row) => {
    this.setState((prevState) => {
      return {
        pressedDelete: !prevState.pressedDelete,
        pressedRecordId: row.rowId,
        pressedRecordInout: row.inout,
        pressedRecordCode: row.code,
        pressedRecordVariation: row.variation,
        pressedRecordQty: row.qty,
      };
    });
  };

  onToggleDelete = () => {
    this.setState({ pressedDelete: false });
  };

  onDeleteHandler = () => {
    let sql =
      "delete from transactions where id = " + this.state.pressedRecordId;
    const sqlQuery = {
      sql: sql,
      code: this.state.pressedRecordCode,
      qty: this.state.pressedRecordQty,
      variation: this.state.pressedRecordVariation,
      inout: this.state.pressedRecordInout,
    };
    axios
      .post(serverAddress + "API/deleteTransaction", sqlQuery)
      .then((response) => {
        this.requestTransactions(this.state.val);
        this.requestStock(this.state.val);
        this.onToggleDelete();
        if (response.data === "ILLEGAL ACTION") {
          this.setState({ illegal: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.onToggleDelete();
      });
  };

  requestDrop = () => {
    const sqlQuery = { sql: "select code from items " };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        this.setState({ drop: response.data });
        this.setState({ loadingDrop: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingDrop: false });
      });
  };

  requestStock = (val) => {
    const sqlQuery = {
      sql: "SELECT * FROM stock WHERE code = '" + val + "'",
    };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        this.setState({ stock: response.data });
        this.setState({ loadingStock: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingStock: false });
      });
  };

  checkImageName = (val) => {
    const sqlQuery = {
      sql: "SELECT img FROM items WHERE code = '" + val + "'",
    };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        console.log(gc + "images/" + response.data[0].img);
        this.setState({
          image: gc + "images/" + response.data[0].img,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  requestTransactions = (val) => {
    const sqlQuery = {
      sql: "SELECT * FROM transactions WHERE code = '" + val + "'",
    };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        this.setState({ loadingTransactions: false });
        this.setState({ transactions: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingTransactions: false });
      });
  };

  callRequestStock = (val) => {
    this.setState({ loadingStock: true });
    this.requestStock(val);
    this.requestTransactions(val);
  };

  onUpdatePressed = (row) => {
    this.setState((prevState) => {
      return {
        pressedUpdate: !prevState.pressedUpdate,
        pressedRecordId: row.rowId,
        pressedRecordInout: row.inout,
        pressedRecordCode: row.code,
        pressedRecordVariation: row.variation,
        pressedRecordQty: row.qty,
        pressedRecordNote: row.note,
      };
    });
  };

  onIllegalClose = () => {
    this.setState({ illegal: false });
  };

  onUpdateHandler = (row) => {
    this.setState({
      pressedRecordId: row.rowId,
      pressedRecordCode: row.code,
      pressedRecordQty: row.qty,
      pressedRecordVariation: row.variation,
      pressedRecordInout: row.inout,
      pressedRecordTransdate: row.transdate,
      pressedRecordNote: row.note,
    });
  };

  stockTable = () => {
    const stockColumns = [
      {
        Header: <strong className={classes.Stock}>QUANTITY</strong>,
        accessor: "qty",
        Cell: (row) => <span className={classes.Stock}>{row.value}</span>,
        width: 199,
      },
      {
        Header: <strong className={classes.Stock}>VARIATION</strong>,
        accessor: "variation",
        Cell: (row) => <span className={classes.Stock}>{row.value}</span>,
        width: 199,
      },
    ];
    return (
      <div className={classes.OutputDiv}>
        <ReactTable
          className={classes.RTable}
          columns={stockColumns}
          data={this.state.stock}
          defaultPageSize={50}
          minRows={1}
          showPagination={false}
        />
      </div>
    );
  };

  render() {
    let option = this.state.drop.map((row) => {
      return row.code;
    });
    let viewDrop = <Spinner />;
    if (!this.state.loadingDrop) {
      viewDrop = (
        <Autocomplete
          id="combo-box-demo"
          size="small"
          value={this.state.val}
          onChange={(event, newValue) => {
            this.setState({ val: newValue });
            this.callRequestStock(newValue);
            this.checkImageName(newValue);
          }}
          options={option}
          getOptionLabel={(option) => option}
          className={classes.Auto}
          autoComplete
          autoHighlight
          includeInputInList
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      );
    }
    let viewStock = "";
    let viewTrans = "";
    if (!this.state.loadingTransactions) {
      viewStock = this.stockTable();
      viewTrans = (
        <TransactionTable
          pressedDelete={this.onDeletePressed}
          pressedUpdate={this.onUpdatePressed}
          transactions={this.state.transactions}
        />
      );
    }
    return (
      <div className={classes.WrapperFlex}>
        <Modal show={this.state.illegal} modalClosed={this.onIllegalClose}>
          <div>ILLEGAL ACTION</div>
          <div>
            <Button clicked={this.onIllegalClose} btnType="DangerSmall">
              Ok
            </Button>
          </div>
        </Modal>
        <Modal
          show={this.state.pressedDelete}
          modalClosed={this.onDeletePressed}
        >
          <ModalConfirm
            modalClosed={this.onDeletePressed}
            confirmed={this.onDeleteHandler}
          />
        </Modal>
        <Modal
          show={this.state.addEntryPressed}
          modalClosed={this.onAddEntryPressed}
        >
          <AddTransForm
            formId="addTransForm"
            addTransaction={this.onAddTransaction}
            title="ENTER TRANSACTION"
            modalClosed={this.onAddEntryPressed}
          />
        </Modal>
        <Modal
          show={this.state.pressedUpdate}
          modalClosed={this.onUpdatePressed}
        >
          <AddTransForm
            formId="updateTransForm"
            addTransaction={this.onUpdateTransaction}
            title="UPDATE TRANSACTION"
            rCode={this.state.pressedRecordCode}
            rQty={this.state.pressedRecordQty}
            rVariation={this.state.pressedRecordVariation}
            rInout={this.state.pressedRecordInout}
            rNote={this.state.pressedRecordNote}
            modalClosed={this.onUpdatePressed}
          />
        </Modal>
        <div>
          <div className={classes.EnterCode}>ENTER CODE</div>
          <div className={classes.QueryDiv}>{viewDrop}</div>
          <div>{viewStock}</div>
          <div className={classes.OutputDiv}>
            <img
              className={
                this.state.image === "" ? classes.ImgHide : classes.ImgShow
              }
              src={this.state.image}
              alt="hi"
            />
          </div>
        </div>
        <div>
          <div className={classes.NewEntry}>
            <Button
              clicked={this.onAddEntryPressed}
              disabled={this.state.val === null}
              btnType="Success"
            >
              ADD ENTRY:
            </Button>
          </div>
          <div className={classes.Trans}>{viewTrans}</div>
        </div>
      </div>
    );
  }
}
export default BStock;
