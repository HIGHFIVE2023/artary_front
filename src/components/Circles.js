import React from "react";
import styled from "styled-components";

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  alignself: flex-start;
  z-index: 1;
  margin-top: 40%;
`;

const Circle = styled.div`
  background-color: hsl(282, 100%, 91%);
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-bottom: 3em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25) inset;
`;

const Circles = ({ count, style }) => {
  // count 개수만큼 Circle 컴포넌트 렌더링
  const circleElements = Array.from({ length: count }, (_, index) => (
    <Circle key={index} />
  ));

  return <CircleContainer style={style}>{circleElements}</CircleContainer>;
};

export default Circles;
