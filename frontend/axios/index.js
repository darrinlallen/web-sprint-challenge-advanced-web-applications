// ✨ implement axiosWithAuth
import axios from 'axios';
import Spinner from './Spinner'


export const axiosWithAuth =() => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token,
        },
    });
};
