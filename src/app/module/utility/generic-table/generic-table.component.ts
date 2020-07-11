import { GenericBean } from './../../../model/generic-bean';
import { GenericButtonComponent } from './../generic-button/generic-button.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  frameworkComponents: any;

  @Output() modifyEvent= new EventEmitter();
  @Output() viewEvent= new EventEmitter();
  @Output() deleteEvent= new EventEmitter();

  constructor() {
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit() {
    this.gridOptions.rowHeight = 40;
    this.listColumns = this.columnDefaultData;
    this.listData = this.rowDefaultDataDefs;
    this.context = { componentParent: this };
    this.frameworkComponents = {
      ButtonGridRendered: GenericButtonComponent
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptions.api.sizeColumnsToFit();
    
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

  executeMethodVisualize(genericBean: GenericBean) {
    this.viewEvent.emit(genericBean);
  }

  executeMethodModify(genericBean: GenericBean) {
    this.modifyEvent.emit(genericBean);
  }

  executeMethodDelete(genericBean: GenericBean) {
    this.deleteEvent.emit(genericBean);
  }

  columnDefaultData = [
    {
      headerName: '', maxWidth: 150, cellRenderer: 'ButtonGridRendered',
      colId: 'params', cellStyle: { 'text-align': 'center' }
    },
    {headerName: 'ID', field: 'id' },
    {headerName: 'Name', field: 'name' },
    {headerName: 'Description', field: 'description' },
    {headerName: 'Employee', field: 'employee'}
  ];

  rowDefaultDataDefs = [
    { id:1, name: 'TASK 1', description: 'SIMPLE TASK ONE', employee: 'ANTHONY' },
    { id:2, name: 'TASK 2', description: 'SIMPLE TASK TWO', employee: 'FLORES' },
    { id:3, name: 'TASK 3', description: 'SIMPLE TASK THREE', employee: 'CARRASCO' }
  ];

}
