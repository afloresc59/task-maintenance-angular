import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridGenericStoreService {

  listColumns:  BehaviorSubject<any>;
  listData: BehaviorSubject<any>;

  constructor() {
    this.listColumns = new BehaviorSubject<any>(new Array<Object>());
    this.listData = new BehaviorSubject<any>(new Array<Object>());
  }


  addColumns(columns: any) {
    this.listColumns.next(columns);
  }

  getColumns(): Observable<Array<Object>> {
    return this.listColumns.asObservable();
  }

  addData(data: any) {
    this.listData.next(data);
  }

  getData(): Observable<Array<Object>> {
    return this.listData.asObservable();
  }

  clear() {
    this.listColumns.next(new Array<Object>());
    this.listData.next(new Array<Object>());
  }

}
