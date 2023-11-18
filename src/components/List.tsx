import React, { memo } from 'react';
import { Table } from 'antd';

export function List(props) {
    const { columns, dataSource, pagination, loading, onChange } = props;
    const handleTableChange = params => {
        onChange(params);
    };

    return (
        <div>
            <Table
                bordered
                columns={columns}
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}

export const MemoizedList = memo(List);
