import React, { useState } from 'react';
import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorAlert from '../shared/ErrorAlert';
import { RegisterUserFormSection, FormStyled, ButtonStyled } from './styled.components';

import { addUserData } from './ApiService';

import { USER_FIELDS } from './const';
import { TEXT } from '../text';

const RegisterUserForm = ({ onRegisterSuccess }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(USER_FIELDS);

    const onChangeTextField = (id) => (event) => setData({
        ...data,
        [id]: event.target.value,
    })

    const onChangeCheckbox = (event) => setData({
        ...data,
        'removeAfterDays14': event.target.checked
    })

    const onSubmit = async () => {
        setLoading(true);
        setError('');

        const result = await addUserData({
            ...data,
            'removeAfterDays14': data['removeAfterDays14'] ? 1 : 0
        });

        if(!result.valid) {
            setError(result.message);
        }
        console.log(result)

        if(result.valid) {
            onRegisterSuccess(result.data);
        }

        setLoading(false);
    }

    const isButtonDisabled = Object.values(data).filter(d => d === '').length > 0;

    const generateTextField = (id, lable) => 
        (<TextField
            key={id}
            id={id}
            label={lable}
            fullWidth
            value={data[id]}
            
            onChange={onChangeTextField(id)} />);

    return (
        <RegisterUserFormSection loading={loading}>
            <ErrorAlert message={error} />
            <FormStyled>
                {
                    Object.keys(data)
                        .filter((id) => id !== 'removeAfterDays14')
                        .map((id) => generateTextField(id, TEXT.REGISTER_USER_FORM[id.toUpperCase()]))
                }
                <FormControlLabel
                    className="CheckBox"
                    control={
                    <Checkbox
                        checked={data['removeAfterDays14']}
                        onChange={onChangeCheckbox}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label={TEXT.REGISTER_USER_FORM.REMOVEAFTERDAYS14}
                />
            </FormStyled>
            
            <ButtonStyled
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isButtonDisabled}

                onClick={onSubmit}>
                {TEXT.REGISTER_BUTTON}
            </ButtonStyled>

        </RegisterUserFormSection>
    );
}

export default RegisterUserForm;