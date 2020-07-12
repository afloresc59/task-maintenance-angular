import { GridGenericStoreService } from './../../../store/grid-generic-store.service';
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

  constructor(private gridGenericStoreService: GridGenericStoreService) {
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit() {
    this.gridOptions.rowHeight = 40;
    this.listColumns = this.gridGenericStoreService.getColumns();
    this.listData = this.gridGenericStoreService.getData();
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

  getSelectedRows(){
    return this.gridOptions.api.getSelectedRows();
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

}
