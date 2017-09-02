import React from 'react';
import Input from '@cat-react/form/Input'

@Input
export default class BasicInput extends React.Component {
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

        return <ul className="errorText">{errorMessages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
    }

    render() {
        let className = 'form-control';
        if (!this.props.isPristine()) {
            className += this.props.isValid() ? '' : ' error';
        }

        // TODO: remove onBlur
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label} {this.props.isRequired() ? '*' : null}</label>
                <input type={this.props.type}
                       className={className}
                       id={this.props.name}
                       aria-describedby={this.props.name}
                       placeholder={this.props.placeholder}
                       value={this.props.getValue()}
                       onChange={this.onChange.bind(this)}
                       onBlur={this.props.onBlur} />
                {this.renderErrors()}
            </div>
        );
    }
}
