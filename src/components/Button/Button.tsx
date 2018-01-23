import classnames from 'classnames';
import React from 'react';

import styles from './styles.scss';

export enum ButtonStyles {
    Primary,
    Secondary
}

export enum ButtonTypes {
    Button,
    Submit
}

export interface Props {
    buttonStyle?: ButtonStyles;
    buttonType?: ButtonTypes;
    className?: string;
    disabled: boolean;
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Button: React.StatelessComponent<Props> = (props: Props) => {
    const { buttonStyle, buttonType, className, disabled, title, onClick } = props,
        cssClass = classnames(
            styles['btn'],
            styles['btn-lg'],
            styles['btn-block'],
            className,
            (buttonStyle === ButtonStyles.Primary) ? styles['primary'] : '',
            (buttonStyle === ButtonStyles.Secondary) ? styles['secondary'] : ''
        );

    const type = (buttonType === ButtonTypes.Submit) ? 'submit' : 'button';

    return (
        (buttonType === ButtonTypes.Submit)
            ? <input className={ cssClass } type={ type } value={ title } onClick={ onClick } disabled={ disabled } />
            : <button className={ cssClass } onClick={ onClick } disabled={ disabled }>{ title }</button>
    );
};

Button.displayName = 'Button';

export default Button;
