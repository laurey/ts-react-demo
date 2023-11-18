import React, { memo, forwardRef, useCallback, useState } from 'react';
import { Input, InputProps } from 'antd';

const { Search } = Input;

export interface IGlobalSearchProps extends InputProps {
    forwardedRef?: any;
    onSearch?: (value: string) => any;
    onChange?: (value: any) => any;
}

export const GlobalSearch = (props: IGlobalSearchProps) => {
    const { allowClear, placeholder, forwardedRef, onSearch, onChange } = props;
    const [searchTxt, setSearchTxt] = useState('');

    const handleSearchInputChange = useCallback(
        e => {
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
export type IGlobalSearchInputProps = {
    placeholder?: string;
    onSearch?: (value: string) => any;
    onChange?: (value: any) => any;
} & InputProps;

export const GlobalSearchInput = forwardRef<Ref, IGlobalSearchInputProps>((props, ref) => {
    return <GlobalSearch {...props} forwardedRef={ref} />;
});

export const MemoizedGlobalSearch = memo(GlobalSearchInput);
