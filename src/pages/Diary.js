import React from "react";
import IndexBtn from "../components/IndexBtn";

const Diary = () => {
  const str = "안녕 나는 원고지야 나는 얼렁뚱땅이지만 성공해버렸어!!";

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
        <div className="Right">
          <IndexBtn className="Index01" />
          <div className="textsquare">{squares}</div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
