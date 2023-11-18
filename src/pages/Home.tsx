import React, { useState, useEffect, useRef } from 'react';
import HelloWorld, { HelloWorldIProps } from '../components/Hello';

export type HomeIProps = {
    title?: string;
};

export type IUser = {
    id?: number;
    address?: string;
} & HelloWorldIProps;

export type HomeComponent = React.FC<HomeIProps>;

const Home: HomeComponent = (props: HomeIProps) => {
    const myRef = useRef<HTMLDivElement | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        // console.log(myRef.current)
        setUser({
            firstName: 'Jane',
            lastName: 'FF'
        });
    }, []);

    return (
        <div ref={myRef}>
            <h1>Home Page-{props.title}</h1>
            <div>Hello World!!!</div>
            <HelloWorld firstName={user?.firstName} lastName={user?.lastName} />
            <pre>
                {`"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.(ts|tsx)": [
      "npm run --silent lint:fix"
    ]
  }`}
            </pre>
        </div>
    );
};

export default Home;
