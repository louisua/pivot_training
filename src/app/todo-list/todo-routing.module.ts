import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TodoListDetailComponent } from './todo-list-detail/todo-list-detail.component';

export const todoRoutes: Routes = [
{
  path : 'TaskDashboard',component: TaskDashboardComponent

},
{
  path: 'DetailTask/:id',component: TodoListDetailComponent
},
{
  path: 'TaskList',component: TaskListComponent
},
  {
    path : '',
    redirectTo: '/TaskDashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(todoRoutes)
  ],
  exports: [ RouterModule ]
})

export class TodoRoutingModule { }
