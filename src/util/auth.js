import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const isloginHandler = (event) => {
    if (!isLogin) {
      event.preventDefault();
      alert('로그인을 해주세요');
    }
  }

  return (
    <AuthContext.Provider value={{isLogin, setIsLogin, isloginHandler}}>
      {children}
    </AuthContext.Provider>
  );
}
