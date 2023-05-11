import React from "react";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";

const Diary = () => {
  const str = "";

  const numRows = 9;
  const numCols = 8;
  const squares = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const idx = i * numCols + j;
      const char = idx < str.length ? str[idx] : "";
      squares.push(<TextSquare key={idx} text={char} />);
    }
  }

  function TextSquare({ text }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "35px",
          height: "35px",
          border: "1px solid black",
        }}
      >
        {text}
      </div>
    );
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
              <div className="작성자">오늘의 기분</div>
            </header>

            <div className="TextSquareContainer">{squares}</div>
            <div className="RightBottomDiv">
              <BottomBtn text={"수정하기"}></BottomBtn>
              <BottomBtn text={"삭제하기"}></BottomBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
