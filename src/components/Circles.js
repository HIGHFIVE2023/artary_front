import React from "react";
import styled from "styled-components";

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  alignself: flex-start;
  z-index: 1;
`;

const Circle = styled.div`
  background-color: hsl(282, 100%, 91%);
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-bottom: 3em;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25) inset;
`;

const Circles = ({ style }) => {
  return (
    <CircleContainer style={style}>
      <Circle style={{ marginTop: "1.5em" }} />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle style={{ marginBottom: "1.5em" }} />
    </CircleContainer>
  );
};

export default Circles;
