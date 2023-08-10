import React, { useState, useEffect, useCallback } from "react";
import { call } from "../service/ApiService";

function Event() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [listening, setListening] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    let eventSource;
    if (!listening) {
      console.log("Subscribing to notifications...");

      call("/notifications", "GET", null)
        .then((data) => {
          setNotification(data.reverse());
        })
        .catch((error) => {
          console.error(error);
        });

      eventSource = new EventSource(
        `http://localhost:8080/notifications/subscribe/${user.email}`,
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
          setNotification((preNotifications) => [result, ...preNotifications]);
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
      eventSource.close();
      console.log("Event source closed");
    };
  }, []);

  const checkNotification = (alarmId) => {
    call(`/notifications/${alarmId}`, "POST", null);
  };

  const deleteNotification = useCallback((alarmId) => {
    call(`/notifications/${alarmId}`, "DELETE", null)
      .then(() => {
        setNotification((preNotifications) =>
          preNotifications.filter((notification) => notification.id !== alarmId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculateTime = (createdAt) => {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);

    const diffInMills = currentTime - createdAtTime;
    const diffInSeconds = Math.floor(diffInMills / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInHours < 1) {
      return `${diffInMinutes}분 전`;
    } else if (diffInDays < 1) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays === 1) {
      return "어제";
    } else {
      return `${diffInDays}일 전`;
    }
  };

  return (
    <div className="notificationWrapper">
      <div className="notiList">
        <ul>
          {notification.map((notification) => (
            <li key={notification.id}>
              <a
                href={notification.url}
                onClick={() => checkNotification(notification.id)}
              >
                {notification.content}
                <span>{calculateTime(notification.createdAt)}</span>
              </a>
              <button onClick={() => deleteNotification(notification.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Event;