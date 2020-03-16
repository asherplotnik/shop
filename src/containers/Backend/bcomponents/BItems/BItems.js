import React, { Component } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import classes from "./BItems.module.css";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/itemsActions";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import AddItemForm from "../AddItemForm/AddItemForm";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";

class BItems extends Component {
  componentDidMount() {
    this.requestQuery("SELECT * FROM items", "query");
    this.collectionQuery();
  }

  onAddItemForm = async e => {
    e.preventDefault();

    const addItemForm = document.querySelector("#addItemForm");
    const formData = new FormData(addItemForm);
    this.props.onAddPressed();
    let queryType = "";
    if (formData.get("formType") === "ADD PRODUCT"){
      queryType = "uploadItemForm";
    }
    else if (formData.get("formType") === "UPDATE PRODUCT" ){
      queryType = "upldateItemForm"
      formData.append("itemId",this.props.pressedRecordId )
    }
    axios
      .post("http://localhost:9000/API/" + queryType, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "collection exists already") {
          alert(response.data);
        }
        this.requestQuery("SELECT * FROM items", "query");
      })
      .catch(error => {
        alert(error);
        this.requestQuery("SELECT * FROM collections", "query");
      });
  };

  collectionQuery = () => {
    const sqlQuery = { sql: "SELECT name FROM collections" };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        let arr = response.data.map(el => {
          return el.name;
        });
        this.props.onSetCollectionSelect(arr);
      })
      .catch(error => {
        console.log(error);
      });
  };

  requestQuery = (sql, act) => {
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/" + act, sqlQuery)
      .then(response => {
        console.log("[response.data] => ", response.data);
        if (act === "query") {
          this.props.setItems(response.data);
          this.props.setLoadingFalse();
        } else if (act === "delete") {
          this.requestQuery("select * from items", "query");
          this.props.onDeletePressed();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, deletePressed: false });
      });
  };

  onUpdateItemForm = () => {};
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
        <React.Fragment>
          <Modal
            show={this.props.deletePressed}
            modalClosed={this.props.onDeletePressed}
          >
            <ModalConfirm
              modalClosed={this.props.onDeletePressed}
              deleteConfirmed={this.onDeleteHandler}
            />
          </Modal>
          <Modal
            show={this.props.addPressed}
            modalClosed={this.props.onAddPressed}
          >
            <AddItemForm
              title="ADD PRODUCT"
              addItem={this.onAddItemForm}
              collSelect={this.props.collectionSelect}
              modalClosed={this.props.onAddPressed}
            />
          </Modal>
          <Modal
            show={this.props.updatePressed}
            modalClosed={this.props.onUpdatePressed}
          >
            <AddItemForm
              title="UPDATE PRODUCT"
              collSelect={this.props.collectionSelect}
              rId={this.props.pressedRecordId}
              rCode={this.props.pressedRecordCode}
              rCollection={this.props.pressedRecordCollection}
              rSize={this.props.pressedRecordSize}
              rType={this.props.pressedRecordType}
              rPrice={this.props.pressedRecordPrice}
              addItem={this.onUpdateItemForm}
              modalClosed={this.props.onUpdatePressed}
            />
          </Modal>
          <div className={classes.addProduct}>
            <Button btnType="NavySmall" clicked={this.props.onAddPressed}>
              ADD PRODUCT
            </Button>
          </div>
          <ItemsTable
            pressedDelete={this.props.onDeletePressed}
            pressedUpdate={this.props.onUpdatePressed}
            passedData={this.props.itemsData}
          />
          ;
        </React.Fragment>
      );
    }

    return viewPage;
  }
}

const mapStateToProps = state => {
  return {
    itemsData: state.items,
    loading: state.loading,
    addPressed: state.addPressed,
    deletePressed: state.deletePressed,
    updatePressed: state.updatePressed,
    pressedRecordId: state.pressedRecordId,
    pressedRecordCode: state.pressedRecordCode,
    pressedRecordCollection: state.pressedRecordCollection,
    pressedRecordSize: state.pressedRecordSize,
    pressedRecordType: state.pressedRecordType,
    pressedRecordPrice: state.pressedRecordPrice,
    collectionSelect: state.collectionSelect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItems: passedData => dispatch(actions.setItems(passedData)),
    setLoadingFalse: () => dispatch(actions.setLoadingFalse()),
    onAddPressed: () => dispatch(actions.addPressed()),
    onDeletePressed: rowId => dispatch(actions.deletePressed(rowId)),
    onUpdatePressed: row => dispatch(actions.updatePressed(row)),
    onSetCollectionSelect: col => dispatch(actions.setCollectionSelect(col))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BItems);
