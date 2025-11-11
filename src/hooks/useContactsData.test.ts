import { renderHook, act } from '@testing-library/react';
import { useContactsData } from './useContactsData';
import apiData from '../api';
import mockData from '../mockData.json';
import { Contact } from 'src/types';

jest.mock('../api');
jest.mock('../utils', () => ({
    scrollToBottom: jest.fn(),
}));

const mockApiData = apiData as jest.MockedFunction<typeof apiData>;

const mockContacts: Contact[] = mockData.slice(0, 2);

describe('useContactsData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch contacts on mount', async () => {
        mockApiData.mockResolvedValueOnce({
            contacts: mockContacts,
            hasNextBatch: true,
        });

        const { result } = renderHook(() => useContactsData());

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(mockContacts);
        expect(result.current.hasNextBatch).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle errors', async () => {
        const error = new Error('API Error');
        mockApiData.mockRejectedValueOnce(error);

        const { result } = renderHook(() => useContactsData({ retry: 0 }));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.error).toEqual(error);
        expect(result.current.data).toEqual([]);
        expect(result.current.isLoading).toBe(false);
    });

    it('should fetch more contacts', async () => {
        const secondBatch = mockData.slice(2, 4);

        mockApiData
            .mockResolvedValueOnce({
                contacts: mockContacts,
                hasNextBatch: true,
            })
            .mockResolvedValueOnce({
                contacts: secondBatch,
                hasNextBatch: false,
            });

        const { result } = renderHook(() => useContactsData());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toHaveLength(2);

        await act(async () => {
            result.current.fetchMore();
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toHaveLength(4);
        expect(result.current.hasNextBatch).toBe(false);
    });

    it('should refetch contacts', async () => {
        const error = new Error('API Error');
        mockApiData.mockRejectedValueOnce(error).mockResolvedValueOnce({
            contacts: mockContacts,
            hasNextBatch: true,
        });

        const { result } = renderHook(() => useContactsData({ retry: 0 }));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.error).toEqual(error);

        await act(async () => {
            result.current.refetch();
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(mockContacts);
        expect(result.current.error).toBeNull();
        expect(result.current.retryCount).toBe(0);
    });
});
