const BottomBtn = ({ image }) => {
  const handlingClick = () => {
    console.log("하단버튼 성공");
  };
  return (
    <button className="BottomBtn" onClick={handlingClick}>
      <img src={image} alt="Button Image" />
    </button>
  );
};

export default BottomBtn;
