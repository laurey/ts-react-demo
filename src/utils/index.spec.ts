// import fetch from 'jest-fetch-mock';
import { setupFetch } from '@/utils';

describe('Utils test', () => {
    const fakeData = {
        result: [
            {
                id: 1,
                userId: 1,
                body: 'body-body',
                title: 'title-title'
            },
            {
                id: 11,
                userId: 11,
                body: 'bd-bd',
                title: 'this-is-tt'
            }
        ],
        totalCount: 200
    };
    // beforeEach(() => {
    //     fetch.doMock();
    // });

    test('setupFetch method', async () => {
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeData)
            } as Response)
        );

        const response = await setupFetch('https://aa.bb.com/api/posts');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(response.result.length).toEqual(fakeData.result.length);
    });
});
