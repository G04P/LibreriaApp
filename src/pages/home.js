"use client";
import "@/styles/compiled/global.css";
import Link from "next/link";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

export default function Home() {
  return (
    <main className="container">
      <h1>Bienvenido a la biblioteca</h1>
      <p>Descubre un mundo de conocimiento a tu alcance. Explora nuestra colección, gestiona tus préstamos, y únete a nuestra comunidad.</p>
      
      <section className="icons-container">
        <div className="icon-box">
          <h3>Libros</h3>
          <button className="icon-button">
            <Link href={"/libros"}><FaBookBookmark className="icon-size" /></Link>
          </button>
        </div>
        <div className="icon-box">
          <h3>Autores</h3>
          <button className="icon-button">
           <Link href={"/autores"}><IoPerson className="icon-size" /></Link> 
          </button>
        </div>
      </section>
    </main>
  );
}
