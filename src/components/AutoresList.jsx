"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../Context/GlobalContext";
import styles from "styles/compiled/AutoresList.module.css";
import AddAutores from "./AddAutores";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateAutor from "./UpdateAutor";
import Link from "next/link";
import Pagination from '@mui/material/Pagination';  
import Stack from '@mui/material/Stack';

const AutoresList = () => {
    const router = useRouter();
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [selectedAutor, setSelectedAutor] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false); 
    const [openModal, setOpenModal] = useState(false);
    const [autores, setAutores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const { getAllAutores, deleteAutor } = useContext(GlobalContext);
    
    const autoresPerPage = 12;  

    const fetchAutores = async () => {
        try {
            const data = await getAllAutores();
            setAutores(data);
            console.log(data);
        } catch (error) {
            console.error('Error al cargar los autores', error);
        }
    };

    useEffect(() => {
        fetchAutores();
    }, []);

    const handleDeleteClick = (autor) => {
        setSelectedAutor(autor);
        setConfirmDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedAutor) {
            try {
                await deleteAutor(selectedAutor.id);
                toast.success('Autor eliminado con éxito');
                setConfirmDeleteModal(false);
                setSelectedAutor(null);
                fetchAutores(); // Recargar la lista de autores después de eliminar
            } catch (error) {
                toast.error('Error al eliminar el Autor');
                console.error('Error al eliminar el Autor:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteModal(false);
        setSelectedAutor(null);
    };

    const handleEditClick = (autor) => {
        setSelectedAutor(autor);
        setOpenUpdateModal(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdateModal(false);
        setSelectedAutor(null);
        fetchAutores(); 
    };

    const handleAddAutorCreated = () => {
        fetchAutores();
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);  
    };

    const getRandomImage = () => `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

    const indexOfLastAutor = currentPage * autoresPerPage;
    const indexOfFirstAutor = indexOfLastAutor - autoresPerPage;
    const currentAutores = autores.slice(indexOfFirstAutor, indexOfLastAutor);

    return (
        <div className={styles.autoresList}>
            <h1 className={styles.title}>Lista de Autores</h1>
            <div className={styles.buttons}>
                <button className={styles.buttonAdd} onClick={() => setOpenModal(true)}>
                    Agregar Autor
                </button>
                <AddAutores isOpen={openModal} onClose={() => setOpenModal(false)} onAutorCreated={handleAddAutorCreated} />
            </div>
            <div className={styles.cardsContainer}>
            {currentAutores.map(autor => (
    <div key={autor.id} className={styles.card}>
        <button className={styles.trashButton} onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(autor);
        }}>
            <FaTrash />
        </button>
        <img src={getRandomImage()} alt="Imagen del autor" className={styles.image} />
        <div className={styles.info}>
            <h3 className={styles.name}>{autor.nombre}</h3>
            <p className={styles.details}>Fecha de Nacimiento: {new Date(autor.fechaNacimiento).toLocaleDateString()}</p>
            <p className={styles.details}>Nacionalidad: {autor.nacionalidad}</p>
        <Link href={`/autores/${autor.id}`}>
            <button className={styles.detailsButton}>Detalles</button>
        </Link>
            <button className={styles.editButton} onClick={(e) => {
                e.stopPropagation();
                handleEditClick(autor);
            }}>
                <FaEdit /> Editar
            </button>
        </div>
    </div>
))}
            </div>
            <Stack spacing={2} alignItems="center" sx={{ marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(autores.length / autoresPerPage)} 
                    page={currentPage}
                    onChange={handlePageChange}
                    color="success" 
                />
            </Stack>
            {confirmDeleteModal && (
                <div className={styles['confirm-delete-modal']}>
                    <div className={styles['modal-content']}>
                        <h2>¿Estás seguro de que deseas eliminar este autor?</h2>
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
            <UpdateAutor
                isOpen={openUpdateModal}
                onClose={handleUpdateClose}
                autor={selectedAutor}
            />
        </div>
    );
};

export default AutoresList;
