import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { call } from "../service/ApiService";

const DrawingDiary = () => {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState({ image: "" });

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

  const { image } = diary;

  return (
    <div className="LeftDivOveray">
      <div className="Left">
        <header>
          <div className="theDate">날짜</div>
          <div className="Emotion">오늘의 기분</div>
          <div className="todayEmotion">이모지</div>
        </header>
        <div>
          <img src={image} alt="Diary Image" />
        </div>
      </div>
      <div className="LeftBottomDiv"></div>
    </div>
  );
};
export default DrawingDiary;
