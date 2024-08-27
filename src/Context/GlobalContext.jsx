"use client";
import axios from "axios";
import { createContext } from "react";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
    const API_BASE_URL = 'http://localhost:5000/api';
    const authHeader = {
        headers: {
            Authorization: 'Basic ' + btoa('admin:root'), 
        },
    };
        
    const getLibros = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/libros`,authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los libros:', error);
            throw error;
        }
    };

    const getLibroById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/libros/${id}`,authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el libro:', error);
            throw error;
        }
    };

    const createLibro = async (libroData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/libros`, libroData, authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al crear el libro:', error);
            throw error;
        }
    };

    const deleteLibro = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/libros/${id}`,authHeader);
            return response.data;
        } catch (error) {
            console.error('No se pudo borrar el libro', error);
            throw error;
        }
    };

    const updateLibro = async (id, libroActualizado) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/libros/${id}`, libroActualizado, authHeader);
            return response.data;
        } catch (error) {
            console.error('No se pudo actualizar el libro', error);
            throw error;
        }
    };

    const getAllAutores = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/autores/all`,authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al obtener todos los autores', error);
            throw error;
        }
    };

    const createAutor = async (autorData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/autores`, autorData, authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al crear el autor', error);
            throw error;
        }
    };

    const deleteAutor = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/autores/${id}`,authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el autor', error);
            throw error;
        }
    };

    const updateAutor = async (id, autorActualizado) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/autores/${id}`, autorActualizado,authHeader);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el autor', error);
            throw error;
        }
    };
    const getAutorById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/autores/${id}`, authHeader);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el autor con ID ${id}:`, error);
            throw error;
        }
    };
    const getLibrosByAutorId = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/autores/${id}/libros`, authHeader);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener los libros para el autor con ID ${id}:`, error);
            throw error;
        }
    };
    const objectValue = {
        getLibros,
        getAllAutores,
        getLibroById,
        createLibro,
        deleteLibro,
        updateLibro,
        createAutor,
        deleteAutor,
        updateAutor,
        getLibrosByAutorId,
        getAutorById
    };

    return (
        <GlobalContext.Provider value={objectValue}>{children}</GlobalContext.Provider>
    );
};
