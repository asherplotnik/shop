import React from "react";
import classes from "./ItemsTable.module.css";
import Button from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

const itemsTable = props => {
  const stockColumns = [
    {
      Header: <strong className={classes.Stock}>QUANTITY</strong>,
      accessor: "qty",
      Cell: row => <span className={classes.Stock}>{row.value}</span>,
      width: 150
    },
    {
      Header: <strong className={classes.Stock}>VARIATION</strong>,
      accessor: "variation",
      Cell: row => <span className={classes.Stock}>{row.value}</span>,
      width: 150
    }
  ];

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
        <div style={{ lineHeight: "100px" }}>
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
        <div style={{ lineHeight: "100px" }}>
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
      width: 230,
      Cell: row => (
        <div style={{ lineHeight: "100px" }}>
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
      width: 330,
      filterable: false,
      Cell: row => (
        <div style={{ lineHeight: "100px" }}>
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
        <div style={{ lineHeight: "100px" }}>
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
        <div style={{ lineHeight: "100px" }}>
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
        <div style={{ lineHeight: "100px" }}>
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
        <div style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
          <img
            src={"http://localhost:9000/images/" + row.value}
            alt={row.value}
            style={{ width: "100px" }}
            className={classes.CellStyle}
          />
        </div>
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
        <div style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
          <img
            src={"http://localhost:9000/images/" + row.value}
            alt={row.value}
            style={{ width: "100px" }}
            className={classes.CellStyle}
          />
        </div>
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
        <div style={{ marginTop: "20px" }}>
          <Button id="updateButton" btnType="SuccessSmall">
            UPDATE
          </Button>
        </div>
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
      Cell: () => (
        <div style={{ marginTop: "20px" }}>
          <Button btnType="DangerSmall">DELETE</Button>
        </div>
      ),
      width: 90,
      filterable: false
    }
  ];
  const makeSubComp = row => {
    const subTable = [];
    for (let i = 0; i < props.passedStock.length; i++) {
      if (props.passedStock[i].code === row.original.code) {
        subTable.push(props.passedStock[i]);
      }
    }
    return subTable;
  };
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
              if (e.target.innerHTML === "DELETE") {
                props.pressedDelete(rowInfo.original.id);
              }
              if (e.target.innerHTML === "UPDATE") {
                rowDetails.rowId = rowInfo.original.id;
                rowDetails.code = rowInfo.original.code;
                rowDetails.collection = rowInfo.original.collection;
                rowDetails.desc = rowInfo.original.desc;
                rowDetails.size = rowInfo.original.size;
                rowDetails.typology = rowInfo.original.type;
                rowDetails.price = rowInfo.original.price;
                props.pressedUpdate(rowDetails);
              }
              // console.log("A Td Element was clicked!");
              // console.log("it produced this event:", e.target.innerHTML);
              // console.log("It was in this column:", column.Header);
              // console.log("It was in this row:", rowInfo);
              // console.log("It was in this table instance:", instance);
              if (handleOriginal) {
                handleOriginal();
              }
            }
          }
        };
      }}
      className="-highlight "
      data={props.passedData}
      columns={columns}
      defaultPageSize={6}
      filterable
      SubComponent={row => {
        return (
          <ReactTable
            style={{ border: "1px solid black" }}
            columns={stockColumns}
            data={makeSubComp(row)}
            defaultPageSize={50}
            minRows={1}
            showPagination={false}
          />
        );
      }}
    />
  );
};
export default itemsTable;
