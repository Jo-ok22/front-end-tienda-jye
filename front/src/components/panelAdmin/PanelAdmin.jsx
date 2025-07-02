import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/api.js'
import styles from './PanelAdmin.module.css';

const PanelAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: null,
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}?controller=productos&action=list`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProductos(data);
      }
    } catch {
      alert('Error en conexión al cargar productos');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData(prev => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.descripcion || !formData.precio) {
      alert('Completar todos los campos obligatorios');
      return;
    }

    setCargando(true);
    try {
      const datos = new FormData();
      datos.append('nombre', formData.nombre);
      datos.append('descripcion', formData.descripcion);
      datos.append('precio', formData.precio);

      if (formData.imagen) {
        datos.append('imagen', formData.imagen);
      }

      let url = `${API_BASE_URL}?controller=productos`;
      let action = 'create';

      if (modoEdicion && productoEditando) {
        action = 'update';
        datos.append('id', productoEditando.id);
      }

      url += `&action=${action}`;

      const res = await fetch(url, {
        method: 'POST',
        body: datos,
      });

      const data = await res.json();

      if (data.success) {
        alert(modoEdicion ? 'Producto actualizado' : 'Producto creado');
        setFormData({ nombre: '', descripcion: '', precio: '', imagen: null });
        setModoEdicion(false);
        setProductoEditando(null);
        obtenerProductos();
      } else {
        alert(data.message || 'Error en la operación');
      }
    } catch (err) {
      alert('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (prod) => {
    setFormData({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      imagen: null,
    });
    setProductoEditando(prod);
    setModoEdicion(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}?controller=productos&action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Producto eliminado');
        obtenerProductos();
      } else {
        alert(data.message || 'Error al eliminar');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Panel de Administración</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <input
          name="imagen"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? (modoEdicion ? 'Actualizando...' : 'Creando...') : (modoEdicion ? 'Actualizar' : 'Crear')} Producto
        </button>
      </form>

      <div className={styles.grid}>
        {productos.map((prod) => (
          <div key={prod.id} className={styles.card}>
            {prod.imagen && (
              <img
                src={prod.imagen.startsWith('http')
                  ? prod.imagen
                  : `http://localhost/dashboard/tienda-php/server/uploads/${prod.imagen}`}
                alt={prod.nombre}
              />
            )}
            <h4>{prod.nombre}</h4>
            <p>{prod.descripcion}</p>
            <p><strong>${prod.precio}</strong></p>
            <div className={styles.actions}>
              <button onClick={() => handleEditar(prod)}>Editar</button>
              <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelAdmin;










// import React, { useEffect, useState } from 'react';
// import styles from './PanelAdmin.module.css';

// const PanelAdmin = () => {
//   const [productos, setProductos] = useState([]);
//   const [formData, setFormData] = useState({
//     nombre: '',
//     descripcion: '',
//     precio: '',
//     imagen: ''
//   });
//   const [modoEdicion, setModoEdicion] = useState(false);
//   const [productoEditando, setProductoEditando] = useState(null);

//   // Cargar productos al montar
//   useEffect(() => {
//     obtenerProductos();
//   }, []);

//   const obtenerProductos = async () => {
//     const res = await fetch(API_URL);
//     const data = await res.json();
//     setProductos(data);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'imagen') {
//       setFormData({ ...formData, imagen: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const datos = new FormData();
//     datos.append('nombre', formData.nombre);
//     datos.append('descripcion', formData.descripcion);
//     datos.append('precio', formData.precio);
//     if (formData.imagen) {
//       datos.append('imagen', formData.imagen);
//     }

//     const config = {
//       method: modoEdicion ? 'POST' : 'POST',
//       body: datos,
//     };

//     let url = API_URL;

//     if (modoEdicion && productoEditando) {
//       datos.append('id', productoEditando.id); // necesario si usás el mismo endpoint
//       url += `&accion=editar`;
//     } else {
//       url += `&accion=crear`;
//     }

//     await fetch(url, config);
//     setFormData({ nombre: '', descripcion: '', precio: '', imagen: '' });
//     setModoEdicion(false);
//     setProductoEditando(null);
//     obtenerProductos();
//   };

//   const handleEditar = (producto) => {
//     setFormData({
//       nombre: producto.nombre,
//       descripcion: producto.descripcion,
//       precio: producto.precio,
//       imagen: ''
//     });
//     setProductoEditando(producto);
//     setModoEdicion(true);
//   };

//   const handleEliminar = async (id) => {
//     if (window.confirm('¿Seguro que querés eliminar este producto?')) {
//       await fetch(`${API_URL}&accion=eliminar`, {
//         method: 'POST',
//         body: JSON.stringify({ id }),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       obtenerProductos();
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Panel de Administración</h2>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} required />
//         <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleInputChange} required />
//         <input name="precio" type="number" placeholder="Precio" value={formData.precio} onChange={handleInputChange} required />
//         <input name="imagen" type="file" accept="image/*" onChange={handleInputChange} />

//         <button type="submit">{modoEdicion ? 'Actualizar' : 'Crear'} Producto</button>
//       </form>

//       <div className={styles.grid}>
//         {productos.map((prod) => (
//           <div key={prod.id} className={styles.card}>
//             {prod.imagen && <img src={prod.imagen} alt={prod.nombre} />}
//             <h4>{prod.nombre}</h4>
//             <p>{prod.descripcion}</p>
//             <p><strong>${prod.precio}</strong></p>
//             <div className={styles.actions}>
//               <button onClick={() => handleEditar(prod)}>Editar</button>
//               <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PanelAdmin;
