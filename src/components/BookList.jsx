"use client";
import { useContext, useEffect, useState } from "react";
import styles from '../styles/compiled/BookList.module.css';
import { GlobalContext } from "@/Context/GlobalContext";
import AddBooks from "./AddBooks";
import UpdateLibro from "./UpdateLibro"; 
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BookList = () => {
    const [libros, setLibros] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false); 
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [selectedLibro, setSelectedLibro] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const librosPerPage = 12;
    const { getLibros, deleteLibro } = useContext(GlobalContext);

    const fetchLibros = async () => {
        try {
            const data = await getLibros();
            setLibros(data);
        } catch (error) {
            console.error('Error al cargar los libros:', error);
        }
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    const handleDeleteClick = (libro) => {
        setSelectedLibro(libro);
        setConfirmDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedLibro) {
            try {
                await deleteLibro(selectedLibro.id);
                fetchLibros();
                toast.success('Libro eliminado con éxito');
                setConfirmDeleteModal(false);
                setSelectedLibro(null);
            } catch (error) {
                toast.error('Error al eliminar el libro');
                console.error('Error al eliminar el libro:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteModal(false);
        setSelectedLibro(null);
    };

    const handleEditClick = (libro) => {
        setSelectedLibro(libro);
        setOpenUpdateModal(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdateModal(false);
        setSelectedLibro(null);
        fetchLibros(); 
    };

    const handleAddBookCreated = () => {
        fetchLibros(); 
    };


    const indexOfLastLibro = currentPage * librosPerPage;
    const indexOfFirstLibro = indexOfLastLibro - librosPerPage;
    const currentLibros = libros.slice(indexOfFirstLibro, indexOfLastLibro);
    const totalPages = Math.ceil(libros.length / librosPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className={styles['book-list-container']}>
            <h1 className={styles.title}>Lista de Libros</h1>
            <div className={styles.buttons}>
                <button className={styles.buttonAdd} onClick={() => setOpenModal(true)}>
                    Agregar Libro
                </button>
                <AddBooks isOpen={openModal} onClose={() => setOpenModal(false)} onBookCreated={handleAddBookCreated} />
            </div>
            <ul className={styles['book-list']}>
                {currentLibros.map(libro => (
                    <li key={libro.id} className={styles['book-item']}>
                        <span className={styles['book-info']}>
                            {libro.titulo} - {libro.descripcion}
                        </span>
                        <button className={styles['button-update']} onClick={() => handleEditClick(libro)}>
                            Editar Libro
                        </button>
                        <button className={styles['delete-button']} onClick={() => handleDeleteClick(libro)}>
                            Eliminar Libro
                        </button>
                    </li>
                ))}
            </ul>

            <Stack spacing={2} alignItems="center" className={styles.pagination}>
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="success"
                />
            </Stack>

            {confirmDeleteModal && (
                <div className={styles['confirm-delete-modal']}>
                    <div className={styles['modal-content']}>
                        <h2>¿Estás seguro de que deseas eliminar este libro?</h2>
                        <div className={styles['modal-buttons']}>
                            <button className={styles['cancel-button']} onClick={handleCancelDelete}>
                                Volver
                            </button>
                            <button className={styles['confirm-button']} onClick={handleConfirmDelete}>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <UpdateLibro
                isOpen={openUpdateModal}
                onClose={handleUpdateClose}
                libro={selectedLibro}
            />
        </div>
    );
};

export default BookList;
