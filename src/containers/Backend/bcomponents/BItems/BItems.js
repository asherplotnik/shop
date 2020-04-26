import React, { Component } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import classes from "./BItems.module.css";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import AddItemForm from "../AddItemForm/AddItemForm";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import BulkForm from "../BulkForm/BulkForm";
import { serverAddress } from "../../../../assets/helper";

class BItems extends Component {
  componentDidMount() {
    this.requestStock();
    this.requestQuery("SELECT * FROM items", "query");
    this.collectionQuery();
  }

  onBulkConfirmed = async (e) => {
    e.preventDefault();
    const bulkForm = document.querySelector("#bulkForm");
    this.props.onBulkPressed();
    const formData = new FormData(bulkForm);
    axios
      .post(serverAddress + "API/bulkUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        this.requestQuery("SELECT * FROM items", "query");
      })
      .catch((error) => {
        alert(error);
        this.requestQuery("SELECT * FROM collections", "query");
      });
  };

  onAddItemForm = async (e) => {
    e.preventDefault();
    const addItemForm = document.querySelector("#addItemForm");
    const formData = new FormData(addItemForm);
    this.props.onToggleAddOff();
    axios
      .post(serverAddress + "API/uploadItemForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "Item exists already") {
          alert(response.data);
        }
        document.querySelector("#addItemForm").reset();
        this.requestQuery("SELECT * FROM items", "query");
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#addItemForm").reset();
        this.requestQuery("SELECT * FROM collections", "query");
      });
  };

  onUpdateItemForm = async (e) => {
    e.preventDefault();
    const itemForm = document.querySelector("#updateItemForm");
    const formData = new FormData(itemForm);
    this.props.onToggleUpdateOff();
    formData.append("itemId", this.props.pressedRecordId);
    axios
      .post(serverAddress + "API/updateItemForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("[add collection response] => ", response.data);
        if (response.data === "Item exists already") {
          alert(response.data);
        }
        document.querySelector("#updateItemForm").reset();
        this.requestQuery("SELECT * FROM items", "query");
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#updateItemForm").reset();
        this.requestQuery("SELECT * FROM collections", "query");
      });
  };

  collectionQuery = () => {
    const sqlQuery = { sql: "SELECT name FROM collections" };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        let arr = response.data.map((el) => {
          return el.name;
        });
        this.props.onSetCollectionSelect(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  requestQuery = (sql, act) => {
    const sqlQuery = { sql: sql };
    axios
      .post(serverAddress + "API/" + act, sqlQuery)
      .then((response) => {
        if (act === "query") {
          this.props.setItems(response.data);
          console.log(response.data);
          this.props.setLoadingFalse();
        } else if (act === "delete") {
          this.requestQuery("select * from items", "query");
          this.props.onDeletePressed();
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, deletePressed: false });
      });
  };

  requestStock = () => {
    const sqlQuery = { sql: "SELECT * FROM stock" };
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        this.props.setStock(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDeleteHandler = () => {
    this.requestQuery(
      "delete from items where id = " + this.props.pressedRecordId,
      "delete"
    );
  };

  render() {
    let viewPage = <Spinner />;
    if (!this.props.loading) {
      viewPage = (
        <div className={classes.Trans}>
          <Modal
            width="900px"
            left="25%"
            show={this.props.bulkPressed}
            modalClosed={this.props.onBulkPressed}
          >
            <BulkForm
              bulkConfirmed={this.onBulkConfirmed}
              modalClosed={this.props.onBulkPressed}
            />
          </Modal>
          <Modal
            show={this.props.deletePressed}
            modalClosed={this.props.onDeletePressed}
          >
            <ModalConfirm
              modalClosed={this.props.onDeletePressed}
              confirmed={this.onDeleteHandler}
            />
          </Modal>
          <Modal
            show={this.props.addPressed}
            modalClosed={this.props.onAddPressed}
          >
            <AddItemForm
              formId="addItemForm"
              title="ADD PRODUCT"
              addItem={this.onAddItemForm}
              rTrending={false}
              rCollection="D.I.Y"
              rDesc=""
              rSize=""
              rPrice={0}
              collSelect={this.props.collectionSelect}
              modalClosed={this.props.onAddPressed}
            />
          </Modal>
          <Modal
            show={this.props.updatePressed}
            modalClosed={this.props.onUpdatePressed}
          >
            <AddItemForm
              formId="updateItemForm"
              title="UPDATE PRODUCT"
              collSelect={this.props.collectionSelect}
              rCode={this.props.pressedRecordCode}
              rCollection={this.props.pressedRecordCollection}
              rDesc={this.props.pressedRecordDesc}
              rSize={this.props.pressedRecordSize}
              rType={this.props.pressedRecordType}
              rPrice={this.props.pressedRecordPrice}
              rTrending={this.props.pressedRecordTrending}
              addItem={this.onUpdateItemForm}
              modalClosed={this.props.onUpdatePressed}
            />
          </Modal>
          <div className={classes.addProduct}>
            <Button btnType="NavySmall" clicked={this.props.onAddPressed}>
              ADD PRODUCT
            </Button>
            <Button btnType="NavySmall" clicked={this.props.onBulkPressed}>
              ADD FROM FILE
            </Button>
          </div>
          <ItemsTable
            pressedDelete={this.props.onDeletePressed}
            pressedUpdate={this.props.onUpdatePressed}
            passedData={this.props.itemsData}
            passedStock={this.props.stockData}
          />
          ;
        </div>
      );
    }

    return viewPage;
  }
}

const mapStateToProps = (state) => {
  return {
    itemsData: state.itemsReducer.items,
    stockData: state.itemsReducer.stock,
    loading: state.itemsReducer.loading,
    addPressed: state.itemsReducer.addPressed,
    deletePressed: state.itemsReducer.deletePressed,
    updatePressed: state.itemsReducer.updatePressed,
    pressedRecordId: state.itemsReducer.pressedRecordId,
    pressedRecordCode: state.itemsReducer.pressedRecordCode,
    pressedRecordCollection: state.itemsReducer.pressedRecordCollection,
    pressedRecordDesc: state.itemsReducer.pressedRecordDesc,
    pressedRecordSize: state.itemsReducer.pressedRecordSize,
    pressedRecordType: state.itemsReducer.pressedRecordType,
    pressedRecordPrice: state.itemsReducer.pressedRecordPrice,
    pressedRecordTrending: state.itemsReducer.pressedRecordTrending,
    bulkPressed: state.itemsReducer.bulkPressed,
    collectionSelect: state.itemsReducer.collectionSelect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (passedData) => dispatch(actions.setItems(passedData)),
    setStock: (passedData) => dispatch(actions.setStock(passedData)),
    setLoadingFalse: () => dispatch(actions.setLoadingFalse()),
    onAddPressed: () => dispatch(actions.addPressed()),
    onDeletePressed: (rowId) => dispatch(actions.deletePressed(rowId)),
    onUpdatePressed: (row) => dispatch(actions.updatePressed(row)),
    onSetCollectionSelect: (col) => dispatch(actions.setCollectionSelect(col)),
    onToggleUpdateOff: () => dispatch(actions.toggleUpdateOff()),
    onToggleAddOff: () => dispatch(actions.toggleAddOff()),
    onBulkPressed: () => dispatch(actions.bulkPressed()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BItems);
