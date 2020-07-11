import { GridGenericStoreService } from './../../../store/grid-generic-store.service';
import { TaskResponse } from './../../../model/task-response';
import { TaskService } from './../../../service/task.service';
import { GenericBean } from './../../../model/generic-bean';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-task-maintenance',
  templateUrl: './task-maintenance.component.html',
  styleUrls: ['./task-maintenance.component.css']
})
export class TaskMaintenanceComponent implements OnInit {

  destroy: Subject<boolean>;

  constructor(private taskService: TaskService,
    private gridGenericStoreService: GridGenericStoreService) {
    this.destroy = new Subject<boolean>()
  }

  ngOnInit() {
    this.gridGenericStoreService.addColumns(this.buildGridColumns());
    this.taskService.searchTasks().takeUntil(this.destroy).subscribe(data => this.gridGenericStoreService.addData(data));
  }

  buildGridColumns(): any {
    const columnsDef = [
      {
        headerName: '', cellRenderer: 'ButtonGridRendered', colId: 'params', cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'ID', field: 'id', hide: true, cellClass: 'cell-wrap-text', cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'NAME', field: 'name', cellClass: 'cell-wrap-text', cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'DESCRIPTION', field: 'description', cellClass: 'cell-wrap-text', cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'PROGRESS', field: 'descriptionProgress', cellClass: 'cell-wrap-text', cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'EMPLOYEE', field: 'employee', cellClass: 'cell-wrap-text', cellStyle: { 'text-align': 'center' }
      },
      {
        headerName: 'STATUS', field: 'descriptionStatus',cellClass: 'cell-wrap-text', cellStyle: { 'text-align': 'center' }
      }
    ];
    return columnsDef;
  }

  openModalViewTask(genericBean: GenericBean) {
    console.log(genericBean.id);
  }

  openModalModifyTask(genericBean: GenericBean) {
    console.log(genericBean.id);
  }

  openModalDeleteTask(genericBean: GenericBean) {
    console.log(genericBean.id);
  }
}
