import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Calenpage from "./pages/Calenpage";
import New from "./pages/New";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {<Navbar />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/login" element={<Login />}></Route>
          <Route path="/diary/:diaryId" element={<Diary />}></Route>
          <Route path="/calenpage" element={<Calenpage />}></Route>
          <Route path="/diary/write" element={<New />}></Route>
          <Route path="/users/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
