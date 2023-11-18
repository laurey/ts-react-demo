import React from 'react';
import App from './App';
import { renderWithRouterRedux, act, screen } from '@/test-utils';

describe('App test rendering', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('full app rendering', async () => {
        renderWithRouterRedux(<App />);
        await act(async () => {
            jest.runOnlyPendingTimers();
        });

        const target = screen.getByText(/Hello World/i);
        expect(target).toBeInTheDocument();
    });
});
