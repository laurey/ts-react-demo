import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DECREMENT, INCREMENT } from '@/constants/CounterActionTypes';
import { Button } from 'antd';
import { decrement, increment, selectCount } from '@/reducers/counter';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import styles from './Counter.module.less';

function Counter() {
    const value = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const { btn } = styles;

    // State: a counter value
    const [counter, setCounter] = useState(0);

    // Action: code that causes an update to the state when something happens
    const incrementCounter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        setCounter(prevCounter => prevCounter + 1);
    };

    const decrementCounter = () => {
        setCounter(prevCounter => prevCounter - 1);
    };

    const handleIncrement = () => {
        dispatch(increment());
    };

    const handleDecrement = () => {
        dispatch(decrement());
    };

    // View: the UI definition
    return (
        <div>
            <div>
                <p className={styles.bg}>
                    Counter value: <span>{counter}</span>
                </p>
                <Button type="primary" htmlType="button" className={btn} onClick={incrementCounter}>
                    Increment-State
                </Button>
                <Button type="primary" htmlType="button" className={btn} onClick={decrementCounter}>
                    Decrement-State
                </Button>
            </div>
            <div style={{ marginTop: 24 }}>
                <p>
                    Store Counter value: <span>{value}</span>
                </p>
                <Button type="dashed" htmlType="button" className={btn} onClick={handleIncrement}>
                    Store-inc-state
                </Button>
                <Button type="dashed" htmlType="button" className={btn} onClick={handleDecrement}>
                    Store-dec-state
                </Button>
            </div>
        </div>
    );
}

export default Counter;
