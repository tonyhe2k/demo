import { Component, OnInit } from '@angular/core';
import { TodoApiService } from '../service/data/todo-api.service';
import { Router } from '@angular/router';

export class TodoWrapper{
  _embedded: { todo: Todo[]};
}

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public completed: boolean,
    public targetDate: Date
  ) { }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos : Todo[]
  deleteSuccessMessage : string = ''

  constructor(
    private todoService: TodoApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos()
    console.log((new Date()).getTimezoneOffset())
  }

  refreshTodos() {
    this.todoService.listTodos().subscribe(
      response => {
        console.log(response);
        this.todos = response._embedded.todo;
      }
    )}

    deleteTodo(id) {
      console.log(`delete clicked ${id}`)
      this.todoService.deleteTodo(id).subscribe(
        response => {
          console.log(response)
          this.deleteSuccessMessage = `Todo #${id} has been successfully deleted`
          this.refreshTodos()
        }
      )
    }

    updateTodo(id) {
      console.log(`update clicked ${id}`)

      this.router.navigate(['todo', id])
    }

    createTodo() {
      this.router.navigate(['todo'])
    }
}
