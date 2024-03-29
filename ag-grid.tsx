import * as React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

interface AppProps {}

interface AppPState {
  rowData: [];
}

class AgGrid extends React.Component<AppProps, AppPState> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: []
    };
  }

  componentDidMount() {
    const apiUrl = 'https://www.ag-grid.com/example-assets/row-data.json';
    fetch(apiUrl)
      .then(response => response.json())
      .then((rowData: any) => {
        console.log('This is your data', rowData);
        this.setState({
          rowData: rowData
        });
      });
  }

  render() {
    // overrides the default using a multiple column types
    const dType = ['dateColumn', 'nonEditableColumn'];
    // a default column definition with properties that get applied to every column
    const defaultColDef = {
      // set every column width
      width: 100,
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: 'agTextColumnFilter'
    };

    // if we had column groups, we could provide default group items here
    const defaultColGroupDef = {};

    // define a column type (you can define as many as you like)
    const columnTypes = {
      nonEditableColumn: { editable: false },
      dateColumn: {
        filter: 'agDateColumnFilter',
        // filterParams: { comparator: myDateComparator },
        suppressMenu: true
      }
    };
    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          defaultColGroupDef={defaultColGroupDef}
          columnTypes={columnTypes}
          rowData={this.state.rowData}
        >
          <AgGridColumn
            field="make"
            headerName="Make"
            sortable={true}
            filter={true}
          />
          <AgGridColumn
            field="model"
            headerName="Model 1"
            sortable={true}
            filter={true}
          />
          <AgGridColumn
            field="price"
            headerName="Price 1"
            sortable={true}
            filter={true}
          />
        </AgGridReact>
      </div>
    );
  }
}

export default AgGrid;
