import React from "react";
import styled from "styled-components";

const SpringContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  alignself: flex-start;
`;

const Spring = styled.div`
  width: 3em;
  height: 1em;
  border: 7px solid #adb5bd;
  border-bottom: none;
  border-radius: 50% / 100% 100% 0% 0%;
  margin-bottom: auto;
  z-index: 2;
`;

const Springs = ({ count, style }) => {
  // count 개수만큼 Spring 컴포넌트 렌더링
  const springElements = Array.from({ length: count }, (_, index) => (
    <Spring
      key={index}
      style={
        index === 0
          ? { ...style, marginBottom: "auto" } // 첫 번째 스프링에는 아래쪽 마진과 위쪽 마진을 적용
          : index === count - 1
          ? { ...style, marginTop: "auto" } // 마지막 스프링에는 위쪽 마진과 아래쪽 마진을 적용
          : { ...style, margin: "auto" } // 중간 스프링들에는 상하 마진을 없애고 다른 스타일 적용
      }
    />
  ));

  return <SpringContainer>{springElements}</SpringContainer>;
};

export default Springs;
