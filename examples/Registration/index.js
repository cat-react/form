import React from 'react';
import Form from '@cat-react/form/Form';
import BasicInput from '../components/BasicInput';
import autoBind from 'auto-bind';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            success: false,
            error: false
        }
    }

    onSubmit(values, valid) {
        if (valid) {
            this.setState({
                success: true,
                error: false
            });
        } else {
            this.setState({
                success: false,
                error: true
            });
        }
    }

    render() {
        let success = null;
        if (this.state.success) {
            success = (
                <div className="alert alert-success" role="alert">
                    Success!
                </div>
            );
        }
        let error = null;
        if (this.state.error) {
            error = (
                <div className="alert alert-danger" role="alert">
                    Error! Please check your inputs.
                </div>
            );
        }

        return (
            <Form onSubmit={this.onSubmit}>
                <h1>Registration</h1>
                {success}
                {error}
                <BasicInput label="Email address"
                            name="email"
                            type="email"
                            value=""
                            validations={{isRequired: true, isEmail: true}}
                            validationErrors={{
                                isRequired: 'You have to enter your email address.',
                                isEmail: 'Please enter a valid email address.'
                            }}
                            placeholder="Enter email"/>
                <BasicInput label="Confirm Email address"
                            name="confirm_email"
                            type="email"
                            value=""
                            validations={{isRequired: true, equalsField: 'email'}}
                            validationErrors={{
                                isRequired: 'Confirm your email address.',
                                equalsField: 'The email addresses are not matching each other.'
                            }}
                            placeholder="Confirm your Email address"/>
                <BasicInput label="First Name"
                            name="first_name"
                            type="text"
                            value=""
                            validations={{minLength: 3}}
                            validationErrors={{
                                minLength: 'Your First Name has to be minimum 3 characters long.'
                            }}
                            placeholder="Enter your First Name"/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        );
    };
}
