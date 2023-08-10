import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import IndexBtn from "../components/IndexBtn";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isIndexBtnClicked] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = () => {
    setIsOpened(!isOpened);

    if (!isOpened && !isIndexBtnClicked) {
      // 책이 펼쳐지는 효과를 위해 setTimeout 사용
      setTimeout(() => {
        navigate("/users/login"); // 실제로 이동할 다른 페이지의 주소로 변경해야 합니다.
      }, 500); // 적절한 시간으로 조정
    }
  };

  return (
    <div className="Home">
      <div className={`book-cover ${isOpened ? "opened" : ""}`}>
        <div className="front-cover">
          <div className="icon-container">
            <img
              className="MainIcon"
              src="/img/icon.png"
              alt="main icon"
              onClick={handleBookClick}
            />
          </div>
        </div>
        <div className="back-cover"></div>
        <div className="spine"></div>
        <div className="HomeButtonContainer">
          <IndexBtn />
        </div>
      </div>
    </div>
  );
};

export default Home;
