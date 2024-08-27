import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import styles from '../../styles/compiled/AutorDetail.module.css';
import { GlobalContext } from "@/Context/GlobalContext";

const AutorDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { getLibrosByAutorId, getAutorById } = useContext(GlobalContext); 
    const [autor, setAutor] = useState(null);
    const [libros, setLibros] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchAutorAndLibros(id);
        }
    }, [id]);

    const fetchAutorAndLibros = async (id) => {
        try {
            const autorData = await getAutorById(id);
            setAutor(autorData);

            const librosData = await getLibrosByAutorId(id);
            setLibros(librosData);
        } catch (error) {
            console.error('Error al cargar los detalles del autor y sus libros', error);
            setError('No se pudo cargar los detalles del autor y sus libros. Inténtalo de nuevo más tarde.');
        }
    };

    if (router.isFallback) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!autor) {
        return <div>Cargando detalles del autor...</div>;
    }

    return (
        <div className={styles.autorDetail}>
            <h1 className={styles.title}>{autor.nombre}</h1>
            <p className={styles.autorInfo}>Fecha de Nacimiento: {new Date(autor.fechaNacimiento).toLocaleDateString()}</p>
            <p className={styles.autorInfo}>Nacionalidad: {autor.nacionalidad}</p>
            <h1 className={styles.title}>Libros del autor</h1>
            {libros.length > 0 ? (
                <ul className={styles.librosList}>
                    {libros.map(libro => (
                        <li key={libro.id} className={styles.libroItem}>
                            <h3>{libro.titulo}</h3>
                            <p>{libro.descripcion}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Este autor no tiene libros asociados.</p>
            )}
        </div>
    );
};

export default AutorDetail;
