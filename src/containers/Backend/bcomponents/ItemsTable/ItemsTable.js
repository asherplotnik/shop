import React, { Component } from "react";
import classes from "./ItemsTable.module.css";
import Button from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

class ItemsTable extends Component {
  render() {
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
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value}{" "}
            </div>
          </div>
        )
      },
      {
        Header: (
          <div>
            <div key="CODE" className={classes.HeaderStyle}>
              CODE
            </div>
          </div>
        ),
        accessor: "code",
        width: 230,
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        )
      },
      {
        Header: (
          <div>
            <div key="COLLECTION" className={classes.HeaderStyle}>
              COLLECTION
            </div>
          </div>
        ),
        accessor: "collection",
        width: 280,
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        )
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
        width: 370,
        filterable: false,
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        )
      },
      {
        Header: (
          <div>
            <div key="SIZE" className={classes.HeaderStyle}>
              SIZE
            </div>
          </div>
        ),
        accessor: "size",
        width: 90,
        filterable: false,
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        )
      },
      {
        Header: (
          <div>
            <div key="PRICE" className={classes.HeaderStyle}>
              PRICE
            </div>
          </div>
        ),
        accessor: "price",
        width: 90,
        filterable: false,
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value}{" "}
            </div>
          </div>
        )
      },
      {
        Header: (
          <div>
            <div key="TYPE" className={classes.HeaderStyle}>
              TYPE
            </div>
          </div>
        ),
        accessor: "type",
        width: 90,
        Cell: row => (
          <div style={{ lineHeight: "70px" }}>
            <div key={row.value} className={classes.CellStyle}>
              {" "}
              {row.value.toUpperCase()}{" "}
            </div>
          </div>
        )
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
        Header: (
          <div>
            <div key="IMAGE2" className={classes.HeaderStyle}>
              IMAGE 2
            </div>
          </div>
        ),
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
        Header: (
          <div>
            <div key="UPDATE" className={classes.HeaderStyle}>
              UPDATE
            </div>
          </div>
        ),
        accessor: "upt",
        Cell: () => (
          <Button id="updateButton" btnType="SuccessSmall">
            UPDATE
          </Button>
        ),
        width: 90,
        filterable: false
      },
      {
        Header: (
          <div>
            <div key="DELETE" className={classes.HeaderStyle}>
              DELETE
            </div>
          </div>
        ),
        accessor: "del",
        Cell: () => <Button btnType="DangerSmall">DELETE</Button>,
        width: 90,
        filterable: false
      }
    ];

    let data = [...this.props.passedData];
    console.log("{TABLE DATA: ]", JSON.stringify(data));
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
