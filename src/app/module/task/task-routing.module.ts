import { TaskMaintenanceComponent } from './task-maintenance/task-maintenance.component';
import { PathUrl } from './../../utils/PathUrl';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: PathUrl.EMPTY, children:[
    { path: PathUrl.TASK_MAINTENANCE, component: TaskMaintenanceComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
