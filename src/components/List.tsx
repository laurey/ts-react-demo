import React, { memo } from 'react';
import { Table, TableProps } from 'antd';

export function List(props: TableProps<any>) {
    const { columns, dataSource, pagination, loading, onChange } = props;

    return (
        <div>
            <Table
                bordered
                columns={columns}
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={onChange}
            />
        </div>
    );
}

export const MemoizedList = memo(List);
