import React, { useCallback, useEffect, useState, memo } from 'react';
import { Button } from 'antd';
import { MemoizedList } from '../components/List';
import { GlobalSearchInput } from '../components/SearchInput';
import { setupFetch, getFetchDataParams } from '../utils';
import type { IFetchDataParams, IPagination } from './Posts';

const MemoizedGlobalSearchInput = memo(GlobalSearchInput);

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        width: '20%',
        render: text => <span>{text.substring(0, 15)}...</span>
    },
    {
        title: '内容',
        dataIndex: 'body',
        width: '20%',
        render: text => <span>{text ? text.substring(0, 30) : '-'}...</span>
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Action',
        dataIndex: '',
        render: () => <Button type="link">Remove</Button>
    }
];

const Users = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 1,
        pageSize: 3
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserData = (params: IFetchDataParams) => {
        const { pagination: pager } = params;
        setIsLoading(true);
        setupFetch('https://jsonplaceholder.typicode.com/users', null, getFetchDataParams(params)).then(result => {
            setIsLoading(false);
            setData(result);
            setPagination({
                ...pager,
                total: result.totalCount || 11
            });
        });
    };

    const handleTableChange = useCallback(pager => {
        fetchUserData({ pagination: pager });
    }, []);

    const handleRefreshData = useCallback(
        e => {
            e.preventDefault();
            fetchUserData({
                pagination
            });
        },
        [pagination]
    );

    const handleSearchInputChange = useCallback(val => {
        console.log('input.val: ', val);
    }, []);

    const handleSearch = useCallback(value => {
        fetchUserData({
            pagination,
            ...(value ? { name_like: value } : null)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchUserData({ pagination });
        return () => {
            // cleanup;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.count('users-render');

    return (
        <div style={{ padding: 12 }}>
            <div className="ta-right" style={{ marginBottom: 20, textAlign: 'right' }}>
                <MemoizedGlobalSearchInput
                    placeholder="please input something"
                    onSearch={handleSearch}
                    onChange={handleSearchInputChange}
                />
                <Button htmlType="button" shape="circle" icon="reload" title="Reload" onClick={handleRefreshData} />
            </div>
            <MemoizedList
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default Users;
