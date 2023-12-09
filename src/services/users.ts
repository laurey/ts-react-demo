import request from '@/utils/request';

export function login(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data
    });
}

export function getInfo(token) {
    return request({
        url: '/api/user/info',
        method: 'get',
        params: { token }
    });
}

export function logout() {
    return request({
        url: '/api/user/logout',
        method: 'post'
    });
}

export function fetchUsers({ params, ...config }) {
    return request({
        url: '/api/users',
        method: 'get',
        params,
        ...config
    });
}

export function getUser({ id, params, ...config }) {
    return request({
        url: '/api/users/' + id,
        method: 'get',
        params,
        ...config
    });
}

export function updateUser({ id, data, ...config }) {
    return request({
        url: '/api/users/' + id,
        method: 'post',
        data,
        ...config
    });
}

export function removeUser({ id, data, ...config }) {
    return request({
        url: '/api/users/' + id,
        method: 'delete',
        data,
        ...config
    });
}
