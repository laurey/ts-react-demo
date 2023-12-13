import { renderWithRouter, screen, waitForElementToBeRemoved, waitFor } from '@/test-utils';
import App from './Todo';

describe('Todo Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        // cleanup on exiting
        jest.restoreAllMocks();
    });

    test('renders when no data info', () => {
        renderWithRouter(<App />);
        const loadingElement = screen.getByText('no todo');
        expect(loadingElement).toBeInTheDocument();
    });

    test('renders todo data with testing-library-utils waitFor', async () => {
        const fakeTodo = {
            title: 'tomorrow',
            body: 'go swimming'
        };
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeTodo)
            } as Response)
        );

        renderWithRouter(<App id="11" />);

        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });

        expect(spy).toHaveBeenCalledWith('/11');
        expect(spy).toHaveBeenCalledTimes(1);

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        expect(screen.getByText(/swimming/i)).toBeInTheDocument();
    });

    test('rerender todo data after props change', async () => {
        const fakeTodo1 = {
            title: 'tomorrow',
            body: 'go swimming'
        };
        const fakeTodo2 = {
            title: 'tomorrow',
            body: 'go skiing'
        };
        const spy = jest
            .spyOn(global, 'fetch')
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve(fakeTodo1)
                } as Response)
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    json: () => Promise.resolve(fakeTodo2)
                } as Response)
            );

        const { rerender } = renderWithRouter(<App id="11" />);

        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });

        expect(spy).toHaveBeenCalledWith('/11');
        expect(spy).toHaveBeenCalledTimes(1);

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        expect(screen.getByText(/swimming/i)).toBeInTheDocument();

        rerender(<App id="22" />);

        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });

        expect(spy).toHaveBeenCalledWith('/22');
        expect(spy).toHaveBeenCalledTimes(2);

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        expect(screen.getByText(/skiing/i)).toBeInTheDocument();
    });
});
