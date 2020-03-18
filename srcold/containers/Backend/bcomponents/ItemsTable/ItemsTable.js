import React, { Component } from "react";
import classes from "./ItemsTable.module.css";
import Button from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

class ItemsTable extends Component {
  render() {
    const columns = [
      { Header: "ID", accessor: "id",width: 40, Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value} </div></div> ) },
      { Header: "CODE", accessor: "code", width: 230 , Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value.toUpperCase()} </div></div> )},
      { Header: "COLLECTION", accessor: "collection", width: 280 , Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value.toUpperCase()} </div></div> )},
      {
        Header: "DESCRIPTION",
        accessor: "desc",
        width: 370,
        filterable: false, Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value.toUpperCase()} </div></div> )
      },
      { Header: "SIZE", accessor: "size", width: 90, filterable: false, Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value.toUpperCase()} </div></div> ) },
      { Header: "PRICE", accessor: "price", width: 90, filterable: false, Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value} </div></div> ) },
      { Header: "TYPE", accessor: "type", width: 90, Cell: row => (<div style={{lineHeight:"70px"}}><div key = {row.value} className = {classes.CellStyle}> {row.value.toUpperCase()} </div></div> ) },
      {
        Header: "IMAGE",
        accessor: "img",
        width: 100,
        filterable: false,
        Cell: row => (
          <img
            src={row.value}
            alt={row.value}
            style={{ width: "100px", height: "100px" }}
          />
        )
      },
      {
        Header: "IMAGE2",
        accessor: "img2",
        Cell: row => (
          <img
            src={row.value}
            alt={row.value}
            style={{ width: "100px", height: "100px" }}
          />
        ),
        width: 100,
        filterable: false
      },
      {
        Header: "UPDATE",
        accessor: "upt",
        Cell: () => (
         <Button id="updateButton" btnType="SuccessSmall" >
            UPDATE
          </Button>
        ),
        width: 90,
        filterable: false
      },
      {
        Header: "DELETE",
        accessor: "del",
        Cell: () =>  <Button btnType="DangerSmall" >DELETE</Button>,
        width: 90,
        filterable: false
      }
    ];

    let data = [...this.props.passedData];

    return (
      <ReactTable
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              const rowDetails = {
                rowId: null,
                code: null,
                collection: null,
                desc: null,
                size: null,
                type: null,
                price: null
              };
              if (rowInfo !== undefined) {
                console.log("A Td Element was clicked!");
                console.log("it produced this event:", e.target.innerHTML);
                if (e.target.innerHTML === "DELETE") {
                  this.props.pressedDelete(rowInfo.original.id);
                }
                if (e.target.innerHTML === "UPDATE") {
                  rowDetails.rowId = rowInfo.original.id;
                  rowDetails.code = rowInfo.original.code;
                  rowDetails.collection = rowInfo.original.collection;
                  rowDetails.desc = rowInfo.original.desc;
                  rowDetails.size = rowInfo.original.size;
                  rowDetails.typology = rowInfo.original.type;
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
