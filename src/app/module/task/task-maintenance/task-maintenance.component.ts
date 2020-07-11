import { GenericBean } from './../../../model/generic-bean';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-maintenance',
  templateUrl: './task-maintenance.component.html',
  styleUrls: ['./task-maintenance.component.css']
})
export class TaskMaintenanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
