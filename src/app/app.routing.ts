
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TaskDashboardComponent } from './todo-list/task-dashboard/task-dashboard.component';
import { TaskListComponent } from './todo-list/task-list/task-list.component';
import { TodoListDetailComponent } from './todo-list/todo-list-detail/todo-list-detail.component';
// Definition of routes
export const appRoutes: Routes = [
  {
    path : 'player',
    component: YoutubePlayerComponent // TODO : use appropriated page
  },
  {
    path : 'calculator',
    component: CalculatorComponent // TODO : use appropriated page
  },
  {path : 'todolist', component: TodoListComponent,
    children : [
      {path : '',redirectTo: 'TaskDashboard',pathMatch: 'full'},
      {path : 'TaskDashboard',component: TaskDashboardComponent},
      {path: 'DetailTask/:id',component: TodoListDetailComponent},
      {path: 'TaskList',component: TaskListComponent}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
