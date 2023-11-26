// test-utils.tsx
import React, { PropsWithChildren } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import rootReducers from '@/reducers';
import { RootState, setupStore, AppStore } from '@/app/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as preloadedState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

function renderComponent(
    ui: React.ReactElement
    // { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    return {
        ...rtlRender(ui)
        // history
    };
}

function renderWithRedux(
    ui: React.ReactElement,
    {
        preloadedState = {
            counter: {
                value: 1
            }
        },
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper(props: PropsWithChildren<unknown>): JSX.Element {
        return <Provider {...props} store={store} />;
    }

    return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

function renderWithRouter(
    ui: React.ReactElement,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    return {
        ...rtlRender(<Router history={history}>{ui}</Router>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history
    };
}

function renderWithRouterRedux(
    ui: React.ReactElement,
    {
        preloadedState = {
            counter: {
                value: 1
            }
        },
        store = setupStore(preloadedState),
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: PropsWithChildren<any>) {
        return <Provider store={store}>{children}</Provider>;
    }

    return {
        store,
        ...rtlRender(<Router history={history}>{ui}</Router>, { wrapper: Wrapper, ...renderOptions }),
        history
    };

    // const Wrapper = ({ children }) => {
    //     return (
    //         <Provider store={store}>
    //             <Router history={history}>{children}</Router>
    //         </Provider>
    //     );
    // };

    // return {
    //     store,
    //     ...rtlRender(ui, { wrapper: props => <Wrapper {...props}>{ui}</Wrapper>, ...renderOptions }),
    //     history
    // };
}

export const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};

export const mockFetchPromise = (response = {}) =>
    Promise.resolve({
        json: () => Promise.resolve(response)
    });

// re-export everything
export * from 'history';
export * from '@testing-library/react';
export { rtlRender as render, renderComponent, renderWithRouterRedux, renderWithRouter, renderWithRedux, userEvent };
