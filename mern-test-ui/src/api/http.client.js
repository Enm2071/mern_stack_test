import axios from 'axios';

const getDefaultHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};  

const createHttpClientInstance = () => {
    const instance = axios.create({
        baseURL: "http://localhost:3000",
        headers: getDefaultHeaders()
    });

    const makeRequest = (url, method, config) => {
        return instance({
            url,
            method,
            ...config
        });
    };

    return {
        request: (config) => axios.request(config),
        get: (url, config) => makeRequest(url, 'GET', config),
        head: (url, config) => makeRequest(url, 'HEAD', config),
        options: (url, config) => makeRequest(url, 'OPTIONS', config),
        post: (url, data, config) => makeRequest(url, 'POST', {
            ...config,
            data
        }),
        put: (url, data, config) => makeRequest(url, 'PUT', {
            ...config,
            data
        }),
        delete: (url, data, config) => makeRequest(url, 'DELETE', {
            ...config,
            data
        }),
        patch: (url, data, config) => makeRequest(url, 'PATCH', {
            ...config,
            data
        })

    };
}

const httpClient = createHttpClientInstance();

export default httpClient;