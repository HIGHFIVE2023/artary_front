import React, { useState, useEffect, useRef } from "react";
import { logout } from "../service/ApiService";
import Event from "./Event";
import "../components/components.css";
import { notification } from "antd";
import { call } from "../service/ApiService";
import { Navigate, useNavigate } from "react-router";

const Navbar = () => {
  const [view, setView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isEventRendered, setIsEventRendered] = useState(false);
  const [listening, setListening] = useState(false);
  const [userDto, setUserDto] = useState(null);

  const popupRef = useRef(null); // Ref to the popup element
  const navigate = useNavigate();

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    const storedUserDto = JSON.parse(localStorage.getItem("user"));
    if (storedUserDto) {
      setUserDto(storedUserDto); // Set userDto with the stored user data
      setIsLoggedIn(true);
      setNickname(storedUserDto.nickname);
      setIsEventRendered(true);
    } else {
      setIsLoggedIn(false);
      setNickname("");
    }
  }, []);

  useEffect(() => {
    let eventSource;
    if (!listening && userDto && userDto.email) {
      // Check if userDto and email exist
      console.log("Subscribing to notifications...");

      call("/notifications", "GET", null)
        .then((data) => {
          setNotificationCount(data.length);
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
  }, [userDto, listening]); // Add userDto and listening as dependencies

  const handleLogout = async () => {
    try {
      setPopupOpen(false);
      setIsLoggedIn(false);
      setNickname("");
      localStorage.clear();
      await logout();
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };
  const handleLogin = () => {
    window.location.href = "/users/login";
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
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        <div className="tabContent">
          {activeTab === 1 && (
            <Event
              notification={notification}
              notificationCount={setNotificationCount}
            />
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
        style={{ position: "relative" }}
        onClick={isLoggedIn ? openPopup : handleLogin}
      >
        {isLoggedIn ? (
          <>
            {nickname} 님{view && <Dropdown notification={notification} />}
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
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
