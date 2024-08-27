"use client";
import React, { useState, useContext } from 'react';
import styles from '../styles/compiled/AddBook.module.css';
import { toast } from 'react-toastify';
import { GlobalContext } from '@/Context/GlobalContext';
import { IoMdClose } from "react-icons/io";

const AddBooks = ({ onClose, isOpen, onBookCreated }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaPublicacion, setFechaPublicacion] = useState('');
    const [autorID, setAutorID] = useState('');
    const { createLibro } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const libroData = {
            titulo,
            descripcion,
            fechaPublicacion,
            autorID: parseInt(autorID),
        };

        try {
            await createLibro(libroData);
            toast.success('Libro creado con éxito');
            setTitulo('');
            setDescripcion('');
            setFechaPublicacion('');
            setAutorID('');
            onClose();
            if (onBookCreated) {
                onBookCreated(); // Llama a esta función para refrescar la lista
            }
        } catch (error) {
            toast.error('Error al crear el libro');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={onClose}><IoMdClose /></button>
                <h2>Agregar Nuevo Libro</h2>
                <form onSubmit={handleSubmit} className={styles.addBookForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="titulo">Título:</label>
                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fechaPublicacion">Fecha de Publicación:</label>
                        <input
                            id="fechaPublicacion"
                            type="date"
                            value={fechaPublicacion}
                            onChange={(e) => setFechaPublicacion(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="autorID">ID del Autor:</label>
                        <input
                            id="autorID"
                            type="number"
                            value={autorID}
                            onChange={(e) => setAutorID(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.submitButton} type="submit">
                        Agregar Libro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
