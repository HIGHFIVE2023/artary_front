import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import IndexBtn from "../components/IndexBtn";
import Chart from "./Chart";
import { call } from "../service/ApiService";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import { useNavigate } from "react-router-dom";

function Calenpage() {
  const [date, setDate] = useState(new Date());
  const [mark, setMark] = useState([]);
  const navigate = useNavigate();

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

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
            id: diary.id,
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

  const handleTileClick = (clickedDate) => {
    const formattedDate = moment(clickedDate).format("YYYY-MM-DD");
    const diaryData = mark.find((item) => item.date === formattedDate);

    if (diaryData) {
      navigate(`/diary/${diaryData.id}`);
    } else {
      alert(`클릭한 날짜에 저장된 다이어리가 없습니다.`);
    }
  };

  //스프링
  const calculateSpringCount = () => {
    const windowHeight = window.innerHeight;
    // 원하는 로직에 따라 화면 높이에 따라 갯수를 계산할 수 있습니다.
    // 예를 들어, 높이가 특정 값 이하일 때는 4개, 그 이상일 때는 6개로 설정
    if (windowHeight <= 200) {
      return 1;
    } else if (windowHeight <= 250) {
      return 2;
    } else if (windowHeight <= 350) {
      return 3;
    } else if (windowHeight <= 450) {
      return 4;
    } else if (windowHeight <= 550) {
      return 5;
    } else {
      return 6;
    }
  };

  const updateSpringCount = () => {
    const count = calculateSpringCount();
    setSpringCount(count);
  };

  useEffect(() => {
    // 화면 크기 변경 감지를 위한 이벤트 리스너 등록
    window.addEventListener("resize", updateSpringCount);

    // 컴포넌트가 마운트될 때 한 번 호출
    updateSpringCount();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateSpringCount);
    };
  }, []);
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
            <Circles count={springCount} style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs count={springCount} />
            </div>
            <Circles count={springCount} style={{ marginLeft: "1em" }} />
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
              onClickDay={handleTileClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calenpage;
