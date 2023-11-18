export const setupFetch = (path: string, options, params) => {
    const search = new URLSearchParams(params).toString();
    const url: URL = new URL(path);
    url.search = search;
    return fetch(url.toJSON(), options)
        .then(response => response.json())
        .then(data => {
            return data.map(item => {
                return {
                    key: item.key || item.id,
                    ...item
                };
            });
        });
};

export const getFetchDataParams = ({ pagination, ...rest }) => ({
    _limit: pagination.pageSize,
    _page: pagination.current,
    ...rest
});
