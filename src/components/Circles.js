import React from "react";
import styled from "styled-components";

const CircleContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  alignself: flex-start;
  z-index: 1;
`;

const Circle = styled.div`
  background-color: hsl(282, 100%, 91%);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-bottom: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25) inset;
`;

const Circles = ({ count, style }) => {
  // count 개수만큼 Circle 컴포넌트 렌더링
  const circleElements = Array.from({ length: count }, (_, index) => (
    <Circle
      key={index}
      style={
        index === 0
          ? { ...style, marginBottom: "auto" } // 첫 번째 원에는 아래쪽 마진과 위쪽 마진을 적용
          : index === count - 1
          ? {
              ...style,
              marginTop: "auto",
            } // 마지막 원에는 위쪽 마진과 아래쪽 마진을 적용
          : { ...style, margin: "auto" } // 중간 원들에는 상하 마진을 없애고 다른 스타일 적용
      }
    />
  ));

  return <CircleContainer>{circleElements}</CircleContainer>;
};

export default Circles;
