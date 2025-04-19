import axios from "axios";
// @ts-ignore
import properties from "../config/properties";

const custom_axios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
    withCredentials: true,
});

custom_axios.interceptors.response.use(null, (error) => {
    if (error.response?.status) {
        if (error.response.status === 401) {
            localStorage.clear();
        } else {
            let errorObj = { error };
            errorObj.error.config.headers.Authorization = "";
        }
    }

});

function httpGet(url, ...args) {
    return custom_axios.get(url, ...args);
}

function httpPost(url, ...args) {
    return custom_axios.post(url, ...args);
}

function httpPatch(url, ...args) {
    return custom_axios.patch(url, ...args);
}

function httpPut(url, ...args) {
    return custom_axios.put(url, ...args);
}

function httpDelete(url, ...args) {
    return custom_axios.delete(url, ...args);
}

const http = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
    patch: httpPatch,
};

export default http;
