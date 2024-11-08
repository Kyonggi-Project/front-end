import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./components/Main.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import UserProfile from "./pages/profile/UserProfile.jsx";
import OtherUserProfile from "./pages/profile/OtherUserProfile.jsx";

import NewBoard from "./components/NewBoard.jsx";
import CommentDetail from "./pages/comment/CommentDetail.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import './App.css';
import CommentApp from "./pages/CommentList/CommentList.jsx";
import MovieList from "./pages/MovieList/MovieList.jsx";
import AfterLoginMain from "./components/AfterLoginMain.jsx";
import WatchList from "./pages/MovieList/WatchList.jsx"
import { AuthProvider } from "./util/auth.js";
import ChatUI from "./components/chat/Chat2.jsx";
import ChatRoom from "./components/chat/ChatRoom.jsx";

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
            <Route path="/userprofile/:nickname" element={<OtherUserProfile />} />
            <Route path="/details/write/:ottId" element={<NewBoard />} />
            <Route path="/comments/:ottId/:id" element={<CommentDetail />} />
            <Route path="/details/:ottId" element={<MovieDetail />} />
            <Route path="/list/id/:id" element={<CommentApp />} />
            <Route path="/list/nickname/:nickname" element={<CommentApp />} />
            <Route path="/movie" element={<MovieList />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/watchlist/:nickname" element={<WatchList />} />
            <Route path="/afterModal" element={<AfterLoginMain />} />
            <Route path="/details/edit/:ottId/:id" element={<NewBoard />} />
            <Route path="/chat/:roomId" element={<ChatUI />} />
            <Route path="/chat" element={<ChatRoom />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
