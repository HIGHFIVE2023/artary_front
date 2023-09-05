import React, { useEffect, useState, useCallback } from "react";
import { call } from "../service/ApiService";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const FriendsList = () => {
  const defaultImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    call(`/friend`, "GET", null)
      .then((response) => {
        console.log(response);
        const friendList = response.map((f) => {
          return {
            nickname: f.nickname,
            email: f.email,
            image: f.image,
          };
        });
        setFriends(friendList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteFriend = useCallback((friendEmail) => {
    const confirmed = window.confirm("정말로 친구를 삭제하시겠습니까?");
    if (confirmed) {
      call(`/friend/${friendEmail}`, "DELETE", null)
        .then(() => {
          setFriends((prevfFriends) =>
            prevfFriends.filter((friend) => friend.email !== friendEmail)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div
      className="user-list-container"
      style={{ height: "80%", overflowY: "auto" }}
    >
      <ul className="user-list">
        {friends.map((friend, index) => {
          const profileImage =
            friend.image !== null ? friend.image : defaultImageURL;
          return (
            <li key={index} className="user-item">
              <Link
                key={index}
                to={`/diary/list/${friend.nickname}`}
                style={{ color: "black", display: "flex" }}
              >
                <Avatar
                  style={{ margin: "0.3em" }}
                  size={40}
                  icon={<UserOutlined />}
                  src={profileImage}
                />
                <div className="user-info">
                  <p className="username">{friend.nickname}</p>
                  <p className="email">{friend.email}</p>
                </div>
              </Link>
              <button
                className="frndBtn"
                onClick={() => deleteFriend(friend.email)}
              >
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendsList;
