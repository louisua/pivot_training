import {Component, OnInit,TemplateRef} from '@angular/core';
import {TodoListService} from '../todo-list.service';
import {Todo} from '../todo';

//import bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  todolist: Todo[] ;
  modalRef: BsModalRef;
  constructor (private todolistService: TodoListService,
               private modalService: BsModalService
             ) { }

  ngOnInit(): void {
    this.getTodoList();
  }
  getTodoList(): void {
   this.todolistService.getTodoList().subscribe(todolist => this.todolist = todolist.slice(1.2));
  }
  //fonction pour faire apparaitre le dialogue
  openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

}
