import React, { useState, useEffect } from "react";

import IndexBtn from "../components/IndexBtn";
import Register from "../components/Register";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const SignUp = ({}) => {
  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

  //스프링
  const calculateSpringCount = () => {
    const windowHeight = window.innerHeight;
    // 원하는 로직에 따라 화면 높이에 따라 갯수를 계산할 수 있습니다.
    // 예를 들어, 높이가 특정 값 이하일 때는 4개, 그 이상일 때는 6개로 설정
    if (windowHeight <= 200) {
      return 1;
    } else if (windowHeight <= 250) {
      return 2;
    } else if (windowHeight <= 350) {
      return 3;
    } else if (windowHeight <= 450) {
      return 4;
    } else if (windowHeight <= 550) {
      return 5;
    } else {
      return 6;
    }
  };

  const updateSpringCount = () => {
    const count = calculateSpringCount();
    setSpringCount(count);
  };

  useEffect(() => {
    // 화면 크기 변경 감지를 위한 이벤트 리스너 등록
    window.addEventListener("resize", updateSpringCount);

    // 컴포넌트가 마운트될 때 한 번 호출
    updateSpringCount();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateSpringCount);
    };
  }, []);

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
          <div className="LeftDivOveray">
            <img className="DiaryIntro" src="/img/intro.png" />
          </div>
          <div className="SpringMaker">
            <Circles count={springCount} style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs count={springCount} />
            </div>
            <Circles count={springCount} style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            <img className="signupIcon" src="/img/icon.png" alt="login icon" />
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
