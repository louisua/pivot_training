
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http'; // <-- NgModel lives here
import { LoadingModule , ANIMATION_TYPES } from 'ngx-loading';
import { HttpModule} from '@angular/http';
import {DatePipe} from '@angular/common';

// bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// routing
import { AppRoutingModule } from './app.routing';

//services
import {YoutubePlayerService} from './youtube-player/youtube-player.service';
import { TodoListService } from './todo-list/todo-list.service';

// components
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { VideoDetailComponent } from './youtube-player/video-detail/video-detail.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TaskDashboardComponent } from './todo-list/task-dashboard/task-dashboard.component';
import { TaskListComponent } from './todo-list/task-list/task-list.component';
import { TodoListDetailComponent } from './todo-list/todo-list-detail/todo-list-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    YoutubePlayerComponent,
    VideoDetailComponent,
    CalculatorComponent,
    TaskDashboardComponent,
    TaskListComponent,
    TodoListDetailComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: 'grey',
        secondaryColour: 'red',
        tertiaryColour: 'green'
    }),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [ YoutubePlayerService, TodoListService ,DatePipe ],

  bootstrap: [AppComponent]
})
export class AppModule { }
