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
import AddVariationForm from "../AddVariationForm/AddVariationForm";
import DeleteVariationForm from "../DeleteVariationForm/DeleteVariationForm";
import { serverAddress } from "../../../../assets/helper";

class BStock extends Component {
  state = {
    illegal: false,
    drop: [],
    stock: [],
    transactions: [],
    loadingDrop: true,
    loadingStock: true,
    loadingTransactions: true,
    val: "-",
    image: "",
    addEntryPressed: false,
    addVariationPressed: false,
    deleteVariationPressed: false,
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
  onAddVariationPressed = () => {
    this.setState((prevState) => {
      return {
        addVariationPressed: !prevState.addVariationPressed,
        loadingTransactions: !prevState.loadingTransactions,
      };
    });
  };
  onDeleteVariationPressed = () => {
    this.setState((prevState) => {
      return {
        deleteVariationPressed: !prevState.deleteVariationPressed,
        loadingTransactions: !prevState.loadingTransactions,
      };
    });
  };

  onToggleUpdate = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        pressedUpdate: !prevState.pressedUpdate,
      };
    });
  };

  onUpdateTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateTransForm"));
    formData.append("id", this.state.pressedRecordId);
    this.onToggleUpdate();
    axios
      .post(serverAddress + "admin/updateTransaction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
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
        alert(error.response.data.message);
        document.querySelector("#updateTransForm").reset();
        this.requestTransactions(this.state.val);
      });
  };
  onDeleteVariation = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteVariation"));
    const deleteVar = formData.get("deleteVariation");
    this.onDeleteVariationPressed();
    axios
      .delete(
        serverAddress + `admin/deleteVariation/${this.state.val}/${deleteVar}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        document.querySelector("#deleteVariation").reset();
        this.requestTransactions(this.state.val);
        this.requestStock(this.state.val);
        if (response.data === "ILLEGAL ACTION") {
          this.setState({ illegal: true });
        }
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#deleteVariation").reset();
        this.requestTransactions(this.state.val);
      });
  };

  onAddVariation = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addVariation"));
    formData.append("mainTitleT", this.state.val);
    this.onAddVariationPressed();
    axios
      .post(serverAddress + "admin/addVariation", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        document.querySelector("#addVariation").reset();
        this.requestTransactions(this.state.val);
        this.requestStock(this.state.val);
        if (response.data === "ILLEGAL ACTION") {
          this.setState({ illegal: true });
        }
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#addVariation").reset();
        this.requestTransactions(this.state.val);
      });
  };
  onAddTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addTransForm"));
    formData.append("code", this.state.val);
    this.onAddEntryPressed();
    axios
      .post(serverAddress + "admin/addTransaction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
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
    axios
      .delete(
        serverAddress + `admin/removeTransaction/${this.state.pressedRecordId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        this.requestTransactions(this.state.val);
        this.requestStock(this.state.val);
        this.onToggleDelete();
        if (response.data === "ILLEGAL ACTION") {
          this.setState({ illegal: true });
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        this.onToggleDelete();
      });
  };

  requestDrop = () => {
    axios
      .get(serverAddress + "api/getItems")
      .then((response) => {
        const dropData = response.data.map((item) => item.code);
        this.setState({ drop: dropData });
        this.setState({ loadingDrop: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingDrop: false });
      });
  };

  requestStock = (val) => {
    axios
      .get(serverAddress + "api/getStockByCode/" + val)
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
        this.setState({
          image: response.data[0].img,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  requestTransactions = (val) => {
    axios
      .get(serverAddress + "api/getTransactions/" + val)
      .then((response) => {
        const transData = response.data.map((row) => {
          return {
            id: row.id,
            variation: row.stock.variation,
            inorout: row.inorout,
            note: row.note,
            qty: row.qty,
            orderid: row.orderid,
            transdate: row.transdate,
          };
        });
        this.setState({ loadingTransactions: false });
        this.setState({ transactions: transData });
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
    document.querySelector("#updateTransForm").reset();
    if (row.variation) {
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
    } else {
      this.setState((prevState) => {
        return {
          pressedUpdate: !prevState.pressedUpdate,
        };
      });
    }
  };

  onIllegalClose = () => {
    this.setState({ illegal: false });
  };

  stockTable = () => {
    const stockColumns = [
      {
        Header: <strong className={classes.Stock}>QUANTITY</strong>,
        accessor: "qty",
        Cell: (row) => (
          <div style={{ lineHeight: "50px" }}>
            <span className={classes.Stock}>{row.value}</span>
          </div>
        ),
        width: 100,
      },
      {
        Header: <strong className={classes.Stock}>VARIATION</strong>,
        accessor: "variation",
        Cell: (row) => (
          <div key={row.value} style={{ lineHeight: "50px" }}>
            <span className={classes.Stock}>{row.value}</span>
          </div>
        ),
      },
      {
        Header: <strong className={classes.Stock}>IMAGE</strong>,
        accessor: "img",
        Cell: (row) => (
          <div
            style={{
              width: "50px",
              height: "50px",
              lineHeight: "50px",
            }}
          >
            <img
              src={row.value}
              alt={row.value}
              style={{ width: "50px" }}
              className={classes.CellStyle}
            />
          </div>
        ),
        width: 60,
      },
    ];
    return (
      <div className={[classes.OutputDiv, classes.Transition].join(" ")}>
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
    let option = this.state.drop;
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
            //this.checkImageName(newValue);
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
        <div className={classes.Transition}>
          <TransactionTable
            pressedDelete={this.onDeletePressed}
            pressedUpdate={this.onUpdatePressed}
            transactions={this.state.transactions}
          />
        </div>
      );
    }
    return (
      <div className={[classes.WrapperFlex, classes.Transition].join(" ")}>
        <Modal show={this.state.illegal} modalClosed={this.onIllegalClose}>
          <div>INVALID ACTION</div>
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
            stock={this.state.stock}
          />
        </Modal>
        <Modal
          show={this.state.addVariationPressed}
          modalClosed={this.onAddVariationPressed}
        >
          <AddVariationForm
            addVariation={this.onAddVariation}
            modalClosed={this.onAddVariationPressed}
          />
        </Modal>
        <Modal
          show={this.state.deleteVariationPressed}
          modalClosed={this.onDeleteVariationPressed}
        >
          <DeleteVariationForm
            modalClosed={this.onAddVariationPressed}
            deleteVariation={this.onDeleteVariation}
            stock={this.state.stock}
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
            stock={this.state.stock}
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
          <div style={{ display: "flex" }}>
            <div className={classes.NewEntry}>
              <Button
                clicked={this.onAddEntryPressed}
                disabled={
                  this.state.val === null || this.state.stock.length === 0
                }
                btnType="Success"
              >
                ADD ENTRY
              </Button>
            </div>
            <div className={classes.NewEntry}>
              <Button
                clicked={this.onAddVariationPressed}
                disabled={this.state.val === null}
                btnType="Success"
              >
                ADD VARIATION
              </Button>
            </div>
            <div className={classes.NewEntry}>
              <Button
                clicked={this.onDeleteVariationPressed}
                disabled={this.state.val === null}
                btnType="Danger"
              >
                DELETE VARIATION
              </Button>
            </div>
          </div>
          <div className={classes.Trans}>{viewTrans}</div>
        </div>
      </div>
    );
  }
}
export default BStock;
