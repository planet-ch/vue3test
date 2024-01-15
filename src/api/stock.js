import request from '@/utils/request';
import qs from 'qs';

export const getTakingData = (data) => {
    return request({
        url: '/taking',
        baseURL: '/wogoo/api',
        method: 'get',
        params: data
    });
};