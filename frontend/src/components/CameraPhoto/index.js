import React, { useState } from 'react';
import _ from 'lodash';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import { MODE_DETECT, MODE_TRAIN } from './const';
import { uploadImage, identifyImage } from './ApiService';
import ErrorAlert from '../shared/ErrorAlert';
import LoadingOverlay from '../shared/LoadingOverlay';

const CameraPhoto = ({ mode, userId = '', onStepDone = null }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTakePhoto = async (dataUri) => {
        setLoading(true);
        setError('');

        if(mode == MODE_DETECT) {
            const result = await identifyImage(dataUri);
            validate(result);
        } else if(mode == MODE_TRAIN) {
            const result = await uploadImage(dataUri, userId);
            validate(result);
            
            if(_.has(result, 'valid') && result.valid) {
                onStepDone();
            }
        }

        setLoading(false);
    }

    const validate = (result) => {
        if(result == false) {
            setError('something wrong, please retry!');
        }

        if(_.has(result, 'valid') && !result.valid) {
            setError(result.message);
        }

        console.log(result)
    }

    return (
        <LoadingOverlay loading={loading}>
            <ErrorAlert message={error} />
            <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } />
        </LoadingOverlay>
    )  
    
};

export default CameraPhoto;