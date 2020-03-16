import React, { Component } from "react";
//import classes from "./ItemsTable.module.css";
import Button from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

class ItemsTable extends Component {
  render() {
    const columns = [
      { Header: "ID", accessor: "id", width: 40 },
      { Header: "CODE", accessor: "code", width: 230 },
      { Header: "COLLECTION", accessor: "collection", width: 280 },
      {
        Header: "DESCRIPTION",
        accessor: "desc",
        width: 370,
        filterable: false
      },
      { Header: "SIZE", accessor: "size", width: 90, filterable: false },
      { Header: "PRICE", accessor: "price", width: 90, filterable: false },
      { Header: "TYPE", accessor: "type", width: 90 },
      { Header: "IMAGE", accessor: "img", width: 100, filterable: false },
      { Header: "IMAGE2", accessor: "img2", width: 100, filterable: false },
      { Header: "UPDATE", accessor: "upt", width: 90, filterable: false },
      { Header: "DELETE", accessor: "del", width: 90, filterable: false }
    ];

    let data = [...this.props.passedData];
    console.log("data", data);
    data.map(row => {
      row["img"] = (
        <img
          src={"http://localhost:9000/images/" + row["code"] + ".jpg"}
          alt={"http://localhost:9000/images/" + row["code"]}
          style={{ width: 80 }}
        />
      );
      row["img2"] = (
        <img
          src={"http://localhost:9000/images/" + row["code"] + "2.jpg"}
          alt={"http://localhost:9000/images/" + row["code"] + "2.jpg"}
          style={{ width: 80 }}
        />
      );
      row["upt"] = (
        <Button id="updateButton" btnType="SuccessSmall">
          UPDATE
        </Button>
      );
      row["del"] = <Button btnType="DangerSmall">DELETE</Button>;
      return null;
    });
    return (
      <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              const rowDetails = {
                id: null,
                code: null,
                collection: null,
                size: null,
                bytype: null,
                price: null
              };
              if (rowInfo !== undefined) {
                console.log("A Td Element was clicked!");
                console.log("it produced this event:", e.target.innerHTML);
                if (e.target.innerHTML === "DELETE") {
                  this.props.pressedDelete(rowInfo.original.id);
                }
                if (e.target.innerHTML === "UPDATE") {
                  rowDetails.id = rowInfo.original.id;
                  rowDetails.code = rowInfo.original.code;
                  rowDetails.collection = rowInfo.original.collection;
                  rowDetails.size = rowInfo.original.size;
                  rowDetails.desc = rowInfo.original.desc;
                  rowDetails.type = rowInfo.original.type;
                  rowDetails.price = rowInfo.original.price;
                  this.props.pressedUpdate(rowDetails);
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
        className="-highlight -striped"
        data={data}
        columns={columns}
        defaultPageSize={9}
        filterable
      />
    );
  }
}
export default ItemsTable;
