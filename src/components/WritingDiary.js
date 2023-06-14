const WritingDiary = () => {
  const str = "안녕하세요 우리 팀은 하이파이브예요! 만나서 반가워요";

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
    <div className="Right">
      <header>
        <div className="title">제목: </div>
        <div className="작성자"></div>
      </header>
      <div className="TextSquareContainer">{squares}</div>
    </div>
  );
};
export default WritingDiary;
