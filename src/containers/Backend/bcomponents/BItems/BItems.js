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
    this.props.onToggleAddOff();
    axios
      .post("http://localhost:9000/API/uploadItemForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "Item exists already") {
          alert(response.data);
        }
        document.querySelector('#updateItemForm').reset()
        this.requestQuery("SELECT * FROM items", "query");
      })
      .catch(error => {
        alert(error);
        document.querySelector('#updateItemForm').reset()
        this.requestQuery("SELECT * FROM collections", "query");
      });
  };

  onUpdateItemForm = async e => {
    e.preventDefault();
    const itemForm = document.querySelector("#updateItemForm");
    const formData = new FormData(itemForm);
    this.props.onToggleUpdateOff();
    formData.append("itemId", this.props.pressedRecordId);
    axios
      .post("http://localhost:9000/API/updateItemForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[add collection response] => ", response.data);
        if (response.data === "collection exists already") {
          alert(response.data);
        }
        document.querySelector('#updateItemForm').reset()
        this.requestQuery("SELECT * FROM items", "query");
      })
      .catch(error => {
        alert(error);
        document.querySelector('#updateItemForm').reset()
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
            width="900px"
            left="25%"
            show={this.props.bulkPressed}
            modalClosed={this.props.onBulkPressed} 
            >
              <form id="bulkForm">
                <div className={classes.Font}>SELECT FILE TO UPLOAD:</div>
                <br></br>
                <div ><input  type = "file" name="bulkFile"/></div>
                <div>
                  <p>Instructions: only excel file with the following columns: </p> 
                  <p>CODE , COLLECTION , DESCRIPTION , SIZE , PRICE , TYPE , IMAGE , IMAGE2 </p>
                  <img style={{border:"solid 1px black",width:"95%"}}src= "http://localhost:9000/images/bulk.jpg" alt = "bulk"/>
                </div>
              </form>
          </Modal>
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
              formId="addItemForm"
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
              formId="updateItemForm"
              title="UPDATE PRODUCT"
              collSelect={this.props.collectionSelect}
              rCode={this.props.pressedRecordCode}
              rCollection={this.props.pressedRecordCollection}
              rDesc={this.props.pressedRecordDesc}
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
            <Button btnType="NavySmall" clicked={this.props.onBulkPressed}>
              ADD FROM FILE 
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
    pressedRecordDesc: state.pressedRecordDesc,
    pressedRecordSize: state.pressedRecordSize,
    pressedRecordType: state.pressedRecordType,
    pressedRecordPrice: state.pressedRecordPrice,
    bulkPressed: state.bulkPressed,
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
    onSetCollectionSelect: col => dispatch(actions.setCollectionSelect(col)),
    onToggleUpdateOff: () => dispatch(actions.toggleUpdateOff()),
    onToggleAddOff: () => dispatch(actions.toggleAddOff()),
    onBulkPressed: () => dispatch(actions.bulkPressed())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BItems);
