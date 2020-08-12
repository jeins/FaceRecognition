import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '../config';

export const uploadImage = async(image, userId) => {
    const url = `${API_URL}/user/train-face/${userId}`;
    const data = new FormData();

    data.append('image', dataURIToBlob(image), `${_.uniqueId()}.png`);

    try{
        const result = await axios.post(url, data);

        return result.data.valid;
    } catch(error) {
        return false;
    }
}

export const identifyImage = async(image) => {
    const url = `${API_URL}/user/identify`;
    const data = new FormData();

    data.append('image', dataURIToBlob(image), `${_.uniqueId()}.png`);

    try{
        const result = await axios.post(url, data);

        return result.data;
    } catch(error) {
        return {};
    }
}

const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }