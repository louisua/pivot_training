import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';
import {Observable} from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';
const httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class TodoListService {
 private todolistURl= 'api/todolist';
 constructor(private http: HttpClient) { }
 private headers = new Headers({'Content-Type': 'application/json'});

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todolistURl);
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.todolistURl}/${id}`;
    return this.http.get<Todo>(url);
  }

  update(todo: Todo): Observable<any> {
    const url = `${this.todolistURl}/${todo.id}`;
    return this.http.put(this.todolistURl, todo, httpOptions);
  }

  create (todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todolistURl, todo, httpOptions);
  }

  delete (todo: Todo | number): Observable<Todo>{
		const id = typeof todo === 'number' ? todo : todo.id;
		const url = `${this.todolistURl}/${id}`;
		return this.http.delete<Todo>(url, httpOptions);
	}

}
