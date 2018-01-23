import classNames from 'classnames';
import React from 'react';

import styles from './styles.scss';

export interface Props {
    autoFocus?: boolean;
    name?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    value?: string;
    isValid?: boolean;
    validate?: () => boolean;
    onBlur?: (event: React.FormEvent<HTMLTextAreaElement>, state: any) => void;
}

export interface State {
    value?: string;
    isValid: boolean;
}

class TextArea extends React.PureComponent<Props, State> {
    public static displayName = 'TextArea';

    constructor(props: Props) {
        super(props);
        this.state = {
            isValid: props.isValid || false,
            value: props.value || ''
        };
    }

    public handleBlur = (event: React.FormEvent<HTMLTextAreaElement>) => {
        if (this.props.onBlur) {
            this.props.onBlur(event, this.state);
        }
    }

    public handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({
            isValid: this.props.validate(),
            value: event.currentTarget.value
        });
    }

    public render() {
        const { autoFocus, name, placeholder, required } = this.props,
            cssClass = classNames(
                styles['form-control'], {
                    error: !this.state.isValid
                }
            );

        return (
            <textarea
                autoFocus={ autoFocus }
                className={ cssClass }
                name={ name }
                placeholder={ placeholder }
                required={ required }
                onBlur={ this.handleBlur }
                onChange={ this.handleChange }
                >{ this.state.value }</textarea>
        );
    }
}

export default TextArea;
