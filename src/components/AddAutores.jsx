"use client";
import React, { useState, useContext } from 'react';
import styles from '../styles/compiled/AddAutor.module.css';
import { toast } from 'react-toastify';
import { GlobalContext } from '@/Context/GlobalContext';
import { IoMdClose } from "react-icons/io";

const AddAutores = ({ onClose, isOpen, onAutorCreated }) => {
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [id , setId ] = useState('')
    const { createAutor } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const autorData = {
            nombre,
            fechaNacimiento,
            nacionalidad,
            id : parseInt(id),
        };

        try {
            await createAutor(autorData);
            toast.success('Autor creado con éxito');
            setNombre('');
            setFechaNacimiento('');
            setNacionalidad('');
            setId('');
            onClose();
            if (onAutorCreated) {
                onAutorCreated(); // Llama a esta función para refrescar la lista
            }
        } catch (error) {
            toast.error('Error al crear el Autor');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
            <button className={styles.closeButton} onClick={onClose}><IoMdClose /></button>
            <h2>Agregar Nuevo Autor</h2>
            <form onSubmit={handleSubmit} className={styles.addAutorForm}>
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
                    <label htmlFor="Fecha de Nacimiento">Fecha de Nacimiento:</label>
                    <input
                        id="fechaNacimiento"
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                    ></input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="Nacionalidad">Nacionalidad:</label>
                    <input
                        id="nacionalidad"
                        type="text"
                        value={nacionalidad}
                        onChange={(e) => setNacionalidad(e.target.value)}
                        required
                    />
                </div>
            
                <button className={styles.submitButton} type="submit">
                    Agregar Autor
                </button>
            </form>
        </div>
    </div>
    );
};

export default AddAutores;
