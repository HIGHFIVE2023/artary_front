import React, { useState } from "react";
import IndexBtn from "../components/IndexBtn";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // 메뉴 열림/닫힘 상태를 토글
  };

  return (
    <div className="Home">
      <div className="HomeFrame">
        <div className="HomeImageContainer">
          <img
            className="HomeImage"
            src="/img/home.png"
            alt="home background"
          />
          <img className="MainIcon" src="/img/mainicon.png" alt="main icon" />
          <div className="HomeButtonContainer">
            <IndexBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
