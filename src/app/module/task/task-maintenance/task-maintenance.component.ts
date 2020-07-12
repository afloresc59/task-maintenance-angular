import { GenericTableComponent } from './../../utility/generic-table/generic-table.component';
import { AssignEmployeeComponent } from './../assign-employee/assign-employee.component';
import { ConstantUtils } from './../../../utils/ConstantUtils';
import { GenericAlert } from './../../../utils/GenericAlert';
import { ModalConfirmationComponent } from './../../utility/modal-confirmation/modal-confirmation.component';
import { AddTaskComponent } from './../add-task/add-task.component';
import { ActionUtils } from './../../../utils/ActionUtils';
import { TaskStoreService } from './../../../store/task-store.service';
import { GridGenericStoreService } from './../../../store/grid-generic-store.service';
import { TaskResponse } from './../../../model/task-response';
import { TaskService } from './../../../service/task.service';
import { GenericBean } from './../../../model/generic-bean';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskRequest } from 'src/app/model/task-request';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-task-maintenance',
  templateUrl: './task-maintenance.component.html',
  styleUrls: ['./task-maintenance.component.css']
})
export class TaskMaintenanceComponent extends GenericAlert implements OnInit {

  destroy: Subject<boolean>;

  @ViewChild('grid') grid: GenericTableComponent;

  constructor(private taskService: TaskService,
    private gridGenericStoreService: GridGenericStoreService,
    private taskStoreService: TaskStoreService,
    private modalService: NgbModal) {
      super();
    this.destroy = new Subject<boolean>()
  }

  ngOnInit() {
    this.gridGenericStoreService.addColumns(this.buildGridColumns());
    this.searchTasks();
  }

  buildGridColumns(): any {
    const columnsDef = [
      {
        headerName: '', maxWidth: '40', headerCheckboxSelection: true, checkboxSelection: true, cellStyle: { 'text-align': 'center' }
      },
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
    const task = new TaskRequest();
    task.idTask = genericBean.id;
    this.taskStoreService.addTask(task);
    this.openModal(ActionUtils.ACTION_VIEW_TASK);
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
    const task = new TaskRequest();
    task.idTask = genericBean.id;
    task.status = ConstantUtils.STATUS_INACTIVE;

    const modal = this.modalService.open(ModalConfirmationComponent, { centered: true, backdrop: 'static' });
    modal.componentInstance.message = 'Are you sure to delete the task?';
    modal.result.then(response => this.deleteTask(response, task))
  }

  deleteTask(response: number, task: TaskRequest) {
    if(response === 1) {
      this.taskService.deleteTask(task).takeUntil(this.destroy).subscribe(
        () => {
          this.showMessage(true, 'The operation was successful.');
          this.searchTasks();
        },
        () => this.showMessage(false, 'There was an error deleting the task.')
      );
    }
  }

  openModal(action: string) {
    this.taskStoreService.addAction(action);
    const modal = this.modalService.open(AddTaskComponent, { centered: true, backdrop: 'static' });
    modal.result.then(data => this.validateModalResponse(data));
  }

  openModalAssignEmployee() {
    const modal = this.modalService.open(AssignEmployeeComponent, { centered: true, backdrop: 'static' });
    modal.result.then(data => this.validateModalResponse(data));
  }

  validateModalResponse(response: any) {
    if(response !== null) {
      this.showMessage(true, 'The operation was successful.');
      this.searchTasks();
    }
  }

  searchTasks() {
    this.taskService.searchTasks().takeUntil(this.destroy).subscribe(data => this.gridGenericStoreService.addData(data));
  }

  markCompletationTasks() {
    const listTasks = new Array<TaskRequest>();
    this.grid.getSelectedRows().foreach(task => {
      const taskRequest = new TaskRequest();
      taskRequest.idTask = task.id;
      listTasks.push(taskRequest);
    });

    if(listTasks.length > 0) {
      this.taskService.completeTaskBatch(listTasks).takeUntil(this.destroy).subscribe(
        () => {
          this.showMessage(true, 'Selected tasks were completed.');
          this.searchTasks();
        },
        () => this.showMessage(false, 'There was an error completing the selected tasks.')
      );
    } else {
      this.showMessage(false, 'Select at least one task, please.')
    }
  }

}
