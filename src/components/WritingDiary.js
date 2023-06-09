import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { call } from "../service/ApiService";

const WritingDiary = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { diaryId } = useParams();
  const [diary, setDiary] = useState({ title: "", content: "" });

  let [inputCount, setInputCount] = useState(0);

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

  const { title, content } = diary;

  const numRows = 9;
  let numCols = 8;

  if (content.length > 72) {
    numCols = Math.ceil(content.length / numRows);
  }

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
        <div className="writer">작성자: {user.nickname}</div>
      </header>
      <div className="TextSquareContainer">{squares}</div>
    </div>
  );
};

export default WritingDiary;
