import React, { Component } from 'react';
import TodoService from '../../api/todo/TodoService.js'
import moment from 'moment'

export class TodoListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message : null
        }

        this.deleteTodo = this.deleteTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        TodoService.getTodos()
            .then(
                response => { 
                    this.setState({todos : response.data._embedded.accounts})
                }
            )
    }

    render() {
        return (<div>
            <h1>List Todos</h1>
            {this.state.message &&<div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Target Date</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.todos.map(todo => 
                    <tr key={todo.id}>
                        <td>{todo.description}</td>
                        <td>{todo.completed.toString()}</td>
                        <td>{moment.parseZone(todo.targetDate).format('MM-DD-YYYY')}</td>
                        <td><button className='btn btn-success' onClick={() => this.updateTodo(todo.id)}>update</button></td>                        
                        <td><button className='btn btn-warning' onClick={() => this.deleteTodo(todo.id)}>delete</button></td>
                    </tr>)}
                </tbody>
            </table>

            <div className="row">
                <button className="btn btn-success" onClick={() => this.addTodo()}>Add a new todo</button>
            </div>
            </div>
        </div>);
    }

    deleteTodo(id) {
        console.log(id)
        TodoService.deleteTodo(id).then(
            response => {
                this.setState({message: `Todo ${id} deleted`})
                this.refreshTodos()
            }
        )
    }

    updateTodo(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodo() {
        this.props.history.push(`/todos/-1`)
    }

    refreshTodos() {
        TodoService.getTodos()
            .then(
                response => { 
                    this.setState({todos : response.data._embedded.accounts})
                }
            )
    }
}


