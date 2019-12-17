import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

export class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            hasLoginFailed : null
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleInputChange(event){
        // console.log(this.state)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    loginClicked() {

        if (!this.state.username || !this.state.password) {
            this.setState({hasLoginFailed:true})
            return
        }

        // AuthenticationService
        //     .authenticateUser(this.state.username, this.state.password)
        //     .then(() => {
        //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //             this.props.history.push(`/welcome/${this.state.username}`)
        //         })
        //     .catch(
        //         () => {
        //             this.setState({hasLoginFailed:true})
        //         }
        //     )


        AuthenticationService
            .authenticateUser(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div> 
                <h1>Login</h1>
                {this.state.hasLoginFailed &&<div className="alert alert-warning">Invalid Crenditial</div>}
                <div className="container">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10"><input name="username" value={this.state.username} onChange={this.handleInputChange} type="text" className="form-control" id="username"/></div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10"><input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control" id="password"/></div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button onClick={this.loginClicked} type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
            </>
        )
    }
}