import React, { useState, useEffect, useRef } from "react";
import { logout } from "../service/ApiService";
import Event from "./Event";
import "../components/components.css";
import { notification } from "antd";

const Navbar = () => {
  const [view, setView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const popupRef = useRef(null); // Ref to the popup element

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
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

  const handleOutsideClick = (event) => {
    // Check if the click is outside the popup
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    // Add event listener when popup is open
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopupOpen]);

  const Dropdown = ({ notification }) => {
    return (
      <div ref={popupRef} className="downUl">
        <div className="TabBtns">
          <button
            className={`Tab${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleTabChange(1)}
          >
            알림
          </button>
          <button
            className={`Tab${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleTabChange(2)}
          >
            로그아웃
          </button>
        </div>
        <div className="tabContent">
          {activeTab === 1 && <Event notification={notification} />}
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
        <button className="close-button" onClick={closePopup}></button>
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
            {nickname} 님{view && <Dropdown notification={notification} />}
          </>
        ) : (
          <a href="/users/login">로그인</a>
        )}
      </button>
      <span className="notification-count">{notification.length}</span>
      {isPopupOpen && <Dropdown notification={notification} />}
    </div>
  );
};

export default Navbar;
