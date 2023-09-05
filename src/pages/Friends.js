import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export let ActiveContext = React.createContext();

const Friends = () => {
  const tabs = ["친구 검색", "친구 목록", "친구 요청"];
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
    ActiveContext = activeTab;
    navigate("/mypage");
  };

  return (
    <>
      <ActiveContext.Provider value={activeTab}>
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
        </div>
      </ActiveContext.Provider>
    </>
  );
};

export default Friends;
