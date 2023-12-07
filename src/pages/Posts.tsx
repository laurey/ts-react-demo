import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { Button, TablePaginationConfig } from 'antd';
import { MemoizedList } from '../components/List';
import { GlobalSearchInput } from '../components/GlobalSearch';
import { setupFetch, getFetchDataParams } from '../utils';

const MemoizedSearchInput = memo(GlobalSearchInput);

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        width: '20%',
        render: (text: string | undefined) => <span>{text?.substring(0, 15)}...</span>
    },
    {
        title: '内容',
        dataIndex: 'body',
        width: '20%',
        render: (text: string | undefined) => <span>{text?.substring(0, 30)}...</span>
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Action',
        dataIndex: '',
        render: () => <Button type="link">Delete</Button>
    }
];

export interface IPagination {
    current: number;
    pageSize: number;
    [key: string]: any;
}

export interface IFetchDataParams {
    pagination: IPagination & TablePaginationConfig;
}

function Posts() {
    const [dataSource, setDataSource] = useState<Array<any>>([]);
    const searchInputRef = useRef(null);
    const [pagination, setPagination] = useState<IPagination & TablePaginationConfig>({
        current: 1,
        pageSize: 3
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchPostData = (params = {}) => {
        const { pagination: pager } = params as IFetchDataParams;
        setIsLoading(true);
        setupFetch(
            'https://jsonplaceholder.typicode.com/posts',
            null,
            getFetchDataParams(params as IFetchDataParams)
        ).then(data => {
            setIsLoading(false);
            setDataSource(data.result);
            setPagination({
                ...pager,
                total: data?.totalCount || 100
            });
        });
    };

    const handleTableChange = useCallback((pager: Record<string, any>) => {
        fetchPostData({ pagination: pager });
    }, []);

    const handleRefreshData = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            fetchPostData({
                pagination
            });
        },
        [pagination]
    );

    const handleSearchInputChange = useCallback((val: string | undefined) => {
        console.log('val: ', val);
    }, []);

    const handleSearch = useCallback((value: string | undefined) => {
        fetchPostData({
            pagination,
            ...(value ? { title_like: value } : null)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchPostData({ pagination });
        return () => {
            // cleanup;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // console.count('posts-render');

    return (
        <div style={{ padding: 12 }}>
            <div className="ta-right" style={{ marginBottom: 20, textAlign: 'right' }}>
                <MemoizedSearchInput
                    ref={searchInputRef}
                    placeholder="please input search text"
                    onSearch={handleSearch}
                    onChange={handleSearchInputChange}
                />
                <Button htmlType="button" title="Reload" onClick={handleRefreshData}>
                    Reload
                </Button>
            </div>
            <MemoizedList
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}

export default Posts;
