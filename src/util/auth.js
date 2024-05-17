import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLogin(true);
    } else {
      //나중에 false로 변경
      setIsLogin(false);
    }
  }, []);

  const isloginHandler = (event) => {
    if (!isLogin) {
      event.preventDefault();
      alert('로그인을 해주세요');
    }
  }

  const isUserHandler = () => {

  }
  const token = localStorage.getItem('access_token');

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, isloginHandler, token, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
