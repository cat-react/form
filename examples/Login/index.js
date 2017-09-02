import React from 'react';
import Form from '@cat-react/form/Form';
import BasicInput from '../components/BasicInput';

export default class App extends React.Component {
    render() {
        return (
            <Form>
                <h1>Login</h1>
                <BasicInput label="Email address"
                            name="email"
                            type="email"
                            value=""
                            validations={{isRequired: true, isEmail: true}}
                            placeholder="Enter email"/>
                <button type="submit" className="btn btn-primary">Login</button>
            </Form>
        );
    };
}
