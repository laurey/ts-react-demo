import '@/matchMedia';
import { act, renderComponent, screen, waitFor } from '@/test-utils';
import Posts from './Posts';

describe('Posts Component', () => {
    const fakePosts = [
        { id: 1, body: 'no-1', title: 't-1' },
        { id: 3, body: 'no-3', title: '' },
        { id: 5, body: 'no-5', title: 'title-5' }
    ];

    afterEach(() => {
        // cleanup on exiting
        jest.restoreAllMocks();
    });

    test('full Posts rendering after request data', async () => {
        // const user = userEvent.setup();
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakePosts)
            } as Response)
        );

        renderComponent(<Posts />);

        const button = screen.getByRole('button', { name: 'Reload' });
        await act(async () => {
            expect(button).toBeInTheDocument();
        });

        await waitFor(() => {
            // expect(screen.getByText(/loading/i)).toBeInTheDocument();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        // await expect(Promise.resolve(spy.mock.results[0].value).then(data => data.json())).resolves.toBe(fakePosts);

        return spy.mock.results[0].value.then(async (data: any) => {
            const result = await data.json();
            expect(result).toBe(fakePosts);
            expect(result[1]).toEqual(
                expect.objectContaining({
                    id: expect.any(Number)
                })
            );
            expect(result[1]).toEqual(expect.objectContaining({ id: 3 }));
        });
    });
});
