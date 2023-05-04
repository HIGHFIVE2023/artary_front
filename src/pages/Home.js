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
            <div className="Index01">
              <IndexBtn
                backgroundColor={"#ff6666"}
                text="다이어리"
                onClick={() => console.log("다이어리 버튼 눌렀다")}
              />
            </div>
            <div className="Index02">
              <IndexBtn
                backgroundColor={"#ffbd55"}
                text="일기 쓰기"
                onClick={() => console.log("일기쓰기 버튼 눌렀다")}
              />
            </div>
            <div className="Index03">
              <IndexBtn
                backgroundColor={"#ffff66"}
                text="마이 페이지"
                onClick={() => console.log("마이페이지 버튼 눌렀다")}
              />
            </div>
            <div className="Index04">
              <IndexBtn
                backgroundColor={"#9de24f"}
                text="환경설정"
                onClick={() => console.log("환경설정 버튼 눌렀다")}
              />
            </div>
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
