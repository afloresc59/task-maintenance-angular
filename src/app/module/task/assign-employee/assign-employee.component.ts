import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeUtils } from './../../../utils/TypeUtils';
import { EmployeeService } from './../../../service/employee.service';
import { TaskService } from './../../../service/task.service';
import { EmployeeResponse } from 'src/app/model/employee-response';
import { GenericAlert } from './../../../utils/GenericAlert';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskResponse } from 'src/app/model/task-response';
import { Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.css']
})
export class AssignEmployeeComponent extends GenericAlert implements OnInit, OnDestroy {

  listTasks: Array<TaskResponse>;
  listEmployees: Array<EmployeeResponse>;
  codeTask: string;
  codeEmployee: string;

  destroy: Subject<boolean>;

  constructor(private taskService: TaskService,
    private employeeService: EmployeeService,
    public activeModal: NgbActiveModal) {
    super();
    this.destroy = new Subject<boolean>();
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.employeeService.searchEmployees().takeUntil(this.destroy).subscribe(data => this.listEmployees = data);
    this.taskService.searchTasks().takeUntil(this.destroy).subscribe(data => this.listTasks = data);
    this.codeEmployee = TypeUtils.DEFAULT_VALUE;
    this.codeTask = TypeUtils.DEFAULT_VALUE;;
  }

  validateData() {
    let isValid = true;

    if(this.codeTask === TypeUtils.DEFAULT_VALUE) {
      isValid = false;
      this.message = "Select the task, please."
       return isValid;
    }

    if(this.codeEmployee === TypeUtils.DEFAULT_VALUE) {
      isValid = false;
      this.message = "Select the employee, please."
       return isValid;
    }

    return isValid;
  }

  assign() {
    if(this.validateData()) {
      this.taskService.assignEmployee(this.codeTask, this.codeEmployee).takeUntil(this.destroy).subscribe(
        () => this.activeModal.close(),
        () => this.showMessage(false, 'There was an error in assigning the employee.')
      );
    } else {
      this.showMessage(false, this.message);
    }
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
