import React, { memo, forwardRef, useCallback, useState } from 'react';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input';

const { Search } = Input;

export interface IGlobalSearchProps {
    forwardedRef?: any;
    onSearch?: (value: string | undefined) => any;
    onChange?: (value: string | undefined) => any;
}

export const GlobalSearch = (props: IGlobalSearchProps & Omit<SearchProps, 'onChange'>) => {
    const { allowClear, placeholder, forwardedRef, onSearch, onChange } = props;
    const [searchTxt, setSearchTxt] = useState('');

    const handleSearchInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setSearchTxt(value);
            onChange && onChange(value);
        },
        [onChange]
    );

    return (
        <Search
            ref={forwardedRef}
            value={searchTxt}
            allowClear={allowClear}
            placeholder={placeholder}
            style={{ width: 200, marginRight: 10 }}
            onSearch={onSearch}
            onChange={handleSearchInputChange}
        />
    );
};

export type Ref = React.Component<any>;

export const GlobalSearchInput = forwardRef<Ref, IGlobalSearchProps & Omit<SearchProps, 'onChange'>>((props, ref) => {
    return <GlobalSearch {...props} forwardedRef={ref} />;
});

export const MemoizedGlobalSearch = memo(GlobalSearchInput);
