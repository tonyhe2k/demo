import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import { LoginComponent, LogoutComponent } from './LoginComponent'
import { TodoListComponent } from './TodoListComponent'
import { TodoComponent } from './TodoComponent'
import { WelcomeComponent } from './WelcomeComponent'
import HeaderComponenent from './HeaderComponenent'
import { FooterComponenent } from './FooterComponenent'
import { ErrorComponenet } from './ErrorComponenet'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                    <HeaderComponenent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/logout" component={LogoutComponent} />
                        <Route path="/todos/:id" component={TodoComponent} />
                        <Route path="/todos" component={TodoListComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <Route component={ErrorComponenet} />
                    </Switch>
                    <FooterComponenent/>
                    </>
                </Router>
            </div>
        )
    }

}

export default TodoApp