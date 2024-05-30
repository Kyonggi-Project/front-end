import React from "react";
import styles from "./Header.module.css";
import logoImage from "../logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../util/auth";
import SearchBar from "./SearchBar";

function Header() {
  const { isLogin, setIsLogin, isloginHandler } = useAuth();

  function handleLogout() {
    localStorage.removeItem("access_token");
    setIsLogin(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <div className={styles.userActions}>
        <div className={styles.search}>
          <SearchBar />
        </div>
        {!isLogin ? (
          <Link
            to="/login"
            style={{ marginRight: "10px" }}
            className={styles.link}
          >
            Login
          </Link>
        ) : (
          <Link
            to="/"
            style={{ marginRight: "10px" }}
            onClick={handleLogout}
            className={styles.link}
          >
            Logout
          </Link>
        )}
        <Link
          to="/userprofile"
          onClick={isloginHandler}
          className={styles.link}
        >
          Mypage
        </Link>
      </div>
    </header>
  );
}

export default Header;
