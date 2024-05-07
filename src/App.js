import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import UserProfile from "./pages/profile/UserProfile.jsx";

import Board from './components/Board.jsx'
import NewBoard from "./components/NewBoard.jsx";
import CommentDetail from "./pages/comment/CommentDetail.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import './App.css';
import CommentApp from "./pages/CommentList/CommentList.jsx";
import MovieList from "./pages/MovieList/MovieList.jsx";
import AfterLoginMain from "./components/AfterLoginMain.jsx";
import { AuthProvider } from "./util/auth.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/board" element={<Board />} />
            <Route path="/write" element={<NewBoard />} />
            <Route path="/comments" element={<CommentDetail />} />
            <Route path="/details" element={<MovieDetail />} />
            <Route path="/list" element={<CommentApp />} />
            <Route path="/movie" element={<MovieList />}/>
            <Route path="/afterModal" element={<AfterLoginMain/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
