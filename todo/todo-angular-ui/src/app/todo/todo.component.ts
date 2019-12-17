import { Component, OnInit } from '@angular/core';
import { TodoApiService } from '../service/data/todo-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number 
  todo: Todo

  constructor(
    private todoAPI: TodoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id']
    this.todo = new Todo(this.id, '', false, null)

    if(this.id) {
      console.log(`retrieving id # ${this.id}`)
      this.todoAPI.getTodo(this.id).subscribe(
        data => this.todo = data
      )
    }
  }

  saveTodo() {
    if(this.id) {
      this.todoAPI.updateTodo(this.id, this.todo)
        .subscribe(
          response => {
            // console.log(response)
            this.router.navigate(['todos'])
          }
      )
    } else {
      this.todoAPI.createTodo(this.todo)
        .subscribe(
          response => {
            // console.log(response)
            this.router.navigate(['todos'])
          }
      )
    }
  }


}
