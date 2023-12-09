import request from '@/utils/request';

export function fetchPosts({ params, ...config }) {
    return request({
        url: '/api/posts',
        method: 'get',
        params,
        ...config
    });
}

export function getPost({ id, params, ...config }) {
    return request({
        url: '/api/posts/' + id,
        method: 'get',
        params,
        ...config
    });
}

export function updatePost({ id, data, ...config }) {
    return request({
        url: '/api/posts/' + id,
        method: 'post',
        data,
        ...config
    });
}
