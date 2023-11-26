import React, { memo, useRef, useState, forwardRef, useCallback, useImperativeHandle } from 'react';
import { Input } from 'antd';
import { IGlobalSearchProps } from './GlobalSearch';
import type { SearchProps } from 'antd/es/input';

const { Search } = Input;

const SearchInput = (props: IGlobalSearchInputProps, ref: React.Ref<unknown> | undefined) => {
    const { allowClear, placeholder, onSearch, onChange } = props;
    const [searchTxt, setSearchTxt] = useState('');
    const inputSearchRef = useRef(null);
    useImperativeHandle(ref, () => inputSearchRef.current, []);

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
            ref={inputSearchRef}
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

export type IGlobalSearchInputProps = IGlobalSearchProps & Omit<SearchProps, 'onChange'>;
export const GlobalSearchInput = forwardRef<Ref, IGlobalSearchInputProps>(SearchInput);

export const MemoizedSearchInput = memo(GlobalSearchInput);
