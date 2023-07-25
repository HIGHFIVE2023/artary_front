import React from "react";
import { useNavigate } from "react-router-dom";

const IndexBtn = ({ type, text1, text2, text3 }) => {
  //버튼 타입
  const btnType = ["write", "diary", "calendar", "default"].includes(type)
    ? type
    : "default";

  //페이지 이동
  const navigate = useNavigate();

  const navigateToDiary = () => {
    navigate("/diary/write");
  };

  const navigateToCalen = () => {
    navigate("/calenpage");
  };

  const navigateToMypage = () => {
    navigate("/mypage");
  };

  return (
    <section>
      <div className="indexContainer01">
        <button
          className={["Index01", `Index01_${btnType}`].join(" ")}
          activeClassName="selected"
          id="btn"
          onClick={navigateToDiary}
        >
          <img src="../img/pencil.png" height="20px" width="20px" />
          {text1}
        </button>
      </div>
      <div className="indexContainer02">
        <button
          className={["Index02", `Index02_${btnType}`].join(" ")}
          onClick={() => alert("열람 페이지 공사 중")}
        >
          <img src="../img/diary.png" height="20px" width="20px" />
          {text2}
        </button>
      </div>

      <div className="indexContainer03">
        <button
          className={["Index03", `Index03_${btnType}`].join(" ")}
          onClick={navigateToCalen}
        >
          <img src="../img/calendar.png" height="20px" width="20px" />
          {text3}
        </button>
      </div>
      <div className="indexContainer04">
        <button className="Index04" onClick={navigateToMypage}>
          <img src="../img/mypage.png" height="20px" width="20px" />
        </button>
      </div>
    </section>
  );
};

IndexBtn.defaultProps = {
  type: "default",
};
export default IndexBtn;
