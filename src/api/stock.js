import request from '@/utils/request';
import qs from 'qs';

export const getSearchData = (data, jsonData) => {
    return request({
        url: '/chat/get_data',
        baseURL: '/wogoo/api',
        method: 'post',
        data: { ...data, ...jsonData }
    });
};