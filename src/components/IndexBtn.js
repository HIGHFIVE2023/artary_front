import { Link } from "react-router-dom";

const IndexBtn = ({}) => {
  function handleClick(event) {
    console.log("클릭한 버튼의 텍스트: ", event.target.innerText);
  }

  return (
    <section>
      <div className="indexContainer01">
        <button className="Index01" id="btn" onClick={""}>
          <img src="../img/pencil.png" height="20px" width="20px" />
        </button>
      </div>
      <div className="indexContainer02">
        <button className="Index02" onClick={handleClick}>
          <img src="../img/calendar.png" height="20px" width="20px" />
        </button>
      </div>
      <div className="indexContainer03">
        <button className="Index03" onClick={handleClick}>
          <img src="../img/mypage.png" height="20px" width="20px" />
        </button>
      </div>
      <div className="indexContainer04">
        <button className="Index04" onClick={handleClick}>
          <img src="../img/setting.png" height="20px" width="20px" />
        </button>
      </div>
    </section>
  );
};
export default IndexBtn;
