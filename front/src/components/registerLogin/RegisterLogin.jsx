import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api'
import styles from './RegisterLogin.module.css';

const RegisterLogin = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    rol: '',
    foto: null,
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setForm((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async () => {
    setError(null);

    // Validación básica
    const campos = ['nombre', 'apellido', 'dni', 'email', 'password', 'rol'];
    for (let campo of campos) {
      if (!form[campo]) {
        setError('Todos los campos son obligatorios.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      }

      const response = await fetch(
        `${API_BASE_URL}?controller=usuarios&action=register`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Usuario registrado correctamente');

        setTimeout(() => {
          if (form.rol === 'cliente') {
            navigate('/clienteMenu');
          } else if (form.rol === 'admin') {
            navigate('/panelAdmin');
          }
        }, 1500);
      } else {
        setError(data.error || 'Error en el registro');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Registro de Usuario</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className={styles.input}
          onChange={handleChange}
        />
        <select
          name="rol"
          className={styles.input}
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>
            Selecciona un rol
          </option>
          <option value="cliente">Cliente</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="file"
          name="foto"
          accept="image/*"
          className={styles.input}
          onChange={handleChange}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="button"
          className={styles.loginBtn}
          onClick={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarme'}
        </button>

        <button
          type="button"
          className={styles.switchBtn}
          onClick={onSwitchToLogin}
          disabled={isSubmitting}
        >
          Ya tengo cuenta
        </button>
      </div>
    </div>
  );
};

export default RegisterLogin;
//funciona ✔














// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './RegisterLogin.module.css';
// //import { API_BASE_URL } from '../../api/api';

// const RegisterLogin = ({ onSwitchToLogin }) => {
//   const [form, setForm] = useState({
//     nombre: '',
//     apellido: '',
//     dni: '',
//     email: '',
//     password: '',
//     rol: '',
//     foto: null,
//   });
//   const [error, setError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // <-- nuevo estado
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     if (e.target.name === 'foto') {
//       setForm({ ...form, foto: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleRegister = async () => {
//     if (isSubmitting) return; // evita envíos mientras está enviando
//     setError(null);

//     const camposRequeridos = ['nombre', 'apellido', 'dni', 'email', 'password', 'rol'];
//     for (let campo of camposRequeridos) {
//       if (!form[campo]) {
//         setError('Todos los campos son obligatorios.');
//         return;
//       }
//     }

//     setIsSubmitting(true); // comienza el proceso

//     try {
//       const formData = new FormData();
//       for (const key in form) {
//         if (key === 'foto') {
//           if (form[key]) {
//             formData.append(key, form[key]);
//           }
//         } else {
//           formData.append(key, form[key] || '');
//         }
//       }

//       const res = await fetch(`${API_BASE_URL}?controller=usuarios&action=register`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         alert('Usuario registrado correctamente');
//         setTimeout(() => {
//           if (form.rol === 'cliente') {
//             navigate('/cliente');
//           } else if (form.rol === 'admin') {
//             navigate('/admin');
//           }
//         }, 3000);
//       } else {
//         setError(data.message || 'Error al registrarse');
//       }
//     } catch (err) {
//       setError('Error al conectar con el servidor');
//     } finally {
//       setIsSubmitting(false); // termina el proceso
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formBox}>
//         <h2>Registrate</h2>
//         <input name="nombre" placeholder="Nombre" className={styles.input} onChange={handleChange} />
//         <input name="apellido" placeholder="Apellido" className={styles.input} onChange={handleChange} />
//         <input name="dni" placeholder="DNI" className={styles.input} onChange={handleChange} />
//         <input name="email" placeholder="Email" type="email" className={styles.input} onChange={handleChange} />
//         <input name="password" placeholder="Contraseña" type="password" className={styles.input} onChange={handleChange} />
//         <select name="rol" className={styles.input} defaultValue="" onChange={handleChange}>
//           <option value="" disabled>Seleccioná un rol</option>
//           <option value="cliente">Cliente</option>
//           <option value="admin">Admin</option>
//         </select>
//         <input name="foto" type="file" accept="image/*" className={styles.input} onChange={handleChange} />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button
//           type="button"
//           className={styles.loginBtn}
//           onClick={handleRegister}
//           disabled={isSubmitting}  // <--- deshabilita botón mientras envía
//         >
//           {isSubmitting ? 'Registrando...' : 'Registrarme'}
//         </button>
//         <button type="button" className={styles.switchBtn} onClick={onSwitchToLogin} disabled={isSubmitting}>
//           Ya tengo cuenta
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RegisterLogin;
