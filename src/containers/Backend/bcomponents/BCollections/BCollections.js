import React, { Component } from "react";
import ReactTable from "react-table-6";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import "react-table-6/react-table.css";
import classes from "./BCollections.module.css";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import AddCollectionForm from "../AddCollectionForm/AddCollectionForm";
import UpdateCollectionForm from "../UpdateCollectionForm/UpdateCollectionForm";
import { serverAddress, gc } from "../../../../assets/helper";

class BCollections extends Component {
  state = {
    collections: [],
    loading: true,
    deletePressed: false,
    pressedRecordId: null,
    pressedRecordColl: null,
    pressedRecordName: null,
    pressedRecordDesc: null,
    inputFileToggleOn: false,
    updateToggleOn: false,
    canceled: false,
  };

  updateFormCallBack = (parm) => {
    this.setState({
      updateToggleOn: false,
      updatePressed: false,
      loading: false,
    });
    document.querySelector("#updateCollecionForm").reset();
    this.requestQuery("SELECT * FROM collections", "query");
  };

  addFormCallBack = (parm) => {
    this.setState({
      inputFileToggleOn: false,
      deletePressed: false,
      loading: false,
    });
    document.querySelector("#addCollecionForm").reset();
    this.requestQuery("SELECT * FROM collections", "query");
  };

  requestQuery = (sql, action) => {
    const sqlQuery = { sql: sql };
    axios
      .post(serverAddress + "API/" + action, sqlQuery)
      .then((response) => {
        console.log("[response.data] => ", response.data);
        if (action === "query") {
          this.setState({
            loading: false,
            collections: response.data,
          });
        } else if (action === "delete") {
          this.setState({
            loading: false,
            deletePressed: false,
            canceled: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, deletePressed: false });
      });
  };

  onAddCollecionForm = async (e) => {
    e.preventDefault();

    const addCollecionForm = document.querySelector("#addCollecionForm");
    const formData = new FormData(addCollecionForm);
    axios
      .post(serverAddress + "API/uploadCollectionForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "collection exists already") {
          alert(response.data);
        }
        this.setState({
          inputFileToggleOn: false,
          deletePressed: false,
          loading: false,
        });
        this.requestQuery("SELECT * FROM collections", "query");
        document.querySelector("#addCollecionForm").reset();
      })
      .catch((error) => {
        alert(error);
        document.querySelector("#addCollecionForm").reset();
        this.setState({ loading: false, deletePressed: false });
        this.requestQuery("SELECT * FROM collections", "query");
      });
  };

  componentDidMount() {
    this.requestQuery("SELECT * FROM collections", "query");
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.state.canceled) {
      this.requestQuery("SELECT * FROM collections", "query");
      this.setState({ canceled: false });
    }
  }

  cancelDeleteHandler = () => {
    this.setState({
      deletePressed: false,
      canceled: true,
      pressedRecordId: null,
      pressedRecordColl: null,
    });
  };

  deleteRecordHandler = () => {
    this.requestQuery(
      "UPDATE items set collection = 'HIDDEN' WHERE collection = '" +
        this.state.pressedRecordName +
        "'",
      "delete" //will not delete. only will make the sql command
    );
    this.requestQuery(
      "DELETE FROM collections WHERE id = " + this.state.pressedRecordId,
      "delete"
    );
  };
  addInputHandler = () => {
    this.setState((prevState) => {
      return {
        inputFileToggleOn: !prevState.inputFileToggleOn,
        canceled: true,
      };
    });
  };

  makeNiceTable = (collData) => {
    let data = [...collData];
    let keysArr = [];
    data.slice(0, 1).map((keys) => {
      for (let i = 0; i < Object.getOwnPropertyNames(keys).length; i++) {
        keysArr[i] = Object.getOwnPropertyNames(keys)[i];
      }
      return null;
    });

    const columns = [
      {
        Header: (
          <div>
            <div key="ID" className={classes.HeaderStyle}>
              ID
            </div>
          </div>
        ),
        accessor: "id",
        width: 40,
        Cell: (row) => (
          <div style={{ lineHeight: "100px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value}{" "}
            </div>
          </div>
        ),
      },
      {
        Header: (
          <div>
            <div key="NAME" className={classes.HeaderStyle}>
              NAME
            </div>
          </div>
        ),
        accessor: "name",
        width: 250,
        Cell: (row) => (
          <div style={{ lineHeight: "100px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        ),
      },
      {
        Header: (
          <div>
            <div key="DESCRIPTION" className={classes.HeaderStyle}>
              DESCRIPTION
            </div>
          </div>
        ),
        accessor: "desc",
        width: 400,
        Cell: (row) => (
          <div style={{ lineHeight: "100px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        ),
      },
      {
        Header: (
          <div>
            <div key="IMAGE" className={classes.HeaderStyle}>
              IMAGE
            </div>
          </div>
        ),
        accessor: "img",
        Cell: (row) => (
          <img
            src={gc + row.value}
            alt={row.value}
            style={{ width: "100px", height: "100px" }}
          />
        ),
        width: 100,
      },
      {
        Header: (
          <div>
            <div key="UPDATE" className={classes.HeaderStyle}>
              UPDATE
            </div>
          </div>
        ),
        accessor: "name",
        Cell: (row) => (
          <div style={{ marginTop: "20px" }}>
            <Button
              disabled={row.value === "HIDDEN" || this.state.inputFileToggleOn}
              id="updateButton"
              btnType="SuccessSmall"
            >
              UPDATE
            </Button>
          </div>
        ),
        width: 100,
      },
      {
        Header: (
          <div>
            <div key="DELETE" className={classes.HeaderStyle}>
              DELETE
            </div>
          </div>
        ),
        accessor: "name",
        Cell: (row) => (
          <div style={{ marginTop: "20px" }}>
            <Button
              disabled={row.value === "HIDDEN" || this.state.inputFileToggleOn}
              btnType="DangerSmall"
            >
              DELETE
            </Button>
          </div>
        ),
        width: 100,
      },
    ];

    return (
      <ReactTable
        className="-highlight "
        data={data}
        columns={columns}
        minRows={1}
        defaultPageSize={10}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if (rowInfo !== undefined) {
                console.log("A Td Element was clicked!");
                console.log("it produced this event:", e.target.innerHTML);
                if (
                  e.target.innerHTML === "DELETE" &&
                  !this.state.inputFileToggleOn
                ) {
                  this.setState((prevState) => {
                    if (rowInfo.original.name !== "HIDDEN") {
                      return {
                        deletePressed: !prevState.deletePressed,
                        pressedRecordId: rowInfo.original.id,
                        pressedRecordName: rowInfo.original.name,
                        pressedRecordColl: column.Header,
                      };
                    }
                  });
                }
                if (
                  e.target.innerHTML === "UPDATE" &&
                  !this.state.inputFileToggleOn
                ) {
                  this.setState((prevState) => {
                    if (rowInfo.original.name !== "HIDDEN") {
                      return {
                        updateToggleOn: !prevState.updateToggleOn,
                        canceled: true,
                        pressedRecordId: rowInfo.original.id,
                        pressedRecordColl: column.Header,
                        pressedRecordName: rowInfo.original.name,
                        pressedRecordDesc: rowInfo.original.desc,
                      };
                    }
                  });
                }
                console.log("It was in this column:", column.Header);
                console.log("It was in this row:", rowInfo);
                console.log("It was in this table instance:", instance);

                if (handleOriginal) {
                  handleOriginal();
                }
              }
            },
          };
        }}
      />
    );
  };

  render() {
    let updateClass = "none";
    let inputClass = "none";
    if (this.state.inputFileToggleOn && !this.state.updateToggleOn) {
      inputClass = "block";
    }
    if (this.state.updateToggleOn && !this.state.inputFileToggleOn) {
      updateClass = "block";
    }
    let viewPage = <Spinner />;
    if (!this.props.loading) {
      viewPage = (
        <React.Fragment>
          <Modal
            modalClosed={this.cancelDeleteHandler}
            show={this.state.deletePressed}
          >
            <ModalConfirm
              modalClosed={this.cancelDeleteHandler}
              confirmed={this.deleteRecordHandler}
            />
          </Modal>
          <div className={classes.Wrapper}>
            <div className={classes.TableDiv}>
              {this.makeNiceTable(this.state.collections)}
            </div>
            <AddCollectionForm
              input={inputClass}
              addForm={this.addFormCallBack}
              onAddInputHanadler={this.addInputHandler}
              updateToggle={this.state.updateToggleOn}
            >
              <UpdateCollectionForm
                update={updateClass}
                updateForm={this.updateFormCallBack}
                cancelUpdate={this.cancelUpdate}
                updateState={this.state}
              />
            </AddCollectionForm>
          </div>
        </React.Fragment>
      );
      return <div className={classes.Trans}>{viewPage}</div>;
    }
  }
}
export default BCollections;
