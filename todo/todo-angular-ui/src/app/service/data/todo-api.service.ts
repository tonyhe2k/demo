import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Todo, TodoWrapper } from 'src/app/list-todos/list-todos.component';
import { API_HOST } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  listTodos() {
    return this.httpClient.get<TodoWrapper>(`${API_HOST}/todo`)
  }

  createTodo(todo) {
    return this.httpClient.post(`${API_HOST}/todo`, todo)
  }

  getTodo(id) {
    return this.httpClient.get<Todo>(`${API_HOST}/todo/${id}`)
  }

  updateTodo(id, todo) {
    return this.httpClient.patch(`${API_HOST}/todo/${id}`, todo)

  }

  deleteTodo(id) {
    return this.httpClient.delete(`${API_HOST}/todo/${id}`)
  }
}
