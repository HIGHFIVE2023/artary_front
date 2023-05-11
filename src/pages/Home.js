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
      <nav>
        <button onClick={toggleMenu}>메뉴</button>{" "}
        {/* 버튼 클릭 시 toggleMenu 함수 호출 */}
        <ul className={isOpen ? "show" : "hide"}>
          {" "}
          {/* isOpen 상태에 따라 클래스명 설정 */}
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
