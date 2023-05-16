import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Calenpage from "./pages/Calenpage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {<Navbar />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/calenpage" element={<Calenpage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
