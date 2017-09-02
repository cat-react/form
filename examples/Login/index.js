import React from 'react';
import Form from '@cat-react/form/Form';
import TextInput from '../components/TextInput';

export default class App extends React.Component {
    render() {
        return (
            <Form>
                <h1>Login</h1>
                <div>
                    <TextInput label="Username" name="username" value="" validations={{isRequired: true}}/>
                </div>
                <div>
                    <TextInput label="Email" name="email" value="" validations={{isEmail: true}}/>
                </div>
            </Form>
        );
    };
}
