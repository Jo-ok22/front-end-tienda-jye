import React from 'react';
import styles from './landinHome.module.css';

const LandingPage = () => {
  const productos = [
    {
      title: 'iPhone 15',
      description: 'Creamos sitios web y aplicaciones que se adaptan perfectamente a tus necesidades, con un diseño moderno y funcional.',
      img: '/1750871951_7344aef043.png',
    },
    {
      title: 'Samsung Galaxy S25',
      description: 'Impulsamos tu marca en el mundo digital con campañas efectivas en redes sociales, SEO y publicidad online.',
      img: '/1750873465_a1616c3890.jpg',
    },
    {
      title: 'Notebook Samsung',
      description: 'Te ayudamos a optimizar tus procesos y estrategias para alcanzar tus objetivos y maximizar tu rentabilidad.',
      img: '/img/notebook.png',
    },
  ];

  const formasPago = [
    {
      name: 'Efectivoo',
      description: 'con 10% de descuento.',
      image: 'https://via.placeholder.com/300x200/FF5733/FFFFFF?text=Efectivo',
    },
    {
      name: 'Tarjeta',
      description: 'hasta 12 cuotas sin interés.',
      image: 'https://via.placeholder.com/300x200/33FF57/FFFFFF?text=Tarjeta',
    },
    {
      name: 'Transferencia',
      description: '10 % de recargo.',
      image: 'https://via.placeholder.com/300x200/3357FF/FFFFFF?text=Transferencia',
    },
  ];

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>¡Descubre lo que tenemos para ti!</h1>
          <p className={styles.heroSubtitle}>
            Ofrecemos soluciones innovadoras y productos de alta calidad para que tu negocio crezca como la espuma.
          </p>
          <a href="#servicios" className={styles.downArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="40"
              height="40"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      <div className={styles.container}>
        <section id="servicios" className={styles.section}>
          <h2 className={styles.sectionTitle}>Nuestros Productos</h2>
          <div className={styles.grid}>
            {productos.map((producto, index) => (
              <div key={index} className={styles.card}>
                <img src={producto.img} alt={producto.title} className={styles.cardImage} />
                <h3 className={styles.cardTitle}>{producto.title}</h3>
                <p className={styles.cardDescription}>{producto.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Formas de Pago</h2>
          <div className={styles.grid}>
            {formasPago.map((pago, index) => (
              <div key={index} className={styles.card}>
                <img src={pago.image} alt={pago.name} className={styles.cardImage} />
                <h3 className={styles.cardTitle}>{pago.name}</h3>
                <p className={styles.cardDescription}>{pago.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;













