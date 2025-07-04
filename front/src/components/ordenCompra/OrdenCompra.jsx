import React, { useState } from 'react';
import styles from './OrdenCompra.module.css';

const OrdenDeCompra = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [codigoPago, setCodigoPago] = useState('');
  const [resultadoPago, setResultadoPago] = useState('');
  const [ordenVisible, setOrdenVisible] = useState(false);

  const orden_id = localStorage.getItem('orden_id');

  const verOrden = async () => {
    if (!orden_id) {
      alert('No hay una orden activa.');
      return;
    }

    try {
      const res = await fetch(
        'http://localhost/dashboard/tienda-php/server/index.php?controller=ordendetalle&action=viewByOrden',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orden_id: parseInt(orden_id) }),
        }
      );

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setProductos(data);
        setOrdenVisible(true);
        const totalCalculado = data.reduce((acc, p) => acc + parseFloat(p.precio) * p.cantidad, 0);
        setTotal(totalCalculado);
      } else {
        alert('La orden no contiene productos.');
      }
    } catch (error) {
      console.error('Error al cargar orden:', error);
      alert('No se pudo cargar la orden.');
    }
  };

  const pagarOrden = async () => {
    if (!codigoPago) {
      alert('Ingrese un código de pago');
      return;
    }

    try {
      const res = await fetch(
        'http://localhost/dashboard/tienda-php/server/index.php?controller=orden&action=pay',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orden_id: parseInt(orden_id),
            codigo_pago: codigoPago,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setResultadoPago('✅ Pago exitoso');
        // Podés limpiar localStorage si querés acá.
      } else {
        setResultadoPago('❌ Pago rechazado');
      }
    } catch (error) {
      console.error('Error al pagar:', error);
      setResultadoPago('❌ Error al procesar el pago');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Resumen de tu compra</h2>

        <button onClick={verOrden} className={styles.confirmBtn}>
          Ver orden a pagar
        </button>

        {ordenVisible && (
          <>
            {productos.length === 0 ? (
              <p className={styles.empty}>No hay productos en la orden.</p>
            ) : (
              <>
                <ul className={styles.lista}>
                  {productos.map((item, index) => (
                    <li key={index} className={styles.item}>
                      <div>
                        <h4>{item.nombre}</h4>
                        <p>Precio: ${parseFloat(item.precio).toFixed(2)}</p>
                        <p>Cantidad: {item.cantidad}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles.total}>
                  <strong>Total:</strong> ${total.toFixed(2)}
                </div>

                <div className={styles.pagoBox}>
                  <input
                    type="text"
                    value={codigoPago}
                    onChange={(e) => setCodigoPago(e.target.value)}
                    placeholder="Ingrese código de pago"
                    className={styles.input}
                  />
                  <button onClick={pagarOrden} className={styles.confirmBtn}>
                    Pagar
                  </button>
                </div>

                {resultadoPago && <p className={styles.resultado}>{resultadoPago}</p>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdenDeCompra;
