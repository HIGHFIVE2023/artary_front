import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";

const IndexBtn = ({ type, text1, text2, text3 }) => {
  // 버튼 타입
  const btnType = ["write", "diary", "calendar", "default"].includes(type)
    ? type
    : "default";

  // 페이지 이동
  const navigate = useNavigate();

  const navigateToWrite = () => {
    navigate("/diary/write");
  };

  const navigateToCalen = () => {
    navigate("/calenpage");
  };
  const navigateToMypage = () => {
    navigate("/mypage");
  };

  // 상세 페이지 이동
  const { diaryId } = useParams();
  const [diary, setDiary] = useState({ diary_id: "" });
  const { diary_id } = diary;

  const navigateToDiary = () => {
    navigate(`/diary/${diaryId}`);
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await call(`/diary/${diary.diary_id}`, "GET", null);
        console.log(response);
        setDiary(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDiary();
  }, []);

  useEffect(() => {
    if (diary && diary.diary_id) {
      navigateToDiary();
    }
  }, [diary]);

  return (
    <section>
      <div className="indexContainer01">
        <button
          className={["Index01", `Index01_${btnType}`].join(" ")}
          activeClassName="selected"
          id="btn"
          onClick={navigateToWrite}
        >
          <img src="/img/pencil.png" height="20px" width="20px" />
          {text1}
        </button>
      </div>
      <div className="indexContainer02">
        <button
          className={["Index02", `Index02_${btnType}`].join(" ")}
          onClick={navigateToDiary}
        >
          <img src="/img/diary.png" height="20px" width="20px" />
          {text2}
        </button>
      </div>

      <div className="indexContainer03">
        <button
          className={["Index03", `Index03_${btnType}`].join(" ")}
          onClick={navigateToCalen}
        >
          <img src="/img/calendar.png" height="20px" width="20px" />
          {text3}
        </button>
      </div>
      <div className="indexContainer04">
        <button className="Index04" onClick={navigateToMypage}>
          <img src="/img/mypage.png" height="20px" width="20px" />
        </button>
      </div>
    </section>
  );
};

IndexBtn.defaultProps = {
  type: "default",
};

export default IndexBtn;
