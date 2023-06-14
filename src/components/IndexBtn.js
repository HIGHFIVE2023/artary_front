import { useNavigate } from "react-router";
import { useState } from "react";

const IndexBtn = ({}) => {
  //페이지 이동
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(""); // 현재 활성화된 버튼을 추적하는 상태

  const navigateToDiary = () => {
    navigate("/diary");
    setActiveButton("index01"); // 다른 페이지로 이동할 때 index01 버튼 활성화
  };

  const navigateToCalen = () => {
    navigate("/calenpage");
  };

  return (
    <section>
      <div className="indexContainer01">
        <button
          className={`Index01 ${activeButton === "index01" ? "active" : ""}`}
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
