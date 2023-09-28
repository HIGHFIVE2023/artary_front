import React, { useState } from "react";

const BottomBtn = ({ text, image, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  // onClick 속성 추가

  const handlingClick = () => {
    console.log("하단버튼 성공");
    if (onClick) {
      onClick(); // onClick 함수가 전달되었을 때 호출
    }
  };

  return (
    <button 
      className="BottomBtn" 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <img 
        src={isHovered ? image.replace(".png", "H.png") : image} 
        alt="Button Image" 
      />
    </button>
  );
};
  
  export default BottomBtn;