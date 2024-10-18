import axios, { AxiosRequestConfig } from 'axios';

const Axios = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

Axios.interceptors.response.use(function (response) {
    return response;
});

const Request = {
    setAuthorizationToken: (token: string) => {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    Get: async (url: string) => {
        return await Axios.get(url).then((res) => res.data);
    },
    Post: async (url: string, body?: any, options?: AxiosRequestConfig) => {
        return await Axios.post(url, body, options).then((res) => res.data);
    },
    Put: async (url: string, body: any) => {
        return await Axios.put(url, body).then((res) => res.data);
    },
    Delete: async (url: string) => {
        return await Axios.delete(url).then((res) => res.data);
    },
};

export default Request;
