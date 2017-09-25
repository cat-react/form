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

### onSubmit

### onValidSubmit

### onInvalidSubmit

### onValidChanged

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
