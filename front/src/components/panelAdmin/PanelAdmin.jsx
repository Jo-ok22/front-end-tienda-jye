import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/api.js';
import styles from './PanelAdmin.module.css';

const PanelAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
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
      const res = await fetch(`${API_BASE_URL}?controller=productos&action=read`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProductos(data.data);
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

    console.log('Modo edición:', modoEdicion, 'ID:', formData.id);

    if (modoEdicion && (!formData.id || formData.id.trim() === '')) {
      alert('El ID es requerido para actualizar');
      return;
    }
    if (!formData.nombre || !formData.descripcion || !formData.precio) {
      alert('Completar todos los campos obligatorios');
      return;
    }

    setCargando(true);
    try {
      if (!modoEdicion) {
        if (!formData.imagen) {
          alert('La imagen es obligatoria para crear un producto');
          setCargando(false);
          return;
        }

        const datos = new FormData();
        datos.append('nombre', formData.nombre);
        datos.append('descripcion', formData.descripcion);
        datos.append('precio', formData.precio);
        datos.append('imagen', formData.imagen);

        const url = `${API_BASE_URL}?controller=productos&action=create`;

        const res = await fetch(url, {
          method: 'POST',
          body: datos,
        });

        const data = await res.json();
        if (data.success) {
          alert('Producto creado');
          setFormData({ id: '', nombre: '', descripcion: '', precio: '', imagen: null });
          obtenerProductos();
        } else {
          alert(data.error || data.message || 'Error al crear producto');
        }
      } else {
        if (formData.imagen) {
          const datosImg = new FormData();
          datosImg.append('id', formData.id);
          datosImg.append('nombre', formData.nombre);
          datosImg.append('descripcion', formData.descripcion);
          datosImg.append('precio', formData.precio);
          datosImg.append('imagen', formData.imagen);
          datosImg.append('imagen_actual', productoEditando.imagen);

          const urlImg = `${API_BASE_URL}?controller=productos&action=updateImagen`;

          const resImg = await fetch(urlImg, {
            method: 'POST',
            body: datosImg,
          });

          const dataImg = await resImg.json();

          if (dataImg.success) {
            alert('Producto actualizado con imagen nueva');
            setFormData({ id: '', nombre: '', descripcion: '', precio: '', imagen: null });
            setModoEdicion(false);
            setProductoEditando(null);
            obtenerProductos();
          } else {
            alert(dataImg.error || dataImg.message || 'Error al actualizar producto con imagen');
          }
        } else {
          const datos = {
            id: formData.id,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: formData.precio,
            imagen_actual: productoEditando.imagen,
          };

          const urlDatos = `${API_BASE_URL}?controller=productos&action=updateDatos`;

          const resDatos = await fetch(urlDatos, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
          });

          const dataDatos = await resDatos.json();

          if (dataDatos.success) {
            alert('Producto actualizado (sin cambiar imagen)');
            setFormData({ id: '', nombre: '', descripcion: '', precio: '', imagen: null });
            setModoEdicion(false);
            setProductoEditando(null);
            obtenerProductos();
          } else {
            alert(dataDatos.error || dataDatos.message || 'Error al actualizar producto');
          }
        }
      }
    } catch (err) {
      alert('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (prod) => {
    setFormData({
      id: prod.id.toString(),
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
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Producto eliminado');
        obtenerProductos();
      } else {
        alert(data.error || data.message || 'Error al eliminar');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Panel de Administración</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {modoEdicion && (
          <input
            name="id"
            placeholder="ID"
            value={formData.id || ''}
            readOnly
            className={styles.inputId}
          />
        )}
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
          {cargando
            ? (modoEdicion ? 'Actualizando...' : 'Creando...')
            : (modoEdicion ? 'Actualizar' : 'Crear')} Producto
        </button>
      </form>

      <div className={styles.grid}>
        {productos.map((prod) => {
          const urlImagen = prod.imagen
            ? (prod.imagen.startsWith('http')
                ? prod.imagen
                : `http://localhost/dashboard/tienda-php/server/${prod.imagen}`)
            : null;

          return (
            <div key={prod.id} className={styles.card}>
              {urlImagen && (
                <img src={urlImagen} alt={prod.nombre} className={styles.imagen} />
              )}
              <p className={styles.id}><strong>ID</strong> {prod.id}</p>
              <h3>{prod.nombre}</h3>
              <p className={styles.description}>{prod.descripcion}</p>
              <p className={styles.price}>${parseFloat(prod.precio).toFixed(2)}</p>

              <div className={styles.actions}>
                <button onClick={() => handleEditar(prod)}>Editar</button>
                <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PanelAdmin;


//funciona todo ✔