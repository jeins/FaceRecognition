import React from 'react';

import TextField from '@material-ui/core/TextField';
import { FormStyled } from './styled.components';

import { USER_FIELDS } from './const';
import { TEXT } from '../text';

const ShowUserData = ({ data }) => {
    const userData = Object.keys(data).map((key) => data[key])
    
    return (
        <FormStyled>
        {
            Object.keys(USER_FIELDS)
                .filter((id) => id !== 'removeAfterDays14')
                .map((id) => (
                    <TextField
                        key={id}
                        id={id}
                        label={TEXT.REGISTER_USER_FORM[id.toUpperCase()]}
                        fullWidth
                        value={userData[0][id]}
                        InputProps={{
                            readOnly: true,
                        }} />
                ))
        }
        </FormStyled>
    );
};

export default ShowUserData;