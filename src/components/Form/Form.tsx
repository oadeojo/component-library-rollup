import classnames from 'classnames';
import React from 'react';

import { EventResult } from '../../shared/interfaces/EventResult';
import styles from './styles.scss';

export interface Props {
    children?: Array<React.ReactElement<any>> | React.ReactElement<any> | string | number;
    className?: string;
    value?: string;

    onChange?: (result: EventResult) => void;
    onSubmit?: (result: EventResult) => void;
}

export interface State {
    fields?: any;
    isFormDirty?: boolean;
    isFormValid?: boolean;
}

class Form extends React.Component<Props, State> {
    public static displayName = 'Form';

    constructor(props: Props) {
        super(props);

        const state: State = {
            fields: {}
        };

        React.Children.forEach(props.children, (child: React.ReactElement<any>) => {
            if (child.props.name) {
                state.fields[child.props.name] = {
                    errorMessage: child.props.errorMessage,
                    initialValue: child.props.value || '',
                    isValid: true,
                    value: child.props.value || ''
                };
            }
        });
        state.isFormDirty = this.isFormDirty(state);
        state.isFormValid = this.isFormValid(state);
        this.state = state;
    }

    public isFormDirty(state: State) {
        return Object.keys(state.fields).reduce((isDirty, key) => {
            const item = state.fields[key];

            return isDirty || item.value !== item.initialValue;
        }, false);
    }

    public isFormValid(state: State) {
        return Object.keys(state.fields).reduce((isValid, key) => {
            const item = state.fields[key];

            console.info(`${key}: `, item.isValid);

            return isValid && (item.isValid);
        }, true);
    }

    public handleSubmit(event: React.MouseEvent<HTMLFormElement>) {
        const state = { ...this.state },
            props = this.props;

        event.preventDefault();
        event.stopPropagation();

        state.isFormDirty = this.isFormDirty(state);
        state.isFormValid = this.isFormValid(state);

        if (props.onSubmit) {
            props.onSubmit({ event, state });
        }
        this.setState(state);
    }

    public handleBlur(name: string, valid: boolean, value: any) {
        const state = { ...this.state };

        event.preventDefault();
        event.stopPropagation();

        state.fields[name].value = value;
        state.fields[name].isValid = valid;

        state.isFormDirty = this.isFormDirty(state);
        state.isFormValid = this.isFormValid(state);

        if (this.props.onChange) {
            this.props.onChange({ event, state });
        }

        this.setState(state);
    }

    public render() {
        const { children, className, value } = this.props;
        const cssClass = classnames(
            styles['form'],
            className
        );

        return (
            <form
                className={ cssClass }
                onSubmit={ (e: React.MouseEvent<HTMLFormElement>) => this.handleSubmit(e) }
            >
                {
                    React.Children.map(children, (child: React.ReactElement<any>) => {
                    return (!child.props.name)
                        ? child
                        : React.cloneElement(child, {
                            errorMsg: child.props.errorMessage,
                            name: child.props.name,
                            onBlur: (name: string, valid: boolean, v: any) => this.handleBlur(name, valid, v),
                            value: (value) ? value[child.props.name] : ''
                        });
                    })
                }
            </form>
        );
    }
}

export default Form;
