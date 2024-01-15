import axios from 'axios';

// create an axios instance
console.log(import.meta.env.VITE_APP_WOGOO_NEW_URL, '真的');
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_WOGOO_NEW_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000, // request timeout
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});
service.interceptors.request.use(
    async (config) => {
        config.headers = {
            'X-App-Version': 'h5'
        };

        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;';
        // config.data = qs.stringify({ ...config.data });

        // wog-深圳地区-接口处理
        if (config.baseURL.indexOf('/wogoo/api') === 0) {
            config.baseURL = import.meta.env.VITE_APP_WOGOO_NEW_URL;
        }

        if (config.header) {
            config.headers = { ...config.headers, ...config.header };
        }

        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data;
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
