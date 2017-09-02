import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import Form from './Form';

export default function (WrappedComponent) {
    class Input extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.dependencies = [];
            for (let dependency of props.dependencies) {
                this.addDependency(dependency);
            }

            this.state = {
                value: props.value,
                pristine: true,
                valid: false,
                errors: []
            };

            autoBind(this);

            for (let validation in props.validations) {
                const validationRule = Form.validationRules[validation];
                if (validationRule && validationRule.createsDependencies) {
                    if (!Array.isArray(props.validations[validation])) {
                        this.addDependency(props.validations[validation]);
                    } else {
                        for (let dependency of props.validations[validation]) {
                            this.addDependency(dependency);
                        }
                    }
                }
            }
        }

        componentWillMount() {
            this.context._reactForm.attach(this);
        }

        componentWillUnmount() {
            this.context._reactForm.detach(this);
        }

        addDependency(dependency) {
            if (dependency === this.getName()) {
                throw new Error('An input cannot have itself as an dependency. Check your validation rules.')
            }

            if (this.dependencies.indexOf(dependency) < 0) {
                this.dependencies.push(dependency);
            }
        }

        getName() {
            return this.props.name;
        }

        hasName(name) {
            return this.props.name === name;
        }

        isRequired() {
            return !!(this.props.validations && this.props.validations.isRequired);
        }

        isPristine() {
            return this.state.pristine;
        }

        isValid() {
            return this.state.valid && this.state.errors.length < 1;
        }

        getValue() {
            return this.state.value;
        }

        setValue(value) {
            // TODO: check if needed, maybe instead just wait 500ms for validation (and cancel if value gets changed before)
            const isTouchedOnChange = this.context._reactForm.enableTouchedOnChange;
            if (isTouchedOnChange && this.isPristine()) {
                this.setState({
                    pristine: false
                });
            }

            this.setState({
                value: value
            }, () => {
                this.context._reactForm.validate(this);
            });
        }

        getErrorMessages() {
            return this.state.errors;
        }

        touch() {
            if (this.isPristine()) {
                this.setState({
                    pristine: false
                });
            }
        }

        async validate() {
            return new Promise((resolve) => {
                this.runValidationRules(resolve);
            });
        }

        async runValidationRules(resolve) {
            let errors = [];

            let allValid = true;
            for (let ruleName in this.props.validations) {
                const ruleConditions = this.props.validations[ruleName];
                if (ruleConditions) { // only execute validations if the ruleConditions are valid
                    const valid = await this.runValidationRule(ruleName);
                    if (!valid) {
                        allValid = false;

                        if (this.props.validationErrors && this.props.validationErrors[ruleName]) {
                            // TODO: add support for arguments, maybe even different errormessages per validator?
                            errors.push(this.props.validationErrors[ruleName]);
                        }
                    }
                }
            }

            this.setState({
                valid: allValid,
                errors: errors
            }, () => {
                resolve(allValid);
            });
        }

        async runValidationRule(ruleName) {
            const ruleConditions = this.props.validations[ruleName];

            let valid = true;
            if (Form.validationRules[ruleName]) {
                valid = await Form.validationRules[ruleName](this.context._reactForm.getValues(), this.getValue(), ruleConditions);
            } else if (typeof ruleConditions === 'function') {
                valid = await ruleConditions(this.context._reactForm.getValues(), this.getValue());
            }

            return valid;
        }

        render() {
            const props = {
                isRequired: this.isRequired,
                isPristine: this.isPristine,
                isValid: this.isValid,
                getValue: this.getValue,
                setValue: this.setValue,
                getErrorMessages: this.getErrorMessages,
                onBlur: this.touch,
                ...this.props
            };

            return (
                <WrappedComponent {...props}/>
            );
        }
    }
    Input.propTypes = {
        name: PropTypes.string.isRequired,
        validations: PropTypes.object,
        validationErrors: PropTypes.object,
        dependencies: PropTypes.arrayOf(PropTypes.string)
    };
    Input.defaultProps = {
        dependencies: []
    };
    Input.contextTypes = {
        _reactForm: PropTypes.object
    };
    return Input;
}
