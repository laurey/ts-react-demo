import React from 'react';
import Counter from '../components/Counter';

export type OptionValue = string | number;
export type CounterIProps<T extends OptionValue> = {
    value?: T;
    className?: string;
    style?: React.CSSProperties;
};

function CounterPage<T extends OptionValue>(props: CounterIProps<T>) {
    return (
        <div>
            <div>props.value: {props.value}</div>
            <Counter />
        </div>
    );
}

export default CounterPage;
