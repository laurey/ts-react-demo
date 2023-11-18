import { Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

const middlewares: Array<Middleware> = [thunk];

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    middlewares.push(logger);
}

export const setupStore = (preloadedState?: PreloadedState<RootState>, middleware?: Array<Middleware>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware ?? middlewares),
        devTools: process.env.NODE_ENV !== 'production'
    });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
