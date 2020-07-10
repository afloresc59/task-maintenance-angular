import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskMaintenanceComponent } from './task-maintenance/task-maintenance.component';


@NgModule({
  declarations: [TaskMaintenanceComponent],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
