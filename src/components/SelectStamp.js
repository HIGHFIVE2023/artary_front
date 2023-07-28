import React from "react";
import { useState } from "react";
import { call } from "../service/ApiService";

// 팝업 컴포넌트
const SelectStamp = ({ onClose }) => {
  const [btnVisible, setBtnVisible] = useState(true);

  return (
    <div className="popup">
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default SelectStamp;
