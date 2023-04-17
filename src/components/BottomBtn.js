const BottomBtn = ({ text, type }) => {
  const handlingClick = () => {
    console.log("하단버튼 성공");
  };
  return (
    <button className="BottomBtn" onClick={handlingClick}>
      {text}
    </button>
  );
};

export default BottomBtn;
