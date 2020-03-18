import React from "react";
import ReactTable from "react-table-6";

const BStock = props => {
  const tableQuery = [
    {id:1, code: 'E 57328', collection: 'crystal', img: 'http://localhost:9000/images/E 57328-A.jpg',price: 300,stock: [{qty: 5,variation:'CITRIN'}]},
    {id:1, code: 'E 57430', collection: 'crystal', img: 'http://localhost:9000/images/E 57430-FUCHSIA.jpg',price: 300,stock:[ {qty: 5,variation:'FUCHSIA'},{qty: 3,variation:'HEMATITE'}]},
    {id:1, code: 'E 57329', collection: 'crystal', img: 'http://localhost:9000/images/E 57329-JET (8 MM.).jpg',price: 300,stock: [{qty: 10,variation:'JET'},{qty: 7,variation:'LT-ROSE'}]},
    {id:1, code: 'E 57431', collection: 'crystal', img: 'http://localhost:9000/images/E 57431-HEMATITE.jpg',price: 300,stock: [{qty: 5,variation:'HEMATITE'},{qty: 5,variation:'WHITE'},{qty: 5,variation:'JET'}]}
  ]

  // const tableQuery = [
  //   {id:1, code: 'E 57328', collection: 'crystal', img: 'http://localhost:9000/images/E 57328-A.jpg',price: 300,stock: {qty: 5,variation:'CITRIN'}},
  //   {id:1, code: 'E 57430', collection: 'crystal', img: 'http://localhost:9000/images/E 57430-FUCHSIA.jpg',price: 300,stock: {qty: 5,variation:'FUCHSIA'}},
  //   {id:1, code: 'E 57329', collection: 'crystal', img: 'http://localhost:9000/images/E 57329-JET (8 MM.).jpg',price: 300,stock: {qty: 10,variation:'JET'}},
  //   {id:1, code: 'E 57431', collection: 'crystal', img: 'http://localhost:9000/images/E 57431-HEMATITE.jpg',price: 300,stock: {qty: 5,variation:'HEMATITE'}}
  // ]
const columns = [
  {Header:"id",accessor:"id"},
  {Header:"code",accessor:"code"},
  {Header:"collection",accessor:"collection"},
  {Header:"image",accessor:"image"},
  {Header:"price",accessor:"price"},
  {id: "stockqty", Header:"quantity",accessor:"stock.qty"},
  {id: "stockVary", Header:"variation",accessor:"stock.variation"},

]
  return (
    <React.Fragment>
    <h1>BStock</h1>
    <ReactTable columns ={columns} data={tableQuery} />
    </React.Fragment>
  ); 
};

export default BStock;
