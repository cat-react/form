import React from "react";
import PropTypes from "prop-types";
import autoBind from "auto-bind";
import validationRules from "./validationRules";

export default class Form extends React.Component {
    static validationRules = Object.assign({}, validationRules);

    static addValidationRule(name, func, createsDependencies) {
        validationRules[name] = func;
        validationRules[name].createsDependencies = createsDependencies;
    }

    constructor(props) {
        super(props);

        this.initialized = false;
        this.inputs = [];
        this.valid = false;
        this.validatingInputs = [];

        autoBind(this);
    }

    getChildContext() {
        return {
            _reactForm: {
                enableTouchedOnChange: this.props.enableTouchedOnChange,
                attach: this.attachInput,
                detach: this.detachInput,
                validate: this.validateInput,
                getValues: this.getValues
            }
        };
    }

    componentDidMount() {
        this.initialized = true;
        this.validate();
    }

    componentWillUnmount() {
        this.initialized = false;
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(this.getValues());
        }

        if (this.isValid()) {
            this.onValidSubmit();
        } else {
            this.onInvalidSubmit();
        }

        return false;
    }

    onValidSubmit() {
        if (this.props.onValidSubmit) {
            this.props.onValidSubmit(this.getValues());
        }
    }

    onInvalidSubmit() {
        if (this.props.onInvalidSubmit) {
            this.props.onInvalidSubmit(this.getValues());
        }
    }

    isValidating() {
        return this.validatingInputs.length > 0;
    }

    isValid() {
        return this.valid && !this.isValidating();
    }

    attachInput(newInput) {
        if (this.inputs.some((input) => input.hasName(newInput.getName()))) {
            throw new Error(`There already exists an input with the name "${newInput.getName()}"`);
        }
        this.inputs.push(newInput);
        if (this.initialized) {
            this.validateInput(newInput);
        } else {
            this.addValidatingInput(newInput);
        }
    }

    detachInput(input) {
        this.inputs.splice(this.inputs.indexOf(input), 1);
        this.validate();
    }

    addValidatingInput(input) {
        if (this.validatingInputs.indexOf(input.getName()) > -1) {
            return;
        }

        this.validatingInputs.push(input.getName());
        const dependentInputs = this.inputs.filter((depInput) => depInput.dependencies.indexOf(input.getName()) > -1);
        for (let dependency of dependentInputs) {
            this.addValidatingInput(dependency);
        }
        this.valid = false;
    }

    validate() {
        for (let input of this.inputs) {
            this.addValidatingInput(input);
        }
        this.onInvalid();

        this.startValidation();
    }

    validateInput(input) {
        this.addValidatingInput(input);
        this.onInvalid();

        this.startValidation();
    }

    async startValidation() {
        if (this.validatingInputs.length > 0) {
            const validatingInputName = this.validatingInputs.splice(0, 1)[0];
            const input = this.inputs.find((input) => input.hasName(validatingInputName));
            if (input) {
                await input.validate();
            }
            this.startValidation();
        } else {
            let allValid = !this.inputs.some((input) => !input.isValid());
            this.validationFinished(allValid);
        }
    }

    validationFinished(valid) {
        if (!this.isValidating()) {
            this.valid = valid;
            if (valid) {
                this.onValid();
            } else {
                this.onInvalid();
            }
        }
    }

    onValid() {
        if (this.props.onValid) {
            this.props.onValid(this.getValues());
        }
    }

    onInvalid() {
        if (this.props.onInvalid) {
            this.props.onInvalid(this.getValues(), this.isValidating());
        }
    }

    getValues() {
        let values = {};

        for (let input of this.inputs) {
            values[input.getName()] = input.getValue();
        }

        return values;
    }

    render() {
        const {children, className} = this.props;

        const formProps = {
            className
        };

        return (
            <form {...formProps} onSubmit={this.onSubmit}>
                {children}
            </form>
        );
    }
}
Form.propTypes = {
    onSubmit: PropTypes.func,
    onValidSubmit: PropTypes.func,
    onInvalidSubmit: PropTypes.func,
    onValid: PropTypes.func,
    onInvalid: PropTypes.func,
    enableTouchedOnChange: PropTypes.bool
};
Form.defaultProps = {
    enableTouchedOnChange: false
};
Form.childContextTypes = {
    _reactForm: PropTypes.object
};
