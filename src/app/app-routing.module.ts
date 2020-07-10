import { PathUrl } from './utils/PathUrl';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: PathUrl.TASK, loadChildren: () => import('./module/task/task.module').then(module => module.TaskModule) },
  { path: '**', pathMatch: 'full', redirectTo: PathUrl.buildRouteApplication(PathUrl.TASK, PathUrl.TASK_MAINTENANCE) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
