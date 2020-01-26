import axios from 'axios';
import { API_BASE_URL } from '../config';

const request = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            return Promise.reject(error.response);
        }
    }
);

export function getData(response) {
    return response.data;
}

export default request;
