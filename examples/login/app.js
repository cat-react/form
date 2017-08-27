import React from 'react';
import ReactDOM from 'react-dom';
import Form from '@cat-react/form/Form';
import TextInput from '../components/TextInput';

class App extends React.Component {
    render() {
        return (
            <Form>
                <h1>Login</h1>
                <TextInput label="Username" name="username" value="" validations={{isRequired: true}} />
            </Form>
        );
    };
}

ReactDOM.render(<App />, document.getElementById('example'));
