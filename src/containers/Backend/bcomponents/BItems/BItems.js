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
    this.requestQuery();
    this.requestStock();
    this.requestCollection();
  }

  onBulkConfirmed = async (e) => {
    e.preventDefault();
    const bulkForm = document.querySelector("#bulkForm");
    this.props.onBulkPressed();
    const formData = new FormData(bulkForm);
    axios
      .post(serverAddress + "admin/bulkUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.requestQuery();
      })
      .catch((error) => {
        alert(error.response.data.message);
        this.requestQuery();
      });
  };

  onAddItemForm = async (e) => {
    e.preventDefault();
    const addItemForm = document.querySelector("#addItemForm");
    const formData = new FormData(addItemForm);
    this.props.onToggleAddOff();
    axios
      .post(serverAddress + "admin/addItem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then(() => {
        document.querySelector("#addItemForm").reset();
        this.requestQuery();
      })
      .catch((error) => {
        alert(error.response.data.message);
        document.querySelector("#addItemForm").reset();
        this.requestQuery();
      });
  };

  onUpdateItemForm = async (e) => {
    e.preventDefault();
    const addItemForm = document.querySelector("#updateItemForm");
    const formData = new FormData(addItemForm);
    formData.append("id", parseInt(this.props.pressedRecordId));
    this.props.onToggleUpdateOff();
    axios
      .post(serverAddress + "admin/updateItem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then(() => {
        document.querySelector("#updateItemForm").reset();
        this.requestQuery();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        document.querySelector("#updateItemForm").reset();
        this.requestQuery();
      });
  };

  requestQuery = () => {
    axios
      .get(serverAddress + "api/getItems")
      .then((response) => {
        this.props.setItems(response.data);
        this.props.setLoadingFalse();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, deletePressed: false });
      });
  };

  requestDelete = (id) => {
    axios
      .delete(serverAddress + "admin/deleteItem/" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then(() => {
        this.requestQuery();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        this.requestQuery();
      });
  };

  requestStock = () => {
    axios
      .get(serverAddress + "api/getStock")
      .then((response) => {
        this.props.setStock(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  requestCollection = () => {
    axios
      .get(serverAddress + "api/getCollections")
      .then((response) => {
        this.props.onSetCollectionSelect(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDeleteHandler = () => {
    this.requestDelete(this.props.pressedRecordId);
    this.props.onDeletePressed();
    this.requestQuery();
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
              rTrending={null}
              rCollection="D.I.Y"
              rDesc=""
              rSize=""
              rDetails=""
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
              rDetails={this.props.pressedRecordDetails}
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
    pressedRecordDetails: state.itemsReducer.pressedRecordDetails,
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
