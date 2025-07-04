import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api';
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

        // GUARDAR ID EN LOCALSTORAGE
        localStorage.setItem('usuario_id', data.id);
        console.log('Usuario ID:', data.id); // DEBUG

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

        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} className={styles.input} />
        <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} className={styles.input} />
        <input type="text" name="dni" placeholder="DNI" onChange={handleChange} className={styles.input} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className={styles.input} />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className={styles.input} />
        <select name="rol" className={styles.input} defaultValue="" onChange={handleChange}>
          <option value="" disabled>Selecciona un rol</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Admin</option>
        </select>
        <input type="file" name="foto" accept="image/*" onChange={handleChange} className={styles.input} />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className={styles.loginBtn} onClick={handleRegister} disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrarme'}
        </button>

        <button className={styles.switchBtn} onClick={onSwitchToLogin} disabled={isSubmitting}>
          Ya tengo cuenta
        </button>
      </div>
    </div>
  );
};

export default RegisterLogin;









// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '../../api/api'
// import styles from './RegisterLogin.module.css';

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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'foto') {
//       setForm((prev) => ({ ...prev, foto: files[0] }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleRegister = async () => {
//     setError(null);

//     // Validación básica
//     const campos = ['nombre', 'apellido', 'dni', 'email', 'password', 'rol'];
//     for (let campo of campos) {
//       if (!form[campo]) {
//         setError('Todos los campos son obligatorios.');
//         return;
//       }
//     }

//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
//       for (const key in form) {
//         if (form[key]) {
//           formData.append(key, form[key]);
//         }
//       }

//       const response = await fetch(
//         `${API_BASE_URL}?controller=usuarios&action=register`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.ok && data.success) {
//         alert('Usuario registrado correctamente');

//         setTimeout(() => {
//           if (form.rol === 'cliente') {
//             navigate('/clienteMenu');
//           } else if (form.rol === 'admin') {
//             navigate('/panelAdmin');
//           }
//         }, 1500);
//       } else {
//         setError(data.error || 'Error en el registro');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('No se pudo conectar con el servidor.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formBox}>
//         <h2>Registro de Usuario</h2>

//         <input
//           type="text"
//           name="nombre"
//           placeholder="Nombre"
//           className={styles.input}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="apellido"
//           placeholder="Apellido"
//           className={styles.input}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="dni"
//           placeholder="DNI"
//           className={styles.input}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className={styles.input}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Contraseña"
//           className={styles.input}
//           onChange={handleChange}
//         />
//         <select
//           name="rol"
//           className={styles.input}
//           defaultValue=""
//           onChange={handleChange}
//         >
//           <option value="" disabled>
//             Selecciona un rol
//           </option>
//           <option value="cliente">Cliente</option>
//           <option value="admin">Admin</option>
//         </select>
//         <input
//           type="file"
//           name="foto"
//           accept="image/*"
//           className={styles.input}
//           onChange={handleChange}
//         />

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <button
//           type="button"
//           className={styles.loginBtn}
//           onClick={handleRegister}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Registrando...' : 'Registrarme'}
//         </button>

//         <button
//           type="button"
//           className={styles.switchBtn}
//           onClick={onSwitchToLogin}
//           disabled={isSubmitting}
//         >
//           Ya tengo cuenta
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RegisterLogin;
// //funciona ✔













