# API Documentation
Welcome to the `@cat-react/form` API documentation.

## Table of Contents
- [Form](#form) (Main Component)
    - [onSubmit](#onsubmit)
    - [onValidSubmit](#onvalidsubmit)
    - [onInvalidSubmit](#oninvalidsubmit)
    - [onValidChanged](#onvalidchanged)
    - [onValid](#onvalid)
    - [onInvalid](#oninvalid)
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

### onSubmit(values, valid)
Method which is being called when a submit event is fired on the form, regardless of whether the form is valid or invalid.

#### Params
<table class="table table-bordered table-striped">
    <tbody>
        <tr>
          <td><b>values</b></td>
          <td>All form values in form of a Map<fieldName, value>.</td>
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
          <td>All form values in form of a Map<fieldName, value>.</td>
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
          <td>All form values in form of a Map<fieldName, value>.</td>
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
          <td>All form values in form of a Map<fieldName, value>.</td>
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

### onValid

### onInvalid

## Input
Higher-Order Component for building input fields.

### Retrieves
Props which should be passed down to the HOC.

#### value

#### name

#### validations

#### warnings

#### messages

#### dependencies

### Passes Down
Props which are passed down to your custom input which uses the HOC.

#### isRequired

#### isPristine

#### isValid

#### getValue

#### setValue

#### getMessages

#### touch

## Validation Rules
StandardSet of validation rules which ships with `@cat-react/form`.

### matchRegexp

### isRequired

### isEmail

### minLength

### maxLength

### equals

### equalsField

### equalsFields

### isNumber
