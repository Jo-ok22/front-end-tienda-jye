import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClientMenu.module.css';

const ClienteMenu = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [ordenId, setOrdenId] = useState(null);
  const [productosEnOrden, setProductosEnOrden] = useState([]);

  useEffect(() => {
    // Cargar productos disponibles desde backend
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost/dashboard/tienda-php/server/index.php?controller=productos&action=read');
        const data = await res.json();
        if (data.success) {
          const productosConURL = data.data.map((p) => ({
            ...p,
            imagen: `http://localhost/dashboard/tienda-php/server/${p.imagen}`,
          }));
          setProductos(productosConURL);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();

    // Cargar orden y productos guardados en localStorage
    const orden_id = localStorage.getItem('orden_id');
    const productosGuardados = localStorage.getItem('orden_productos');
    if (orden_id) setOrdenId(parseInt(orden_id));
    if (productosGuardados) setProductosEnOrden(JSON.parse(productosGuardados));
  }, []);

  // Crear orden y guardar ID
  const crearOrden = async () => {
    const usuario_id = parseInt(localStorage.getItem('usuario_id'));
    if (!usuario_id) {
      alert('Usuario no identificado');
      return;
    }

    try {
      const res = await fetch('http://localhost/dashboard/tienda-php/server/index.php?controller=orden&action=create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id }),
      });

      if (!res.ok) {
        alert('Error en la respuesta del servidor');
        return;
      }

      const ordenIdTexto = await res.text();
      const newOrdenId = parseInt(ordenIdTexto);

      if (!newOrdenId || isNaN(newOrdenId)) {
        alert('Respuesta inválida del servidor');
        return;
      }

      setOrdenId(newOrdenId);
      localStorage.setItem('orden_id', newOrdenId);
      alert(`Orden creada correctamente (ID: ${newOrdenId})`);
    } catch (error) {
      console.error('Error al crear orden:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  // Agregar producto a la orden y enviar al backend
  const agregarProductoAOrden = async (producto) => {
    if (!ordenId) {
      alert('Primero crea una orden de compra');
      return;
    }

    // Construir lista actualizada
    const existente = productosEnOrden.find((p) => p.producto_id === producto.id);
    let nuevaLista;

    if (existente) {
      nuevaLista = productosEnOrden.map((p) =>
        p.producto_id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
    } else {
      nuevaLista = [...productosEnOrden, { producto_id: producto.id, cantidad: 1, nombre: producto.nombre }];
    }

    // Actualizar estado y localStorage
    setProductosEnOrden(nuevaLista);
    localStorage.setItem('orden_productos', JSON.stringify(nuevaLista));

    // Preparar para backend (usar lista actualizada)
    const productosParaBackend = nuevaLista.map(({ producto_id, cantidad }) => ({
      producto_id,
      cantidad,
    }));

    try {
      const res = await fetch('http://localhost/dashboard/tienda-php/server/index.php?controller=ordendetalle&action=add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orden_id: ordenId, productos: productosParaBackend }),
      });

      const data = await res.json();

      if (!data.success) {
        alert('Error al agregar producto a la orden');
      } else {
        alert(`Producto "${producto.nombre}" agregado a la orden.`);
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('No se pudo conectar con el servidor para agregar producto');
    }
  };

  // Guardar y redirigir a página de orden de compra sin borrar datos
  const pagarOrden = () => {
    if (!ordenId) {
      alert('No hay orden para pagar');
      return;
    }

    localStorage.setItem('orden_id', ordenId);
    localStorage.setItem('orden_productos', JSON.stringify(productosEnOrden));

    navigate('/ordenDeCompra');
  };

  return (
    <div className={styles.container}>
      <button onClick={crearOrden} className={styles.buyButton}>
        Crear orden de compra
      </button>

      <button onClick={pagarOrden} className={styles.buyButton} style={{ marginLeft: '10px' }}>
        Pagar orden
      </button>

      <h2>Menú del Cliente</h2>

      <div className={styles.productList}>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.card}>
            <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
            <h3>{producto.nombre}</h3>
            <p className={styles.description}>{producto.descripcion}</p>
            <p className={styles.price}>${parseFloat(producto.precio).toFixed(2)}</p>
            <button
              onClick={() => agregarProductoAOrden(producto)}
              className={styles.buyButton}
            >
              Agregar a orden de compra
            </button>
          </div>
        ))}
      </div>

      <h3>Productos en la orden:</h3>
      {productosEnOrden.length === 0 ? (
        <p>No hay productos agregados aún.</p>
      ) : (
        <ul>
          {productosEnOrden.map((p) => (
            <li key={p.producto_id}>
              {p.nombre} - Cantidad: {p.cantidad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteMenu;




























// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './ClientMenu.module.css';

// const ClienteMenu = () => {
//   const navigate = useNavigate();
//   const [productos, setProductos] = useState([]);

//   useEffect(() => {
//     const fetchProductos = async () => {
//       try {
//         const res = await fetch(
//           'http://localhost/dashboard/tienda-php/server/index.php?controller=productos&action=read'
//         );
//         const data = await res.json();
//         if (data.success) {
//           const productosConURL = data.data.map((p) => ({
//             ...p,
//             imagen: `http://localhost/dashboard/tienda-php/server/${p.imagen}`,
//           }));
//           setProductos(productosConURL);
//         }
//       } catch (error) {
//         console.error('Error al cargar productos:', error);
//       }
//     };

//     fetchProductos();
//   }, []);

//   // 🔵 Crear orden al apretar el botón
//   const crearOrden = async () => {
//   const usuario_id = parseInt(localStorage.getItem('usuario_id'));
//   if (!usuario_id) {
//     alert('Usuario no identificado');
//     return;
//   }

//   console.log('Creando orden para usuario ID:', usuario_id);

//   try {
//     const res = await fetch(
//       'http://localhost/dashboard/tienda-php/server/index.php?controller=orden&action=create',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ usuario_id }),
//       }
//     );

//     if (!res.ok) {
//       alert('Error en la respuesta del servidor');
//       return;
//     }

//     // La respuesta es un número plano, lo leemos como texto y lo convertimos a entero
//     const ordenIdTexto = await res.text();
//     const orden_id = parseInt(ordenIdTexto);

//     console.log('ID de orden recibido:', orden_id);

//     if (!orden_id || isNaN(orden_id)) {
//       alert('Respuesta inválida del servidor');
//       return;
//     }

//     localStorage.setItem('orden_id', orden_id);
//     alert(`Orden creada correctamente (ID: ${orden_id})`);
//   } catch (error) {
//     console.error('Error al crear orden:', error);
//     alert('No se pudo conectar con el servidor');
//   }
// };

//   return (
//     <div className={styles.container}>
//       {/* 🔵 Botón para crear orden */}
//       <button onClick={crearOrden} className={styles.buyButton}>
//         Crear orden de compra
//       </button>

//       <h2>Menú del Cliente</h2>
//       <div className={styles.productList}>
//         {productos.map((producto) => (
//           <div key={producto.id} className={styles.card}>
//             <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
//             <h3>{producto.nombre}</h3>
//             <p className={styles.description}>{producto.descripcion}</p>
//             <p className={styles.price}>${parseFloat(producto.precio).toFixed(2)}</p>
//             <button onClick={() => comprarProducto(producto)} className={styles.buyButton}>
//               Agregar a orden de compra
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClienteMenu;



