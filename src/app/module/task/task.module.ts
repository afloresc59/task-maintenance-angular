import { UtilityModule } from './../utility/utility.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskMaintenanceComponent } from './task-maintenance/task-maintenance.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TaskMaintenanceComponent, AddTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    UtilityModule,
    TaskRoutingModule,
    NgbModule
  ],
  entryComponents: [
    AddTaskComponent
  ]
})
export class TaskModule { }
