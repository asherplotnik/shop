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
class BStock extends Component {
  state = {
    drop: [],
    stock: [],
    transactions: [],
    loadingDrop: true,
    loadingStock: true,
    loadingTransactions: true,
    val: "",
    image: "",
    pressedDelete: false,
    pressedUpdate: false,
    pressedRecordId: null,
    pressedRecordCode: null,
    pressedRecordQty: null,
    pressedRecordVariation: null,
    pressedRecordInout: null,
    pressedRecordTransdate: null,
    pressedRecordNote: null
  };

  componentDidMount() {
    this.requestDrop();
  }
  requestDrop = () => {
    const sqlQuery = { sql: "select code from items " };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        this.setState({ drop: response.data });
        this.setState({ loadingDrop: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loadingDrop: false });
      });
  };

  requestStock = val => {
    const sqlQuery = {
      sql: "SELECT * FROM stock WHERE code = '" + val + "'"
    };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        this.setState({ stock: response.data });
        this.setState({ loadingStock: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loadingStock: false });
      });
  };

  checkImageName = val => {
    const sqlQuery = {
      sql: "SELECT img FROM items WHERE code = '" + val + "'"
    };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        console.log("http://localhost:9000/images/" + response.data[0].img);
        this.setState({
          image: "http://localhost:9000/images/" + response.data[0].img
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  requestTransactions = val => {
    const sqlQuery = {
      sql: "SELECT * FROM transactions WHERE code = '" + val + "'"
    };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        this.setState({ transactions: response.data });
        this.setState({ loadingTransactions: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loadingTransactions: false });
      });
  };

  callRequestStock = val => {
    this.setState({ loadingStock: true });
    this.requestStock(val);
    this.requestTransactions(val);
  };

  onDeletePressed = () => {
    this.setState(prevState => {
      return {
        pressedDelete: !prevState.pressedDelete
      };
    });
  };
  onUpdatePressed = row => {
    this.setState(prevState => {
      return {
        pressedUpdate: !prevState.pressedUpdate
      };
    });
  };

  onDeleteHandler = rId => {
    this.requestQuery("delete from transactions where id = " + rId, "delete");
  };

  onUpdateHandler = row => {
    this.setState({
      pressedRecordId: row.rowId,
      pressedRecordCode: row.code,
      pressedRecordQty: row.qty,
      pressedRecordVariation: row.variation,
      pressedRecordInout: row.inout,
      pressedRecordTransdate: row.transdate,
      pressedRecordNote: row.note
    });
    // this.requestQuery(
    // "delete from transactions where id = " + rId,
    // "delete"
    // );
  };

  stockTable = () => {
    const stockColumns = [
      {
        Header: <strong className={classes.Stock}>QUANTITY</strong>,
        accessor: "qty",
        Cell: row => <span className={classes.Stock}>{row.value}</span>,
        width: 199
      },
      {
        Header: <strong className={classes.Stock}>VARIATION</strong>,
        accessor: "variation",
        Cell: row => <span className={classes.Stock}>{row.value}</span>,
        width: 199
      }
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
    let option = this.state.drop.map(row => {
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
          getOptionLabel={option => option}
          className={classes.Auto}
          autoComplete
          autoHighlight
          includeInputInList
          renderInput={params => (
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
        <Modal
          show={this.state.pressedDelete}
          modalClosed={this.onDeletePressed}
        >
          <ModalConfirm
            modalClosed={this.onDeletePressed}
            deleteConfirmed={this.onDeleteHandler}
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
        <div className={classes.Trans}>{viewTrans}</div>
      </div>
    );
  }
}
export default BStock;
