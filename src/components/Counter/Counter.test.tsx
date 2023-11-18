/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { renderWithRedux, userEvent } from '@/test-utils';
import { setupStore } from '@/app/store';
import Counter from '.';

describe('Counter Component', () => {
    test('component rendering', async () => {
        const preloadedState = { counter: { value: 111 } };
        const store = setupStore(preloadedState);
        const { getByText } = renderWithRedux(<Counter />, {
            store
        });
        expect(getByText(/111/i)).toBeInTheDocument();
    });

    test('changes the text after click', async () => {
        const preloadedState = { counter: { value: 11 } };
        const store = setupStore(preloadedState);
        const { getByText, getByRole, findByText } = renderWithRedux(<Counter />, {
            store
        });
        expect(getByText(/11/i)).toBeInTheDocument();

        const btnElement = getByRole('button', { name: /Store-inc-state/i });
        expect(btnElement).toBeInTheDocument();

        userEvent.click(btnElement);
        expect(await findByText(/12/i)).toBeInTheDocument();
    });
});
