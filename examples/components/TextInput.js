import React from 'react';
import Input from '@cat-react/form/Input'

@Input
export default class TextInput extends React.Component {
    onChange(event) {
        this.props.setValue(event.target.value);
    }

    renderErrors() {
        let errorMessages = [];
        if (!this.props.isPristine()) {
            errorMessages = this.props.getErrorMessages();
        }

        if (!errorMessages || errorMessages.length <= 0) {
            return null;
        }

        return <ul>{errorMessages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
    }

    render() {
        let className = '';
        if (!this.props.isPristine()) {
            className = this.props.isValid() ? null : 'error';
        }

        // TODO: remove onBlur
        return (
            <label>
                {this.props.label} {this.props.isRequired() ? '*' : null}
                <input className={className}
                       type="text"
                       value={this.props.getValue()}
                       onChange={this.onChange.bind(this)}
                       onBlur={this.props.onBlur}/>
                {this.renderErrors()}
            </label>
        );
    }
}
