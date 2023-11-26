export const setupFetch = (path: string, options?: any, params?: any) => {
    const search = new URLSearchParams(params).toString();
    const url: URL = new URL(path);
    url.search = search;
    return fetch(url.toJSON(), options)
        .then(response => response.json())
        .then(response => {
            let data: Array<any> = [];
            let totalCount = 0;
            if (!Array.isArray(response)) {
                data = response?.result ?? [];
                totalCount = response.totalCount ?? 0;
            } else {
                data = response;
                totalCount = +(Math.random() * 1000);
            }

            const result = data.map(item => {
                return {
                    key: item.key || item.id,
                    ...item
                };
            });
            return {
                result,
                totalCount
            };
        });
};

export const getFetchDataParams = ({ pagination, ...rest }: Record<string, any> = {}) => ({
    _limit: pagination.pageSize,
    _page: pagination.current,
    ...rest
});
