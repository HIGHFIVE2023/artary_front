const BottomBtn = ({ image, onClick, text }) => {
  return (
    <button className="BottomBtn" onClick={onClick}>
      {text}
      <img src={image} alt="Button Image" />
    </button>
  );
};

export default BottomBtn;
