"use client";
import React, { useContext, useEffect, useState } from 'react';
import { toast} from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import styles from "../styles/compiled/updates.module.css";
import { GlobalContext } from '@/Context/GlobalContext';

const UpdateLibro = ({ onClose, isOpen, libro }) => {
    const { updateLibro } = useContext(GlobalContext); 
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaPublicacion, setFechaPublicacion] = useState('');
    const [autorID, setAutorID] = useState('');

    useEffect(() => {
        if (libro) {
            setTitulo(libro.titulo || '');
            setDescripcion(libro.descripcion || '');
            setFechaPublicacion(libro.fechaPublicacion?.split('T')[0] || ''); 
            setAutorID(libro.autorID || '');
        }
    }, [libro]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const libroActualizado = {
            Titulo: titulo,
            Descripcion: descripcion,
            FechaPublicacion: fechaPublicacion,
            AutorID: parseInt(autorID, 10),
        };

        try {
            await updateLibro(libro.id, libroActualizado);
            toast.success('Libro actualizado con éxito');
            onClose(); 
        } catch (error) {
            toast.error('Error al actualizar el libro');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={onClose}><IoMdClose /></button>
                <h2>Actualizar Libro</h2>
                <form onSubmit={handleSubmit} className={styles.updateBookForm}>
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
                        Actualizar Libro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateLibro;
