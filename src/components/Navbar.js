import React, { useState, useEffect, useRef } from "react";
import { logout } from "../service/ApiService";
import Event from "./Event";
import "../components/components.css";
import { notification } from "antd";
import { call } from "../service/ApiService";

const Navbar = () => {
  const [view, setView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const[notificationCount, setNotificationCount] = useState(0);
  const[isEventRendered, setIsEventRendered] = useState(false);
  const [listening, setListening] = useState(false);
  let userDto = null;

  const popupRef = useRef(null); // Ref to the popup element

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    userDto = JSON.parse(localStorage.getItem("user"));
    if (userDto) {
      setIsLoggedIn(true);
      setNickname(userDto.nickname);
      setIsEventRendered(true);

    } else {
      setIsLoggedIn(false);
      setNickname("");
    }
  }, []);

  useEffect(() => {
    let eventSource;
    if (!listening && userDto) {
      console.log("Subscribing to notifications...");

      call("/notifications", "GET", null)
        .then((data) => {
          setNotificationCount(data.length); // 알림 갯수 업데이트
        })
        .catch((error) => {
          console.error(error);
        });

      eventSource = new EventSource(
        `http://localhost:8080/notifications/subscribe/${userDto.email}`,
        {
          headers: {
            Accept: "text/event-stream",
          },
        }
      );

      eventSource.addEventListener("sse", (event) => {
        try {
          const result = JSON.parse(event.data);
          console.log("Received notification:", result);
          setNotificationCount((prevCount) => prevCount + 1);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });

      eventSource.onerror = (event) => {
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("SSE closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      eventSource.onopen = (event) => {
        console.log("Connection opened");
      };
      setListening(true);
    }
    return () => {
      console.log("Event source closed");
    };
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
          {activeTab === 1 && <Event notification={notification} notificationCount={setNotificationCount} />}
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
        style={{ position: 'relative' }}
        onClick={() => {
          openPopup();
        }}
      >
        {isLoggedIn ? (
          <>
            {nickname} 님{view && <Dropdown notification={notification} />}
            {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
          </>
        ) : (
          <a href="/users/login">로그인</a>
        )}
      </button>
      {isPopupOpen && <Dropdown notification={notification} />}
    </div>
  );
};

export default Navbar;
