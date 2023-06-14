import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment";
import IndexBtn from "../components/IndexBtn";
import Chart from "./Chart";

function Calenpage() {
  const [date, setDate] = useState(new Date());
  const mark = ["2023-05-02"];

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
          <Calendar
            onChange={setDate}
            formatDay={(locale, date) => moment(date).format("DD")}
            value={date}
            locale="ko-KO"
            className="CalendarPage"
            tileContent={({ date, view }) => {
              // 날짜 타일에 컨텐츠 추가하기 (html 태그)
              // 추가할 html 태그를 변수 초기화
              let html = [];
              // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
              if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                html.push(<div className="dot"></div>);
              }
              // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                </>
              );
            }}
          />
          <div className="LeftDivOveray">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calenpage;
