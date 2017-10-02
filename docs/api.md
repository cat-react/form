# API Documentation
Welcome to the `@cat-react/form` API documentation.

## Table of Contents
- [Form](#form) (Main Component)
    - [addValidationRule](#addvalidationrule)
    - [onSubmit](#onsubmitvalues-valid)
    - [onValidSubmit](#onvalidsubmitvalues)
    - [onInvalidSubmit](#oninvalidsubmitvalues)
    - [onValidChanged](#onvalidchangedvalid-values-isvalidating)
    - [onValid](#onvalidvalues)
    - [onInvalid](#oninvalidvalues-isvalidating)
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

### addValidationRule
A static method to add global validation rules.

// TODO

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

---

#### messages
The (error-)messages of the validation rules which fail. Also being passed down for validationRules marked as a warning.

---

#### dependencies
The manually added dependencies to other fields.

---

### Passes Down
Props which are passed down to your custom input which uses the HOC. Additonally all props which are being passed to the HOC will also be passed down.

#### isRequired

---

#### isPristine

---

#### isValid

---

#### getValue

---

#### setValue

---

#### getMessages

---

#### touch

---

## Validation Rules
StandardSet of validation rules which ships with `@cat-react/form`.

### matchRegexp

---

### isRequired

---

### isEmail

---

### minLength

---

### maxLength

---

### equals

---

### equalsField

---

### equalsFields

---

### isNumber

---
