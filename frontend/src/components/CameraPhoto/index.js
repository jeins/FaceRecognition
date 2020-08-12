import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import { MODE_DETECT, MODE_TRAIN } from './const';
import { uploadImage, identifyImage } from './ApiService';
import LoadingOverlay from '../LoadingOverlay';

const CameraPhoto = ({ mode, userId = '' }) => {
    const [loading, setLoading] = useState(false);

    const handleTakePhoto = async (dataUri) => {
        setLoading(true);

        if(mode == MODE_DETECT) {
            const result = await identifyImage(dataUri);
            console.log(result);
        } else if(mode == MODE_TRAIN) {
            const result = await uploadImage(dataUri, userId);
            console.log(result);
        }

        setLoading(false);
    }
    return (
        <LoadingOverlay loading={loading}>
            <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } />
        </LoadingOverlay>
    )  
    
};

export default CameraPhoto;