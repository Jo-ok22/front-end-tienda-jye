import React from 'react';
import styles from './OrdenCompra.module.css';

const comprasEjemplo = [
  {
    nombre: 'Auriculares Gamer',
    precio: 9500,
    imagen: 'https://cdn-icons-png.flaticon.com/512/1048/1048949.png'
  },
  {
    nombre: 'Teclado RGB',
    precio: 14500,
    imagen: 'https://cdn-icons-png.flaticon.com/512/679/679720.png'
  },
  {
    nombre: 'Mouse inalámbrico',
    precio: 6700,
    imagen: 'https://cdn-icons-png.flaticon.com/512/741/741407.png'
  }
];

const OrdenDeCompra = () => {
  const total = comprasEjemplo.reduce((acc, item) => acc + Number(item.precio), 0);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Resumen de tu compra</h2>

        {comprasEjemplo.length === 0 ? (
          <p className={styles.empty}>No hay productos en la orden.</p>
        ) : (
          <>
            <ul className={styles.lista}>
              {comprasEjemplo.map((item, index) => (
                <li key={index} className={styles.item}>
                  <img src={item.imagen} alt={item.nombre} className={styles.img} />
                  <div>
                    <h4>{item.nombre}</h4>
                    <p>${item.precio}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.total}>
              <strong>Total:</strong> ${total}
            </div>

            <button className={styles.confirmBtn}>Confirmar compra</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdenDeCompra;


