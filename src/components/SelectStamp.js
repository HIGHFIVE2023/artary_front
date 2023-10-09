import React, { useEffect, useState } from "react";
import { call, getSticker } from "../service/ApiService";

const SelectStamp = ({ diaryId, onClose }) => {
  const createButtonClickHandler = (buttonType) => async () => {
    try {
      // 보낼 데이터
      const data = { type: buttonType };

      // API 호출 전에 전달되는 데이터, diaryId 확인
      console.log("Button Clicked:", buttonType);
      console.log("diaryId:", diaryId);

      const response = await call(`/diary/${diaryId}/sticker`, "POST", data);

      console.log("API Response:", response);
      onClose();
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  return (
    <div className="selectStamp">
      <p>{"<도장을 선택해요>"}</p>
      <div className="stamps">
        <button
          className="cheerUp"
          onClick={createButtonClickHandler("cheerUp")}
        >
          <img src="../img/cheerUp.PNG" />
        </button>
        <button
          className="goodJob"
          onClick={createButtonClickHandler("goodJob")}
        >
          <img src="../img/goodJob.PNG" />
        </button>
        <button
          className="goodLuck"
          onClick={createButtonClickHandler("goodLuck")}
        >
          <img src="../img/goodLuck.PNG" />
        </button>
        <button
          className="perfect"
          onClick={createButtonClickHandler("perfect")}
        >
          <img src="../img/perfect.PNG" />
        </button>
      </div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default SelectStamp;
