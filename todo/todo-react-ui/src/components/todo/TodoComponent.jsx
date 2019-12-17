import React, { Component } from 'react';
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import HelloWorldService from '../../api/todo/TodoService.js';

export class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment.parseZone(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        if (this.state.id === -1) return

        HelloWorldService.getTodo(this.state.id)
            .then(
                response => { 
                    console.log(response.data)
                    this.setState({
                        description : response.data.description,
                        targetDate: moment.parseZone(response.data.targetDate).format('YYYY-MM-DD')
                    })
                    console.log("desc: " + this.state.description)
                    console.log("targetdate: " + this.state.targetDate)
                }
            )

        }

    onSubmit(values) {
        console.log(values)

        if (this.state.id === -1) {
            HelloWorldService.addTodo({
                description: values.description,
                targetDate: values.targetDate
            }).then(() => this.props.history.push('/todos'))
        } else {
            HelloWorldService.updateTodo(this.state.id, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(() => this.props.history.push('/todos'))
        }
    }
    
    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters for Description'
        }

        if(!moment(values.targetDate).isValid) {
            errors.targetDate = 'Enter a valid date'
        }
        return errors
    }

    render() {
        let {description,targetDate}  = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        // validateOnBlur={false}
                        // validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {   
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group row">
                                        <lable>Description</lable>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <lable>Target Date</lable>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )

                        }
                    </Formik>
                </div>
            </div>
        )
    }
}
