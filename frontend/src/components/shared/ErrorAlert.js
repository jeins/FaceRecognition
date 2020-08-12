import React from 'react';
import _ from 'lodash';

import Alert from '@material-ui/lab/Alert';

const ErrorAlert = ({ message }) => {
    const showError = message !== '' && !_.isEmpty(message);

    return showError ? (<Alert severity="error">{message}</Alert>) : (<></>);
}

export default ErrorAlert;