import React, { useEffect, useState, useCallback } from "react";
import { call } from "../service/ApiService";
import { UserOutlined } from '@ant-design/icons';
import { Avatar} from 'antd';

const FriendsList = () => {
  const defaultImageURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    call(`/friend`, "GET", null)
      .then((response) => {
        setFriends(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteFriend = useCallback((friendEmail) => {
    const confirmed = window.confirm("정말로 친구를 삭제하시겠습니까?");
    if (confirmed) {
      call(`/friend/${friendEmail}`, 'DELETE', null)
      .then(() => {
        setFriends((prevfFriends) => prevfFriends.filter((friend) => friend.email !== friendEmail));
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }, []);

  return (
    <div>
      <ul>
        {friends.map((friend, index) => {
          const profileImage = friend.image !== null ? friend.image : defaultImageURL;
          return (
            <li key={index}>
              <Avatar size={40} style={{margin:'20px'}}  icon={<UserOutlined />} src={profileImage} />
              <p>{friend.nickname}</p>
              <p>{friend.email}</p>
              <button onClick={() => deleteFriend(friend.email)}>삭제</button>
            </li>
          );
        })}
      </ul>
    </div>
  )
};

export default FriendsList;