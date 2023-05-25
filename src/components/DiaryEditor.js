import React, { useState, useEffect, useRef } from "react";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";

const DiaryEditor = () => {
  const [text, setText] = useState("");
  const [letterSpacing, setLetterSpacing] = useState("23px");

  //띄어쓰기 letter-spacing 다르게
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollLeft = textareaRef.current.scrollWidth;
    }
  }, [letterSpacing]);

  function handleTextareaChange(event) {
    setText(event.target.value);
    setLetterSpacing(event.target.value.indexOf(" ") > -1 ? "27px" : "5px");
  }

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
              <div className="theDate">{"날짜"}</div>
              <div className="Emotion">오늘의 기분</div>
              <div className="todayEmotion">이모지</div>
            </header>
          </div>
          <div className="LeftBottomDiv">
            <BottomBtn text={"하단버튼1"}></BottomBtn>
            <BottomBtn text={"하단버튼2"}></BottomBtn>
          </div>
        </div>
        <div className="RightDivOveray">
          <div className="Right">
            <header>
              <div className="title">제목: </div>
              <input
                type="text"
                id="my-input"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <div className="작성자">오늘의 기분</div>
            </header>

            <div className="TextSquareContainer">
              <div class="textarea-container">
                <textarea
                  style={{ letterSpacing: letterSpacing }}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
            </div>
            <div className="RightBottomDiv">
              <BottomBtn text={"저장하기"}></BottomBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
