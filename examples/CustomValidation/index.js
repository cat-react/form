import React from 'react';
import {Form} from '@cat-react/form';
import BasicInput from '../components/BasicInput';
import autoBind from 'react-autobind';

export default class extends React.Component {
    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            values: null,
            canSubmit: false
        };

        Form.addValidationRule('isOtherFieldPlusTen', (values, value, otherFieldName) => {
            if (values && values[otherFieldName]) {
                const otherValue = parseInt(values[otherFieldName]);
                return (parseInt(value) === otherValue + 10);
            }
            return false;
        }, true); //last parameter means, that it creates dependencies to other fields
    }

    componentDidMount() {
        if (this.form) {
            this.form.touch();
        }
    }

    onValidSubmit(values) {
        this.setState({
            values: values
        });
    }

    onValid() {
        this.setState({
            canSubmit: true
        });
    }

    onInvalid() {
        this.setState({
            canSubmit: false
        });
    }

    render() {
        return (
            <Form onValid={this.onValid}
                  onInvalid={this.onInvalid}
                  onValidSubmit={this.onValidSubmit}
                  ref={(form) => { this.form = form; }}>
                <h1>Custom Validation Rules</h1>
                <span>Inline Validation Rule:</span>
                <BasicInput label="3 + 7 ="
                            name="ten"
                            type="number"
                            value=""
                            validations={{isTen: (values, value) => parseInt(value) === 10}}
                            messages={{
                                isTen: 'You have to enter the correct value.'
                            }}
                            placeholder=""/>
                <span>Global Validation Rule:</span>
                <BasicInput label="Value of the Field above + 10 ="
                            name="twenty"
                            type="number"
                            value=""
                            validations={{isOtherFieldPlusTen: 'ten'}}
                            messages={{
                                isOtherFieldPlusTen: 'You have to add 10 to the value from the field above.'
                            }}
                            placeholder=""/>
                <button type="submit"
                        className="btn btn-primary"
                        disabled={!this.state.canSubmit}>Submit</button>
                <div className="alert alert-light" role="alert">
                    Valid Submitted Values: {JSON.stringify(this.state.values)}
                </div>
            </Form>
        );
    };
}
