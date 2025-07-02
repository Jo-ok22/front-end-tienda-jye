import React, { useState } from 'react';
import styles from './ClientMenu.module.css';

const mockProductos = [
  {
    id: 1,
    nombre: 'Auriculares Gamer',
    descripcion: 'Sonido envolvente 7.1 y micrófono retráctil.',
    precio: 9500,
    imagen: 'https://cdn-icons-png.flaticon.com/512/1048/1048949.png'
  },
  {
    id: 2,
    nombre: 'Teclado Mecánico RGB',
    descripcion: 'Interruptores blue y retroiluminación personalizada.',
    precio: 14500,
    imagen: 'https://cdn-icons-png.flaticon.com/512/679/679720.png'
  },
  {
    id: 3,
    nombre: 'Mouse Inalámbrico',
    descripcion: 'Alta precisión y batería de larga duración.',
    precio: 6700,
    imagen: 'https://cdn-icons-png.flaticon.com/512/741/741407.png'
  }
];

const ClienteMenu = () => {
  const [productos] = useState(mockProductos);
  const [compras, setCompras] = useState([]);

  const comprarProducto = (producto) => {
    setCompras([...compras, producto]);
    alert(`¡Compraste: ${producto.nombre}!`);
  };

  return (
    <div className={styles.container}>
      <h2>Menú del Cliente</h2>
      <div className={styles.productList}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.card}>
            <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
            <h3>{producto.nombre}</h3>
            <p className={styles.description}>{producto.descripcion}</p>
            <p className={styles.price}>${producto.precio}</p>
            <button onClick={() => comprarProducto(producto)} className={styles.buyButton}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClienteMenu;
