import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/new" element={<New />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
