import axios from 'axios'
import {API_HOST_NAME} from '../../Constants'

class TodoService {

    getTodos() {
        return axios.get(`${API_HOST_NAME}/todo`)
    }
    getTodo(id) {
        return axios.get(`${API_HOST_NAME}/todo/${id}`)
    }

    deleteTodo(id) {
        return axios.delete(`${API_HOST_NAME}/todo/${id}`)
    }

    updateTodo(id, todo) {
        return axios.put(`${API_HOST_NAME}/todo/${id}`, todo)
    }

    addTodo(todo) {
        return axios.post(`${API_HOST_NAME}/todo/`, todo)
    }
}

export default new TodoService()