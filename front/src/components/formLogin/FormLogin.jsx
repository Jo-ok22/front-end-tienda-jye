import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Importar
import styles from './FormLogin.module.css';
import { API_BASE_URL } from '../../api/api';

const FormLogin = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();  // <-- Hook para navegación

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError('Por favor completá email y contraseña');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}?controller=usuarios&action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Respuesta login:', data);

      if (data.success === true && data.status === 200 && data.user) {
        alert('Acceso concedido');
        navigate('/clienteMenu');  // <-- Redirigir con React Router
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error de red o parsing:', err);
      setError('Error de red o datos malformateados');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          className={styles.loginBtn}
          onClick={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ingresando...' : 'Entrar'}
        </button>
        <p>¿No tenés cuenta?</p>
        <button
          className={styles.switchBtn}
          onClick={onSwitchToRegister}
          disabled={isSubmitting}
        >
          Registrarme
        </button>
      </div>
    </div>
  );
};

export default FormLogin;



