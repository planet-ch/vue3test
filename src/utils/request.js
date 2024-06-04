import axios from 'axios';
import { ElMessage } from 'element-plus'
// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_WOGOO_NEW_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000, // request timeout
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
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
    (response) => {
        const res = response.data;
        // 0:正确 100: 查询不到(语句合法) 101：查询不到（语句不合法） 其他：内部错误 - 直接使用后端返回
        if (res.code !== 0) {
            switch (res.code) {
                case 100: {
                    ElMessage.warning('您搜索的语句暂时查询不到结果～')
                    return {
                        ...res,
                        data: {
                            ...res.data,
                            list: []
                        }
                    }
                }
                case 101: {
                    ElMessage.warning('您搜索的语句暂时查询不到结果～')
                    return false
                }
                default: {
                    ElMessage.error(res.errmsg)
                }
            }
            return false
        }
        return res;
    },
    (error) => {
        ElMessage.error('出了点错～请稍后再试')
        return Promise.reject(error);
    }
);

export default service;
