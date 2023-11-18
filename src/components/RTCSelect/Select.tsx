import React, { useCallback, useState } from 'react';
import Option from './Option';

function Select(props) {
    const { value, defaultValue, placeholder, defaultOpen, open, children, onSelect, onChange } = props;
    const [isOpen, setisOpen] = useState(open || defaultOpen);

    const handleClick = useCallback(() => {
        setisOpen(prev => !prev);
    }, []);

    const handleChange = useCallback(() => {}, []);

    const handleOptionClick = useCallback(
        v => {
            if (onSelect) {
                onSelect(v);
            }

            if (v !== value && onChange) {
                onChange(v);
            }
        },
        [value, onSelect, onChange]
    );

    const options = React.Children.map(children, child => {
        const isSelected = child.props.value === (value || defaultValue);
        return React.cloneElement(child, {
            ...child.props,
            isSelected,
            onClick: isSelected ? null : () => handleOptionClick(child.props.value)
        });
    });

    return (
        <>
            <div className="rtc-select" onClick={handleClick} onChange={handleChange} style={{ padding: 20 }}>
                <div className="rtc-select-selection">
                    <div className="rtc-select-selection-wrapper">
                        {(value || defaultValue) && (
                            <div className="rtc-select-selection-value" title={value || defaultValue}>
                                {value || defaultValue}
                            </div>
                        )}
                        {placeholder && !(value || defaultValue) && (
                            <div className="rtc-select-placeholder">{placeholder}</div>
                        )}
                    </div>
                    <div className="rtc-select-arrow">&gt;</div>
                </div>
                <div>
                    <div>isOpen: {isOpen ? 'true' : 'false'}</div>
                    <div>React.Children.count: {React.Children.count(children)}</div>
                    <div>value: {value || defaultValue}</div>
                </div>
            </div>
            <div>
                <h1>children:</h1>
                <div>{isOpen && options}</div>
            </div>
        </>
    );
}

Select.Option = Option;

export default Select;
