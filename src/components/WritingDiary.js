import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { call } from "../service/ApiService";

const WritingDiary = () => {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState({ title: "", content: "", image: "" });

  useEffect(() => {
    call(`/diary/${diaryId}`, "GET", null)
      .then((response) => {
        console.log(response);
        setDiary(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [diaryId]);

  const { title, content, image } = diary;

  const numRows = 9;
  const numCols = 8;
  const squares = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const idx = i * numCols + j;
      const char = idx < content.length ? content[idx] : "";
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
        <div className="title">제목: {title}</div>
        <div className="작성자"></div>
      </header>
      <div className="TextSquareContainer">{squares}</div>
    </div>
  );
};
export default WritingDiary;
