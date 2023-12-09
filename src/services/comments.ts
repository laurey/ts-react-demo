import request from '@/utils/request';

export function fetchComments({ params, ...config }) {
    return request({
        url: '/api/comments',
        method: 'get',
        params,
        ...config
    });
}

export function getComment({ id, params, ...config }) {
    return request({
        url: '/api/comments/' + id,
        method: 'get',
        params,
        ...config
    });
}

export function updateComment({ id, data, ...config }) {
    return request({
        url: '/api/comments/' + id,
        method: 'post',
        data,
        ...config
    });
}

export function removeComment({ id, data, ...config }) {
    return request({
        url: '/api/comments/' + id,
        method: 'delete',
        data,
        ...config
    });
}
