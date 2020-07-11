import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TaskRequest } from '../model/task-request';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {

  task: BehaviorSubject<TaskRequest>;
  action: BehaviorSubject<String>;

  constructor() {
    this.task = new BehaviorSubject<TaskRequest>(new TaskRequest());
    this.action = new BehaviorSubject<String>('');
  }

  addTask(taskRequest: TaskRequest) {
    this.task.next(taskRequest);
  }

  getTask(): Observable<TaskRequest> {
    return this.task.asObservable();
  }

  addAction(actionTask: string) {
    this.action.next(actionTask);
  }

  getAction(): Observable<String> {
    return this.action.asObservable();
  }

  clear() {
    this.task.next(new TaskRequest());
    this.action.next('');
  }

}
