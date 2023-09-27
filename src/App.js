import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import FindEmail from "./pages/FindEmail";
import FindPw from "./pages/FindPw";
import NotFound from "./pages/NotFound";
import DiaryList from "./pages/DiaryList";
import ProtectedRoutes from "./service/AuthRouter";

class App extends Component {
  componentDidMount() {
    const FixRatio = () => {
      const root = document.querySelector("#root");
      const app = document.querySelector(".App"); // Change to .App class selector

      // 가로를 화면에 딱 맞게
      let width = root.clientWidth;
      let height = width * 0.5625; // 1080 ÷ 1920 ≒ 0.5625

      if (height > root.clientHeight) {
        // 설정된 세로 값이 화면보다 크다면
        // 세로를 화면에 딱 맞게
        height = root.clientHeight;
        width = height * 1.7777; // 1920 ÷ 1080 ≒ 1.7777
      }

      // 설정한 값을 적용
      app.style.width = `${width}px`;
      app.style.height = `${height}px`;
    };

    window.onresize = FixRatio;
    FixRatio();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/email" element={<FindEmail />} />
            <Route path="/users/password" element={<FindPw />} />
            <Route path="/users/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/diary/:diaryId" element={<Diary />} />
              <Route path="/diary/:diaryId/edit" element={<EditDiary />} />
              <Route path="/calenpage" element={<Calenpage />} />
              <Route path="/diary/write" element={<New />} />
              <Route path="/mypage" element={<Mypage />}></Route>
              <Route path="/mypage/update" element={<ProfileUpdate />}></Route>
              <Route path="/diary/list/:nickname" element={<DiaryList />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
