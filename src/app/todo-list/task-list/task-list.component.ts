import { Component, OnInit, TemplateRef} from '@angular/core';
import { Todo } from '../todo';
import {TodoListService} from '../todo-list.service';
import { Router } from '@angular/router';


//import bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  todolist: Todo[];
   selectTodo: Todo;
   modalRef: BsModalRef;

   onSelect(todo: Todo): void {
     this.selectTodo = todo;
   }

   constructor(
     private todoListService: TodoListService,
     private router: Router,
     private modalService: BsModalService
   ) { }

   ngOnInit(): void {
     this.getTodolist();
   }
   getTodolist(): void {
     this.todoListService.getTodoList().subscribe(todolist => this.todolist = todolist);
   }
   gotoDetail(): void {
     this.router.navigate(['/todolist/DetailTask', this.selectTodo.id]);
   }
   add(name,place,time: string ) {
     name = name.trim();
     place = place.trim();
     time = time.trim();
     if (!name) { return; }
     if (!place) { return; }
     if (!time) { return; }
     this.todoListService.create({name,place,time} as Todo).subscribe(todo => this.todolist.push(todo));
     }

   deleteTodo(todo: Todo): void {
     this.todolist = this.todolist.filter(h => h !== todo);
     this.todoListService.delete(todo).subscribe;
   }

   //fonction pour faire apparaitre le dialogue
   openModal(template: TemplateRef<any>) {
   this.modalRef = this.modalService.show(template);

  }

}
