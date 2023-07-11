import React from "react";
import styled from "styled-components";

const SpringContainer = styled.div`
  display: flex;
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
  margin-bottom: 3em;
  z-index: 2;
`;

const Springs = ({ style }) => {
  return (
    <SpringContainer style={style}>
      <Spring style={{ marginTop: "40%", marginBottom: "80%" }} />
      <Spring style={{ marginBottom: "80%" }} />
      <Spring style={{ marginBottom: "80%" }} />
      <Spring style={{ marginBottom: "82%" }} />
      <Spring style={{ marginBottom: "80%" }} />
      <Spring style={{ marginBottom: "1.6em" }} />
    </SpringContainer>
  );
};

export default Springs;
