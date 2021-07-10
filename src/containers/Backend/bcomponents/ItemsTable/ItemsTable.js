import React from "react";
import classes from "./ItemsTable.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import ReactTable from "react-table-6";

const itemsTable = (props) => {
  const stockColumns = [
    {
      Header: <strong className={classes.Stock}>QUANTITY</strong>,
      accessor: "qty",
      Cell: (row) => <span className={classes.Stock}>{row.value}</span>,
      width:200,
    },
    {
      Header: <strong className={classes.Stock}>VARIATION</strong>,
      accessor: "variation",
      Cell: (row) => <span className={classes.Stock}>{row.value}</span>,
      width:200,
    },
  ];

  const columns = [
    {
      Header: (
        <div key="ID" className={classes.HeaderStyle}>
          ID
        </div>
      ),
      accessor: "id",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).startsWith(filter.value)
          : true;
      },
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
          <div key="CODE" className={classes.HeaderStyle}>
            CODE
          </div>
        </div>
      ),
      accessor: "code",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toUpperCase().startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => (
        <div style={{ lineHeight: "100px" }}>
          <div key={row.value} className={classes.CellStyle}>
            {" "}
            {row.value.toUpperCase()}
          </div>
        </div>
      ),
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
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toUpperCase().startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => (
        <div style={{ lineHeight: "100px" }}>
          <div key={row.value} className={classes.CellStyle}>
            {" "}
            {row.value.name.toUpperCase()}{" "}
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
      accessor: "description",
      filterable: false,
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
          <div key="SIZE" className={classes.HeaderStyle}>
            SIZE
          </div>
        </div>
      ),
      accessor: "size",
      filterable: false,
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
          <div key="PRICE" className={classes.HeaderStyle}>
            PRICE
          </div>
        </div>
      ),
      accessor: "price",
      filterable: false,
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
          <div key="TYPE" className={classes.HeaderStyle}>
            TYPE
          </div>
        </div>
      ),
      accessor: "type",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toUpperCase().startsWith(filter.value.toUpperCase())
          : true;
      },
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
          <div key="TRENDING" className={classes.HeaderStyle}>
            TREND(true/false)
          </div>
        </div>
      ),
      accessor: "trending",
      filterMethod: (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toUpperCase().startsWith(filter.value.toUpperCase())
          : true;
      },
      Cell: (row) => (
        <div style={{ lineHeight: "100px" }}>
          <div key={row.value} className={classes.CellStyle}>
            {row.value === true ? "TRUE" : "FALSE"}
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
      accessor: "image1",
      filterable: false,
      Cell: (row) => (
        <div style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
          <img
            src={row.value}
            alt={row.value}
            style={{ width: "100px" }}
            className={classes.CellStyle}
          />
        </div>
      ),
    },
    {
      Header: (
        <div>
          <div key="IMAGE2" className={classes.HeaderStyle}>
            IMAGE 2
          </div>
        </div>
      ),
      accessor: "image2",
      Cell: (row) => (
        <div style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
          <img
            src={row.value}
            alt={row.value}
            style={{ width: "100px" }}
            className={classes.CellStyle}
          />
        </div>
      ),
      filterable: false,
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
        <div style={{ marginTop: "30px" }}>
          <MyButton id="updateButton" btnType="update">
            UPDATE
          </MyButton>
        </div>
      ),
      filterable: false,
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
        <div style={{ marginTop: "30px" }}>
          <MyButton btnType="delete">DELETE</MyButton>
        </div>
      ),
      filterable: false,
    },
  ];
  const makeSubComp = (row) => {
    const subTable = [];
    for (let i = 0; i < props.passedStock.length; i++) {
      if (props.passedStock[i].item.id === row.original.id) {
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
              price: null,
              trend: null,
              productDetails: null,
            };
            if (rowInfo !== undefined) {
              if (e.target.innerHTML === "DELETE") {
                props.pressedDelete(rowInfo.original.id);
              }
              if (e.target.innerHTML === "UPDATE") {
                rowDetails.rowId = rowInfo.original.id;
                rowDetails.code = rowInfo.original.code;
                rowDetails.collection = rowInfo.original.collection.name;
                rowDetails.desc = rowInfo.original.description;
                rowDetails.size = rowInfo.original.size;
                rowDetails.typology = rowInfo.original.type;
                rowDetails.price = rowInfo.original.price;
                rowDetails.trend = rowInfo.original.trending;
                rowDetails.productDetails = rowInfo.original.productDetails;
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
          },
        };
      }}
      className="-highlight "
      data={props.passedData}
      columns={columns}
      defaultPageSize={5}
      filterable
      defaultFilterMethod={(filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].toUpperCase()).startsWith(filter.value.toUpperCase())
          : true;
      }}
      SubComponent={(row) => {
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
