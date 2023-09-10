import React, { useState } from "react";
import { call } from "../service/ApiService";

// 팝업 컴포넌트
const PicPopup = ({ diaryId, onClose, onSubmitClick }) => {
  const [btnVisible, setBtnVisible] = useState(true);
  const [picVisible, setPicVisible] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setLoading] = useState(false);

  //수채화
  const getPaint = async (diaryId) => {
    setBtnVisible(false);
    setPicVisible(true);
    setLoading(true);

    call(`/diary/${diaryId}/picture/paint`, "GET", null)
      .then((imgResponse) => {
        console.log(imgResponse.imageUrl);
        setLoading(false);
        setImageSrc(imgResponse.imageUrl);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  //연필
  const getPencil = async (diaryId) => {
    setBtnVisible(false);
    setPicVisible(true);
    setLoading(true);

    call(`/diary/${diaryId}/picture/pencil`, "GET", null)
      .then((imgResponse) => {
        console.log(imgResponse.imageUrl);
        setLoading(false);
        setImageSrc(imgResponse.imageUrl);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSubmitPaint = () => {
    // 그림 가져오는 함수 호출
    getPaint(diaryId);
    console.log(typeof diaryId);
  };

  //색연필
  const handleSubmitPencil = () => {
    // 그림 가져오는 함수 호출
    getPencil(diaryId);
    console.log(typeof diaryId);
  };

  return (
    <div className="popup">
      <p>내 일기에 맞는 그림 스타일</p>

      <div className="selectStyle">
        {btnVisible && (
          <button className="pencilStyle" onClick={handleSubmitPencil}>
            <img src="/img/style_pencil.png" />
            색연필
          </button>
        )}
        {btnVisible && (
          <button className="paintStyle" onClick={handleSubmitPaint}>
            <img src="/img/style_paint.png" />
            수채화
          </button>
        )}
        {picVisible && (
          <div className="container">
            {isLoading && (
              <div className="loading-container">
                <img className="loadingImg" src="/img/loading.png" />
                그림 생성 중...
              </div>
            )}
            {!imageSrc ? null : (
              <div>
                <img src={imageSrc} className="popupImage" alt="Diary Image" />
                <br />
                <button className="submitPic" onClick={onSubmitClick}>
                  그림 저장하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <br />
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default PicPopup;
