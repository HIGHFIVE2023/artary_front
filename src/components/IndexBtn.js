const IndexBtn = ({}) => {
  function handleClick(event) {
    console.log("클릭한 버튼의 텍스트: ", event.target.innerText);
  }

  return (
    <section>
      <div className="indexContainer01">
        <button className="Index01" onClick={handleClick}>
          다이어리
        </button>
      </div>
      <div className="indexContainer02">
        <button className="Index02" onClick={handleClick}>
          캘린더
        </button>
      </div>
      <div className="indexContainer03">
        <button className="Index03" onClick={handleClick}>
          마이페이지
        </button>
      </div>
      <div className="indexContainer04">
        <button className="Index04" onClick={handleClick}>
          환경설정
        </button>
      </div>
    </section>
  );
};
export default IndexBtn;
