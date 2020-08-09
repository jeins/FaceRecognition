import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const CameraPhoto = () => {
    const handleTakePhoto = (dataUri) => {
        console.log(dataUri);
        console.log('photo');
    }
    return (
        <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } />
    );
};

export default CameraPhoto;