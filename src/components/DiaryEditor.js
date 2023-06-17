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
import { call } from "../service/ApiService";

const DiaryEditor = ({ isEdit, originData }) => {
  const user = JSON.parse(localStorage.getItem("user"));
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

    const emotionName = {
      1: "HAPPY",
      2: "SOSO",
      3: "SAD",
      4: "ANGRY",
    };

    const req = {
      title,
      content,
      emotion: emotionName[emotion],
    };
    console.log(user.email);
    console.log(user.password);

    const token = btoa(`${user.email}:${user.password}`);
    const headers = {
      Authorization: `Basic ${token}`,
    };
    const config = {
      headers: headers,
    };
    console.log(req);

    call("/diary/write", "POST", req, config).then((response) => {
      console.log(response);
      const diaryId = response.diary_id;
      window.location.href = "/diary/${diaryId}";
    });
  };

  useEffect(() => {
    if (isEdit) {
      // new에서 렌더하는 DiaryEditor가 아니라 Edit에서 렌더하는 DiaryEditor
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const saveView = () => {
    if (window.confirm("그림 생성을 완료하셨습니까? 완료 시 저장됩니다.")) {
      alert("저장되었습니다.");
    } else {
      alert("그림 생성 버튼을 눌러 그림 생성을 진행하세요.");
    }
  };

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
            <IndexBtn type={"diary"} text1={"다이어리"} />
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
            <button>그림 불러오기</button>
          </div>
        </div>
        <div className="RightDivOveray">
          <div className="Right">
            <header>
              <div className="title">제목: </div>
              <input
                placeholder="제목을 입력하세요."
                type="text"
                id="my-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="writer">작성자: {user.nickname}</div>
            </header>
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
            <button
              onClick={() => {
                handleSubmit();
                saveView();
              }}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
