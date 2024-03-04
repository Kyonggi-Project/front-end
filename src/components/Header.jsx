import React from 'react';
import styles from './Header.module.css'; 
import logoImage from '../logo.png';
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
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
      <div className={styles.userActions}>
        <a href="/login">Log-in</a> / <a href="/mypage">Mypage</a>
      </div>
    </header>
  );
}

export default Header;