import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Form from './Form';

const CHANGE_VALUE_TIMEOUT = 350;

export default function (WrappedComponent) {
    class Input extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.changeValueTimer = null;
            this.dependencies = [];
            for (let dependency of props.dependencies) {
                this.addDependency(dependency);
            }

            this.state = {
                value: props.value,
                pristine: true,
                valid: false,
                messages: []
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
            return this.state.valid;
        }

        getValue() {
            return this.state.value;
        }

        setValue(value, suppressTouch) {
            clearTimeout(this.changeValueTimer);
            this.context._reactForm.addToValidationQueue(this);
            this.setState({
                value: value
            }, () => {
                this.changeValueTimer = setTimeout(() => {
                    if (!suppressTouch) {
                        this.touch();
                    }
                    this.context._reactForm.startValidation();
                }, CHANGE_VALUE_TIMEOUT);
            });
        }

        getMessages() {
            return this.state.messages;
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
            let messages = [];

            let allValid = true;
            for (let ruleName in this.props.validations) {
                const ruleConditions = this.props.validations[ruleName];
                if (ruleConditions) { // only execute validations if the ruleConditions are valid
                    const valid = await this.runValidationRule(ruleName);
                    if (!valid) {
                        const isWarning = this.props.warnings.indexOf(ruleName) > -1;
                        if (!isWarning) {
                            allValid = false;
                        }

                        if (this.props.messages && this.props.messages[ruleName]) {
                            // TODO: add support for arguments, maybe even different errormessages per validator?
                            messages.push(this.props.messages[ruleName]);
                        }
                    }
                }
            }

            this.setState({
                valid: allValid,
                messages: messages
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
            } else if (ruleConditions instanceof Array) {
                valid = await ruleConditions[0](this.context._reactForm.getValues(), this.getValue(), ruleConditions[1]);
            }

            return valid;
        }

        reset() {
            this.setValue(this.props.value, true);
            this.setState({
                pristine: true
            });
        }

        render() {
            const props = {
                ...this.props,
                isRequired: this.isRequired,
                isPristine: this.isPristine,
                isValid: this.isValid,
                getValue: this.getValue,
                setValue: this.setValue,
                getMessages: this.getMessages,
                touch: this.touch
            };

            return (
                <WrappedComponent {...props}/>
            );
        }
    }
    Input.propTypes = {
        value: PropTypes.any,
        name: PropTypes.string.isRequired,
        validations: PropTypes.object,
        warnings: PropTypes.arrayOf(PropTypes.string),
        messages: PropTypes.object,
        dependencies: PropTypes.arrayOf(PropTypes.string)
    };
    Input.defaultProps = {
        warnings: [],
        dependencies: []
    };
    Input.contextTypes = {
        _reactForm: PropTypes.object
    };
    return Input;
}
