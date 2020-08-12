import React, { useState } from 'react';
import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorAlert from '../shared/ErrorAlert';
import { RegisterFormSection, FormStyled, ButtonStyled } from './styled.components';

import { addUserData } from './ApiService';

const RegisterForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        fullName: '', 
        email: '', 
        phoneNumber: '', 
        city: '', 
        country: '', 
        removeAfterDays14: false,
    });

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

        setLoading(false);
    }

    const isButtonDisabled = Object.values(data).filter(d => d === '').length > 0

    const getLabel = id => 
        id.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })

    const generateTextField = (id, lable) => 
        (<TextField
            key={id}
            id={id}
            label={lable}
            fullWidth
            value={data[id]}
            
            onChange={onChangeTextField(id)} />);

    return (
        <RegisterFormSection loading={loading}>
            <ErrorAlert message={error} />
            <FormStyled>
                {
                    Object.keys(data)
                        .filter((id) => id !== 'removeAfterDays14')
                        .map((id) => generateTextField(id, getLabel(id)))
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
                    label="Hapus data setelah 14 hari."
                />
            </FormStyled>
            
            <ButtonStyled
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isButtonDisabled}

                onClick={onSubmit}>
                Register
            </ButtonStyled>

        </RegisterFormSection>
    );
}

export default RegisterForm;