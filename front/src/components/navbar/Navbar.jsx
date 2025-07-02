import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Tienda J-Y-E</div>
        <ul className={styles.navList}>
          <li>
            <Link to="/login" className={styles.navLink}>Inicia sesión</Link>
          </li>
          <li>
            <Link to="/register" className={styles.navLink}>Regístrate</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
