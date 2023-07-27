import React, { useState } from "react";
import SearchFriend from "../components/SearchFriend";

const Friends = () => {
  const tabs = ["Search", "List", "Request"];
  const contents = [<SearchFriend />, "Content for Tab 2", "Content for Tab 3"];
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
