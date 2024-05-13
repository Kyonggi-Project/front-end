import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import logoImage from '../logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../util/auth';
import SearchBar from './SearchBar';

function Header() {
  const { isLogin, setIsLogin, isloginHandler } = useAuth();

  function handleLogout() {
    localStorage.removeItem('access_token');
    setIsLogin(false);
  }

  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav> */}
      <div className={styles.userActions}>
        <div className={styles.search}>
          <SearchBar/>
        </div>
        {!isLogin ?
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link> :
          <Link to="/" style={{ marginRight: '10px' }} onClick={handleLogout}>Logout</Link>
        }
        <Link to="/userprofile" onClick={isloginHandler}>Mypage</Link>
      </div>
    </header>
  );
}

export default Header;