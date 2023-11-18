import React from 'react';

function Option(props) {
    const { children, isSelected, ...restProps } = props;
    return (
        <div className={`rtc-select-option ${isSelected ? 'selected' : ''}`} {...restProps}>
            {children}
        </div>
    );
}

export default Option;
