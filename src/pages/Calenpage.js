import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import IndexBtn from "../components/IndexBtn";
import Chart from "./Chart";
import { useParams } from "react-router";
import { call } from "../service/ApiService";
import axios from "axios";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

function Calenpage() {
  const [date, setDate] = useState(new Date());
  const [mark, setMark] = useState([]);

  const emotionImg = {
    HAPPY: "emotion01.png",
    SOSO: "emotion02.png",
    SAD: "emotion03.png",
    ANGRY: "emotion04.png",
  };

  useEffect(() => {
    call(`/diary/diaries`, "GET", null)
      .then((response) => {
        console.log(response);
        const markList = response.map((diary) => {
          return {
            date: diary.createdAt.substring(0, 10),
            emotion: diary.emotion, // 이모지 데이터가 어떤 프로퍼티에 저장되어 있는지에 따라 변경
          };
        });
        setMark(markList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 각 날짜의 타일에 이모지를 표시하는 함수
  const tileContent = ({ date, view }) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const emojiData = mark.find((item) => item.date === formattedDate);

    return (
      <div>
        {emojiData && (
          <div className="emotion_img_wrapper">
            <img
              src={
                process.env.PUBLIC_URL +
                `../img/${emotionImg[emojiData.emotion]}`
              }
              alt={`Emoji for ${emojiData.emotion}`} // 이미지에 대한 설명 추가 (웹 접근성을 위해)
              className="emoji-image"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn type={"calendar"} text3={"캘린더"} />
          </div>

          <div className="LeftDivOveray">
            <Chart />
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            <Calendar
              onChange={setDate}
              formatDay={(locale, date) => moment(date).format("DD")}
              value={date}
              locale="ko-KO"
              calendarType="US"
              className="CalendarPage"
              tileContent={tileContent} // 이모지를 표시하는 tileContent 함수를 전달
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calenpage;
