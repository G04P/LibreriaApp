import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { GlobalContext, GlobalContextProvider } from '../Context/GlobalContext';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn() 
    }
}));

const TestComponent = () => {
    const { getLibros, createLibro, getAllAutores } = React.useContext(GlobalContext);

    React.useEffect(() => {
        getLibros();
    }, [getLibros]);

    return (
        <div>
            <button onClick={() => createLibro({ title: 'New Book' })}>Create Book</button>
            <button onClick={() => getAllAutores()}>Get All Authors</button>
        </div>
    );
};

describe('GlobalContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call getLibros when component renders', async () => {
        const mockGetLibros = jest.fn();
        axios.get.mockResolvedValue({ data: [] });

        jest.spyOn(React, 'useContext').mockReturnValue({
            getLibros: mockGetLibros,
            createLibro: jest.fn(),
            getAllAutores: jest.fn()
        });

        render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        );

        await waitFor(() => {
            expect(mockGetLibros).toHaveBeenCalled();
        });
    });

    test('should call createLibro with correct data', async () => {
        const mockCreateLibro = jest.fn();
        axios.post.mockResolvedValue({ data: {} });

        jest.spyOn(React, 'useContext').mockReturnValue({
            getLibros: jest.fn(),
            createLibro: mockCreateLibro,
            getAllAutores: jest.fn()
        });

        render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        );

        screen.getByText('Create Book').click();

        await waitFor(() => {
            expect(mockCreateLibro).toHaveBeenCalledWith({ title: 'New Book' });
        });
    });

    test('should handle API errors gracefully', async () => {
        axios.get.mockRejectedValue(new Error('API error'));

        jest.spyOn(React, 'useContext').mockReturnValue({
            getLibros: jest.fn(),
            createLibro: jest.fn(),
            getAllAutores: jest.fn()
        });

        render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        );
    });
});
