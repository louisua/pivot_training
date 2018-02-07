import { Component , Input, OnInit} from '@angular/core';
import { Todo } from '../todo';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {TodoListService} from '../todo-list.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-todo-list-detail',
  templateUrl: './todo-list-detail.component.html',
  styleUrls: ['./todo-list-detail.component.css']
})
export class TodoListDetailComponent implements OnInit {

  @Input() todo: Todo;
  Todo : Todo[];
  constructor (
    private todolistService: TodoListService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todolistService.getTodo(id)
      .subscribe(todo => this.todo = todo);
    }

  goBack(): void {
    //this.location.back();
  }

  save(): void {
    this.todolistService.update(this.todo)
      .subscribe(() => this.goBack());
  }

}
