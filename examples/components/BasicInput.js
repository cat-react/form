import React from 'react';
import Input from '@cat-react/form/Input'

@Input
export default class BasicInput extends React.Component {
    onChange(event) {
        this.props.setValue(event.target.value);
    }

    getClassName() {
        let className = 'form-control';
        if (!this.props.isPristine()) {
            if (this.props.isValid()) {
                const isWarning = this.props.getMessages().length > 0;
                if (isWarning) {
                    className += ' warning';
                }
            } else {
                className += ' error';
            }
        }
        return className;
    }

    renderMessages() {
        let messages = [];
        if (!this.props.isPristine()) {
            messages = this.props.getMessages();
        }

        if (!messages || messages.length <= 0) {
            return null;
        }

        let className = 'errorText';
        if (this.props.isValid()) {
            className = 'warningText';
        }

        return <ul className={className}>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label} {this.props.isRequired() ? '*' : null}</label>
                <input type={this.props.type}
                       className={this.getClassName()}
                       id={this.props.name}
                       aria-describedby={this.props.name}
                       placeholder={this.props.placeholder}
                       value={this.props.getValue()}
                       onChange={this.onChange.bind(this)}
                       onBlur={this.props.touch}/>
                {this.renderMessages()}
            </div>
        );
    }
}
