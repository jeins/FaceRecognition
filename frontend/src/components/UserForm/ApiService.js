import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '../config';

export const addUserData = async(userData) => {
    const url = `${API_URL}/user/register`;

    try{
        const result = await axios.post(url, userData);

        return result.data;
    } catch(error) {
        return {};
    }
}
