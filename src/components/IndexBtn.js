import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";
import Friends from "../pages/Friends";

const IndexBtn = ({ type, text1, text2, text3, text4 }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDto, setUserDto] = useState(null);

  // 버튼 타입
  const btnType = ["write", "diary", "calendar", "mypage", "default"].includes(
    type
  )
    ? type
    : "default";

  // 페이지 이동
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/users/login");
  };

  const navigateToWrite = () => {
    navigate("/diary/write");
  };
  const navigateToDiary = () => {
    navigate(`/diary/list/${user.nickname}`);
  };
  const navigateToCalen = () => {
    navigate("/calenpage");
  };
  const navigateToMypage = () => {
    navigate("/mypage");
  };

  //로그인셋
  useEffect(() => {
    const storedUserDto = JSON.parse(localStorage.getItem("user"));
    if (storedUserDto) {
      setUserDto(storedUserDto); // Set userDto with the stored user data
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <section className="IndexBtns">
        <div className="indexContainer01">
          <button
            className={["Index01", `Index01_${btnType}`].join(" ")}
            activeClassName="selected"
            id="btn"
            onClick={isLoggedIn ? navigateToWrite : navigateToLogin}
          >
            <img src="/img/pencil.png" height="50%" />
            <span className="indexText">{text1}</span>
          </button>
        </div>
        <div className="indexContainer02">
          <button
            className={["Index02", `Index02_${btnType}`].join(" ")}
            onClick={isLoggedIn ? navigateToDiary : navigateToLogin}
          >
            <img src="/img/diary.png" height="50%" />
            <span className="indexText">{text2}</span>
          </button>
        </div>

        <div className="indexContainer03">
          <button
            className={["Index03", `Index03_${btnType}`].join(" ")}
            onClick={isLoggedIn ? navigateToCalen : navigateToLogin}
          >
            <img src="/img/calendar.png" height="50%" />
            <span className="indexText">{text3}</span>
          </button>
        </div>
        <div className="indexContainer04">
          <button
            className={["Index04", `Index04_${btnType}`].join(" ")}
            onClick={isLoggedIn ? navigateToMypage : navigateToLogin}
          >
            <img src="/img/mypage.png" height="50%" />
            <span className="indexText">{text4}</span>
          </button>
        </div>
      </section>
    </>
  );
};

IndexBtn.defaultProps = {
  type: "default",
};

export default IndexBtn;
