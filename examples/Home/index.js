import React from 'react';
import Form from '@cat-react/form/Form';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import BasicInput from '../components/BasicInput';
import autoBind from 'react-autobind';

const example = `class Login extends React.Component {
    render() {
        return (
            <Form>
                <h1>Login Example</h1>
                    <BasicInput label="Email address"
                                name="email"
                                type="email"
                                value=""
                                validations={{isRequired: true, isEmail: true}}
                                messages={{
                                    isEmail: 'Enter a valid email address.'
                                }}
                                placeholder="Enter email"/>
                    <BasicInput label="Password"
                                name="password"
                                type="password"
                                value=""
                                validations={{isRequired: true, minLength: 3}}
                                messages={{
                                    isRequired: 'Enter your password.',
                                    minLength: 'A password must contain minimum 3 characters.'
                                }}
                                placeholder="Enter password"/>
                    <button type="submit" className="btn btn-primary">Login</button>
            </Form>
        );
    };
}
`;

export default class extends React.Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-9">
                            <h1 className="display-3">Welcome!</h1>
                            <p className="lead">
                                These are the examples of <a href="https://github.com/cat-react/form">@cat-react/form</a>.
                            </p>
                            <hr />
                            <p>
                                Use the navigation on the left side to take a closer look at each example.
                            </p>
                        </div>
                        <div className="logo col-md-3">
                            <a href="https://github.com/cat-react"><img src="/logo.png" /></a>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Try the library live!</h3>
                    <LiveProvider code={example} scope={{Form: Form, BasicInput: BasicInput, autoBind: autoBind}}>
                        <LiveEditor className="col-md-6"/>
                        <div className="col-md-6">
                            <LiveError className="alert alert-danger"/>
                            <LivePreview/>
                        </div>
                    </LiveProvider>
                </div>
            </div>
        );
    }
}
