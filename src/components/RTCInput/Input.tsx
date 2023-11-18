import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

export interface RTCInputIProps {
    placeholder?: string | undefined;
    allowClear?: boolean;
    time?: number;
    onChange: (arg: string | undefined) => void;
}

const UnDebouncedInput = (props: RTCInputIProps): JSX.Element => {
    const { allowClear, placeholder, onChange } = props;
    const [value, setValue] = useState<string | number | undefined>('');

    const handleInputChange = useCallback(
        e => {
            const { value } = e.target;
            setValue(value);
            onChange(value);
        },
        [onChange]
    );

    return <Input value={value} allowClear={allowClear} placeholder={placeholder} onChange={handleInputChange} />;
};

const DebouncedInput = (props: RTCInputIProps) => {
    const { allowClear, placeholder, time = 100, onChange } = props;
    const [value, setValue] = useState<string | number | undefined>('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChange = useCallback(debounce(onChange, time), []);
    const handleInputChange = useCallback(
        e => {
            const { value } = e.target;
            setValue(value);
            handleChange(value);
        },
        [handleChange]
    );

    return <Input value={value} allowClear={allowClear} placeholder={placeholder} onChange={handleInputChange} />;
};

export { UnDebouncedInput, DebouncedInput };
