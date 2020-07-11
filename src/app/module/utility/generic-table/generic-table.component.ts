import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;
  gridOptions: any;
  columnDefs: any;
  rowData: any;
  context: any;
  listData: any;
  listColumns: any;

  constructor() {
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit() {
    this.listColumns = this.columnDefaultData;
    this.listData = this.rowDefaultDataDefs;
    this.context = { componentParent: this };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptions.api.sizeColumnsToFit();
    
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  columnDefaultData = [
    {headerName: 'Name', field: 'name' },
    {headerName: 'Description', field: 'description' },
    {headerName: 'Employee', field: 'employee'}
  ];

  rowDefaultDataDefs = [
    { name: 'TASK 1', description: 'SIMPLE TASK ONE', employee: 'ANTHONY' },
    { name: 'TASK 2', description: 'SIMPLE TASK TWO', employee: 'FLORES' },
    { name: 'TASK 3', description: 'SIMPLE TASK THREE', employee: 'CARRASCO' }
  ];

}
