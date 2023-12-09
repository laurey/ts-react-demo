import axios from 'axios';

const service = axios.create({
    // baseURL: process.env.WEBPACK_REACT_APP_API_PROXY,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (getToken) {
        //     config.headers['X-CSRF-Token'] = getToken();
        // }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.status && res.status !== 200) {
            // message.error({
            //   duration: 2,
            //   content: res.error.message || 'Error'
            // })
            return Promise.reject(new Error(res.error.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        // message.error({
        //   duration: 3,
        //   content: error.message
        // })
        return Promise.reject(error);
    }
);

export { service as default, axios };
