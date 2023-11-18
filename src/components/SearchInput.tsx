import React, { memo, useRef, useState, forwardRef, useCallback, useImperativeHandle } from 'react';
import { Input } from 'antd';
import type { IGlobalSearchInputProps } from './GlobalSearch';

const { Search } = Input;

const SearchInput = (props, ref) => {
    const { allowClear, placeholder, onSearch, onChange } = props;
    const [searchTxt, setSearchTxt] = useState('');
    const inputSearchRef = useRef(null);
    useImperativeHandle(ref, () => inputSearchRef.current, []);

    const handleSearchInputChange = useCallback(
        e => {
            const { value } = e.target;
            setSearchTxt(value);
            onChange(value);
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

export const GlobalSearchInput = forwardRef<Ref, IGlobalSearchInputProps>(SearchInput);

export const MemoizedSearchInput = memo(GlobalSearchInput);
