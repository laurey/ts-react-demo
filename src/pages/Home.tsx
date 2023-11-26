import React, { useRef } from 'react';

export type HomeIProps = {
    title?: string;
};

export type IUser = {
    id?: number;
    address?: string;
};

export type HomeComponent = React.FC<HomeIProps>;

const Home: HomeComponent = (props: HomeIProps) => {
    const myRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={myRef}>
            <h1>Home Page-{props.title}</h1>
            <div>Hello World!!!</div>
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
