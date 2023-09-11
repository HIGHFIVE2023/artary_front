import React, { useEffect, useState, useCallback } from "react";
import { call } from "../service/ApiService";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const FriendRequest = () => {
  const defaultImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    call(`/friend/requests`, "GET", null)
      .then((response) => {
        console.log(response);
        setFriends(response.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const replyFriend = useCallback((friendEmail, reply) => {
    call(`/friend/${friendEmail}/${reply}`, "POST", null)
      .then(() => {
        setFriends((prevfFriends) =>
          prevfFriends.filter(
            (friend) => friend.fromUserId.email !== friendEmail
          )
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
    <div
      className="user-list-container"
      style={{ height: "80%", overflowY: "auto" }}
    >
      {friends.length === 0 ? (
        <p>친구 요청이 없습니다.</p>
      ) : (
        <ul className="user-list">
          {friends.map((friend, index) => {
            const requestFriend = friend.fromUserId;
            const profileImage =
              requestFriend.image !== null
                ? requestFriend.image
                : defaultImageURL;
            return (
              <li key={index} className="user-item">
                <Avatar
                  size={40}
                  style={{ margin: "20px" }}
                  icon={<UserOutlined />}
                  src={profileImage}
                />
                <div className="user-info">
                  <p className="username">{requestFriend.nickname}</p>
                  <p className="email">{requestFriend.email}</p>
                  <span>{calculateTime(requestFriend.createdAt)}</span>
                </div>
                <div className="button-container">
                  <button
                    onClick={() => replyFriend(requestFriend.email, true)}
                    className="accept-button"
                  >
                    수락
                  </button>
                  <button
                    onClick={() => replyFriend(requestFriend.email, false)}
                    className="reject-button"
                  >
                    거절
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FriendRequest;
