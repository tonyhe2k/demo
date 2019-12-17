import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class HeaderComponenent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        console.log(isUserLoggedIn);
        
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/tony">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos/-1">New Todo</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.invalidateSession}>Logout</Link></li>}
                    </ul>
                    <span className="badge badge-pill badge-danger">T</span>
                </nav>
            </header>
        )
    }
}

export default HeaderComponenent