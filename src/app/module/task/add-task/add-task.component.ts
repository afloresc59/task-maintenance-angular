import { TaskService } from './../../../service/task.service';
import { GenericAlert } from './../../../utils/GenericAlert';
import { TaskStoreService } from './../../../store/task-store.service';
import { EmployeeService } from './../../../service/employee.service';
import { TypeUtils } from './../../../utils/TypeUtils';
import { TaskRequest } from './../../../model/task-request';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent extends GenericAlert implements OnInit, OnDestroy {

  task: TaskRequest;
  listProgressTypes: Array<any>;
  listStatusTypes: Array<any>;
  codeProgress: string;
  codeStatus: string;
  codeEmployee: string;
  destroy: Subject<boolean>;

  constructor(public activeModal: NgbActiveModal,
    private taskService: TaskService,
    private taskStoreService: TaskStoreService) {
    super();
    this.task = new TaskRequest();
    this.destroy = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.listProgressTypes = TypeUtils.buildProgressTypes();
    this.listStatusTypes = TypeUtils.buildStatusTypes();
    this.codeProgress = TypeUtils.DEFAULT_VALUE_PROGRESS;
    this.codeStatus = TypeUtils.DEFAULT_VALUE_STATUS;
  }

  save() {
    if(this.validateTask()) {
      this.task.progress = this.codeProgress;
      this.task.status = this.codeStatus;
      this.taskService.saveTask(this.task).takeUntil(this.destroy).subscribe(
        () => this.activeModal.close(),
        () => this.showMessage(false, 'There was an error saving the data.')
      );
    } else {
      this.showMessage(false, this.message);
    }
  }

  validateTask() {
    let isValid = true;

    if(!this.task.name || !this.task.name.trim()) {
      isValid = false;
      this.message = "Enter the task name, please."
      return isValid;
    }

    return isValid;

  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.taskStoreService.clear();
  }

}
