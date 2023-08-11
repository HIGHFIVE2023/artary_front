import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { call } from "../service/ApiService";

const DrawingDiary = () => {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState({ emotion: "", image: "", createdAt: "" });

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

  const { emotion, image, createdAt } = diary;

  const emotionImg = {
    HAPPY: "emotion01.png",
    SOSO: "emotion02.png",
    SAD: "emotion03.png",
    ANGRY: "emotion04.png",
  };

  const emotionImgSrc = `/img/${emotionImg[emotion]}`;

  const date = createdAt.substring(0, 10);

  return (
    <div className="Left">
      <header>
        <div className="theDate">날짜: {date}</div>
        <div className="todayEmotion">
          <div className="Emotion">{"오늘의 기분:"} </div>
          <img className="emotionImg" src={emotionImgSrc} />
        </div>
      </header>
      <div className="imageContainer">
        <img className="diaryImage" src={image} alt="Diary Image" />
      </div>
    </div>
  );
};
export default DrawingDiary;
