import React, { useState} from 'react';
import styles from './AdminNavbar.module.css';
import { useNavigate, NavLink } from 'react-router-dom';

import useLogout from '../../hooks/useLogout.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const logout = useLogout();
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  return (
    <div className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <div className={styles.image} onMouseOver={() => setLogoSrc('/logo-colour.png')} onMouseLeave={() => setLogoSrc('/logo.png')} onClick={() => navigate('/')}>
          <img src={logoSrc} alt="" />
        </div>
      </div>
      {user && <div className={styles.options}>
        <NavLink 
          to="/projects" 
          className={({ isActive }) => (isActive ? `${styles.nav_option} ${styles.hoverUnderline} ${styles.active_class}` : `${styles.nav_option} ${styles.hoverUnderline}`)}
        >
          Your Projects
        </NavLink>
        <NavLink 
          to="/add-project" 
          className={({ isActive }) => (isActive ? `${styles.nav_option} ${styles.hoverUnderline} ${styles.active_class}` : `${styles.nav_option} ${styles.hoverUnderline}`)}
        >
          Add Project
        </NavLink>
        <div 
          onClick={() => logout()} 
          className={`${styles.option} ${styles.hoverUnderline}`}
        >
          Logout
        </div>
      </div>}

    </div>
  )
}

export default AdminNavbar