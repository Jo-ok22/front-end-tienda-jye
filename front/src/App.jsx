import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import FormLogin from './components/formLogin/FormLogin';
import RegisterLogin from './components/registerLogin/RegisterLogin';
import LandingPage from './views/landinHome';
import ClienteMenu from './components/clientMenu/ClientMenu';
import PanelAdmin from './components/panelAdmin/PanelAdmin';
import styles from './App.module.css';
import Navbar from './components/navbar/Navbar';
import OrdenDeCompra from './components/ordenCompra/OrdenCompra';

function App() {
 const location = useLocation();
  const isLanding = location.pathname === '/';


  return (
    <div className={styles.app}>
    {isLanding && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<RegisterLogin />} />
          <Route path="/clienteMenu" element={<ClienteMenu />} />
          <Route path="/panelAdmin" element={<PanelAdmin />} />
          <Route path="/ordenDeCompra" element={<OrdenDeCompra />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;













// import React from 'react';
// import { Routes, Route } from "react-router-dom";
// import FormLogin from './components/formLogin/FormLogin';
// import RegisterLogin from './components/registerLogin/RegisterLogin';
// import FormProducto from './components/formProducto/FormProducto';
// import LandingPage from './views/landinHome';
// import ClienteMenu from './components/clientMenu/ClientMenu';
// import PanelAdmin from './components/panelAdmin/PanelAdmin';
// import styles from './App.module.css';

// function App() {
//   return (
//     <div className={styles.app}>
//       <header className={styles.header}>
//         <nav className={styles.nav}>
//           <div className={styles.logo}>Tu Marca</div>
//           <ul className={styles.navList}>
//             <li><a href="#servicios" className={styles.navLink}>Servicios</a></li>
//             <li><a href="#productos" className={styles.navLink}>Productos</a></li>
//             <li><a href="#contacto" className={styles.navLink}>Contacto</a></li>
//           </ul>
//         </nav>
//       </header>

//       <main>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<FormLogin />} />
//           <Route path="/register" element={<RegisterLogin />} />
//           <Route path="/productos" element={<FormProducto />} />
//           <Route path="/ClienteMenu" element={<ClienteMenu />} />
//           <Route path="/PanelAdmin" element={<PanelAdmin />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;
