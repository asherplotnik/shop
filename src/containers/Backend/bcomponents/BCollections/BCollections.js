import React, { Component } from "react";
import ReactTable from "react-table-6";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import "react-table-6/react-table.css";
import classes from "./BCollections.module.css";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";

class BCollections extends Component {
  state = {
    collections: [],
    loading: true,
    deletePressed: false,
    updatePressed: false
  };

  requestQuery = sql => {
    const sqlQuery = { sql: sql };
    axios
      .post("http://localhost:9000/API/query", sqlQuery)
      .then(response => {
        console.log("[response.data] => ", response.data);
        console.log("[sql] => ", response.data);
        this.setState({ loading: false, collections: response.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.requestQuery("SELECT * FROM collections");
  }

  cancelDeleteHandler = () => {};

  makeShittyTable = obj => {
    let table = {};
    let firstLine = {};
    let keysArr = [];
    let akey = obj.slice(0, 1).map(keys => {
      for (let i = 0; i < Object.getOwnPropertyNames(keys).length; i++) {
        keysArr[i] = Object.getOwnPropertyNames(keys)[i];
      }
      return Object.getOwnPropertyNames(keys)[0];
    });
    firstLine = (
      <tr>
        {keysArr.map(aKey => (
          <th key={akey}>{aKey}</th>
        ))}
      </tr>
    );
    let rows = this.state.collections.map(row => {
      let rowArr = [];
      for (let i = 0; i < keysArr.length; i++) {
        rowArr.push(<td key={i}>{row[keysArr[i]]}</td>);
      }
      return <tr>{rowArr}</tr>;
    });
    table = [firstLine, ...rows];
    return <table>{table}</table>;
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
      row["id"] = <p style={{ marginTop: "35px" }}>{row["id"]}</p>;
      row["name"] = <p style={{ marginTop: "35px" }}>{row["name"]}</p>;
      row["desc"] = <p style={{ marginTop: "35px" }}>{row["desc"]}</p>;
      row["upt"] = <Button btnType="Success">UPDATE</Button>;
      row["del"] = <Button btnType="Danger">DELETE</Button>;

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
              console.log("A Td Element was clicked!");
              console.log("it produced this event:", e.target.innerHTML);
              if (e.target.innerHTML === "DELETE!") {
                this.setState({ deletePressed: true });
              }
              console.log("It was in this column:", column);
              console.log("It was in this row:", rowInfo);
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

  render() {
    let viewPage = <Spinner />;
    if (!this.props.loading) {
      viewPage = (
        <React.Fragment>
          <Modal
            modalClosed={this.cancelDeleteHandler}
            show={this.state.deletePressed}
          >
            ARE YOU SURE?
          </Modal>
          <div className={classes.Wrapper}>
            <div className={classes.TableDiv}>
              {this.makeNiceTable(this.state.collections)}
            </div>
            <div className={classes.Control}></div>
          </div>
        </React.Fragment>
      );
      return <div>{viewPage}</div>;
    }
  }
}
export default BCollections;
