import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Home from "./pages/Home";
<<<<<<< HEAD
import New from "./pages/New";
=======
import Navbar from "./components/Navbar";
>>>>>>> 8e06a15f9a40e21ce7800c8f21071d469a815cbd

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {<Navbar />}
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
