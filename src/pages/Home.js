import React, { useState } from "react";
import IndexBtn from "../components/IndexBtn";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // 메뉴 열림/닫힘 상태를 토글
  };

  return (
    <div className="Home">
      <div className="HomeFrame">
        <div className="HomeImageContainer">
          <img className="MainIcon" src="/img/mainicon.png" alt="main icon" />
          <div className="HomeButtonContainer">
            <IndexBtn />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
