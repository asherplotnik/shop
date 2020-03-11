import React, { Component } from "react";
import ReactTable from "react-table-6";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import "react-table-6/react-table.css";
import classes from "./BCollections.module.css";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalConfirm from "../../../../components/UI/Modal/modalContents/modalConfirm/ModalConfirm";

class BCollections extends Component {
  state = {
    collections: [],
    loading: true,
    deletePressed: false,
    pressedRecordId: null,
    pressedRecordColl: null,
    updatePressed: false,
    addImagePressed: false,
    canceled: false
  };

  requestQuery = (sql, action) => {
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/" + action, sqlQuery)
      .then(response => {
        console.log("[response.data] => ", response.data);
        console.log("[sql] => ", response.data);
        if (action === "query") {
          this.setState({
            loading: false,
            collections: response.data
          });
        } else {
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

  deleteRecordHandler = () => {
    this.requestQuery(
      "DELETE FROM collections WHERE id = " + this.state.pressedRecordId,
      "delete"
    );
  };
  imagePressedHandler = () =>{
    this.setState({addImagePressed:true})
  }

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
      row["upt"] = <Button btnType="SuccessSmall">UPDATE</Button>;
      row["del"] = <Button btnType="DangerSmall">DELETE</Button>;

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
              this.setState({
                pressedRecordId: rowInfo.row.id.props.children[1],
                pressedRecordColl: column.Header
              });
              console.log("A Td Element was clicked!");
              console.log("it produced this event:", e.target.innerHTML);
              if (e.target.innerHTML === "DELETE") {
                this.setState({ deletePressed: true });
              }
              console.log("It was in this column:", column.Header);
              console.log(
                "It was in this row:",
                rowInfo.row.id.props.children[1]
              );

              console.log("It was in this table instance:", instance);

              if (handleOriginal) {
                handleOriginal();
              }
            }
          };
        }}
      />
    );
  };
  uploadImage = e => {
    let files = e.target.files;
    console.log("datafile", files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      console.log("img data", e.target.result);
    };
  };

  render() {
    let inputClass = classes.InputFileHide;
    if (this.state.addImagePressed){
      inputClass = classes.InputFileShow;
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
            <div className={classes.Control}>
              <div className={classes.AddButton}>
                <Button clicked={this.imagePressedHandler} btnType="Success">ADD COLLECTION</Button>
                <input className={inputClass}  type="file" name="file" onChange={this.uploadImage} />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
      return <div>{viewPage}</div>;
    }
  }
}
export default BCollections;
