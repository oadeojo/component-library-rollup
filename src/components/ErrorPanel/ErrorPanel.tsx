import React from 'react';

import styles from './styles.scss';

export interface Props {
    errors?: string[];
}

const ErrorPanel: React.StatelessComponent<Props> = (props) => {
    const errors = props.errors;

    const errorContent = errors && errors.map((message, i) => {
        return <p key={i}>{message}</p>;
    });

    return (
        <div className={ styles['error_panel'] }>{ errorContent }</div>
    );
};

ErrorPanel.displayName = 'ErrorPanel';

export default ErrorPanel;
