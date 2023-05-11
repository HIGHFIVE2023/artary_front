import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/new" element={<New />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
