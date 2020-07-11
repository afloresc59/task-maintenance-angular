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


}
