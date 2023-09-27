import React from "react";
import styled from "styled-components";

const SpringContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  alignself: flex-start;
  margin-top: 51%;
`;

const Spring = styled.div`
  width: 3em;
  height: 1em;
  border: 7px solid #adb5bd;
  border-bottom: none;
  border-radius: 50% / 100% 100% 0% 0%;
  margin-bottom: 3.1em;
  z-index: 2;
`;

const Springs = ({ count, style }) => {
  // count 개수만큼 Spring 컴포넌트 렌더링
  const springElements = Array.from({ length: count }, (_, index) => (
    <Spring key={index} />
  ));

  return <SpringContainer style={style}>{springElements}</SpringContainer>;
};

export default Springs;
