<p align="center">
    <a href="https://github.com/cat-react"><img src="https://user-images.githubusercontent.com/4418879/30520764-b86d5cc6-9bb4-11e7-9313-ced40eb4e066.png" alt="cat-react" /></a>
</p>

# [@cat-react](https://github.com/cat-react) / form ![Build Status](https://travis-ci.org/cat-react/form.svg?branch=master) [![codecov](https://codecov.io/gh/cat-react/form/branch/master/graph/badge.svg)](https://codecov.io/gh/cat-react/form) [![npm version](https://badge.fury.io/js/%40cat-react%2Fform.svg)](https://badge.fury.io/js/%40cat-react%2Fform)
A simple yet powerful library which helps creating validated forms in react. This project is inspired by [formsy-react](https://github.com/christianalfoni/formsy-react).

## Installation
[![npm package](https://nodei.co/npm/@cat-react/form.png?compact=true)](https://www.npmjs.com/package/@cat-react/form)
- Install the dependency `@cat-react/form` <br/>
  (e.g. with `yarn add @cat-react/form` or `npm install @cat-react/form --save`)
- Import the Components with `import {Form, Input} from '@cat-react/form';`

## Getting Started
| [API Documentation](/docs/api.md) | [Examples](https://cat-react.github.io/form/) |
|---|---|

Are you looking for a simple way to create validated forms with React?

Congratulations! Your search is over, because **`@cat-react/form`** offers you a simple way to create either frontend- or backend-validated forms. Validations can either be processed synchronous or asynchronous and the state of the form is being refreshed in real time.

Take a look at the <a href="https://cat-react.github.io/form/">examples</a> to find out how to create the form of your desire.

```jsx
<Form>
    <MyInput name="email"
             validations={{
                 isEmail: true,
                 isRequired: true
             }}/>
    <MyInput name="email_confirm"
             validations={{
                 isRequired: true,
                 equalsField: 'email'
             }}
             messages={{
                 isRequired: 'Please confirm your email address.',
                 equalsField: 'The email addresses do not match each other.'
             }}/>
</Form>
```

## Example Custom TextInput
Here you can see an example of an custom TextInput which shows how you can implement your own Inputs:
```jsx
import React from 'react';
import {Input} from '@cat-react/form'

@Input
export default class BasicInput extends React.Component {
    onChange(event) {
        this.props.setValue(event.target.value);
    }

    getClassName() {
        let className = 'form-control';
        if (!this.props.isPristine()) {
            if (this.props.isValid()) {
                const isWarning = this.props.getMessages().length > 0;
                if (isWarning) {
                    className += ' warning';
                }
            } else {
                className += ' error';
            }
        }
        return className;
    }

    renderMessages() {
        let messages = [];
        if (!this.props.isPristine()) {
            messages = this.props.getMessages();
        }

        if (!messages || messages.length <= 0) {
            return null;
        }

        let className = 'errorText';
        if (this.props.isValid()) {
            className = 'warningText';
        }

        return <ul className={className}>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label} {this.props.isRequired() ? '*' : null}</label>
                <input type={this.props.type}
                       className={this.getClassName()}
                       id={this.props.name}
                       aria-describedby={this.props.name}
                       placeholder={this.props.placeholder}
                       value={this.props.getValue()}
                       onChange={this.onChange.bind(this)}
                       onBlur={this.props.touch}/>
                {this.renderMessages()}
            </div>
        );
    }
}
```

## Contribution
The project requires at least the latest stable version of node and npm. You also need to have yarn installed globally.

Two simple steps to get the things running on your local machine:
- Fork the repo
- Execute `yarn`

You can run the examples with `yarn run examples` and the tests with `yarn test`.

### How to build a release

- update the `CHANGELOG.md` with all changes regarding the new release
- update the release version in the `package.json`
- push the changes
- build the project locally with `npm run build`
- `cd` into the `dist` folder and run `npm publish --access public`
- draft a new release at `Github` with the contents of the `CHANGELOG.md` file

## License
[MIT License](/LICENSE)

Copyright (c) 2017 Catalysts GmbH
