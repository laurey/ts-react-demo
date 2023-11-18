import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';

import 'antd/dist/antd.css';
import './index.css';

const rootElement: HTMLElement | null = document.getElementById('root');

const store = setupStore();

function render(Component: React.ComponentType): void {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        rootElement
    );
}

const app = hot(App);

render(app);
