import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { getConsumers } from "../services/consumerService";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

class Consumers extends Component {
  state = {
    consumers: [],
    columnDefs: [
      {
        headerName: "Id",
        field: "id",
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: "Username",
        field: "name",
      },
      {
        field: "email",
      },
      {
        headerName: "",
        field: "view",
        cellRendererFramework: function (object) {
          const id = object.data.id;
          return (
            <Link
              className="text-primary btn btn-sm"
              to={"/consumers/detail/" + id}
            >
              View
            </Link>
          );
        },
      },
      {
        headerName: "",
        field: "edit",
        cellRendererFramework: function (object) {
          const id = object.data.id;
          return (
            <Link
              className="text-success btn btn-sm"
              to={"/consumers/edit/" + id}
            >
              Edit
            </Link>
          );
        },
      },
      {
        headerName: "",
        field: "delete",
        cellRendererFramework: function (object) {
          const id = object.data.id;
          return (
            <Link
              className="text-danger btn btn-sm"
              to={"/consumers/delete/" + id}
            >
              Delete
            </Link>
          );
        },
      },
    ],
    gridOptions: {
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      rowSelection: "multiple",
      pagination: true,
      paginationPageSize: 5,
      rowData: [],
    },
  };

  async componentDidMount() {
    const { data: consumers } = await getConsumers();
    const rowData = consumers;
    this.setState({ consumers, rowData });
    console.log("------------consumers mount----------");
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onPageSizeChanged = () => {
    var value = document.getElementById("page-size").value;
    console.log(value);
    this.gridApi.paginationSetPageSize(Number(value));
  };

  render() {
    return (
      <div>
        <div className="form-row align-items-center">
          <label className="col-1" htmlFor="page-size" style={{"color":"white"}}>
            Page Size:
          </label>
          <select
            onChange={() => this.onPageSizeChanged()}
            className="custom-select col-1"
            name="page-size"
            id="page-size"
          >
            <option value="5" defaultValue>
              5
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div
          className="ag-theme-alpine mt-2"
          style={{
            height: "400px",
            width: "100%",
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            gridOptions={this.state.gridOptions}
            onGridReady={this.onGridReady}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

export default Consumers;
