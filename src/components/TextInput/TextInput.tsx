import classNames from 'classnames';
import React from 'react';

import { validate } from '../../shared/helpers';

import styles from './styles.scss';

export interface Props {
    /**
     * The name of the text input control.
     */
    name: string;

    /**
     * When true, it specifies that an <input> element should automatically get focus when the page loads.
     */
    autoFocus?: boolean;

    /**
     * The message to display if the input value is invalid.
     */
    message?: string;

    /**
     * Specifies a regular expression that the control's value is checked against
     */
    pattern?: string;

    /**
     * Specifies that the control must have a value.  Shorthand for a "^[\S]+$" pattern.
     */
    required?: boolean;

    /**
     * Specifies a short hint that describes the expected value of the text input control.
     */
    placeholder?: string;

    /**
     * Specifies the value of the text input control.
     */
    value?: string;

    /**
     * Event that fires the moment that the control loses focus
     */
    onBlur?: (name: string, valid: boolean, value: any) => void;
}

export interface State {
    /**
     * When true, specifies that the input control has focus
     */
    isFocused?: boolean;

    /**
     * When true, specifies that the value of the input control passes all validation checks
     */
    isValid?: boolean;

    /**
     * Specifies the current value of the text input control.
     */
    value?: string;
}

class TextInput extends React.PureComponent<Props, State> {
    public static displayName = 'TextInput';

    constructor(props: Props) {
        super(props);
        this.state = {
            isFocused: false,
            isValid: true,
            value: props.value || ''
        };
    }

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const state = {...this.state};

        state.isValid = this.isValid();
        state.value = event.currentTarget.value;

        this.setState(state);
    }

    public handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        const props = {...this.props},
            state = {...this.state};

        event.persist();
        state.isFocused = false;
        state.isValid = event.currentTarget.validity.valid && this.isValid();
        state.value = event.currentTarget.value;

        this.setState(state, () => {
            if (props.onBlur) {
                props.onBlur(props.name, state.isValid, state.value);
            }
        });
    }

    public handleFocus = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            isFocused: true
        });
    }

    public isValid() {
        const { required, pattern } = this.props,
            regExp = new RegExp(`^${pattern}$`),
            state = this.state,
            requiredValid = validate.isNotNullOrEmpty(required) && required
                ? (state.value && state.value.length > 0)
                : true,
            patternValid = validate.isNotNullOrEmpty(pattern)
                ? regExp.test(state.value)
                : true,
            isValid = requiredValid && patternValid;

        return isValid;
    }

    public render() {
        const { autoFocus, message, name, required } = this.props,
            cssClass = classNames(
                styles['text-input'],
                (false === this.state.isValid) ? styles['error'] : ''
            ),
            errMessage = this.state.isValid
                ? null
                : <p className={ styles['error-message'] }>{ message }</p>,
            placeholder = (true === this.state.isFocused)
                ? null
                : this.props.placeholder,
            label = (true === this.state.isFocused || true === validate.isNotNullOrEmpty(this.state.value))
                ? <p className={ styles['field-label'] }>{ this.props.placeholder }</p>
                : null;

        return (
            <React.Fragment>
                { label }
                <input
                    autoFocus={ autoFocus }
                    className={ cssClass }
                    name={ name }
                    placeholder={ placeholder }
                    required={ required }
                    type="text"
                    value={ this.state.value }
                    onBlur={ this.handleBlur }
                    onChange={ this.handleChange }
                    onFocus={ this.handleFocus }
                    onKeyUp={ this.handleChange }
                />
                { errMessage }
            </React.Fragment>
        );
    }
}

export default TextInput;
