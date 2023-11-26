/* eslint-disable react/no-deprecated */
import React from 'react';
// import fetch from 'jest-fetch-mock';
import {
    renderWithRouter,
    screen,
    userEvent,
    waitForElementToBeRemoved,
    act as rtlAct,
    waitFor,
    fireEvent
} from '@/test-utils';
import App from './User';

describe('User Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        // jest.restoreAllMocks();
    });

    afterEach(() => {
        // cleanup on exiting
        // jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('renders when no data info', () => {
        renderWithRouter(<App />);
        const loadingElement = screen.getByText('no user');
        expect(loadingElement).toBeInTheDocument();
    });

    test('renders user data with testing-library-utils waitFor', async () => {
        const fakeUser = {
            name: 'Tom Bar',
            age: '22',
            address: '112211, Charming Dot Avenue'
        };
        const user = userEvent.setup();
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUser)
            } as Response)
        );
        renderWithRouter(<App id="332211" />);

        const button = screen.getByRole('button', { name: 'fetch-user' });
        expect(button).toBeInTheDocument();
        expect(screen.getByText(/no user/i)).toBeInTheDocument();

        user.click(button);

        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('/332211');
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        expect(screen.getByText(/tom/i)).toBeInTheDocument();
    });

    test('renders user data with testing-library-utils act', async () => {
        const fakeUser = {
            name: 'Woody Bar',
            age: '33',
            address: '8877, Charming Avenue'
        };

        // const user = userEvent.setup();
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUser)
            } as Response)
        );

        renderWithRouter(<App id="5566" />);

        const button = screen.getByRole('button', { name: /fetch-user/i });
        expect(button).toBeInTheDocument();
        expect(screen.getByText(/no user/i)).toBeInTheDocument();

        rtlAct(() => {
            fireEvent.click(button);
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('/5566');
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        expect(screen.getByText('33')).toBeInTheDocument();
        expect(screen.getByText(/woody/i)).toBeInTheDocument();
    });
});
