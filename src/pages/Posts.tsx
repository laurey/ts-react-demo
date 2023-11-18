import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { Button } from 'antd';
import { MemoizedList } from '../components/List';
import { GlobalSearchInput } from '../components/GlobalSearch';
import { setupFetch, getFetchDataParams } from '../utils';

const MemoizedSearchInput = memo(GlobalSearchInput);

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        width: '20%',
        render: text => <span>{text.substring(0, 15)}...</span>
    },
    {
        title: '内容',
        dataIndex: 'body',
        width: '20%',
        render: text => <span>{text.substring(0, 30)}...</span>
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
    pagination: IPagination;
}

function Posts() {
    const [dataSource, setDataSource] = useState([]);
    const searchInputRef = useRef(null);
    const [pagination, setPagination] = useState<IPagination>({
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
            setDataSource(data);
            setPagination({
                ...pager,
                total: data.totalCount || 100
            });
        });
    };

    const handleTableChange = useCallback(pager => {
        fetchPostData({ pagination: pager });
    }, []);

    const handleRefreshData = useCallback(
        e => {
            e.preventDefault();
            fetchPostData({
                pagination
            });
        },
        [pagination]
    );

    const handleSearchInputChange = useCallback(val => {
        console.log('val: ', val);
    }, []);

    const handleSearch = useCallback(value => {
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
    console.count('posts-render');

    return (
        <div style={{ padding: 12 }}>
            <div className="ta-right" style={{ marginBottom: 20, textAlign: 'right' }}>
                <MemoizedSearchInput
                    ref={searchInputRef}
                    placeholder="please input search text"
                    onSearch={handleSearch}
                    onChange={handleSearchInputChange}
                />
                <Button htmlType="button" shape="circle" icon="reload" title="Reload" onClick={handleRefreshData} />
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
