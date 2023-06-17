import React from "react";
import { useNavigate } from "react-router-dom";

const IndexBtn = ({ type }) => {
  //페이지 이동
  const navigate = useNavigate();

  const navigateToDiary = () => {
    navigate("/diary/write");
  };

  const navigateToCalen = () => {
    navigate("/calenpage");
  };

  return (
    <section>
      <div className="indexContainer01">
        <button
          className="Index01"
          activeClassName="selected"
          id="btn"
          onClick={navigateToDiary}
        >
          <img src="../img/pencil.png" height="20px" width="20px" />
        </button>
      </div>
      <div className="indexContainer02">
        <button className="Index02" onClick={navigateToCalen}>
          <img src="../img/calendar.png" height="20px" width="20px" />
        </button>
      </div>
      <div className="indexContainer03">
        <button
          className="Index03"
          onClick={() => alert("마이페이지는 준비 중!")}
        >
          <img src="../img/mypage.png" height="20px" width="20px" />
        </button>
      </div>
      <div className="indexContainer04">
        <button className="Index04" onClick={() => alert("설정은 준비 중!")}>
          <img src="../img/setting.png" height="20px" width="20px" />
        </button>
      </div>
    </section>
  );
};
export default IndexBtn;
