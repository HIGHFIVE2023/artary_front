import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../service/ApiService";
import "../components/components.css";

const Navbar = () => {
  const [view, setView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // localStorage에서 사용자 정보를 가져옴
    const userDto = JSON.parse(localStorage.getItem("user"));
    if (userDto) {
      setIsLoggedIn(true);
      setNickname(userDto.nickname);
    } else {
      setIsLoggedIn(false);
      setNickname("");
    }
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      setNickname("");
      localStorage.clear();
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const Dropdown = () => {
    return (
      <ul className="downUl">
        {isLoggedIn && (
          <li>
            <a href="/" onClick={handleLogout}>
              로그아웃
            </a>
          </li>
        )}
      </ul>
    );
  };

  return (
    <nav>
      <div className="dropdown">
        <button
          className="navBtn"
          onClick={() => {
            setView(!view);
          }}
        >
          {isLoggedIn ? (
            <>
              {nickname} 님{view && <Dropdown />}
            </>
          ) : (
            <a href="/users/login">로그인</a>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
