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
import Mypage from "./pages/Mypage";
import ProfileUpdate from "./pages/ProfileUpdate";
import EditDiary from "./components/EditDiary";
import DiaryList from "./pages/DiaryList";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/diary/:diaryId" element={<Diary />} />
          <Route path="/diary/:diaryId/edit" element={<EditDiary />} />
          <Route path="/calenpage" element={<Calenpage />} />
          <Route path="/diary/write" element={<New />} />
          <Route path="/users/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/mypage/update" element={<ProfileUpdate />}></Route>
          <Route path="/diary/list/:nickname" element={<DiaryList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
