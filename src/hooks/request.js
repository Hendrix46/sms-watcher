import axios from "axios";

const BASE_URL = "https://planned-recommendation-marina-trim.trycloudflare.com/";
const apiRequest = axios.create({
    baseURL: BASE_URL,
    headers: {},
    params: {},
});

apiRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
});

apiRequest.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    if (err?.response?.status === 401) {
        location.reload();
        localStorage.removeItem("token");
    } else if (err.message === 'Network Error') {
        console.log('Network Error');
    } else {
        console.log('Network error 2');
    }
    return Promise.reject(err);
});

export default apiRequest;