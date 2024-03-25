import React from 'react';
import styles from './Header.module.css'; 
import logoImage from '../logo9.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>
      <div className={styles.userActions}>
      <Link to="/login" style={{ marginRight: '10px' }}>Login</Link> <Link to="/userprofile">Mypage</Link>
      </div>
    </header>
  );
}

export default Header;