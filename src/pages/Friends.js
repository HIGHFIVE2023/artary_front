import React, { useState } from "react";
import SearchFriend from "../components/SearchFriend";
import FriendsList from "../components/FriendsList";
import FriendRequest from "../components/FriendRequest";

const Friends = () => {
  const tabs = ["친구 검색", "친구 목록", "친구 요청"];
  let contents = [<SearchFriend />, <FriendsList />, <FriendRequest />];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-menu">
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab-item ${index === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        <div className="tab-content-inner">{contents[activeTab]}</div>
      </div>
    </div>
  );
};

export default Friends;
