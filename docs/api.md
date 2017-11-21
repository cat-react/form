# API Documentation
Welcome to the `@cat-react/form` API documentation.

## Table of Contents
- [Form](#form) (Main Component)
    - [addValidationRule](#addvalidationrulename-func-createsdependencies)
    - [onSubmit](#onsubmitvalues-valid)
    - [onValidSubmit](#onvalidsubmitvalues)
    - [onInvalidSubmit](#oninvalidsubmitvalues)
    - [onValidChanged](#onvalidchangedvalid-values-isvalidating)
    - [onValid](#onvalidvalues)
    - [onInvalid](#oninvalidvalues-isvalidating)
    - [className](#classname)
    - [autoComplete](#autocomplete)
- [Input](#input) (HOC for building input fields)
    - Retrieves
        - [value](#value)
        - [name](#name)
        - [validations](#validations)
        - [warnings](#warnings)
        - [messages](#messages)
        - [dependencies](#dependencies)
    - Passes Down
        - [isRequired](#isrequired)
        - [isPristine](#ispristine)
        - [isValid](#isvalid)
        - [getValue](#getvalue)
        - [setValue](#setvalue)
        - [getMessages](#getmessages)
        - [touch](#touch)
- [Validation Rules](#validation-rules) (StandardSet shipping with `@cat-react/form`)
    - [matchRegexp](#matchregexp)
    - [isRequired](#isrequired)
    - [isEmail](#isemail)
    - [minLength](#minlength)
    - [maxLength](#maxlength)
    - [equals](#equals)
    - [equalsField](#equalsfield)
    - [equalsFields](#equalsfields)
    - [isNumber](#isnumber)

---

## Form
Main Component for building a form.

```js
import {Form} from '@cat-react/form';
```

### addValidationRule(name, func, createsDependencies)
A `static` method to add global validation rules.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>name</b></td>
          <td>Name of the validation rule.</td>
        </tr>
        <tr>
          <td><b>func</b></td>
          <td>Function containing the validation logic of the rule.</td>
        </tr>
        <tr>
          <td><b>createsDependencies</b></td>
          <td>Indicates if the rule should create dependencies to the fields which are passed as rule conditions.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
import {Form} from '@cat-react/form';

Form.addValidationRule('equalsUpperCase', (values, value, otherFieldName) {
    return values[otherFieldName].toUpperCase() === value;
}, true);

render() {
    <Form ...>    
        <BasicInput name="field1"
                    value="a"
                    .../>
        <BasicInput name="field2"
                    value="A" //valid
                    validations={{
                        equalsUpperCase: 'field1'
                    }}/>
        <BasicInput name="field2"
                    value="a" //invalid
                    validations={{
                        equalsUpperCase: 'field1'
                    }}/>
    </Form>
}
```
---

### onSubmit(values, valid)
Method which is being called when a submit event is fired on the form, regardless of whether the form is valid or invalid.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>values</b></td>
          <td>All form values as a Map<fieldName, value>.</td>
        </tr>
        <tr>
          <td><b>valid</b></td>
          <td>Boolean which indicates if the form is valid or invalid.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
submit(values, valid) {
    console.log(values); // { field1: "a", field2: "b" }
    console.log(valid); // true or false
}

render() {
    <Form onSubmit={this.submit}>    
        <BasicInput name="field1"
                    value="a"
                    .../>
        <BasicInput name="field2"
                    value="b"
                    .../>
    </Form>
}
```
---

### onValidSubmit(values)
Method which is being called when a submit event is fired on the **valid** form.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>values</b></td>
          <td>All form values as a Map<fieldName, value>.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
validSubmit(values) {
    ...
}

render() {
    <Form onValidSubmit={this.validSubmit}>    
        ...
    </Form>
}
```
---

### onInvalidSubmit(values)
Method which is being called when a submit event is fired on the **invalid** form.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>values</b></td>
          <td>All form values as a Map<fieldName, value>.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
invalidSubmit(values) {
    ...
}

render() {
    <Form onInvalidSubmit={this.invalidSubmit}>    
        ...
    </Form>
}
```
---

### onValidChanged(valid, values, isValidating)
Method which is being called when the form state changes. As an example you can use it to disable the submit button when the form is invalid.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>valid</b></td>
          <td>Boolean which indicates if the form is valid or invalid.</td>
        </tr>
        <tr>
          <td><b>values</b></td>
          <td>All form values as a Map<fieldName, value>.</td>
        </tr>
        <tr>
          <td><b>isValidating</b></td>
          <td>Boolean which indicates if the form is validating or already finished with the validation. Always false if the state is valid.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
constructor(props) {
    super(props);
    this.validChanged = this.validChanged.bind(this);
    this.state = {
        canSubmit: false
    };
}

validChanged(valid) {
    this.setState({
        canSubmit: valid
    });
}

render() {
    <Form onValidChanged={this.validChanged}>    
        ...
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
    </Form>
}
```
---

### onValid(values)
Method which is being called when the form state changes to valid.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>values</b></td>
          <td>All form values as a Map<fieldName, value>.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
valid(values) {
    ...
}

render() {
    <Form onValid={this.valid}>    
        ...
    </Form>
}
```
---

### onInvalid(values, isValidating)
Method which is being called when the form state changes to invalid.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>values</b></td>
          <td>All form values in as a Map<fieldName, value>.</td>
        </tr>
        <tr>
          <td><b>isValidating</b></td>
          <td>Boolean which indicates if the form is validating or already finished with the validation.</td>
        </tr>
    </tbody>
</table>

#### Example
```jsx
inValid(values, isValidating) {
    ...
}

render() {
    <Form onInvalid={this.inValid}>    
        ...
    </Form>
}
```
---

### className
CSS ClassName which will be passed directly to the <form> html element.

For example:
```jsx
<Form className="test" />
```

will result in:

```jsx
<form class="test" />
```

---

### autoComplete
AutoComplete prop which will be passed directly to the <form> html element.

For example:
```jsx
<Form autoComplete="off" />
```

will result in:

```jsx
<form autocomplete="off" />
```

---

## Input
Higher-Order Component for building input fields.

Example BasicInput using the HOC with an decorator:
```jsx
import {Input} from '@cat-react/form';

@Input
class BasicInput extends React.Component {
    constructor(props) {
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        // setValue method passed down from the HOC, used to update its value
        this.props.setValue(event.target.value);
    }

    render() {
        return (
            <input type="text"
                   value={this.props.getValue()}
                   onChange={this.onChange}/>
        );
    }
}
```

All validation rules run against the value of the HOC which is being set with the setValue prop.

### Retrieves
Props which should be passed down to the HOC.

#### value
Value of the Input.

Can also be used as a static default value. The HOC has its own state of the value (for validation purpose) which means you can let it take responsibility of it and retrieve it with the submit events.

```jsx
<BasicInput value="abc"/>
<BasicInput value={10}/>
```
---

#### name
Name of the Input. Must be unique, per form should only be one input field with a specific name.

```jsx
<BasicInput name="field1"/>
```
---

#### validations
The validations rules which have to succeed in order to successfully submit the form. (If they are not marked as a warning)

You can either use global rules or custom inline rules.

```jsx
<BasicInput name="password"
            validations={{
                isRequired: true,
                customRule: (values, value) => {
                    return (value !== 'password');
                }
            }}/>
<BasicInput name="confirm_password"
            validations={{
                isRequired: true,
                equalsField: 'password'
            }}/>
```
---

#### warnings
The validation rules which should be treated as a warning only. (If they fail, the form is valid either)

```jsx
<BasicInput name="confirm_password"
            validations={{
                isRequired: true,
                equalsField: 'password'
            }}
            warnings={['isRequired']}/>
```
---

#### messages
The (error-)messages of the validation rules which fail. Also being passed down for validationRules marked as a warning.

```jsx
<BasicInput name="password"
            validations={{
                isRequired: true,
                customRule: (values, value) => {
                    return (value !== 'password');
                }
            }}
            messages={{
                isRequired: 'You have to fill the password field.',
                customRule: '"password" is not a valid password.'
            }}/>
```
---

#### dependencies
The manually added dependencies to other fields. The field will also be revalidated when one the dependency-fields changes.

Especially necessary if you use custom rules which create dependencies to other fields and do not autogenerate them.

```jsx
<BasicInput name="password" />
<BasicInput name="confirm_password"
            validations={{
                isRequired: true,
                equalsPassword: (values, value) => {
                    return values.password === value;
                }
            }}
            dependencies={['password']}/> // if password is being changed you want that confirm_password will also be revalidated
```

**Warning**: You don't have to define such dependencies for global rules like `equalsField`. Those global rules create the dependencies automatically.

---

### Passes Down
Props which are passed down to your custom input which uses the HOC. Additonally all props which are being passed to the HOC will also be passed down.

#### isRequired
Method which tells the wrapped component if the field is required.

**Example**: you can use it to show a (*) sign for required fields beneath the label
```jsx
render() {
    let requiredSign = '';
    if (this.props.isRequired()) {
        requiredSign = ' *';
    }

    return (
        <div>
            <label>Label{requiredSign}</label>
            <input type="text" ... />
        </div>
    )
}
```
---

#### isPristine
Tells the wrapped component if the field is pristine. (wasn't touched yet)

**Example**: only show messages if field is not pristine.
```jsx
renderMessages() {
    let messages = [];
    if (!this.props.isPristine()) {
        messages = this.props.getMessages();
    }

    if (!messages || messages.length <= 0) {
        return null;
    }

    return <ul>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
}
```
---

#### isValid
Tells the wrapped component if (the value of) the field is valid.

**Example**: style messages differently if there are warnings
```jsx
renderMessages() {
    let messages = this.props.getMessages();

    if (!messages || messages.length <= 0) {
        return null;
    }

    let className = 'errorText';
    if (this.props.isValid()) {
        className = 'warningText';
    }

    return <ul>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
}
```
---

#### getValue
Returns the current value of the field.

```jsx
render() {
    return <input value={this.props.getValue()} ... />;
}
```
---

#### setValue
Sets the value of the field. Revalidation is being done afterwards.

```jsx
import {Input} from '@cat-react/form';

@Input
class BasicInput extends React.Component {
    constructor(props) {
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.setValue(event.target.value);
    }

    render() {
        return (
            <input onChange={this.onChange} ... />
        );
    }
}
```
---

#### getMessages
Returns the error messages. If the field is valid, but also has messages, you can assume it's a warning, not an error.

```jsx
renderMessages() {
    let messages = this.props.getMessages();

    if (!messages || messages.length <= 0) {
        return null;
    }

    return <ul>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
}
```
---

#### touch
Touches the component. Helpful if you want to show error messages only on touched input errors, just trigger it `onBlur`.

```jsx
render() {
    return <input onBlur={this.props.touch} ... />;
}
```
---

## Validation Rules
StandardSet of validation rules which ships with `@cat-react/form`.

### matchRegexp
Field has to match the given regex.

```jsx
<BasicInput validations={{
                matchRegexp: /ab*c/
            }}/>
```
---

### isRequired
Field is required - the value must not be undefined, null, empty.

```jsx
<BasicInput validations={{
                isRequired: true
            }}/>
```
---

### isEmail
Field value has to be a valid email address.

```jsx
<BasicInput validations={{
                isEmail: true
            }}/>
```
---

### minLength
The minimum length of the value has to be the given param.

```jsx
<BasicInput validations={{
                minLength: 3
            }}/>
```
---

### maxLength
The maximum length of the value has to be the given param.

```jsx
<BasicInput validations={{
                maxLength: 3
            }}/>
```
---

### equals
The value has to equal the given param.

```jsx
<BasicInput validations={{
                equals: 'test'
            }}/>
```
---

### equalsField
The value has to equal the value of the field with the given name.

**Creates dependencies.**

```jsx
<BasicInput validations={{
                equalsField: 'password' // fieldName: password
            }}/>
```
---

### equalsFields
The value has to equal the values of the fields with the given names.

**Creates dependencies.**

```jsx
<BasicInput validations={{
                equalsFields: ['password1', 'password2'] // fieldName: password1, password2
            }}/>
```
---

### isNumber
The value has to be a number.

```jsx
<BasicInput validations={{
                isNumber: true
            }}/>
```
---
