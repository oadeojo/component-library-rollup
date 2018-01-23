import React from 'react';
import { Button, ButtonStyles, ButtonTypes, Props } from '../Button';

export { ButtonTypes, ButtonStyles, Props };

const SubmitButton: React.StatelessComponent<Props> = (props: Props) =>
    <Button buttonType={ ButtonTypes.Submit } {...props} />;

export default SubmitButton;
