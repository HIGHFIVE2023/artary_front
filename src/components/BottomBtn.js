const BottomBtn = ({ image, onClick }) => { // onClick 속성 추가
  const handlingClick = () => {
    console.log("하단버튼 성공");
    if (onClick) {
      onClick(); // onClick 함수가 전달되었을 때 호출
    }
  };
  return (
    <button className="BottomBtn" onClick={handlingClick}>
      <img src={image} alt="Button Image" />
    </button>
  );
};

export default BottomBtn;
