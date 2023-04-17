import React from "react";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";

const Diary = () => {
  const str =
    "오늘은 인덱스 버튼을 만들었다! 나 아주 신났다. 하이파이브 아트어리 화이탱탱구링~";

  const numRows = 9;
  const numCols = 10;
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="DiaryImageContainer">
          <img
            className="DiaryImage"
            src="/img/diary.png"
            alt="diary background"
          />
          <div className="DiaryButtonContainer">
            <div className="Index01">
              <IndexBtn
                backgroundColor={"#ff6666"}
                text="다이어리"
                onClick={() => console.log("다이어리 버튼 눌렀다")}
              />
            </div>
            <div className="Index02">
              <IndexBtn
                backgroundColor={"#ffbd55"}
                text="일기 쓰기"
                onClick={() => console.log("일기쓰기 버튼 눌렀다")}
              />
            </div>
            <div className="Index03">
              <IndexBtn
                backgroundColor={"#ffff66"}
                text="마이 페이지"
                onClick={() => console.log("마이페이지 버튼 눌렀다")}
              />
            </div>
            <div className="Index04">
              <IndexBtn
                backgroundColor={"#9de24f"}
                text="환경설정"
                onClick={() => console.log("환경설정 버튼 눌렀다")}
              />
            </div>
          </div>
=======
=======
>>>>>>> Stashed changes
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
        <div className="Right">
          <IndexBtn />
          <div className="textsquare">{squares}</div>
>>>>>>> Stashed changes
        </div>
        <div className="TextSquareContainer">{squares}</div>
      </div>
    </div>
  );
};

export default Diary;
