import { AddTaskComponent } from './../add-task/add-task.component';
import { ActionUtils } from './../../../utils/ActionUtils';
import { TaskStoreService } from './../../../store/task-store.service';
import { GridGenericStoreService } from './../../../store/grid-generic-store.service';
import { TaskResponse } from './../../../model/task-response';
import { TaskService } from './../../../service/task.service';
import { GenericBean } from './../../../model/generic-bean';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskRequest } from 'src/app/model/task-request';

@Component({
  selector: 'app-task-maintenance',
  templateUrl: './task-maintenance.component.html',
  styleUrls: ['./task-maintenance.component.css']
})
export class TaskMaintenanceComponent implements OnInit {

  destroy: Subject<boolean>;

  constructor(private taskService: TaskService,
    private gridGenericStoreService: GridGenericStoreService,
    private taskStoreService: TaskStoreService,
    private modalService: NgbModal) {
    this.destroy = new Subject<boolean>()
  }

  ngOnInit() {
    this.gridGenericStoreService.addColumns(this.buildGridColumns());
    this.searchTasks();
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

  openModalAddTask() {
    this.openModal(ActionUtils.ACTION_ADD_TASK);
  }

  openModalModifyTask(genericBean: GenericBean) {
    const task = new TaskRequest();
    task.idTask = genericBean.id;
    this.taskStoreService.addTask(task);
    this.openModal(ActionUtils.ACTION_MODIFY_TASK);
  }

  openModalDeleteTask(genericBean: GenericBean) {
    console.log(genericBean.id);
  }

  openModal(action: string) {
    this.taskStoreService.addAction(action);
    const modal = this.modalService.open(AddTaskComponent, { centered: true, backdrop: 'static' });
    modal.result.then(data => this.validateModalResponse(data));
  }

  validateModalResponse(response: any) {
    if(response !== null) {
      this.searchTasks();
    }
  }

  searchTasks() {
    this.taskService.searchTasks().takeUntil(this.destroy).subscribe(data => this.gridGenericStoreService.addData(data));
  }

}
