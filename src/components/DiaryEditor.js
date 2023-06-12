import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import EmotionItem from "../components/EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [emotion, setEmotion] = useState(3);
  //기본 선택 감정 3번감정
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion); // 클릭한 감정(emotion_id)으로 state 변경
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus(); // 한 글자도 안 썼을때 textarea에 포커스.
      return;
    }
  };

  useEffect(() => {
    if (isEdit) {
      // new에서 렌더하는 DiaryEditor가 아니라 Edit에서 렌더하는 DiaryEditor
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="Diary">
      <div className="DiaryFrame">
        <div className="DiaryImageContainer">
          <img
            className="DiaryImage"
            src="/img/diary.png"
            alt="diary background"
          />
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
        </div>

        <div className="LeftDivOveray">
          <div className="Left">
            <header>
              <div className="theDate">
                <input
                  className="input-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </div>
              <div className="Emotion">
                {"기분"}
                {emotionList.map((it) => (
                  <EmotionItem
                    key={it.emotion_id}
                    {...it}
                    onClick={handleClickEmote}
                    isSelected={it.emotion_id === emotion}
                  />
                ))}
              </div>
            </header>
          </div>
          <div className="LeftBottomDiv">
            <BottomBtn text={"그림 불러오기"}></BottomBtn>
          </div>
        </div>
        <div className="RightDivOveray">
          <div className="Right">
            <header>
              <div className="title">제목: </div>
              <input
                type="text"
                id="my-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="writer">{"작성자: 차덕새"}</div>
            </header>

            <div className="TextSquareContainer">
              <div class="textarea-container">
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="오늘 하루는 어땠나요?"
                />
              </div>
            </div>
            <div className="RightBottomDiv">
              <BottomBtn text={"저장하기"} onClick={handleSubmit}></BottomBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
