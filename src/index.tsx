import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';

import 'antd/dist/antd.css';
import './index.css';

const rootElement: HTMLElement | null = document.getElementById('root');

const store = setupStore();

function render(Component) {
    const root = createRoot(rootElement);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <Component />
            </Provider>
        </StrictMode>
    );
}

render(App);
