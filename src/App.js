import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewBoard from "./components/NewBoard.jsx";
import BoardDetail from "./components/BoardDetail.jsx";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/write" element={<NewBoard />}/>
          <Route path="/board" element={<BoardDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
