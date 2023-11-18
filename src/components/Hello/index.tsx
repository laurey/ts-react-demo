import * as React from 'react';

export type HelloWorldIProps = {
    firstName?: string;
    lastName?: string;
};

const HelloWorld = (props: HelloWorldIProps) => (
    <h1>
        Hi there from React! Welcome {props.firstName} and {props.lastName}!
    </h1>
);

export default HelloWorld;
