import React from 'react';
import {Form} from '@cat-react/form';
import BasicInput from '../components/BasicInput';
import autoBind from 'react-autobind';
import 'whatwg-fetch';

export default class extends React.Component {
    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            values: null,
            canSubmit: false
        };
    }

    componentDidMount() {
        if (this.form) {
            this.form.touch();
        }
    }

    onValidSubmit(values) {
        this.setState({
            values: values
        });
    }

    onValid() {
        this.setState({
            canSubmit: true
        });
    }

    onInvalid() {
        this.setState({
            canSubmit: false
        });
    }

    render() {
        return (
            <Form onValid={this.onValid}
                  onInvalid={this.onInvalid}
                  onValidSubmit={this.onValidSubmit}
                  ref={(form) => { this.form = form; }}>
                <h1>Async Validation</h1>
                <BasicInput label="Username"
                            name="username"
                            type="text"
                            value="Bret"
                            validations={{
                                isRequired: true,
                                isUsernameAlreadyTaken: async (values, value) => {
                                    const users = await fetch('https://jsonplaceholder.typicode.com/users')
                                        .then(response => response.json());
                                    const isTaken = users.some(user => user.username === value);
                                    return !isTaken;
                                }
                            }}
                            messages={{
                                isRequired: 'You have to enter a blog title.',
                                isUsernameAlreadyTaken: 'The Username is already taken.'
                            }}
                            placeholder=""/>
                <button type="submit"
                        className="btn btn-primary"
                        disabled={!this.state.canSubmit}>Submit
                </button>
                <div className="alert alert-light" role="alert">
                    Valid Submitted Values: {JSON.stringify(this.state.values)}
                </div>
            </Form>
        );
    };
}
