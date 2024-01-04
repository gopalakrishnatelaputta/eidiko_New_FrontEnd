import axios from "axios";
import { baseUrl } from "./baseUrl";

const BASE_URL = baseUrl;

export const myAxios = axios.create({
    baseURL: `${BASE_URL}`
})

myAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("token")
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
            config.headers['Content-Type'] = 'application/json'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

myAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);