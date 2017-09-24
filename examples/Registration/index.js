import React from 'react';
import {Form} from '@cat-react/form';
import BasicInput from '../components/BasicInput';
import autoBind from 'react-autobind';

export default class extends React.Component {
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

    reset() {
        if (this.form) {
            this.form.reset();
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
            <Form onSubmit={this.onSubmit} ref={(form) => { this.form = form; }}>
                <h1>Registration</h1>
                {success}
                {error}
                <BasicInput label="Email address"
                            name="email"
                            type="email"
                            value=""
                            validations={{isRequired: true, isEmail: true}}
                            messages={{
                                isRequired: 'You have to enter your email address.',
                                isEmail: 'Please enter a valid email address.'
                            }}
                            placeholder="Enter email"/>
                <BasicInput label="Confirm Email address"
                            name="confirm_email"
                            type="email"
                            value=""
                            validations={{isRequired: true, equalsField: 'email'}}
                            messages={{
                                isRequired: 'Confirm your email address.',
                                equalsField: 'The email addresses are not matching each other.'
                            }}
                            placeholder="Confirm your Email address"/>
                <BasicInput label="First Name"
                            name="first_name"
                            type="text"
                            value=""
                            validations={{minLength: 3}}
                            messages={{
                                minLength: 'Your First Name has to be minimum 3 characters long.'
                            }}
                            placeholder="Enter your First Name"/>
                <BasicInput label="Last Name"
                            name="last_name"
                            type="text"
                            value=""
                            validations={{isRequired: true}}
                            warnings={['isRequired']}
                            messages={{
                                isRequired: 'We appreciate you to submit your last name.'
                            }}
                            placeholder="Enter your Last Name"/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={this.reset}>Reset</button>
            </Form>
        );
    };
}
