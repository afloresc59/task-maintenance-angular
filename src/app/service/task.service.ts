import { TaskRequest } from './../model/task-request';
import { PathApi } from './../utils/PathApi';
import { TaskResponse } from './../model/task-response';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  searchTasks(): Observable<Array<TaskResponse>> {
    return this.httpClient.get<Array<TaskResponse>>(this.apiUrl + PathApi.SEARCH_TASKS);
  }

  saveTask(taskRequest: TaskRequest): Observable<any> {
    return this.httpClient.post(this.apiUrl + PathApi.SAVE_TASK, taskRequest);
  }

  searchTask(taskRequest: TaskRequest): Observable<TaskResponse> {
    return this.httpClient.get<TaskResponse>(this.apiUrl + PathApi.SEARCH_TASKS + '/' + taskRequest.idTask);
  }

  updateTask(taskRequest: TaskRequest): Observable<any> {
    return this.httpClient.put(this.apiUrl + PathApi.UPDATE_TASK, taskRequest);
  }

  deleteTask(taskRequest: TaskRequest): Observable<any> {
    return this.httpClient.put(this.apiUrl + PathApi.DELETE_TASK, taskRequest);
  }

  assignEmployee(codeTask: string, codeEmployee: string): Observable<any> {
    const finalUrl = this.apiUrl + PathApi.ASSIGN_TASK.replace("{idTask}", codeTask).replace("{idEmployee}", codeEmployee);
    return this.httpClient.put(finalUrl, null);
  }

  completeTaskBatch(tasksRequest: Array<TaskRequest>): Observable<any> {
    return this.httpClient.put(this.apiUrl + PathApi.COMPLETE_TASK_BATCH, tasksRequest);
  }

}
