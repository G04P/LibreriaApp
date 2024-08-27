"use client";
import React, { useContext, useEffect, useState } from 'react';
import { toast} from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import styles from "../styles/compiled/updates.module.css";
import { GlobalContext } from '@/Context/GlobalContext';

const UpdateAutor = ({ onClose, isOpen, autor }) => {
    const { updateAutor } = useContext(GlobalContext); 
    const [nombre, setNombre] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (autor) {
            setNombre(autor.nombre || '');
            setNacionalidad(autor.nacionalidad || '');
            setFechaNacimiento(autor.fechaNacimiento?.split('T')[0] || ''); 
            setId(autor.id || '');
        }
    }, [autor]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const autorActualizado = {
            Nombre: nombre,
            Nacionalidad: nacionalidad,
            FechaNacimiento: fechaNacimiento,
            Id: parseInt(id, 10),
        };

        try {
            await updateAutor(autor.id, autorActualizado);
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
                <h2>Actualizar Autor</h2>
                <form onSubmit={handleSubmit} className={styles.updateBookForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nacionalidad">Nacionalidad:</label>
                        <textarea
                            id="nacionalidad"
                            value={nacionalidad}
                            onChange={(e) => setNacionalidad(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                        <input
                            id="fechaNacimiento"
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
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

export default UpdateAutor;
