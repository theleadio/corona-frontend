import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_URL;

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
