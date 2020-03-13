import React, { Component } from "react";
import ReactTable from "react-table-6";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import "react-table-6/react-table.css";
import classes from "./BCollections.module.css";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";
import AddForm from "../AddForm/AddForm";
import UpdateForm from "../UpdateForm/UpdateForm";

class BCollections extends Component {
  state = {
    collections: [],
    loading: true,
    deletePressed: false,
    pressedRecordId: null,
    pressedRecordColl: null,
    inputFileToggleOn: false,
    updateToggleOn: false,
    canceled: false
  };

  updateFormCallBack = parm => {
    this.setState({
      updateToggleOn: false,
      updatePressed: false,
      loading: false
    });
    this.requestQuery("SELECT * FROM collections", "query");
  };

  addFormCallBack = parm => {
    this.setState({
      inputFileToggleOn: false,
      deletePressed: false,
      loading: false
    });
    this.requestQuery("SELECT * FROM collections", "query");
  };

  requestQuery = (sql, action) => {
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/" + action, sqlQuery)
      .then(response => {
        console.log("[response.data] => ", response.data);
        if (action === "query") {
          this.setState({
            loading: false,
            collections: response.data
          });
        } else if (action === "delete") {
          this.setState({
            loading: false,
            deletePressed: false,
            canceled: true
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, deletePressed: false });
      });
  };

  onAddCollecionForm = async e => {
    e.preventDefault();

    const addCollecionForm = document.querySelector("#addCollecionForm");
    const formData = new FormData(addCollecionForm);
    axios
      .post("http://localhost:9000/API/uploadCollectionForm", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("[add collection respose] => ", response.data);
        if (response.data === "collection exists already") {
          alert(response.data);
        }
        this.setState({
          inputFileToggleOn: false,
          deletePressed: false,
          loading: false
        });
        this.requestQuery("SELECT * FROM collections", "query");
      })
      .catch(error => {
        alert(error);
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
      pressedRecordColl: null
    });
  };

  updateRecordHandler = () => {
    this.requestQuery(console.log("UPDATE CONFIRMED"));
  };

  deleteRecordHandler = () => {
    this.requestQuery(
      "DELETE FROM collections WHERE id = " + this.state.pressedRecordId,
      "delete"
    );
  };
  addInputHandler = () => {
    this.setState(prevState => {
      return {
        inputFileToggleOn: !prevState.inputFileToggleOn,
        canceled: true
      };
    });
  };

  makeNiceTable = data => {
    let keysArr = [];
    data.slice(0, 1).map(keys => {
      for (let i = 0; i < Object.getOwnPropertyNames(keys).length; i++) {
        keysArr[i] = Object.getOwnPropertyNames(keys)[i];
      }
      return null;
    });

    const columns = [
      { Header: "ID", accessor: "id", width: 40 },
      { Header: "NAME", accessor: "name", width: 250 },
      { Header: "DESCRIPTION", accessor: "desc", width: 400 },
      { Header: "IMAGE", accessor: "img", width: 100 },
      { Header: "UPDATE", accessor: "upt", width: 100 },
      { Header: "DELETE", accessor: "del", width: 100 }
    ];
    data.map(row => {
      row["img"] = (
        <img src={row["img"]} alt={row["img"]} style={{ width: 80 }} />
      );
      row["id"] = <span style={{ marginTop: "35px" }}> {row["id"]} </span>;
      row["name"] = <span style={{ marginTop: "35px" }}>{row["name"]} </span>;
      row["desc"] = <span style={{ marginTop: "35px" }}> {row["desc"]} </span>;
      row["upt"] = (
        <Button
          id="updateButton"
          disabled={this.state.inputFileToggleOn}
          btnType="SuccessSmall"
        >
          UPDATE
        </Button>
      );
      row["del"] = (
        <Button disabled={this.state.inputFileToggleOn} btnType="DangerSmall">
          DELETE
        </Button>
      );

      return null;
    });

    return (
      <ReactTable
        className="-highlight -striped"
        data={data}
        columns={columns}
        defaultPageSize={10}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if (rowInfo !== undefined) {
                console.log("A Td Element was clicked!");
                console.log("it produced this event:", e.target.innerHTML);
                if (e.target.innerHTML === "DELETE") {
                  this.setState({
                    deletePressed: true,
                    pressedRecordId: rowInfo.row.id.props.children[1],
                    pressedRecordColl: column.Header
                  });
                }
                if (
                  e.target.innerHTML === "UPDATE" &&
                  !this.state.inputFileToggleOn
                ) {
                  this.setState(prevState => {
                    return {
                      updateToggleOn: !prevState.updateToggleOn,
                      canceled: true,
                      pressedRecordId: rowInfo.row.id.props.children[1],
                      pressedRecordColl: column.Header
                    };
                  });
                }
                console.log("It was in this column:", column.Header);
                console.log("It was in this row:", rowInfo);

                console.log("It was in this table instance:", instance);

                if (handleOriginal) {
                  handleOriginal();
                }
              }
            }
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
              deleteConfirmed={this.deleteRecordHandler}
            />
          </Modal>
          <div className={classes.Wrapper}>
            <div className={classes.TableDiv}>
              {this.makeNiceTable(this.state.collections)}
            </div>
            <AddForm
              input={inputClass}
              addForm={this.addFormCallBack}
              onAddInputHanadler={this.addInputHandler}
              updateToggle={this.state.updateToggleOn}
            >
              <UpdateForm
                update={updateClass}
                updateForm={this.updateFormCallBack}
                cancelUpdate={this.cancelUpdate}
              />
            </AddForm>
          </div>
        </React.Fragment>
      );
      return <div>{viewPage}</div>;
    }
  }
}
export default BCollections;
