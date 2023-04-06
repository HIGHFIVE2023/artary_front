const IndexBtn = () => {
  function handleClick() {
    // 버튼을 클릭했을 때 동작
    console.log("다이어리 버튼 클릭됨");
  }

  return <button className="IndexBtn" onClick={handleClick}></button>;
};

export default IndexBtn;
