import React, { useState, useEffect } from "react";
import { logout } from "../service/ApiService";
import Event from "./Event";
import "../components/components.css";

const Navbar = () => {
  const [view, setView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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

  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  const Dropdown = (onClose) => {
    return (
      <div className="downUl">
        <div>
          <button
            className={activeTab === 1 ? "active" : ""}
            onClick={() => handleTabChange(1)}
          >
            알림
          </button>
          <button
            className={activeTab === 2 ? "active" : ""}
            onClick={() => handleTabChange(2)}
          >
            로그아웃
          </button>
        </div>
        <div className="tabContent">
          {activeTab === 1 && (
            <div>
              <Event />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              {isLoggedIn && (
                <a href="/" onClick={handleLogout}>
                  로그아웃
                </a>
              )}
            </div>
          )}
        </div>
        <button className="close-button" onClick={onClose}></button>
      </div>
    );
  };

  return (
    <div>
      <button
        className="navBtn"
        onClick={() => {
          openPopup();
        }}
      >
        {isLoggedIn ? (
          <>
            {nickname} 님{view && <Dropdown onClose={closePopup} />}
          </>
        ) : (
          <a href="/users/login">로그인</a>
        )}
      </button>
      {isPopupOpen && <Dropdown onClose={closePopup} />}
    </div>
  );
};
export default Navbar;
